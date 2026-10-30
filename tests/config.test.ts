import { describe, it, expect } from 'vitest';
import { siteConfig } from '../src/config/site';
import { complianceConfig } from '../src/config/compliance';

describe('Configuration & Qatar Compliance Tokens', () => {
  it('exports correct siteConfig with brand, .qa domain and primary currency', () => {
    expect(siteConfig.name.ar).toBe('كنداكة بوتيك');
    expect(siteConfig.name.en).toBe('Kandaka Boutique');
    expect(siteConfig.defaultCurrency).toBe('QAR');
    expect(siteConfig.domain).toContain('.qa');
    expect(siteConfig.currencies).toContain('QAR');
  });

  it('exports complianceConfig adhering to Qatar Decision No. 25 of 2026', () => {
    expect(complianceConfig.crNumber).toBeDefined();
    expect(complianceConfig.licenseNumber).toBeDefined();
    expect(complianceConfig.legalEntityName).toBeDefined();
    expect(complianceConfig.customerServiceHours).toBeDefined();
    expect(complianceConfig.contactEmail).toBeDefined();
    expect(complianceConfig.contactPhone).toBeDefined();
  });
});
