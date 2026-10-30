'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Badge } from './Badge';
import { formatPrice, Currency } from '../../lib/currency';
import { Language } from '../../lib/i18n';
import { useStore } from '../../lib/store';

export interface ProductItem {
  id: string;
  slug: string;
  title: { ar: string; en: string };
  priceQAR: number;
  originalPriceQAR?: number;
  image?: string;
  images?: string[];
  secondaryImage?: string;
  category: string;
  badge?: 'new' | 'sale' | 'soldout' | 'heritage';
  inStock: boolean;
  fabric: { ar: string; en: string };
}

export interface ProductCardProps {
  product: ProductItem;
  lang?: Language;
  currency?: Currency;
  onQuickView?: (product: ProductItem) => void;
}

export function ProductCard({
  product,
  lang = 'ar',
  currency = 'QAR',
  onQuickView,
}: ProductCardProps) {
  const { isInWishlist, toggleWishlist, addToCart } = useStore();
  const isWishlisted = isInWishlist(product.id);
  const displayImage = product.image || (product.images && product.images[0]) || '';

  const discountPercentage =
    product.originalPriceQAR && product.originalPriceQAR > product.priceQAR
      ? Math.round(
          ((product.originalPriceQAR - product.priceQAR) /
            product.originalPriceQAR) *
            100
        )
      : null;

  return (
    <div className="group relative flex flex-col bg-white/70 rounded-2xl border border-peach-soft/60 overflow-hidden hover:shadow-warm transition-all duration-300">
      {/* Image Container with 3:4 Aspect Ratio */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-blush-surface/30">
        <Link href={`/${lang}/products/${product.slug}`} className="block w-full h-full">
          <img
            src={displayImage}
            alt={product.title[lang]}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2.5 start-2.5 flex flex-col gap-1.5 z-10">
          {product.badge === 'heritage' && (
            <Badge variant="heritage">
              {lang === 'ar' ? 'أصالة سودانية' : 'Heritage'}
            </Badge>
          )}
          {product.badge === 'new' && (
            <Badge variant="new">
              {lang === 'ar' ? 'جديد' : 'New'}
            </Badge>
          )}
          {product.badge === 'sale' && (
            <Badge variant="sale">
              {discountPercentage
                ? `-${discountPercentage}%`
                : lang === 'ar'
                ? 'تخفيض'
                : 'Sale'}
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant="soldout">
              {lang === 'ar' ? 'نفدت' : 'Sold Out'}
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2.5 end-2.5 p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
            isWishlisted
              ? 'bg-coral-warm text-white'
              : 'bg-white/80 text-cocoa-dark hover:bg-white hover:text-coral-warm'
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform active:scale-125 ${
              isWishlisted ? 'fill-current' : ''
            }`}
          />
        </button>

        {/* Action Overlay */}
        <div className="absolute inset-x-2 bottom-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {product.inStock && (
            <button
              type="button"
              onClick={() =>
                addToCart({
                  id: product.id,
                  slug: product.slug,
                  title: product.title,
                  priceQAR: product.priceQAR,
                  image: displayImage,
                  size: 'Free Size',
                  color: 'Original',
                })
              }
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-white/95 hover:bg-coral-warm text-cocoa-dark hover:text-white text-xs font-semibold rounded-xl shadow-md transition-all"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'إضافة سريعة' : 'Quick Add'}</span>
            </button>
          )}
          {onQuickView && (
            <button
              type="button"
              onClick={() => onQuickView(product)}
              className="p-2 bg-white/95 hover:bg-blush-surface text-cocoa-dark rounded-xl shadow-md transition-all"
              aria-label="Quick View"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Details Container */}
      <div className="p-3.5 flex flex-col flex-1 justify-between">
        <div>
          <p className="text-[11px] font-medium text-cocoa-muted tracking-wide mb-1">
            {product.fabric[lang]}
          </p>
          <Link
            href={`/${lang}/products/${product.slug}`}
            className="block text-sm font-bold text-cocoa-dark hover:text-coral-warm transition-colors line-clamp-1"
          >
            {product.title[lang]}
          </Link>
        </div>

        {/* Pricing */}
        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-sm font-extrabold text-coral-warm">
            {formatPrice(product.priceQAR, currency, lang)}
          </span>
          {product.originalPriceQAR && product.originalPriceQAR > product.priceQAR && (
            <span className="text-xs text-cocoa-muted line-through opacity-70">
              {formatPrice(product.originalPriceQAR, currency, lang)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
