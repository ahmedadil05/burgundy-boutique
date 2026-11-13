'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useStore } from '@/lib/store';
import { useStoreSettings } from '@/lib/settings-store';
import { useCRM } from '@/lib/crm-store';
import { calculateCheckoutTotals, createOrderInvoice } from '@/lib/order-utils';
import { processPayment, PaymentMethod } from '@/lib/payment-gateway';
import { AddressFormQatar, AddressFormData } from '@/components/checkout/AddressFormQatar';
import { PaymentMethodSelector } from '@/components/checkout/PaymentMethodSelector';
import { CostBreakdown } from '@/components/checkout/CostBreakdown';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { Language, getDictionary } from '@/lib/i18n';
import { ShieldCheck, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const params = useParams();
  const lang = (params?.lang === 'en' ? 'en' : 'ar') as Language;
  const isAr = lang === 'ar';
  const dict = getDictionary(lang);
  const router = useRouter();

  const { cart, cartTotalQAR, clearCart } = useStore();
  const { settings } = useStoreSettings();
  const { addLead } = useCRM();

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
  const [receiptImage, setReceiptImage] = useState<string>('');
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const taxRate = settings.taxEnabled ? settings.taxRatePercent : 0;
  const totals = calculateCheckoutTotals(cartTotalQAR, formData.destination, taxRate);

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

    if (paymentMethod === 'bank_transfer' && !receiptImage) {
      setErrorMessage(
        isAr
          ? 'يرجى رفع صورة إشعار التحويل البنكي لتأكيد الطلب.'
          : 'Please upload your bank transfer receipt slip to confirm the order.'
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

      // 1. Process payment via swappable gateway adapter
      const paymentResult = await processPayment({
        method: paymentMethod,
        amountQAR: totals.total,
        orderId,
        receiptImageUrl: receiptImage,
        fawranAlias: paymentMethod === 'fawran' ? fawranAlias : undefined,
      });

      if (!paymentResult.success) {
        throw new Error('Payment processing could not be completed.');
      }

      // 2. Create the order in the server-side 3NF store (single source of truth
      //    for order numbers — customers need the BUR-2026-XXXX number to track).
      let serverOrderNumber = orderId;
      try {
        const apiRes = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer: {
              name: formData.fullName,
              phone: formData.phone,
              email: formData.email,
              municipality: formData.municipality,
              addressLine: `${formData.municipality}, Zone ${formData.zone}, Street ${formData.street}, Building ${formData.building}`,
            },
            items: cart.map((i) => ({
              productId: i.id,
              quantity: i.quantity,
              sizeCode: i.size,
              title: i.title[lang],
              unitPriceQAR: i.priceQAR,
            })),
            paymentMethod,
            receiptImageUrl: receiptImage,
            notes: formData.notes,
          }),
        });
        const apiJson = await apiRes.json();
        if (apiRes.ok && apiJson?.orderNumber) {
          serverOrderNumber = apiJson.orderNumber;
        } else {
          console.error('Server order creation failed:', apiJson?.error || apiRes.status);
        }
      } catch (apiErr) {
        console.error('Server order sync failed; invoice keeps local reference', apiErr);
      }

      // 3. Create official order invoice with the server order number (when available)
      const invoice = createOrderInvoice({
        orderId: serverOrderNumber,
        customer: {
          name: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          zone: formData.zone,
          street: formData.street,
          building: formData.building,
          municipality: formData.municipality,
          notes: formData.notes,
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
        receiptImageUrl: receiptImage,
      });

      // 4. Persist order in local storage for order confirmation & admin
      try {
        const existingOrders = JSON.parse(localStorage.getItem('burgundy_orders') || '[]');
        existingOrders.unshift(invoice);
        localStorage.setItem('burgundy_orders', JSON.stringify(existingOrders));
        // Also keep fallback key for backward compatibility
        localStorage.setItem('kandaka_orders', JSON.stringify(existingOrders));
      } catch {}

      // 4. Save lead in CRM automatically
      try {
        addLead({
          type: 'general_contact',
          name: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          details: `Order ${serverOrderNumber} placed for ${totals.total} QAR via ${paymentMethod}`,
        });
      } catch {}

      // 5. Clear cart and navigate to official order invoice
      clearCart();
      router.push(`/${lang}/orders/${serverOrderNumber}`);
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred during payment.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-canvas py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white text-burgundy border border-gold-hairline shadow-soft">
            <Lock className="w-3.5 h-3.5 text-gold-line" />
            <span>{isAr ? 'دفع آمن ومشفر 100%' : '100% Encrypted Qatar Checkout'}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-burgundy font-display">
            {dict.checkout.title}
          </h1>
          <p className="text-xs text-slateText-secondary">
            {isAr
              ? 'شراء مباشر كضيف دون الحاجة لإنشاء حساب | متوافق مع قرار وزارة التجارة والصناعة رقم 25 لسنة 2026'
              : 'Guest checkout with zero registration required | Qatar MOCI Compliant'}
          </p>
        </div>

        {errorMessage && (
          <div className="max-w-xl mx-auto p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Contact, Address, and Payment Method (Cols 7) */}
          <div className="lg:col-span-7 space-y-6">
            <AddressFormQatar
              formData={formData}
              onChange={(data) => setFormData(data)}
              lang={lang}
            />

            <PaymentMethodSelector
              selectedMethod={paymentMethod}
              onChange={(method) => setPaymentMethod(method)}
              fawranAlias={fawranAlias}
              onFawranAliasChange={(alias) => setFawranAlias(alias)}
              receiptImage={receiptImage}
              onReceiptImageChange={(img) => setReceiptImage(img)}
              lang={lang}
              totalQAR={totals.total}
            />
          </div>

          {/* Right: Order Summary & Review (Cols 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gold-hairline shadow-soft space-y-4">
              <h3 className="font-bold text-sm text-burgundy font-display border-b border-gold-hairline/60 pb-3">
                {isAr ? 'ملخص المنتجات في الحقيبة' : 'Items Summary'} ({cart.length})
              </h3>

              <div className="space-y-3 max-h-60 overflow-y-auto divide-y divide-gold-hairline/40">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="pt-2 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slateText-body">{item.title[lang]}</p>
                      <p className="text-[11px] text-slateText-secondary">
                        {item.size} • {isAr ? 'الكمية:' : 'Qty:'} {item.quantity}
                      </p>
                    </div>
                    <span className="font-body tabular-nums font-semibold text-burgundy">
                      {item.priceQAR * item.quantity} QAR
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost breakdown */}
              <CostBreakdown totals={totals} lang={lang} />

              {/* Qatar MOCI Mandatory Consumer Agreement */}
              <div className="pt-4 border-t border-gold-hairline/60">
                <Checkbox
                  id="checkout-policy-agreement"
                  label={dict.checkout.privacyConsent}
                  checked={agreedToPolicy}
                  onChange={(e) => setAgreedToPolicy(e.target.checked)}
                  required
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full bg-burgundy hover:bg-burgundy-hover text-white shadow-luxury text-sm tracking-wider uppercase font-bold py-3.5"
                disabled={isProcessing}
              >
                {isProcessing ? dict.checkout.processing : dict.checkout.placeOrder}
              </Button>

              <div className="pt-2 text-center text-[10px] text-slateText-secondary flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-line" />
                <span>{isAr ? 'معاملتك محمية ومشفرة وفق أعلى معايير الأمان المصرفي' : 'Bank-grade SSL Encrypted Transaction'}</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
