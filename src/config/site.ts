export interface SiteConfig {
  name: {
    ar: string;
    en: string;
  };
  tagline: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  domain: string;
  defaultCurrency: 'QAR';
  currencies: Array<'QAR' | 'USD' | 'SDG'>;
  defaultLanguage: 'ar';
  languages: Array<'ar' | 'en'>;
  socials: {
    instagram: string;
    whatsapp: string;
    tiktok: string;
  };
  support: {
    phone: string;
    email: string;
    whatsappNumber: string;
  };
}

export const siteConfig: SiteConfig = {
  name: {
    ar: 'كنداكة بوتيك',
    en: 'Kandaka Boutique',
  },
  tagline: {
    ar: 'أناقة الثوب السوداني والزي التراثي المعاصر في قطر',
    en: 'Sudanese Heritage & Modern Elegance in Qatar',
  },
  description: {
    ar: 'متجر كنداكة المتخصص في أرقى وأفخم الأزياء النسائية السودانية من الثياب، الجلابيات، والدراعات المصنوعة بحرفية عالية.',
    en: 'Curated boutique offering authentic Sudanese Toubs, Jalabiyas, Dara’as, and contemporary modest dresses.',
  },
  domain: 'https://kandaka.com.qa',
  defaultCurrency: 'QAR',
  currencies: ['QAR', 'USD', 'SDG'],
  defaultLanguage: 'ar',
  languages: ['ar', 'en'],
  socials: {
    instagram: 'https://kandaka.com.qa/links/instagram',
    whatsapp: 'https://wa.me/97450000000',
    tiktok: 'https://kandaka.com.qa/links/tiktok',
  },
  support: {
    phone: '+974 4400 0000',
    email: 'care@kandaka.com.qa',
    whatsappNumber: '+974 5000 0000',
  },
};
