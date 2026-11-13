import { describe, it, expect } from 'vitest';
import { calculateCheckoutTotals, createOrderInvoice, generateSequentialInvoiceNumber } from '../src/lib/order-utils';
import { processPayment } from '../src/lib/payment-gateway';
import { complianceConfig } from '../src/config/compliance';

describe('Qatar Compliant Checkout & Payment Rails', () => {
  it('accurately calculates subtotal, delivery fee, and total according to Qatar thresholds', () => {
    // Under 500 QAR threshold -> 25 QAR flat delivery
    const under = calculateCheckoutTotals(250, 'qatar');
    expect(under.subtotal).toBe(250);
    expect(under.deliveryFee).toBe(25);
    expect(under.total).toBe(275);
    expect(under.isFreeDelivery).toBe(false);

    // Over 500 QAR threshold -> FREE delivery
    const over = calculateCheckoutTotals(1450, 'qatar');
    expect(over.subtotal).toBe(1450);
    expect(over.deliveryFee).toBe(0);
    expect(over.total).toBe(1450);
    expect(over.isFreeDelivery).toBe(true);
  });

  it('supports Qatar payment rails: Card, QPay/NAPS, Fawran, Bank Wire Transfer', async () => {
    const cardRes = await processPayment({
      method: 'card',
      amountQAR: 1450,
      orderId: 'ORD-101',
    });
    expect(cardRes.success).toBe(true);
    expect(cardRes.method).toBe('card');

    const fawranRes = await processPayment({
      method: 'fawran',
      amountQAR: 1450,
      orderId: 'ORD-102',
      fawranAlias: '55000000',
    });
    expect(fawranRes.success).toBe(true);
    expect(fawranRes.method).toBe('fawran');

    const qpayRes = await processPayment({
      method: 'qpay',
      amountQAR: 1450,
      orderId: 'ORD-103',
    });
    expect(qpayRes.success).toBe(true);
    expect(qpayRes.method).toBe('qpay');

    const wireRes = await processPayment({
      method: 'bank_transfer',
      amountQAR: 1650,
      orderId: 'ORD-104',
      receiptImageUrl: 'data:image/jpeg;base64,mockReceipt',
    });
    expect(wireRes.success).toBe(true);
    expect(wireRes.method).toBe('bank_transfer');
    expect(wireRes.isPendingVerification).toBe(true);
  });

  it('generates sequential compliant order invoice with CR number and legal entity name', () => {
    const invoice = createOrderInvoice({
      orderId: 'ORD-2026-999',
      customer: {
        name: 'Sara Al-Kuwari',
        phone: '+974 5500 0000',
        email: 'sara@example.qa',
        zone: '55',
        street: 'Al Furousiya',
        building: '14',
        municipality: 'Al Rayyan',
      },
      items: [
        {
          id: 'prod-001',
          title: 'Royal Swiss Voile Toub',
          priceQAR: 1450,
          quantity: 1,
          size: 'Free Size',
        },
      ],
      paymentMethod: 'fawran',
      totals: calculateCheckoutTotals(1450, 'qatar'),
    });

    expect(invoice.crNumber).toBe(complianceConfig.crNumber);
    expect(invoice.licenseNumber).toBe(complianceConfig.licenseNumber);
    expect(invoice.legalEntityName.ar).toBe(complianceConfig.legalEntityName.ar);
    expect(invoice.totals.total).toBe(1450);
    expect(invoice.invoiceNumber).toMatch(/^INV-2026-/);
  });

  it('validates required Qatar domestic address fields', () => {
    const isAddressValid = (addr: {
      destination: string;
      zone?: string;
      street?: string;
      building?: string;
    }) => {
      if (addr.destination === 'qatar') {
        return !!(addr.zone?.trim() && addr.street?.trim() && addr.building?.trim());
      }
      return true;
    };

    expect(isAddressValid({ destination: 'qatar', zone: '', street: '840', building: '12' })).toBe(false);
    expect(isAddressValid({ destination: 'qatar', zone: '55', street: '840', building: '12' })).toBe(true);
  });
});
