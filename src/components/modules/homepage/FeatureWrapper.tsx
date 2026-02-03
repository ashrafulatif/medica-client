"use client";

import { Feature } from "./FeatureSection";

const medicalFeatures = [
  {
    id: 1,
    title: "Online Prescription & Consultation",
    icon: "stethoscope",
    description:
      "Connect with certified doctors from the comfort of your home. Get digital prescriptions, medical consultations, and follow-up care through our secure telemedicine platform. Available 24/7 for urgent medical needs.",
  },
  {
    id: 2,
    title: "Fast & Reliable Medicine Delivery",
    icon: "truck",
    description:
      "Same-day and next-day delivery of prescription and over-the-counter medications. Track your orders in real-time, set automatic refills, and never run out of essential medicines again. Free delivery on orders over $50.",
  },
  {
    id: 3,
    title: "Digital Health Records",
    icon: "fileText",
    description:
      "Securely store and manage your complete medical history in one place. Share records with healthcare providers, track medications, allergies, and lab results. HIPAA-compliant and accessible from any device.",
  },
  {
    id: 4,
    title: "Medicine Information & Safety",
    icon: "shield",
    description:
      "Access comprehensive drug information, dosage guidelines, and potential interactions. Our AI-powered system alerts you to drug conflicts and provides detailed medication guides to ensure safe usage.",
  },
];

export const FeatureWrapper = () => {
  return <Feature features={medicalFeatures} />;
};
