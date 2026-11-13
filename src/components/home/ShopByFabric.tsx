'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { Language, getDictionary } from '../../lib/i18n';

interface ShopByFabricProps {
  lang: Language;
}

export function ShopByFabric({ lang }: ShopByFabricProps) {
  const dict = getDictionary(lang);
  const isRtl = lang === 'ar';

  const fabrics = [
    {
      id: 'swiss-voile',
      name: isRtl ? 'فوال سويسري فاخر' : 'Swiss Cotton Voile',
      desc: isRtl ? 'قطن توتال ناعم وخفيف، نسيج بارد يناسب أجواء الدوحة ومناسباتها' : 'Breathable, featherlight Swiss weave from St. Gallen',
      tag: isRtl ? 'الأكثر طلباً' : 'Bestseller',
      query: 'fabric=voile',
    },
    {
      id: 'pure-silk',
      name: isRtl ? 'حرير طبيعي خالص' : 'Pure Natural Silk',
      desc: isRtl ? 'انسيابية ساحرة وبريق هادئ مطرز ومصبوغ بأيدي محترفات للمناسبات الملكية' : 'Subtle sheen and exquisite drape for formal galas',
      tag: isRtl ? 'فخامة ملكية' : 'Royal Tier',
      query: 'fabric=silk',
    },
    {
      id: 'silk-chiffon',
      name: isRtl ? 'شيفون حريري رقيق' : 'Silk Chiffon',
      desc: isRtl ? 'شيلان وأوشحة تطفو بخفة متناهية مع نقوش نباتية مستوحاة من النيل' : 'Airy floating scarves and evening layering pieces',
      tag: isRtl ? 'إصدار محدود' : 'Limited',
      query: 'fabric=chiffon',
    },
    {
      id: 'natural-linen',
      name: isRtl ? 'كتان طبيعي بارد' : 'Natural Cooling Linen',
      desc: isRtl ? 'جلابيات يومية راقية ودراعات استقبال بنقوش يدوية عصرية مريحة' : 'Artisanal daywear and salon hosting jalabiyas',
      tag: isRtl ? 'تصميم حصري' : 'Atelier Cut',
      query: 'fabric=linen',
    },
  ];

  return (
    <section className="py-20 lg:py-24 bg-canvas border-b border-gold-hairline/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="font-cairo">{isRtl ? 'أقمشة ملكية منتقاة بعناية' : 'NOBLE TEXTILES'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-burgundy font-cairo tracking-tight">
              {dict.home.shopByFabricTitle}
            </h2>
          </div>

          <Link
            href={`/${lang}/shop`}
            className="text-xs sm:text-sm font-bold text-burgundy hover:text-burgundy-hover inline-flex items-center gap-2 transition-colors group self-start sm:self-auto py-2 px-4 rounded-full border border-gold-hairline hover:bg-canvas-warm"
          >
            <span>{dict.common.exploreCollection}</span>
            {isRtl ? (
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            ) : (
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            )}
          </Link>
        </div>

        {/* Fabrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {fabrics.map((fabric) => (
            <Link
              key={fabric.id}
              href={`/${lang}/shop?${fabric.query}`}
              className="bg-white p-7 rounded-2xl border border-gold-hairline shadow-sm hover:shadow-luxury hover:border-burgundy/40 transition-all flex flex-col justify-between group relative"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold text-burgundy bg-canvas-warm px-3 py-1 rounded-full border border-gold-hairline">
                    {fabric.tag}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-gold group-hover:scale-125 transition-transform" />
                </div>

                <h3 className="text-base font-bold text-burgundy mb-2 font-cairo group-hover:text-burgundy-hover transition-colors">
                  {fabric.name}
                </h3>

                <p className="text-xs text-slateText-body leading-relaxed font-tajawal">
                  {fabric.desc}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-gold-hairline/60 flex items-center justify-between text-xs font-semibold text-burgundy">
                <span>{isRtl ? 'استعراض التشكيلة' : 'View Collection'}</span>
                {isRtl ? (
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                )}
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
