import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { InvoiceView } from '../src/components/checkout/InvoiceView';
import { createOrderInvoice, calculateCheckoutTotals } from '../src/lib/order-utils';
import { processPayment } from '../src/lib/payment-gateway';

describe('Invoice PDF Generator & Qatar Rails', () => {
  const totals = calculateCheckoutTotals(1650, 'qatar', 0);
  const sampleInvoice = createOrderInvoice({
    orderId: 'ORD-TEST-888',
    customer: {
      name: 'Maha Al-Kuwari (مها الكواري)',
      phone: '+974 5000 0974',
      email: 'maha@example.qa',
      zone: '55',
      street: 'Al Waab St.',
      building: 'Villa 9',
      municipality: 'Al Rayyan',
    },
    items: [
      {
        id: 'sample-001',
        title: 'ثوب حرير مرسوم يدوياً بتدرجات البيرغندي',
        priceQAR: 1650,
        quantity: 1,
        size: 'Free Size (4.5m x 1.15m)',
      },
    ],
    paymentMethod: 'bank_transfer',
    totals,
    receiptImageUrl: 'data:image/jpeg;base64,mockReceiptData',
  });

  it('renders InvoiceView with sequential number, CR, licence, line items and print/PDF action', () => {
    const htmlAr = renderToString(<InvoiceView invoice={sampleInvoice} lang="ar" />);
    expect(htmlAr).toContain(sampleInvoice.invoiceNumber);
    expect(htmlAr).toContain('CR-189420-QA');
    expect(htmlAr).toContain('ECOM-2026-974');
    expect(htmlAr).toContain('1650');
    expect(htmlAr).toContain('QAR');
    expect(htmlAr).toContain('طباعة / حفظ PDF');

    const htmlEn = renderToString(<InvoiceView invoice={sampleInvoice} lang="en" />);
    expect(htmlEn).toContain(sampleInvoice.invoiceNumber);
    expect(htmlEn).toContain('Print / Download PDF');
  });

  it('handles bank transfer with receipt upload and pending verification flag', async () => {
    const payment = await processPayment({
      method: 'bank_transfer',
      amountQAR: 1650,
      orderId: 'ORD-TEST-888',
      receiptImageUrl: 'data:image/jpeg;base64,mockReceiptData',
    });

    expect(payment.success).toBe(true);
    expect(payment.method).toBe('bank_transfer');
    expect(payment.isPendingVerification).toBe(true);
    expect(payment.transactionId).toContain('WIRE-QNB');
  });
});
