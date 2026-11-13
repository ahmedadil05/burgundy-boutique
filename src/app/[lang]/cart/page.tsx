'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useStore } from '@/lib/store';
import { formatPrice } from '@/lib/currency';
import { Language, getDictionary } from '@/lib/i18n';
import { complianceConfig } from '@/config/compliance';
import { Button } from '@/components/ui/Button';
import { ShoppingBag, Trash2, Truck } from 'lucide-react';

export default function CartPage() {
  const params = useParams();
  const lang = (params?.lang === 'en' ? 'en' : 'ar') as Language;
  const isAr = lang === 'ar';
  const dict = getDictionary(lang);

  const { cart, updateQuantity, removeFromCart, cartTotalQAR, currency } = useStore();

  const freeDeliveryThreshold = complianceConfig.freeDeliveryThresholdQAR;
  const amountNeededForFree = Math.max(0, freeDeliveryThreshold - cartTotalQAR);
  const progressPercent = Math.min(100, Math.round((cartTotalQAR / freeDeliveryThreshold) * 100));

  return (
    <div className="min-h-screen bg-canvas py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Title */}
        <div className="flex items-center justify-between pb-4 border-b border-gold-hairline">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-burgundy font-display">
              {dict.nav.cart}
            </h1>
            <p className="text-xs text-slateText-secondary mt-1">
              {isAr
                ? 'راجعي القطع المختارة قبل إتمام الطلب الآمن.'
                : 'Review your selected artisanal items before checkout.'}
            </p>
          </div>
          <Button asChild variant="ghost" size="sm" className="text-burgundy hover:text-burgundy-hover">
            <Link href={`/${lang}/shop`}>{dict.common.continueShopping}</Link>
          </Button>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gold-hairline max-w-md mx-auto space-y-4 shadow-luxury">
            <div className="w-16 h-16 bg-burgundy/10 text-burgundy rounded-full flex items-center justify-center mx-auto mb-2 border border-gold/30">
              <ShoppingBag className="w-8 h-8 text-burgundy" />
            </div>
            <h2 className="text-lg font-bold text-burgundy font-display">
              {dict.common.emptyCart}
            </h2>
            <p className="text-xs text-slateText-secondary">
              {isAr
                ? 'لم تضيفي أي قطع إلى حقيبة التسوق بعد. استكشفي أحدث الثياب والدراعات الملكية.'
                : 'You have no items in your shopping bag yet. Explore our royal collections.'}
            </p>
            <div className="pt-2">
              <Button asChild size="lg" className="bg-burgundy text-white hover:bg-burgundy-hover font-bold shadow-luxury">
                <Link href={`/${lang}/shop`}>{dict.common.shopNow}</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Cart Items List (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Free Shipping Progress Indicator */}
              <div className="p-4 bg-canvas-warm/70 rounded-2xl border border-gold-hairline space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-burgundy">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-gold-line rtl-flip" />
                    <span>
                      {amountNeededForFree === 0
                        ? isAr
                          ? 'مبروك! شحنتكِ مؤهلة للتوصيل المجاني داخل قطر'
                          : 'Congratulations! Qualified for FREE delivery in Qatar'
                        : isAr
                        ? `أضيفي ${amountNeededForFree} ر.ق للحصول على توصيل مجاني`
                        : `Add ${amountNeededForFree} QAR more for FREE delivery in Qatar`}
                    </span>
                  </span>
                  <span className="text-burgundy font-body tabular-nums">{progressPercent}%</span>
                </div>
                <div className="w-full h-2 bg-white rounded-full overflow-hidden border border-gold-hairline">
                  <div
                    className="h-full bg-burgundy transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Items Card List */}
              <div className="bg-white rounded-3xl p-6 border border-gold-hairline shadow-sm divide-y divide-gold-hairline/40">
                {cart.map((item, idx) => (
                  <div key={`${item.id}-${item.size}-${idx}`} className="py-4 first:pt-0 last:pb-0 flex gap-4 items-center">
                    <img
                      src={item.image}
                      alt={item.title[lang]}
                      className="w-20 h-24 object-cover object-top rounded-2xl border border-gold-hairline shrink-0"
                    />
                    <div className="flex-1 space-y-1">
                      <Link
                        href={`/${lang}/products/${item.slug}`}
                        className="text-sm font-bold text-burgundy hover:underline transition-colors font-display block"
                      >
                        {item.title[lang]}
                      </Link>
                      <p className="text-xs text-slateText-secondary">
                        {isAr ? 'المقاس:' : 'Size:'} <span className="font-semibold">{item.size}</span>
                      </p>
                      <p className="text-xs font-extrabold text-burgundy font-body tabular-nums">
                        {formatPrice(item.priceQAR, currency, lang)}
                      </p>
                    </div>

                    {/* Quantity modifier */}
                    <div className="flex items-center border border-gold-hairline rounded-full bg-canvas p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, -1)}
                        className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-burgundy/10 text-burgundy font-bold text-xs"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-burgundy font-body tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, 1)}
                        className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-burgundy/10 text-burgundy font-bold text-xs"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="p-2 text-slateText-secondary hover:text-red-600 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary & Checkout CTA (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gold-hairline shadow-luxury space-y-4">
                <h3 className="font-bold text-base text-burgundy font-display pb-3 border-b border-gold-hairline">
                  {dict.common.subtotal}
                </h3>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-slateText-secondary">{isAr ? 'المجموع الفرعي للقطع' : 'Subtotal'}</span>
                  <span className="text-2xl font-black text-burgundy font-body tabular-nums">
                    {formatPrice(cartTotalQAR, currency, lang)}
                  </span>
                </div>
                <p className="text-[11px] text-slateText-secondary leading-relaxed">
                  {isAr
                    ? 'يتم احتساب رسوم التوصيل الدقيقة وخيارات الدفع (فوران / بطاقة / تحويل بنكي) في الخطوة التالية.'
                    : 'Exact courier fees and licensed payment rails (Fawran / Card / Bank Wire) selected next.'}
                </p>

                <div className="pt-2">
                  <Button asChild size="lg" className="w-full font-bold bg-burgundy hover:bg-burgundy-hover text-white shadow-luxury">
                    <Link href={`/${lang}/checkout`}>{dict.common.checkout}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
