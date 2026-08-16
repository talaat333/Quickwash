import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { footerNav } from "@/data/navigation";
import { siteConfig } from "@/config/site";

const socials = [
  { key: "instagram", label: "إنستغرام", href: siteConfig.contact.social.instagram },
  { key: "facebook", label: "فيسبوك", href: siteConfig.contact.social.facebook },
  { key: "tiktok", label: "تيك توك", href: siteConfig.contact.social.tiktok },
  { key: "x", label: "إكس", href: siteConfig.contact.social.x },
];

export function Footer() {
  return (
    <footer className="bg-ink text-text-on-ink">
      <div className="mx-auto max-w-content px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo onDark />
            <p className="mt-5 text-body-sm leading-loose text-text-on-ink/70">
              عناية احترافية بسيارتك بتقنية الغسيل الجاف، نصل إليك أينما كنت ونحافظ على سيارتك دون إهدار المياه.
            </p>
          </div>

          <nav aria-label="روابط" className="flex flex-col gap-3">
            <h3 className="mb-1 text-label uppercase tracking-widest text-text-on-ink/50">روابط</h3>
            {footerNav.map((item) => (
              <Link key={item.label} href={item.href} className="text-body-sm text-text-on-ink/80 transition-colors hover:text-brand-secondary">
                {item.label}
              </Link>
            ))}
          </nav>

          <nav aria-label="قانوني" className="flex flex-col gap-3">
            <h3 className="mb-1 text-label uppercase tracking-widest text-text-on-ink/50">قانوني</h3>
            <Link href="/privacy-policy" className="text-body-sm text-text-on-ink/80 transition-colors hover:text-brand-secondary">
              سياسة الخصوصية
            </Link>
            <Link href="/refund-cancellation-policy" className="text-body-sm text-text-on-ink/80 transition-colors hover:text-brand-secondary">
              سياسة الإلغاء والاسترداد
            </Link>
            <Link href="/shipping-delivery-policy" className="text-body-sm text-text-on-ink/80 transition-colors hover:text-brand-secondary">
              سياسة التوصيل والتسليم
            </Link>
          </nav>

          <div className="flex flex-col gap-3">
            <h3 className="mb-1 text-label uppercase tracking-widest text-text-on-ink/50">تواصل</h3>
            <a href={`tel:${siteConfig.contact.phone}`} className="numeric text-body-sm text-text-on-ink/80 transition-colors hover:text-brand-secondary">
              {siteConfig.contact.phone}
            </a>
            <a href={`mailto:${siteConfig.contact.email}`} className="text-body-sm text-text-on-ink/80 transition-colors hover:text-brand-secondary">
              {siteConfig.contact.email}
            </a>
            <div className="mt-2 flex gap-3">
              {socials.map((s) => (
                <a key={s.key} href={s.href} aria-label={s.label} className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-text-on-ink/70 transition-colors hover:border-brand-secondary hover:text-brand-secondary">
                  <span className="text-caption">{s.label.slice(0, 2)}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-caption text-text-on-ink/60 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} {siteConfig.name}. جميع الحقوق محفوظة.</p>
          <div className="flex flex-wrap gap-6">
            <Link href="/privacy-policy" className="transition-colors hover:text-brand-secondary">سياسة الخصوصية</Link>
            <Link href="/refund-cancellation-policy" className="transition-colors hover:text-brand-secondary">الإلغاء والاسترداد</Link>
            <Link href="/shipping-delivery-policy" className="transition-colors hover:text-brand-secondary">التوصيل والتسليم</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
