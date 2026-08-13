/**
 * Same-origin Next.js route handlers (this is one full-stack app — no external API).
 */
export const endpoints = {
  bookings: "/api/bookings",
  subscriptions: "/api/subscriptions",
  paymentsCreate: "/api/payments/create",
  paymentStatus: (ref: string) => `/api/payments/status?ref=${encodeURIComponent(ref)}`,
} as const;
