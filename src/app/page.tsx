"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import AppShowcase from "@/components/AppShowcase";
import SystemSetup from "@/components/SystemSetup";
import CrisalixSection from "@/components/CrisalixSection";
import WorkflowsSection from "@/components/WorkflowsSection";
import RegistrationForm from "@/components/RegistrationForm";
import Footer from "@/components/Footer";

export default function LandingPage() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header onStartTrial={() => setIsRegistrationOpen(true)} />
      <main>
        <Hero onStartTrial={() => setIsRegistrationOpen(true)} />
        <Features />
        <WorkflowsSection />
        <AppShowcase />
        <CrisalixSection />
        <SystemSetup />
      </main>
      <Footer />
      <RegistrationForm
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
      />
    </div>
  );
}
