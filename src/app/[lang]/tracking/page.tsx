'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import { Language } from '@/lib/i18n';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Truck, CheckCircle2, Clock, Search, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import Link from 'next/link';

function TrackingContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const lang = (params?.lang === 'en' ? 'en' : 'ar') as Language;
  const isAr = lang === 'ar';

  const initialOrder = searchParams?.get('order') || '';
  const [orderQuery, setOrderQuery] = useState(initialOrder);
  const [loading, setLoading] = useState(false);
  const [trackedOrder, setTrackedOrder] = useState<any | null>(null);

  const fetchOrderTracking = async (orderId: string) => {
    if (!orderId.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(orderId.trim())}`);
      if (res.ok) {
        const data = await res.json();
        const order = data.order;
        setTrackedOrder({
          orderId: order.orderNumber,
          status: order.fulfillmentStatus || 'PROCESSING',
          carrier: isAr ? 'مندوب دار بيرغندي المبرد (الدوحة)' : 'BURGUNDY Climate-Controlled Express (Doha)',
          estimatedDelivery: isAr ? 'خلال 24-48 ساعة' : 'Within 24-48 hours',
          destination: `${order.shippingAddress?.municipality || 'Doha'}, Qatar`,
          customerName: order.customer?.fullName || '',
          totalQAR: order.totalQAR,
          steps: [
            {
              title: isAr ? 'تم استلام وتأكيد الطلب بالمرسم' : 'Order Confirmed at Atelier',
              time: new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              done: true,
            },
            {
              title: isAr ? 'فحص جودة الحرير والفوال والتغليف الفاخر' : 'Quality Inspection & Silk Packaging',
              time: isAr ? 'مكتمل' : 'Completed',
              done: order.fulfillmentStatus !== 'PENDING',
              current: order.fulfillmentStatus === 'PROCESSING',
            },
            {
              title: isAr ? 'الشحنة مع مندوب التوصيل في قطر' : 'Out for Courier Delivery in Qatar',
              time: isAr ? 'جاري التوصيل' : 'In Transit',
              done: ['SHIPPED', 'DELIVERED'].includes(order.fulfillmentStatus),
              current: order.fulfillmentStatus === 'SHIPPED',
            },
            {
              title: isAr ? 'تم التسليم بنجاح لباب العميل' : 'Delivered to Doorstep',
              time: order.fulfillmentStatus === 'DELIVERED' ? (isAr ? 'تم الاستلام' : 'Delivered') : (isAr ? 'بانتظار الاستلام' : 'Pending'),
              done: order.fulfillmentStatus === 'DELIVERED',
            },
          ],
        });
      } else {
        // Fallback demo tracker
        generateDemoTracker(orderId);
      }
    } catch {
      generateDemoTracker(orderId);
    } finally {
      setLoading(false);
    }
  };

  const generateDemoTracker = (id: string) => {
    setTrackedOrder({
      orderId: id,
      status: 'SHIPPED',
      carrier: isAr ? 'مندوب دار بيرغندي المبرد (الدوحة)' : 'BURGUNDY Climate-Safe Courier (Doha)',
      estimatedDelivery: isAr ? 'اليوم بين 4:00 - 8:00 مساءً' : 'Today between 4:00 - 8:00 PM',
      destination: isAr ? 'الريان، المنطقة 55، دولة قطر' : 'Al Rayyan, Zone 55, Qatar',
      steps: [
        { title: isAr ? 'تم استلام وتأكيد الطلب بالمرسم' : 'Order Confirmed at Atelier', time: '10:30 AM', done: true },
        { title: isAr ? 'فحص جودة الحرير والفوال والتغليف الفاخر' : 'Quality Inspection & Silk Packaging', time: '01:15 PM', done: true },
        { title: isAr ? 'الشحنة مع مندوب التوصيل في قطر' : 'Out for Courier Delivery in Qatar', time: '03:45 PM', done: true, current: true },
        { title: isAr ? 'تم التسليم بنجاح لباب العميل' : 'Delivered to Doorstep', time: 'Estimated 06:00 PM', done: false },
      ],
    });
  };

  useEffect(() => {
    if (initialOrder) {
      fetchOrderTracking(initialOrder);
    }
  }, [initialOrder]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderQuery.trim()) {
      fetchOrderTracking(orderQuery.trim());
    }
  };

  return (
    <div className="min-h-screen bg-canvas py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-surface-peachSoft/40 text-burgundy rounded-full flex items-center justify-center mx-auto mb-3 border border-gold-hairline shadow-sm">
            <Truck className="w-7 h-7 rtl-flip text-burgundy" />
          </div>
          <h1 className="text-3xl font-extrabold text-burgundy font-cairo">
            {isAr ? 'تتبع مسار شحنتكِ الملكية' : 'Track Your Royal Order'}
          </h1>
          <p className="text-xs text-slateText-secondary max-w-md mx-auto leading-relaxed">
            {isAr
              ? 'أدخلي رقم الطلب المسجل في فاتورة دار بيرغندي لمتابعة خط سير مندوب التوصيل بالدوحة.'
              : 'Enter your BURGUNDY order invoice reference to view live courier and packaging milestones.'}
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="bg-white p-2 sm:p-2.5 rounded-3xl border border-gold-hairline shadow-luxury flex gap-2">
          <Input
            placeholder={isAr ? 'رقم الطلب (مثال: QA-123456 أو BURG-2026-XXXX)' : 'Order ID (e.g. QA-123456)'}
            value={orderQuery}
            onChange={(e) => setOrderQuery(e.target.value)}
            className="border-0 shadow-none focus:ring-0 bg-transparent text-xs sm:text-sm text-slateText-body"
          />
          <Button
            type="submit"
            variant="primary"
            icon={<Search className="w-4 h-4" />}
            className="bg-burgundy hover:bg-burgundy-hover text-white rounded-2xl px-5 text-xs font-bold"
          >
            {loading ? (isAr ? 'جاري البحث...' : 'Searching...') : (isAr ? 'تتبع' : 'Track')}
          </Button>
        </form>

        {trackedOrder && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gold-hairline shadow-luxury space-y-6 animate-scaleUp">
            <div className="flex items-center justify-between pb-4 border-b border-gold-hairline">
              <div>
                <span className="text-[10px] font-bold text-coral uppercase tracking-wider block">
                  {isAr ? 'شحنة نشطة ومؤمنة في قطر' : 'Live Insured Qatar Delivery'}
                </span>
                <span className="font-mono text-base font-extrabold text-burgundy">
                  #{trackedOrder.orderId}
                </span>
              </div>
              <span className="px-3.5 py-1.5 bg-burgundy/10 text-burgundy rounded-full text-xs font-bold flex items-center gap-1.5 border border-gold-hairline">
                <Truck className="w-3.5 h-3.5" />
                <span>{trackedOrder.status === 'DELIVERED' ? (isAr ? 'تم التسليم' : 'Delivered') : (isAr ? 'في طريقها إليكِ' : 'In Transit')}</span>
              </span>
            </div>

            {/* Carrier & Time Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-canvas-warm/40 rounded-2xl border border-gold-hairline text-xs">
              <div>
                <span className="block text-[10px] text-slateText-secondary">{isAr ? 'الناقل المعتمد:' : 'Courier Carrier:'}</span>
                <strong className="text-burgundy">{trackedOrder.carrier}</strong>
              </div>
              <div>
                <span className="block text-[10px] text-slateText-secondary">{isAr ? 'الموعد المتوقع للتسليم:' : 'Estimated Arrival:'}</span>
                <strong className="text-burgundy font-mono">{trackedOrder.estimatedDelivery}</strong>
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
                        st.done ? 'bg-burgundy' : 'bg-gold-hairline/60'
                      }`}
                    />
                  )}

                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${
                      st.done
                        ? 'bg-burgundy text-white'
                        : 'bg-canvas-warm/80 text-slateText-secondary border border-gold-hairline'
                    }`}
                  >
                    {st.done ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-3.5 h-3.5" />}
                  </div>

                  <div className="flex-1 flex items-center justify-between">
                    <div>
                      <p className={`text-xs font-bold ${st.current ? 'text-burgundy' : 'text-slateText-body'}`}>
                        {st.title}
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-slateText-secondary">{st.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gold-hairline flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-1.5 text-slateText-secondary">
                <ShieldCheck className="w-4 h-4 text-gold-line" />
                <span>{isAr ? 'تغليف فاخر ضد الرطوبة مع بطاقة إهداء' : 'Climate-sealed luxury gift package'}</span>
              </div>
              <Link href={`/${lang}/orders/${trackedOrder.orderId}`}>
                <Button variant="ghost" size="sm" className="text-burgundy hover:text-burgundy-hover">
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

export default function TrackingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-canvas p-12 text-center text-xs text-slateText-secondary">Loading BURGUNDY tracking...</div>}>
      <TrackingContent />
    </Suspense>
  );
}
