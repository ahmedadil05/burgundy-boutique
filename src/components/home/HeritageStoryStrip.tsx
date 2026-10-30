import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { Language, getDictionary } from '../../lib/i18n';
import { Crown, Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';

export function HeritageStoryStrip({ lang = 'ar' }: { lang?: Language }) {
  const dict = getDictionary(lang);
  const isAr = lang === 'ar';

  return (
    <section className="my-14 bg-blush-surface border-y border-peach-soft py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Soft Henna Ring Accent */}
      <div className="absolute end-0 top-0 w-96 h-96 bg-radial-gradient from-peach-soft/30 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
        <div className="lg:col-span-7 space-y-5 text-center lg:text-start">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/80 text-coral-warm border border-peach-deep/30">
            <Crown className="w-3.5 h-3.5 text-[#CBA05C]" />
            <span>{isAr ? 'قصة كنداكة والتراث' : 'The Kandaka Legacy'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-cocoa-dark font-cairo leading-tight">
            {dict.home.heritageTitle}
          </h2>

          <p className="text-xs sm:text-sm text-cocoa-muted leading-relaxed max-w-xl mx-auto lg:mx-0">
            {dict.home.heritageText}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 max-w-lg mx-auto lg:mx-0 text-start">
            <div className="flex items-start gap-3 p-3 bg-white/70 rounded-2xl border border-peach-soft/60">
              <Sparkles className="w-5 h-5 text-coral-warm shrink-0 mt-0.5" />
              <div>
                <strong className="block text-xs font-bold text-cocoa-dark">
                  {isAr ? 'فوال سويسري أصلي 100%' : '100% Swiss Voile'}
                </strong>
                <span className="text-[11px] text-cocoa-muted">
                  {isAr ? 'نعومة استثنائية وبريق ملكي دائم' : 'Heirloom weave softness'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-white/70 rounded-2xl border border-peach-soft/60">
              <HeartHandshake className="w-5 h-5 text-coral-warm shrink-0 mt-0.5" />
              <div>
                <strong className="block text-xs font-bold text-cocoa-dark">
                  {isAr ? 'تطريز يدوي بأيادٍ سودانية' : 'Artisanal Embroidery'}
                </strong>
                <span className="text-[11px] text-cocoa-muted">
                  {isAr ? 'دعم مستمر للحرفيات في السودان' : 'Supporting female artisans'}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3">
            <Link href={`/${lang}/about`}>
              <Button variant="secondary">
                {isAr ? 'قراءة القصة كاملة' : 'Read Our Full Story'}
              </Button>
            </Link>
          </div>
        </div>

        {/* Visual Composition Image */}
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-square max-w-sm mx-auto rounded-3xl overflow-hidden border-2 border-peach-soft shadow-warm">
            <img
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80"
              alt="Sudanese Heritage Needlework"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cocoa-dark/60 via-transparent to-transparent flex items-end p-6 text-white text-xs font-bold">
              <span>{isAr ? 'دقة الخيوط الذهبية ونقوش الحناء' : 'Gold Thread Craft & Henna Inlay'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
