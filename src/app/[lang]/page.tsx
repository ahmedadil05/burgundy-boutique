import React from 'react';
import { products } from '@/data/products';
import { HeroBanner } from '@/components/home/HeroBanner';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { HeritageStoryStrip } from '@/components/home/HeritageStoryStrip';
import { CustomerReviews } from '@/components/home/CustomerReviews';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { HennaDivider } from '@/components/common/HennaDivider';
import { ProductCard } from '@/components/ui/ProductCard';
import { Language, getDictionary } from '@/lib/i18n';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

export function generateStaticParams() {
  return [{ lang: 'ar' }, { lang: 'en' }];
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const currentLang = (lang === 'en' ? 'en' : 'ar') as Language;
  const dict = getDictionary(currentLang);
  const isAr = currentLang === 'ar';

  const newArrivals = products.slice(0, 4);
  const bestSellers = products.slice(2, 6);

  return (
    <div className="min-h-screen bg-cream">
      {/* 1. Hero Banner */}
      <HeroBanner lang={currentLang} />

      {/* Cultural Henna Divider */}
      <HennaDivider />

      {/* 2. Featured Categories Grid */}
      <CategoryGrid lang={currentLang} />

      {/* 3. New Arrivals Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-coral-warm uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{dict.common.newBadge}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-cocoa-dark font-cairo">
              {dict.home.newArrivalsTitle}
            </h2>
          </div>
          <Link href={`/${currentLang}/shop?filter=new`}>
            <Button variant="ghost" size="sm">
              {isAr ? 'عرض الكل' : 'View All'} {isAr ? <ArrowLeft className="w-4 h-4 ms-1" /> : <ArrowRight className="w-4 h-4 ms-1" />}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              lang={currentLang}
            />
          ))}
        </div>
      </section>

      {/* 4. Heritage Brand Strip */}
      <HeritageStoryStrip lang={currentLang} />

      {/* 5. Best Sellers Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold text-coral-warm uppercase tracking-wider">
            {isAr ? 'اختيارات النخبة' : 'Most Loved'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-cocoa-dark font-cairo mt-1">
            {dict.home.bestSellersTitle}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              lang={currentLang}
            />
          ))}
        </div>
      </section>

      {/* Cultural Henna Divider */}
      <HennaDivider />

      {/* 6. Customer Reviews from Qatar */}
      <CustomerReviews lang={currentLang} />

      {/* 7. Newsletter & Instagram Section */}
      <NewsletterSection lang={currentLang} />
    </div>
  );
}
