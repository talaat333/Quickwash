import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PolicyArticle } from "@/components/legal/PolicyArticle";
import { getPolicy } from "@/data/policies";

export const metadata: Metadata = {
  title: "Shipping, Contract Delivery & Service Fulfillment Policy | QuickWash",
  description: "How Quick Wash delivers subscription contracts and fulfils on-location car-wash bookings.",
};

export default function Page() {
  const doc = getPolicy("shipping-delivery-policy");
  if (!doc) notFound();
  return <PolicyArticle doc={doc} />;
}
