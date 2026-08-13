"use client";

import { Button } from "@/components/ui/Button";
import { StateScreen } from "./StateScreen";
import { AlertIcon, OfflineIcon } from "./icons";

/**
 * Shown when a booking/subscription request could not be completed.
 * Never presents a failed request as success.
 */
export function RequestFailed({
  variant = "server",
  onRetry,
}: {
  variant?: "server" | "network";
  onRetry?: () => void;
}) {
  const network = variant === "network";
  return (
    <StateScreen
      tone="error"
      icon={network ? <OfflineIcon /> : <AlertIcon />}
      title={network ? "لا يوجد اتصال بالإنترنت" : "تعذّر إتمام الطلب"}
      description={
        network
          ? "تحقق من اتصالك بالإنترنت ثم أعد المحاولة."
          : "حدث خطأ أثناء إرسال طلبك ولم يكتمل. لم يتم تنفيذ أي دفع. حاول مرة أخرى."
      }
      action={onRetry && <Button onClick={onRetry} size="lg">إعادة المحاولة</Button>}
    />
  );
}
