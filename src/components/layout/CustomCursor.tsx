"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Minimal automotive detailing "polish sparkle" cursor.
 * - Desktop / fine-pointer only.
 * - Expands subtly over interactive elements ([data-cursor]).
 * - Fully disabled for touch devices and prefers-reduced-motion.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 700, damping: 40, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 700, damping: 40, mass: 0.3 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement;
      setActive(Boolean(target.closest("[data-cursor],a,button")));
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-cursor -translate-x-1/2 -translate-y-1/2"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        animate={{ scale: active ? 1.8 : 1, opacity: active ? 1 : 0.9 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="grid place-items-center"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" className={active ? "text-brand-primary" : "text-ink"} fill="currentColor">
          <path d="M12 3l1.6 5.2a2 2 0 0 0 1.3 1.3L20 11l-5.1 1.5a2 2 0 0 0-1.3 1.3L12 19l-1.6-5.2a2 2 0 0 0-1.3-1.3L4 11l5.1-1.5a2 2 0 0 0 1.3-1.3z" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
