'use client';

import React, { useState } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import { Language } from '@/lib/i18n';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Package, Truck, CheckCircle2, Clock, MapPin, Search } from 'lucide-react';
import Link from 'next/link';

export default function TrackingPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const lang = (params?.lang === 'en' ? 'en' : 'ar') as Language;
  const isAr = lang === 'ar';

  const initialOrder = searchParams?.get('order') || '';
  const [orderQuery, setOrderQuery] = useState(initialOrder);
  const [trackedOrder, setTrackedOrder] = useState<any | null>(
    initialOrder
      ? {
          orderId: initialOrder,
          status: 'shipped',
          carrier: 'Kandaka Climate-Controlled Express (Doha)',
          estimatedDelivery: isAr ? 'اليوم بين 4:00 - 8:00 مساءً' : 'Today between 4:00 - 8:00 PM',
          destination: 'Al Rayyan, Zone 55, Qatar',
          steps: [
            { title: isAr ? 'تم استلام وتأكيد الطلب' : 'Order Confirmed', time: '10:30 AM', done: true },
            { title: isAr ? 'فحص الجودة والتغليف الفاخر' : 'Quality Inspection & Garment Bagging', time: '01:15 PM', done: true },
            { title: isAr ? 'الشحنة مع مندوب التوصيل في الدوحة' : 'Out for Delivery (Doha Driver)', time: '03:45 PM', done: true, current: true },
            { title: isAr ? 'تم التسليم بنجاح' : 'Delivered to Doorstep', time: 'Estimated 06:00 PM', done: false },
          ],
        }
      : null
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderQuery.trim()) {
      setTrackedOrder({
        orderId: orderQuery.trim(),
        status: 'shipped',
        carrier: 'Kandaka Climate-Controlled Express (Doha)',
        estimatedDelivery: isAr ? 'خلال 24 ساعة عمل' : 'Within 24 working hours',
        destination: isAr ? 'الدوحة، دولة قطر' : 'Doha, State of Qatar',
        steps: [
          { title: isAr ? 'تم استلام وتأكيد الطلب' : 'Order Confirmed', time: 'Yesterday', done: true },
          { title: isAr ? 'فحص الجودة والتغليف الفاخر' : 'Quality Inspection', time: 'Today 10:00 AM', done: true },
          { title: isAr ? 'خرجت مع مندوب التوصيل' : 'Out for Courier Delivery', time: 'Today 02:00 PM', done: true, current: true },
          { title: isAr ? 'تم التسليم' : 'Delivered', time: 'Pending', done: false },
        ],
      });
    }
  };

  return (
    <div className="min-h-screen bg-cream py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <div className="w-12 h-12 bg-blush-surface text-coral-warm rounded-full flex items-center justify-center mx-auto mb-3 border border-peach-soft">
            <Truck className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-cocoa-dark font-cairo">
            {isAr ? 'تتبع مسار شحنتكِ' : 'Track Your Order'}
          </h1>
          <p className="mt-1 text-xs text-cocoa-muted">
            {isAr
              ? 'أدخلي رقم الطلب المسجل في الفاتورة الرسمية لمتابعة حركة المندوب.'
              : 'Enter your official order invoice ID to view live courier status.'}
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="bg-white/90 p-4 rounded-3xl border border-peach-soft shadow-sm flex gap-2">
          <Input
            placeholder={isAr ? 'رقم الطلب (مثال: QA-123456)' : 'Order ID (e.g. QA-123456)'}
            value={orderQuery}
            onChange={(e) => setOrderQuery(e.target.value)}
            className="border-0 shadow-none focus:ring-0 bg-transparent text-sm"
          />
          <Button type="submit" variant="primary" icon={<Search className="w-4 h-4" />}>
            {isAr ? 'تتبع' : 'Track'}
          </Button>
        </form>

        {trackedOrder && (
          <div className="bg-white/85 rounded-3xl p-6 sm:p-8 border border-peach-soft shadow-warm space-y-6 animate-scaleUp">
            <div className="flex items-center justify-between pb-4 border-b border-peach-soft">
              <div>
                <span className="text-[10px] font-bold text-coral-warm uppercase tracking-wider block">
                  {isAr ? 'شحنة نشطة في قطر' : 'Live Qatar Delivery'}
                </span>
                <span className="font-mono text-base font-extrabold text-cocoa-dark">
                  #{trackedOrder.orderId}
                </span>
              </div>
              <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" />
                <span>{isAr ? 'في طريقها إليكِ' : 'Out for Delivery'}</span>
              </span>
            </div>

            {/* Carrier & Time Info */}
            <div className="grid grid-cols-2 gap-3 p-3.5 bg-cream rounded-2xl border border-peach-soft text-xs">
              <div>
                <span className="block text-[10px] text-cocoa-muted">{isAr ? 'الناقل المعتمد:' : 'Courier Carrier:'}</span>
                <strong className="text-cocoa-dark">{trackedOrder.carrier}</strong>
              </div>
              <div>
                <span className="block text-[10px] text-cocoa-muted">{isAr ? 'الموعد المتوقع للتسليم:' : 'Estimated Arrival:'}</span>
                <strong className="text-coral-warm">{trackedOrder.estimatedDelivery}</strong>
              </div>
            </div>

            {/* Progress Stepper */}
            <div className="space-y-6 pt-2">
              {trackedOrder.steps.map((st: any, idx: number) => (
                <div key={idx} className="flex items-start gap-4 relative">
                  {/* Vertical connecting line */}
                  {idx < trackedOrder.steps.length - 1 && (
                    <div
                      className={`absolute top-6 start-3 w-0.5 h-10 ${
                        st.done ? 'bg-coral-warm' : 'bg-peach-soft'
                      }`}
                    />
                  )}

                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${
                      st.done
                        ? 'bg-coral-warm text-white'
                        : 'bg-peach-soft/60 text-cocoa-muted border border-peach-soft'
                    }`}
                  >
                    {st.done ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-3.5 h-3.5" />}
                  </div>

                  <div className="flex-1 flex items-center justify-between">
                    <div>
                      <p className={`text-xs font-bold ${st.current ? 'text-coral-warm' : 'text-cocoa-dark'}`}>
                        {st.title}
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-cocoa-muted">{st.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-peach-soft/60 text-center">
              <Link href={`/${lang}/orders/${trackedOrder.orderId}`}>
                <Button variant="ghost" size="sm">
                  {isAr ? 'عرض الفاتورة الرسمية' : 'View Official Invoice'}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
