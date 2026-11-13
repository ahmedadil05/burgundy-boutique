import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Button } from '../src/components/ui/Button';
import { Badge } from '../src/components/ui/Badge';
import { ProductCard } from '../src/components/ui/ProductCard';

describe('Design System Primitives', () => {
  it('renders primary button with burgundy brand styling and correct text', () => {
    const html = renderToString(
      <Button variant="primary">تسوقي الآن</Button>
    );
    expect(html).toContain('تسوقي الآن');
    expect(html).toContain('bg-burgundy');
    expect(html).toContain('rounded-full');
  });

  it('renders secondary and ghost buttons with appropriate styles', () => {
    const secHtml = renderToString(
      <Button variant="secondary">استعراض</Button>
    );
    expect(secHtml).toContain('bg-surface-peachSoft');

    const ghostHtml = renderToString(
      <Button variant="ghost">إلغاء</Button>
    );
    expect(ghostHtml).toContain('text-burgundy');
  });

  it('renders badges (new, sale, sold out, heritage)', () => {
    const newBadge = renderToString(<Badge variant="new">جديد</Badge>);
    expect(newBadge).toContain('bg-peach-soft');

    const saleBadge = renderToString(<Badge variant="sale">خصم 20%</Badge>);
    expect(saleBadge).toContain('bg-coral-ink');

    const soldOutBadge = renderToString(<Badge variant="soldout">نفدت الكمية</Badge>);
    expect(soldOutBadge).toContain('bg-cocoa-muted');
  });

  it('renders ProductCard with title, image, price, and accessible buttons', () => {
    const mockProduct = {
      id: 'prod-1',
      slug: 'royal-swiss-voile-toub',
      title: { ar: 'ثوب سويسري ملكي', en: 'Royal Swiss Voile Toub' },
      priceQAR: 1250,
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b',
      category: 'toubs',
      badge: 'heritage' as const,
      inStock: true,
      fabric: { ar: 'فوال سويسري أصلي', en: 'Authentic Swiss Voile' },
    };

    const cardHtml = renderToString(
      <ProductCard product={mockProduct} lang="ar" currency="QAR" />
    );
    expect(cardHtml).toContain('ثوب سويسري ملكي');
    expect(cardHtml).toContain('1,250');
    expect(cardHtml).toContain('ر.ق');
  });
});
