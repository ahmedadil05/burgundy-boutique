'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { Language, getDictionary } from '../../lib/i18n';
import { Crown, Sparkles, HeartHandshake, ArrowLeft, ArrowRight } from 'lucide-react';

export function HeritageStoryStrip({ lang = 'ar' }: { lang?: Language }) {
  const dict = getDictionary(lang);
  const isAr = lang === 'ar';

  return (
    <section className="my-16 bg-canvas-warm/50 border-y border-gold-hairline py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-white text-burgundy border border-gold-hairline shadow-sm">
            <Crown className="w-3.5 h-3.5 text-gold-ink" />
            <span className="font-display">{isAr ? 'إرث ملكات كنداكة وسحر النيل' : 'The Kandaka Queen Legacy'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-burgundy font-display leading-tight">
            {dict.home.heritageTitle}
          </h2>

          <p className="text-sm text-slateText-body leading-relaxed max-w-xl mx-auto lg:mx-0 font-body">
            {dict.home.heritageText}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 max-w-lg mx-auto lg:mx-0 text-start">
            <div className="flex items-start gap-3 p-5 bg-white rounded-2xl border border-gold-hairline shadow-sm">
              <Sparkles className="w-5 h-5 text-gold-ink shrink-0 mt-0.5" />
              <div>
                <strong className="block text-xs font-bold text-burgundy font-display">
                  {isAr ? 'فوال سويسري أصلي 100%' : '100% Swiss Voile'}
                </strong>
                <span className="text-[11px] text-slateText-secondary">
                  {isAr ? 'منسوج في سانت غالن بنعومة تدوم طويلاً' : 'Heirloom Swiss cotton weave'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-5 bg-white rounded-2xl border border-gold-hairline shadow-sm">
              <HeartHandshake className="w-5 h-5 text-gold-ink shrink-0 mt-0.5" />
              <div>
                <strong className="block text-xs font-bold text-burgundy font-display">
                  {isAr ? 'رسم وتطريز يدوي' : 'Artisanal Needlework'}
                </strong>
                <span className="text-[11px] text-slateText-secondary">
                  {isAr ? 'دعم مستمر للحرفيات في السودان والدوحة' : 'Ethical patronage sustaining artisans'}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 flex justify-center lg:justify-start">
            <Button asChild size="lg" className="bg-burgundy hover:bg-burgundy-hover text-white font-bold shadow-luxury px-8 py-3.5 rounded-full border border-gold-hairline/40">
              <Link href={`/${lang}/about`}>
                {isAr ? 'قراءة قصة الدار كاملة' : 'Read Our Full Story'}
                {isAr ? <ArrowLeft className="w-4 h-4 ms-2" /> : <ArrowRight className="w-4 h-4 ms-2" />}
              </Link>
            </Button>
          </div>
        </div>

        {/* Right Visual Image */}
        <div className="lg:col-span-5 relative aspect-[3/4] rounded-2xl overflow-hidden border border-gold-hairline shadow-luxury bg-white group">
          <img
            src="/brand/teaser-clean.jpg"
            alt="Sudanese Toub Heirloom Piece"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep/75 via-transparent to-transparent flex items-end p-6">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-gold-ink font-bold">ATELIER HERITAGE • إرث الدار</span>
              <p className="text-white text-xs sm:text-sm font-semibold font-display">
                {isAr ? 'أصالة الثوب السوداني برؤية معاصرة في قطر' : 'Sudanese Toub Crafted for Qatar'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
