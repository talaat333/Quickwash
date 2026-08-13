import type { Metadata } from "next";
import { WizardHeader } from "@/components/layout/WizardHeader";
import { SubscriptionWizard } from "@/components/subscription/SubscriptionWizard";
import { Container } from "@/components/layout/Container";
import { getPlan } from "@/data/subscriptions";

export const metadata: Metadata = {
  title: "اشترك",
  description: "اختر خطة اشتراك شهرية للعناية المستمرة بسيارتك.",
};

export default function SubscriptionPage({
  searchParams,
}: {
  searchParams: { plan?: string };
}) {
  const raw = searchParams.plan;
  const initialPlan = raw && getPlan(raw) ? raw : undefined;

  return (
    <>
      <WizardHeader />
      <main className="py-12 md:py-16">
        <Container>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h1 className="text-h1 text-text-primary">اشترك في العناية الشهرية</h1>
            <p className="mt-3 text-body-lg text-text-secondary">خطة تناسب استخدامك، وعقد يضمن حقوقك.</p>
          </div>
          <SubscriptionWizard initialPlan={initialPlan} />
        </Container>
      </main>
    </>
  );
}
