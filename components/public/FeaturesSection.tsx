import { CalendarCheck, RefreshCw, FileText, MapPin, LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  highlight: string;
}

const FeaturesSection = () => {
  const features: Feature[] = [
    {
      icon: CalendarCheck,
      title: "Prise de rendez-vous en ligne",
      description: "Choix du type d'intervention, sélection d'un créneau disponible, confirmation automatique.",
      highlight: "Vos clients réservent seuls, vous recevez le rendez-vous dans votre agenda.",
    },
    {
      icon: RefreshCw,
      title: "Synchronisation Google Agenda",
      description: "Les rendez-vous apparaissent automatiquement. Notifications en temps réel.",
      highlight: "Pas de double réservation, planning toujours à jour.",
    },
    {
      icon: FileText,
      title: "Formulaire intelligent",
      description: "Type d'intervention, niveau d'urgence, ville, possibilité d'ajouter des photos.",
      highlight: "Des demandes claires avant même de décrocher le téléphone.",
    },
    {
      icon: MapPin,
      title: "Zones d'intervention",
      description: "Liste des communes couvertes avec optimisation SEO local.",
      highlight: "Vous n'intervenez que là où vous le souhaitez.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-slate-50 section-fade" data-testid="features-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Tout ce qu&apos;il faut pour gagner du temps
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Des fonctionnalités pensées pour vous simplifier le quotidien
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all hover:border-primary/20 group"
              data-testid={`feature-${index}`}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 mb-4">{feature.description}</p>
              <p className="text-sm font-semibold text-primary bg-primary/5 px-4 py-2 rounded-lg inline-block">
                {feature.highlight}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
