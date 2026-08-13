import Link from "next/link";
import type { Service } from "@/types/domain";
import { SmartImage } from "@/components/ui/SmartImage";
import { ServiceArt } from "@/components/illustrations/ServiceArt";
import type { ImageSlot } from "@/config/images";
import { Button } from "@/components/ui/Button";
import { formatEGP, formatDuration, cn } from "@/lib/utils";

const slotFor: Record<Service["id"], ImageSlot> = {
  full: "serviceFull",
  exterior: "serviceExterior",
  interior: "serviceInterior",
  engine: "serviceEngine",
};

export function ServiceCard({ service, featured }: { service: Service; featured?: boolean }) {
  return (
    <article
      className={cn(
        "ring-premium group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
        featured && "lg:flex-row",
      )}
    >
      <div className={cn("relative overflow-hidden", featured ? "lg:w-1/2" : "aspect-[16/10]")}>
        <SmartImage
          slot={slotFor[service.id]}
          overlay
          className={cn(featured && "aspect-[4/3] lg:aspect-auto lg:h-full", "transition-transform duration-700 group-hover:scale-105")}
          fallback={<ServiceArt serviceId={service.id} className="h-full w-full" />}
        />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
          <div className="flex items-center gap-2">
            <span className="rounded-pill bg-white/15 px-3 py-1 text-caption text-white backdrop-blur">
              {formatDuration(service.durationMinutes)}
            </span>
            {service.featured && (
              <span className="rounded-pill bg-brand-secondary px-3 py-1 text-caption font-semibold text-white">الأشمل</span>
            )}
          </div>
        </div>
      </div>

      <div className={cn("flex flex-1 flex-col p-6", featured && "lg:p-10")}>
        <h3 className={cn("text-text-primary", featured ? "text-h2" : "text-h3")}>{service.name}</h3>
        <p className="mt-3 text-body-sm leading-relaxed text-text-secondary">{service.shortDescription}</p>

        <ul className="mt-5 space-y-2">
          {service.inclusions.slice(0, featured ? 4 : 3).map((inc) => (
            <li key={inc} className="flex items-center gap-2.5 text-body-sm text-text-secondary">
              <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-brand-primary" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              {inc}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <div>
            <span className="text-caption text-text-muted">يبدأ من</span>
            <p className="text-h3 text-text-primary">
              <span className="numeric">{formatEGP(service.startingPrice)}</span>
              <span className="ms-1 text-body-sm text-text-secondary">ج.م</span>
            </p>
          </div>
          <Link href={{ pathname: "/booking", query: { service: service.id } }}>
            <Button size={featured ? "lg" : "md"}>اطلب الآن</Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
