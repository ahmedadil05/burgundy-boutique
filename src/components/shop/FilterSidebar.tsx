'use client';

import React from 'react';
import { Language } from '../../lib/i18n';
import { Filter, RotateCcw, Check } from 'lucide-react';

export interface FilterSidebarProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedFabric: string;
  onSelectFabric: (fab: string) => void;
  selectedPriceRange: string;
  onSelectPriceRange: (range: string) => void;
  inStockOnly: boolean;
  onToggleInStock: (val: boolean) => void;
  onResetFilters: () => void;
  lang?: Language;
  totalCount: number;
}

export function FilterSidebar({
  selectedCategory,
  onSelectCategory,
  selectedFabric,
  onSelectFabric,
  selectedPriceRange,
  onSelectPriceRange,
  inStockOnly,
  onToggleInStock,
  onResetFilters,
  lang = 'ar',
  totalCount,
}: FilterSidebarProps) {
  const isAr = lang === 'ar';

  const categories = [
    { id: 'all', label: isAr ? 'جميع التصاميم' : 'All Collections' },
    { id: 'toubs', label: isAr ? 'ثياب سودانية (Toubs)' : 'Sudanese Toubs' },
    { id: 'jalabiyas', label: isAr ? 'جلابيات راقية (Jalabiyas)' : 'Luxury Jalabiyas' },
    { id: 'daraas', label: isAr ? 'دراعات وعبايات' : 'Dara’as & Abayas' },
    { id: 'dresses', label: isAr ? 'فساتين عصرية' : 'Modern Dresses' },
    { id: 'accessories', label: isAr ? 'شيلان وإكسسوارات' : 'Scarves & Accessories' },
  ];

  const fabrics = [
    { id: 'all', label: isAr ? 'كافة الأقمشة' : 'All Fabrics' },
    { id: 'فوال', label: isAr ? 'فوال سويسري قطن' : 'Swiss Cotton Voile' },
    { id: 'حرير', label: isAr ? 'حرير طبيعي وجاكار' : 'Pure Silk & Jacquard' },
    { id: 'كتان', label: isAr ? 'كتان الجزيرة البارد' : 'Natural Linen' },
  ];

  const priceRanges = [
    { id: 'all', label: isAr ? 'جميع الأسعار' : 'All Prices' },
    { id: 'under-800', label: isAr ? 'أقل من 800 ر.ق' : 'Under 800 QAR' },
    { id: '800-1400', label: isAr ? '800 - 1,400 ر.ق' : '800 - 1,400 QAR' },
    { id: 'above-1400', label: isAr ? 'أكثر من 1,400 ر.ق' : 'Above 1,400 QAR' },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 border border-gold-hairline shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-gold-hairline">
        <span className="flex items-center gap-2 text-sm font-bold text-burgundy font-cairo">
          <Filter className="w-4 h-4 text-gold-line" />
          <span>{isAr ? 'تصفية المنتجات' : 'Filter Catalog'}</span>
        </span>
        <button
          onClick={onResetFilters}
          className="text-xs text-slateText-secondary hover:text-burgundy flex items-center gap-1 font-semibold transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>{isAr ? 'إعادة ضبط' : 'Reset'}</span>
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-bold text-burgundy font-cairo uppercase tracking-wider">
          {isAr ? 'التصنيف' : 'Category'}
        </h4>
        <div className="space-y-1">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => onSelectCategory(c.id)}
              className={`w-full text-start px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                selectedCategory === c.id
                  ? 'bg-burgundy text-white shadow-sm'
                  : 'text-slateText-body hover:text-burgundy hover:bg-canvas-warm/50'
              }`}
            >
              <span>{c.label}</span>
              {selectedCategory === c.id && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* Fabric */}
      <div className="space-y-2.5 pt-3 border-t border-gold-hairline/60">
        <h4 className="text-xs font-bold text-burgundy font-cairo uppercase tracking-wider">
          {isAr ? 'نوع القماش' : 'Fabric Type'}
        </h4>
        <div className="space-y-1">
          {fabrics.map((f) => (
            <button
              key={f.id}
              onClick={() => onSelectFabric(f.id)}
              className={`w-full text-start px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                selectedFabric === f.id
                  ? 'bg-burgundy text-white shadow-sm'
                  : 'text-slateText-body hover:text-burgundy hover:bg-canvas-warm/50'
              }`}
            >
              <span>{f.label}</span>
              {selectedFabric === f.id && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-2.5 pt-3 border-t border-gold-hairline/60">
        <h4 className="text-xs font-bold text-burgundy font-cairo uppercase tracking-wider">
          {isAr ? 'نطاق السعر (ر.ق)' : 'Price Range (QAR)'}
        </h4>
        <div className="space-y-1">
          {priceRanges.map((pr) => (
            <button
              key={pr.id}
              onClick={() => onSelectPriceRange(pr.id)}
              className={`w-full text-start px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                selectedPriceRange === pr.id
                  ? 'bg-burgundy text-white shadow-sm'
                  : 'text-slateText-body hover:text-burgundy hover:bg-canvas-warm/50'
              }`}
            >
              <span>{pr.label}</span>
              {selectedPriceRange === pr.id && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* In-Stock Only */}
      <div className="pt-3 border-t border-gold-hairline/60">
        <label className="flex items-center gap-2.5 text-xs text-slateText-body font-semibold cursor-pointer select-none">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onToggleInStock(e.target.checked)}
            className="w-4 h-4 text-burgundy rounded border-gold-hairline focus:ring-burgundy accent-burgundy"
          />
          <span>{isAr ? 'القطع المتوفرة فورياً فقط' : 'In Stock Only'}</span>
        </label>
      </div>

      {/* Result Count Indicator */}
      <div className="pt-2 text-center text-xs text-slateText-secondary border-t border-gold-hairline/40">
        <span>
          {isAr
            ? `عرض ${totalCount} من القطع المختارة`
            : `Showing ${totalCount} handcrafted items`}
        </span>
      </div>
    </div>
  );
}
