import { NextResponse } from "next/server";
import { getService } from "@/data/services";
import { bookingReference } from "@/server/references";
import { append } from "@/server/store";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ code: "VALIDATION_ERROR", message: "Invalid JSON" }, { status: 400 });
  }

  const serviceId = String(body.serviceId ?? "");
  const paymentMethod = String(body.paymentMethod ?? "cash");
  const customer = (body.customer ?? {}) as Record<string, unknown>;

  const service = getService(serviceId);
  if (!service) {
    return NextResponse.json({ code: "SERVICE_NOT_FOUND", message: "Unknown service" }, { status: 400 });
  }
  if (!customer.phone) {
    return NextResponse.json({ code: "VALIDATION_ERROR", message: "Customer phone is required" }, { status: 400 });
  }

  // Amount is ALWAYS resolved server-side from config — never trusted from the client.
  const amount = service.startingPrice;
  const reference = bookingReference();
  const requiresPayment = paymentMethod === "card";

  await append("bookings.json", {
    reference,
    serviceId,
    serviceName: service.name,
    amount,
    currency: "EGP",
    paymentMethod,
    status: requiresPayment ? "pending_payment" : "order_received",
    type: body.type ?? "now",
    scheduledAt: body.scheduledAt ?? null,
    location: body.location ?? null,
    vehicle: body.vehicle ?? null,
    customer,
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json(
    { id: reference, reference, status: requiresPayment ? "PendingPayment" : "OrderReceived",
      totalAmount: amount, currency: "EGP", paymentMethod, requiresPayment },
    { status: 201 },
  );
}
