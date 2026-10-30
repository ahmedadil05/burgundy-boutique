'use client';

import React from 'react';
import { PaymentMethod } from '../../lib/payment-gateway';
import { Language } from '../../lib/i18n';
import { CreditCard, Smartphone, Banknote, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Input } from '../ui/Input';

export interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
  fawranAlias: string;
  onFawranAliasChange: (alias: string) => void;
  lang?: Language;
  allowCOD?: boolean;
}

export function PaymentMethodSelector({
  selectedMethod,
  onChange,
  fawranAlias,
  onFawranAliasChange,
  lang = 'ar',
  allowCOD = true,
}: PaymentMethodSelectorProps) {
  const isAr = lang === 'ar';

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
      title: isAr ? 'خدمة فوران (Fawran)' : 'Fawran (Instant Mobile Pay)',
      description: isAr
        ? 'الدفع الفوري المعتمد من مصرف قطر المركزي عبر رقم الهاتف المسجل'
        : 'Qatar Central Bank instant account transfer using mobile alias',
      badge: isAr ? 'دفع فوري وآمن' : 'Instant QCB',
      icon: <Smartphone className="w-5 h-5 text-coral-warm" />,
    },
    {
      id: 'qpay',
      title: isAr ? 'بطاقة الخصم القطرية (QPay / NAPS)' : 'Qatar Debit (QPay / NAPS)',
      description: isAr
        ? 'بوابة الدفع الوطنية القطرية المباشرة لبطاقات الصراف الآلي'
        : 'National ATM/Debit card payment gateway via Qatar Central Bank',
      badge: isAr ? 'بوابة قطر الوطنية' : 'NAPS Certified',
      icon: <CreditCard className="w-5 h-5 text-emerald-600" />,
    },
    {
      id: 'card',
      title: isAr ? 'البطاقات الائتمانية (Visa / Mastercard)' : 'Credit Cards (Visa / Mastercard)',
      description: isAr
        ? 'دفع مشفر بحماية بنكية ثلاثية (3D Secure)'
        : 'Encrypted global credit and debit card processing',
      badge: isAr ? 'مشفر وآمن' : '3D Secure',
      icon: <CreditCard className="w-5 h-5 text-blue-600" />,
    },
    {
      id: 'cod',
      title: isAr ? 'الدفع عند الاستلام (COD)' : 'Cash on Delivery (COD)',
      description: isAr
        ? 'سداد نقدي مباشر لمندوب التوصيل عند فحص واستلام شحنتكِ داخل قطر'
        : 'Pay cash to the courier upon doorstep receipt in Qatar',
      badge: isAr ? 'داخل قطر فقط' : 'Qatar Only',
      icon: <Banknote className="w-5 h-5 text-amber-700" />,
      disabled: !allowCOD,
    },
  ];

  return (
    <div className="bg-white/85 rounded-3xl p-6 sm:p-8 border border-peach-soft shadow-sm space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-peach-soft">
        <h3 className="font-bold text-base text-cocoa-dark font-cairo flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-coral-warm" />
          <span>{isAr ? 'طريقة الدفع المعتمدة' : 'Payment Method'}</span>
        </h3>
        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
          {isAr ? 'بوابات قطرية مرخصة' : 'Licensed Qatar Rails'}
        </span>
      </div>

      <div className="space-y-3">
        {methods.map((m) => {
          const isSelected = selectedMethod === m.id;
          return (
            <div
              key={m.id}
              onClick={() => !m.disabled && onChange(m.id)}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                m.disabled
                  ? 'opacity-40 cursor-not-allowed bg-gray-50 border-gray-200'
                  : isSelected
                  ? 'border-coral-warm bg-blush-surface/40 shadow-sm'
                  : 'border-peach-soft/80 hover:border-peach-deep bg-white'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="mt-0.5">{m.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-cocoa-dark font-cairo">
                      {m.title}
                    </span>
                    <span className="text-[10px] font-bold text-coral-warm bg-cream px-2 py-0.5 rounded-md border border-peach-soft">
                      {m.badge}
                    </span>
                  </div>
                  <p className="text-xs text-cocoa-muted mt-0.5 leading-relaxed">
                    {m.description}
                  </p>

                  {/* Active Sub-inputs for Fawran / Card simulation */}
                  {isSelected && m.id === 'fawran' && (
                    <div className="mt-3 pt-3 border-t border-peach-soft/60 animate-fadeIn space-y-2">
                      <Input
                        label={isAr ? 'الاسم المستعار أو رقم الجوال في فوران (Fawran Alias) *' : 'Fawran Mobile Number / Alias *'}
                        placeholder="e.g. 55000000"
                        value={fawranAlias}
                        onChange={(e) => onFawranAliasChange(e.target.value)}
                        helperText={isAr ? 'ستصلكِ رسالة تأكيد فورية للموافقة على الدفع' : 'Instant QCB payment approval prompt will be triggered'}
                      />
                    </div>
                  )}

                  {isSelected && (m.id === 'card' || m.id === 'qpay') && (
                    <div className="mt-3 pt-3 border-t border-peach-soft/60 animate-fadeIn text-[11px] text-cocoa-muted flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>
                        {isAr
                          ? 'بوابة دفع محاكاة تجريبية مدمجة (جاهزة للربط مع SkipCash / Tap / QPay)'
                          : 'Integrated Qatar sandbox simulator (ready for SkipCash / Tap / QPay)'}
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
