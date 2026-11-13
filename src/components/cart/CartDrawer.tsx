'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ArrowLeft, Sparkles, ShieldCheck } from 'lucide-react';
import { useStore } from '@/lib/store';
import { formatPrice } from '@/lib/currency';
import { Language } from '@/lib/i18n';

const FREE_SHIPPING_THRESHOLD_QAR = 500;

export function CartDrawer({ lang = 'ar' }: { lang?: Language }) {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    cartTotalQAR,
    cartCount,
    currency,
  } = useStore();
  const router = useRouter();
  const isAr = lang === 'ar';

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD_QAR - cartTotalQAR);
  const freeShippingProgress = Math.min(100, (cartTotalQAR / FREE_SHIPPING_THRESHOLD_QAR) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-fade-in"
      />

      <div className={`fixed inset-y-0 ${isAr ? 'left-0' : 'right-0'} max-w-full flex pl-0 md:pl-10`}>
        <div className="w-screen max-w-md bg-canvas shadow-2xl flex flex-col border-s border-gold-hairline transform transition-transform ease-out duration-300">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-gold-hairline flex items-center justify-between bg-white/70">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-burgundy" />
              <h2 className="text-base font-bold text-burgundy font-display">
                {isAr ? 'حقيبة التسوق' : 'Shopping Bag'}
              </h2>
              <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-burgundy/10 text-burgundy text-xs font-bold flex items-center justify-center">
                {cartCount}
              </span>
            </div>

            <button
              type="button"
              onClick={closeCart}
              className="p-2 -mr-2 text-slateText-secondary hover:text-burgundy rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Qatar Free Express Shipping Bar */}
          <div className="px-6 py-3.5 bg-canvas-warm/70 border-b border-gold-hairline/80">
            {remainingForFreeShipping === 0 ? (
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {isAr
                    ? 'تهانينا! تأهلتِ للحصول على توصيل سريع مجاني في قطر'
                    : 'Congratulations! You unlocked Free Express Delivery in Qatar'}
                </span>
              </div>
            ) : (
              <div className="space-y-1.5">
                <p className="text-xs text-slateText-body font-medium">
                  {isAr ? (
                    <>
                      أضيفي بقيمة{' '}
                      <span className="font-bold text-burgundy">
                        {formatPrice(remainingForFreeShipping, currency, lang)}
                      </span>{' '}
                      للحصول على توصيل مجاني داخل قطر
                    </>
                  ) : (
                    <>
                      Add{' '}
                      <span className="font-bold text-burgundy">
                        {formatPrice(remainingForFreeShipping, currency, lang)}
                      </span>{' '}
                      more for Free Express Qatar Delivery
                    </>
                  )}
                </p>
                <div className="w-full bg-gold-hairline/40 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-burgundy h-full transition-all duration-500 rounded-full"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Content: Empty State vs Items List */}
          {cart.length === 0 ? (
            <div className="flex-1 px-6 py-12 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full bg-surface-peachSoft/40 border border-gold-hairline flex items-center justify-center mb-4 text-burgundy">
                <ShoppingBag className="w-9 h-9 stroke-[1.4]" />
              </div>
              <h3 className="text-lg font-bold text-burgundy font-display mb-1.5">
                {isAr ? 'حقيبتك فارغة حالياً' : 'Your bag is empty'}
              </h3>
              <p className="text-xs text-slateText-secondary max-w-xs mb-6 leading-relaxed">
                {isAr
                  ? 'استكشفي تشكيلات الثياب السودانية والجلابيات والحرير المشغول يدوياً لدى دار بيرغندي.'
                  : 'Discover bespoke hand-painted Sudanese toubs, Swiss voile jalabiyas, and silk scarves.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  closeCart();
                  router.push(`/${lang}/shop`);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-burgundy hover:bg-burgundy-hover text-white text-xs font-bold transition-all shadow-luxury"
              >
                <span>{isAr ? 'استكشاف التشكيلات' : 'Explore Collections'}</span>
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-gold-hairline/60">
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}`} className="py-4 flex gap-4 items-start">
                  {/* Thumbnail */}
                  <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-canvas-warm/40 border border-gold-hairline shrink-0">
                    <img
                      src={item.image || '/brand/teaser-clean.jpg'}
                      alt={item.title[lang]}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/${lang}/products/${item.slug}`}
                        onClick={closeCart}
                        className="text-xs font-bold text-burgundy hover:underline line-clamp-2 font-display leading-snug"
                      >
                        {item.title[lang]}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-slateText-secondary hover:text-red-700 p-1 -mt-1 -mr-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-1 flex items-center gap-2 text-[11px] text-slateText-secondary">
                      <span>{isAr ? `المقاس: ${item.size}` : `Size: ${item.size}`}</span>
                      <span>•</span>
                      <span>{isAr ? `اللون: ${item.color}` : `Color: ${item.color}`}</span>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs font-extrabold text-burgundy font-body tabular-nums">
                        {formatPrice(item.priceQAR * item.quantity, currency, lang)}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gold-hairline rounded-lg bg-white overflow-hidden shadow-xs">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.size, -1)}
                          className="w-7 h-7 flex items-center justify-center text-slateText-body hover:bg-slate-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-burgundy font-body tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.size, 1)}
                          className="w-7 h-7 flex items-center justify-center text-slateText-body hover:bg-slate-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer Actions */}
          {cart.length > 0 && (
            <div className="p-6 bg-white/95 border-t border-gold-hairline space-y-4 shadow-lg">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slateText-secondary">
                  <span>{isAr ? 'المجموع الفرعي' : 'Subtotal'}</span>
                  <span className="text-base font-extrabold text-burgundy font-body tabular-nums">
                    {formatPrice(cartTotalQAR, currency, lang)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slateText-secondary">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-line" />
                  <span>
                    {isAr
                      ? 'تغليف فاخر مجاني مع بطاقة إهداء لجميع طلبات الدوحة'
                      : 'Complimentary luxury packaging & gift card included'}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    closeCart();
                    router.push(`/${lang}/checkout`);
                  }}
                  className="w-full py-3.5 px-4 rounded-full bg-burgundy hover:bg-burgundy-hover text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-luxury active:scale-[0.99]"
                >
                  <span>{isAr ? 'متابعة الدفع الآمن' : 'Proceed to Checkout'}</span>
                  {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    closeCart();
                    router.push(`/${lang}/cart`);
                  }}
                  className="w-full py-2.5 px-4 rounded-full bg-white hover:bg-surface-peachSoft/40 text-slateText-body border border-gold-hairline text-xs font-semibold text-center transition-colors"
                >
                  {isAr ? 'عرض وتعديل الحقيبة الكاملة' : 'View Full Shopping Bag'}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
