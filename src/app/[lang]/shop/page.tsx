'use client';

import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { products } from '@/data/products';
import { filterProducts, searchProducts } from '@/lib/catalog-utils';
import { ProductCard } from '@/components/ui/ProductCard';
import { FilterSidebar } from '@/components/shop/FilterSidebar';
import { SortDropdown } from '@/components/shop/SortDropdown';
import { Language, getDictionary } from '@/lib/i18n';
import { Sparkles, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ShopPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const lang = (params?.lang === 'en' ? 'en' : 'ar') as Language;
  const isAr = lang === 'ar';
  const dict = getDictionary(lang);

  const initialCat = searchParams?.get('category') || 'all';
  const initialSearch = searchParams?.get('search') || '';

  const [category, setCategory] = useState(initialCat);
  const [fabric, setFabric] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  // Compute filtered list
  const filteredProducts = useMemo(() => {
    let pool = products;
    if (searchQuery.trim()) {
      pool = searchProducts(pool, searchQuery);
    }

    let minPrice: number | undefined;
    let maxPrice: number | undefined;
    if (priceRange === 'under-800') {
      maxPrice = 800;
    } else if (priceRange === '800-1400') {
      minPrice = 800;
      maxPrice = 1400;
    } else if (priceRange === 'above-1400') {
      minPrice = 1400;
    }

    return filterProducts(pool, {
      category,
      fabricKeyword: fabric !== 'all' ? fabric : undefined,
      minPrice,
      maxPrice,
      inStockOnly,
      sortBy,
    });
  }, [category, fabric, priceRange, inStockOnly, sortBy, searchQuery]);

  const resetAll = () => {
    setCategory('all');
    setFabric('all');
    setPriceRange('all');
    setInStockOnly(false);
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen bg-cream py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-peach-soft">
          <div>
            <span className="text-xs font-bold text-coral-warm uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? 'المتجر الإلكتروني المرخص' : 'Licensed Boutique Catalog'}</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-cocoa-dark font-cairo mt-1">
              {category === 'all'
                ? dict.nav.shop
                : dict.nav[category as keyof typeof dict.nav] || category}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-cocoa-muted">
              {isAr
                ? 'أرقى تصاميم الثياب السودانية والجلابيات والدراعات الفاخرة المعتمدة في قطر.'
                : 'Curated artisanal Sudanese toubs, jalabiyas, and couture for clients in Qatar.'}
            </p>
          </div>

          {/* Sort & Mobile Filter Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white/80 border border-peach-soft rounded-2xl text-xs font-bold text-cocoa-dark shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4 text-coral-warm" />
              <span>{isAr ? 'تصفية' : 'Filters'}</span>
            </button>
            <SortDropdown value={sortBy} onChange={setSortBy} lang={lang} />
          </div>
        </div>

        {/* Active Filters Bar */}
        {(category !== 'all' || fabric !== 'all' || priceRange !== 'all' || inStockOnly || searchQuery) && (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-cocoa-muted">{isAr ? 'الفلاتر النشطة:' : 'Active Filters:'}</span>
            {category !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blush-surface text-cocoa-dark rounded-full border border-peach-soft font-medium">
                <span>{category}</span>
                <X className="w-3 h-3 cursor-pointer hover:text-coral-warm" onClick={() => setCategory('all')} />
              </span>
            )}
            {fabric !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blush-surface text-cocoa-dark rounded-full border border-peach-soft font-medium">
                <span>{fabric}</span>
                <X className="w-3 h-3 cursor-pointer hover:text-coral-warm" onClick={() => setFabric('all')} />
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blush-surface text-cocoa-dark rounded-full border border-peach-soft font-medium">
                <span>"{searchQuery}"</span>
                <X className="w-3 h-3 cursor-pointer hover:text-coral-warm" onClick={() => setSearchQuery('')} />
              </span>
            )}
            <button
              onClick={resetAll}
              className="text-xs text-coral-warm hover:underline font-bold ms-2"
            >
              {isAr ? 'إلغاء الكل' : 'Clear All'}
            </button>
          </div>
        )}

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar (3 cols) */}
          <div className="hidden lg:block lg:col-span-3 sticky top-28">
            <FilterSidebar
              selectedCategory={category}
              onSelectCategory={setCategory}
              selectedFabric={fabric}
              onSelectFabric={setFabric}
              selectedPriceRange={priceRange}
              onSelectPriceRange={setPriceRange}
              inStockOnly={inStockOnly}
              onToggleInStock={setInStockOnly}
              onResetFilters={resetAll}
              lang={lang}
              totalCount={filteredProducts.length}
            />
          </div>

          {/* Mobile Filter Drawer */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-50 bg-cocoa-dark/50 backdrop-blur-sm lg:hidden flex justify-end">
              <div className="w-full max-w-xs bg-cream h-full p-6 overflow-y-auto">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-peach-soft">
                  <h3 className="font-bold text-base text-cocoa-dark">{isAr ? 'تصفية المنتجات' : 'Filter'}</h3>
                  <button onClick={() => setIsMobileFilterOpen(false)}>
                    <X className="w-5 h-5 text-cocoa-dark" />
                  </button>
                </div>
                <FilterSidebar
                  selectedCategory={category}
                  onSelectCategory={(c) => { setCategory(c); setIsMobileFilterOpen(false); }}
                  selectedFabric={fabric}
                  onSelectFabric={(f) => { setFabric(f); setIsMobileFilterOpen(false); }}
                  selectedPriceRange={priceRange}
                  onSelectPriceRange={(pr) => { setPriceRange(pr); setIsMobileFilterOpen(false); }}
                  inStockOnly={inStockOnly}
                  onToggleInStock={setInStockOnly}
                  onResetFilters={resetAll}
                  lang={lang}
                  totalCount={filteredProducts.length}
                />
              </div>
            </div>
          )}

          {/* Product Grid (9 cols) */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white/80 rounded-3xl p-12 text-center border border-peach-soft space-y-4">
                <p className="text-base font-bold text-cocoa-dark">
                  {isAr ? 'لم يتم العثور على قطع تطابق الفلاتر المحددة' : 'No garments match the selected filters'}
                </p>
                <p className="text-xs text-cocoa-muted max-w-sm mx-auto">
                  {isAr
                    ? 'جربي تغيير خيارات نوع القماش أو السعر لاستكشاف باقي تشكيلات كنداكة.'
                    : 'Try broadening your search or resetting filters to explore all available collections.'}
                </p>
                <Button variant="primary" onClick={resetAll}>
                  {isAr ? 'عرض جميع القطع' : 'Reset All Filters'}
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} lang={lang} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
