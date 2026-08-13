import type { ServiceId, BookingType, PaymentMethod } from "@/types/domain";

/** Flat shape used by the wizard's react-hook-form instance. */
export interface BookingFormData {
  serviceId: ServiceId | "";
  type: BookingType;
  date?: string;
  time?: string;
  location: {
    addressLine: string;
    city: string;
    notes?: string;
  };
  vehicle: {
    brand: string;
    model: string;
    bodyType: string;
    year: string; // kept as string for the input; coerced on submit
    plateNumber: string;
    frontPhotoUrl?: string;
    rearPhotoUrl?: string;
  };
  customer: {
    fullName: string;
    phone: string;
    email?: string;
  };
  paymentMethod: PaymentMethod | "";
}

export const bookingDefaults: BookingFormData = {
  serviceId: "",
  type: "now",
  date: "",
  time: "",
  location: { addressLine: "", city: "", notes: "" },
  vehicle: { brand: "", model: "", bodyType: "", year: "", plateNumber: "", frontPhotoUrl: "", rearPhotoUrl: "" },
  customer: { fullName: "", phone: "", email: "" },
  paymentMethod: "",
};

export type BookingStepId = "service" | "schedule" | "vehicle" | "customer" | "review" | "payment";
