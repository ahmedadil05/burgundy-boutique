'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, products as seedProducts } from '../data/products';

export const CATALOG_STORAGE_KEY = 'kandaka_products';

export interface NewProductInput {
  title: { ar: string; en: string };
  subtitle?: { ar: string; en: string };
  description: { ar: string; en: string };
  priceQAR: number;
  originalPriceQAR?: number;
  category: 'toubs' | 'jalabiyas' | 'daraas' | 'dresses' | 'accessories';
  badge?: 'new' | 'sale' | 'soldout' | 'heritage';
  inStock?: boolean;
  stockCount: number;
  fabric: { ar: string; en: string };
  origin?: { ar: string; en: string };
  careInstructions?: { ar: string; en: string };
  colors: Array<{ id: string; name: { ar: string; en: string }; hex: string }>;
  sizes: Array<{ id: string; label: string; available: boolean }>;
  images: string[];
  features?: Array<{ ar: string; en: string }>;
  slug?: string;
}

function getStorage(): Storage | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage;
    }
    if (typeof localStorage !== 'undefined') {
      return localStorage;
    }
  } catch {
    return null;
  }
  return null;
}

/**
 * Loads products from localStorage. If empty or corrupt, falls back to seed data.
 */
export function loadCatalogFromStorage(): Product[] {
  const storage = getStorage();
  if (!storage) {
    return seedProducts;
  }
  try {
    const raw = storage.getItem(CATALOG_STORAGE_KEY);
    if (!raw) return seedProducts;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return seedProducts;
  } catch {
    return seedProducts;
  }
}

/**
 * Persists products catalog to localStorage.
 */
export function saveCatalogToStorage(catalog: Product[]): void {
  const storage = getStorage();
  if (!storage) return;
  try {
    storage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(catalog));
  } catch (e) {
    console.error('Failed to save catalog to localStorage:', e);
  }
}

/**
 * Generates an URL-safe slug from English title or fallback.
 */
export function generateSlug(enTitle: string, existingCatalog: Product[]): string {
  let base = enTitle
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');

  if (!base) base = 'product';

  let slug = base;
  let counter = 1;
  while (existingCatalog.some((p) => p.slug === slug)) {
    slug = `${base}-${counter}`;
    counter++;
  }
  return slug;
}

/**
 * Pure function to construct a complete Product object from form inputs.
 */
export function createProductRecord(
  currentCatalog: Product[],
  input: NewProductInput
): Product {
  const timestamp = Date.now().toString(36).slice(-4);
  const nextNum = currentCatalog.length + 1;
  const id = `prod-${String(nextNum).padStart(3, '0')}-${timestamp}`;
  const slug = input.slug || generateSlug(input.title.en, currentCatalog);

  const product: Product = {
    id,
    slug,
    title: input.title,
    subtitle: input.subtitle || {
      ar: input.fabric.ar,
      en: input.fabric.en,
    },
    description: input.description,
    priceQAR: Number(input.priceQAR),
    originalPriceQAR: input.originalPriceQAR ? Number(input.originalPriceQAR) : undefined,
    category: input.category,
    badge: input.badge || 'new',
    inStock: input.inStock ?? input.stockCount > 0,
    stockCount: Math.max(0, Number(input.stockCount)),
    fabric: input.fabric,
    origin: input.origin || {
      ar: 'صنع في السودان',
      en: 'Crafted in Sudan',
    },
    careInstructions: input.careInstructions || {
      ar: 'غسيل جاف أو يدوي لطيف بالماء البارد',
      en: 'Dry clean or gentle cold hand wash',
    },
    colors: input.colors.length > 0 ? input.colors : [
      { id: 'peach', name: { ar: 'دراق ناعم', en: 'Soft Peach' }, hex: '#FFC9A8' },
    ],
    sizes: input.sizes.length > 0 ? input.sizes : [
      { id: 'free', label: 'Free Size (4.5m)', available: true },
    ],
    images: input.images.length > 0 ? input.images : [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80',
    ],
    features: input.features || [
      { ar: 'خامات سودانية طبيعية ممتازة', en: 'Premium natural Sudanese fabrics' },
      { ar: 'تطريز أصيل بجودة عالية', en: 'Authentic high-grade embroidery' },
    ],
  };

  return product;
}

/**
 * Pure function to delete a product by id.
 */
export function deleteProductRecord(
  currentCatalog: Product[],
  id: string
): Product[] {
  return currentCatalog.filter((p) => p.id !== id);
}

/**
 * Pure function to update stock for a product.
 */
export function updateStockRecord(
  currentCatalog: Product[],
  id: string,
  deltaOrCount: number,
  isAbsolute = false
): Product[] {
  return currentCatalog.map((product) => {
    if (product.id !== id) return product;

    const newCount = isAbsolute
      ? Math.max(0, deltaOrCount)
      : Math.max(0, product.stockCount + deltaOrCount);

    return {
      ...product,
      stockCount: newCount,
      inStock: newCount > 0,
    };
  });
}

// React Context Interface
export interface CatalogContextType {
  products: Product[];
  addProduct: (input: NewProductInput) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateStock: (id: string, deltaOrCount: number, isAbsolute?: boolean) => void;
  resetCatalog: () => void;
  getProductBySlug: (slug: string) => Product | undefined;
}

const CatalogContext = createContext<CatalogContextType | null>(null);

export function CatalogProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage once on client
  useEffect(() => {
    const loaded = loadCatalogFromStorage();
    setProducts(loaded);
    setIsHydrated(true);
  }, []);

  // Sync to storage on state change after hydration
  useEffect(() => {
    if (isHydrated) {
      saveCatalogToStorage(products);
    }
  }, [products, isHydrated]);

  const addProduct = useCallback((input: NewProductInput): Product => {
    let createdProduct: Product | null = null;
    setProducts((prev) => {
      const created = createProductRecord(prev, input);
      createdProduct = created;
      return [created, ...prev];
    });
    return createdProduct!;
  }, []);

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => deleteProductRecord(prev, id));
  }, []);

  const updateStock = useCallback((id: string, deltaOrCount: number, isAbsolute = false) => {
    setProducts((prev) => updateStockRecord(prev, id, deltaOrCount, isAbsolute));
  }, []);

  const resetCatalog = useCallback(() => {
    setProducts(seedProducts);
    saveCatalogToStorage(seedProducts);
  }, []);

  const getProductBySlug = useCallback(
    (slug: string) => {
      return products.find((p) => p.slug === slug);
    },
    [products]
  );

  return (
    <CatalogContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        resetCatalog,
        getProductBySlug,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalogStore(): CatalogContextType {
  const context = useContext(CatalogContext);
  if (!context) {
    // If used outside provider, return default pure accessor
    return {
      products: seedProducts,
      addProduct: (input) => createProductRecord(seedProducts, input),
      updateProduct: () => {},
      deleteProduct: () => {},
      updateStock: () => {},
      resetCatalog: () => {},
      getProductBySlug: (slug) => seedProducts.find((p) => p.slug === slug),
    };
  }
  return context;
}
