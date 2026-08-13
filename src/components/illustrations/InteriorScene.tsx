"use client";

import { useId } from "react";

export function InteriorScene({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 400 260" className={className} role="img" aria-label="مقصورة السيارة">
      <defs>
        <linearGradient id={`seat-${uid}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3f8a41" /><stop offset="1" stopColor="#255828" /></linearGradient>
        <linearGradient id={`dash-${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2b332d" /><stop offset="1" stopColor="#141b17" /></linearGradient>
        <radialGradient id={`glow-${uid}`} cx="0.5" cy="0.35" r="0.65"><stop offset="0" stopColor="#67a425" stopOpacity="0.16" /><stop offset="1" stopColor="#67a425" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="400" height="260" fill={`url(#glow-${uid})`} />
      <ellipse cx="150" cy="236" rx="120" ry="12" fill="#101510" opacity="0.12" />
      <path d="M70,214 L214,214 C226,214 232,206 232,196 L232,188 C232,180 226,176 214,176 L104,176 C86,176 74,184 70,196 Z" fill={`url(#seat-${uid})`} />
      <path d="M96,178 L120,92 C123,80 132,74 144,76 L170,80 C182,82 188,92 186,104 L168,196 C166,208 156,214 144,214 L112,214 C100,214 92,206 96,190 Z" fill={`url(#seat-${uid})`} />
      <path d="M116,178 L136,100 C138,92 143,89 150,90 L164,92 L150,190 C148,200 141,204 132,204 L118,204 Z" fill="#255828" opacity="0.45" />
      <path d="M128,110 L112,196" stroke="#dfeee0" strokeWidth="2" opacity="0.5" />
      <path d="M150,112 L134,198" stroke="#dfeee0" strokeWidth="2" opacity="0.3" />
      <path d="M128,58 C130,48 140,44 152,46 L166,49 C178,52 182,62 178,74 L172,92 L120,84 Z" fill={`url(#seat-${uid})`} />
      <rect x="150" y="80" width="8" height="18" fill="#255828" />
      <path d="M250,250 C250,196 292,176 340,176 L400,176 L400,250 Z" fill={`url(#dash-${uid})`} />
      <g transform="translate(322,206)">
        <circle r="46" fill="#101510" /><circle r="46" fill="none" stroke="#3a443c" strokeWidth="3" />
        <circle r="17" fill="#1c2420" /><rect x="-17" y="-5" width="34" height="10" rx="4" fill="#67a425" />
        <path d="M0,-17 L0,-40 M-16,9 L-34,30 M16,9 L34,30" stroke="#2b332d" strokeWidth="9" strokeLinecap="round" />
      </g>
      <path d="M212,52 l3,8 8,3 -8,3 -3,8 -3,-8 -8,-3 8,-3 Z" fill="#67a425" />
      <path d="M258,118 l2,5 5,2 -5,2 -2,5 -2,-5 -5,-2 5,-2 Z" fill="#337435" />
    </svg>
  );
}
