'use client';

import React from 'react';
import { CheckoutTotals } from '../../lib/order-utils';
import { formatPrice, Currency } from '../../lib/currency';
import { Language } from '../../lib/i18n';
import { ShieldCheck, Truck } from 'lucide-react';

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
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gold-hairline shadow-sm space-y-4">
      <h3 className="font-bold text-base text-burgundy font-display pb-3 border-b border-gold-hairline flex items-center justify-between">
        <span>{isAr ? 'ملخص التكلفة والشفافية' : 'Cost Breakdown'}</span>
        <span className="text-[10px] font-bold text-burgundy bg-surface-peachSoft/50 px-2.5 py-0.5 rounded-full border border-gold-hairline">
          {isAr ? 'قرار وزاري قطري رقم 25' : 'Qatar MOCI Decision 25'}
        </span>
      </h3>

      <div className="space-y-2.5 text-xs">
        <div className="flex items-center justify-between text-slateText-secondary">
          <span>{isAr ? 'المجموع الفرعي للقطع' : 'Items Subtotal'}</span>
          <span className="font-bold text-slateText-body font-body tabular-nums">
            {formatPrice(totals.subtotal, currency, lang)}
          </span>
        </div>

        <div className="flex items-center justify-between text-slateText-secondary">
          <span className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-gold-line rtl-flip" />
            <span>{isAr ? 'رسوم التوصيل والشحن' : 'Delivery & Courier Fee'}</span>
          </span>
          <span className="font-bold">
            {totals.isFreeDelivery ? (
              <span className="text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
                {isAr ? 'توصيل مجاني' : 'FREE'}
              </span>
            ) : (
              <span className="text-slateText-body font-body tabular-nums">
                {formatPrice(totals.deliveryFee, currency, lang)}
              </span>
            )}
          </span>
        </div>

        <div className="flex items-center justify-between text-slateText-secondary">
          <span>{isAr ? 'الضرائب والرسوم الإضافية' : 'Taxes & Hidden Fees'}</span>
          <span className="font-bold text-emerald-800 font-body tabular-nums">{formatPrice(0, currency, lang)}</span>
        </div>
      </div>

      <div className="pt-3 border-t border-gold-hairline flex items-baseline justify-between">
        <span className="text-sm font-bold text-burgundy font-display">
          {isAr ? 'الإجمالي النهائي المطلوب سداده' : 'Final Total Due'}
        </span>
        <span className="text-2xl font-black text-burgundy font-body tabular-nums">
          {formatPrice(totals.total, currency, lang)}
        </span>
      </div>

      <p className="text-[11px] text-slateText-secondary bg-canvas-warm/40 p-2.5 rounded-xl border border-gold-hairline flex items-center gap-1.5">
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
