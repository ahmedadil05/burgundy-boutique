import { describe, it, expect } from 'vitest';
import { products } from '../src/data/products';
import { filterProducts, searchProducts } from '../src/lib/catalog-utils';

describe('Shop Catalog Filtering, Sorting and Search Logic', () => {
  it('filters products accurately by category', () => {
    const toubs = filterProducts(products, { category: 'toubs' });
    expect(toubs.length).toBeGreaterThan(0);
    expect(toubs.every((p) => p.category === 'toubs')).toBe(true);
  });

  it('filters products by fabric keyword', () => {
    const linen = filterProducts(products, { fabricKeyword: 'كتان' });
    expect(linen.length).toBeGreaterThan(0);
    expect(linen[0].fabric.ar).toContain('كتان');
  });

  it('sorts products by price low-to-high and high-to-low', () => {
    const lowToHigh = filterProducts(products, { sortBy: 'price-asc' });
    expect(lowToHigh[0].priceQAR).toBeLessThanOrEqual(lowToHigh[1].priceQAR);

    const highToLow = filterProducts(products, { sortBy: 'price-desc' });
    expect(highToLow[0].priceQAR).toBeGreaterThanOrEqual(highToLow[1].priceQAR);
  });

  it('searches products with case and language insensitivity', () => {
    const resultsAr = searchProducts(products, 'سويسري');
    expect(resultsAr.length).toBeGreaterThan(0);
    expect(resultsAr[0].title.ar).toContain('سويسري');

    const resultsEn = searchProducts(products, 'linen');
    expect(resultsEn.length).toBeGreaterThan(0);
  });
});
