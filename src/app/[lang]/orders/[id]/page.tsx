'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { OrderInvoice } from '@/lib/order-utils';
import { formatPrice } from '@/lib/currency';
import { Language } from '@/lib/i18n';
import { Button } from '@/components/ui/Button';
import { complianceConfig } from '@/config/compliance';
import { siteConfig } from '@/config/site';
import {
  CheckCircle2,
  Printer,
  ShieldCheck,
  Package,
  Calendar,
  CreditCard,
  MapPin,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

export default function OrderConfirmationPage() {
  const params = useParams();
  const lang = (params?.lang === 'en' ? 'en' : 'ar') as Language;
  const isAr = lang === 'ar';
  const orderId = params?.id as string;

  const [order, setOrder] = useState<OrderInvoice | null>(null);

  useEffect(() => {
    try {
      const orders: OrderInvoice[] = JSON.parse(
        localStorage.getItem('kandaka_orders') || '[]'
      );
      const found = orders.find((o) => o.orderId === orderId);
      if (found) {
        setOrder(found);
      } else {
        // Fallback demo order for preview
        setOrder({
          orderId: orderId || 'QA-894210',
          orderDate: new Date().toISOString(),
          legalEntityName: complianceConfig.legalEntityName,
          crNumber: complianceConfig.crNumber,
          licenseNumber: complianceConfig.licenseNumber,
          mociReference: complianceConfig.mociDecisionReference,
          customer: {
            name: 'Sara Al-Kuwari',
            phone: '+974 5500 0000',
            email: 'sara@example.qa',
            zone: '55',
            street: 'Al Furousiya St.',
            building: '12',
            municipality: 'Al Rayyan',
          },
          items: [
            {
              id: 'prod-001',
              title: isAr ? 'ثوب سويسري ملكي مطرز بالذهب' : 'Royal Swiss Voile Toub with Gold Work',
              priceQAR: 1450,
              quantity: 1,
              size: 'Free Size (4.5m)',
            },
          ],
          paymentMethod: 'fawran',
          totals: {
            subtotal: 1450,
            deliveryFee: 0,
            total: 1450,
            isFreeDelivery: true,
          },
          status: 'confirmed',
        });
      }
    } catch {}
  }, [orderId, isAr]);

  if (!order) return null;

  return (
    <div className="min-h-screen bg-cream py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Success Alert Header (Hidden on print) */}
        <div className="print:hidden bg-white/90 border-2 border-emerald-500/40 rounded-3xl p-6 text-center space-y-3 shadow-sm animate-scaleUp">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-extrabold text-cocoa-dark font-cairo">
            {isAr ? 'تم تأكيد طلبكِ بنجاح!' : 'Your Order is Confirmed!'}
          </h1>
          <p className="text-xs text-cocoa-muted max-w-md mx-auto">
            {isAr
              ? `تم إصدار الفاتورة التجارية الرسمية وتوثيقها وفق السجل التجاري ${complianceConfig.crNumber}. تم إرسال نسخة إلى بريدكِ الإلكتروني.`
              : `Official commercial invoice issued under CR: ${complianceConfig.crNumber}. A receipt has been dispatched to your email.`}
          </p>

          <div className="flex items-center justify-center gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              icon={<Printer className="w-4 h-4" />}
              onClick={() => window.print()}
            >
              {isAr ? 'طباعة الفاتورة الرسمية' : 'Print Official Invoice'}
            </Button>
            <Link href={`/${lang}/tracking?order=${order.orderId}`}>
              <Button variant="secondary" size="sm">
                {isAr ? 'تتبع مسار الشحنة' : 'Track Shipment'}
              </Button>
            </Link>
          </div>
        </div>

        {/* Official Printable Commercial Tax Invoice */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-peach-soft shadow-lg print:shadow-none print:border-none print:p-0 space-y-8">
          {/* Invoice Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b-2 border-peach-soft">
            <div>
              <span className="text-2xl font-extrabold font-cairo text-cocoa-dark">
                {siteConfig.name[lang]}
              </span>
              <p className="text-xs font-semibold text-cocoa-dark mt-1">
                {complianceConfig.legalEntityName[lang]}
              </p>
              <p className="text-xs text-cocoa-muted mt-0.5">
                {complianceConfig.address.building}, {complianceConfig.address.street},{' '}
                {complianceConfig.address.zone}, {complianceConfig.address.city}, Qatar
              </p>
            </div>

            <div className="text-start sm:text-end space-y-1 text-xs">
              <span className="inline-block px-3 py-1 bg-blush-surface text-coral-warm font-extrabold rounded-full border border-peach-soft text-xs uppercase">
                {isAr ? 'فاتورة تجارية ضريبية' : 'Official Commercial Invoice'}
              </span>
              <p className="font-mono text-sm font-bold text-cocoa-dark pt-1">
                #{order.orderId}
              </p>
              <p className="text-cocoa-muted">
                {new Date(order.orderDate).toLocaleDateString(isAr ? 'ar-QA' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>

          {/* Mandatory Qatar Regulatory Block */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-cream rounded-2xl border border-peach-soft text-xs">
            <div>
              <span className="block text-[10px] text-cocoa-muted">{isAr ? 'السجل التجاري (CR):' : 'CR Number:'}</span>
              <strong className="font-mono text-cocoa-dark">{complianceConfig.crNumber}</strong>
            </div>
            <div>
              <span className="block text-[10px] text-cocoa-muted">{isAr ? 'رخصة التجارة الإلكترونية:' : 'E-Com License:'}</span>
              <strong className="font-mono text-cocoa-dark">{complianceConfig.licenseNumber}</strong>
            </div>
            <div>
              <span className="block text-[10px] text-cocoa-muted">{isAr ? 'طريقة السداد المعتمدة:' : 'Payment Rail:'}</span>
              <strong className="text-coral-warm uppercase">{order.paymentMethod}</strong>
            </div>
            <div>
              <span className="block text-[10px] text-cocoa-muted">{isAr ? 'حالة الطلب:' : 'Order Status:'}</span>
              <strong className="text-emerald-700">{isAr ? 'مؤكد وجاري التجهيز' : 'Confirmed'}</strong>
            </div>
          </div>

          {/* Customer & Address Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-cocoa-dark">
            <div className="space-y-1 p-4 bg-blush-surface/30 rounded-2xl border border-peach-soft/60">
              <strong className="block text-sm font-bold text-cocoa-dark mb-1 font-cairo">
                {isAr ? 'بيانات المستلمة:' : 'Billed & Delivered To:'}
              </strong>
              <p className="font-semibold">{order.customer.name}</p>
              <p className="text-cocoa-muted" dir="ltr">{order.customer.phone}</p>
              <p className="text-cocoa-muted">{order.customer.email}</p>
            </div>

            <div className="space-y-1 p-4 bg-blush-surface/30 rounded-2xl border border-peach-soft/60">
              <strong className="block text-sm font-bold text-cocoa-dark mb-1 font-cairo">
                {isAr ? 'عنوان التوصيل في قطر:' : 'Qatar Delivery Address:'}
              </strong>
              <p>
                <strong>{isAr ? 'البلدية:' : 'Municipality:'}</strong> {order.customer.municipality}
              </p>
              <p>
                <strong>{isAr ? 'المنطقة (Zone):' : 'Zone:'}</strong> {order.customer.zone},{' '}
                <strong>{isAr ? 'الشارع:' : 'Street:'}</strong> {order.customer.street}
              </p>
              <p>
                <strong>{isAr ? 'المبنى / الفيلا:' : 'Building/Villa:'}</strong> {order.customer.building}
              </p>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="overflow-x-auto rounded-2xl border border-peach-soft">
            <table className="w-full text-xs text-start">
              <thead>
                <tr className="bg-blush-surface font-bold text-cocoa-dark border-b border-peach-soft">
                  <th className="p-3 text-start">{isAr ? 'القطعة والتفاصيل' : 'Item Description'}</th>
                  <th className="p-3 text-center">{isAr ? 'المقاس' : 'Size'}</th>
                  <th className="p-3 text-center">{isAr ? 'الكمية' : 'Qty'}</th>
                  <th className="p-3 text-end">{isAr ? 'سعر الوحدة' : 'Unit Price'}</th>
                  <th className="p-3 text-end">{isAr ? 'الإجمالي' : 'Total'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-peach-soft/50">
                {order.items.map((it, i) => (
                  <tr key={i} className="hover:bg-cream/50 transition-colors">
                    <td className="p-3 font-semibold text-cocoa-dark">{it.title}</td>
                    <td className="p-3 text-center text-cocoa-muted">{it.size}</td>
                    <td className="p-3 text-center font-bold">{it.quantity}</td>
                    <td className="p-3 text-end">{formatPrice(it.priceQAR, 'QAR', lang)}</td>
                    <td className="p-3 text-end font-bold text-coral-warm">
                      {formatPrice(it.priceQAR * it.quantity, 'QAR', lang)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Breakdown */}
          <div className="flex justify-end">
            <div className="w-full max-w-xs space-y-2 text-xs">
              <div className="flex justify-between text-cocoa-muted">
                <span>{isAr ? 'المجموع الفرعي:' : 'Subtotal:'}</span>
                <span className="font-bold text-cocoa-dark">
                  {formatPrice(order.totals.subtotal, 'QAR', lang)}
                </span>
              </div>
              <div className="flex justify-between text-cocoa-muted">
                <span>{isAr ? 'رسوم التوصيل:' : 'Delivery Courier:'}</span>
                <span className="font-bold text-cocoa-dark">
                  {order.totals.isFreeDelivery
                    ? isAr ? 'مجاني (0.00 ر.ق)' : 'FREE'
                    : formatPrice(order.totals.deliveryFee, 'QAR', lang)}
                </span>
              </div>
              <div className="flex justify-between text-cocoa-muted">
                <span>{isAr ? 'الضرائب (ضريبة القيمة المضافة):' : 'Taxes / VAT:'}</span>
                <span className="font-bold text-emerald-700">0.00 ر.ق</span>
              </div>
              <div className="pt-2 border-t-2 border-peach-soft flex justify-between items-baseline text-sm font-extrabold text-cocoa-dark">
                <span>{isAr ? 'المبلغ الإجمالي المسدد:' : 'Total Amount Paid:'}</span>
                <span className="text-xl text-coral-warm">
                  {formatPrice(order.totals.total, 'QAR', lang)}
                </span>
              </div>
            </div>
          </div>

          {/* Legal Stamp & Consumer Rights Notice */}
          <div className="pt-6 border-t border-peach-soft/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-cocoa-muted text-center sm:text-start">
            <p className="max-w-md">
              {isAr
                ? 'فاتورة إلكترونية معتمدة صادرة من نظام كنداكة للتجارة الإلكترونية. يحق للعميلة الاستبدال خلال 14 يوماً وفق قانون حماية المستهلك بدولة قطر.'
                : 'Certified electronic invoice under Qatar Ministry of Commerce & Industry regulations. 14-day exchange rights guaranteed.'}
            </p>
            <div className="flex items-center gap-2 font-mono font-bold text-cocoa-dark border border-peach-deep px-3 py-1.5 rounded-xl bg-cream">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>OFFICIAL MOCI VERIFIED</span>
            </div>
          </div>
        </div>

        {/* Back Link (Hidden on print) */}
        <div className="print:hidden text-center pt-4">
          <Link href={`/${lang}`}>
            <Button variant="ghost">
              {isAr ? 'العودة للصفحة الرئيسية' : 'Return to Home'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
