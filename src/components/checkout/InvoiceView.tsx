'use client';

import React, { useRef } from 'react';
import { OrderInvoice } from '../../lib/order-utils';
import { Language } from '../../lib/i18n';
import { Printer, Download, Mail, MessageCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface InvoiceViewProps {
  invoice: OrderInvoice;
  lang?: Language;
}

export function InvoiceView({ invoice, lang = 'ar' }: InvoiceViewProps) {
  const isRtl = lang === 'ar';
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `فاتورة دار بيرغندي / BURGUNDY Invoice: ${invoice.invoiceNumber}\nالمجموع / Total: ${invoice.totals.total} QAR\nرقم الطلب / Order: ${invoice.orderId}`
    );
    window.open(`https://wa.me/${invoice.customer.phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-gold-hairline shadow-soft print:hidden">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-xs font-bold text-burgundy">
            {invoice.invoiceNumber}
          </span>
          <span className="text-xs text-slateText-secondary">
            ({invoice.paymentStatus.toUpperCase()})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-xl bg-burgundy hover:bg-burgundy-hover text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{isRtl ? 'طباعة / حفظ PDF' : 'Print / Download PDF'}</span>
          </button>

          <button
            onClick={handleShareWhatsApp}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-surface-peachSoft/40 text-slateText-body border border-gold-hairline text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>{isRtl ? 'إرسال بالواتساب' : 'WhatsApp'}</span>
          </button>
        </div>
      </div>

      {/* Printable Invoice Sheet (A4 & Mobile Responsive) */}
      <div
        ref={invoiceRef}
        className="bg-white p-6 sm:p-10 rounded-2xl border border-gold-hairline shadow-luxury max-w-3xl mx-auto print:border-none print:shadow-none print:p-0"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Invoice Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gold-hairline">
          <div>
            <span className="brand-wordmark text-2xl sm:text-3xl text-burgundy block font-extrabold">
              {invoice.legalEntityName.en.toUpperCase()}
            </span>
            <p className="text-sm font-display text-slateText-secondary font-medium">
              {invoice.legalEntityName.ar}
            </p>
            <p className="text-[11px] text-slateText-secondary mt-1">
              الدوحة، دولة قطر • Doha, State of Qatar
            </p>
          </div>

          <div className="text-start sm:text-end space-y-1">
            <span className="text-xs uppercase font-extrabold tracking-widest text-gold-ink block">
              OFFICIAL INVOICE • فاتورة ضريبية رسمية
            </span>
            <p className="text-lg font-bold text-burgundy">
              {invoice.invoiceNumber}
            </p>
            <p className="text-xs text-slateText-secondary">
              {new Date(invoice.orderDate).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>

        {/* Legal Regulatory Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-4 text-[11px] border-b border-gold-hairline/50 bg-canvas-warm/40 p-3 rounded-xl my-4">
          <div>
            <span className="text-slateText-secondary block">السجل التجاري / CR No:</span>
            <strong className="text-slateText-body font-mono">{invoice.crNumber}</strong>
          </div>
          <div>
            <span className="text-slateText-secondary block">رخصة المتجر / E-Com License:</span>
            <strong className="text-slateText-body font-mono">{invoice.licenseNumber}</strong>
          </div>
          <div>
            <span className="text-slateText-secondary block">المرجع التنظيمي / MOCI:</span>
            <span className="text-slateText-body font-medium">{invoice.mociReference}</span>
          </div>
        </div>

        {/* Customer & Order Metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-4">
          <div>
            <h4 className="text-xs uppercase font-bold text-burgundy mb-2 tracking-wider">
              {isRtl ? 'بيانات العميل والتوصيل / Bill To' : 'Customer & Delivery Information'}
            </h4>
            <div className="text-xs space-y-1 text-slateText-body">
              <p className="font-bold text-sm text-slateText-body">{invoice.customer.name}</p>
              <p dir="ltr" className="text-start">{invoice.customer.phone}</p>
              <p>{invoice.customer.email}</p>
              <p>
                Zone: {invoice.customer.zone}, Street: {invoice.customer.street}, Building: {invoice.customer.building}
              </p>
              <p>{invoice.customer.municipality}, Qatar</p>
            </div>
          </div>

          <div className="text-start sm:text-end">
            <h4 className="text-xs uppercase font-bold text-burgundy mb-2 tracking-wider">
              {isRtl ? 'تفاصيل السداد / Payment' : 'Payment Details'}
            </h4>
            <div className="text-xs space-y-1 text-slateText-body">
              <p>
                <span className="text-slateText-secondary">{isRtl ? 'رقم الطلب:' : 'Order ID:'}</span>{' '}
                <strong className="font-mono">{invoice.orderId}</strong>
              </p>
              <p>
                <span className="text-slateText-secondary">{isRtl ? 'طريقة الدفع:' : 'Payment Rail:'}</span>{' '}
                <span className="font-semibold uppercase">{invoice.paymentMethod}</span>
              </p>
              <p>
                <span className="text-slateText-secondary">{isRtl ? 'حالة السداد:' : 'Payment Status:'}</span>{' '}
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-surface-peachSoft/50 text-burgundy uppercase">
                  {invoice.paymentStatus}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="my-6 overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead>
              <tr className="border-b border-gold-hairline text-slateText-secondary font-semibold">
                <th className="py-2.5 text-start">{isRtl ? 'القطعة / الوصف' : 'Item / Description'}</th>
                <th className="py-2.5 text-center">{isRtl ? 'المقاس' : 'Size'}</th>
                <th className="py-2.5 text-center">{isRtl ? 'الكمية' : 'Qty'}</th>
                <th className="py-2.5 text-end">{isRtl ? 'سعر الوحدة (ر.ق)' : 'Unit Price (QAR)'}</th>
                <th className="py-2.5 text-end">{isRtl ? 'الإجمالي (ر.ق)' : 'Total (QAR)'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-hairline/40">
              {invoice.items.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-3 font-medium text-slateText-body">
                    {item.title}
                  </td>
                  <td className="py-3 text-center text-slateText-secondary">{item.size || 'Free Size'}</td>
                  <td className="py-3 text-center font-bold text-slateText-body">{item.quantity}</td>
                  <td className="py-3 text-end font-mono">{item.priceQAR}</td>
                  <td className="py-3 text-end font-bold font-mono text-burgundy">
                    {item.priceQAR * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Summary */}
        <div className="flex flex-col items-end space-y-1.5 pt-4 border-t border-gold-hairline text-xs">
          <div className="flex justify-between w-64 text-slateText-secondary">
            <span>{isRtl ? 'المجموع الفرعي:' : 'Subtotal:'}</span>
            <span className="font-mono">{invoice.totals.subtotal} QAR</span>
          </div>

          <div className="flex justify-between w-64 text-slateText-secondary">
            <span>{isRtl ? 'رسوم التوصيل:' : 'Delivery Fee:'}</span>
            <span className="font-mono">
              {invoice.totals.deliveryFee === 0
                ? isRtl ? 'مجاني' : 'FREE'
                : `${invoice.totals.deliveryFee} QAR`}
            </span>
          </div>

          {invoice.totals.taxAmount > 0 && (
            <div className="flex justify-between w-64 text-slateText-secondary">
              <span>{isRtl ? `الضريبة (${invoice.totals.taxPercent}%):` : `Tax (${invoice.totals.taxPercent}%):`}</span>
              <span className="font-mono">{invoice.totals.taxAmount} QAR</span>
            </div>
          )}

          <div className="flex justify-between w-64 pt-2 border-t border-gold-hairline font-bold text-sm text-burgundy">
            <span>{isRtl ? 'الإجمالي النهائي:' : 'Grand Total:'}</span>
            <span className="font-mono text-base">{invoice.totals.total} QAR</span>
          </div>
        </div>

        {/* Footer Notes & Compliance */}
        <div className="mt-8 pt-4 border-t border-gold-hairline/50 text-[10px] text-slateText-secondary text-center space-y-1">
          <p>
            {isRtl
              ? 'شكراً لتسوقكم من دار بيرغندي للأزياء الفاخرة. للاستبدال أو الاسترجاع يرجى مراجعة سياسة المتجر خلال 14 يوماً.'
              : 'Thank you for choosing BURGUNDY. Pursuant to Qatar consumer protection laws, returns/exchanges are valid within 14 days.'}
          </p>
          <p className="font-semibold text-burgundy">
            www.burgundy.com.qa • care@burgundy.com.qa • +974 5000 0974
          </p>
        </div>

      </div>
    </div>
  );
}
