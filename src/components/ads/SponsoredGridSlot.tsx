'use client';

import React, { useEffect } from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { useAds } from '../../lib/ads-store';
import { Language } from '../../lib/i18n';

interface SponsoredGridSlotProps {
  lang: Language;
}

export function SponsoredGridSlot({ lang }: SponsoredGridSlotProps) {
  const { getActiveAd, recordView, recordClick } = useAds();
  const ad = getActiveAd('shop_grid');

  useEffect(() => {
    if (ad) {
      recordView(ad.id);
    }
  }, [ad, recordView]);

  if (!ad) return null;

  const isRtl = lang === 'ar';

  return (
    <article
      aria-label="Sponsored advertisement"
      className="col-span-1 sm:col-span-2 lg:col-span-1 rounded-2xl border-2 border-dashed border-gold-line/60 bg-surface-peachSoft/20 p-5 flex flex-col justify-between shadow-sm relative overflow-hidden"
    >
      {/* Top Banner Tag */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-bold uppercase tracking-wider bg-white px-2.5 py-0.5 rounded-full border border-gold-hairline text-gold-shimmer flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-gold-line" />
          <span>{isRtl ? 'مساحة إعلانية برعاية' : 'Sponsored Partner'}</span>
        </span>
        <span className="text-[11px] font-semibold text-slateText-secondary">{ad.advertiserName}</span>
      </div>

      {/* Main Copy */}
      <div className="space-y-2 mb-6">
        <h4 className="text-base font-bold text-burgundy font-cairo">
          {ad.title[lang]}
        </h4>
        <p className="text-xs text-slateText-body leading-relaxed">
          {ad.description[lang]}
        </p>
      </div>

      {/* Action */}
      <a
        href={ad.targetUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={() => recordClick(ad.id)}
        className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-burgundy text-burgundy hover:text-white border border-gold-hairline text-xs font-bold text-center transition-colors flex items-center justify-center gap-2"
      >
        <span>{isRtl ? 'استكشاف العرض' : 'Explore Offer'}</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </article>
  );
}
