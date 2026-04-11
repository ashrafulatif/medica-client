import type { Metadata } from "next";
import FAQSection from "@/components/modules/faq/FAQSection";

export default function FAQPage() {
  return <FAQSection />;
}

export const metadata: Metadata = {
  title: "Medica | FAQ",
  description: "Frequently asked questions about Medica services.",
};
