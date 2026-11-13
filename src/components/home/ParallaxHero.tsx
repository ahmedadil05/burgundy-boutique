'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Sparkles, Gem } from 'lucide-react';
import { Language, getDictionary } from '../../lib/i18n';


interface ParallaxHeroProps {
  lang: Language;
}

export function ParallaxHero({ lang }: ParallaxHeroProps) {
  const dict = getDictionary(lang);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  const isRtl = lang === 'ar';

  return (
    <section className="relative hero-obsidian min-h-[88vh] sm:min-h-[92vh] flex items-center overflow-hidden border-b border-gold-hairline/40">
      {/* Editorial spotlight wash */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-80"
        style={{
          backgroundImage:
            'radial-gradient(circle at 82% 20%, rgba(217, 185, 122, 0.22) 0%, transparent 42%), radial-gradient(circle at 16% 78%, rgba(232, 121, 90, 0.10) 0%, transparent 55%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center px-5 sm:px-8 lg:px-12 py-14 lg:py-18">
        {/* Left column: Editorial typography */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-start z-10 space-y-6 sm:space-y-7">
          {/* Eyebrow pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-hairline/70 bg-white/5 backdrop-blur-sm text-gold-line text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase">
            <Gem className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span className="font-display">
              {isRtl ? 'دار بيرغندي — الدوحة' : 'BURGUNDY Atelier — Doha'}
            </span>
          </div>

          <div className="space-y-3">
            <span className="brand-wordmark text-[10px] sm:text-xs text-gold-line/90 tracking-[0.35em] uppercase block font-semibold">
              Atelier de Couture
            </span>
            <h1 className="font-display font-semibold text-4xl sm:text-6xl lg:text-7xl leading-[1.08] tracking-tight text-[#FFFDF6]">
              {dict.home.heroTitle}
            </h1>
            <div className="h-px w-24 sm:w-32 bg-gold-hairline/80 mx-auto lg:mx-0" />
          </div>

          <p className="max-w-lg text-sm sm:text-base text-[#F5E7DA]/90 font-normal leading-relaxed font-body">
            {dict.home.heroSubtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto pt-2">
            <Link
              href={`/${lang}/shop`}
              className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gold-line hover:bg-[#E4C98A] text-[#2B0A21] text-xs sm:text-sm font-bold tracking-[0.18em] uppercase transition-all shadow-[0_10px_30px_-8px_rgba(217,185,122,0.55)] active:scale-[0.98]"
            >
              <span className="flex items-center justify-center gap-2">
                {dict.common.shopNow}
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </span>
            </Link>
            <Link
              href={`/${lang}/custom-order`}
              className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/10 hover:bg-white/15 text-[#FFFDF6] border border-gold-hairline/50 text-xs sm:text-sm font-bold tracking-[0.18em] uppercase transition-all backdrop-blur-sm"
            >
              {isRtl ? 'موعد خاص' : 'Bespoke Appointment'}
            </Link>
          </div>

          {/* Provenance strip */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 sm:pt-8 text-[10px] sm:text-[11px] text-[#E7D5C8]/80 border-t border-gold-hairline/30 w-full max-w-lg">
            <div>
              <span className="block font-bold text-[#FFEFBF] font-display text-xs sm:text-sm">
                {isRtl ? 'فوال سويسري' : 'Swiss Voile'}
              </span>
              {isRtl ? 'قماش St. Gallen' : 'St. Gallen Weave'}
            </div>
            <div className="border-x border-gold-hairline/30 px-2 sm:px-4">
              <span className="block font-bold text-[#FFEFBF] font-display text-xs sm:text-sm">
                {isRtl ? 'رسم يدوي' : 'Hand-Painted'}
              </span>
              {isRtl ? 'حرة، لا نمطياً' : 'One of a Kind'}
            </div>
            <div>
              <span className="block font-bold text-[#FFEFBF] font-display text-xs sm:text-sm">
                {isRtl ? 'توصيل قطر' : 'Doha Delivery'}
              </span>
              {isRtl ? 'خلال 24–48 ساعة' : 'Within 24–48h'}
            </div>
          </div>
        </div>

        {/* Right column: Cinematic portrait */}
        <div className="lg:col-span-5 relative w-full aspect-[3/4] max-w-[440px] mx-auto z-10">
          {/* Outer decorative hairline */}
          <div className="absolute -inset-2 sm:-inset-3 rounded-[30px] sm:rounded-[36px] border border-gold-hairline/60 pointer-events-none" />
          <div className="absolute -inset-1 sm:-inset-2 rounded-[28px] sm:rounded-[34px] border border-gold-hairline/30 pointer-events-none" />

          {/* Main frame */}
          <div className="relative w-full h-full rounded-3xl sm:rounded-[28px] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.75)] border border-gold-hairline/60 bg-[#14050E] group">
            <Image
              src="/brand/teaser-clean.jpg"
              alt={isRtl ? 'ثوب نوبي ملكي مرسوم بالذهب' : 'BURGUNDY royal toub in gold leaf detail'}
              fill
              priority
              sizes="(max-width: 640px) 100vw, 440px"
              className={`object-cover object-center img-cinematic ${prefersReducedMotion ? '' : 'transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105'}`}
            />

            {/* Cinematic grade */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#14050E]/90 via-[#14050E]/15 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2B0A21]/35 via-transparent to-transparent pointer-events-none" />

            {/* Floating seal */}
            <div className="absolute top-4 start-4 sm:top-5 sm:start-5 px-3 py-1.5 rounded-full bg-black/55 backdrop-blur-md border border-gold-hairline/60 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-gold-line" />
              <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.22em] text-gold-line uppercase">
                {isRtl ? 'إصدار الدوحة الملكي' : 'Doha Royal Edition'}
              </span>
            </div>

            {/* Bottom caption card */}
            <div className="absolute bottom-4 sm:bottom-5 start-4 end-4 sm:start-5 sm:end-5 p-4 sm:p-5 rounded-2xl bg-black/60 backdrop-blur-md border border-gold-hairline/40 text-start space-y-1.5">
              <p className="text-[9px] sm:text-[10px] tracking-[0.28em] uppercase font-bold text-gold-line">
                HAUTE COUTURE
              </p>
              <p className="text-xs sm:text-sm font-semibold leading-snug text-[#FFFDF6] font-display line-clamp-2">
                {isRtl
                  ? 'ثوب فوال سويسري مرسوم بعتوق الحناء والذهب'
                  : 'Swiss voile painted with henna & liquid gold'}
              </p>
              <p className="text-[10px] sm:text-[11px] text-[#E9D6CC]/80 font-body">
                {isRtl ? 'خمري • مقاس 4.5م' : 'Grand 16 · 4.5m drape'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
