"use client";

import { useMemo, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import type { FieldPath } from "react-hook-form";

import { Stepper } from "@/components/ui/Stepper";
import { Button } from "@/components/ui/Button";
import { getService } from "@/data/services";
import { createBooking } from "@/features/bookings/api/createBooking";
import { createPaymentSession } from "@/features/payments/api/createPaymentSession";
import { ApiError, NetworkError } from "@/lib/api/client";
import { bookingDefaults } from "@/features/bookings/types/form";
import type { BookingFormData } from "@/features/bookings/types/form";
import type { ServiceId } from "@/types/domain";

import { ServiceStep } from "./steps/ServiceStep";
import { ScheduleStep } from "./steps/ScheduleStep";
import { VehicleStep } from "./steps/VehicleStep";
import { CustomerStep } from "./steps/CustomerStep";
import { ReviewStep } from "./steps/ReviewStep";
import { PaymentStep } from "./steps/PaymentStep";
import { BookingConfirmation } from "./BookingConfirmation";
import { RequestFailed } from "@/components/system/RequestFailed";

const steps = [
  { id: "service", label: "الخدمة" },
  { id: "schedule", label: "الموقع والموعد" },
  { id: "vehicle", label: "السيارة" },
  { id: "customer", label: "بياناتك" },
  { id: "review", label: "المراجعة" },
  { id: "payment", label: "الدفع" },
] as const;

// Fields validated when leaving each step.
const stepFields: Record<number, FieldPath<BookingFormData>[]> = {
  0: ["serviceId"],
  1: ["type", "date", "time", "location.addressLine", "location.city"],
  2: ["vehicle.brand", "vehicle.model", "vehicle.bodyType", "vehicle.year", "vehicle.plateNumber"],
  3: ["customer.fullName", "customer.phone", "customer.email"],
  4: [],
  5: ["paymentMethod"],
};

type Phase = "form" | "success" | "error";

export function BookingWizard({ initialService }: { initialService?: ServiceId }) {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<Phase>("form");
  const [confirmedId, setConfirmedId] = useState<string>("");
  const [errorKind, setErrorKind] = useState<"network" | "server">("server");

  const methods = useForm<BookingFormData>({
    defaultValues: { ...bookingDefaults, serviceId: initialService ?? "" },
    mode: "onTouched",
  });

  const serviceId = methods.watch("serviceId");
  const bookingType = methods.watch("type");
  const service = useMemo(() => (serviceId ? getService(serviceId) : undefined), [serviceId]);

  async function next() {
    const fields = stepFields[step];
    const valid = await methods.trigger(fields, { shouldFocus: true });
    if (!valid) return;
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function goto(target: number) {
    setStep(target);
  }

  async function submit() {
    const valid = await methods.trigger(stepFields[5]);
    if (!valid) return;
    const v = methods.getValues();
    try {
      const res = await createBooking({
        serviceId: v.serviceId as ServiceId,
        type: v.type,
        scheduledAt: v.type === "scheduled" && v.date && v.time ? `${v.date}T${v.time}` : undefined,
        location: { addressLine: v.location.addressLine, city: v.location.city, notes: v.location.notes },
        vehicle: {
          brand: v.vehicle.brand,
          model: v.vehicle.model,
          type: v.vehicle.bodyType,
          year: Number(v.vehicle.year),
          plateNumber: v.vehicle.plateNumber,
          frontPhotoUrl: v.vehicle.frontPhotoUrl || undefined,
          rearPhotoUrl: v.vehicle.rearPhotoUrl || undefined,
        },
        customer: { fullName: v.customer.fullName, phone: v.customer.phone, email: v.customer.email || undefined },
        paymentMethod: v.paymentMethod as "cash" | "card",
      });

      // Card bookings with a payable amount go through Paymob before confirmation.
      if (res.requiresPayment) {
        const session = await createPaymentSession({
          serviceId: v.serviceId as ServiceId,
          bookingRef: res.id,
          customer: {
            fullName: v.customer.fullName,
            phone: v.customer.phone,
            email: v.customer.email || undefined,
          },
        });
        if (session.checkoutUrl) {
          window.location.href = session.checkoutUrl;
          return;
        }
      }

      setConfirmedId(res.id);
      setPhase("success");
    } catch (err) {
      setErrorKind(err instanceof NetworkError ? "network" : "server");
      // Backend runs in this same app. A failure here is a real error (e.g. Paymob
      // not configured) — we surface a clear failure state rather than a fake success.
      if (err instanceof ApiError || err instanceof NetworkError) {
        setPhase("error");
      } else {
        setPhase("error");
      }
    }
  }

  if (phase === "success") {
    return <BookingConfirmation bookingId={confirmedId} immediate={bookingType === "now"} />;
  }

  if (phase === "error") {
    return (
      <RequestFailed
        variant={errorKind}
        onRetry={() => {
          setPhase("form");
          setStep(5);
        }}
      />
    );
  }

  const isLast = step === steps.length - 1;

  return (
    <FormProvider {...methods}>
      <div className="mx-auto max-w-2xl">
        <Stepper steps={steps as unknown as { id: string; label: string }[]} current={step} />

        <div className="mt-10 min-h-[360px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {step === 0 && <ServiceStep />}
              {step === 1 && <ScheduleStep />}
              {step === 2 && <VehicleStep service={service} />}
              {step === 3 && <CustomerStep />}
              {step === 4 && <ReviewStep service={service} onEdit={goto} />}
              {step === 5 && <PaymentStep service={service} />}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-between gap-4 border-t border-border pt-6">
          <Button variant="ghost" onClick={back} disabled={step === 0}>
            السابق
          </Button>
          {isLast ? (
            <Button onClick={submit} loading={methods.formState.isSubmitting} size="lg">
              تأكيد الطلب
            </Button>
          ) : (
            <Button onClick={next} size="lg">
              التالي
            </Button>
          )}
        </div>
      </div>
    </FormProvider>
  );
}
