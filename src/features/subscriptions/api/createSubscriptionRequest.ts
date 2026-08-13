import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { CreateSubscriptionRequest, CreateSubscriptionResponse } from "../types/dto";

/**
 * Submits a subscription REQUEST. This does NOT activate a subscription.
 * The backend starts the physical contract lifecycle
 * (request_submitted → ... → active).
 */
export function createSubscriptionRequest(
  payload: CreateSubscriptionRequest,
): Promise<CreateSubscriptionResponse> {
  return apiClient.post<CreateSubscriptionResponse>(endpoints.subscriptions, payload);
}
