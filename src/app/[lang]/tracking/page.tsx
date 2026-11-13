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
  const [phoneQuery, setPhoneQuery] = useState('');
  const [error, setErrorState] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [trackedOrder, setTrackedOrder] = useState<any | null>(null);

  const digitsOnly = (s: string) => s.replace(/\D/g, '');

  const mapRealOrder = (data: any) => {
    const status: string = data.status || 'Confirmed';
    const isShipped = status === 'Shipped' || status === 'Delivered';
    const isDelivered = status === 'Delivered';
    const created = data.createdAt ? new Date(data.createdAt) : new Date();
    return {
      orderId: data.orderNumber,
      status,
      carrier: isAr ? 'مندوب دار بيرغندي المبرد (الدوحة)' : 'BURGUNDY Climate-Controlled Express (Doha)',
      estimatedDelivery: isDelivered
        ? isAr ? 'تم التسليم' : 'Delivered'
        : isAr ? 'خلال 24-48 ساعة' : 'Within 24-48 hours',
      destination: data.customer?.municipality ? `${data.customer.municipality}, Qatar` : 'Qatar',
      customerName: data.customer?.name || '',
      maskedPhone: data.customer?.maskedPhone || '',
      totalQAR: data.totalQAR,
      createdAt: created.toLocaleString(),
      steps: [
        {
          title: isAr ? 'تم استلام وتأكيد طلبكِ من الأتيليه' : 'Order confirmed at the atelier',
          time: created.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          done: true,
        },
        {
          title: isAr ? 'الفحص والمقاس والتغليف الملكي' : 'Atelier inspection & regal packaging',
          time: status === 'Confirmed' ? (isAr ? 'قيد التنفيذ' : 'In progress') : (isAr ? 'مكتمل' : 'Completed'),
          done: status !== 'Confirmed',
          current: status === 'Processing' || status === 'In Atelier' || status === 'Confirmed',
        },
        {
          title: isAr ? 'مع مندوب التوصيل في قطر' : 'Out with BURGUNDY courier',
          time: isAr ? 'جاري التوصيل' : 'In transit',
          done: isShipped,
          current: status === 'Shipped',
        },
        {
          title: isAr ? 'تم التسليم بنجاح لباب العميل' : 'Delivered to your doorstep',
          time: isDelivered ? (isAr ? 'تم الاستلام' : 'Delivered') : (isAr ? 'بانتظار التسليم' : 'Pending'),
          done: isDelivered,
        },
      ],
    };
  };

  const fetchOrderTracking = async (orderId: string, phone: string) => {
    if (!orderId.trim() || !phone.trim()) {
      setErrorState(isAr ? 'أدخلي رقم الطلب ورقم الجوال المستخدم عند الطلب.' : 'Enter the order number and the phone used at checkout.');
      return;
    }
    setLoading(true);
    setErrorState(null);
    setTrackedOrder(null);

    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(orderId.trim())}?phone=${encodeURIComponent(phone.trim())}`);
      if (res.ok) {
        const data = await res.json();
        setTrackedOrder(mapRealOrder(data));
      } else {
        setErrorState(isAr ? 'لم يتم العثور على طلب بهذا الرقم ورقم الجوال. تحققي منهما.' : 'No order found for this order number and phone combination.');
      }
    } catch {
      setErrorState(isAr ? 'تعذر الاتصال بالخادم. حاولي مرة أخرى.' : 'Could not reach the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialOrder) {
      fetchOrderTracking(initialOrder, phoneQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialOrder]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrderTracking(orderQuery, phoneQuery);
  };

  return (
    <div className="min-h-screen bg-canvas py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-surface-peachSoft/40 text-burgundy rounded-full flex items-center justify-center mx-auto mb-3 border border-gold-hairline shadow-sm">
            <Truck className="w-7 h-7 rtl-flip text-burgundy" />
          </div>
          <h1 className="text-3xl font-extrabold text-burgundy font-display">
            {isAr ? 'تتبع مسار شحنتكِ الملكية' : 'Track Your Royal Order'}
          </h1>
          <p className="text-xs text-slateText-secondary max-w-md mx-auto leading-relaxed">
            {isAr
              ? 'أدخلي رقم طلبكِ في فاتورة بيرغندي مع الجوال المستخدم عند الدفع لمتابعة شحنتكِ، خطوة بخطوة.'
              : 'Enter your BURGUNDY order number with the phone used at checkout to follow your courier, step by step.'}
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="bg-white p-3 sm:p-4 rounded-3xl border border-gold-hairline shadow-luxury space-y-2.5">
          <Input
            placeholder={isAr ? 'رقم الطلب (مثال: BUR-2026-1234)' : 'Order number (e.g. BUR-2026-1234)'}
            value={orderQuery}
            onChange={(e) => setOrderQuery(e.target.value)}
            className="text-xs sm:text-sm text-slateText-body"
            aria-label={isAr ? 'رقم الطلب' : 'Order number'}
          />
          <div className="flex gap-2">
            <Input
              placeholder={isAr ? 'رقم الجوال المستخدم عند الطلب (مثال: 50000974)' : 'Phone used at checkout (e.g. 50000974)'}
              value={phoneQuery}
              onChange={(e) => setPhoneQuery(e.target.value)}
              className="text-xs sm:text-sm text-slateText-body"
              inputMode="tel"
              aria-label={isAr ? 'رقم الجوال' : 'Phone number used at checkout'}
            />
            <Button
              type="submit"
              variant="primary"
              icon={<Search className="w-4 h-4" />}
              className="bg-burgundy hover:bg-burgundy-hover text-white rounded-2xl px-5 text-xs font-bold shrink-0"
            >
              {loading ? (isAr ? 'جاري البحث...' : 'Searching...') : (isAr ? 'تتبع' : 'Track')}
            </Button>
          </div>
          <p className="text-[10px] text-slateText-secondary px-1">
            {isAr
              ? 'رقم طلبكِ + الجوال المستخدم عند الدفع لعرض حالة التوصيل — حماية لخصوصية عملاء الدار.'
              : 'Your order number + the checkout phone number — an extra privacy layer for BURGUNDY customers.'}
          </p>
        </form>

        {error && (
          <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-800 text-center">
            {error}
          </div>
        )}

        {trackedOrder && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gold-hairline shadow-luxury space-y-6 animate-scaleUp">
            <div className="flex items-center justify-between pb-4 border-b border-gold-hairline">
              <div>
                <span className="text-[10px] font-bold text-coral-ink uppercase tracking-wider block">
                  {isAr ? 'شحنة نشطة ومؤمنة في قطر' : 'Live Insured Qatar Delivery'}
                </span>
                <span className="font-mono text-base font-extrabold text-burgundy">
                  #{trackedOrder.orderId}
                </span>
              </div>
              <span className="px-3.5 py-1.5 bg-burgundy/10 text-burgundy rounded-full text-xs font-bold flex items-center gap-1.5 border border-gold-hairline">
                <Truck className="w-3.5 h-3.5" />
                <span>
                  {trackedOrder.status === 'Delivered'
                    ? isAr ? 'تم التسليم' : 'Delivered'
                    : trackedOrder.status === 'Shipped'
                    ? isAr ? 'مع مندوب التوصيل' : 'Out for Delivery'
                    : trackedOrder.status === 'Cancelled'
                    ? isAr ? 'ملغي' : 'Cancelled'
                    : isAr ? 'قيد التجهيز في الأتيليه' : 'Preparing at Atelier'}
                </span>
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
              <div>
                <span className="block text-[10px] text-slateText-secondary">{isAr ? 'صاحب الطلب:' : 'Customer:'}</span>
                <strong className="text-burgundy">{trackedOrder.customerName}</strong>
              </div>
              <div>
                <span className="block text-[10px] text-slateText-secondary">{isAr ? 'جهة التوصيل والهاتف:' : 'Deliver to & phone:'}</span>
                <strong className="text-burgundy">{trackedOrder.destination} • <span dir="ltr" className="font-mono">{trackedOrder.maskedPhone}</span></strong>
              </div>
              <div>
                <span className="block text-[10px] text-slateText-secondary">{isAr ? 'قيمة الطلب:' : 'Order total:'}</span>
                <strong className="text-burgundy tabular-nums">{trackedOrder.totalQAR} {isAr ? 'ر.ق' : 'QAR'}</strong>
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
              <Button asChild variant="ghost" size="sm" className="text-burgundy hover:text-burgundy-hover">
                <Link href={`/${lang}/orders/${trackedOrder.orderId}`}>
                  {isAr ? 'عرض الفاتورة الرسمية' : 'View Official Invoice'}
                </Link>
              </Button>
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
