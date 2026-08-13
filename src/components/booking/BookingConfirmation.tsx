import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function BookingConfirmation({ bookingId, immediate }: { bookingId: string; immediate: boolean }) {
  return (
    <div className="mx-auto max-w-lg text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-primary text-text-on-brand">
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>
      <h1 className="mt-6 text-h2 text-text-primary">تم تأكيد طلبك</h1>
      <p className="mt-3 text-body-lg text-text-secondary">
        {immediate
          ? "سيصل فريقنا إليك خلال 60 دقيقة تقريباً."
          : "سنتواصل معك لتأكيد الموعد قبل الوصول."}
      </p>

      {bookingId && (
        <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-pill border border-border bg-surface px-5 py-2.5">
          <span className="text-caption text-text-muted">رقم الطلب</span>
          <span className="numeric text-body-sm font-semibold text-text-primary">{bookingId}</span>
        </div>
      )}

      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link href="/">
          <Button variant="outline" size="lg">العودة للرئيسية</Button>
        </Link>
        <Link href="/#services">
          <Button size="lg">تصفح الخدمات</Button>
        </Link>
      </div>
    </div>
  );
}
