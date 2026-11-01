'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { useStoreSettings } from '../../lib/settings-store';
import { useCatalogStore } from '../../lib/catalog-store';
import { Language, getDictionary } from '../../lib/i18n';
import { PreLaunchTeaser } from './PreLaunchTeaser';
import { ParallaxHero } from './ParallaxHero';
import { BehindTheBrush } from './BehindTheBrush';
import { ShopByFabric } from './ShopByFabric';
import { CategoryGrid } from './CategoryGrid';
import { HeritageStoryStrip } from './HeritageStoryStrip';
import { CustomerReviews } from './CustomerReviews';
import { NewsletterSection } from './NewsletterSection';
import { SponsoredBanner } from '../ads/SponsoredBanner';
import { ProductCard } from '../ui/ProductCard';
import { HennaDivider } from '../common/HennaDivider';
import { Button } from '../ui/Button';

interface HomeContentProps {
  lang: Language;
}

export function HomeContent({ lang }: HomeContentProps) {
  const { settings } = useStoreSettings();
  const { products } = useCatalogStore();
  const dict = getDictionary(lang);
  const isAr = lang === 'ar';

  // If Launch Mode is ON, render the Pre-launch Teaser!
  if (settings.launchMode) {
    return <PreLaunchTeaser lang={lang} />;
  }

  // Otherwise, render full shop experience!
  const newArrivals = products.slice(0, 4);
  const bestSellers = products.slice(1, 4);

  return (
    <div className="min-h-screen bg-canvas">
      {/* 1. Parallax Hero Section */}
      <ParallaxHero lang={lang} />

      {/* Thin Gold Hairline Divider */}
      <div className="border-b border-gold-hairline max-w-7xl mx-auto" />

      {/* 2. "Behind The Brush" Artisanal Craft Section */}
      <BehindTheBrush lang={lang} />

      {/* 3. Shop by Fabric & Texture */}
      <ShopByFabric lang={lang} />

      {/* 4. Featured Atelier Collections (Hand-painted Sudanese Toubs & Jalabiyas) */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-coral uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold-line" />
              <span>{dict.home.featuredCategoriesTitle}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-burgundy font-cairo">
              {dict.home.newArrivalsTitle}
            </h2>
          </div>
          <Link href={`/${lang}/shop`}>
            <Button variant="ghost" size="sm" className="text-burgundy hover:text-burgundy-hover hover:bg-surface-peachSoft/30">
              {isAr ? 'عرض تشكيلة المتجر' : 'View Boutique Shop'} {isAr ? <ArrowLeft className="w-4 h-4 ms-1" /> : <ArrowRight className="w-4 h-4 ms-1" />}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              lang={lang}
            />
          ))}
        </div>
      </section>

      {/* 5. Sponsored Advertising Banner Placement */}
      <SponsoredBanner lang={lang} />

      {/* 6. Heritage Story Strip (Sudan to Qatar) */}
      <HeritageStoryStrip lang={lang} />

      {/* 7. Most Coveted Pieces */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold text-coral uppercase tracking-wider">
            {isAr ? 'روائع مختارة' : 'Coveted Selections'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-burgundy font-cairo mt-1">
            {dict.home.bestSellersTitle}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              lang={lang}
            />
          ))}
        </div>
      </section>

      {/* Henna Divider */}
      <HennaDivider />

      {/* 8. Customer Reviews (Marked as Demo Samples) */}
      <CustomerReviews lang={lang} />

      {/* 9. Newsletter Section */}
      <NewsletterSection lang={lang} />
    </div>
  );
}
