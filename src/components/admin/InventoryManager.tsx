'use client';

import React, { useState } from 'react';
import { Product } from '../../data/products';
import { Language } from '../../lib/i18n';
import { formatPrice } from '../../lib/currency';
import { Layers, Plus, Minus, Save, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

export function InventoryManager({
  initialProducts,
  onSaveProducts,
  lang = 'ar',
}: {
  initialProducts: Product[];
  onSaveProducts?: (updated: Product[]) => void;
  lang?: Language;
}) {
  const [items, setItems] = useState<Product[]>(initialProducts);
  const [hasChanges, setHasChanges] = useState(false);
  const isAr = lang === 'ar';

  const updateStock = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newCount = Math.max(0, p.stockCount + delta);
          return { ...p, stockCount: newCount, inStock: newCount > 0 };
        }
        return p;
      })
    );
    setHasChanges(true);
  };

  const updatePrice = (id: string, newPrice: number) => {
    if (isNaN(newPrice) || newPrice < 0) return;
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, priceQAR: newPrice } : p))
    );
    setHasChanges(true);
  };

  const handleSave = () => {
    if (onSaveProducts) onSaveProducts(items);
    setHasChanges(false);
  };

  return (
    <div className="bg-white/90 rounded-3xl p-6 border border-peach-soft shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-peach-soft">
        <h3 className="font-bold text-base text-cocoa-dark font-display flex items-center gap-2">
          <Layers className="w-5 h-5 text-coral-ink" />
          <span>{isAr ? 'إدارة المخزون والأسعار (ر.ق)' : 'Inventory & Price Management (QAR)'}</span>
        </h3>
        {hasChanges && (
          <Button size="sm" variant="primary" icon={<Save className="w-4 h-4" />} onClick={handleSave}>
            {isAr ? 'حفظ التغييرات' : 'Save Updates'}
          </Button>
        )}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-peach-soft">
        <table className="w-full text-xs text-start">
          <thead>
            <tr className="bg-blush-surface font-bold text-cocoa-dark border-b border-peach-soft">
              <th className="p-3 text-start">{isAr ? 'القطعة والتصنيف' : 'Garment'}</th>
              <th className="p-3 text-start">{isAr ? 'القماش' : 'Fabric'}</th>
              <th className="p-3 text-center">{isAr ? 'السعر (ر.ق)' : 'Price (QAR)'}</th>
              <th className="p-3 text-center">{isAr ? 'المخزون المتوفر' : 'Stock Units'}</th>
              <th className="p-3 text-center">{isAr ? 'الحالة' : 'Status'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-peach-soft/50">
            {items.map((it) => (
              <tr key={it.id} className="hover:bg-cream/60 transition-colors">
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={it.images[0]}
                    alt={it.title[lang]}
                    className="w-10 h-12 object-cover object-top rounded-xl border border-peach-soft shrink-0"
                  />
                  <div>
                    <strong className="block font-bold text-cocoa-dark">{it.title[lang]}</strong>
                    <span className="text-[10px] text-coral-ink font-semibold uppercase tracking-wider">
                      {it.category}
                    </span>
                  </div>
                </td>
                <td className="p-3 text-cocoa-muted">{it.fabric[lang]}</td>
                <td className="p-3 text-center">
                  <input
                    type="number"
                    value={it.priceQAR}
                    onChange={(e) => updatePrice(it.id, parseFloat(e.target.value))}
                    className="w-20 px-2 py-1 text-center font-bold text-coral-ink rounded-lg border border-peach-soft bg-cream focus:outline-none"
                  />
                </td>
                <td className="p-3 text-center">
                  <div className="inline-flex items-center gap-1.5 bg-cream px-2 py-1 rounded-xl border border-peach-soft">
                    <button
                      onClick={() => updateStock(it.id, -1)}
                      className="w-5 h-5 flex items-center justify-center rounded-md hover:bg-blush-surface text-cocoa-dark font-bold"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-bold text-cocoa-dark">
                      {it.stockCount}
                    </span>
                    <button
                      onClick={() => updateStock(it.id, 1)}
                      className="w-5 h-5 flex items-center justify-center rounded-md hover:bg-blush-surface text-cocoa-dark font-bold"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="p-3 text-center">
                  {it.stockCount > 0 ? (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {isAr ? 'متوفر' : 'In Stock'}
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-red-700 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
                      {isAr ? 'نفدت' : 'Sold Out'}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
