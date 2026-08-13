"use client";

import { useState } from "react";
import Image from "next/image";
import type { ReactNode } from "react";
import { imageSlots, useRemoteImages, type ImageSlot } from "@/config/images";
import { cn } from "@/lib/utils";

interface SmartImageProps {
  slot: ImageSlot;
  /** Illustration (or any node) shown if no photo is available/loads. */
  fallback: ReactNode;
  className?: string;
  /** Overlay gradient for text legibility over the photo. */
  overlay?: boolean;
  priority?: boolean;
  sizes?: string;
}

/**
 * Loads a real photograph for a slot; on error (missing file / blocked host),
 * gracefully renders the branded illustration instead — never a broken image.
 */
export function SmartImage({
  slot,
  fallback,
  className,
  overlay,
  priority,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: SmartImageProps) {
  const cfg = imageSlots[slot];
  const initial = useRemoteImages ? cfg.remote : cfg.local;
  const [src, setSrc] = useState<string | null>(initial);
  const [triedLocal, setTriedLocal] = useState(!useRemoteImages);

  const showFallback = src === null;

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      {showFallback ? (
        <div className="stage-sheen absolute inset-0 flex items-center justify-center">
          {fallback}
        </div>
      ) : (
        <Image
          src={src}
          alt={cfg.alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
          onError={() => {
            // First failure: try the local path; second failure: illustration.
            if (!triedLocal) {
              setTriedLocal(true);
              setSrc(cfg.local);
            } else {
              setSrc(null);
            }
          }}
        />
      )}
      {overlay && !showFallback && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
      )}
    </div>
  );
}
