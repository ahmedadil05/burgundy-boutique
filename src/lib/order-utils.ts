import { complianceConfig } from '../config/compliance';

export interface CheckoutTotals {
  subtotal: number;
  deliveryFee: number;
  total: number;
  isFreeDelivery: boolean;
}

export function calculateCheckoutTotals(
  subtotalQAR: number,
  destination: 'qatar' | 'gcc' = 'qatar'
): CheckoutTotals {
  if (destination === 'gcc') {
    return {
      subtotal: subtotalQAR,
      deliveryFee: complianceConfig.gccDeliveryFlatRateQAR,
      total: subtotalQAR + complianceConfig.gccDeliveryFlatRateQAR,
      isFreeDelivery: false,
    };
  }

  // Domestic Qatar
  const isFree = subtotalQAR >= complianceConfig.freeDeliveryThresholdQAR;
  const fee = isFree ? 0 : complianceConfig.domesticDeliveryFlatRateQAR;

  return {
    subtotal: subtotalQAR,
    deliveryFee: fee,
    total: subtotalQAR + fee,
    isFreeDelivery: isFree,
  };
}

export interface OrderInvoice {
  orderId: string;
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
  };
  items: Array<{
    id: string;
    title: string;
    priceQAR: number;
    quantity: number;
    size: string;
  }>;
  paymentMethod: 'card' | 'qpay' | 'fawran' | 'cod';
  totals: CheckoutTotals;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered';
}

export function createOrderInvoice(params: {
  orderId: string;
  customer: OrderInvoice['customer'];
  items: OrderInvoice['items'];
  paymentMethod: OrderInvoice['paymentMethod'];
  totals: CheckoutTotals;
}): OrderInvoice {
  return {
    orderId: params.orderId,
    orderDate: new Date().toISOString(),
    legalEntityName: complianceConfig.legalEntityName,
    crNumber: complianceConfig.crNumber,
    licenseNumber: complianceConfig.licenseNumber,
    mociReference: complianceConfig.mociDecisionReference,
    customer: params.customer,
    items: params.items,
    paymentMethod: params.paymentMethod,
    totals: params.totals,
    status: 'confirmed',
  };
}
