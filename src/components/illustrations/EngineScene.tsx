"use client";

import { useId } from "react";

export function EngineScene({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 400 260" className={className} role="img" aria-label="محرك السيارة">
      <defs>
        <linearGradient id={`block-${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2b332d" /><stop offset="1" stopColor="#151c18" /></linearGradient>
        <linearGradient id={`cover-${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3f8a41" /><stop offset="1" stopColor="#2a6029" /></linearGradient>
        <linearGradient id={`metal-${uid}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#e9ece6" /><stop offset="1" stopColor="#aeb3a8" /></linearGradient>
        <radialGradient id={`glow-${uid}`} cx="0.5" cy="0.4" r="0.6"><stop offset="0" stopColor="#67a425" stopOpacity="0.15" /><stop offset="1" stopColor="#67a425" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="400" height="260" fill={`url(#glow-${uid})`} />
      <ellipse cx="200" cy="228" rx="150" ry="14" fill="#101510" opacity="0.14" />
      <rect x="96" y="150" width="208" height="74" rx="10" fill={`url(#block-${uid})`} />
      <rect x="110" y="210" width="180" height="14" rx="6" fill="#0e1512" />
      <path d="M120,150 L120,116 C120,108 126,104 134,104 L246,104 C254,104 260,110 260,118 L260,150 Z" fill={`url(#cover-${uid})`} />
      <g stroke="#255828" strokeWidth="4" opacity="0.6">
        <line x1="138" y1="112" x2="138" y2="148" /><line x1="158" y1="112" x2="158" y2="148" /><line x1="178" y1="112" x2="178" y2="148" />
        <line x1="198" y1="112" x2="198" y2="148" /><line x1="218" y1="112" x2="218" y2="148" /><line x1="238" y1="112" x2="238" y2="148" />
      </g>
      <circle cx="150" cy="96" r="14" fill={`url(#metal-${uid})`} /><circle cx="150" cy="96" r="7" fill="#8b9187" />
      <path d="M262,150 L262,128 C262,120 268,116 276,116 L300,116 C312,116 318,124 318,136 L318,150 Z" fill="#202722" />
      <rect x="300" y="120" width="10" height="90" rx="4" fill="#1c2420" />
      <circle cx="92" cy="186" r="26" fill="#101510" /><circle cx="92" cy="186" r="12" fill={`url(#metal-${uid})`} /><circle cx="92" cy="186" r="4" fill="#8b9187" />
      <path d="M262,140 C290,140 300,150 330,150" fill="none" stroke="#0e1512" strokeWidth="8" strokeLinecap="round" />
      <path d="M240,150 C246,120 250,110 262,100" fill="none" stroke="#e9ece6" strokeWidth="4" strokeLinecap="round" />
      <circle cx="262" cy="98" r="6" fill="#67a425" />
      <path d="M300,74 l3,8 8,3 -8,3 -3,8 -3,-8 -8,-3 8,-3 Z" fill="#67a425" />
      <path d="M96,80 l2,5 5,2 -5,2 -2,5 -2,-5 -5,-2 5,-2 Z" fill="#337435" />
    </svg>
  );
}
