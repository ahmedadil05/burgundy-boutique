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
    instagramHandle: string;
    whatsapp: string;
    tiktok: string;
  };
  support: {
    phone: string;
    email: string;
    whatsappNumber: string;
    address: string;
  };
}

export const siteConfig: SiteConfig = {
  name: {
    ar: 'بيرغندي',
    en: 'BURGUNDY',
  },
  tagline: {
    ar: 'أزياء سودانية راقية مشغولة يدوياً بأنامل فنية في قطر',
    en: 'Hand-painted Sudanese Luxury Women’s Wear in Qatar',
  },
  description: {
    ar: 'دار بيرغندي للأزياء النسائية السودانية الراقية في الدوحة: ثياب، جلابيات، وشيلان مشغولة يدوياً بأرقى خامات الحرير والفوال السويسري الفاخر.',
    en: 'BURGUNDY (@burgundy974_) - Curated Qatar-based boutique specializing in exquisite hand-painted Sudanese toubs, jalabiyas, and silk scarves.',
  },
  domain: 'https://burgundy.com.qa',
  defaultCurrency: 'QAR',
  currencies: ['QAR', 'USD', 'SDG'],
  defaultLanguage: 'ar',
  languages: ['ar', 'en'],
  socials: {
    instagram: 'https://www.instagram.com/burgundy974_',
    instagramHandle: '@burgundy974_',
    whatsapp: 'https://wa.me/97450000974',
    tiktok: 'https://www.tiktok.com/@burgundy974_',
  },
  support: {
    phone: '+974 5000 0974',
    email: 'care@burgundy.com.qa',
    whatsappNumber: '+974 5000 0974',
    address: 'Doha, Qatar',
  },
};
