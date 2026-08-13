"use client";

import { Button } from "@/components/ui/Button";
import { StateScreen } from "@/components/system/StateScreen";
import { AlertIcon } from "@/components/system/icons";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="grid min-h-[70vh] place-items-center">
      <StateScreen
        tone="error"
        icon={<AlertIcon />}
        title="حدث خطأ غير متوقع"
        description="نعتذر عن ذلك. حاول مرة أخرى، وإن استمر الأمر تواصل معنا."
        action={<Button onClick={reset} size="lg">إعادة المحاولة</Button>}
      />
    </main>
  );
}
