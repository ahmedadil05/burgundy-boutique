'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Sparkles, MessageCircle, Calendar, ShieldCheck, Gem } from 'lucide-react';
import { useStoreSettings } from '../../lib/settings-store';
import { useCatalogStore } from '../../lib/catalog-store';
import { Language, getDictionary } from '../../lib/i18n';
import { ParallaxHero } from './ParallaxHero';
import { BehindTheBrush } from './BehindTheBrush';
import { ShopByFabric } from './ShopByFabric';
import { HeritageStoryStrip } from './HeritageStoryStrip';
import { CustomerReviews } from './CustomerReviews';
import { NewsletterSection } from './NewsletterSection';
import { ProductCard, ProductItem } from '../ui/ProductCard';
import { ProductQuickViewModal } from '../product/ProductQuickViewModal';
import { HennaDivider } from '../common/HennaDivider';
import { Button } from '../ui/Button';

interface HomeContentProps {
  lang: Language;
}

export function HomeContent({ lang }: HomeContentProps) {
  const { settings } = useStoreSettings();
  const { products } = useCatalogStore();
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);
  const dict = getDictionary(lang);
  const isAr = lang === 'ar';

  // Curated collections
  const newArrivals = products.slice(0, 4);
  const bestSellers = products.slice(1, 4);

  return (
    <div className="min-h-screen bg-canvas">
      {/* 1. High-Fashion Editorial Hero Section */}
      <ParallaxHero lang={lang} />

      {/* 2. Artisanal Craftsmanship ("Behind The Brush") */}
      <BehindTheBrush lang={lang} />

      {/* 3. Shop by Fabric & Texture */}
      <ShopByFabric lang={lang} />

      {/* 4. Featured Atelier Releases (New Arrivals) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-gold-hairline/60">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
          <div className="text-center sm:text-start space-y-2">
            <span className="text-xs font-bold text-gold uppercase tracking-widest flex items-center justify-center sm:justify-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="font-cairo">{dict.home.featuredCategoriesTitle}</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-burgundy font-cairo tracking-tight">
              {dict.home.newArrivalsTitle}
            </h2>
          </div>
          <Link href={`/${lang}/shop`}>
            <Button variant="ghost" size="sm" className="text-burgundy hover:text-burgundy-hover hover:bg-canvas-warm border border-gold-hairline rounded-full px-5 py-2 text-xs font-bold">
              {isAr ? 'عرض تشكيلة المتجر' : 'View Boutique Shop'} {isAr ? <ArrowLeft className="w-4 h-4 ms-1" /> : <ArrowRight className="w-4 h-4 ms-1" />}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              lang={lang}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>
      </section>

      {/* 5. Exclusive Doha VIP Atelier Concierge Strip (Replaces 3rd-Party Ads) */}
      <section className="py-16 bg-canvas border-b border-gold-hairline/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-burgundy text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-luxury border border-gold-hairline/40">
            {/* Background Gold Ambient Glow */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 80% 20%, rgba(217, 185, 122, 0.4) 0%, transparent 50%)',
              }}
              aria-hidden="true"
            />

            <div className="relative z-10 max-w-3xl space-y-6 text-center sm:text-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-gold/40 text-gold text-xs font-bold tracking-widest uppercase">
                <Gem className="w-3.5 h-3.5" />
                <span className="font-cairo">{isAr ? 'خدمة التفصيل الخاص والأعراس' : 'VIP BRIDAL & BESPOKE ATELIER'}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white font-cairo leading-tight">
                {isAr
                  ? 'ثوب زفافكِ ومناسباتكِ.. يُرسم خصيصاً ليخلد حضوركِ الملكي'
                  : 'Your Ceremonial Toub, Hand-Painted Exclusively For Your Milestone Moments'}
              </h2>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-tajawal max-w-2xl">
                {isAr
                  ? 'نقدم لسيدات الدوحة جلسات استشارة وتفصيل خاصة لاختيار خامات الفوال السويسري الفاخر أو الحرير الطبيعي، مع تصميم نقوش يدوية مخصصة ومطرزة بالذهب لا تتكرر أبداً.'
                  : 'We welcome patrons across Doha for private atelier consultations—hand-selecting heirloom Swiss voile, bespoke palette blending, and personalized monogramming.'}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <Link
                  href={`/${lang}/custom-order`}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gold hover:bg-gold-soft text-burgundy-deep font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{isAr ? 'حجز موعد تفصيل خاص' : 'Book Atelier Appointment'}</span>
                </Link>

                <a
                  href={`https://wa.me/${settings.contactWhatsApp || '97477123456'}?text=${encodeURIComponent(
                    isAr ? 'مرحباً، أود الاستفسار عن تفصيل ثوب خاص من دار بيرغندي' : 'Hello, I would like to inquire about a bespoke commission from BURGUNDY'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>{isAr ? 'محادثة المساعد الشخصي (VIP)' : 'VIP Concierge WhatsApp'}</span>
                </a>
              </div>

              <div className="flex items-center gap-6 pt-4 text-xs text-white/70 justify-center sm:justify-start border-t border-white/10">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-gold" />
                  <span>{isAr ? 'مرخص رسمياً في دولة قطر' : 'Licensed in Qatar'}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span>{isAr ? 'خدمة اللؤلؤة ولوسيل والخليج الغربي' : 'The Pearl, Lusail & West Bay'}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Heritage Story Strip (Sudan to Qatar) */}
      <HeritageStoryStrip lang={lang} />

      {/* 7. Most Coveted Pieces */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-gold-hairline/60">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-gold uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-cairo">{isAr ? 'روائع مختارة' : 'COVETED SELECTIONS'}</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-burgundy font-cairo tracking-tight">
            {dict.home.bestSellersTitle}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              lang={lang}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>
      </section>

      {/* Henna Divider */}
      <HennaDivider />

      {/* 8. Customer Reviews from Verified Patrons in Qatar */}
      <CustomerReviews lang={lang} />

      {/* 9. VIP Private Club Newsletter */}
      <NewsletterSection lang={lang} />

      {/* Interactive Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        lang={lang}
      />
    </div>
  );
}
