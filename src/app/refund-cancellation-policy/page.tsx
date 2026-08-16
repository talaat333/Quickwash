import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PolicyArticle } from "@/components/legal/PolicyArticle";
import { getPolicy } from "@/data/policies";

export const metadata: Metadata = {
  title: "Cancellation, Refund & Service Guarantee Policy | QuickWash",
  description: "Cancellation rules, refunds, quality complaints, damage claims and outstanding balances.",
};

export default function Page() {
  const doc = getPolicy("refund-cancellation-policy");
  if (!doc) notFound();
  return <PolicyArticle doc={doc} />;
}
