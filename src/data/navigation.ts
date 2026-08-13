export interface NavItem {
  label: string;
  href: string;
}

/** Anchors on the marketing page. */
export const mainNav: NavItem[] = [
  { label: "الرئيسية", href: "/#home" },
  { label: "خدماتنا", href: "/#services" },
  { label: "من نحن", href: "/#about" },
  { label: "تواصل معنا", href: "/#contact" },
];

export const footerNav: NavItem[] = [
  { label: "الرئيسية", href: "/#home" },
  { label: "من نحن", href: "/#about" },
  { label: "خدماتنا", href: "/#services" },
  { label: "الاشتراكات", href: "/#services" },
  { label: "الأسئلة الشائعة", href: "/#faq" },
  { label: "تواصل معنا", href: "/#contact" },
];
