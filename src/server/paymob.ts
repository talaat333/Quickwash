/**
 * Paymob (Egypt) — CURRENT flow: Payment Intention + Unified Checkout.
 * Server-only. Secrets are read from server environment variables and NEVER
 * exposed to the browser.
 *
 * Flow:
 *   1) POST /v1/intention/  (Authorization: Token <SECRET_KEY>)  -> client_secret
 *   2) Redirect to  /unifiedcheckout/?publicKey=<PUBLIC_KEY>&clientSecret=<client_secret>
 *   3) Paymob calls our webhook (Transaction Processed Callback) with an `hmac`
 *   4) Paymob redirects the customer back to our return URL with an `hmac`
 *
 * Confirm exact field names against your Paymob dashboard docs before go-live.
 */
import { createHmac, timingSafeEqual } from "node:crypto";

const INTENTION_URL = "https://accept.paymob.com/v1/intention/";
const CHECKOUT_BASE = "https://accept.paymob.com/unifiedcheckout/";

export function paymobConfig() {
  return {
    secretKey: process.env.PAYMOB_SECRET_KEY ?? "",
    publicKey: process.env.PAYMOB_PUBLIC_KEY ?? "",
    integrationId: process.env.PAYMOB_INTEGRATION_ID ?? "",
    hmacSecret: process.env.PAYMOB_HMAC_SECRET ?? "",
  };
}

export function isPaymobConfigured(): boolean {
  const c = paymobConfig();
  return Boolean(c.secretKey && c.publicKey && c.integrationId && c.hmacSecret);
}

export interface IntentionInput {
  amountEGP: number;
  reference: string;
  customer: { fullName: string; phone: string; email?: string };
  itemName: string;
}

export interface IntentionResult {
  clientSecret: string;
  checkoutUrl: string;
}

function splitName(full: string): { first: string; last: string } {
  const parts = full.trim().split(/\s+/);
  if (parts.length === 0) return { first: "NA", last: "NA" };
  if (parts.length === 1) return { first: parts[0], last: "NA" };
  return { first: parts[0], last: parts.slice(1).join(" ") };
}

/** Creates a Payment Intention and returns the Unified Checkout URL. */
export async function createIntention(input: IntentionInput): Promise<IntentionResult> {
  const c = paymobConfig();
  if (!isPaymobConfigured()) throw new Error("PAYMOB_NOT_CONFIGURED");

  const amountCents = Math.round(input.amountEGP * 100);
  const { first, last } = splitName(input.customer.fullName);
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000").replace(/\/$/, "");

  const body = {
    amount: amountCents,
    currency: "EGP",
    payment_methods: [Number(c.integrationId)],
    items: [
      { name: input.itemName, amount: amountCents, description: input.itemName, quantity: 1 },
    ],
    billing_data: {
      first_name: first,
      last_name: last,
      phone_number: input.customer.phone || "+201000000000",
      email: input.customer.email || "customer@quickwash.app",
      apartment: "NA", floor: "NA", street: "NA", building: "NA",
      shipping_method: "NA", postal_code: "NA", city: "Cairo", country: "EG", state: "NA",
    },
    // Where Paymob returns the customer and posts the server-to-server callback.
    // (Also configure these in the Paymob dashboard as a fallback.)
    redirection_url: `${appUrl}/payment/result`,
    notification_url: `${appUrl}/api/payments/webhook`,
    extras: { merchant_reference: input.reference },
    special_reference: input.reference,
  };

  const res = await fetch(INTENTION_URL, {
    method: "POST",
    headers: {
      Authorization: `Token ${c.secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`PAYMOB_INTENTION_FAILED:${res.status}:${detail.slice(0, 500)}`);
  }

  const data = (await res.json()) as { client_secret?: string };
  if (!data.client_secret) throw new Error("PAYMOB_NO_CLIENT_SECRET");

  const checkoutUrl = `${CHECKOUT_BASE}?publicKey=${encodeURIComponent(c.publicKey)}&clientSecret=${encodeURIComponent(data.client_secret)}`;
  return { clientSecret: data.client_secret, checkoutUrl };
}

// ---- HMAC verification (SHA-512 over Paymob's ordered field list) ----

const HMAC_ORDER = [
  "amount_cents", "created_at", "currency", "error_occured", "has_parent_transaction",
  "id", "integration_id", "is_3d_secure", "is_auth", "is_capture", "is_refunded",
  "is_standalone_payment", "is_voided", "order", "owner", "pending",
  "source_data.pan", "source_data.sub_type", "source_data.type", "success",
] as const;

function computeHmac(flat: Record<string, string>): string {
  const c = paymobConfig();
  const concatenated = HMAC_ORDER.map((k) => flat[k] ?? "").join("");
  return createHmac("sha512", c.hmacSecret).update(concatenated).digest("hex");
}

function safeEqualHex(a: string, b: string): boolean {
  const ba = Buffer.from(a.toLowerCase(), "utf8");
  const bb = Buffer.from(b.toLowerCase(), "utf8");
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

/** Verify the server-to-server webhook (JSON body: { obj: {...} }, hmac in query). */
export function verifyWebhookHmac(obj: Record<string, unknown>, providedHmac: string): boolean {
  if (!providedHmac) return false;
  const get = (path: string): string => {
    const val = path.split(".").reduce<unknown>((acc, seg) =>
      acc && typeof acc === "object" ? (acc as Record<string, unknown>)[seg] : undefined, obj);
    if (val === true) return "true";
    if (val === false) return "false";
    if (val === null || val === undefined) return "";
    return String(val);
  };
  const flat: Record<string, string> = {};
  for (const key of HMAC_ORDER) {
    flat[key] = key === "order" ? get("order.id") : get(key);
  }
  return safeEqualHex(computeHmac(flat), providedHmac);
}

/** Verify the customer redirect (Transaction Response Callback: flat query params). */
export function verifyRedirectHmac(params: URLSearchParams): { valid: boolean; success: boolean } {
  const providedHmac = params.get("hmac") ?? "";
  if (!providedHmac) return { valid: false, success: false };
  const flat: Record<string, string> = {};
  for (const key of HMAC_ORDER) flat[key] = params.get(key) ?? "";
  const valid = safeEqualHex(computeHmac(flat), providedHmac);
  const success = (params.get("success") ?? "").toLowerCase() === "true";
  return { valid, success };
}
