import { NextResponse } from "next/server";
import { verifyWebhookHmac } from "@/server/paymob";
import { upsertByKey } from "@/server/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Paymob Transaction Processed Callback (server-to-server).
 * Verifies HMAC (query param `hmac`) before trusting anything.
 */
export async function POST(req: Request) {
  const url = new URL(req.url);

  let payload: Record<string, unknown>;
  try {
    payload = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Paymob may deliver the HMAC as a query param or a top-level body field.
  const providedHmac =
    url.searchParams.get("hmac") ?? (typeof payload.hmac === "string" ? payload.hmac : "") ?? "";

  const obj = (payload.obj ?? {}) as Record<string, unknown>;
  if (!verifyWebhookHmac(obj, providedHmac)) {
    return NextResponse.json({ ok: false, error: "invalid_hmac" }, { status: 401 });
  }

  const success = obj.success === true && obj.error_occured !== true && obj.pending !== true;
  const order = (obj.order ?? {}) as Record<string, unknown>;
  const merchantRef = String(order.merchant_order_id ?? obj.special_reference ?? "");
  const transactionId = String(obj.id ?? "");

  // Idempotent-ish upsert keyed by our merchant reference (best-effort store).
  if (merchantRef) {
    await upsertByKey("payments.json", "reference", merchantRef, {
      status: success ? "paid" : "failed",
      transactionId,
      updatedAt: new Date().toISOString(),
    });
  }

  // Always acknowledge a verified callback so Paymob stops retrying.
  return NextResponse.json({ ok: true });
}
