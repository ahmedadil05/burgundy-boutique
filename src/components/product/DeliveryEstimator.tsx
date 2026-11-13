'use client';

import React from 'react';
import { Truck, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { complianceConfig } from '../../config/compliance';
import { Language } from '../../lib/i18n';

export function DeliveryEstimator({ lang = 'ar' }: { lang?: Language }) {
  const isAr = lang === 'ar';

  return (
    <div className="p-4 bg-canvas-warm/40 rounded-2xl border border-gold-hairline space-y-3 text-xs">
      <div className="flex items-center justify-between font-bold text-burgundy">
        <span className="flex items-center gap-1.5 font-cairo">
          <Truck className="w-4 h-4 text-gold-line rtl-flip" />
          <span>{isAr ? 'الشحن والتوصيل السريع' : 'Express Delivery Information'}</span>
        </span>
        <span className="text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full text-[10px] font-semibold border border-emerald-200">
          {isAr ? 'تسليم فوري ومؤمّن' : 'Secured Express'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        {/* Qatar Domestic */}
        <div className="p-3 bg-white rounded-xl border border-gold-hairline space-y-1">
          <div className="flex items-center justify-between text-[11px] font-bold text-burgundy">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-gold-line" />
              <span>{isAr ? 'داخل دولة قطر' : 'Domestic Qatar'}</span>
            </span>
            <span className="text-burgundy font-mono">24 - 48 {isAr ? 'ساعة' : 'hrs'}</span>
          </div>
          <p className="text-[10px] text-slateText-secondary">
            {isAr
              ? `رسوم ثابتة ${complianceConfig.domesticDeliveryFlatRateQAR} ر.ق (مجاناً للطلبات فوق ${complianceConfig.freeDeliveryThresholdQAR} ر.ق)`
              : `Flat ${complianceConfig.domesticDeliveryFlatRateQAR} QAR (FREE over ${complianceConfig.freeDeliveryThresholdQAR} QAR)`}
          </p>
        </div>

        {/* GCC Diaspora */}
        <div className="p-3 bg-white rounded-xl border border-gold-hairline space-y-1">
          <div className="flex items-center justify-between text-[11px] font-bold text-burgundy">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-gold-line" />
              <span>{isAr ? 'دول الخليج (GCC)' : 'GCC Countries'}</span>
            </span>
            <span className="text-burgundy font-mono">3 - 5 {isAr ? 'أيام' : 'days'}</span>
          </div>
          <p className="text-[10px] text-slateText-secondary">
            {isAr
              ? `شحن سريع ومبرد بسعر ثابت ${complianceConfig.gccDeliveryFlatRateQAR} ر.ق`
              : `Express climate-safe courier at ${complianceConfig.gccDeliveryFlatRateQAR} QAR flat`}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-[10px] text-slateText-secondary pt-1">
        <ShieldCheck className="w-3.5 h-3.5 text-gold-line shrink-0" />
        <span>
          {isAr
            ? 'تغليف فاخر مخصص لحماية الثياب والحرير من الرطوبة والتجعد أثناء النقل.'
            : 'Climate-controlled protective packaging for delicate Swiss voile and silk embroidery.'}
        </span>
      </div>
    </div>
  );
}
