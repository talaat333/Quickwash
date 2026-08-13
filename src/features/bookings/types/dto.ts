import type { BookingStatus, PaymentMethod, BookingType } from "@/types/domain";

/** Request DTO sent to POST /api/bookings (backend contract may evolve). */
export interface CreateBookingRequest {
  serviceId: string;
  type: BookingType;
  scheduledAt?: string;
  location: { addressLine: string; city: string; notes?: string };
  vehicle?: {
    brand: string;
    model: string;
    type: string;
    year: number;
    plateNumber: string;
    frontPhotoUrl?: string;
    rearPhotoUrl?: string;
  };
  customer: { fullName: string; phone: string; email?: string };
  paymentMethod: PaymentMethod;
}

export interface CreateBookingResponse {
  id: string;
  status: BookingStatus;
  totalAmount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  /** True when a card payment must be initiated before the booking is confirmed. */
  requiresPayment: boolean;
}
