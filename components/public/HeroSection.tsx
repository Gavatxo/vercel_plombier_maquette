"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Shield, Star, CalendarCheck, FileText, LucideIcon } from "lucide-react";

interface HeroSectionProps {
  onAppointmentClick: () => void;
  onQuoteClick: () => void;
}

interface TrustBadge {
  icon: LucideIcon;
  text: string;
}

const HeroSection = ({ onAppointmentClick, onQuoteClick }: HeroSectionProps) => {
  const trustBadges: TrustBadge[] = [
    { icon: Clock, text: "Intervention rapide" },
    { icon: MapPin, text: "Orléans et environs" },
    { icon: Shield, text: "Certifié RGE" },
    { icon: Star, text: "4.9/5 (127 avis)" },
  ];

  return (
    <section className="relative min-h-screen flex items-center hero-pattern pt-20" data-testid="hero-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="animate-fade-in-up">
            <Badge className="bg-primary/10 text-primary border-0 px-4 py-1.5 text-sm font-medium mb-6">
              Artisan local de confiance
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight mb-6">
              Plombier chauffagiste à{" "}
              <span className="gradient-text">Orléans</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-xl">
              Dépannage & entretien rapide. Prenez rendez-vous en ligne,{" "}
              <strong className="text-slate-700">même en dehors des horaires d&apos;ouverture</strong>.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button
                size="lg"
                onClick={onAppointmentClick}
                className="bg-primary hover:bg-primary/90 text-white h-14 px-8 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all btn-lift"
                data-testid="hero-appointment-btn"
              >
                <CalendarCheck className="w-5 h-5 mr-2" />
                Prendre rendez-vous
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={onQuoteClick}
                className="border-2 border-slate-300 text-slate-700 hover:bg-slate-100 h-14 px-8 rounded-full text-lg font-semibold transition-all"
                data-testid="hero-quote-btn"
              >
                <FileText className="w-5 h-5 mr-2" />
                Demander un devis
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {trustBadges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-slate-600"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <badge.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative animate-fade-in-up animate-delay-200">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/7859953/pexels-photo-7859953.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Plombier professionnel au travail"
                className="w-full h-[400px] md:h-[500px] object-cover"
                data-testid="hero-image"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 animate-float" data-testid="trust-badge">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Certifié RGE</p>
                  <p className="text-sm text-slate-500">Qualibat 2024</p>
                </div>
              </div>
            </div>

            {/* Rating Badge */}
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4" data-testid="rating-badge">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="font-bold text-slate-900">4.9</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">127 avis Google</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
