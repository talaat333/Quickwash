import type { SubscriptionRequestStatus } from "@/types/domain";

export interface CreateSubscriptionRequest {
  planId: string;
  customer: { fullName: string; phone: string; email?: string };
  deliveryAddress: { addressLine: string; city: string; notes?: string };
  agreedToTerms: boolean;
}

export interface CreateSubscriptionResponse {
  id: string;
  /** Newly created requests start at the beginning of the contract lifecycle. */
  status: SubscriptionRequestStatus;
}
