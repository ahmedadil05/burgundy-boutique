import { NextRequest, NextResponse } from 'next/server';
import { db, CreateOrderDTO } from '@/lib/server/repository/relational-store';
import { rateLimit, getClientIp } from '@/lib/server/rate-limit';
import { PaymentMethod } from '@/lib/domain/schema';

const MAX_BODY_BYTES = 64 * 1024; // 64 KB — orders never exceed this in practice
const MAX_ITEMS = 50;

const ALLOWED_PAYMENT_METHODS: readonly PaymentMethod[] = [
  'card',
  'qpay',
  'fawran',
  'bank_transfer',
];

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const rl = rateLimit(`orders-create:${ip}`, 10, 10 * 60 * 1000);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'Too many order requests. Please try again later.', retryAfterSec: rl.retryAfterSec },
      { status: 429 }
    );
  }

  const contentLength = Number(req.headers.get('content-length') || '0');
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Request body too large' }, { status: 413 });
  }

  try {
    const body = (await req.json()) as CreateOrderDTO;

    // Validation
    if (!body?.customer?.name?.trim()) {
      return NextResponse.json({ error: 'Customer name is required' }, { status: 400 });
    }
    if (body.customer.name.trim().length > 200) {
      return NextResponse.json({ error: 'Customer name is too long' }, { status: 400 });
    }
    if (!body?.customer?.phone?.trim()) {
      return NextResponse.json({ error: 'Customer phone number is required' }, { status: 400 });
    }
    if (!body?.customer?.municipality?.trim()) {
      return NextResponse.json({ error: 'Municipality is required for Qatar delivery' }, { status: 400 });
    }
    if (!body?.customer?.addressLine?.trim()) {
      return NextResponse.json({ error: 'Address details are required' }, { status: 400 });
    }
    if (!Array.isArray(body?.items) || body.items.length === 0) {
      return NextResponse.json({ error: 'Order must contain at least one item' }, { status: 400 });
    }
    if (body.items.length > MAX_ITEMS) {
      return NextResponse.json({ error: `Order cannot contain more than ${MAX_ITEMS} items` }, { status: 400 });
    }

    // Payment method must be a known rail — never trust or persist arbitrary values.
    if (!body.paymentMethod || !ALLOWED_PAYMENT_METHODS.includes(body.paymentMethod)) {
      return NextResponse.json({ error: 'Unsupported payment method' }, { status: 400 });
    }

    // Quantity & catalog integrity — never fall back to client-supplied prices.
    for (const [index, item] of body.items.entries()) {
      const quantity = Number(item?.quantity);
      if (!Number.isFinite(quantity) || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
        return NextResponse.json(
          { error: `Item ${index + 1}: quantity must be a whole number between 1 and 99` },
          { status: 400 }
        );
      }

      if (!item?.productId || typeof item.productId !== 'string') {
        return NextResponse.json(
          { error: `Item ${index + 1}: productId is required` },
          { status: 400 }
        );
      }

      const product = db.getProductById(item.productId);
      if (!product) {
        return NextResponse.json(
          { error: `Item ${index + 1}: unknown product '${item.productId}'` },
          { status: 400 }
        );
      }

      if (item.sizeCode && String(item.sizeCode).length > 48) {
        return NextResponse.json(
          { error: `Item ${index + 1}: sizeCode is too long` },
          { status: 400 }
        );
      }
    }

    const order = db.createOrder(body);

    return NextResponse.json(
      {
        success: true,
        orderNumber: order.orderNumber,
        status: order.status,
        totalQAR: order.totalQAR,
        order,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Unknown product')) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error('Order creation error:', error);
    return NextResponse.json({ error: 'Failed to process order' }, { status: 500 });
  }
}
