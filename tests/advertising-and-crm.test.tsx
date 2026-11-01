import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { SponsoredBanner } from '../src/components/ads/SponsoredBanner';
import { SponsoredGridSlot } from '../src/components/ads/SponsoredGridSlot';

describe('Sponsored Advertising & CRM Lead Tracking', () => {
  it('renders SponsoredBanner with prominent sponsored badge and advertiser name', () => {
    const htmlAr = renderToString(<SponsoredBanner lang="ar" />);
    expect(htmlAr).toContain('Sponsored');
    expect(htmlAr).toContain('Dar Al-Teeb Qatar');
    expect(htmlAr).toContain('زيارة شريكنا');

    const htmlEn = renderToString(<SponsoredBanner lang="en" />);
    expect(htmlEn).toContain('Sponsored Partner');
    expect(htmlEn).toContain('Visit Partner');
  });

  it('renders SponsoredGridSlot clearly distinguished with dashed border', () => {
    const htmlAr = renderToString(<SponsoredGridSlot lang="ar" />);
    expect(htmlAr).toContain('مساحة إعلانية برعاية');
    expect(htmlAr).toContain('border-dashed');
    expect(htmlAr).toContain('Qatari Henna Studio');
  });
});
