import type { Config } from "tailwindcss";

/**
 * All design values are exposed as CSS variables in globals.css and mapped here.
 * Components should reference semantic tokens (bg-surface, text-secondary, ...)
 * rather than hardcoding raw hex values.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        brand: {
          primary: "var(--color-primary)",
          "primary-hover": "var(--color-primary-hover)",
          secondary: "var(--color-secondary)",
        },
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        "surface-muted": "var(--color-surface-muted)",
        "surface-tint": "var(--color-surface-tint)",
        ink: "var(--color-ink)",
        border: "var(--color-border)",
        "border-strong": "var(--color-border-strong)",
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
          "on-brand": "var(--color-text-on-brand)",
          "on-ink": "var(--color-text-on-ink)",
        },
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
        info: "var(--color-info)",
      },
      fontFamily: {
        sans: ["var(--font-arabic)", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["clamp(2.75rem, 6vw, 5rem)", { lineHeight: "1.08", letterSpacing: "-0.01em", fontWeight: "600" }],
        h1: ["clamp(2rem, 4vw, 3.25rem)", { lineHeight: "1.15", letterSpacing: "-0.01em", fontWeight: "600" }],
        h2: ["clamp(1.6rem, 3vw, 2.4rem)", { lineHeight: "1.2", fontWeight: "600" }],
        h3: ["clamp(1.3rem, 2vw, 1.7rem)", { lineHeight: "1.3", fontWeight: "600" }],
        h4: ["1.2rem", { lineHeight: "1.4", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.9" }],
        body: ["1rem", { lineHeight: "1.85" }],
        "body-sm": ["0.9rem", { lineHeight: "1.7" }],
        label: ["0.8125rem", { lineHeight: "1.4", fontWeight: "500", letterSpacing: "0.02em" }],
        caption: ["0.75rem", { lineHeight: "1.5" }],
      },
      spacing: {
        "1": "4px", "2": "8px", "3": "12px", "4": "16px", "6": "24px",
        "8": "32px", "10": "40px", "12": "48px", "16": "64px", "20": "80px",
        "24": "96px", "30": "120px",
      },
      borderRadius: {
        sm: "6px", DEFAULT: "10px", md: "14px", lg: "20px", xl: "28px", "2xl": "36px", pill: "999px",
      },
      boxShadow: {
        subtle: "0 1px 2px rgba(16,21,16,0.04), 0 1px 3px rgba(16,21,16,0.05)",
        card: "0 12px 40px -18px rgba(16,21,16,0.18)",
        lift: "0 24px 60px -24px rgba(16,21,16,0.28)",
        focus: "0 0 0 3px var(--color-focus-ring)",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      zIndex: {
        base: "0", raised: "10", sticky: "40", overlay: "60", modal: "70", cursor: "9999",
      },
      maxWidth: { content: "1280px", prose: "68ch" },
    },
  },
  plugins: [],
};

export default config;
