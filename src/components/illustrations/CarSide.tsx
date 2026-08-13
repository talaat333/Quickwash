"use client";

import { useId } from "react";

type Paint = "green" | "graphite" | "pearl";
type Variant = "sedan" | "suv";

const paints: Record<Paint, { top: string; mid: string; bottom: string; shade: string; sparkle: string }> = {
  green: { top: "#3f8a41", mid: "#337435", bottom: "#255828", shade: "#1c421f", sparkle: "#67a425" },
  graphite: { top: "#2f3a34", mid: "#1f2a25", bottom: "#141c18", shade: "#0e1512", sparkle: "#67a425" },
  pearl: { top: "#ffffff", mid: "#eef1ea", bottom: "#d3d9cf", shade: "#c2c8bd", sparkle: "#337435" },
};

/** Bespoke side-profile car illustration with the brand "polish sweep". */
export function CarSide({
  variant = "sedan",
  paint = "green",
  className,
}: {
  variant?: Variant;
  paint?: Paint;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const c = paints[paint];
  const glassTop = paint === "pearl" ? "#dfeee0" : "#dfeee0";

  return (
    <svg viewBox="0 0 460 240" className={className} role="img" aria-label="سيارة">
      <defs>
        <linearGradient id={`body-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.top} />
          <stop offset="0.55" stopColor={c.mid} />
          <stop offset="1" stopColor={c.bottom} />
        </linearGradient>
        <linearGradient id={`glass-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={glassTop} />
          <stop offset="1" stopColor="#a9c9ac" />
        </linearGradient>
        <linearGradient id={`sweep-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity={paint === "pearl" ? "0.7" : "0.5"} />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`shadow-${uid}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#101510" stopOpacity="0.28" />
          <stop offset="1" stopColor="#101510" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`rim-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e9ece6" />
          <stop offset="1" stopColor="#b3b8ac" />
        </linearGradient>
      </defs>

      <ellipse cx="230" cy="196" rx={variant === "suv" ? 185 : 180} ry="16" fill={`url(#shadow-${uid})`} />

      {variant === "sedan" ? (
        <>
          <path d="M44,150 C44,138 54,133 70,131 L112,127 C126,108 150,96 182,94 L262,94 C298,95 320,110 332,129 L392,136 C410,139 418,146 418,157 C418,168 410,171 398,171 L64,171 C50,171 44,164 44,150 Z" fill={`url(#body-${uid})`} />
          <path d="M132,126 C144,110 162,101 186,100 L214,100 L214,126 Z" fill={`url(#glass-${uid})`} />
          <path d="M224,100 L258,100 C286,101 302,111 312,126 L224,126 Z" fill={`url(#glass-${uid})`} />
          <rect x="216" y="100" width="6" height="26" fill={c.bottom} />
          <path d="M180,130 L180,168" stroke={c.shade} strokeWidth="2" opacity="0.5" />
          <rect x="196" y="138" width="18" height="4" rx="2" fill="#dfeee0" opacity="0.8" />
          <path d="M120,96 L160,96 L96,171 L56,171 Z" fill={`url(#sweep-${uid})`} opacity="0.7" />
          <path d="M250,96 L268,96 L204,171 L186,171 Z" fill={`url(#sweep-${uid})`} opacity="0.5" />
          <g>
            <circle cx="132" cy="171" r="30" fill="#101510" /><circle cx="132" cy="171" r="15" fill={`url(#rim-${uid})`} /><circle cx="132" cy="171" r="4" fill="#8b9187" />
            <circle cx="316" cy="171" r="30" fill="#101510" /><circle cx="316" cy="171" r="15" fill={`url(#rim-${uid})`} /><circle cx="316" cy="171" r="4" fill="#8b9187" />
          </g>
        </>
      ) : (
        <>
          <path d="M40,150 C40,134 50,129 66,127 L96,124 C104,102 122,88 150,86 L286,86 C312,87 330,98 342,120 L398,128 C414,131 420,138 420,150 C420,166 412,171 398,171 L60,171 C46,171 40,164 40,150 Z" fill={`url(#body-${uid})`} />
          <path d="M112,120 C120,102 136,92 156,91 L214,91 L214,120 Z" fill={`url(#glass-${uid})`} />
          <path d="M222,91 L282,91 C306,92 320,104 330,120 L222,120 Z" fill={`url(#glass-${uid})`} />
          <rect x="215" y="91" width="6" height="29" fill={c.bottom} />
          <rect x="120" y="83" width="180" height="5" rx="2.5" fill={c.top} />
          <path d="M175,124 L175,168" stroke={c.shade} strokeWidth="2" opacity="0.6" />
          <rect x="150" y="132" width="18" height="4" rx="2" fill="#dfeee0" opacity="0.7" />
          <path d="M120,88 L158,88 L92,171 L54,171 Z" fill={`url(#sweep-${uid})`} opacity="0.8" />
          <circle cx="126" cy="171" r="32" fill="#101510" /><circle cx="126" cy="171" r="16" fill={`url(#rim-${uid})`} /><circle cx="126" cy="171" r="4" fill="#8b9187" />
          <circle cx="322" cy="171" r="32" fill="#101510" /><circle cx="322" cy="171" r="16" fill={`url(#rim-${uid})`} /><circle cx="322" cy="171" r="4" fill="#8b9187" />
        </>
      )}

      <path d="M356,78 l3,7 7,3 -7,3 -3,7 -3,-7 -7,-3 7,-3 Z" fill={c.sparkle} />
      <path d="M118,68 l2,5 5,2 -5,2 -2,5 -2,-5 -5,-2 5,-2 Z" fill={c.sparkle} opacity="0.85" />
    </svg>
  );
}
