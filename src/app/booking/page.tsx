import type { Metadata } from "next";
import { WizardHeader } from "@/components/layout/WizardHeader";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { Container } from "@/components/layout/Container";
import type { ServiceId } from "@/types/domain";
import { getService } from "@/data/services";

export const metadata: Metadata = {
  title: "اطلب غسيل",
  description: "احجز خدمة غسيل سيارات جاف متنقلة في خطوات بسيطة.",
};

const validIds: ServiceId[] = ["full", "exterior", "interior", "engine"];

export default function BookingPage({
  searchParams,
}: {
  searchParams: { service?: string };
}) {
  const raw = searchParams.service;
  const initialService =
    raw && validIds.includes(raw as ServiceId) && getService(raw) ? (raw as ServiceId) : undefined;

  return (
    <>
      <WizardHeader />
      <main className="py-12 md:py-16">
        <Container>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h1 className="text-h1 text-text-primary">احجز غسيل سيارتك</h1>
            <p className="mt-3 text-body-lg text-text-secondary">خطوات بسيطة ونصل إليك أينما كنت.</p>
          </div>
          <BookingWizard initialService={initialService} />
        </Container>
      </main>
    </>
  );
}
