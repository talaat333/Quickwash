import Link from "next/link";
import type { SubscriptionPlan } from "@/types/domain";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatEGP } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function SubscriptionCard({ plan }: { plan: SubscriptionPlan }) {
  return (
    <article
      className={cn(
        "ring-premium relative flex flex-col rounded-lg border bg-surface p-8 transition-all duration-300 hover:-translate-y-0.5",
        plan.recommended
          ? "border-brand-primary/50 shadow-card"
          : "border-border hover:border-border-strong hover:shadow-card",
      )}
    >
      {plan.recommended && (
        <div className="absolute -top-3 start-8">
          <StatusBadge tone="brand">الأكثر اختياراً</StatusBadge>
        </div>
      )}
      <h3 className="text-h3 text-text-primary">{plan.name}</h3>
      <div className="mt-4 flex items-end gap-2">
        <span className="numeric text-h1 font-semibold text-text-primary">{formatEGP(plan.monthlyPrice)}</span>
        <span className="mb-2 text-body-sm text-text-secondary">ج.م / شهرياً</span>
      </div>
      <p className="mt-2 text-body-sm text-text-secondary">
        <span className="numeric font-semibold text-brand-primary">{plan.washesPerMonth}</span> غسلات شهرياً
      </p>

      <ul className="mt-6 space-y-3 border-t border-border pt-6">
        {plan.benefits.map((b) => (
          <li key={b} className="flex items-start gap-2.5 text-body-sm text-text-secondary">
            <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            {b}
          </li>
        ))}
      </ul>

      <p className="mt-6 text-caption text-text-muted">
        صلاحية {plan.validity} • عند تجاوز الحد: <span className="numeric">{formatEGP(plan.overLimitPrice)}</span> ج.م للغسلة
      </p>

      <div className="mt-6">
        <Link href={{ pathname: "/subscription", query: { plan: plan.id } }}>
          <Button fullWidth variant={plan.recommended ? "primary" : "outline"} size="lg">
            اشترك الآن
          </Button>
        </Link>
      </div>
    </article>
  );
}
