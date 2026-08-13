/**
 * TypeScript mirror of a few brand tokens for use in JS contexts
 * (e.g. framer-motion colors, canvas). CSS is the source of truth;
 * keep these in sync with globals.css.
 */
export const tokens = {
  color: {
    primary: "#337435",
    secondary: "#67A425",
    ink: "#101510",
  },
  motion: {
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    fast: 0.2,
    base: 0.4,
    slow: 0.7,
  },
} as const;
