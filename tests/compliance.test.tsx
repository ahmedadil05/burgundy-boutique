import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { LegalFooter } from '../src/components/layout/LegalFooter';
import { complianceConfig } from '../src/config/compliance';
import { policies } from '../src/data/policies';
import { generateComplaintTicket } from '../src/app/[lang]/complaints/complaint-utils';

describe('Qatar Compliance Components and Legal Policies', () => {
  it('renders LegalFooter with mandatory Decision No. 25 of 2026 data points', () => {
    const htmlAr = renderToString(<LegalFooter lang="ar" />);
    expect(htmlAr).toContain(complianceConfig.crNumber);
    expect(htmlAr).toContain(complianceConfig.licenseNumber);
    expect(htmlAr).toContain('بيرغندي');

    const htmlEn = renderToString(<LegalFooter lang="en" />);
    expect(htmlEn).toContain(complianceConfig.crNumber);
    expect(htmlEn).toContain(complianceConfig.licenseNumber);
    expect(htmlEn).toContain('BURGUNDY');
  });

  it('contains comprehensive bilingual policy content for returns, shipping, privacy, terms', () => {
    expect(policies.returns.ar.title).toBeDefined();
    expect(policies.returns.en.title).toBeDefined();
    expect(policies.shipping.ar.sections.length).toBeGreaterThan(0);
    expect(policies.privacy.ar.sections.length).toBeGreaterThan(0);
    expect(policies.terms.ar.sections.length).toBeGreaterThan(0);
  });

  it('generates a unique compliant complaint ticket ID', () => {
    const ticketId = generateComplaintTicket();
    expect(ticketId).toMatch(/^QA-COMP-\d{6}$/);
  });
});
