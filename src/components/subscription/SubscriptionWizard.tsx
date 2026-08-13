"use client";

import { useMemo, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import type { FieldPath } from "react-hook-form";

import { Stepper } from "@/components/ui/Stepper";
import { Button } from "@/components/ui/Button";
import { getPlan } from "@/data/subscriptions";
import { createSubscriptionRequest } from "@/features/subscriptions/api/createSubscriptionRequest";
import { NetworkError } from "@/lib/api/client";
import { subscriptionDefaults } from "@/features/subscriptions/types/form";
import type { SubscriptionFormData } from "@/features/subscriptions/types/form";

import { PlanStep } from "./steps/PlanStep";
import { SubCustomerStep } from "./steps/SubCustomerStep";
import { DeliveryAddressStep } from "./steps/DeliveryAddressStep";
import { ContractStep } from "./steps/ContractStep";
import { SubReviewStep } from "./steps/SubReviewStep";
import { SubscriptionConfirmation } from "./SubscriptionConfirmation";
import { RequestFailed } from "@/components/system/RequestFailed";

const steps = [
  { id: "plan", label: "الخطة" },
  { id: "customer", label: "بياناتك" },
  { id: "address", label: "عنوان التسليم" },
  { id: "contract", label: "العقد" },
  { id: "review", label: "المراجعة" },
] as const;

const stepFields: Record<number, FieldPath<SubscriptionFormData>[]> = {
  0: ["planId"],
  1: ["customer.fullName", "customer.phone", "customer.email"],
  2: ["deliveryAddress.addressLine", "deliveryAddress.city"],
  3: [],
  4: ["agreedToTerms"],
};

type Phase = "form" | "success" | "error";

export function SubscriptionWizard({ initialPlan }: { initialPlan?: string }) {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<Phase>("form");
  const [confirmedId, setConfirmedId] = useState("");
  const [errorKind, setErrorKind] = useState<"network" | "server">("server");

  const methods = useForm<SubscriptionFormData>({
    defaultValues: { ...subscriptionDefaults, planId: initialPlan ?? "" },
    mode: "onTouched",
  });

  const planId = methods.watch("planId");
  const plan = useMemo(() => (planId ? getPlan(planId) : undefined), [planId]);

  async function next() {
    const valid = await methods.trigger(stepFields[step], { shouldFocus: true });
    if (!valid) return;
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function submit() {
    const valid = await methods.trigger(stepFields[4]);
    if (!valid) return;
    const v = methods.getValues();
    try {
      const res = await createSubscriptionRequest({
        planId: v.planId,
        customer: { fullName: v.customer.fullName, phone: v.customer.phone, email: v.customer.email || undefined },
        deliveryAddress: {
          addressLine: v.deliveryAddress.addressLine,
          city: v.deliveryAddress.city,
          notes: v.deliveryAddress.notes,
        },
        agreedToTerms: v.agreedToTerms,
      });
      setConfirmedId(res.id);
      setPhase("success");
    } catch (err) {
      setErrorKind(err instanceof NetworkError ? "network" : "server");
      setPhase("error");
    }
  }

  if (phase === "success") return <SubscriptionConfirmation requestId={confirmedId} />;
  if (phase === "error")
    return (
      <RequestFailed
        variant={errorKind}
        onRetry={() => {
          setPhase("form");
          setStep(4);
        }}
      />
    );

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
              {step === 0 && <PlanStep />}
              {step === 1 && <SubCustomerStep />}
              {step === 2 && <DeliveryAddressStep />}
              {step === 3 && <ContractStep />}
              {step === 4 && <SubReviewStep plan={plan} />}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-between gap-4 border-t border-border pt-6">
          <Button variant="ghost" onClick={back} disabled={step === 0}>السابق</Button>
          {isLast ? (
            <Button onClick={submit} loading={methods.formState.isSubmitting} size="lg">إرسال طلب الاشتراك</Button>
          ) : (
            <Button onClick={next} size="lg">التالي</Button>
          )}
        </div>
      </div>
    </FormProvider>
  );
}
