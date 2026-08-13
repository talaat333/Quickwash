import { Section } from "@/components/layout/Section";
import { Accordion } from "@/components/ui/Accordion";
import { faqItems } from "@/data/faq";

export function Faq() {
  return (
    <Section id="faq" eyebrow="الأسئلة الشائعة" title="كل ما تريد معرفته" className="bg-surface">
      <div className="max-w-3xl">
        <Accordion items={faqItems} />
      </div>
    </Section>
  );
}
