'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
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
    // Check user preference for motion
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
      mediaQuery.addEventListener('change', handleChange);

      // Lightweight scroll listener throttled via requestAnimationFrame
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
  // Compute parallax offsets (clamped for mobile safety)
  const depthSlow = prefersReducedMotion ? 0 : Math.min(scrollY * 0.15, 60);
  const depthMedium = prefersReducedMotion ? 0 : Math.min(scrollY * 0.3, 100);

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-canvas leaf-shadow-bg px-4 sm:px-6 lg:px-8 py-16">
      {/* Parallax Layer 1: Ambient leaf-shadow and warm blush orbs (Slow depth) */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden parallax-layer-slow"
        style={{ transform: `translateY(${depthSlow * 0.5}px)` }}
        aria-hidden="true"
      >
        <div className="absolute top-10 -start-24 w-80 h-80 rounded-full bg-surface-peachSoft/30 blur-3xl" />
        <div className="absolute bottom-10 -end-24 w-96 h-96 rounded-full bg-peach-sorbet/25 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Typography, Poetry & CTAs (Mobile 390px first) */}
        <div
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-start z-10 space-y-6"
          style={{ transform: `translateY(-${depthSlow * 0.3}px)` }}
        >
          {/* Eyebrow Label with Gold Hairline */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 border border-gold-hairline shadow-soft backdrop-blur-sm text-burgundy text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-gold-line" />
            <span>{isRtl ? 'أناقة الثوب السوداني في قطر' : 'Sudanese Couture in Qatar'}</span>
          </div>

          {/* High-Contrast Luxury Serif Wordmark */}
          <div className="space-y-1">
            <span className="brand-wordmark text-sm sm:text-base text-gold-shimmer tracking-[0.3em] uppercase block font-semibold">
              {settings.storeName.en}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-burgundy tracking-tight leading-[1.2]">
              {dict.home.heroTitle}
            </h1>
          </div>

          {/* Warm Poetic Body Copy */}
          <p className="max-w-xl text-sm sm:text-base text-slateText-body font-normal leading-relaxed">
            {dict.home.heroSubtitle}
          </p>

          {/* Action CTAs: Shop Now & Custom Order */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto pt-2">
            <Link
              href={`/${lang}/shop`}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-burgundy hover:bg-burgundy-hover text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-luxury flex items-center justify-center gap-2.5 active:scale-[0.98]"
            >
              <span>{dict.common.shopNow}</span>
              {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </Link>

            <Link
              href={`/${lang}/custom-order`}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-surface-peachSoft/40 text-slateText-body hover:text-burgundy border border-gold-hairline text-xs sm:text-sm font-semibold transition-all shadow-soft flex items-center justify-center gap-2"
            >
              <span>{dict.nav.customOrder}</span>
            </Link>
          </div>

          {/* Brand Guarantee Micro-tokens */}
          <div className="flex items-center gap-6 pt-4 text-[11px] text-slateText-secondary border-t border-gold-hairline/60 w-full justify-center lg:justify-start">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-line" />
              <span>{isRtl ? 'رسم يدوي أصيل' : 'Hand-Painted'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-line" />
              <span>{isRtl ? 'توصيل داخل قطر' : 'Qatar Delivery'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-line" />
              <span>{isRtl ? 'فوال سويسري وحرير' : 'Swiss Voile & Silk'}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual with Layered Parallax (Medium Depth) */}
        <div
          className="lg:col-span-5 relative w-full aspect-[4/5] sm:aspect-[3/4] max-w-[420px] mx-auto z-10"
          style={{ transform: `translateY(${depthMedium * 0.4}px)` }}
        >
          {/* Framed Card with Gold Hairline and Draped Toub */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-luxury border border-gold-hairline bg-white group">
            <Image
              src="/brand/teaser-clean.jpg"
              alt="BURGUNDY Hand-painted Toub"
              fill
              priority
              className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
              sizes="(max-width: 640px) 100vw, 420px"
            />
            {/* Subtle light overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep/40 via-transparent to-transparent pointer-events-none" />

            {/* Floating Atelier Badge on Visual */}
            <div className="absolute bottom-4 start-4 end-4 p-3 rounded-xl bg-white/90 backdrop-blur-md border border-gold-hairline text-start shadow-soft">
              <p className="text-[10px] tracking-widest uppercase font-semibold text-gold-shimmer">
                ATELIER PIECE • قطعة حصرية
              </p>
              <p className="text-xs font-bold text-burgundy truncate">
                {isRtl ? 'ثوب حرير مشغول يدوياً بأنامل فنية' : 'Hand-Painted Silk Toub Atelier Release'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
