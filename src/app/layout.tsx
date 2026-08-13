import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { CustomCursor } from "@/components/layout/CustomCursor";

// Self-hosted IBM Plex Sans Arabic (no build-time network dependency).
const arabic = localFont({
  variable: "--font-arabic",
  display: "swap",
  src: [
    { path: "./fonts/ibm-plex-arabic-300.woff2", weight: "300", style: "normal" },
    { path: "./fonts/ibm-plex-arabic-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-arabic-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/ibm-plex-arabic-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/ibm-plex-arabic-700.woff2", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — غسيل سيارات جاف متنقل`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "غسيل سيارات",
    "غسيل سيارات جاف",
    "غسيل سيارات متنقل",
    "غسيل سيارات في المنزل",
    "اشتراك غسيل سيارات",
    "العناية بالسيارات",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — عناية احترافية بسيارتك، أينما كنت`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — غسيل سيارات جاف متنقل`,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#101510",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={siteConfig.locale} dir={siteConfig.dir} className={arabic.variable}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-cursor focus:rounded-md focus:bg-brand-primary focus:px-4 focus:py-2 focus:text-text-on-brand"
        >
          تخطَّ إلى المحتوى
        </a>
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
