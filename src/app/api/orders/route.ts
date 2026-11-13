import { NextRequest, NextResponse } from 'next/server';
import { db, CreateOrderDTO } from '@/lib/server/repository/relational-store';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CreateOrderDTO;

    // Validation
    if (!body?.customer?.name?.trim()) {
      return NextResponse.json({ error: 'Customer name is required' }, { status: 400 });
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
    console.error('Order creation error:', error);
    return NextResponse.json({ error: 'Failed to process order' }, { status: 500 });
  }
}
