import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
}

interface Certification {
  name: string;
  description: string;
}

const TestimonialsSection = () => {
  const testimonials: Testimonial[] = [
    {
      name: "Marie Dupont",
      location: "Orléans",
      rating: 5,
      text: "Intervention rapide pour une fuite d'eau un dimanche matin. Professionnel, propre et efficace. Je recommande vivement !",
      date: "Il y a 2 semaines",
    },
    {
      name: "Pierre Martin",
      location: "Olivet",
      rating: 5,
      text: "Très satisfait de l'entretien de ma chaudière. Explications claires, tarif transparent. Un artisan de confiance.",
      date: "Il y a 1 mois",
    },
    {
      name: "Sophie Bernard",
      location: "Saint-Jean-de-Braye",
      rating: 5,
      text: "Rénovation complète de notre salle de bain. Travail soigné, respect des délais et du budget. Excellent !",
      date: "Il y a 3 semaines",
    },
  ];

  const certifications: Certification[] = [
    { name: "RGE", description: "Reconnu Garant de l'Environnement" },
    { name: "Qualibat", description: "Certification Qualité" },
    { name: "Assurance", description: "Garantie décennale" },
  ];

  return (
    <section id="avis" className="py-20 md:py-28 bg-white section-fade" data-testid="testimonials-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Ce que disent nos clients
          </h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-2xl font-bold text-slate-900">4.9</span>
          </div>
          <p className="text-slate-600">Basé sur 127 avis Google</p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-slate-50 p-6 rounded-2xl border border-slate-100 relative"
              data-testid={`testimonial-${index}`}
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-slate-700 mb-6 leading-relaxed">&quot;{testimonial.text}&quot;</p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.location}</p>
                </div>
                <span className="text-xs text-slate-400">{testimonial.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="bg-slate-50 rounded-3xl p-8 md:p-12">
          <h3 className="text-xl font-bold text-slate-900 text-center mb-8">
            Certifications & Garanties
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl text-center border border-slate-100"
                data-testid={`certification-${index}`}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">{cert.name}</span>
                </div>
                <p className="text-slate-600 text-sm">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
