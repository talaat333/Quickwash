import { NextResponse } from "next/server";
import { findBy } from "@/server/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Best-effort status lookup from the MVP store (updated by the webhook).
 * The authoritative success signal for the UI is the HMAC-verified redirect
 * handled on /payment/result — this endpoint is a convenience for local testing.
 */
export async function GET(req: Request) {
  const ref = new URL(req.url).searchParams.get("ref");
  if (!ref) return NextResponse.json({ code: "VALIDATION_ERROR", message: "ref required" }, { status: 400 });

  const record = await findBy("payments.json", (r) => r.reference === ref);
  if (!record) return NextResponse.json({ reference: ref, status: "unknown" });

  return NextResponse.json({ reference: ref, status: record.status ?? "unknown" });
}
