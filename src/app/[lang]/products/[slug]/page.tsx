'use client';

import React, { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { products as seedProducts } from '@/data/products';
import { useCatalogStore } from '@/lib/catalog-store';
import { ProductGallery } from '@/components/product/ProductGallery';
import { StickyPurchasePanel } from '@/components/product/StickyPurchasePanel';
import { DeliveryEstimator } from '@/components/product/DeliveryEstimator';
import { Accordion } from '@/components/ui/Accordion';
import { ProductCard } from '@/components/ui/ProductCard';
import { Language, getDictionary } from '@/lib/i18n';
import { ShieldCheck, RotateCcw, Sparkles } from 'lucide-react';

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const [langSlug, setLangSlug] = useState<{ lang: string; slug: string } | null>(null);

  useEffect(() => {
    params.then(setLangSlug);
  }, [params]);

  const currentLang = (langSlug?.lang === 'en' ? 'en' : 'ar') as Language;
  const isAr = currentLang === 'ar';
  const dict = getDictionary(currentLang || 'ar');

  const catalog = useCatalogStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => { setHydrated(true); }, []);

  // Seeded products are used for immediate SSR render; after hydration the
  // client catalog (from localStorage) takes over so admin edits show up.
  const source = hydrated ? catalog.products : seedProducts;
  const product = langSlug ? source.find((p) => p.slug === langSlug.slug) ?? seedProducts.find((p) => p.slug === langSlug.slug) ?? null : null;

  if (langSlug && !product) {
    notFound();
  }

  if (!langSlug || !product) {
    return (
      <div className="min-h-screen bg-canvas py-20 flex items-center justify-center">
        <p className="text-xs text-slateText-secondary">{isAr ? 'جاري التحميل...' : 'Loading...'}</p>
      </div>
    );
  }

  // Recommendations: Other products from same or related category
  const recommendations = catalog.products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const accordionItems = [
    {
      id: 'details',
      title: isAr ? 'تفاصيل الحياكة والمنشأ التراثي' : 'Craftsmanship & Heritage Origin',
      content: (
        <div className="space-y-2 text-slateText-body">
          <p className="leading-relaxed">{product.description[currentLang]}</p>
          <div className="pt-2 border-t border-gold-hairline/60 space-y-1 text-xs">
            <p>
              <strong className="text-burgundy">{dict.common.fabric}:</strong> {product.fabric[currentLang]}
            </p>
            <p>
              <strong className="text-burgundy">{dict.common.origin}:</strong> {product.origin[currentLang]}
            </p>
          </div>
          <ul className="list-disc list-inside space-y-1 text-slateText-secondary pt-1 text-xs">
            {product.features.map((f, i) => (
              <li key={i}>{f[currentLang]}</li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: 'care',
      title: isAr ? 'إرشادات الغسيل والعناية بالأقمشة' : 'Fabric & Care Instructions',
      content: (
        <p className="leading-relaxed text-slateText-body text-xs">{product.careInstructions[currentLang]}</p>
      ),
    },
    {
      id: 'returns',
      title: isAr ? 'سياسة الاستبدال والضمان (وزارة التجارة)' : 'Exchange & Guarantee Policy (MOCI)',
      content: (
        <div className="space-y-1.5 leading-relaxed text-slateText-body text-xs">
          <p>
            {isAr
              ? 'يحق لكِ استبدال أو استرجاع المنتج خلال 14 يوماً من الاستلام بحالته الأصلية وفق لوائح وزارة التجارة والصناعة بدولة قطر.'
              : 'You have the right to exchange or return within 14 days of receipt under Qatar MOCI consumer protection regulations.'}
          </p>
          <Link
            href={`/${currentLang}/policies/returns`}
            className="text-burgundy font-semibold underline block pt-1 hover:text-burgundy-hover"
          >
            {isAr ? 'قراءة السياسة كاملة' : 'Read Full Return Policy'}
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-canvas py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slateText-secondary">
          <Link href={`/${currentLang}`} className="hover:text-burgundy">
            {dict.nav.home}
          </Link>
          <span>/</span>
          <Link
            href={`/${currentLang}/shop?category=${product.category}`}
            className="hover:text-burgundy"
          >
            {dict.nav.shop}
          </Link>
          <span>/</span>
          <span className="text-burgundy font-medium line-clamp-1">{product.title[currentLang]}</span>
        </nav>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Product Gallery (col-span-7) */}
          <div className="lg:col-span-7">
            <ProductGallery
              images={product.images}
              title={product.title[currentLang]}
              badge={product.badge}
              lang={currentLang}
            />
          </div>

          {/* Purchase Panel (col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-gold-ink font-bold">
                {product.category.replace('-', ' ')}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-burgundy font-display leading-tight">
                {product.title[currentLang]}
              </h1>
              <p className="text-slateText-secondary text-sm leading-relaxed">{product.subtitle[currentLang]}</p>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-2 rounded-full border border-emerald-100 w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{isAr ? 'جودة سويسرية مضمونة' : 'Swiss Quality Guaranteed'}</span>
            </div>

            <StickyPurchasePanel product={product} lang={currentLang} />

            <DeliveryEstimator lang={currentLang} />
          </div>
        </div>

        {/* Product Details Accordion */}
        <div className="max-w-5xl mx-auto w-full">
          <h2 className="text-xl font-bold text-burgundy font-display mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gold-line" />
            {isAr ? 'مواصفات المنشأ والتفصيل اليدوي' : 'Heritage & Craft Details'}
          </h2>
          <Accordion items={accordionItems} />
        </div>

        {/* Similar Recommendations */}
        {recommendations.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-gold-hairline">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-extrabold text-burgundy font-display">
                {dict.product.similarProducts}
              </h2>
              <Link
                href={`/${currentLang}/shop`}
                className="text-xs font-bold text-burgundy hover:underline flex items-center gap-1"
              >
                {isAr ? 'عرض المتجر كاملاً' : 'View Full Boutique'}
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {recommendations.map((item) => (
                <ProductCard key={item.id} product={item} lang={currentLang} />
              ))}
            </div>
          </div>
        )}

        {/* Trust & Guarantee Horizontal Bar */}
        <div className="bg-white rounded-3xl border border-gold-hairline p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs">
          <div className="flex flex-col items-center gap-2">
            <RotateCcw className="w-5 h-5 text-burgundy" />
            <strong className="text-slateText-body">{isAr ? 'استرجاع خلال 14 يوم' : '14-Day Returns'}</strong>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-burgundy" />
            <strong className="text-slateText-body">{isAr ? 'أصلي مصنوع يدوياً' : 'Authentic Hand-Made'}</strong>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Sparkles className="w-5 h-5 text-burgundy" />
            <strong className="text-slateText-body">{isAr ? 'ثبات اللون مضمون' : 'Color-Fast Guaranteed'}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
