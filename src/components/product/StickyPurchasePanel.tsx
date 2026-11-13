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
import { useStoreSettings } from '../../lib/settings-store';
import {
  ShoppingBag,
  Zap,
  MessageCircle,
  Ruler,
  ShieldCheck,
  Check,
  Heart,
  Clock,
  Sparkles,
} from 'lucide-react';

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
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]?.label || 'Free Size (4.5m x 1.15m)');
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const { addToCart, isInWishlist, toggleWishlist, openCart } = useStore();
  const { settings } = useStoreSettings();
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
        image: product.images[0] || '/brand/teaser-clean.jpg',
        size: selectedSize,
        color: selectedColor,
      },
      quantity
    );
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      openCart();
    }, 450);
  };

  const handleBuyNow = () => {
    addToCart(
      {
        id: product.id,
        slug: product.slug,
        title: product.title,
        priceQAR: product.priceQAR,
        image: product.images[0] || '/brand/teaser-clean.jpg',
        size: selectedSize,
        color: selectedColor,
      },
      quantity
    );
    router.push(`/${lang}/checkout`);
  };

  const whatsappMessage = encodeURIComponent(
    isAr
      ? `مرحباً دار بيرغندي (@burgundy974_)، أود الاستفسار عن تفاصيل ومقاسات ${product.title.ar} (السعر: ${formatPrice(product.priceQAR, 'QAR', 'ar')}).`
      : `Hello BURGUNDY (@burgundy974_), I would like to inquire about ${product.title.en} (Price: ${formatPrice(product.priceQAR, 'QAR', 'en')}).`
  );
  const whatsappUrl = `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gold-hairline shadow-luxury sticky top-28 space-y-6">
      {/* Category & Title */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-bold text-gold-ink uppercase tracking-wider">
            {product.fabric[lang]}
          </span>
          <div className="flex items-center gap-1.5">
            {product.isSample && (
              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                {isAr ? 'عينة تجريبية' : 'Demo Sample'}
              </span>
            )}
            {product.isMadeToOrder ? (
              <span className="text-[10px] font-bold text-burgundy bg-surface-peachSoft/50 px-2.5 py-0.5 rounded-full border border-gold-hairline flex items-center gap-1">
                <Clock className="w-3 h-3 text-burgundy" />
                <span>{isAr ? `تنفيذ: ${product.leadTimeDays || 7} أيام` : `Lead time: ${product.leadTimeDays || 7}d`}</span>
              </span>
            ) : product.inStock ? (
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                {isAr ? 'متوفر للتسليم الفوري' : 'In Stock'}
              </span>
            ) : (
              <Badge variant="soldout">{isAr ? 'نفدت الكمية' : 'Sold Out'}</Badge>
            )}
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl font-extrabold text-burgundy font-display leading-snug">
          {product.title[lang]}
        </h1>
        <p className="text-xs text-slateText-secondary mt-1 leading-relaxed">
          {product.subtitle[lang]}
        </p>
      </div>

      {/* Pricing with QAR Primary + Clear Delivery Statement */}
      <div className="pb-5 border-b border-gold-hairline/60">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-black text-burgundy font-body tabular-nums">
            {formatPrice(product.priceQAR, currency, lang)}
          </span>
          {product.originalPriceQAR && product.originalPriceQAR > product.priceQAR && (
            <span className="text-base text-slateText-secondary line-through opacity-70 font-body tabular-nums">
              {formatPrice(product.originalPriceQAR, currency, lang)}
            </span>
          )}
        </div>
        <p className="text-[11px] text-slateText-secondary mt-1 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-gold-line shrink-0" />
          <span>
            {product.priceQAR >= 500
              ? isAr
                ? 'شامل التوصيل المجاني داخل دولة قطر'
                : 'Eligible for FREE Express Courier in Qatar'
              : isAr
              ? 'تضاف رسوم توصيل ثابتة 25 ر.ق عند إتمام الشراء'
              : 'Flat 25 QAR courier fee calculated at checkout'}
          </span>
        </p>
      </div>

      {/* Color Selection */}
      {product.colors.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slateText-body">
            <span>{isAr ? 'اللون المختار:' : 'Selected Color:'}</span>
            <span className="text-burgundy font-bold">
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
                    ? 'border-burgundy scale-110 shadow-md ring-2 ring-burgundy/20'
                    : 'border-gold-hairline hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name[lang]}
                aria-label={c.name[lang]}
              >
                {selectedColor === c.id && (
                  <Check className="w-3.5 h-3.5 text-white stroke-[3] drop-shadow" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size Selection & Measurements Guide */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slateText-body">
          <span>{isAr ? 'المقاس والقياسات:' : 'Size & Drape:'}</span>
          <button
            type="button"
            onClick={() => setIsSizeGuideOpen(true)}
            className="text-burgundy hover:underline inline-flex items-center gap-1 font-bold text-[11px]"
          >
            <Ruler className="w-3 h-3 text-gold-line" />
            <span>{isAr ? 'دليل القياسات' : 'Measurements Guide'}</span>
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
                  ? 'bg-burgundy text-white shadow-sm'
                  : 'bg-canvas border border-gold-hairline text-slateText-body hover:border-burgundy/50'
              } disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-slateText-secondary pt-1">
          {isAr
            ? 'معظم الثياب السودانية تأتي بمقاس حر (4.5 متر طول × 1.15 متر عرض) لتمكين اللفة السودانية التقليدية بانسيابية تامة.'
            : 'Standard Sudanese Toubs feature a generous 4.5m length by 1.15m width designed for traditional draping.'}
        </p>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs font-semibold text-slateText-body">
          {isAr ? 'الكمية المطلوبة:' : 'Quantity:'}
        </span>
        <div className="flex items-center gap-2 border border-gold-hairline rounded-xl px-2 py-1 bg-canvas">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-7 h-7 flex items-center justify-center font-bold text-slateText-body hover:text-burgundy"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="w-6 text-center text-xs font-bold font-body tabular-nums">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="w-7 h-7 flex items-center justify-center font-bold text-slateText-body hover:text-burgundy"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Purchase CTAs */}
      <div className="space-y-3 pt-2">
        <Button
          type="button"
          variant="primary"
          size="lg"
          className="w-full bg-burgundy hover:bg-burgundy-hover text-white shadow-luxury py-3.5 flex items-center justify-center gap-2"
          onClick={handleAddToCart}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4 text-gold-line" />
              <span>{dict.common.addedToCart}</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>{dict.common.addToCart}</span>
            </>
          )}
        </Button>

        <Button
          type="button"
          variant="secondary"
          size="lg"
          className="w-full border-gold-hairline text-burgundy hover:bg-surface-peachSoft/30 py-3.5 flex items-center justify-center gap-2"
          onClick={handleBuyNow}
        >
          <Zap className="w-4 h-4 text-gold-line" />
          <span>{dict.common.buyNow}</span>
        </Button>

        {/* WhatsApp Inquiry & Wishlist */}
        <div className="flex items-center gap-2 pt-1">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-3 rounded-xl border border-gold-hairline bg-white hover:bg-surface-peachSoft/20 text-slateText-body text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>{dict.common.askWhatsApp}</span>
          </a>

          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            className={`p-2.5 rounded-xl border transition-colors ${
              isWishlisted
                ? 'bg-burgundy text-white border-burgundy'
                : 'border-gold-hairline bg-white text-slateText-body hover:text-burgundy'
            }`}
            aria-label="Toggle Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        lang={lang}
      />
    </div>
  );
}
