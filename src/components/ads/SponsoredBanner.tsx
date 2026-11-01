'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { ExternalLink, Sparkles } from 'lucide-react';
import { useAds } from '../../lib/ads-store';
import { Language } from '../../lib/i18n';

interface SponsoredBannerProps {
  lang: Language;
}

export function SponsoredBanner({ lang }: SponsoredBannerProps) {
  const { getActiveAd, recordView, recordClick } = useAds();
  const ad = getActiveAd('home_banner');

  useEffect(() => {
    if (ad) {
      recordView(ad.id);
    }
  }, [ad, recordView]);

  if (!ad) return null;

  const isRtl = lang === 'ar';

  return (
    <aside
      aria-label={isRtl ? 'إعلان ممول' : 'Sponsored Content'}
      className="my-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-canvas-warm via-white to-surface-peachSoft/40 border border-gold-hairline p-5 sm:p-6 shadow-soft flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Sponsored Disclaimer Tag */}
        <div className="absolute top-2 end-3 text-[10px] uppercase font-bold tracking-widest text-slateText-secondary/70 bg-white/70 px-2 py-0.5 rounded border border-gold-hairline/40">
          {isRtl ? 'برعاية شريك • Sponsored' : 'Sponsored Partner'}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-2 text-center md:text-start pt-2 md:pt-0">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-shimmer">
            <Sparkles className="w-3.5 h-3.5 text-gold-line" />
            <span>{ad.advertiserName}</span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-burgundy font-cairo">
            {ad.title[lang]}
          </h3>

          <p className="text-xs sm:text-sm text-slateText-body max-w-2xl leading-relaxed">
            {ad.description[lang]}
          </p>
        </div>

        {/* CTA Button */}
        <a
          href={ad.targetUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={() => recordClick(ad.id)}
          className="px-5 py-2.5 rounded-full bg-white hover:bg-burgundy text-burgundy hover:text-white border border-gold-hairline text-xs font-bold tracking-wider transition-all shadow-sm flex items-center gap-2 shrink-0"
        >
          <span>{isRtl ? 'زيارة شريكنا' : 'Visit Partner'}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

      </div>
    </aside>
  );
}
