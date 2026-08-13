"use client";

import { useId } from "react";

/** Stylized in-app booking screen shown in the app promotion section. */
export function PhoneMockup({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 280 560" className={className} role="img" aria-label="تطبيق كويك واش">
      <defs>
        <linearGradient id={`screen-${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0f1a12" /><stop offset="1" stopColor="#132417" /></linearGradient>
        <linearGradient id={`card-${uid}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3f8a41" /><stop offset="1" stopColor="#2a6029" /></linearGradient>
        <linearGradient id={`sweep-${uid}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset="0.5" stopColor="#fff" stopOpacity="0.25" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
      </defs>
      <rect x="8" y="8" width="264" height="544" rx="46" fill="#0a0f0b" />
      <rect x="8" y="8" width="264" height="544" rx="46" fill="none" stroke="#2b332d" strokeWidth="2" />
      <rect x="20" y="20" width="240" height="520" rx="38" fill={`url(#screen-${uid})`} />
      <rect x="112" y="30" width="56" height="14" rx="7" fill="#0a0f0b" />

      <text x="40" y="66" fill="#eef1ea" fontFamily="var(--font-arabic), sans-serif" fontSize="12" fontWeight="600">9:41</text>
      <circle cx="232" cy="62" r="3" fill="#eef1ea" /><circle cx="222" cy="62" r="3" fill="#eef1ea" /><circle cx="212" cy="62" r="3" fill="#8b9187" />

      <text x="240" y="104" textAnchor="end" fill="#8fa393" fontFamily="var(--font-arabic), sans-serif" fontSize="12">أهلاً بك</text>
      <text x="240" y="127" textAnchor="end" fill="#ffffff" fontFamily="var(--font-arabic), sans-serif" fontSize="17" fontWeight="700">احجز غسيل سيارتك</text>

      <rect x="40" y="144" width="200" height="104" rx="18" fill={`url(#card-${uid})`} />
      <path d="M150,144 L182,144 L120,248 L88,248 Z" fill={`url(#sweep-${uid})`} />
      <g transform="translate(70,196) scale(0.32)">
        <path d="M44,150 C44,138 54,133 70,131 L112,127 C126,108 150,96 182,94 L262,94 C298,95 320,110 332,129 L392,136 C410,139 418,146 418,157 C418,168 410,171 398,171 L64,171 C50,171 44,164 44,150 Z" fill="#1c421f" />
        <path d="M132,126 C144,110 162,101 186,100 L214,100 L214,126 Z" fill="#cfe6d0" />
        <path d="M224,100 L258,100 C286,101 302,111 312,126 L224,126 Z" fill="#cfe6d0" />
        <circle cx="132" cy="171" r="30" fill="#0a0f0b" /><circle cx="132" cy="171" r="14" fill="#e9ece6" />
        <circle cx="316" cy="171" r="30" fill="#0a0f0b" /><circle cx="316" cy="171" r="14" fill="#e9ece6" />
      </g>
      <text x="224" y="238" textAnchor="end" fill="#eaf5ea" fontFamily="var(--font-arabic), sans-serif" fontSize="11">الباقة المتكاملة</text>

      <g fontFamily="var(--font-arabic), sans-serif">
        <rect x="40" y="266" width="200" height="46" rx="14" fill="#18271b" />
        <circle cx="216" cy="289" r="12" fill="#2a6029" />
        <rect x="96" y="282" width="90" height="7" rx="3.5" fill="#3a4a3d" /><rect x="132" y="295" width="54" height="6" rx="3" fill="#26332a" />
        <text x="58" y="293" fill="#67a425" fontSize="11" fontWeight="700">350</text>

        <rect x="40" y="320" width="200" height="46" rx="14" fill="#18271b" />
        <circle cx="216" cy="343" r="12" fill="#2a6029" />
        <rect x="106" y="336" width="80" height="7" rx="3.5" fill="#3a4a3d" /><rect x="140" y="349" width="46" height="6" rx="3" fill="#26332a" />
        <text x="58" y="347" fill="#67a425" fontSize="11" fontWeight="700">200</text>

        <rect x="40" y="374" width="200" height="46" rx="14" fill="#18271b" />
        <circle cx="216" cy="397" r="12" fill="#2a6029" />
        <rect x="100" y="390" width="86" height="7" rx="3.5" fill="#3a4a3d" /><rect x="136" y="403" width="50" height="6" rx="3" fill="#26332a" />
        <text x="58" y="401" fill="#67a425" fontSize="11" fontWeight="700">180</text>
      </g>

      <rect x="40" y="440" width="200" height="48" rx="24" fill="#67a425" />
      <text x="140" y="470" fill="#ffffff" fontFamily="var(--font-arabic), sans-serif" fontSize="14" fontWeight="700" textAnchor="middle">اطلب الآن</text>

      <g fill="#3a4a3d">
        <circle cx="72" cy="516" r="5" fill="#67a425" /><circle cx="126" cy="516" r="5" /><circle cx="180" cy="516" r="5" /><circle cx="228" cy="516" r="5" />
      </g>
    </svg>
  );
}
