'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { OrderInvoice } from '@/lib/order-utils';
import { Language } from '@/lib/i18n';
import { InvoiceView } from '@/components/checkout/InvoiceView';
import { ReviewSubmitModal } from '@/components/reviews/ReviewSubmitModal';
import { CheckCircle2, ArrowRight, ArrowLeft, PackageCheck, Sparkles } from 'lucide-react';

export default function OrderConfirmationPage() {
  const params = useParams();
  const lang = (params?.lang === 'en' ? 'en' : 'ar') as Language;
  const isAr = lang === 'ar';
  const orderId = params?.id as string;

  const [order, setOrder] = useState<OrderInvoice | null>(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  useEffect(() => {
    try {
      const orders: OrderInvoice[] = JSON.parse(
        localStorage.getItem('burgundy_orders') || localStorage.getItem('kandaka_orders') || '[]'
      );
      const found = orders.find((o) => o.orderId === orderId);
      if (found) {
        setOrder(found);
      } else {
        // Honest state: nothing stored on this device under this id
        setOrder(null);
      }
    } catch {}
  }, [orderId, isAr]);

  if (!order) {
    return (
      <div className="min-h-screen bg-canvas py-16 px-6 flex items-center justify-center">
        <div className="max-w-md text-center bg-white border border-gold-hairline rounded-3xl p-8 shadow-luxury space-y-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-canvas-warm flex items-center justify-center">
            <PackageCheck className="w-6 h-6 text-burgundy" aria-hidden="true" />
          </div>
          <h1 className="text-xl font-bold text-burgundy font-display">
            {isAr ? 'لم نجد هذه الفاتورة على هذا الجهاز' : 'Invoice not found on this device'}
          </h1>
          <p className="text-xs text-slateText-secondary leading-relaxed">
            {isAr
              ? 'الفواتير تُحفظ محلياً على الجهاز الذي أتممتِ منه الطلب. إذا كانت الطلبيات هنا فارغة، يمكنكِ تتبع طلبكِ باستخدام رقم الطلب والجوال المسجل عند الدفع.'
              : 'Invoices are stored locally on the device you ordered from. If this list is empty, track your order with the order number and the checkout phone instead.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href={`/${lang}/tracking`} className="inline-flex items-center gap-2 bg-burgundy text-white text-xs font-bold rounded-full px-5 py-2.5 hover:bg-burgundy-hover transition-colors">
              {isAr ? 'الذهاب للتتبع' : 'Go to Order Tracking'}
            </Link>
            <Link href={`/${lang}/shop`} className="inline-flex items-center gap-2 text-xs font-bold text-burgundy hover:underline">
              {isAr ? 'تصفح المتجر' : 'Browse the Boutique'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas py-10 px-4 sm:px-6 lg:px-8 leaf-shadow-bg">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Success Alert Banner (Hidden on print) */}
        <div className="print:hidden bg-white border border-gold-hairline rounded-2xl p-6 text-center space-y-3 shadow-luxury animate-fadeIn">
          <div className="w-12 h-12 bg-surface-peachSoft/50 text-burgundy rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7 text-burgundy" />
          </div>

          <h1 className="text-2xl font-extrabold text-burgundy font-display">
            {order.paymentStatus === 'pending_verification'
              ? isAr ? 'تم استلام طلبكِ وجاري مراجعة إشعار التحويل' : 'Order Received - Verifying Bank Slip'
              : isAr ? 'تم تأكيد طلبكِ وسداد الفاتورة بنجاح!' : 'Your Order & Invoice Are Confirmed!'}
          </h1>

          <p className="text-xs text-slateText-body max-w-md mx-auto leading-relaxed">
            {isAr
              ? `تم إصدار الفاتورة التجارية رقم ${order.invoiceNumber} وتوثيقها رسمياً وفق السجل التجاري ${order.crNumber}. سيقوم مندوب التوصيل بالتواصل معكِ فور الشحن.`
              : `Official invoice ${order.invoiceNumber} has been recorded under CR: ${order.crNumber}. Tracking notification has been dispatched.`}
          </p>

          {/* Quick Tracking Status Timeline */}
          <div className="flex items-center justify-center gap-6 pt-3 text-xs text-slateText-secondary border-t border-gold-hairline/50">
            <div className="flex items-center gap-1.5 font-bold text-burgundy">
              <span className="w-2 h-2 rounded-full bg-burgundy" />
              <span>{isAr ? 'تم التأكيد' : 'Confirmed'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slateText-secondary">
              <span className="w-2 h-2 rounded-full bg-gold-hairline" />
              <span>{isAr ? 'تجهيز القطعة' : 'Atelier Prep'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slateText-secondary">
              <span className="w-2 h-2 rounded-full bg-gold-hairline" />
              <span>{isAr ? 'جاري الشحن' : 'Shipped'}</span>
            </div>
          </div>
        </div>

        {/* Official Interactive Invoice View (Downloadable PDF & Print Friendly) */}
        <InvoiceView invoice={order} lang={lang} />

        {/* Review Your Purchase (public moderation queue) */}
        <div className="print:hidden bg-white border border-gold-hairline rounded-3xl p-6 sm:p-8 text-center space-y-3 shadow-sm">
          <h3 className="text-base font-bold text-burgundy font-display">
            {isAr ? 'ما رأيكِ في تجربتكِ؟' : 'How was your experience?'}
          </h3>
          <p className="text-xs text-slateText-secondary max-w-md mx-auto leading-relaxed">
            {isAr
              ? 'رأيكِ يساعدنا ويسعد عميلات أخريات. ستظهر المراجعة بعد اعتماد دار بيرغندي لها.'
              : 'Your words matter — and help other clients choose. Reviews appear after BURGUNDY approval.'}
          </p>
          <button
            type="button"
            onClick={() => setReviewModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-burgundy text-white hover:bg-burgundy-hover text-xs font-bold transition-colors shadow-luxury focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy"
          >
            <Sparkles className="w-4 h-4 text-gold-line" />
            {isAr ? 'شاركي تجربتكِ' : 'Share Your Review'}
          </button>
        </div>

        <ReviewSubmitModal
          isOpen={reviewModalOpen}
          onClose={() => setReviewModalOpen(false)}
          lang={lang}
          itemHint={order.items?.[0]?.title}
        />

        {/* Back to Shop link */}
        <div className="text-center pt-4 print:hidden">
          <Link
            href={`/${lang}/shop`}
            className="inline-flex items-center gap-2 text-xs font-bold text-burgundy hover:underline"
          >
            {isAr ? <ArrowRight className="w-3.5 h-3.5 rtl-flip" /> : <ArrowLeft className="w-3.5 h-3.5 rtl-flip" />}
            <span>{isAr ? 'متابعة التسوق في المتجر' : 'Continue Shopping'}</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
