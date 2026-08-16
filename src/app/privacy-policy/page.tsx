import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PolicyArticle } from "@/components/legal/PolicyArticle";
import { getPolicy } from "@/data/policies";

export const metadata: Metadata = {
  title: "Privacy Policy | QuickWash",
  description: "How Quick Wash collects, uses, shares, protects and retains personal data.",
};

export default function Page() {
  const doc = getPolicy("privacy-policy");
  if (!doc) notFound();
  return <PolicyArticle doc={doc} />;
}
