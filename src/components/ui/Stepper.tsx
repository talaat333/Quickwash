"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface Step {
  id: string;
  label: string;
}

interface StepperProps {
  steps: Step[];
  current: number; // 0-based
}

/**
 * Horizontal progress indicator. Layout is naturally RTL — the DOM order is
 * step 1 → N, and the flex container flips under dir="rtl".
 */
export function Stepper({ steps, current }: StepperProps) {
  const progress = steps.length > 1 ? current / (steps.length - 1) : 0;
  return (
    <div className="w-full">
      <ol className="flex items-center">
        {steps.map((step, i) => {
          const state = i < current ? "done" : i === current ? "active" : "upcoming";
          return (
            <li key={step.id} className={cn("flex items-center", i < steps.length - 1 && "flex-1")}>
              <div className="flex flex-col items-center gap-2">
                <span
                  aria-current={state === "active" ? "step" : undefined}
                  className={cn(
                    "grid h-9 w-9 place-items-center rounded-full border text-body-sm font-semibold transition-colors duration-300",
                    state === "done" && "border-brand-primary bg-brand-primary text-text-on-brand",
                    state === "active" && "border-brand-primary text-brand-primary",
                    state === "upcoming" && "border-border-strong text-text-muted",
                  )}
                >
                  {state === "done" ? (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5 13 4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="numeric">{i + 1}</span>
                  )}
                </span>
                <span
                  className={cn(
                    "hidden text-caption sm:block",
                    state === "upcoming" ? "text-text-muted" : "text-text-primary",
                  )}
                >
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="mx-2 h-0.5 flex-1 rounded-full bg-border">
                  <motion.div
                    className="h-full rounded-full bg-brand-primary"
                    initial={false}
                    animate={{ scaleX: i < current ? 1 : 0 }}
                    style={{ transformOrigin: "right" }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>
      {/* Mobile: compact label + linear bar */}
      <div className="mt-4 sm:hidden">
        <div className="flex items-center justify-between text-caption text-text-secondary">
          <span>{steps[current]?.label}</span>
          <span className="numeric">{current + 1} / {steps.length}</span>
        </div>
        <div className="mt-2 h-1 rounded-full bg-border">
          <motion.div
            className="h-full rounded-full bg-brand-primary"
            initial={false}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </div>
  );
}
