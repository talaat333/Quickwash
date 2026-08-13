"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

const schema = z.object({
  name: z.string().min(2, "من فضلك أدخل اسمك"),
  phone: z.string().regex(/^\+?[0-9\s-]{8,15}$/, "رقم هاتف غير صحيح"),
  message: z.string().min(5, "اكتب رسالتك من فضلك"),
});

type ContactValues = z.infer<typeof schema>;

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: ContactValues) {
    // Contact submissions route to the ASP.NET Core backend once the endpoint exists.
    // Kept side-effect-free here; wire to features/customers/api when ready.
    void values;
    await new Promise((r) => setTimeout(r, 600));
    setSent(true);
    reset();
  }

  if (sent) {
    return (
      <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-lg border border-brand-primary/30 bg-brand-primary/5 p-8 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-primary text-text-on-brand">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        </span>
        <h3 className="mt-4 text-h4 text-text-primary">تم إرسال رسالتك</h3>
        <p className="mt-1 text-body-sm text-text-secondary">سنتواصل معك في أقرب وقت.</p>
        <button onClick={() => setSent(false)} className="mt-4 text-body-sm text-brand-primary underline">
          إرسال رسالة أخرى
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg border border-border bg-surface p-6 md:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="الاسم" htmlFor="c-name" error={errors.name?.message} required>
          <Input id="c-name" placeholder="اسمك الكامل" invalid={!!errors.name} {...register("name")} />
        </Field>
        <Field label="رقم الهاتف" htmlFor="c-phone" error={errors.phone?.message} required>
          <Input id="c-phone" inputMode="tel" placeholder="01xxxxxxxxx" className="numeric text-start" invalid={!!errors.phone} {...register("phone")} />
        </Field>
      </div>
      <div className="mt-5">
        <Field label="رسالتك" htmlFor="c-message" error={errors.message?.message} required>
          <Textarea id="c-message" placeholder="كيف يمكننا مساعدتك؟" invalid={!!errors.message} {...register("message")} />
        </Field>
      </div>
      <div className="mt-6">
        <Button type="submit" size="lg" loading={isSubmitting}>إرسال</Button>
      </div>
    </form>
  );
}
