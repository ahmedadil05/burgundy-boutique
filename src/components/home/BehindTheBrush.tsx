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
        ? 'نختار أجود أنواع الفوال السويسري والحرير الخالص المنسوج خصيصاً ليتحمل الرسم الدقيق والحرارة بلطافة وانسيابية.'
        : 'Selecting the purest Swiss cotton voile and raw silk specifically woven to support delicate brushwork and fluid movement.',
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
        ? 'كل قطعة تمر بمراحل رسم يدوي دقيق يستغرق أياماً متواصلة لضمان تفرد كل ثوب وجلابية وعدم تكرار تفاصيلها.'
        : 'Each toub is hand-painted over several days by master artisans, guaranteeing that no two pieces are ever identical.',
    },
  ];

  return (
    <section className="py-20 bg-surface-cream border-y border-gold-hairline relative overflow-hidden leaf-shadow-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gold-hairline text-burgundy text-[11px] font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-gold-line" />
            <span>{isRtl ? 'حرفية وفن' : 'CRAFTSMANSHIP'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-burgundy font-cairo">
            {dict.home.behindTheBrushTitle}
          </h2>

          <p className="text-sm text-slateText-body font-normal leading-relaxed">
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
                className="bg-white/90 backdrop-blur-sm p-6 sm:p-7 rounded-2xl border border-gold-hairline shadow-soft hover:shadow-luxury transition-all duration-300 flex flex-col items-start relative group"
              >
                {/* Step Number with Gold Tone */}
                <span className="text-3xl font-extrabold font-playfair text-gold-shimmer/40 group-hover:text-gold-shimmer transition-colors mb-4 block">
                  {step.num}
                </span>

                <div className="w-10 h-10 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center mb-4 group-hover:bg-burgundy group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-base font-bold text-burgundy mb-2 font-cairo">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-slateText-body leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
