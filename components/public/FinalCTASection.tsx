"use client";

import { Button } from "@/components/ui/button";
import { Phone, CalendarCheck, Clock, Shield } from "lucide-react";

interface FinalCTASectionProps {
  onAppointmentClick: () => void;
}

const FinalCTASection = ({ onAppointmentClick }: FinalCTASectionProps) => {
  return (
    <section className="py-20 md:py-28 bg-primary section-fade" data-testid="final-cta-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Un site qui travaille pendant que vous êtes sur un chantier
          </h2>
          <p className="text-xl text-white/80">
            Plus d&apos;appels manqués, plus de temps perdu. Vos clients réservent, vous intervenez.
          </p>
        </div>

        {/* Trust Points */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          <div className="flex items-center gap-2 text-white/90">
            <Clock className="w-5 h-5" />
            <span>Réservation 24h/24</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <Shield className="w-5 h-5" />
            <span>Artisan certifié</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <Phone className="w-5 h-5" />
            <span>Devis gratuit</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={onAppointmentClick}
            className="bg-white text-primary hover:bg-white/90 h-14 px-10 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all btn-lift"
            data-testid="final-appointment-btn"
          >
            <CalendarCheck className="w-5 h-5 mr-2" />
            Prendre rendez-vous maintenant
          </Button>
          <a
            href="tel:0238000000"
            className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white hover:bg-white/10 h-14 px-10 rounded-full text-lg font-semibold transition-all"
            data-testid="final-call-btn"
          >
            <Phone className="w-5 h-5 mr-2" />
            02 38 00 00 00
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
