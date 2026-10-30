'use client';

import React from 'react';
import { Language } from '../../lib/i18n';
import { formatPrice } from '../../lib/currency';
import { Package, Truck, CheckCircle2, Clock } from 'lucide-react';

export interface OrderRow {
  orderId: string;
  orderDate: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
    shippingAddress?: {
      zone: string;
      street: string;
      building: string;
      municipality: string;
      notes?: string;
    };
  };
  totals: { total: number; subtotal?: number; shipping?: number };
  paymentMethod: 'card' | 'qpay' | 'fawran' | 'cod';
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered';
  items?: Array<{
    id: string;
    slug: string;
    title: { ar: string; en: string };
    priceQAR: number;
    quantity: number;
    size: string;
    color: string;
    image: string;
  }>;
}

export function OrdersTable({
  orders,
  onUpdateStatus,
  lang = 'ar',
}: {
  orders: OrderRow[];
  onUpdateStatus?: (orderId: string, status: OrderRow['status']) => void;
  lang?: Language;
}) {
  const isAr = lang === 'ar';

  return (
    <div className="bg-white/90 rounded-3xl p-6 border border-peach-soft shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-peach-soft">
        <h3 className="font-bold text-base text-cocoa-dark font-cairo flex items-center gap-2">
          <Package className="w-5 h-5 text-coral-warm" />
          <span>{isAr ? 'إدارة الطلبات والمبيعات' : 'Customer Orders & Fulfillment'}</span>
        </h3>
        <span className="text-xs text-cocoa-muted font-semibold">
          {isAr ? `${orders.length} طلبات مسجلة` : `${orders.length} Orders Logged`}
        </span>
      </div>

      {orders.length === 0 ? (
        <p className="text-center py-8 text-xs text-cocoa-muted">
          {isAr ? 'لا توجد طلبات مسجلة حتى الآن' : 'No customer orders placed yet.'}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-peach-soft">
          <table className="w-full text-xs text-start">
            <thead>
              <tr className="bg-blush-surface font-bold text-cocoa-dark border-b border-peach-soft">
                <th className="p-3 text-start">{isAr ? 'رقم الطلب' : 'Order ID'}</th>
                <th className="p-3 text-start">{isAr ? 'العميلة' : 'Customer'}</th>
                <th className="p-3 text-center">{isAr ? 'طريقة الدفع' : 'Payment Rail'}</th>
                <th className="p-3 text-end">{isAr ? 'الإجمالي (ر.ق)' : 'Total (QAR)'}</th>
                <th className="p-3 text-center">{isAr ? 'الحالة' : 'Status'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-peach-soft/50">
              {orders.map((o) => (
                <tr key={o.orderId} className="hover:bg-cream/60 transition-colors">
                  <td className="p-3 font-mono font-bold text-coral-warm">#{o.orderId}</td>
                  <td className="p-3">
                    <p className="font-bold text-cocoa-dark">{o.customer.name}</p>
                    <p className="text-[11px] text-cocoa-muted" dir="ltr">{o.customer.phone}</p>
                  </td>
                  <td className="p-3 text-center">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-cream border border-peach-soft text-cocoa-dark">
                      {o.paymentMethod.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3 text-end font-extrabold text-cocoa-dark">
                    {formatPrice(o.totals.total, 'QAR', lang)}
                  </td>
                  <td className="p-3 text-center">
                    {onUpdateStatus ? (
                      <select
                        value={o.status}
                        onChange={(e) => onUpdateStatus(o.orderId, e.target.value as any)}
                        className="text-xs font-semibold rounded-lg bg-cream border border-peach-soft p-1 cursor-pointer focus:outline-none"
                      >
                        <option value="confirmed">{isAr ? 'مؤكد' : 'Confirmed'}</option>
                        <option value="processing">{isAr ? 'تجهيز' : 'Processing'}</option>
                        <option value="shipped">{isAr ? 'تم الشحن' : 'Shipped'}</option>
                        <option value="delivered">{isAr ? 'تم التسليم' : 'Delivered'}</option>
                      </select>
                    ) : (
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        {o.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
