"use client";

import { useState, useEffect } from "react";
import Header from "@/components/public/Header";
import HeroSection from "@/components/public/HeroSection";
import ProblemSolutionSection from "@/components/public/ProblemSolutionSection";
import FeaturesSection from "@/components/public/FeaturesSection";
import ServicesSection from "@/components/public/ServicesSection";
import TestimonialsSection from "@/components/public/TestimonialsSection";
import ZonesSection from "@/components/public/ZonesSection";
import FinalCTASection from "@/components/public/FinalCTASection";
import Footer from "@/components/public/Footer";
import AppointmentModal from "@/components/public/AppointmentModal";
import QuoteModal from "@/components/public/QuoteModal";

export default function HomePage() {
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".section-fade").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50" data-testid="landing-page">
      <Header
        onAppointmentClick={() => setAppointmentModalOpen(true)}
        onQuoteClick={() => setQuoteModalOpen(true)}
      />

      <main>
        <HeroSection
          onAppointmentClick={() => setAppointmentModalOpen(true)}
          onQuoteClick={() => setQuoteModalOpen(true)}
        />
        <ProblemSolutionSection />
        <FeaturesSection />
        <ServicesSection />
        <ZonesSection />
        <TestimonialsSection />
        <FinalCTASection
          onAppointmentClick={() => setAppointmentModalOpen(true)}
        />
      </main>

      <Footer />

      <AppointmentModal
        open={appointmentModalOpen}
        onOpenChange={setAppointmentModalOpen}
      />
      <QuoteModal
        open={quoteModalOpen}
        onOpenChange={setQuoteModalOpen}
      />
    </div>
  );
}
