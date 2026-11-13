'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { products } from '@/data/products';
import { useStore } from '@/lib/store';
import { ProductCard, ProductItem } from '@/components/ui/ProductCard';
import { ProductQuickViewModal } from '@/components/product/ProductQuickViewModal';
import { Button } from '@/components/ui/Button';
import { Language, getDictionary } from '@/lib/i18n';
import { Heart, ArrowLeft, ArrowRight } from 'lucide-react';

export default function WishlistPage() {
  const params = useParams();
  const lang = (params?.lang === 'en' ? 'en' : 'ar') as Language;
  const isAr = lang === 'ar';
  const dict = getDictionary(lang);
  const { wishlist } = useStore();
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-canvas py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="w-14 h-14 bg-surface-peachSoft/40 text-burgundy rounded-full flex items-center justify-center mx-auto mb-3 border border-gold-hairline shadow-sm">
            <Heart className="w-7 h-7 fill-burgundy text-burgundy" />
          </div>
          <h1 className="text-3xl font-extrabold text-burgundy font-display">
            {dict.nav.wishlist}
          </h1>
          <p className="text-xs text-slateText-secondary leading-relaxed">
            {isAr
              ? 'القطع التي نالت إعجابكِ، احفظيها هنا واطلبيها متى رغبتِ بتوصيل سريع داخل قطر.'
              : 'Your curated favourites, saved for when you are ready to indulge with express Qatar delivery.'}
          </p>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gold-hairline max-w-md mx-auto space-y-4 shadow-luxury">
            <p className="text-base font-bold text-burgundy font-display">
              {dict.common.emptyWishlist}
            </p>
            <p className="text-xs text-slateText-secondary leading-relaxed">
              {isAr
                ? 'استكشفي أحدث الثياب السودانية والجلابيات والشيلان وأضيفي ما يعجبكِ بالضغط على رمز القلب.'
                : 'Browse our latest artisanal collections and tap the heart icon to save items here.'}
            </p>
            <Button asChild variant="primary" className="bg-burgundy hover:bg-burgundy-hover text-white shadow-luxury">
              <Link href={`/${lang}/shop`}>
                <span>{dict.common.continueShopping}</span>
                {isAr ? <ArrowLeft className="w-4 h-4 ms-1" /> : <ArrowRight className="w-4 h-4 ms-1" />}
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlistedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                lang={lang}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        )}
      </div>

      <ProductQuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        lang={lang}
      />
    </div>
  );
}
