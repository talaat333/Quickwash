import { NextResponse } from "next/server";
import { verifyRedirectHmac } from "@/server/paymob";
import { upsertByKey } from "@/server/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Verifies the Paymob customer-redirect callback SERVER-SIDE.
 * The browser sends back the raw redirect query string; we recompute the HMAC
 * with the server-only secret and only then decide success/failed/pending.
 * A missing/invalid HMAC is never treated as success.
 */
export async function POST(req: Request) {
  let search = "";
  try {
    const body = (await req.json()) as { search?: string };
    search = typeof body.search === "string" ? body.search : "";
  } catch {
    return NextResponse.json({ status: "invalid" }, { status: 400 });
  }

  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  if (!params.has("hmac")) return NextResponse.json({ status: "unknown" });

  const { valid, success } = verifyRedirectHmac(params);
  if (!valid) return NextResponse.json({ status: "invalid" });

  const pending = (params.get("pending") ?? "").toLowerCase() === "true";
  const status = success ? "paid" : pending ? "pending" : "failed";

  // Best-effort: record the verified outcome against our merchant reference.
  const ref = params.get("merchant_order_id") ?? params.get("order") ?? "";
  if (ref) {
    await upsertByKey("payments.json", "reference", ref, {
      status,
      transactionId: params.get("id") ?? "",
      updatedAt: new Date().toISOString(),
    });
  }

  return NextResponse.json({ status });
}
