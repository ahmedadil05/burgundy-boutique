'use client';

import React, { useState } from 'react';
import { Product } from '../../data/products';
import { Language } from '../../lib/i18n';
import { formatPrice } from '../../lib/currency';
import {
  Package,
  Plus,
  Minus,
  Trash2,
  Search,
  AlertTriangle,
  Tag,
  ExternalLink,
  Layers,
} from 'lucide-react';
import Link from 'next/link';

export function MobileProductList({
  products,
  onDeleteProduct,
  onUpdateStock,
  lang = 'ar',
}: {
  products: Product[];
  onDeleteProduct?: (id: string) => void;
  onUpdateStock?: (id: string, deltaOrCount: number, isAbsolute?: boolean) => void;
  lang?: Language;
}) {
  const isAr = lang === 'ar';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      p.title.ar.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.title.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.fabric.ar.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const confirmDelete = () => {
    if (productToDelete && onDeleteProduct) {
      onDeleteProduct(productToDelete.id);
      setProductToDelete(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Category Filter */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute top-1/2 -translate-y-1/2 start-3 text-cocoa-muted pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isAr ? 'بحث في تشكيلة الثياب والقطع...' : 'Search garments by name or fabric...'}
            className="w-full ps-9 pe-4 py-2.5 rounded-2xl bg-white border border-peach-soft text-xs text-cocoa-dark focus:outline-none focus:ring-2 focus:ring-coral-warm/20"
          />
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          {[
            { id: 'all', label: isAr ? 'جميع القطع' : 'All Items', count: products.length },
            { id: 'toubs', label: isAr ? 'تياب' : 'Toubs', count: products.filter((p) => p.category === 'toubs').length },
            { id: 'jalabiyas', label: isAr ? 'جلابيات' : 'Jalabiyas', count: products.filter((p) => p.category === 'jalabiyas').length },
            { id: 'daraas', label: isAr ? 'دراعات' : 'Daraas', count: products.filter((p) => p.category === 'daraas').length },
            { id: 'dresses', label: isAr ? 'فساتين' : 'Dresses', count: products.filter((p) => p.category === 'dresses').length },
            { id: 'accessories', label: isAr ? 'إكسسوارات' : 'Accessories', count: products.filter((p) => p.category === 'accessories').length },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition-colors flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-cocoa-dark text-white shadow-xs'
                  : 'bg-white text-cocoa-dark border border-peach-soft hover:bg-cream-50'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  selectedCategory === cat.id
                    ? 'bg-white/20 text-white'
                    : 'bg-cream-100 text-cocoa-muted'
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Products Cards List */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-white/60 rounded-3xl border border-peach-soft p-6">
          <Layers className="w-10 h-10 mx-auto text-peach-deep mb-2 opacity-60" />
          <p className="text-sm font-bold text-cocoa-dark font-display">
            {isAr ? 'لا توجد قطع مطابقة للبحث' : 'No matching products found'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredProducts.map((product) => {
            const coverImage = product.images?.[0] || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80';
            const isOutOfStock = product.stockCount <= 0 || !product.inStock;

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl p-4 sm:p-5 border border-peach-soft shadow-xs space-y-3 hover:border-peach-deep transition-all"
              >
                <div className="flex gap-3 items-start">
                  {/* Thumbnail */}
                  <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-2xl overflow-hidden shrink-0 border border-peach-soft bg-cream-50">
                    <img
                      src={coverImage}
                      alt={product.title[lang]}
                      className="w-full h-full object-cover"
                    />
                    {product.badge && (
                      <span className="absolute top-1 start-1 text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-coral-ink text-white uppercase">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-bold text-coral-ink uppercase tracking-wider">
                        {product.category}
                      </span>
                      <Link
                        href={`/${lang}/products/${product.slug}`}
                        className="text-cocoa-muted hover:text-coral-ink p-1"
                        title={isAr ? 'عرض في المتجر' : 'View in shop'}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <h4 className="font-bold text-sm text-cocoa-dark font-display line-clamp-1 mt-0.5">
                      {product.title[lang]}
                    </h4>

                    <p className="text-[11px] text-cocoa-muted line-clamp-1 mt-0.5">
                      {product.fabric[lang]}
                    </p>

                    <div className="flex items-baseline gap-2 mt-1.5">
                      <span className="font-extrabold text-sm text-cocoa-dark font-display">
                        {formatPrice(product.priceQAR, 'QAR', lang)}
                      </span>
                      {product.originalPriceQAR && (
                        <span className="text-[11px] line-through text-cocoa-muted">
                          {formatPrice(product.originalPriceQAR, 'QAR', lang)}
                        </span>
                      )}
                    </div>

                    {/* Color Dots */}
                    {product.colors && product.colors.length > 0 && (
                      <div className="flex items-center gap-1 mt-2">
                        {product.colors.map((c, i) => (
                          <span
                            key={i}
                            className="w-3 h-3 rounded-full border border-black/15 shadow-2xs"
                            style={{ backgroundColor: c.hex }}
                            title={c.name[lang]}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Bar: Stock Stepper & Delete Button */}
                <div className="flex items-center justify-between pt-2.5 border-t border-peach-soft/60">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-cocoa-muted font-display">
                      {isAr ? 'المخزون:' : 'Stock:'}
                    </span>

                    {/* Stock Stepper */}
                    <div className="inline-flex items-center bg-cream-50 rounded-xl border border-peach-soft p-0.5">
                      <button
                        type="button"
                        onClick={() => onUpdateStock && onUpdateStock(product.id, -1, false)}
                        disabled={product.stockCount <= 0}
                        className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white text-cocoa-dark disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                        title={isAr ? 'إنقاص قطعة واحدة' : 'Decrease stock'}
                      >
                        <Minus className="w-3 h-3" />
                      </button>

                      <span className={`px-2.5 text-xs font-bold font-mono ${
                        isOutOfStock ? 'text-rose-600' : 'text-cocoa-dark'
                      }`}>
                        {product.stockCount}
                      </span>

                      <button
                        type="button"
                        onClick={() => onUpdateStock && onUpdateStock(product.id, 1, false)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white text-cocoa-dark transition-colors"
                        title={isAr ? 'زيادة قطعة واحدة' : 'Increase stock'}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {isOutOfStock && (
                      <span className="text-[10px] text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-200">
                        {isAr ? 'نفد المخزون' : 'Sold Out'}
                      </span>
                    )}
                  </div>

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => setProductToDelete(product)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-rose-700 bg-rose-50/70 hover:bg-rose-100 border border-rose-200 text-xs font-semibold transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{isAr ? 'حذف' : 'Delete'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cocoa-dark/60 backdrop-blur-xs">
          <div className="bg-white max-w-sm w-full rounded-3xl p-5 border border-peach-soft shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h4 className="font-bold text-base text-cocoa-dark font-display">
                {isAr ? 'تأكيد حذف الثوب؟' : 'Confirm Product Deletion?'}
              </h4>
              <p className="text-xs text-cocoa-muted">
                {isAr
                  ? `هل أنتِ متأكدة من حذف "${productToDelete.title.ar}" من المتجر نهائياً؟`
                  : `Are you sure you want to remove "${productToDelete.title.en}" permanently?`}
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                className="flex-1 py-2.5 rounded-xl border border-peach-soft text-xs font-bold text-cocoa-dark hover:bg-cream-50"
              >
                {isAr ? 'تراجع' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs"
              >
                {isAr ? 'نعم، حذف' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
