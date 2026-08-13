"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { ServiceCard } from "./ServiceCard";
import { SubscriptionCard } from "./SubscriptionCard";
import { services } from "@/data/services";
import { subscriptionPlans } from "@/data/subscriptions";

type Tab = "services" | "subscriptions";

export function ServicesShowcase() {
  const [tab, setTab] = useState<Tab>("services");
  const [featured, ...rest] = services;

  return (
    <section id="services" className="bg-background py-20 md:py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <header className="max-w-prose">
            <span className="eyebrow-rule mb-3 inline-block text-label uppercase tracking-widest text-brand-primary">خدماتنا</span>
            <h2 className="text-h2 text-balance text-text-primary">اختر ما يناسب سيارتك</h2>
            <p className="mt-4 text-body-lg text-text-secondary">
              غسلة واحدة عند الطلب، أو خطة اشتراك شهرية للعناية المستمرة.
            </p>
          </header>
          <SegmentedControl<Tab>
            aria-label="نوع الخدمة"
            value={tab}
            onChange={setTab}
            segments={[
              { value: "services", label: "الغسلات" },
              { value: "subscriptions", label: "الاشتراكات" },
            ]}
          />
        </div>

        <div className="mt-12">
          <AnimatePresence mode="wait">
            {tab === "services" ? (
              <motion.div
                key="services"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-6"
              >
                <ServiceCard service={featured} featured />
                <div className="grid gap-6 md:grid-cols-3">
                  {rest.map((s) => (
                    <ServiceCard key={s.id} service={s} />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="subscriptions"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-6 md:grid-cols-3"
              >
                {subscriptionPlans.map((p) => (
                  <SubscriptionCard key={p.id} plan={p} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
