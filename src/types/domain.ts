/* ============================================================
   DOMAIN MODELS (UI layer)
   Shared, backend-agnostic shapes used across features.
   API DTOs live next to their feature api/ modules and are
   mapped to these models via adapters.
   ============================================================ */

export type ServiceId = "full" | "exterior" | "interior" | "engine";

export interface Service {
  id: ServiceId;
  name: string;
  shortDescription: string;
  /** Starting price in EGP */
  startingPrice: number;
  /** Estimated duration in minutes */
  durationMinutes: number;
  inclusions: string[];
  /** Whether this service requires vehicle photos at booking time */
  requiresPhotos: boolean;
  featured?: boolean;
  image: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  washesPerMonth: number;
  includedServices: ServiceId[];
  benefits: string[];
  /** e.g. "شهر واحد" */
  validity: string;
  /** Extra-charge price applied when the plan limit is consumed (EGP) */
  overLimitPrice: number;
  recommended?: boolean;
  terms: string[];
}

export type BookingType = "now" | "scheduled";
export type PaymentMethod = "cash" | "card";

export type BookingStatus =
  | "received"
  | "on_the_way"
  | "in_progress"
  | "completed"
  | "cancelled";

export type SubscriptionRequestStatus =
  | "request_submitted"
  | "contract_preparing"
  | "contract_out_for_delivery"
  | "awaiting_signature"
  | "awaiting_collection"
  | "contract_under_review"
  | "pending_activation"
  | "active";

export type PaymentStatus =
  | "idle"
  | "processing"
  | "pending"
  | "succeeded"
  | "failed";

export interface Vehicle {
  brand: string;
  model: string;
  type: string;
  year: number;
  plateNumber: string;
  frontPhotoUrl?: string;
  rearPhotoUrl?: string;
}

export interface Customer {
  fullName: string;
  phone: string;
  email?: string;
}

export interface AddressLocation {
  label?: string;
  addressLine: string;
  city: string;
  notes?: string;
  lat?: number;
  lng?: number;
}

export interface Booking {
  id: string;
  serviceId: ServiceId;
  type: BookingType;
  scheduledAt?: string; // ISO
  location: AddressLocation;
  vehicle?: Vehicle;
  customer: Customer;
  paymentMethod: PaymentMethod;
  totalAmount: number;
  status: BookingStatus;
}

export interface SubscriptionRequest {
  id: string;
  planId: string;
  customer: Customer;
  deliveryAddress: AddressLocation;
  status: SubscriptionRequestStatus;
  agreedToTerms: boolean;
}

export interface Review {
  id: string;
  name: string;
  rating: number; // 1..5
  text: string;
  service: string;
  avatar?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
