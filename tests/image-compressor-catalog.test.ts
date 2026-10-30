import { describe, it, expect, beforeEach } from 'vitest';
import { calculateTargetDimensions, compressImageFile } from '../src/lib/image-utils';
import {
  loadCatalogFromStorage,
  saveCatalogToStorage,
  createProductRecord,
  deleteProductRecord,
  updateStockRecord,
} from '../src/lib/catalog-store';
import { products as seedProducts, Product } from '../src/data/products';

describe('Image Compressor Utilities', () => {
  it('correctly scales down dimensions exceeding maxWidth while preserving aspect ratio', () => {
    // 4000x3000 landscape down to max 1000px
    const dim1 = calculateTargetDimensions(4000, 3000, 1000);
    expect(dim1.width).toBe(1000);
    expect(dim1.height).toBe(750);

    // 1500x3000 portrait down to max 1000px
    const dim2 = calculateTargetDimensions(1500, 3000, 1000);
    expect(dim2.width).toBe(500);
    expect(dim2.height).toBe(1000);

    // Smaller image than max should not be enlarged
    const dim3 = calculateTargetDimensions(600, 400, 1000);
    expect(dim3.width).toBe(600);
    expect(dim3.height).toBe(400);
  });

  it('handles compressImageFile fallback safely when FileReader/Canvas are mocked or in Node environment', async () => {
    const mockFile = new Blob(['mock-image-bytes'], { type: 'image/jpeg' }) as unknown as File;
    // In Node test environment, compressImageFile should return a valid data url or string representation
    const result = await compressImageFile(mockFile, 1000, 0.8);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });
});

describe('Catalog Store Engine', () => {
  const STORAGE_KEY = 'kandaka_products';

  beforeEach(() => {
    if (typeof globalThis.localStorage === 'undefined') {
      let store: Record<string, string> = {};
      // @ts-expect-error mock storage
      globalThis.localStorage = {
        getItem: (k: string) => (k in store ? store[k] : null),
        setItem: (k: string, v: string) => {
          store[k] = String(v);
        },
        removeItem: (k: string) => {
          delete store[k];
        },
        clear: () => {
          store = {};
        },
      };
    } else {
      globalThis.localStorage.clear();
    }
  });

  it('loads seed products when localStorage is empty', () => {
    const loaded = loadCatalogFromStorage();
    expect(loaded.length).toBe(seedProducts.length);
    expect(loaded[0].id).toBe(seedProducts[0].id);
  });

  it('adds a new product and computes valid id and slug', () => {
    const newProductData = {
      title: { ar: 'ثوب جديد فاخر', en: 'New Luxury Toub' },
      subtitle: { ar: 'وصف فرعي', en: 'Subtitle' },
      description: { ar: 'وصف كامل', en: 'Full description' },
      priceQAR: 1800,
      category: 'toubs' as const,
      inStock: true,
      stockCount: 12,
      fabric: { ar: 'حرير طبيعي', en: 'Natural Silk' },
      origin: { ar: 'السودان', en: 'Sudan' },
      careInstructions: { ar: 'غسيل جاف', en: 'Dry clean' },
      colors: [{ id: 'peach', name: { ar: 'وردي', en: 'Pink' }, hex: '#FFC9A8' }],
      sizes: [{ id: 'free', label: 'Free Size (4.5m)', available: true }],
      images: ['data:image/jpeg;base64,sample123'],
      features: [{ ar: 'ميزة', en: 'Feature' }],
    };

    const currentCatalog = [...seedProducts];
    const created = createProductRecord(currentCatalog, newProductData);

    expect(created.id).toMatch(/^prod-/);
    expect(created.slug).toBe('new-luxury-toub');
    expect(created.priceQAR).toBe(1800);
    expect(created.images[0]).toBe('data:image/jpeg;base64,sample123');

    const updatedCatalog = [created, ...currentCatalog];
    saveCatalogToStorage(updatedCatalog);

    const reloaded = loadCatalogFromStorage();
    expect(reloaded.length).toBe(seedProducts.length + 1);
    expect(reloaded[0].id).toBe(created.id);
  });

  it('deletes an existing product by id', () => {
    const initial = [...seedProducts];
    const idToDelete = initial[0].id;

    const remaining = deleteProductRecord(initial, idToDelete);
    expect(remaining.length).toBe(initial.length - 1);
    expect(remaining.some((p) => p.id === idToDelete)).toBe(false);
  });

  it('updates stock level and toggles inStock boolean automatically', () => {
    const initial = [...seedProducts];
    const target = initial[0];

    // Decrement to zero
    const outOfStockCatalog = updateStockRecord(initial, target.id, 0, true);
    const updatedTarget = outOfStockCatalog.find((p) => p.id === target.id);
    expect(updatedTarget?.stockCount).toBe(0);
    expect(updatedTarget?.inStock).toBe(false);

    // Increment stock by delta +5
    const replenishedCatalog = updateStockRecord(outOfStockCatalog, target.id, 5, false);
    const replenishedTarget = replenishedCatalog.find((p) => p.id === target.id);
    expect(replenishedTarget?.stockCount).toBe(5);
    expect(replenishedTarget?.inStock).toBe(true);
  });
});
