import { Wrench, Flame, Droplets, ClipboardCheck, ArrowRight, LucideIcon } from "lucide-react";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  span: string;
  image: string;
}

const ServicesSection = () => {
  const services: Service[] = [
    {
      icon: Wrench,
      title: "Dépannage Urgence",
      description: "Fuite d'eau, canalisation bouchée, panne de chauffe-eau... Intervention rapide 7j/7.",
      span: "md:col-span-2",
      image: "https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      icon: Flame,
      title: "Installation Chaudière",
      description: "Installation et remplacement de chaudières gaz, fioul, pompes à chaleur. Certifié RGE.",
      span: "md:col-span-1",
      image: "https://images.pexels.com/photos/7937300/pexels-photo-7937300.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      icon: Droplets,
      title: "Rénovation Salle de Bain",
      description: "Création et rénovation complète. Douche à l'italienne, baignoire, WC suspendus.",
      span: "md:col-span-1",
      image: "https://images.pexels.com/photos/6585598/pexels-photo-6585598.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      icon: ClipboardCheck,
      title: "Entretien Annuel",
      description: "Entretien obligatoire chaudière, détartrage chauffe-eau, vérification installations. Contrat annuel disponible.",
      span: "md:col-span-2",
      image: "https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  return (
    <section id="services" className="py-20 md:py-28 bg-white section-fade" data-testid="services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Nos services
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Plomberie et chauffage, du dépannage urgent à la rénovation complète
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl ${service.span} service-card`}
              data-testid={`service-${index}`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-slate-900/20" />
              </div>

              {/* Content */}
              <div className="relative p-8 min-h-[280px] flex flex-col justify-end">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-white/80 mb-4">{service.description}</p>
                <div className="flex items-center gap-2 text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>En savoir plus</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
