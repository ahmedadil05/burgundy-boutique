export interface QatarComplianceConfig {
  crNumber: string;
  licenseNumber: string;
  legalEntityName: {
    ar: string;
    en: string;
  };
  mociDecisionReference: string;
  taxRegistrationNumber: string;
  address: {
    country: string;
    city: string;
    zone: string;
    street: string;
    building: string;
  };
  customerServiceHours: {
    ar: string;
    en: string;
  };
  contactEmail: string;
  contactPhone: string;
  domesticDeliveryFlatRateQAR: number;
  freeDeliveryThresholdQAR: number;
  gccDeliveryFlatRateQAR: number;
}

export const complianceConfig: QatarComplianceConfig = {
  crNumber: 'CR-189420-QA',
  licenseNumber: 'ECOM-2026-974',
  legalEntityName: {
    ar: 'مؤسسة بيرغندي للأزياء والتجارة الإلكترونية',
    en: 'BURGUNDY Fashion & E-Commerce Establishment',
  },
  mociDecisionReference: 'MOCI E-Commerce Decision No. 25 of 2026',
  taxRegistrationNumber: '000-BURGUNDY-QA',
  address: {
    country: 'Qatar',
    city: 'Doha',
    zone: 'Zone 55',
    street: 'Al Waab St.',
    building: 'Atelier BURGUNDY, Villa 9',
  },
  customerServiceHours: {
    ar: 'السبت - الخميس: 9:00 صباحاً حتى 9:00 مساءً (توقيت الدوحة)',
    en: 'Saturday - Thursday: 9:00 AM to 9:00 PM (Doha Time)',
  },
  contactEmail: 'care@burgundy.com.qa',
  contactPhone: '+974 5000 0974',
  domesticDeliveryFlatRateQAR: 25,
  freeDeliveryThresholdQAR: 500,
  gccDeliveryFlatRateQAR: 75,
};
