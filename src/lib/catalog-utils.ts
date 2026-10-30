import { Product } from '../data/products';

export interface FilterOptions {
  category?: string;
  fabricKeyword?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'newest';
}

export function filterProducts(
  allProducts: Product[],
  options: FilterOptions = {}
): Product[] {
  let filtered = [...allProducts];

  // Category filter
  if (options.category && options.category !== 'all') {
    filtered = filtered.filter((p) => p.category === options.category);
  }

  // Fabric Keyword
  if (options.fabricKeyword && options.fabricKeyword !== 'all') {
    const kw = options.fabricKeyword.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.fabric.ar.toLowerCase().includes(kw) ||
        p.fabric.en.toLowerCase().includes(kw)
    );
  }

  // Price range
  if (options.minPrice !== undefined) {
    filtered = filtered.filter((p) => p.priceQAR >= options.minPrice!);
  }
  if (options.maxPrice !== undefined) {
    filtered = filtered.filter((p) => p.priceQAR <= options.maxPrice!);
  }

  // Stock filter
  if (options.inStockOnly) {
    filtered = filtered.filter((p) => p.inStock);
  }

  // Sorting
  if (options.sortBy) {
    switch (options.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.priceQAR - b.priceQAR);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.priceQAR - a.priceQAR);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0));
        break;
      default:
        // featured: keep default ordering
        break;
    }
  }

  return filtered;
}

export function searchProducts(allProducts: Product[], query: string): Product[] {
  if (!query || !query.trim()) return [];
  const q = query.trim().toLowerCase();

  return allProducts.filter((p) => {
    return (
      p.title.ar.toLowerCase().includes(q) ||
      p.title.en.toLowerCase().includes(q) ||
      p.subtitle.ar.toLowerCase().includes(q) ||
      p.subtitle.en.toLowerCase().includes(q) ||
      p.fabric.ar.toLowerCase().includes(q) ||
      p.fabric.en.toLowerCase().includes(q) ||
      p.description.ar.toLowerCase().includes(q) ||
      p.description.en.toLowerCase().includes(q)
    );
  });
}
