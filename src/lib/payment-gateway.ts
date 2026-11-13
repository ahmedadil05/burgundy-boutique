export type PaymentMethod = 'card' | 'qpay' | 'fawran' | 'bank_transfer';

export interface PaymentRequest {
  method: PaymentMethod;
  amountQAR: number;
  orderId: string;
  receiptImageUrl?: string;
  fawranAlias?: string; // Qatar mobile number or alias
  notes?: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId: string;
  method: PaymentMethod;
  amountQAR: number;
  message: string;
  timestamp: string;
  isPendingVerification?: boolean;
}

export interface PaymentGatewayAdapter {
  process(req: PaymentRequest): Promise<PaymentResponse>;
}

// Swappable Qatar Payment Gateway Adapter (Supports QPay/NAPS, Fawran, Card & Bank Wire)
export class QatarPaymentGatewayAdapter implements PaymentGatewayAdapter {
  async process(req: PaymentRequest): Promise<PaymentResponse> {
    // Brief network roundtrip simulation
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (req.method === 'bank_transfer') {
      return {
        success: true,
        transactionId: `WIRE-QNB-${Date.now().toString(36).toUpperCase()}`,
        method: req.method,
        amountQAR: req.amountQAR,
        message: 'Receipt uploaded successfully. Order set to Pending Verification.',
        timestamp: new Date().toISOString(),
        isPendingVerification: true,
      };
    }

    const txnPrefix =
      req.method === 'fawran'
        ? 'FAWRAN-QCB'
        : req.method === 'qpay'
        ? 'QPAY-NAPS'
        : 'MYFATOORAH-QNB';

    const randomSuffix = Math.floor(10000000 + Math.random() * 90000000);

    return {
      success: true,
      transactionId: `${txnPrefix}-${randomSuffix}`,
      method: req.method,
      amountQAR: req.amountQAR,
      message: 'Payment authorized successfully under Qatar banking network',
      timestamp: new Date().toISOString(),
      isPendingVerification: false,
    };
  }
}

export const defaultPaymentGateway = new QatarPaymentGatewayAdapter();

export async function processPayment(req: PaymentRequest): Promise<PaymentResponse> {
  return defaultPaymentGateway.process(req);
}
