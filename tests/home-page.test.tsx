import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { HennaDivider } from '../src/components/common/HennaDivider';
import { HeroBanner } from '../src/components/home/HeroBanner';
import { CategoryGrid } from '../src/components/home/CategoryGrid';
import { CustomerReviews } from '../src/components/home/CustomerReviews';
import { PreLaunchTeaser } from '../src/components/home/PreLaunchTeaser';
import { BehindTheBrush } from '../src/components/home/BehindTheBrush';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => '/ar',
}));

describe('Home Page Components', () => {
  it('renders HennaDivider with delicate SVG path', () => {
    const html = renderToString(<HennaDivider />);
    expect(html).toContain('<svg');
    expect(html).toContain('aria-hidden');
  });

  it('renders HeroBanner with headline, model photo, and Shop Now button', () => {
    const htmlAr = renderToString(<HeroBanner lang="ar" />);
    expect(htmlAr).toContain('أصالة الثوب السوداني');
    expect(htmlAr).toContain('تسوقي الآن');
    expect(htmlAr).toContain('href="/ar/shop"');

    const htmlEn = renderToString(<HeroBanner lang="en" />);
    expect(htmlEn).toContain('Sudanese Elegance');
    expect(htmlEn).toContain('Shop Now');
    expect(htmlEn).toContain('href="/en/shop"');
  });

  it('renders CategoryGrid with Toubs, Jalabiyas, Daraas', () => {
    const html = renderToString(<CategoryGrid lang="ar" />);
    expect(html).toContain('ثياب');
    expect(html).toContain('جلابيات');
  });

  it('renders CustomerReviews with Qatar client feedback', () => {
    const html = renderToString(<CustomerReviews lang="ar" />);
    expect(html).toContain('آراء عميلاتنا في قطر');
    expect(html).toContain('الدوحة');
  });

  it('renders PreLaunchTeaser with brand teaser and Instagram handle @burgundy974_', () => {
    const html = renderToString(<PreLaunchTeaser lang="ar" />);
    expect(html).toContain('BURGUNDY');
    expect(html).toContain('STAY TUNED');
    expect(html).toContain('@burgundy974_');
    expect(html).toContain('wa.me');

    const htmlEn = renderToString(<PreLaunchTeaser lang="en" />);
    expect(htmlEn).toContain("Something&#x27;s on the Horizon");
  });

  it('renders BehindTheBrush section with artisanal process steps', () => {
    const html = renderToString(<BehindTheBrush lang="ar" />);
    expect(html).toContain('وراء الريشة');
    expect(html).toContain('01');
    expect(html).toContain('02');
    expect(html).toContain('03');
  });
});
