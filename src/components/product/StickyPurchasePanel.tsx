'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '../../data/products';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { SizeGuideModal } from './SizeGuideModal';
import { formatPrice, Currency } from '../../lib/currency';
import { Language, getDictionary } from '../../lib/i18n';
import { useStore } from '../../lib/store';
import {
  ShoppingBag,
  Zap,
  MessageCircle,
  Ruler,
  ShieldCheck,
  Check,
  Heart,
} from 'lucide-react';
import { siteConfig } from '../../config/site';

export interface StickyPurchasePanelProps {
  product: Product;
  lang?: Language;
  currency?: Currency;
}

export function StickyPurchasePanel({
  product,
  lang = 'ar',
  currency = 'QAR',
}: StickyPurchasePanelProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.id || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]?.label || 'Free Size');
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const { addToCart, isInWishlist, toggleWishlist } = useStore();
  const router = useRouter();
  const dict = getDictionary(lang);
  const isAr = lang === 'ar';
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        slug: product.slug,
        title: product.title,
        priceQAR: product.priceQAR,
        image: product.images[0],
        size: selectedSize,
        color: selectedColor,
      },
      quantity
    );
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(
      {
        id: product.id,
        slug: product.slug,
        title: product.title,
        priceQAR: product.priceQAR,
        image: product.images[0],
        size: selectedSize,
        color: selectedColor,
      },
      quantity
    );
    router.push(`/${lang}/checkout`);
  };

  const whatsappMessage = encodeURIComponent(
    isAr
      ? `مرحباً، أود الاستفسار عن تفاصيل ومقاسات ${product.title.ar} (السعر: ${formatPrice(product.priceQAR, 'QAR', 'ar')}) المعروض في بوتيك كنداكة.`
      : `Hello, I'd like to ask about ${product.title.en} (Price: ${formatPrice(product.priceQAR, 'QAR', 'en')}) on Kandaka Boutique.`
  );
  const whatsappUrl = `https://wa.me/${siteConfig.support.whatsappNumber.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

  return (
    <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-peach-soft shadow-warm sticky top-28 space-y-6">
      {/* Category & Title */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-bold text-coral-warm uppercase tracking-wider">
            {product.fabric[lang]}
          </span>
          <div className="flex items-center gap-1.5">
            {product.stockCount <= 5 && product.stockCount > 0 ? (
              <span className="text-[11px] font-bold text-amber-700 bg-amber-100/70 px-2.5 py-0.5 rounded-full">
                {isAr ? `متبقي ${product.stockCount} قطع فقط` : `Only ${product.stockCount} left`}
              </span>
            ) : product.inStock ? (
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                {isAr ? 'متوفر للتسليم الفوري' : 'In Stock'}
              </span>
            ) : (
              <Badge variant="soldout">{isAr ? 'نفدت الكمية' : 'Sold Out'}</Badge>
            )}
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl font-extrabold text-cocoa-dark font-cairo leading-snug">
          {product.title[lang]}
        </h1>
        <p className="text-xs text-cocoa-muted mt-1 leading-relaxed">
          {product.subtitle[lang]}
        </p>
      </div>

      {/* Pricing with QAR Primary + Clear Delivery Statement */}
      <div className="pb-5 border-b border-peach-soft/60">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-black text-coral-warm">
            {formatPrice(product.priceQAR, currency, lang)}
          </span>
          {product.originalPriceQAR && product.originalPriceQAR > product.priceQAR && (
            <span className="text-base text-cocoa-muted line-through opacity-70">
              {formatPrice(product.originalPriceQAR, currency, lang)}
            </span>
          )}
        </div>
        <p className="text-[11px] text-cocoa-muted mt-1 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>
            {product.priceQAR >= 350
              ? isAr
                ? 'شامل التوصيل المجاني داخل دولة قطر'
                : 'Eligible for FREE Express Delivery in Qatar'
              : isAr
              ? 'تضاف رسوم توصيل ثابتة 25 ر.ق عند إتمام الشراء'
              : 'Flat 25 QAR courier delivery calculated at checkout'}
          </span>
        </p>
      </div>

      {/* Color Selection */}
      {product.colors.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-cocoa-dark">
            <span>{isAr ? 'اللون المختار:' : 'Selected Color:'}</span>
            <span className="text-coral-warm font-bold">
              {product.colors.find((c) => c.id === selectedColor)?.name[lang]}
            </span>
          </div>
          <div className="flex gap-2.5">
            {product.colors.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedColor(c.id)}
                className={`w-8 h-8 rounded-full border-2 transition-transform duration-150 relative flex items-center justify-center ${
                  selectedColor === c.id
                    ? 'border-coral-warm scale-110 shadow-md ring-2 ring-coral-warm/20'
                    : 'border-peach-soft hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name[lang]}
                aria-label={c.name[lang]}
              >
                {selectedColor === c.id && (
                  <Check className="w-3.5 h-3.5 text-cocoa-dark stroke-[3]" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size Selection & Size Guide Trigger */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-cocoa-dark">
          <span>{isAr ? 'المقاس:' : 'Size:'}</span>
          <button
            type="button"
            onClick={() => setIsSizeGuideOpen(true)}
            className="text-coral-warm hover:underline inline-flex items-center gap-1 font-bold text-[11px]"
          >
            <Ruler className="w-3 h-3" />
            <span>{isAr ? 'جدول المقاسات' : 'Size Guide'}</span>
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSelectedSize(s.label)}
              disabled={!s.available}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedSize === s.label
                  ? 'bg-coral-warm text-white shadow-sm'
                  : 'bg-cream border border-peach-soft text-cocoa-dark hover:border-peach-deep'
              } disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity & CTA Actions */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-3">
          {/* Quantity Selector */}
          <div className="flex items-center border border-peach-soft rounded-full bg-cream p-1">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-7 h-7 flex items-center justify-center rounded-full text-cocoa-dark hover:bg-blush-surface text-base font-bold"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="w-8 text-center text-xs font-bold text-cocoa-dark">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
              className="w-7 h-7 flex items-center justify-center rounded-full text-cocoa-dark hover:bg-blush-surface text-base font-bold"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Add to Bag Primary Button */}
          <Button
            variant="primary"
            size="lg"
            className="flex-1 shadow-warm hover:shadow-warm-lg"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            icon={isAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
          >
            {isAdded
              ? dict.common.addedToCart
              : product.inStock
              ? dict.common.addToCart
              : dict.common.outOfStock}
          </Button>

          {/* Wishlist toggle */}
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            className={`p-3 rounded-full border border-peach-soft transition-colors ${
              isWishlisted
                ? 'bg-coral-warm text-white'
                : 'bg-cream text-cocoa-dark hover:text-coral-warm'
            }`}
            aria-label="Save to wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Buy Now Direct Button */}
        {product.inStock && (
          <Button
            variant="secondary"
            size="md"
            className="w-full font-bold"
            onClick={handleBuyNow}
            icon={<Zap className="w-4 h-4" />}
          >
            {dict.common.buyNow}
          </Button>
        )}

        {/* WhatsApp Inquiry Button (Compliant with Qatar - asking about this item) */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full border-2 border-[#25D366] text-[#128C7E] hover:bg-[#25D366]/10 text-xs font-bold transition-all"
        >
          <MessageCircle className="w-4 h-4 text-[#25D366]" />
          <span>{dict.common.askWhatsApp}</span>
        </a>
      </div>

      {/* Sizing Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        lang={lang}
      />
    </div>
  );
}
