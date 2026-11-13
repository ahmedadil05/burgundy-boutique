import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { PreLaunchTeaser } from '../src/components/home/PreLaunchTeaser';
import { BehindTheBrush } from '../src/components/home/BehindTheBrush';
import { ShopByFabric } from '../src/components/home/ShopByFabric';
import { DEFAULT_SETTINGS } from '../src/lib/settings-store';

describe('BURGUNDY Brand & Launch-Mode Specifications', () => {
  it('stores brand name BURGUNDY, CR number, licence number, and pre-launch mode toggle', () => {
    expect(DEFAULT_SETTINGS.storeName.en).toBe('BURGUNDY');
    expect(DEFAULT_SETTINGS.storeName.ar).toBe('بيرغندي');
    expect(DEFAULT_SETTINGS.crNumber).toBe('CR-189420-QA');
    expect(DEFAULT_SETTINGS.licenseNumber).toBe('ECOM-2026-974');
    expect(typeof DEFAULT_SETTINGS.launchMode).toBe('boolean');
    expect(DEFAULT_SETTINGS.brandColorPrimary).toBe('#5F0F40');
    expect(DEFAULT_SETTINGS.instagramHandle).toBe('@burgundy974_');
  });

  it('renders PreLaunchTeaser with Instagram handle, teaser image and WhatsApp waitlist', () => {
    const htmlAr = renderToString(<PreLaunchTeaser lang="ar" />);
    expect(htmlAr).toContain('BURGUNDY');
    expect(htmlAr).toContain('@burgundy974_');
    expect(htmlAr).toContain('wa.me');
    expect(htmlAr).toContain('STAY TUNED');

    const htmlEn = renderToString(<PreLaunchTeaser lang="en" />);
    expect(htmlEn).toContain('BURGUNDY');
    expect(htmlEn).toContain('@burgundy974_');
    expect(htmlEn).toContain('waitlist');
  });

  it('renders BehindTheBrush and ShopByFabric craft components', () => {
    const html = renderToString(<BehindTheBrush lang="ar" />);
    expect(html).toContain('وراء الريشة');
    expect(html).toContain('انتقاء القماش الفاخر');

    const fabricHtml = renderToString(<ShopByFabric lang="ar" />);
    expect(fabricHtml).toContain('فوال سويسري فاخر');
    expect(fabricHtml).toContain('حرير طبيعي خالص');
  });
});
