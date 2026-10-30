import { Language } from './i18n';

export type Currency = 'QAR' | 'USD' | 'SDG';

// Rates relative to 1 QAR
export const EXCHANGE_RATES: Record<Currency, number> = {
  QAR: 1,
  USD: 1 / 3.64, // ~0.2747 USD per QAR
  SDG: 650,      // ~650 SDG per QAR
};

export const CURRENCY_SYMBOLS: Record<Currency, { ar: string; en: string }> = {
  QAR: { ar: 'ر.ق', en: 'QAR' },
  USD: { ar: '$', en: '$' },
  SDG: { ar: 'ج.س', en: 'SDG' },
};

export function convertPrice(amountInQAR: number, targetCurrency: Currency): number {
  if (targetCurrency === 'QAR') return amountInQAR;
  if (targetCurrency === 'USD') {
    return Math.round((amountInQAR / 3.64) * 100) / 100;
  }
  return Math.round(amountInQAR * EXCHANGE_RATES[targetCurrency]);
}

export function formatPrice(
  amountInQAR: number,
  currency: Currency = 'QAR',
  lang: Language = 'ar',
  numeralSystem: 'latn' | 'arab' = 'latn'
): string {
  const converted = convertPrice(amountInQAR, currency);
  const symbol = CURRENCY_SYMBOLS[currency][lang];

  const locale = lang === 'ar'
    ? (numeralSystem === 'arab' ? 'ar-QA-u-nu-arab' : 'ar-QA-u-nu-latn')
    : 'en-US';

  const formattedNum = new Intl.NumberFormat(locale, {
    maximumFractionDigits: currency === 'USD' ? 2 : 0,
    minimumFractionDigits: 0,
  }).format(converted);

  if (currency === 'USD') {
    return lang === 'ar' ? `${formattedNum} ${symbol}` : `${symbol}${formattedNum}`;
  }

  return `${formattedNum} ${symbol}`;
}
