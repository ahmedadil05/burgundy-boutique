'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, ShoppingBag, Heart, Check, Sparkles, Ruler, ArrowRight, ArrowLeft } from 'lucide-react';
import { ProductItem } from '@/components/ui/ProductCard';
import { formatPrice, Currency } from '@/lib/currency';
import { Language } from '@/lib/i18n';
import { useStore } from '@/lib/store';
import { Badge } from '@/components/ui/Badge';

export interface ProductQuickViewModalProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
  lang?: Language;
  currency?: Currency;
}

export function ProductQuickViewModal({
  product,
  isOpen,
  onClose,
  lang = 'ar',
  currency = 'QAR',
}: ProductQuickViewModalProps) {
  const { addToCart, isInWishlist, toggleWishlist, openCart } = useStore();
  const [selectedSize, setSelectedSize] = useState('Free Size');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const isAr = lang === 'ar';

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setSelectedSize('Free Size');
      setQuantity(1);
      setIsAdded(false);
      setActiveImageIndex(0);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const isWishlisted = isInWishlist(product.id);
  const images = product.images && product.images.length > 0
    ? product.images
    : [product.image || '/brand/teaser-clean.jpg'];
  const currentImage = images[activeImageIndex] || images[0];

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        slug: product.slug,
        title: product.title,
        priceQAR: product.priceQAR,
        image: currentImage,
        size: selectedSize,
        color: 'Original',
      },
      quantity
    );

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
      openCart();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
        <div className="relative transform overflow-hidden rounded-3xl bg-canvas text-start shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-3xl border border-gold-hairline">
          
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 end-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-slateText-body hover:text-burgundy backdrop-blur-md shadow-sm transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Gallery Column */}
            <div className="relative bg-canvas-warm/30 p-6 flex flex-col justify-between">
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-gold-hairline/60 bg-white">
                <img
                  src={currentImage}
                  alt={product.title[lang]}
                  className="w-full h-full object-cover object-top"
                />

                {/* Badges */}
                <div className="absolute top-3 start-3 flex flex-col gap-1">
                  {product.badge === 'heritage' && (
                    <Badge variant="heritage">
                      {isAr ? 'مشغول يدوياً' : 'Hand-Painted'}
                    </Badge>
                  )}
                  {product.badge === 'new' && (
                    <Badge variant="new">
                      {isAr ? 'جديد' : 'New'}
                    </Badge>
                  )}
                  {product.isMadeToOrder && (
                    <span className="text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-burgundy/90 text-white uppercase backdrop-blur-sm shadow-sm">
                      {isAr ? 'تفصيل بالطلب' : 'Made to Order'}
                    </span>
                  )}
                </div>

                {/* Wishlist button */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Wishlist"
                  className={`absolute top-3 end-3 p-2 rounded-full backdrop-blur-md shadow-sm transition-all ${
                    isWishlisted ? 'bg-burgundy text-white' : 'bg-white/80 text-slateText-body hover:text-burgundy'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Thumbnails if multiple */}
              {images.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-14 h-16 rounded-lg overflow-hidden border transition-all shrink-0 ${
                        activeImageIndex === idx
                          ? 'border-burgundy ring-2 ring-burgundy/20 scale-105'
                          : 'border-gold-hairline opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Column */}
            <div className="p-6 md:p-8 flex flex-col justify-between space-y-5 bg-white">
              <div>
                <span className="text-[11px] font-semibold text-slateText-secondary uppercase tracking-wider block mb-1">
                  {product.fabric[lang]}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-burgundy font-cairo leading-snug">
                  {product.title[lang]}
                </h3>

                {/* Price Display */}
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-xl font-extrabold text-burgundy font-mono">
                    {formatPrice(product.priceQAR, currency, lang)}
                  </span>
                  {product.originalPriceQAR && product.originalPriceQAR > product.priceQAR && (
                    <span className="text-sm text-slateText-secondary line-through opacity-70 font-mono">
                      {formatPrice(product.originalPriceQAR, currency, lang)}
                    </span>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t border-gold-hairline/60">
                  <p className="text-xs text-slateText-body leading-relaxed">
                    {isAr
                      ? 'قطعة مميزة من دار بيرغندي، مشغولة على قماش فوال قطني سويسري ناعم 4.5 متر ومزينة بنقوش فنية أصيلة تمثل الهوية السودانية الراقية.'
                      : 'An exclusive BURGUNDY atelier creation, executed on 4.5m Swiss cotton voile with artisanal hand-painted motifs.'}
                  </p>
                </div>

                {/* Size Selector */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slateText-body font-cairo">
                      {isAr ? 'المقاس / الطول' : 'Size / Length'}
                    </span>
                    <span className="text-[11px] text-slateText-secondary flex items-center gap-1">
                      <Ruler className="w-3 h-3 text-gold-line" />
                      <span>{isAr ? 'طول قياسي 4.5 متر' : '4.5m Standard Canvas'}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {['Free Size', 'Custom Tailored'].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                          selectedSize === size
                            ? 'bg-burgundy text-white border-burgundy shadow-sm'
                            : 'bg-white hover:bg-canvas text-slateText-body border-gold-hairline'
                        }`}
                      >
                        {size === 'Free Size'
                          ? isAr ? 'مقاس حر (4.5 متر)' : 'Free Size (4.5m)'
                          : isAr ? 'تفصيل خاص بالطلب' : 'Custom Tailored'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-xs font-bold text-slateText-body font-cairo">
                    {isAr ? 'الكمية' : 'Quantity'}
                  </span>
                  <div className="flex items-center border border-gold-hairline rounded-lg bg-canvas-warm/30">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 flex items-center justify-center text-slateText-body hover:bg-white transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-burgundy font-mono">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-8 h-8 flex items-center justify-center text-slateText-body hover:bg-white transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-2.5 pt-4 border-t border-gold-hairline">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!product.inStock && !product.isMadeToOrder}
                  className={`w-full py-3.5 px-4 rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-luxury ${
                    isAdded
                      ? 'bg-emerald-700 text-white'
                      : 'bg-burgundy hover:bg-burgundy-hover text-white active:scale-[0.99]'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{isAr ? 'تمت الإضافة إلى الحقيبة بنجاح' : 'Added to Bag'}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>{isAr ? 'إضافة إلى حقيبة التسوق' : 'Add to Shopping Bag'}</span>
                    </>
                  )}
                </button>

                <Link
                  href={`/${lang}/products/${product.slug}`}
                  onClick={onClose}
                  className="w-full py-2.5 px-4 rounded-full bg-white hover:bg-surface-peachSoft/30 text-slateText-body hover:text-burgundy border border-gold-hairline text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>{isAr ? 'عرض التفاصيل الكاملة والدليل' : 'View Full Details & Size Guide'}</span>
                  {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
