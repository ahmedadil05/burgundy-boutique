import { complianceConfig } from '../config/compliance';
import { PaymentMethod } from './payment-gateway';

export interface CheckoutTotals {
  subtotal: number;
  deliveryFee: number;
  taxAmount: number;
  taxPercent: number;
  total: number;
  isFreeDelivery: boolean;
}

export function calculateCheckoutTotals(
  subtotalQAR: number,
  destination: 'qatar' | 'gcc' = 'qatar',
  taxRatePercent = 0
): CheckoutTotals {
  let deliveryFee = 0;

  if (destination === 'gcc') {
    deliveryFee = complianceConfig.gccDeliveryFlatRateQAR;
  } else {
    // Qatar domestic delivery threshold: free over threshold
    const isFree = subtotalQAR >= complianceConfig.freeDeliveryThresholdQAR;
    deliveryFee = isFree ? 0 : complianceConfig.domesticDeliveryFlatRateQAR;
  }

  const taxAmount = (subtotalQAR * taxRatePercent) / 100;
  const total = subtotalQAR + deliveryFee + taxAmount;

  return {
    subtotal: subtotalQAR,
    deliveryFee,
    taxAmount,
    taxPercent: taxRatePercent,
    total,
    isFreeDelivery: deliveryFee === 0,
  };
}

export interface OrderInvoice {
  orderId: string;
  invoiceNumber: string;
  orderDate: string;
  legalEntityName: { ar: string; en: string };
  crNumber: string;
  licenseNumber: string;
  mociReference: string;
  customer: {
    name: string;
    phone: string;
    email: string;
    zone: string;
    street: string;
    building: string;
    municipality: string;
    notes?: string;
  };
  items: Array<{
    id: string;
    title: string;
    priceQAR: number;
    quantity: number;
    size: string;
  }>;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'pending_verification';
  receiptImageUrl?: string;
  totals: CheckoutTotals;
  status: 'pending_verification' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

let nextInvoiceCounter = 1001;

export function generateSequentialInvoiceNumber(): string {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('burgundy_invoice_counter');
      const val = stored ? parseInt(stored, 10) : 1001;
      localStorage.setItem('burgundy_invoice_counter', (val + 1).toString());
      return `INV-2026-${val}`;
    } catch {}
  }
  return `INV-2026-${nextInvoiceCounter++}`;
}

export function createOrderInvoice(params: {
  orderId: string;
  customer: OrderInvoice['customer'];
  items: OrderInvoice['items'];
  paymentMethod: OrderInvoice['paymentMethod'];
  totals: CheckoutTotals;
  receiptImageUrl?: string;
  invoiceNumber?: string;
}): OrderInvoice {
  const paymentStatus = params.paymentMethod === 'bank_transfer'
    ? 'pending_verification'
    : 'paid';

  return {
    orderId: params.orderId,
    invoiceNumber: params.invoiceNumber || generateSequentialInvoiceNumber(),
    orderDate: new Date().toISOString(),
    legalEntityName: complianceConfig.legalEntityName,
    crNumber: complianceConfig.crNumber,
    licenseNumber: complianceConfig.licenseNumber,
    mociReference: complianceConfig.mociDecisionReference,
    customer: params.customer,
    items: params.items,
    paymentMethod: params.paymentMethod,
    paymentStatus,
    receiptImageUrl: params.receiptImageUrl,
    totals: params.totals,
    status: params.paymentMethod === 'bank_transfer' ? 'pending_verification' : 'confirmed',
  };
}
