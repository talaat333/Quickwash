"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

type View = "verifying" | "success" | "failed" | "pending" | "unknown";

export function PaymentResultClient() {
  const [view, setView] = useState<View>("verifying");

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        // Send the raw redirect query to the server, which verifies Paymob's HMAC.
        const res = await fetch("/api/payments/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ search: window.location.search }),
        });
        const data = (await res.json()) as { status?: string };
        if (!active) return;
        switch (data.status) {
          case "paid": setView("success"); break;
          case "failed": setView("failed"); break;
          case "pending": setView("pending"); break;
          default: setView("unknown");
        }
      } catch {
        if (active) setView("unknown");
      }
    })();
    return () => { active = false; };
  }, []);

  if (view === "verifying") {
    return (
      <Wrap>
        <span className="mx-auto block h-12 w-12 animate-spin rounded-full border-4 border-brand-primary/25 border-t-brand-primary" />
        <h1 className="mt-6 text-h2 text-text-primary">جارٍ التحقق من الدفع…</h1>
        <p className="mt-3 text-body text-text-secondary">نؤكد حالة الدفع من الخادم مباشرةً. لا تُغلق الصفحة.</p>
      </Wrap>
    );
  }

  const content: Record<Exclude<View, "verifying">, { badge: Tone; title: string; body: string }> = {
    success: { badge: "success", title: "تم الدفع بنجاح", body: "تم تأكيد حجزك. ستصلك تفاصيل الموعد قريباً." },
    failed: { badge: "error", title: "فشل الدفع", body: "لم يكتمل الدفع. يمكنك المحاولة مرة أخرى — لم يتم تأكيد أي خصم." },
    pending: { badge: "muted", title: "الدفع قيد التأكيد", body: "نؤكد معاملتك الآن. سنحدّث حالة طلبك تلقائياً عند اكتمالها." },
    unknown: { badge: "muted", title: "لا يمكن التحقق من نتيجة الدفع", body: "لم نتمكن من التحقق من صحة رد الدفع. إن كنت قد أتممت الدفع فسنؤكد طلبك قريباً." },
  };
  const c = content[view];

  return (
    <Wrap>
      <Badge tone={c.badge} />
      <h1 className="mt-6 text-h2 text-text-primary">{c.title}</h1>
      <p className="mt-3 text-body text-text-secondary">{c.body}</p>
      <div className="mt-8 flex justify-center gap-3">
        {view === "failed" ? (
          <Link href="/booking"><Button size="lg">إعادة المحاولة</Button></Link>
        ) : (
          <Link href="/"><Button size="lg">العودة للرئيسية</Button></Link>
        )}
        {view === "success" && (
          <Link href="/booking"><Button size="lg" variant="outline">حجز جديد</Button></Link>
        )}
      </div>
    </Wrap>
  );
}

function Wrap({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex min-h-[70vh] items-center justify-center py-20">
      <Container>
        <div className="mx-auto max-w-md text-center">{children}</div>
      </Container>
    </section>
  );
}

type Tone = "success" | "error" | "muted";
function Badge({ tone }: { tone: Tone }) {
  const styles: Record<Tone, string> = {
    success: "bg-brand-primary/10 text-brand-primary",
    error: "bg-red-100 text-red-600",
    muted: "bg-surface-muted text-text-muted",
  };
  const icon = tone === "success" ? "M20 6 9 17l-5-5" : tone === "error" ? "M18 6 6 18M6 6l12 12" : "M12 8v4m0 4h.01";
  return (
    <span className={`mx-auto grid h-16 w-16 place-items-center rounded-full ${styles[tone]}`}>
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d={icon} />
      </svg>
    </span>
  );
}
