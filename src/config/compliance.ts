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
  crNumber: '[CR_NUMBER]',
  licenseNumber: '[ECOM_LICENSE_NUMBER]',
  legalEntityName: {
    ar: 'شركة كنداكة للتجارة الإلكترونية ذ.م.م',
    en: 'Kandaka E-Commerce W.L.L.',
  },
  mociDecisionReference: 'MOCI Decision No. 25 of 2026',
  taxRegistrationNumber: '000-00000000',
  address: {
    country: 'Qatar',
    city: 'Doha',
    zone: 'Zone 55',
    street: 'Al Furousiya St.',
    building: 'Building 12, Unit 4',
  },
  customerServiceHours: {
    ar: 'السبت - الخميس: 9:00 صباحاً حتى 9:00 مساءً (توقيت الدوحة)',
    en: 'Saturday - Thursday: 9:00 AM to 9:00 PM (Doha Time)',
  },
  contactEmail: 'legal@kandaka.com.qa',
  contactPhone: '+974 4400 0000',
  domesticDeliveryFlatRateQAR: 25,
  freeDeliveryThresholdQAR: 350,
  gccDeliveryFlatRateQAR: 65,
};
