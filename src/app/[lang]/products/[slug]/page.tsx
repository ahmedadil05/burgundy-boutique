import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { products, getProductBySlug } from '@/data/products';
import { ProductGallery } from '@/components/product/ProductGallery';
import { StickyPurchasePanel } from '@/components/product/StickyPurchasePanel';
import { DeliveryEstimator } from '@/components/product/DeliveryEstimator';
import { Accordion } from '@/components/ui/Accordion';
import { ProductCard } from '@/components/ui/ProductCard';
import { Language, getDictionary } from '@/lib/i18n';
import { ShieldCheck, RotateCcw, Sparkles } from 'lucide-react';

export function generateStaticParams() {
  const languages = ['ar', 'en'];
  const params: Array<{ lang: string; slug: string }> = [];

  languages.forEach((lang) => {
    products.forEach((p) => {
      params.push({ lang, slug: p.slug });
    });
  });

  return params;
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const currentLang = (lang === 'en' ? 'en' : 'ar') as Language;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const dict = getDictionary(currentLang);
  const isAr = currentLang === 'ar';

  // Recommendations: Other products from same or related category
  const recommendations = products
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
            {(dict.nav as Record<string, string>)[product.category] || product.category}
          </Link>
          <span>/</span>
          <span className="text-burgundy font-semibold line-clamp-1">
            {product.title[currentLang]}
          </span>
        </nav>

        {/* Main 2-Column Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Gallery & Accordion (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <ProductGallery
              images={product.images}
              title={product.title[currentLang]}
              badge={product.badge}
              lang={currentLang}
            />

            {/* Accordion Specs */}
            <div className="bg-white rounded-3xl p-6 border border-gold-hairline shadow-sm">
              <h2 className="text-base font-bold text-burgundy mb-3 font-display">
                {dict.product.fabricAndCare}
              </h2>
              <Accordion items={accordionItems} defaultOpenId="details" />
            </div>

            {/* Heritage Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-canvas-warm/40 border border-gold-hairline text-center">
                <Sparkles className="w-5 h-5 text-gold-line mx-auto mb-1.5" />
                <span className="block text-xs font-bold text-burgundy">
                  {isAr ? 'أصالة 100%' : '100% Authentic'}
                </span>
                <span className="text-[10px] text-slateText-secondary">
                  {isAr ? 'رسم وتطريز يدوي' : 'Hand-Painted & Needlework'}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-canvas-warm/40 border border-gold-hairline text-center">
                <RotateCcw className="w-5 h-5 text-gold-line mx-auto mb-1.5" />
                <span className="block text-xs font-bold text-burgundy">
                  {isAr ? 'استبدال 14 يوماً' : '14-Day Returns'}
                </span>
                <span className="text-[10px] text-slateText-secondary">
                  {isAr ? 'وفق القانون القطري' : 'Qatar MOCI Governed'}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-canvas-warm/40 border border-gold-hairline text-center">
                <ShieldCheck className="w-5 h-5 text-gold-line mx-auto mb-1.5" />
                <span className="block text-xs font-bold text-burgundy">
                  {isAr ? 'دفع آمن ومرخص' : 'Licensed Gateway'}
                </span>
                <span className="text-[10px] text-slateText-secondary">
                  {isAr ? 'QPay / فوران / بطاقات' : 'QPay / Fawran / Cards'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Purchase Panel & Delivery (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <StickyPurchasePanel product={product} lang={currentLang} />
            <DeliveryEstimator lang={currentLang} />
          </div>
        </div>

        {/* You May Also Like Section */}
        <section className="pt-10 border-t border-gold-hairline">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-coral-ink uppercase tracking-wider">
              {isAr ? 'تشكيلات مكملة' : 'Curated For You'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-burgundy font-display mt-1">
              {dict.product.similarProducts}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {recommendations.map((rec) => (
              <ProductCard
                key={rec.id}
                product={rec}
                lang={currentLang}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
