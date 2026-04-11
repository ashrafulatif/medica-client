import type { Metadata } from "next";
import ContactSection from "@/components/modules/contact/ContactSection";

export default function ContactPage() {
  return <ContactSection />;
}

export const metadata: Metadata = {
  title: "Medica | Contact",
  description: "Get in touch with Medica support team.",
};
