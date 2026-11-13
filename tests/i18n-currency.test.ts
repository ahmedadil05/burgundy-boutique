import { describe, it, expect } from 'vitest';
import { getDictionary, isRTL } from '../src/lib/i18n';
import { formatPrice, convertPrice } from '../src/lib/currency';

describe('Bilingual i18n and Currency Engine', () => {
  it('loads Arabic and English dictionaries with matching top-level keys', () => {
    const ar = getDictionary('ar');
    const en = getDictionary('en');

    expect(ar.nav.shop).toBeDefined();
    expect(en.nav.shop).toBeDefined();
    expect(ar.common.addToCart).toBeDefined();
    expect(en.common.addToCart).toBeDefined();
    expect(ar.compliance.crNumberLabel).toBeDefined();
    expect(en.compliance.crNumberLabel).toBeDefined();
  });

  it('correctly identifies RTL for Arabic and LTR for English', () => {
    expect(isRTL('ar')).toBe(true);
    expect(isRTL('en')).toBe(false);
  });

  it('formats prices correctly in QAR and USD', () => {
    const qarAr = formatPrice(350, 'QAR', 'ar');
    const qarEn = formatPrice(350, 'QAR', 'en');
    expect(qarAr).toContain('350');
    expect(qarAr).toContain('ر.ق');
    expect(qarEn).toContain('350');
    expect(qarEn).toContain('QAR');

    const usdEn = formatPrice(364, 'USD', 'en');
    expect(usdEn).toContain('$');
    expect(convertPrice(364, 'USD')).toBe(100); // 364 QAR / 3.64 = 100 USD
  });
});
