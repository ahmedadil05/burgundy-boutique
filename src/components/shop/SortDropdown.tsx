'use client';

import React from 'react';
import { Language } from '../../lib/i18n';
import { ArrowDownUp } from 'lucide-react';

export interface SortDropdownProps {
  value: string;
  onChange: (val: any) => void;
  lang?: Language;
}

export function SortDropdown({
  value,
  onChange,
  lang = 'ar',
}: SortDropdownProps) {
  const isAr = lang === 'ar';

  return (
    <div className="flex items-center gap-2 text-xs font-semibold text-cocoa-dark bg-white/80 border border-peach-soft rounded-2xl px-3 py-2 shadow-sm">
      <ArrowDownUp className="w-3.5 h-3.5 text-coral-warm shrink-0" />
      <span className="text-cocoa-muted">{isAr ? 'الترتيب حسب:' : 'Sort by:'}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent focus:outline-none cursor-pointer font-bold text-cocoa-dark"
      >
        <option value="featured">{isAr ? 'المختارات المميزة' : 'Featured'}</option>
        <option value="newest">{isAr ? 'الأحدث وصولاً' : 'Newest'}</option>
        <option value="price-asc">{isAr ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}</option>
        <option value="price-desc">{isAr ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}</option>
      </select>
    </div>
  );
}
