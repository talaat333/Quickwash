import { NextResponse } from "next/server";
import { getPlan } from "@/data/subscriptions";
import { subscriptionReference } from "@/server/references";
import { append } from "@/server/store";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ code: "VALIDATION_ERROR", message: "Invalid JSON" }, { status: 400 });
  }

  const planId = String(body.planId ?? "");
  const plan = getPlan(planId);
  if (!plan) {
    return NextResponse.json({ code: "PLAN_NOT_FOUND", message: "Unknown plan" }, { status: 400 });
  }
  if (!body.agreedToTerms) {
    return NextResponse.json({ code: "VALIDATION_ERROR", message: "Terms must be accepted" }, { status: 400 });
  }

  const reference = subscriptionReference();

  // A subscription REQUEST — never activates immediately (paper contract lifecycle).
  await append("subscriptions.json", {
    reference,
    planId,
    planName: plan.name,
    status: "request_submitted",
    customer: body.customer ?? null,
    deliveryAddress: body.deliveryAddress ?? null,
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ id: reference, reference, status: "request_submitted" }, { status: 201 });
}
