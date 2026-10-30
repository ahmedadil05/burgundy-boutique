'use client';

import React from 'react';
import { CheckoutTotals } from '../../lib/order-utils';
import { formatPrice, Currency } from '../../lib/currency';
import { Language } from '../../lib/i18n';
import { ShieldCheck, Truck, Sparkles } from 'lucide-react';

export interface CostBreakdownProps {
  totals: CheckoutTotals;
  currency?: Currency;
  lang?: Language;
}

export function CostBreakdown({
  totals,
  currency = 'QAR',
  lang = 'ar',
}: CostBreakdownProps) {
  const isAr = lang === 'ar';

  return (
    <div className="bg-white/85 rounded-3xl p-6 sm:p-8 border border-peach-soft shadow-sm space-y-4">
      <h3 className="font-bold text-base text-cocoa-dark font-cairo pb-3 border-b border-peach-soft flex items-center justify-between">
        <span>{isAr ? 'ملخص التكلفة والشفافية' : 'Cost Breakdown'}</span>
        <span className="text-[10px] font-bold text-coral-warm bg-cream px-2.5 py-0.5 rounded-full border border-peach-soft">
          {isAr ? 'قرار وزاري رقم 25' : 'Decision 25/2026'}
        </span>
      </h3>

      <div className="space-y-2.5 text-xs">
        <div className="flex items-center justify-between text-cocoa-muted">
          <span>{isAr ? 'المجموع الفرعي للقطع' : 'Items Subtotal'}</span>
          <span className="font-bold text-cocoa-dark">
            {formatPrice(totals.subtotal, currency, lang)}
          </span>
        </div>

        <div className="flex items-center justify-between text-cocoa-muted">
          <span className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-coral-warm rtl-flip" />
            <span>{isAr ? 'رسوم التوصيل والشحن' : 'Delivery & Courier Fee'}</span>
          </span>
          <span className="font-bold">
            {totals.isFreeDelivery ? (
              <span className="text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full font-bold">
                {isAr ? 'توصيل مجاني' : 'FREE'}
              </span>
            ) : (
              <span className="text-cocoa-dark">
                {formatPrice(totals.deliveryFee, currency, lang)}
              </span>
            )}
          </span>
        </div>

        <div className="flex items-center justify-between text-cocoa-muted">
          <span>{isAr ? 'الضرائب والرسوم الإضافية' : 'Taxes & Hidden Fees'}</span>
          <span className="font-bold text-emerald-700">{formatPrice(0, currency, lang)}</span>
        </div>
      </div>

      <div className="pt-3 border-t border-peach-soft/80 flex items-baseline justify-between">
        <span className="text-sm font-bold text-cocoa-dark">
          {isAr ? 'الإجمالي النهائي المطلوب سداده' : 'Final Total Due'}
        </span>
        <span className="text-2xl font-black text-coral-warm">
          {formatPrice(totals.total, currency, lang)}
        </span>
      </div>

      <p className="text-[11px] text-cocoa-muted bg-cream p-2.5 rounded-xl border border-peach-soft flex items-center gap-1.5">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>
          {isAr
            ? 'سعر نهائي شامل بدون أي رسوم خفية عند الاستلام.'
            : 'Guaranteed total with zero hidden charges upon delivery.'}
        </span>
      </p>
    </div>
  );
}
