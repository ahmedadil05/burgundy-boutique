'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useStore } from '@/lib/store';
import { calculateCheckoutTotals, createOrderInvoice } from '@/lib/order-utils';
import { processPayment, PaymentMethod } from '@/lib/payment-gateway';
import { AddressFormQatar, AddressFormData } from '@/components/checkout/AddressFormQatar';
import { PaymentMethodSelector } from '@/components/checkout/PaymentMethodSelector';
import { CostBreakdown } from '@/components/checkout/CostBreakdown';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { Language, getDictionary } from '@/lib/i18n';
import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const params = useParams();
  const lang = (params?.lang === 'en' ? 'en' : 'ar') as Language;
  const isAr = lang === 'ar';
  const dict = getDictionary(lang);
  const router = useRouter();

  const { cart, cartTotalQAR, clearCart, currency } = useStore();

  const [formData, setFormData] = useState<AddressFormData>({
    fullName: '',
    phone: '',
    email: '',
    destination: 'qatar',
    municipality: 'Doha',
    zone: '',
    street: '',
    building: '',
    notes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('fawran');
  const [fawranAlias, setFawranAlias] = useState('');
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const totals = calculateCheckoutTotals(cartTotalQAR, formData.destination);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (cart.length === 0) {
      setErrorMessage(isAr ? 'حقيبة التسوق فارغة' : 'Your shopping bag is empty');
      return;
    }

    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setErrorMessage(isAr ? 'يرجى استكمال جميع بيانات الاتصال الإلزامية' : 'Please fill all required contact fields');
      return;
    }

    if (
      formData.destination === 'qatar' &&
      (!formData.zone.trim() || !formData.street.trim() || !formData.building.trim())
    ) {
      setErrorMessage(
        isAr
          ? 'يرجى إدخال تفاصيل العنوان في قطر: رقم المنطقة والشارع ورقم المبنى/الفيلا.'
          : 'Please provide complete Qatar address details: Zone, Street, and Building numbers.'
      );
      return;
    }

    if (!agreedToPolicy) {
      setErrorMessage(
        isAr
          ? 'يجب الموافقة على الشروط وسياسة الخصوصية بموجب القرار الوزاري رقم 25 لسنة 2026 للمتابعة.'
          : 'You must agree to the Terms & Privacy Policy under Qatar Decision 25/2026 to proceed.'
      );
      return;
    }

    setIsProcessing(true);

    try {
      const orderId = `QA-${Math.floor(100000 + Math.random() * 900000)}`;

      // 1. Process payment through Qatar gateway simulator
      const paymentResult = await processPayment({
        method: paymentMethod,
        amountQAR: totals.total,
        orderId,
        fawranAlias: paymentMethod === 'fawran' ? fawranAlias : undefined,
      });

      if (!paymentResult.success) {
        throw new Error('Payment processing could not be completed.');
      }

      // 2. Create official order invoice
      const invoice = createOrderInvoice({
        orderId,
        customer: {
          name: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          zone: formData.zone,
          street: formData.street,
          building: formData.building,
          municipality: formData.municipality,
        },
        items: cart.map((i) => ({
          id: i.id,
          title: i.title[lang],
          priceQAR: i.priceQAR,
          quantity: i.quantity,
          size: i.size,
        })),
        paymentMethod,
        totals,
      });

      // 3. Persist order in local storage for order confirmation & tracking & admin
      try {
        const existingOrders = JSON.parse(localStorage.getItem('kandaka_orders') || '[]');
        existingOrders.unshift(invoice);
        localStorage.setItem('kandaka_orders', JSON.stringify(existingOrders));
      } catch {}

      // 4. Clear cart and navigate to official invoice
      clearCart();
      router.push(`/${lang}/orders/${orderId}`);
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred during payment.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blush-surface text-coral-warm mb-2 border border-peach-soft">
            <Lock className="w-3.5 h-3.5" />
            <span>{isAr ? 'دفع آمن ومشفر 100%' : '100% Encrypted Qatar Checkout'}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-cocoa-dark font-cairo">
            {dict.checkout.title}
          </h1>
          <p className="mt-1 text-xs text-cocoa-muted">
            {isAr
              ? 'إتمام الشراء السريع كزائرة مع إصدار فاتورة ضريبية رسمية.'
              : 'Guest checkout with official commercial invoice generation.'}
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white/80 rounded-3xl p-12 text-center border border-peach-soft max-w-md mx-auto space-y-4">
            <p className="text-sm font-bold text-cocoa-dark">{dict.common.emptyCart}</p>
            <Link href={`/${lang}/shop`}>
              <Button variant="primary">{dict.common.shopNow}</Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Delivery Address & Payment Method (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <AddressFormQatar
                formData={formData}
                onChange={setFormData}
                lang={lang}
              />

              <PaymentMethodSelector
                selectedMethod={paymentMethod}
                onChange={setPaymentMethod}
                fawranAlias={fawranAlias}
                onFawranAliasChange={setFawranAlias}
                lang={lang}
                allowCOD={formData.destination === 'qatar'}
              />
            </div>

            {/* Right Column: Order Summary, Cost Breakdown & Policy Consent (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <CostBreakdown
                totals={totals}
                currency={currency}
                lang={lang}
              />

              {/* Mandatory Policy Consent Checkbox (Qatar Decision No. 25 of 2026) */}
              <div className="bg-white/85 rounded-3xl p-6 border border-peach-soft shadow-sm space-y-4">
                <Checkbox
                  id="checkout-privacy-consent"
                  checked={agreedToPolicy}
                  onChange={(e) => setAgreedToPolicy(e.target.checked)}
                  label={
                    <span className="text-xs text-cocoa-dark font-medium leading-relaxed block">
                      {isAr ? (
                        <>
                          أقر بالموافقة على{' '}
                          <Link href={`/${lang}/policies/terms`} target="_blank" className="text-coral-warm font-bold underline">
                            الشروط والأحكام
                          </Link>{' '}
                          و{' '}
                          <Link href={`/${lang}/policies/privacy`} target="_blank" className="text-coral-warm font-bold underline">
                            سياسة الخصوصية
                          </Link>{' '}
                          وفقاً للقرار الوزاري لوزارة التجارة والصناعة بقطر رقم 25 لسنة 2026.
                        </>
                      ) : (
                        <>
                          I agree to the{' '}
                          <Link href={`/${lang}/policies/terms`} target="_blank" className="text-coral-warm font-bold underline">
                            Terms & Conditions
                          </Link>{' '}
                          and{' '}
                          <Link href={`/${lang}/policies/privacy`} target="_blank" className="text-coral-warm font-bold underline">
                            Privacy Policy
                          </Link>{' '}
                          under Qatar MOCI Ministerial Decision No. 25 of 2026.
                        </>
                      )}
                    </span>
                  }
                />

                {errorMessage && (
                  <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">
                    {errorMessage}
                  </p>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full font-bold shadow-warm"
                  isLoading={isProcessing}
                >
                  {isProcessing ? dict.checkout.processing : dict.checkout.placeOrder}
                </Button>

                <p className="text-[10px] text-cocoa-muted text-center flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>
                    {isAr
                      ? 'البيانات محمية بموجب قانون حماية البيانات الشخصية القطري'
                      : 'Protected under Qatar Personal Data Privacy Law'}
                  </span>
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
