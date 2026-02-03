"use client";

import { Feature } from "./FeatureSection";

const medicalFeatures = [
  {
    id: 1,
    title: "Online Prescription",
    image: "https://ibb.co/5gfL7cyg",
    description:
      "Get your prescriptions online from certified doctors. Easy, secure, and convenient prescription management system.",
  },
  {
    id: 2,
    title: "Medicine Delivery",
    image: "https://via.placeholder.com/400x300/10b981/ffffff?text=Delivery",
    description:
      "Fast and reliable medicine delivery to your doorstep. Track your orders and get medicines when you need them.",
  },
  {
    id: 3,
    title: "Health Consultation",
    image:
      "https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Consultation",
    description:
      "Connect with healthcare professionals for consultations. Get expert medical advice from the comfort of your home.",
  },
];

export const FeatureWrapper = () => {
  return <Feature features={medicalFeatures} />;
};
