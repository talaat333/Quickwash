import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "./ContactForm";
import { siteConfig } from "@/config/site";

const channels = [
  { label: "الهاتف", value: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phone}`, numeric: true },
  { label: "واتساب", value: siteConfig.contact.whatsapp, href: `https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}`, numeric: true },
  { label: "البريد الإلكتروني", value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}`, numeric: false },
  { label: "ساعات العمل", value: siteConfig.contact.hours, numeric: false },
];

export function Contact() {
  return (
    <Section id="contact" eyebrow="تواصل معنا" title="نحن هنا لخدمتك" className="bg-background">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={0.04 * i}>
              <div className="rounded-lg border border-border bg-surface p-6">
                <p className="text-label uppercase tracking-widest text-text-muted">{c.label}</p>
                {c.href ? (
                  <a href={c.href} className={`mt-2 block text-body font-medium text-text-primary transition-colors hover:text-brand-primary ${c.numeric ? "numeric" : ""}`}>
                    {c.value}
                  </a>
                ) : (
                  <p className="mt-2 text-body font-medium text-text-primary">{c.value}</p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.08}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
