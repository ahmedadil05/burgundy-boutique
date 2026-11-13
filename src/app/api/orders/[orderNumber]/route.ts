import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/server/repository/relational-store';
import { rateLimit, getClientIp } from '@/lib/server/rate-limit';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  const ip = getClientIp(req.headers);
  const rl = rateLimit(`orders-track:${ip}`, 20, 60 * 1000);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'Too many tracking requests. Please try again shortly.', retryAfterSec: rl.retryAfterSec },
      { status: 429 }
    );
  }

  const { orderNumber } = await params;

  if (!orderNumber) {
    return NextResponse.json({ error: 'Order number is required' }, { status: 400 });
  }

  // Privacy gate: tracking requires the phone number used at checkout.
  // Without a correct match the endpoint behaves as if the order does not exist,
  // so order numbers cannot be enumerated for customer PII.
  const phoneQuery = req.nextUrl.searchParams.get('phone') || '';
  const digitsOf = (s: string) => s.replace(/\D/g, '');
  const providedDigits = digitsOf(phoneQuery);

  if (!providedDigits) {
    return NextResponse.json(
      { error: 'Phone number used at checkout is required' },
      { status: 400 }
    );
  }

  const order = db.getOrderByNumber(orderNumber.trim());

  const storedDigits = order ? digitsOf(order.customer.phone) : '';
  const phoneMatches =
    !!order &&
    !!storedDigits &&
    (storedDigits === providedDigits ||
      storedDigits.endsWith(providedDigits) ||
      providedDigits.endsWith(storedDigits));

  if (!order || !phoneMatches) {
    // Same 404 either way — do not reveal whether the order number exists.
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  // Sanitize for public tracker: mask phone and omit street details
  const phone = order.customer.phone;
  const maskedPhone =
    phone.length > 4 ? `${phone.slice(0, 4)} **** ${phone.slice(-4)}` : '****';

  return NextResponse.json({
    success: true,
    orderNumber: order.orderNumber,
    status: order.status,
    paymentMethod: order.paymentMethod,
    paymentStatus: order.paymentStatus,
    subtotalQAR: order.subtotalQAR,
    deliveryFeeQAR: order.deliveryFeeQAR,
    totalQAR: order.totalQAR,
    createdAt: order.createdAt,
    customer: {
      name: order.customer.name,
      maskedPhone,
      municipality: order.customer.municipality,
    },
    items: order.items.map((oi) => ({
      title: oi.product?.title ?? { ar: 'قطعة غير متوفرة', en: 'Unavailable item' },
      size: oi.size?.label ?? { ar: 'قياس قياسي', en: 'Standard size' },
      quantity: oi.quantity,
      unitPriceQAR: oi.unitPriceQAR,
    })),
  });
}
