import { About } from "@/components/modules/about/About";
import { Metadata } from "next";
import React from "react";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-6">
      <About />
    </div>
  );
};

export default AboutPage;

export const metadata: Metadata = {
  title: "Medica | About",
  description: "Browse all medicine",
};
