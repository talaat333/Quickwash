"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type UploadState = "empty" | "uploading" | "uploaded" | "failed";

interface UploadFieldProps {
  label: string;
  value?: string;
  onChange: (url: string | undefined) => void;
  /**
   * Uploader hook. In production this delegates to the backend/storage.
   * Returns the stored URL. Kept injectable so components stay logic-free.
   */
  uploader?: (file: File) => Promise<string>;
}

/** Local object-URL fallback so the UI is demonstrable without a backend. */
async function localPreviewUploader(file: File): Promise<string> {
  return URL.createObjectURL(file);
}

export function UploadField({ label, value, onChange, uploader = localPreviewUploader }: UploadFieldProps) {
  const [state, setState] = useState<UploadState>(value ? "uploaded" : "empty");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setState("uploading");
    try {
      const url = await uploader(file);
      onChange(url);
      setState("uploaded");
    } catch {
      setState("failed");
    }
  }

  function reset() {
    onChange(undefined);
    setState("empty");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-label text-text-secondary">{label}</span>
      <div
        className={cn(
          "relative aspect-[4/3] w-full overflow-hidden rounded-md border border-dashed border-border-strong bg-surface-muted transition-colors",
          state === "failed" && "border-error",
          state === "uploaded" && "border-solid border-brand-primary/40",
        )}
      >
        {state === "uploaded" && value ? (
          <>
            <Image src={value} alt={label} fill className="object-cover" unoptimized />
            <div className="absolute inset-x-0 bottom-0 flex justify-end gap-2 bg-gradient-to-t from-ink/70 to-transparent p-3">
              <button type="button" onClick={() => inputRef.current?.click()} data-cursor="button" className="rounded-pill bg-surface px-3 py-1 text-caption text-text-primary">
                استبدال
              </button>
              <button type="button" onClick={reset} data-cursor="button" className="rounded-pill bg-surface px-3 py-1 text-caption text-error">
                إزالة
              </button>
            </div>
          </>
        ) : (
          <button
            type="button"
            data-cursor="button"
            onClick={() => inputRef.current?.click()}
            className="flex h-full w-full flex-col items-center justify-center gap-2 text-text-muted transition-colors hover:text-brand-primary"
          >
            {state === "uploading" ? (
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-brand-primary border-t-transparent" />
            ) : (
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 16V4m0 0 4 4m-4-4L8 8" />
                <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
              </svg>
            )}
            <span className="text-caption">
              {state === "uploading" ? "جارٍ الرفع…" : state === "failed" ? "فشل الرفع، حاول مرة أخرى" : "اضغط لرفع صورة"}
            </span>
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}
