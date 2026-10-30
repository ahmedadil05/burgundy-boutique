'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { products } from '@/data/products';
import { useStore } from '@/lib/store';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/Button';
import { Language, getDictionary } from '@/lib/i18n';
import { Heart, ShoppingBag } from 'lucide-react';

export default function WishlistPage() {
  const params = useParams();
  const lang = (params?.lang === 'en' ? 'en' : 'ar') as Language;
  const isAr = lang === 'ar';
  const dict = getDictionary(lang);
  const { wishlist } = useStore();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-cream py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <div className="w-12 h-12 bg-blush-surface text-coral-warm rounded-full flex items-center justify-center mx-auto mb-3 border border-peach-soft">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <h1 className="text-3xl font-extrabold text-cocoa-dark font-cairo">
            {dict.nav.wishlist}
          </h1>
          <p className="mt-1 text-xs text-cocoa-muted">
            {isAr
              ? 'القطع التي نالت إعجابكِ، احفظيها هنا واطلبيها متى رغبتِ.'
              : 'Your curated favourites, saved for when you are ready to indulge.'}
          </p>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="bg-white/80 rounded-3xl p-12 text-center border border-peach-soft max-w-md mx-auto space-y-4 shadow-sm">
            <p className="text-sm font-bold text-cocoa-dark">
              {dict.common.emptyWishlist}
            </p>
            <p className="text-xs text-cocoa-muted">
              {isAr
                ? 'استكشفي أحدث الثياب والدراعات وأضيفي ما يعجبكِ بالضغط على رمز القلب.'
                : 'Browse our latest arrivals and tap the heart icon to save items here.'}
            </p>
            <Link href={`/${lang}/shop`}>
              <Button variant="primary">
                {dict.common.continueShopping}
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlistedProducts.map((p) => (
              <ProductCard key={p.id} product={p} lang={lang} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
