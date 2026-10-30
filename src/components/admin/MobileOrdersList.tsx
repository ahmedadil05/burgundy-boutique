'use client';

import React, { useState } from 'react';
import { Language } from '../../lib/i18n';
import { formatPrice } from '../../lib/currency';
import { OrderRow } from './OrdersTable';
import {
  Package,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  Truck,
  RotateCcw,
  Search,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

export function MobileOrdersList({
  orders,
  onUpdateStatus,
  lang = 'ar',
}: {
  orders: OrderRow[];
  onUpdateStatus?: (orderId: string, status: OrderRow['status']) => void;
  lang?: Language;
}) {
  const isAr = lang === 'ar';
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = filterStatus === 'all' || o.status === filterStatus;
    const matchesSearch =
      !searchQuery ||
      o.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.phone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: OrderRow['status']) => {
    switch (status) {
      case 'confirmed':
        return {
          label: isAr ? 'مؤكد وجديد' : 'Confirmed',
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        };
      case 'processing':
        return {
          label: isAr ? 'قيد التجهيز والتطريز' : 'Processing',
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
        };
      case 'shipped':
        return {
          label: isAr ? 'مع مندوب التوصيل' : 'Out for Delivery',
          bg: 'bg-blue-50 text-blue-800 border-blue-200',
        };
      case 'delivered':
        return {
          label: isAr ? 'تم الاستلام بنجاح' : 'Delivered',
          bg: 'bg-purple-50 text-purple-800 border-purple-200',
        };
      default:
        return {
          label: status,
          bg: 'bg-cream-100 text-cocoa-muted border-peach-soft',
        };
    }
  };

  const getPaymentBadge = (method: OrderRow['paymentMethod']) => {
    switch (method) {
      case 'fawran':
        return {
          label: 'FAWRAN',
          sub: isAr ? 'فوران' : 'Instant',
          cls: 'bg-purple-100 text-purple-800 border-purple-200',
        };
      case 'qpay':
        return {
          label: 'QPAY',
          sub: isAr ? 'بطاقة صراف' : 'NAPS',
          cls: 'bg-blue-100 text-blue-800 border-blue-200',
        };
      case 'card':
        return {
          label: 'CARD',
          sub: isAr ? 'بطاقة بنكية' : 'Visa / MC',
          cls: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        };
      case 'cod':
        return {
          label: 'COD',
          sub: isAr ? 'عند الاستلام' : 'Cash',
          cls: 'bg-amber-100 text-amber-800 border-amber-200',
        };
    }
  };

  return (
    <div className="space-y-4">
      {/* Search & Filter Bar */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute top-1/2 -translate-y-1/2 start-3 text-cocoa-muted pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isAr ? 'بحث برقم الطلب، اسم العميلة أو الهاتف...' : 'Search order #, customer name, phone...'}
            className="w-full ps-9 pe-4 py-2.5 rounded-2xl bg-white border border-peach-soft text-xs text-cocoa-dark focus:outline-none focus:ring-2 focus:ring-coral-warm/20"
          />
        </div>

        {/* Status Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          {[
            { id: 'all', label: isAr ? 'الكل' : 'All', count: orders.length },
            { id: 'confirmed', label: isAr ? 'مؤكد' : 'Confirmed', count: orders.filter((o) => o.status === 'confirmed').length },
            { id: 'processing', label: isAr ? 'قيد التجهيز' : 'Processing', count: orders.filter((o) => o.status === 'processing').length },
            { id: 'shipped', label: isAr ? 'في الطريق' : 'Shipped', count: orders.filter((o) => o.status === 'shipped').length },
            { id: 'delivered', label: isAr ? 'تم التسليم' : 'Delivered', count: orders.filter((o) => o.status === 'delivered').length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition-colors flex items-center gap-1.5 ${
                filterStatus === tab.id
                  ? 'bg-coral-warm text-white shadow-xs'
                  : 'bg-white text-cocoa-dark border border-peach-soft hover:bg-cream-50'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                filterStatus === tab.id ? 'bg-white/25 text-white' : 'bg-cream-100 text-cocoa-muted'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Orders Cards List */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-12 bg-white/60 rounded-3xl border border-peach-soft p-6">
          <Package className="w-10 h-10 mx-auto text-peach-deep mb-2 opacity-60" />
          <p className="text-sm font-bold text-cocoa-dark font-cairo">
            {isAr ? 'لا توجد طلبات مطابقة' : 'No matching orders found'}
          </p>
          <p className="text-xs text-cocoa-muted mt-1">
            {isAr ? 'جربي تغيير معايير البحث أو التصفية' : 'Try adjusting your search or filter criteria'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredOrders.map((order) => {
            const statusInfo = getStatusBadge(order.status);
            const payInfo = getPaymentBadge(order.paymentMethod);
            const addr = order.customer.shippingAddress;

            return (
              <div
                key={order.orderId}
                className="bg-white rounded-3xl p-4 sm:p-5 border border-peach-soft shadow-xs space-y-3.5 hover:border-peach-deep transition-all"
              >
                {/* Header: ID, Date & Status */}
                <div className="flex items-start justify-between gap-2 border-b border-peach-soft/60 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-coral-warm text-sm">
                        #{order.orderId}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${payInfo.cls}`}>
                        {payInfo.label}
                      </span>
                    </div>
                    <span className="text-[11px] text-cocoa-muted flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      {new Date(order.orderDate).toLocaleDateString(isAr ? 'ar-QA' : 'en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-xl border ${statusInfo.bg}`}>
                    {statusInfo.label}
                  </span>
                </div>

                {/* Customer Details & Tap-To-Call */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <div className="font-bold text-cocoa-dark text-sm font-cairo">
                      {order.customer.name}
                    </div>
                    {addr && (
                      <div className="text-[11px] text-cocoa-muted flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-coral-warm shrink-0" />
                        <span>
                          {isAr ? 'منطقة' : 'Zone'} {addr.zone}، {isAr ? 'شارع' : 'St.'} {addr.street}، {isAr ? 'مبنى' : 'Bldg.'} {addr.building} ({addr.municipality})
                        </span>
                      </div>
                    )}
                  </div>

                  <a
                    href={`tel:${order.customer.phone}`}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-cream-50 hover:bg-blush-surface text-cocoa-dark font-medium border border-peach-soft text-xs transition-colors shrink-0 self-start sm:self-auto min-h-[40px]"
                    title={isAr ? 'اتصال مباشر بالعميلة' : 'Direct phone call to customer'}
                  >
                    <Phone className="w-3.5 h-3.5 text-coral-warm" />
                    <span className="font-mono dir-ltr">{order.customer.phone}</span>
                  </a>
                </div>

                {/* Items preview if available */}
                {order.items && order.items.length > 0 && (
                  <div className="bg-cream-50/70 rounded-2xl p-2.5 border border-peach-soft/50 space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.title[lang]}
                              className="w-8 h-8 rounded-lg object-cover border border-peach-soft"
                            />
                          )}
                          <div>
                            <span className="font-medium text-cocoa-dark block line-clamp-1">
                              {item.title[lang]}
                            </span>
                            <span className="text-[10px] text-cocoa-muted">
                              {item.size} • {item.color} • x{item.quantity}
                            </span>
                          </div>
                        </div>
                        <span className="font-bold text-cocoa-dark">
                          {formatPrice(item.priceQAR * item.quantity, 'QAR', lang)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Price Total & Status Change Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-peach-soft/50">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xs text-cocoa-muted">{isAr ? 'المجموع النهائي:' : 'Order Total:'}</span>
                    <span className="text-base font-extrabold text-cocoa-dark font-playfair">
                      {formatPrice(order.totals.total, 'QAR', lang)}
                    </span>
                  </div>

                  {/* Status update buttons / dropdown */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-cocoa-muted me-1">
                      {isAr ? 'تغيير الحالة:' : 'Set status:'}
                    </span>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        onUpdateStatus &&
                        onUpdateStatus(order.orderId, e.target.value as OrderRow['status'])
                      }
                      className="px-2.5 py-1.5 text-xs font-semibold rounded-xl bg-white border border-peach-soft text-cocoa-dark focus:ring-2 focus:ring-coral-warm/20 focus:outline-none min-h-[38px]"
                    >
                      <option value="confirmed">{isAr ? 'مؤكد' : 'Confirmed'}</option>
                      <option value="processing">{isAr ? 'قيد التجهيز' : 'Processing'}</option>
                      <option value="shipped">{isAr ? 'مع المندوب' : 'Shipped'}</option>
                      <option value="delivered">{isAr ? 'تم التسليم' : 'Delivered'}</option>
                    </select>

                    <Link
                      href={`/${lang}/orders/${order.orderId}`}
                      className="p-2 rounded-xl text-cocoa-muted hover:text-coral-warm hover:bg-cream-50 border border-peach-soft transition-colors"
                      title={isAr ? 'عرض الفاتورة الرسمية' : 'View Official Invoice'}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
