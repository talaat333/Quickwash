import { randomBytes } from "node:crypto";

function token(len = 8): string {
  // Uppercase base32-ish, unambiguous.
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = randomBytes(len);
  let out = "";
  for (let i = 0; i < len; i++) out += alphabet[bytes[i] % alphabet.length];
  return out;
}

export const bookingReference = () => `QW-BOOK-${token(8)}`;
export const paymentReference = () => `QW-PAY-${token(8)}`;
export const subscriptionReference = () => `QW-SUB-${token(8)}`;
