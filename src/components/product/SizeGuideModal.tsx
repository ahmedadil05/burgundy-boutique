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
      title={isAr ? 'دليل المقاسات والقياسات — دار بيرغندي' : 'Size Guide & Draping — BURGUNDY Atelier'}
      maxWidth="lg"
    >
      <div className="space-y-6 text-xs text-slateText-body">
        {/* Unit Selector */}
        <div className="flex items-center justify-between bg-canvas-warm/50 p-2.5 rounded-2xl border border-gold-hairline">
          <span className="font-semibold text-burgundy flex items-center gap-1.5">
            <Ruler className="w-4 h-4 text-gold-line" />
            <span>{isAr ? 'وحدة القياس المعتمدة:' : 'Measurement Unit:'}</span>
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 rounded-xl font-bold transition-all ${
                unit === 'cm'
                  ? 'bg-burgundy text-white shadow-sm'
                  : 'text-slateText-secondary hover:text-burgundy'
              }`}
            >
              {isAr ? 'سنتيمتر (cm)' : 'Centimeters (cm)'}
            </button>
            <button
              onClick={() => setUnit('inch')}
              className={`px-3 py-1 rounded-xl font-bold transition-all ${
                unit === 'inch'
                  ? 'bg-burgundy text-white shadow-sm'
                  : 'text-slateText-secondary hover:text-burgundy'
              }`}
            >
              {isAr ? 'بوصة (inch)' : 'Inches (in)'}
            </button>
          </div>
        </div>

        {/* Section 1: The Sudanese Toub */}
        <div className="p-4 rounded-2xl bg-white border border-gold-hairline shadow-sm space-y-2">
          <h4 className="font-bold text-sm text-burgundy flex items-center gap-1.5 font-display">
            <Sparkles className="w-4 h-4 text-gold-line" />
            <span>{isAr ? '١. مواصفات الثوب السوداني (المقاس الحر الملكي)' : '1. Sudanese Toub Specifications (Royal Free Size)'}</span>
          </h4>
          <p className="text-slateText-secondary leading-relaxed">
            {isAr
              ? 'تُصنع جميع الثياب السودانية الأصيلة في دار بيرغندي بالمقاس التراثي القياسي المعتمد (4.5 متر):'
              : 'All authentic Sudanese toubs in our atelier adhere to the standard 4.5m royal drape canvas:'}
          </p>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-canvas-warm/40 p-2.5 rounded-xl border border-gold-hairline text-center">
              <span className="block text-[11px] text-slateText-secondary">{isAr ? 'الطول الإجمالي للثوب' : 'Total Fabric Length'}</span>
              <strong className="text-sm font-extrabold text-burgundy font-body tabular-nums">
                {unit === 'cm' ? '4.5 أمتار (450 cm)' : '4.5 Meters (~177 in)'}
              </strong>
            </div>
            <div className="bg-canvas-warm/40 p-2.5 rounded-xl border border-gold-hairline text-center">
              <span className="block text-[11px] text-slateText-secondary">{isAr ? 'عرض القماش (العرضان)' : 'Fabric Width'}</span>
              <strong className="text-sm font-extrabold text-burgundy font-body tabular-nums">
                {unit === 'cm' ? '110 - 115 cm' : '43 - 45 in'}
              </strong>
            </div>
          </div>
          <p className="text-[11px] text-slateText-secondary pt-1 flex items-start gap-1.5">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
            <span>
              {isAr
                ? 'يناسب كافة الأطوال والأحجام بفضل طريقة اللف الانسيابية الكلاسيكية.'
                : 'Comfortably fits all heights and silhouettes through classic traditional wrapping.'}
            </span>
          </p>
        </div>

        {/* Section 2: Jalabiyas & Daraas Table */}
        <div className="space-y-2">
          <h4 className="font-bold text-sm text-burgundy font-display">
            {isAr ? '٢. جدول مقاسات الجلابيات والدراعات والفساتين' : '2. Jalabiyas, Dara’as & Dresses Size Chart'}
          </h4>
          <div className="overflow-x-auto rounded-2xl border border-gold-hairline">
            <table className="w-full text-center border-collapse text-xs">
              <thead>
                <tr className="bg-canvas-warm/50 font-bold text-burgundy">
                  <th className="p-2.5 border-b border-gold-hairline">{isAr ? 'المقاس' : 'Size'}</th>
                  <th className="p-2.5 border-b border-gold-hairline">{isAr ? 'محيط الصدر' : 'Bust'}</th>
                  <th className="p-2.5 border-b border-gold-hairline">{isAr ? 'محيط الخصر' : 'Waist'}</th>
                  <th className="p-2.5 border-b border-gold-hairline">{isAr ? 'الطول الكامل' : 'Length'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold-hairline/60 bg-white">
                {jalabiyaSizes.map((row, i) => (
                  <tr key={i} className="hover:bg-canvas transition-colors">
                    <td className="p-2 font-bold text-burgundy">{row.size}</td>
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
        <div className="p-3 bg-canvas-warm/40 rounded-2xl border border-gold-hairline flex items-center justify-between gap-3 text-xs">
          <span className="text-slateText-secondary">
            {isAr
              ? 'لستِ متأكدة من مقاسكِ؟ خبيرات الأناقة لدينا يقدمن استشارة مجانية عبر واتساب.'
              : 'Unsure about sizing? Our stylists provide direct assistance on WhatsApp.'}
          </span>
          <span className="font-bold text-burgundy shrink-0 flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-emerald-600" /> {isAr ? 'استشارة فورية' : 'Live Advice'}
          </span>
        </div>
      </div>
    </Modal>
  );
}
