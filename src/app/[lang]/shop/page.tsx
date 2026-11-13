'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { useCatalogStore } from '@/lib/catalog-store';
import { filterProducts, searchProducts } from '@/lib/catalog-utils';
import { ProductCard, ProductItem } from '@/components/ui/ProductCard';
import { ProductQuickViewModal } from '@/components/product/ProductQuickViewModal';
import { FilterSidebar } from '@/components/shop/FilterSidebar';
import { SortDropdown } from '@/components/shop/SortDropdown';
import { SponsoredGridSlot } from '@/components/ads/SponsoredGridSlot';
import { Language, getDictionary } from '@/lib/i18n';
import { Sparkles, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

function ShopContent() {
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
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);

  const { products } = useCatalogStore();

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
  }, [category, fabric, priceRange, inStockOnly, sortBy, searchQuery, products]);

  const resetAll = () => {
    setCategory('all');
    setFabric('all');
    setPriceRange('all');
    setInStockOnly(false);
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen bg-canvas py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-gold-hairline">
          <div>
            <span className="text-xs font-bold text-coral uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold-line" />
              <span>{isAr ? 'المتجر الإلكتروني المرخص في قطر' : 'Licensed Boutique Catalog'}</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-burgundy font-cairo mt-1">
              {category === 'all'
                ? dict.nav.shop
                : dict.nav[category as keyof typeof dict.nav] || category}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slateText-secondary">
              {isAr
                ? 'أرقى تصاميم الثياب السودانية والجلابيات والشيلان المشغولة يدوياً في قطر.'
                : 'Curated artisanal hand-painted Sudanese toubs, jalabiyas, and silk scarves in Qatar.'}
            </p>
          </div>

          {/* Sort & Mobile Filter Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gold-hairline rounded-2xl text-xs font-bold text-slateText-body shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4 text-burgundy" />
              <span>{isAr ? 'تصفية' : 'Filters'}</span>
            </button>

            <SortDropdown value={sortBy} onChange={(val) => setSortBy(val)} lang={lang} />
          </div>
        </div>

        {/* Layout Grid: Sidebar (3 cols) + Product Cards (9 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
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
            <div className="fixed inset-0 z-50 bg-slateText-body/50 backdrop-blur-sm lg:hidden flex justify-end">
              <div className="w-full max-w-xs bg-canvas h-full p-6 overflow-y-auto">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-gold-hairline">
                  <h3 className="font-bold text-base text-burgundy">{isAr ? 'تصفية المنتجات' : 'Filter'}</h3>
                  <button onClick={() => setIsMobileFilterOpen(false)}>
                    <X className="w-5 h-5 text-burgundy" />
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
              <div className="bg-white rounded-3xl p-12 text-center border border-gold-hairline space-y-4 shadow-soft">
                <p className="text-base font-bold text-burgundy">
                  {isAr ? 'لم يتم العثور على قطع تطابق الفلاتر المحددة' : 'No garments match the selected filters'}
                </p>
                <p className="text-xs text-slateText-secondary max-w-sm mx-auto">
                  {isAr
                    ? 'جربي تغيير خيارات نوع القماش أو السعر لاستكشاف باقي تشكيلات دار بيرغندي.'
                    : 'Try broadening your search or resetting filters to explore all available collections.'}
                </p>
                <Button variant="primary" onClick={resetAll} className="bg-burgundy text-white">
                  {isAr ? 'عرض جميع القطع' : 'Reset All Filters'}
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product, idx) => (
                  <React.Fragment key={product.id}>
                    <ProductCard
                      product={product}
                      lang={lang}
                      onQuickView={setQuickViewProduct}
                    />
                    {/* Insert Sponsored Grid Slot at position 2 if present */}
                    {idx === 2 && <SponsoredGridSlot lang={lang} />}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        lang={lang}
      />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-canvas p-10 text-center text-xs">Loading BURGUNDY Catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
