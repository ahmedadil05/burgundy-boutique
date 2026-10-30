'use client';

import React from 'react';
import { Truck, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { complianceConfig } from '../../config/compliance';
import { Language } from '../../lib/i18n';

export function DeliveryEstimator({ lang = 'ar' }: { lang?: Language }) {
  const isAr = lang === 'ar';

  return (
    <div className="p-4 bg-blush-surface/50 rounded-2xl border border-peach-soft space-y-3 text-xs">
      <div className="flex items-center justify-between font-bold text-cocoa-dark">
        <span className="flex items-center gap-1.5">
          <Truck className="w-4 h-4 text-coral-warm" />
          <span>{isAr ? 'الشحن والتوصيل السريع' : 'Express Delivery Information'}</span>
        </span>
        <span className="text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full text-[10px] font-semibold">
          {isAr ? 'متوفر الآن' : 'Available'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        {/* Qatar Domestic */}
        <div className="p-2.5 bg-white/80 rounded-xl border border-peach-soft/60 space-y-1">
          <div className="flex items-center justify-between text-[11px] font-bold text-cocoa-dark">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-coral-warm" />
              <span>{isAr ? 'داخل دولة قطر' : 'Domestic Qatar'}</span>
            </span>
            <span className="text-coral-warm">24 - 48 {isAr ? 'ساعة' : 'hrs'}</span>
          </div>
          <p className="text-[10px] text-cocoa-muted">
            {isAr
              ? `رسوم ثابتة ${complianceConfig.domesticDeliveryFlatRateQAR} ر.ق (مجاناً للطلبات فوق ${complianceConfig.freeDeliveryThresholdQAR} ر.ق)`
              : `Flat ${complianceConfig.domesticDeliveryFlatRateQAR} QAR (FREE over ${complianceConfig.freeDeliveryThresholdQAR} QAR)`}
          </p>
        </div>

        {/* GCC Diaspora */}
        <div className="p-2.5 bg-white/80 rounded-xl border border-peach-soft/60 space-y-1">
          <div className="flex items-center justify-between text-[11px] font-bold text-cocoa-dark">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-coral-warm" />
              <span>{isAr ? 'دول الخليج (GCC)' : 'GCC Countries'}</span>
            </span>
            <span className="text-coral-warm">3 - 5 {isAr ? 'أيام' : 'days'}</span>
          </div>
          <p className="text-[10px] text-cocoa-muted">
            {isAr
              ? `شحن سريع ومبرد بسعر ثابت ${complianceConfig.gccDeliveryFlatRateQAR} ر.ق`
              : `Express climate-safe courier at ${complianceConfig.gccDeliveryFlatRateQAR} QAR flat`}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-[10px] text-cocoa-muted pt-1">
        <ShieldCheck className="w-3.5 h-3.5 text-coral-warm shrink-0" />
        <span>
          {isAr
            ? 'تغليف فاخر مخصص لحماية الثياب والحرير من الرطوبة والتجعد أثناء النقل.'
            : 'Climate-controlled protective packaging for delicate Swiss voile and silk embroidery.'}
        </span>
      </div>
    </div>
  );
}
