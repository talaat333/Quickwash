export interface SubscriptionFormData {
  planId: string;
  customer: { fullName: string; phone: string; email?: string };
  deliveryAddress: { addressLine: string; city: string; notes?: string };
  agreedToTerms: boolean;
}

export const subscriptionDefaults: SubscriptionFormData = {
  planId: "",
  customer: { fullName: "", phone: "", email: "" },
  deliveryAddress: { addressLine: "", city: "", notes: "" },
  agreedToTerms: false,
};

export type SubscriptionStepId = "plan" | "customer" | "address" | "contract" | "review";
