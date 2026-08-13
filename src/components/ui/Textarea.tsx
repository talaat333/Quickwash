import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, invalid, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        "min-h-[120px] w-full rounded-md border bg-surface px-4 py-3 text-body-sm text-text-primary placeholder:text-text-muted outline-none transition-colors duration-200 focus:border-brand-primary focus:shadow-focus",
        invalid && "border-error focus:border-error",
        className,
      )}
      {...props}
    />
  );
});
