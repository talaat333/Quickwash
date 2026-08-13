/**
 * IMAGE SLOTS
 * -----------
 * Each visual slot maps to a real photograph. On your machine the `remote`
 * photo loads immediately (Unsplash is whitelisted in next.config.mjs).
 *
 * To use your OWN photos instead of the remote ones:
 *   1) drop a file at the `local` path (inside /public), e.g. /images/hero/main.jpg
 *   2) it will be preferred automatically.
 *
 * If a photo is missing or fails to load, the UI falls back to a premium
 * branded illustration — so the layout never looks broken.
 *
 * The remote URLs below are curated automotive / detailing photos from Unsplash
 * (free to use under the Unsplash License). Verify each fits your brand and
 * swap freely. Keep the waterless theme in mind — avoid wet-wash imagery.
 */

export type ImageSlot =
  | "heroCar"
  | "aboutInterior"
  | "serviceFull"
  | "serviceExterior"
  | "serviceInterior"
  | "serviceEngine"
  | "benefitFeature"
  | "appContext";

interface SlotConfig {
  remote: string;
  local: string;
  alt: string;
  credit?: string;
}

const U = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const imageSlots: Record<ImageSlot, SlotConfig> = {
  heroCar: {
    remote: U("photo-1503376780353-7e6692767b70", 1600), // dark luxury car, 3/4
    local: "/images/hero/main.jpg",
    alt: "سيارة فاخرة بعد عناية احترافية",
    credit: "Unsplash",
  },
  aboutInterior: {
    remote: U("photo-1449965408869-eaa3f722e40d", 1200), // premium car interior
    local: "/images/about/interior.jpg",
    alt: "مقصورة سيارة نظيفة ولامعة",
    credit: "Unsplash",
  },
  serviceFull: {
    remote: U("photo-1552519507-da3b142c6e3d", 1200), // sleek sports car
    local: "/images/services/full.jpg",
    alt: "الباقة المتكاملة للعناية بالسيارة",
    credit: "Unsplash",
  },
  serviceExterior: {
    remote: U("photo-1583121274602-3e2820c69888", 1200), // car exterior detail
    local: "/images/services/exterior.jpg",
    alt: "تنظيف وتلميع خارجي للسيارة",
    credit: "Unsplash",
  },
  serviceInterior: {
    remote: U("photo-1503736334956-4c8f8e92946d", 1200), // dashboard / interior
    local: "/images/services/interior.jpg",
    alt: "تنظيف داخلي للمقصورة",
    credit: "Unsplash",
  },
  serviceEngine: {
    remote: U("photo-1486262715619-67b85e0b08d3", 1200), // engine bay
    local: "/images/services/engine.jpg",
    alt: "تنظيف حجرة المحرك",
    credit: "Unsplash",
  },
  benefitFeature: {
    remote: U("photo-1580273916550-e323be2ae537", 1200), // detailing close-up
    local: "/images/common/detailing.jpg",
    alt: "عناية احترافية بتفاصيل السيارة",
    credit: "Unsplash",
  },
  appContext: {
    remote: U("photo-1511919884226-fd3cad34687c", 1000), // person with phone in car
    local: "/images/app/context.jpg",
    alt: "حجز الخدمة من التطبيق",
    credit: "Unsplash",
  },
};

/** Set NEXT_PUBLIC_USE_REMOTE_IMAGES=false to force local-only (illustration fallback until you add files). */
export const useRemoteImages =
  (process.env.NEXT_PUBLIC_USE_REMOTE_IMAGES ?? "true").toLowerCase() !== "false";
