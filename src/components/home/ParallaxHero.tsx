'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Sparkles, Gem, ShieldCheck } from 'lucide-react';
import { Language, getDictionary } from '../../lib/i18n';
import { useStoreSettings } from '../../lib/settings-store';

interface ParallaxHeroProps {
  lang: Language;
}

export function ParallaxHero({ lang }: ParallaxHeroProps) {
  const dict = getDictionary(lang);
  const { settings } = useStoreSettings();
  const [scrollY, setScrollY] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
      mediaQuery.addEventListener('change', handleChange);

      let ticking = false;
      const handleScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            setScrollY(window.scrollY);
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const isRtl = lang === 'ar';
  const depthSlow = prefersReducedMotion ? 0 : Math.min(scrollY * 0.12, 50);
  const depthMedium = prefersReducedMotion ? 0 : Math.min(scrollY * 0.25, 80);

  return (
    <section className="relative min-h-[85vh] sm:min-h-[88vh] flex items-center justify-center overflow-hidden bg-canvas px-4 sm:px-6 lg:px-8 py-16 lg:py-24 border-b border-gold-hairline/60">
      {/* Clean Subtle Radial Ambient Backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 75% 25%, rgba(217, 185, 122, 0.12) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(95, 15, 64, 0.05) 0%, transparent 50%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        
        {/* Left Column: Typography, Poetry & CTAs */}
        <div
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-start z-10 space-y-6"
          style={{ transform: `translateY(-${depthSlow * 0.25}px)` }}
        >
          {/* Eyebrow Label with Delicate Gold Hairline Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gold-hairline shadow-sm text-burgundy text-xs font-semibold tracking-widest uppercase">
            <Gem className="w-3.5 h-3.5 text-gold" strokeWidth={1.75} />
            <span className="font-cairo">
              {isRtl ? 'دار بيرغندي للأزياء الراقية • الدوحة' : 'BURGUNDY HAUTE COUTURE • DOHA'}
            </span>
          </div>

          {/* High-Contrast Luxury Serif Wordmark & Headline */}
          <div className="space-y-3">
            <span className="brand-wordmark text-xs sm:text-sm text-gold tracking-[0.35em] uppercase block font-semibold">
              {settings.storeName.en} • ATELIER DE LUXE
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-burgundy tracking-tight leading-[1.25] font-cairo">
              {dict.home.heroTitle}
            </h1>
          </div>

          {/* Warm Poetic Body Copy with Generous Breathing Room */}
          <p className="max-w-xl text-sm sm:text-base text-slateText-body font-normal leading-relaxed font-tajawal">
            {dict.home.heroSubtitle}
          </p>

          {/* Action CTAs: Shop Now & Custom Order */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-3">
            <Link
              href={`/${lang}/shop`}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-burgundy hover:bg-burgundy-hover text-white text-xs sm:text-sm font-bold tracking-widest uppercase transition-all shadow-luxury flex items-center justify-center gap-3 active:scale-[0.98] border border-gold-hairline/40"
            >
              <span>{dict.common.shopNow}</span>
              {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </Link>

            <Link
              href={`/${lang}/custom-order`}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-canvas-warm text-burgundy border border-gold-hairline text-xs sm:text-sm font-bold tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 hover:border-burgundy/40"
            >
              <span>{isRtl ? 'حجز موعد تفصيل خاص' : 'Bespoke Atelier Booking'}</span>
            </Link>
          </div>

          {/* Provenance & Craft Pillars */}
          <div className="grid grid-cols-3 gap-4 pt-6 text-[11px] text-slateText-secondary border-t border-gold-hairline/60 w-full max-w-lg">
            <div className="flex flex-col items-center lg:items-start space-y-0.5">
              <span className="font-bold text-burgundy font-cairo">{isRtl ? 'فوال سويسري' : 'Swiss Voile'}</span>
              <span className="text-[10px] text-slateText-secondary">{isRtl ? 'قطن أصلي 100%' : '100% St. Gallen'}</span>
            </div>
            <div className="flex flex-col items-center lg:items-start space-y-0.5 border-x border-gold-hairline/60 px-2">
              <span className="font-bold text-burgundy font-cairo">{isRtl ? 'رسم يدوي أصيل' : 'Hand-Guided'}</span>
              <span className="text-[10px] text-slateText-secondary">{isRtl ? 'قطعة فنية فريدة' : 'One of a Kind'}</span>
            </div>
            <div className="flex flex-col items-center lg:items-start space-y-0.5">
              <span className="font-bold text-burgundy font-cairo">{isRtl ? 'توصيل قطر' : 'Qatar Express'}</span>
              <span className="text-[10px] text-slateText-secondary">{isRtl ? 'خلال 24-48 ساعة' : '24-48h Delivery'}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual with Double Gold Hairline Frame */}
        <div
          className="lg:col-span-5 relative w-full aspect-[3/4] max-w-[420px] mx-auto z-10"
          style={{ transform: `translateY(${depthMedium * 0.3}px)` }}
        >
          {/* Outer Decorative Gold Hairline Ring */}
          <div className="absolute -inset-2.5 rounded-[26px] border border-gold-hairline/50 pointer-events-none" />

          {/* Main Visual Frame */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-luxury border border-gold-hairline bg-white group">
            <Image
              src="/brand/teaser-clean.jpg"
              alt="BURGUNDY Haute Couture Toub"
              fill
              priority
              className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
              sizes="(max-width: 640px) 100vw, 420px"
            />
            
            {/* Subtle Gradient Veil */}
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep/60 via-transparent to-transparent pointer-events-none" />

            {/* Floating Luxury Atelier Seal */}
            <div className="absolute top-4 start-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-gold-hairline shadow-soft flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-gold" />
              <span className="text-[10px] font-bold text-burgundy tracking-widest uppercase">
                {isRtl ? 'مجموعة الدوحة الملكية' : 'Doha Royal Edition'}
              </span>
            </div>

            {/* Bottom Atelier Caption */}
            <div className="absolute bottom-4 start-4 end-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-gold-hairline text-start shadow-luxury space-y-1">
              <p className="text-[10px] tracking-widest uppercase font-bold text-gold">
                HAUTE COUTURE MASTERPIECE
              </p>
              <p className="text-xs sm:text-sm font-bold text-burgundy truncate font-cairo">
                {isRtl ? 'ثوب فوال سويسري مرسوم بحناء عصرية وذهب سائل' : 'Swiss Voile Toub • Liquid Gold & Henna Brushwork'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
