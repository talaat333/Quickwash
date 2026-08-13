import { NextResponse } from "next/server";
import { getService } from "@/data/services";
import { paymentReference } from "@/server/references";
import { createIntention, isPaymobConfigured } from "@/server/paymob";
import { append } from "@/server/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ code: "VALIDATION_ERROR", message: "Invalid JSON" }, { status: 400 });
  }

  const serviceId = String(body.serviceId ?? "");
  const bookingRef = body.bookingRef ? String(body.bookingRef) : undefined;
  const customer = (body.customer ?? {}) as { fullName?: string; phone?: string; email?: string };

  const service = getService(serviceId);
  if (!service) {
    return NextResponse.json({ code: "SERVICE_NOT_FOUND", message: "Unknown service" }, { status: 400 });
  }
  if (!isPaymobConfigured()) {
    return NextResponse.json(
      { code: "PAYMOB_NOT_CONFIGURED", message: "Payment gateway is not configured. Add Paymob env vars." },
      { status: 503 },
    );
  }

  // Trusted amount from server config only.
  const amount = service.startingPrice;
  const reference = paymentReference();

  try {
    const { checkoutUrl } = await createIntention({
      amountEGP: amount,
      reference,
      customer: {
        fullName: customer.fullName ?? "QuickWash Customer",
        phone: customer.phone ?? "",
        email: customer.email,
      },
      itemName: service.name,
    });

    await append("payments.json", {
      reference, bookingRef, serviceId, amount, currency: "EGP",
      status: "pending", provider: "Paymob", createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ paymentReference: reference, checkoutUrl }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "payment_init_failed";
    return NextResponse.json({ code: "PAYMENT_INIT_FAILED", message }, { status: 502 });
  }
}
