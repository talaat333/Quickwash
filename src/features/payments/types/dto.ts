/** Server resolves the trusted amount from serviceId — the client never sends an amount. */
export interface CreatePaymentSessionRequest {
  serviceId: string;
  bookingRef?: string;
  customer: { fullName: string; phone: string; email?: string };
}

export interface CreatePaymentSessionResponse {
  paymentReference: string;
  /** Paymob Unified Checkout URL to redirect the customer to. */
  checkoutUrl: string;
}
