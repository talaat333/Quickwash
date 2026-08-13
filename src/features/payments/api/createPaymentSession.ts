import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { CreatePaymentSessionRequest, CreatePaymentSessionResponse } from "../types/dto";

/**
 * Asks our own Next.js server to create a Paymob Payment Intention and return the
 * Unified Checkout URL. The browser never sees Paymob secrets and never sets the amount.
 */
export function createPaymentSession(
  payload: CreatePaymentSessionRequest,
): Promise<CreatePaymentSessionResponse> {
  return apiClient.post<CreatePaymentSessionResponse>(endpoints.paymentsCreate, payload);
}
