'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Layers } from 'lucide-react';
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
      desc: isRtl ? 'قطن توتال ناعم وخفيف يناسب أجواء الدوحة' : 'Breathable, featherlight Swiss weave',
      tag: isRtl ? 'الأكثر طلباً' : 'Bestseller',
      query: 'fabric=voile',
    },
    {
      id: 'pure-silk',
      name: isRtl ? 'حرير طبيعي خالص' : 'Pure Natural Silk',
      desc: isRtl ? 'انسيابية ساحرة ولمعان هادئ للمناسبات الملكية' : 'Subtle sheen and exquisite drape for galas',
      tag: isRtl ? 'فخامة ملكية' : 'Luxury Tier',
      query: 'fabric=silk',
    },
    {
      id: 'silk-chiffon',
      name: isRtl ? 'شيفون حريري رقيق' : 'Silk Chiffon',
      desc: isRtl ? 'شيلان وأوشحة تطفو بخفة متناهية' : 'Airy floating scarves and evening layering',
      tag: isRtl ? 'إصدار محدود' : 'Limited',
      query: 'fabric=chiffon',
    },
    {
      id: 'natural-linen',
      name: isRtl ? 'كتان طبيعي بارد' : 'Natural Cooling Linen',
      desc: isRtl ? 'جلابيات يومية راقية بنقوش يدوية عصرية' : 'Artisanal daywear and hosting jalabiyas',
      tag: isRtl ? 'تصميم حصري' : 'Atelier Cut',
      query: 'fabric=linen',
    },
  ];

  return (
    <section className="py-16 bg-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-shimmer uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>{isRtl ? 'خامات منتقاة بعناية' : 'CURATED FABRICS'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-burgundy font-cairo">
              {dict.home.shopByFabricTitle}
            </h2>
          </div>

          <Link
            href={`/${lang}/shop`}
            className="text-xs sm:text-sm font-bold text-burgundy hover:text-burgundy-hover inline-flex items-center gap-1.5 transition-colors group self-start sm:self-auto"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {fabrics.map((fabric) => (
            <Link
              key={fabric.id}
              href={`/${lang}/shop?${fabric.query}`}
              className="bg-white p-6 rounded-2xl border border-gold-hairline shadow-soft hover:shadow-luxury hover:border-burgundy/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold text-coral bg-surface-peachSoft/40 px-2.5 py-0.5 rounded-full border border-peach-sorbet">
                    {fabric.tag}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-gold-line group-hover:scale-125 transition-transform" />
                </div>

                <h3 className="text-base font-bold text-burgundy mb-1 font-cairo group-hover:text-burgundy-hover transition-colors">
                  {fabric.name}
                </h3>

                <p className="text-xs text-slateText-body leading-relaxed">
                  {fabric.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-surface-peachSoft/50 flex items-center justify-between text-xs font-semibold text-burgundy">
                <span>{isRtl ? 'تصفح القطع' : 'Browse Pieces'}</span>
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
