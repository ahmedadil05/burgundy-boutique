export type PaymentMethod = 'card' | 'qpay' | 'fawran' | 'cod';

export interface PaymentRequest {
  method: PaymentMethod;
  amountQAR: number;
  orderId: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
  cardHolder?: string;
  fawranAlias?: string; // Qatar mobile number or alias
}

export interface PaymentResponse {
  success: boolean;
  transactionId: string;
  method: PaymentMethod;
  amountQAR: number;
  message: string;
  timestamp: string;
}

export interface PaymentGatewayAdapter {
  process(req: PaymentRequest): Promise<PaymentResponse>;
}

// Qatar Payment Gateway Simulator Implementation
export class QatarPaymentGatewaySimulator implements PaymentGatewayAdapter {
  async process(req: PaymentRequest): Promise<PaymentResponse> {
    // Simulate brief network roundtrip
    await new Promise((resolve) => setTimeout(resolve, 300));

    const txnPrefix =
      req.method === 'fawran'
        ? 'FAWRAN-QCB'
        : req.method === 'qpay'
        ? 'QPAY-NAPS'
        : req.method === 'card'
        ? 'QNB-GATEWAY'
        : 'COD-AUTH';

    const randomSuffix = Math.floor(10000000 + Math.random() * 90000000);

    return {
      success: true,
      transactionId: `${txnPrefix}-${randomSuffix}`,
      method: req.method,
      amountQAR: req.amountQAR,
      message:
        req.method === 'cod'
          ? 'Order confirmed with Cash on Delivery authorization'
          : 'Payment authorized successfully under Qatar banking network',
      timestamp: new Date().toISOString(),
    };
  }
}

// Default active gateway instance
export const defaultPaymentGateway = new QatarPaymentGatewaySimulator();

export async function processPayment(req: PaymentRequest): Promise<PaymentResponse> {
  return defaultPaymentGateway.process(req);
}
