import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/server/repository/relational-store';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  const { orderNumber } = await params;

  if (!orderNumber) {
    return NextResponse.json({ error: 'Order number is required' }, { status: 400 });
  }

  const order = db.getOrderByNumber(orderNumber);

  if (!order) {
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
      title: oi.product.title,
      size: oi.size.label,
      quantity: oi.quantity,
      unitPriceQAR: oi.unitPriceQAR,
    })),
  });
}
