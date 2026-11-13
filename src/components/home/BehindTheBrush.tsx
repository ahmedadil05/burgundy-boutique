'use client';

import React from 'react';
import { Palette, Feather, Sparkles, Compass } from 'lucide-react';
import { Language, getDictionary } from '../../lib/i18n';

interface BehindTheBrushProps {
  lang: Language;
}

export function BehindTheBrush({ lang }: BehindTheBrushProps) {
  const dict = getDictionary(lang);
  const isRtl = lang === 'ar';

  const steps = [
    {
      num: '01',
      icon: Compass,
      title: isRtl ? 'انتقاء القماش الفاخر' : 'Noble Fabric Selection',
      desc: isRtl
        ? 'نختار أجود أنواع الفوال السويسري والحرير الخالص المنسوج خصيصاً في سانت غالن ليتحمل الرسم الدقيق والحرارة بلطافة وانسيابية.'
        : 'Selecting the purest Swiss cotton voile and raw silk specifically woven in St. Gallen to support delicate brushwork and fluid movement.',
    },
    {
      num: '02',
      icon: Palette,
      title: isRtl ? 'مطبخ الألوان وخلط الأصباغ' : 'Pigment Artistry',
      desc: isRtl
        ? 'خلط يدوي لألوان وأصباغ مستوحاة من رمال الصحراء وظلال الورق ونغمات البيرغندي الفاتنة مع لمسات الذهب السائلة.'
        : 'Custom blending non-toxic permanent pigments inspired by desert sands, botanical shadows, and deep velvet burgundy.',
    },
    {
      num: '03',
      icon: Feather,
      title: isRtl ? 'الرسم اليدوي والتثبيت' : 'Hand-Guided Brushwork',
      desc: isRtl
        ? 'كل قطعة تمر بمراحل رسم يدوي دقيق يستغرق أياماً متواصلة بأنامل فنانات متخصصات لضمان تفرد كل ثوب وجلابية وعدم تكرار تفاصيلها.'
        : 'Each toub is hand-painted over several days by master artisans, guaranteeing that no two pieces are ever identical.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-canvas border-b border-gold-hairline/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-gold-hairline text-burgundy text-[11px] font-semibold tracking-widest uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold-ink" />
            <span className="font-display">{isRtl ? 'حرفية المرسم والتراث' : 'ATELIER CRAFTSMANSHIP'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-burgundy font-display tracking-tight">
            {dict.home.behindTheBrushTitle}
          </h2>

          <p className="text-sm sm:text-base text-slateText-body font-normal leading-relaxed font-body max-w-xl mx-auto">
            {dict.home.behindTheBrushSubtitle}
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-gold-hairline shadow-sm hover:shadow-luxury hover:border-burgundy/40 transition-all duration-300 flex flex-col justify-between group relative"
              >
                <div>
                  {/* Top Row: Icon + Step Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-burgundy/5 border border-gold-hairline/40 text-burgundy flex items-center justify-center group-hover:bg-burgundy group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" strokeWidth={1.75} />
                    </div>

                    <span className="text-4xl font-extrabold font-display text-gold-ink/40 group-hover:text-gold-ink transition-colors">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-burgundy mb-3 font-display">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slateText-body leading-relaxed font-body">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gold-hairline/40 flex items-center justify-between text-[11px] text-gold-ink font-semibold uppercase tracking-wider">
                  <span>{isRtl ? 'مرحلة أصيلة' : 'Authentic Stage'}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
