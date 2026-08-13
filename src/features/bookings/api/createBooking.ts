import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { CreateBookingRequest, CreateBookingResponse } from "../types/dto";

/** Create a booking via the same-app Next.js route. Server computes the amount. */
export function createBooking(payload: CreateBookingRequest): Promise<CreateBookingResponse> {
  return apiClient.post<CreateBookingResponse>(endpoints.bookings, payload);
}
