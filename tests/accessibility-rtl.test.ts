import { describe, it, expect } from 'vitest';
import { getDirection, isRTL } from '../src/lib/i18n';
import { formatPrice } from '../src/lib/currency';

function getLuminance(r: number, g: number, b: number) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function hexToRgb(hex: string) {
  const clean = hex.replace('#', '');
  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16),
  };
}

function contrastRatio(hex1: string, hex2: string) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

describe('RTL & WCAG AA Contrast Audit', () => {
  it('correctly sets directional attributes for Arabic and English', () => {
    expect(isRTL('ar')).toBe(true);
    expect(getDirection('ar')).toBe('rtl');
    expect(isRTL('en')).toBe(false);
    expect(getDirection('en')).toBe('ltr');
  });

  it('supports both Latin and Arabic Eastern numeral systems', () => {
    const latn = formatPrice(1200, 'QAR', 'ar', 'latn');
    expect(latn).toContain('1,200');

    const arab = formatPrice(1200, 'QAR', 'ar', 'arab');
    expect(arab).toContain('١٬٢٠٠');
  });

  it('validates WCAG AA contrast for Peach Sorbet text tokens against Cream background', () => {
    const cream = '#FFF6EE';
    const cocoaDark = '#3B2A24';
    const cocoaMuted = '#725447';

    const darkContrast = contrastRatio(cocoaDark, cream);
    expect(darkContrast).toBeGreaterThanOrEqual(7.0); // Exceeds AAA (7:1)

    const mutedContrast = contrastRatio(cocoaMuted, cream);
    expect(mutedContrast).toBeGreaterThanOrEqual(4.5); // Meets AA for body text (4.5:1)
  });
});
