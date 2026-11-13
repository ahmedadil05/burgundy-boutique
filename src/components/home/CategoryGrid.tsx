import React from 'react';
import Link from 'next/link';
import { Language, getDictionary } from '../../lib/i18n';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export function CategoryGrid({ lang = 'ar' }: { lang?: Language }) {
  const dict = getDictionary(lang);
  const isAr = lang === 'ar';

  const categories = [
    {
      id: 'toubs',
      title: isAr ? 'الثياب السودانية الملكية' : 'Artisanal Sudanese Toubs',
      subtitle: isAr ? 'فوال سويسري نخب أول مرسوم يدوياً' : '100% Swiss Voile & Pure Silk Crepe',
      image: '/brand/teaser-clean.jpg',
      count: isAr ? 'قطع حصرية' : 'Exclusive Releases',
      href: `/${lang}/shop?category=toubs`,
    },
    {
      id: 'jalabiyas',
      title: isAr ? 'جلابيات وفخامة الاستقبال' : 'Luxury Silk & Linen Jalabiyas',
      subtitle: isAr ? 'قصات معاصرة مطرزة ومزينة بلمسات تراثية' : 'Contemporary Silhouettes with Heritage Accents',
      image: '/brand/teaser-post.jpg',
      count: isAr ? 'تشكيلة راقية' : 'Atelier Cut',
      href: `/${lang}/shop?category=jalabiyas`,
    },
    {
      id: 'scarves',
      title: isAr ? 'شيلان وأوشحة حريرية' : 'Hand-Painted Silk Scarves',
      subtitle: isAr ? 'شالات حرير طبيعي ناعم بضربات فرشاة فنية' : 'Botanical Brushwork on Pure Mulberry Silk',
      image: '/brand/burgundy-avatar.jpg',
      count: isAr ? 'إصدار محدود' : 'Limited Editions',
      href: `/${lang}/shop?category=scarves`,
    },
    {
      id: 'custom-order',
      title: isAr ? 'تفصيل ورسم خاص للأعراس' : 'Bespoke Bridal Commissions',
      subtitle: isAr ? 'ثياب عرائس مذهبة بتطريز خاص ومقاسات دقيقة' : 'Made-to-Measure Heirloom Toubs with Liquid Gold',
      image: '/brand/teaser-clean.jpg',
      count: isAr ? 'حجز خاص' : 'Private Concierge',
      href: `/${lang}/custom-order`,
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gold-hairline text-burgundy text-[11px] font-semibold tracking-widest uppercase shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-gold-line" />
          <span>{isAr ? 'روائع الأتيليه' : 'ATELIER COLLECTIONS'}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-burgundy font-display">
          {dict.home.featuredCategoriesTitle}
        </h2>
        <p className="text-xs sm:text-sm text-slateText-secondary font-body max-w-lg mx-auto leading-relaxed">
          {dict.home.featuredCategoriesSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={cat.href}
            className="group relative flex flex-col h-96 rounded-2xl overflow-hidden border border-gold-hairline shadow-sm hover:shadow-luxury transition-all duration-500 bg-white"
          >
            {/* Background Image */}
            <img
              src={cat.image}
              alt={cat.title}
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Gradient Overlays for High Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep/90 via-burgundy-deep/30 to-transparent transition-opacity group-hover:from-burgundy-deep/95" />

            {/* Top Category Badge */}
            <div className="relative z-10 p-5 flex items-start justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/90 text-burgundy backdrop-blur-sm shadow-sm border border-gold-hairline">
                {cat.count}
              </span>
              <div className="w-8 h-8 rounded-full bg-white/80 text-burgundy flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 group-hover:translate-y-0">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            {/* Bottom Content Area */}
            <div className="relative z-10 mt-auto p-5 space-y-1.5 text-start">
              <h3 className="text-lg sm:text-xl font-bold text-white font-display leading-snug group-hover:text-gold-soft transition-colors">
                {cat.title}
              </h3>
              <p className="text-xs text-white/80 line-clamp-2 leading-relaxed font-body">
                {cat.subtitle}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
