import arDict from '../dictionaries/ar.json';
import enDict from '../dictionaries/en.json';

export type Language = 'ar' | 'en';
export type Dictionary = typeof arDict;

const dictionaries: Record<Language, Dictionary> = {
  ar: arDict,
  en: enDict,
};

export function getDictionary(lang: Language = 'ar'): Dictionary {
  return dictionaries[lang] || dictionaries.ar;
}

export function isRTL(lang: Language = 'ar'): boolean {
  return lang === 'ar';
}

export function getDirection(lang: Language = 'ar'): 'rtl' | 'ltr' {
  return isRTL(lang) ? 'rtl' : 'ltr';
}
