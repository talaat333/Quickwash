"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Segment<T extends string> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  segments: Segment<T>[];
  value: T;
  onChange: (value: T) => void;
  layoutId?: string;
  "aria-label"?: string;
}

export function SegmentedControl<T extends string>({
  segments,
  value,
  onChange,
  layoutId = "segmented-indicator",
  ...aria
}: SegmentedControlProps<T>) {
  return (
    <div
      role="tablist"
      aria-label={aria["aria-label"]}
      className="inline-flex rounded-pill border border-border bg-surface p-1 shadow-subtle"
    >
      {segments.map((seg) => {
        const active = seg.value === value;
        return (
          <button
            key={seg.value}
            role="tab"
            aria-selected={active}
            data-cursor="button"
            onClick={() => onChange(seg.value)}
            className={cn(
              "relative z-raised rounded-pill px-6 py-2.5 text-body-sm font-medium transition-colors duration-200",
              active ? "text-text-on-brand" : "text-text-secondary hover:text-text-primary",
            )}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 -z-10 rounded-pill bg-brand-primary"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            {seg.label}
          </button>
        );
      })}
    </div>
  );
}
