import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { products, getProductBySlug } from '../src/data/products';
import { StickyPurchasePanel } from '../src/components/product/StickyPurchasePanel';
import { SizeGuideModal } from '../src/components/product/SizeGuideModal';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => '/ar',
}));

describe('Product Page & Catalog Requirements', () => {
  it('exports seed catalog with authentic Sudanese items and Qatar compliance details', () => {
    expect(products.length).toBeGreaterThanOrEqual(6);
    const toub = products.find((p) => p.category === 'toubs');
    expect(toub).toBeDefined();
    expect(toub?.origin.ar).toContain('السودان');
    expect(toub?.careInstructions.ar).toBeDefined();
    expect(toub?.images.length).toBeGreaterThanOrEqual(3);
  });

  it('retrieves product by slug correctly', () => {
    const product = getProductBySlug('royal-swiss-voile-toub');
    expect(product).toBeDefined();
    expect(product?.slug).toBe('royal-swiss-voile-toub');
  });

  it('renders StickyPurchasePanel with price in QAR, size options, and WhatsApp button', () => {
    const sample = products[0];
    const html = renderToString(
      <StickyPurchasePanel product={sample} lang="ar" currency="QAR" />
    );
    expect(html).toContain(sample.title.ar);
    expect(html).toContain('ر.ق');
    expect(html).toContain('واتساب');
  });

  it('renders SizeGuideModal with authentic toub measurements', () => {
    const html = renderToString(
      <SizeGuideModal isOpen={true} onClose={() => {}} lang="ar" />
    );
    expect(html).toContain('دليل المقاسات');
    expect(html).toContain('4.5');
  });
});
