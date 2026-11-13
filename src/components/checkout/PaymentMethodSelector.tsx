'use client';

import React, { useRef } from 'react';
import { PaymentMethod } from '../../lib/payment-gateway';
import { Language } from '../../lib/i18n';
import { CreditCard, Smartphone, ShieldCheck, CheckCircle2, Building2, Upload, FileCheck } from 'lucide-react';
import { Input } from '../ui/Input';

export interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
  fawranAlias: string;
  onFawranAliasChange: (alias: string) => void;
  receiptImage?: string;
  onReceiptImageChange?: (base64Url: string) => void;
  lang?: Language;
  /** Optional grand total to make the payment context explicit before placing the order. */
  totalQAR?: number;
}

export function PaymentMethodSelector({
  selectedMethod,
  onChange,
  fawranAlias,
  onFawranAliasChange,
  receiptImage,
  onReceiptImageChange,
  lang = 'ar',
  totalQAR,
}: PaymentMethodSelectorProps) {
  const isAr = lang === 'ar';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onReceiptImageChange) {
      const reader = new FileReader();
      reader.onload = () => {
        onReceiptImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const methods: Array<{
    id: PaymentMethod;
    title: string;
    description: string;
    badge: string;
    icon: React.ReactNode;
    disabled?: boolean;
  }> = [
    {
      id: 'fawran',
      title: isAr ? 'خدمة فوران للدفع الفوري (QCB Fawran)' : 'Fawran Instant Mobile Pay (QCB)',
      description: isAr
        ? 'تحويل فوري فوري من حسابكِ البنكي عبر رقم الجوال المعتمد لدى مصرف قطر المركزي'
        : 'Qatar Central Bank instant 24/7 account-to-account transfer via mobile alias',
      badge: isAr ? 'فوري 24/7' : 'Instant QCB',
      icon: <Smartphone className="w-5 h-5 text-burgundy" />,
    },
    {
      id: 'qpay',
      title: isAr ? 'بطاقة الخصم القطرية (QPay / NAPS)' : 'Qatar Debit (QPay / NAPS)',
      description: isAr
        ? 'بوابة الخصم المباشر لبطاقات الصراف الآلي لجميع البنوك القطرية'
        : 'Direct domestic debit card gateway certified by Qatar Central Bank',
      badge: isAr ? 'بوابة قطر الوطنية' : 'NAPS Certified',
      icon: <CreditCard className="w-5 h-5 text-burgundy" />,
    },
    {
      id: 'card',
      title: isAr ? 'البطاقات البنكية (Visa / Mastercard)' : 'Credit / Debit Cards (Visa / Mastercard)',
      description: isAr
        ? 'سداد آمن ومشفر عبر بوابة قطرية معتمدة (3D Secure)'
        : 'Encrypted payment gateway with bank-grade 3D Secure verification',
      badge: isAr ? 'مشفر وآمن' : '3D Secure',
      icon: <CreditCard className="w-5 h-5 text-burgundy" />,
    },
    {
      id: 'bank_transfer',
      title: isAr ? 'تحويل بنكي مباشر (مع رفع الإشعار)' : 'Direct Bank Wire (Upload Receipt)',
      description: isAr
        ? 'التحويل المباشر لحساب مؤسسة بيرغندي البنكي في الدوحة ورفع صورة إشعار التحويل'
        : 'Direct transfer to BURGUNDY official Qatari IBAN with proof of receipt upload',
      badge: isAr ? 'تحويل بنكي' : 'Bank Wire',
      icon: <Building2 className="w-5 h-5 text-gold-ink" />,
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gold-hairline shadow-soft space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-gold-hairline">
        <h3 className="font-bold text-base text-burgundy font-display flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-gold-line" />
          <span>{isAr ? 'وسيلة الدفع المعتمدة' : 'Payment Rail Selection'}</span>
        </h3>
        <span className="text-[10px] font-bold text-burgundy bg-surface-peachSoft/50 px-2.5 py-1 rounded-full border border-gold-hairline whitespace-nowrap tabular-nums">
          {isAr ? 'الإجمالي:' : 'Total:'} {typeof totalQAR === 'number' ? `${totalQAR} ${isAr ? 'ر.ق' : 'QAR'}` : (isAr ? 'بوابات قطرية متوافقة' : 'Qatar Compliant Rails')}
        </span>
      </div>

      <div className="space-y-3" role="radiogroup" aria-label={isAr ? 'وسيلة الدفع' : 'Payment method'}>
        {methods.map((m) => {
          const isSelected = selectedMethod === m.id;
          return (
            <div
              key={m.id}
              role="radio"
              aria-checked={isSelected}
              aria-disabled={m.disabled || undefined}
              tabIndex={m.disabled ? -1 : 0}
              onClick={() => !m.disabled && onChange(m.id)}
              onKeyDown={(e) => {
                if (m.disabled) return;
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  onChange(m.id);
                }
              }}
              className={`p-4 rounded-xl border transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${
                m.disabled
                  ? 'opacity-40 cursor-not-allowed bg-gray-50 border-gray-200'
                  : isSelected
                  ? 'border-burgundy bg-surface-peachSoft/20 shadow-sm ring-1 ring-burgundy/30'
                  : 'border-gold-hairline/60 hover:border-burgundy/40 bg-white'
              }`}
            >
              <div className="flex items-start gap-3.5">
                {/* Radio indicator */}
                <span
                  aria-hidden="true"
                  className={`mt-1 inline-flex w-5 h-5 rounded-full border-2 items-center justify-center shrink-0 transition-colors ${
                    isSelected ? 'border-burgundy bg-burgundy' : 'border-gold-hairline bg-white'
                  }`}
                >
                  {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                </span>
                <div className="mt-0.5">{m.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[13.5px] leading-snug text-slateText-body font-display">
                      {m.title}
                    </span>
                    <span className="text-[10px] font-bold text-burgundy bg-surface-peachSoft/50 px-2 py-0.5 rounded-md border border-gold-hairline">
                      {m.badge}
                    </span>
                  </div>
                  <p className="text-[11.5px] text-slateText-secondary mt-0.5 leading-relaxed">
                    {m.description}
                  </p>

                  {/* Active Sub-inputs for Fawran */}
                  {isSelected && m.id === 'fawran' && (
                    <div className="mt-3 pt-3 border-t border-gold-hairline/60 animate-fadeIn space-y-2" onKeyDown={(e) => e.stopPropagation()}>
                      <Input
                        label={isAr ? 'الاسم المستعار أو رقم الجوال في فوران (Fawran Alias) *' : 'Fawran Mobile Number / Alias *'}
                        placeholder="e.g. 50000974"
                        value={fawranAlias}
                        onChange={(e) => onFawranAliasChange(e.target.value)}
                        helperText={isAr ? 'ستصلكِ رسالة تأكيد فورية للموافقة على الدفع من تطبيق البنك' : 'Instant QCB mobile prompt will be initiated'}
                      />
                    </div>
                  )}

                  {/* Bank Transfer Details & Receipt Upload */}
                  {isSelected && m.id === 'bank_transfer' && (
                    <div className="mt-3 pt-3 border-t border-gold-hairline/60 animate-fadeIn space-y-3 bg-canvas-warm/40 p-3.5 rounded-xl border border-gold-hairline" onKeyDown={(e) => e.stopPropagation()}>
                      <div className="text-xs space-y-1 text-slateText-body">
                        <p className="font-bold text-burgundy">
                          {isAr ? 'بيانات الحساب البنكي لمؤسسة بيرغندي:' : 'Official Qatari Bank Details:'}
                        </p>
                        <p><strong>البنك / Bank:</strong> Qatar National Bank (QNB)</p>
                        <p><strong>الاسم / Beneficiary:</strong> BURGUNDY Fashion Establishment</p>
                        <p className="font-mono text-[11px] text-burgundy">
                          <strong>IBAN:</strong> QA23QNBA000000001234567890123
                        </p>
                      </div>

                      <div className="pt-2">
                        <label className="block text-xs font-semibold text-slateText-body mb-1.5">
                          {isAr ? 'رفع إشعار أو إيصال التحويل (صورة) *' : 'Upload Proof of Payment Slip *'}
                        </label>
                        <input
                          type="file"
                          ref={fileInputRef}
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />

                        {receiptImage ? (
                          <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                            <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span className="font-medium truncate">{isAr ? 'تم إرفاق صورة الإيصال بنجاح' : 'Receipt voucher attached'}</span>
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="text-xs text-burgundy underline ms-auto font-bold"
                            >
                              {isAr ? 'تغيير' : 'Change'}
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full py-2.5 px-4 rounded-xl border border-dashed border-burgundy/60 hover:bg-surface-peachSoft/30 text-burgundy text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                          >
                            <Upload className="w-4 h-4" />
                            <span>{isAr ? 'اختيار صورة الإيصال من الجوال' : 'Select Receipt Screenshot'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Card & QPay Gateway disclaimer */}
                  {isSelected && (m.id === 'card' || m.id === 'qpay') && (
                    <div className="mt-3 pt-3 border-t border-gold-hairline/60 animate-fadeIn text-[11px] text-slateText-secondary flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>
                        {isAr
                          ? 'بوابة دفع قطرية مشفرة (SkipCash / MyFatoorah / QPay NAPS)'
                          : 'Hosted secure gateway adapter (SkipCash / MyFatoorah / QPay)'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
