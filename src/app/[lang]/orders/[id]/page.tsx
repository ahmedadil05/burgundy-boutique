'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { OrderInvoice } from '@/lib/order-utils';
import { Language } from '@/lib/i18n';
import { complianceConfig } from '@/config/compliance';
import { InvoiceView } from '@/components/checkout/InvoiceView';
import { CheckCircle2, ArrowRight, ArrowLeft, Clock, PackageCheck } from 'lucide-react';

export default function OrderConfirmationPage() {
  const params = useParams();
  const lang = (params?.lang === 'en' ? 'en' : 'ar') as Language;
  const isAr = lang === 'ar';
  const orderId = params?.id as string;

  const [order, setOrder] = useState<OrderInvoice | null>(null);

  useEffect(() => {
    try {
      const orders: OrderInvoice[] = JSON.parse(
        localStorage.getItem('burgundy_orders') || localStorage.getItem('kandaka_orders') || '[]'
      );
      const found = orders.find((o) => o.orderId === orderId);
      if (found) {
        setOrder(found);
      } else {
        // Fallback demo order for preview
        setOrder({
          orderId: orderId || 'QA-894210',
          invoiceNumber: 'INV-2026-1001',
          orderDate: new Date().toISOString(),
          legalEntityName: complianceConfig.legalEntityName,
          crNumber: complianceConfig.crNumber,
          licenseNumber: complianceConfig.licenseNumber,
          mociReference: complianceConfig.mociDecisionReference,
          customer: {
            name: 'Sara Al-Kuwari (سارة الكواري)',
            phone: '+974 5000 0974',
            email: 'sara.kuwari@example.qa',
            zone: '55',
            street: 'Al Waab St.',
            building: 'Villa 9',
            municipality: 'Al Rayyan',
          },
          items: [
            {
              id: 'prod-001',
              title: isAr ? 'ثوب حرير مرسوم يدوياً بتدرجات البيرغندي' : 'Hand-Painted Royal Silk Toub in Burgundy Sunset',
              priceQAR: 1650,
              quantity: 1,
              size: 'Free Size (4.5m x 1.15m)',
            },
          ],
          paymentMethod: 'fawran',
          paymentStatus: 'paid',
          totals: {
            subtotal: 1650,
            deliveryFee: 0,
            taxAmount: 0,
            taxPercent: 0,
            total: 1650,
            isFreeDelivery: true,
          },
          status: 'confirmed',
        });
      }
    } catch {}
  }, [orderId, isAr]);

  if (!order) return null;

  return (
    <div className="min-h-screen bg-canvas py-10 px-4 sm:px-6 lg:px-8 leaf-shadow-bg">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Success Alert Banner (Hidden on print) */}
        <div className="print:hidden bg-white border border-gold-hairline rounded-2xl p-6 text-center space-y-3 shadow-luxury animate-fadeIn">
          <div className="w-12 h-12 bg-surface-peachSoft/50 text-burgundy rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7 text-burgundy" />
          </div>

          <h1 className="text-2xl font-extrabold text-burgundy font-cairo">
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
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-surface-peachMuted" />
              <span>{isAr ? 'تجهيز القطعة' : 'Atelier Prep'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-surface-peachMuted" />
              <span>{isAr ? 'جاري الشحن' : 'Shipped'}</span>
            </div>
          </div>
        </div>

        {/* Official Interactive Invoice View (Downloadable PDF & Print Friendly) */}
        <InvoiceView invoice={order} lang={lang} />

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
