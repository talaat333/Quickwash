/** Central site + contact configuration. Non-secret, UI-facing values only. */
export const siteConfig = {
  name: "كويك واش",
  nameEn: "QuickWash",
  tagline: "عناية احترافية بسيارتك، أينما كنت",
  description:
    "خدمة غسيل سيارات جاف متنقل. عناية احترافية بسيارتك بدون إهدار المياه، نصل إليك في المكان والوقت المناسبين.",
  locale: "ar",
  dir: "rtl" as const,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  appStoreUrl: process.env.NEXT_PUBLIC_APP_STORE_URL ?? "#",
  googlePlayUrl: process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL ?? "#",
  contact: {
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+201000000000",
    whatsapp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP ?? "+201000000000",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@quickwash.example",
    hours: "يومياً من 9 صباحاً حتى 11 مساءً",
    social: {
      instagram: "#",
      facebook: "#",
      tiktok: "#",
      x: "#",
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
