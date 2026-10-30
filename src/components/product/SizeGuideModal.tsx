'use client';

import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Language } from '../../lib/i18n';
import { Ruler, Sparkles, Check } from 'lucide-react';

export interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: Language;
}

export function SizeGuideModal({
  isOpen,
  onClose,
  lang = 'ar',
}: SizeGuideModalProps) {
  const [unit, setUnit] = useState<'cm' | 'inch'>('cm');
  const isAr = lang === 'ar';

  const jalabiyaSizes = [
    { size: 'S (38)', bustCm: '94-98', waistCm: '88-92', lengthCm: '142', bustIn: '37-38.5', waistIn: '34.5-36', lengthIn: '56' },
    { size: 'M (40)', bustCm: '99-104', waistCm: '93-98', lengthCm: '144', bustIn: '39-41', waistIn: '36.5-38.5', lengthIn: '56.5' },
    { size: 'L (42)', bustCm: '105-110', waistCm: '99-106', lengthCm: '146', bustIn: '41.5-43', waistIn: '39-41.5', lengthIn: '57.5' },
    { size: 'XL (44)', bustCm: '111-118', waistCm: '107-114', lengthCm: '148', bustIn: '43.5-46.5', waistIn: '42-45', lengthIn: '58' },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isAr ? 'دليل المقاسات — بوتيك كنداكة' : 'Size Guide — Kandaka Boutique'}
      maxWidth="lg"
    >
      <div className="space-y-6 text-xs text-cocoa-dark">
        {/* Unit Selector */}
        <div className="flex items-center justify-between bg-blush-surface p-2.5 rounded-2xl border border-peach-soft">
          <span className="font-semibold text-cocoa-dark flex items-center gap-1.5">
            <Ruler className="w-4 h-4 text-coral-warm" />
            <span>{isAr ? 'وحدة القياس المعتمدة:' : 'Measurement Unit:'}</span>
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 rounded-xl font-bold transition-all ${
                unit === 'cm'
                  ? 'bg-coral-warm text-white shadow-sm'
                  : 'text-cocoa-muted hover:text-cocoa-dark'
              }`}
            >
              {isAr ? 'سنتيمتر (cm)' : 'Centimeters (cm)'}
            </button>
            <button
              onClick={() => setUnit('inch')}
              className={`px-3 py-1 rounded-xl font-bold transition-all ${
                unit === 'inch'
                  ? 'bg-coral-warm text-white shadow-sm'
                  : 'text-cocoa-muted hover:text-cocoa-dark'
              }`}
            >
              {isAr ? 'بوصة (inch)' : 'Inches (in)'}
            </button>
          </div>
        </div>

        {/* Section 1: The Sudanese Toub */}
        <div className="p-4 rounded-2xl bg-white border border-peach-soft shadow-sm space-y-2">
          <h4 className="font-bold text-sm text-cocoa-dark flex items-center gap-1.5 font-cairo">
            <Sparkles className="w-4 h-4 text-[#CBA05C]" />
            <span>{isAr ? '١. مقاسات الثوب السوداني (المقاس الموحد)' : '1. Sudanese Toub Specifications (Free Size)'}</span>
          </h4>
          <p className="text-cocoa-muted leading-relaxed">
            {isAr
              ? 'تُصنع جميع الثياب السودانية الأصيلة في متجر كنداكة بالمقاس التراثي القياسي المعتمد عالمياً:'
              : 'All authentic Sudanese toubs in our boutique adhere to the timeless royal standard:'}
          </p>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-cream p-2.5 rounded-xl border border-peach-soft text-center">
              <span className="block text-[11px] text-cocoa-muted">{isAr ? 'الطول الإجمالي للثوب' : 'Total Fabric Length'}</span>
              <strong className="text-sm font-extrabold text-coral-warm">
                {unit === 'cm' ? '4.5 أمتار (450 cm)' : '4.5 Meters (~177 in)'}
              </strong>
            </div>
            <div className="bg-cream p-2.5 rounded-xl border border-peach-soft text-center">
              <span className="block text-[11px] text-cocoa-muted">{isAr ? 'عرض القماش (العرضان)' : 'Fabric Width'}</span>
              <strong className="text-sm font-extrabold text-coral-warm">
                {unit === 'cm' ? '110 - 115 cm' : '43 - 45 in'}
              </strong>
            </div>
          </div>
          <p className="text-[11px] text-cocoa-muted pt-1">
            {isAr
              ? '✓ يناسب كافة الأطوال والأحجام بفضل طريقة اللف الانسيابية الكلاسيكية.'
              : '✓ Comfortably fits all heights and sizes through standard traditional wrapping.'}
          </p>
        </div>

        {/* Section 2: Jalabiyas & Daraas Table */}
        <div className="space-y-2">
          <h4 className="font-bold text-sm text-cocoa-dark font-cairo">
            {isAr ? '٢. جدول مقاسات الجلابيات والدراعات والفساتين' : '2. Jalabiyas, Dara’as & Dresses Size Chart'}
          </h4>
          <div className="overflow-x-auto rounded-2xl border border-peach-soft">
            <table className="w-full text-center border-collapse text-xs">
              <thead>
                <tr className="bg-blush-surface font-bold text-cocoa-dark">
                  <th className="p-2.5 border-b border-peach-soft">{isAr ? 'المقاس' : 'Size'}</th>
                  <th className="p-2.5 border-b border-peach-soft">{isAr ? 'محيط الصدر' : 'Bust'}</th>
                  <th className="p-2.5 border-b border-peach-soft">{isAr ? 'محيط الخصر' : 'Waist'}</th>
                  <th className="p-2.5 border-b border-peach-soft">{isAr ? 'الطول الكامل' : 'Length'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-peach-soft/50 bg-white">
                {jalabiyaSizes.map((row, i) => (
                  <tr key={i} className="hover:bg-cream transition-colors">
                    <td className="p-2 font-bold text-coral-warm">{row.size}</td>
                    <td className="p-2">{unit === 'cm' ? `${row.bustCm} cm` : `${row.bustIn} in`}</td>
                    <td className="p-2">{unit === 'cm' ? `${row.waistCm} cm` : `${row.waistIn} in`}</td>
                    <td className="p-2">{unit === 'cm' ? `${row.lengthCm} cm` : `${row.lengthIn} in`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sizing Assistance */}
        <div className="p-3 bg-cream rounded-2xl border border-peach-soft flex items-center justify-between gap-3 text-xs">
          <span>
            {isAr
              ? 'لستِ متأكدة من مقاسكِ؟ خبيرات الأناقة لدينا يقدمن استشارة مجانية عبر واتساب.'
              : 'Unsure about sizing? Our stylists provide direct assistance on WhatsApp.'}
          </span>
          <span className="font-bold text-coral-warm shrink-0 flex items-center gap-1">
            <Check className="w-3.5 h-3.5" /> {isAr ? 'استشارة فورية' : 'Live Advice'}
          </span>
        </div>
      </div>
    </Modal>
  );
}
