import { Suspense } from "react";
import { PaymentResultClient } from "@/components/payment/PaymentResultClient";

export const metadata = {
  title: "نتيجة الدفع | QuickWash",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function PaymentResultPage() {
  return (
    <Suspense fallback={null}>
      <PaymentResultClient />
    </Suspense>
  );
}
