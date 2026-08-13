"use client";

import { Button } from "@/components/ui/Button";
import { StateScreen } from "./StateScreen";
import { OfflineIcon } from "./icons";

export function NoInternet({ onRetry }: { onRetry?: () => void }) {
  return (
    <StateScreen
      tone="error"
      icon={<OfflineIcon />}
      title="لا يوجد اتصال بالإنترنت"
      description="تحقق من اتصالك بالإنترنت ثم أعد المحاولة."
      action={onRetry && <Button onClick={onRetry} size="lg">إعادة المحاولة</Button>}
    />
  );
}
