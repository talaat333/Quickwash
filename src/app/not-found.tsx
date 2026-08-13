import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { StateScreen } from "@/components/system/StateScreen";

export default function NotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center">
      <StateScreen
        icon={<span className="numeric text-h2 font-semibold text-brand-primary">404</span>}
        title="الصفحة غير موجودة"
        description="الرابط الذي تحاول الوصول إليه غير متاح أو تم نقله."
        action={
          <Link href="/">
            <Button size="lg">العودة للرئيسية</Button>
          </Link>
        }
      />
    </main>
  );
}
