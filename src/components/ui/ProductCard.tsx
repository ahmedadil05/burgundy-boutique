'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye, Sparkles } from 'lucide-react';
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
  badge?: 'sample' | 'new' | 'sale' | 'soldout' | 'heritage' | 'madeToOrder';
  isSample?: boolean;
  isMadeToOrder?: boolean;
  leadTimeDays?: number;
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
  const displayImage = product.image || (product.images && product.images[0]) || '/brand/teaser-clean.jpg';

  const discountPercentage =
    product.originalPriceQAR && product.originalPriceQAR > product.priceQAR
      ? Math.round(
          ((product.originalPriceQAR - product.priceQAR) /
            product.originalPriceQAR) *
            100
        )
      : null;

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-gold-hairline overflow-hidden hover:shadow-luxury hover:border-burgundy/40 transition-all duration-300">
      {/* Image Container with 3:4 Aspect Ratio */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-canvas-warm/30">
        <Link href={`/${lang}/products/${product.slug}`} className="block w-full h-full">
          <img
            src={displayImage}
            alt={product.title[lang]}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Badges Container */}
        <div className="absolute top-2.5 start-2.5 flex flex-col gap-1 z-10">
          {product.isSample && (
            <span className="text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/90 text-white uppercase backdrop-blur-sm shadow-sm">
              {lang === 'ar' ? 'عينة تجريبية' : 'Demo Sample'}
            </span>
          )}
          {product.isMadeToOrder && (
            <span className="text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-burgundy/90 text-white uppercase backdrop-blur-sm shadow-sm">
              {lang === 'ar' ? 'تفصيل بالطلب' : 'Made to Order'}
            </span>
          )}
          {product.badge === 'heritage' && (
            <Badge variant="heritage">
              {lang === 'ar' ? 'مشغول يدوياً' : 'Hand-Painted'}
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
          {!product.inStock && !product.isMadeToOrder && (
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
              ? 'bg-burgundy text-white'
              : 'bg-white/80 text-slateText-body hover:bg-white hover:text-burgundy'
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
          {(product.inStock || product.isMadeToOrder) && (
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
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-white/95 hover:bg-burgundy text-slateText-body hover:text-white text-xs font-semibold rounded-xl shadow-md transition-all"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'إضافة للحقيبة' : 'Quick Add'}</span>
            </button>
          )}
          {onQuickView && (
            <button
              type="button"
              onClick={() => onQuickView(product)}
              className="p-2 bg-white/95 hover:bg-surface-peachSoft text-slateText-body rounded-xl shadow-md transition-all"
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
          <p className="text-[11px] font-medium text-slateText-secondary tracking-wide mb-1">
            {product.fabric[lang]}
          </p>
          <Link
            href={`/${lang}/products/${product.slug}`}
            className="block text-sm font-bold text-burgundy hover:underline transition-colors line-clamp-1 font-cairo"
          >
            {product.title[lang]}
          </Link>
        </div>

        {/* Pricing */}
        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-sm font-extrabold text-burgundy font-mono">
            {formatPrice(product.priceQAR, currency, lang)}
          </span>
          {product.originalPriceQAR && product.originalPriceQAR > product.priceQAR && (
            <span className="text-xs text-slateText-secondary line-through opacity-70 font-mono">
              {formatPrice(product.originalPriceQAR, currency, lang)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
