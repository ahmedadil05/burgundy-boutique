import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { Language, getDictionary } from '../../lib/i18n';
import { ShoppingBag, Sparkles, ShieldCheck, Truck, Crown } from 'lucide-react';

export function HeroBanner({ lang = 'ar' }: { lang?: Language }) {
  const dict = getDictionary(lang);
  const isAr = lang === 'ar';

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blush-surface/70 via-cream to-cream pt-6 pb-14 sm:py-16">
      {/* Subtle Background Fabric Texture Accent */}
      <div className="absolute inset-0 bg-fabric-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text Content (7 cols on desktop) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/90 text-coral-warm border border-peach-soft shadow-sm">
              <Crown className="w-3.5 h-3.5 text-[#CBA05C]" />
              <span>{isAr ? 'كولكشن صيف وخريف 2026 الحصري' : 'Exclusive 2026 Couture Drop'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-cocoa-dark font-cairo leading-[1.25] tracking-tight">
              {dict.home.heroTitle}
            </h1>

            <p className="text-sm sm:text-base text-cocoa-muted max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {dict.home.heroSubtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link href={`/${lang}/shop`}>
                <Button size="lg" variant="primary" icon={<ShoppingBag className="w-5 h-5" />}>
                  {dict.common.shopNow}
                </Button>
              </Link>
              <Link href={`/${lang}/about`}>
                <Button size="lg" variant="outline">
                  {dict.common.exploreCollection}
                </Button>
              </Link>
            </div>

            {/* Micro Highlights */}
            <div className="pt-6 border-t border-peach-soft/80 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto lg:mx-0 text-center lg:text-start">
              <div>
                <span className="block text-base sm:text-lg font-extrabold text-coral-warm">4.5m</span>
                <span className="text-[11px] text-cocoa-muted font-medium">
                  {isAr ? 'مقاس الثوب الملكي' : 'Royal Toub Drape'}
                </span>
              </div>
              <div>
                <span className="block text-base sm:text-lg font-extrabold text-coral-warm">100%</span>
                <span className="text-[11px] text-cocoa-muted font-medium">
                  {isAr ? 'فوال سويسري أصلي' : 'Pure Swiss Voile'}
                </span>
              </div>
              <div>
                <span className="block text-base sm:text-lg font-extrabold text-coral-warm">24-48h</span>
                <span className="text-[11px] text-cocoa-muted font-medium">
                  {isAr ? 'توصيل مبرد بقطر' : 'Doha Fast Courier'}
                </span>
              </div>
            </div>
          </div>

          {/* Model Showcase Image (5 cols on desktop) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] max-w-md mx-auto rounded-3xl overflow-hidden border-2 border-peach-deep/40 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85"
                alt="Sudanese Model in Luxury Kandaka Toub"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                priority="true"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cocoa-dark/70 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-bold text-peach-soft uppercase tracking-wider">
                  {isAr ? 'الأكثر طلباً هذا الموسم' : 'Most Coveted Heirloom'}
                </span>
                <p className="text-sm font-bold mt-1">
                  {isAr
                    ? 'ثوب الفوال السويسري المطرز بخيوط الذهب'
                    : 'Gilded Swiss Voile Royal Toub'}
                </p>
                <div className="mt-2 flex items-center justify-between text-xs pt-2 border-t border-white/20">
                  <span className="font-extrabold text-peach-soft">1,450 QAR</span>
                  <Link
                    href={`/${lang}/products/royal-swiss-voile-toub`}
                    className="underline text-white font-semibold hover:text-peach-soft"
                  >
                    {dict.common.viewDetails} →
                  </Link>
                </div>
              </div>
            </div>

            {/* Floating Heritage Seal */}
            <div className="absolute -bottom-4 -start-4 hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-peach-soft shadow-lg">
              <Sparkles className="w-4 h-4 text-[#CBA05C]" />
              <span className="text-xs font-bold text-cocoa-dark">
                {isAr ? 'حياكة يدوية سودانية' : 'Hand-stitched in Sudan'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
