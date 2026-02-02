"use client";

import { useState, useEffect } from "react";
import Header from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import AppointmentModal from "@/components/public/AppointmentModal";
import QuoteModal from "@/components/public/QuoteModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Calendar, MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface Realisation {
  id: number;
  title: string;
  category: string;
  location: string;
  date: string;
  description: string;
  images: string[];
  tags: string[];
}

// Données statiques pour le moment - seront remplacées par l'API
const realisationsData: Realisation[] = [
  {
    id: 1,
    title: "Rénovation salle de bain complète",
    category: "Salle de bain",
    location: "Orléans Centre",
    date: "Janvier 2025",
    description: "Transformation complète d'une salle de bain vieillissante en espace moderne avec douche à l'italienne, double vasque et WC suspendu.",
    images: [
      "https://images.pexels.com/photos/6585598/pexels-photo-6585598.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/6782567/pexels-photo-6782567.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/6782351/pexels-photo-6782351.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    tags: ["Douche italienne", "Double vasque", "Carrelage"],
  },
  {
    id: 2,
    title: "Installation pompe à chaleur",
    category: "Chauffage",
    location: "Olivet",
    date: "Décembre 2024",
    description: "Remplacement d'une vieille chaudière fioul par une pompe à chaleur air-eau haute performance. Économies d'énergie garanties.",
    images: [
      "https://images.pexels.com/photos/7937300/pexels-photo-7937300.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    tags: ["PAC Air-Eau", "RGE", "Économies"],
  },
  {
    id: 3,
    title: "Dépannage fuite sous dalle",
    category: "Dépannage",
    location: "Saint-Jean-de-Braye",
    date: "Janvier 2025",
    description: "Détection et réparation d'une fuite sous dalle grâce à notre équipement de détection thermique. Intervention rapide, dégâts minimisés.",
    images: [
      "https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    tags: ["Urgence", "Détection fuite", "Réparation"],
  },
  {
    id: 4,
    title: "Création salle d'eau sous combles",
    category: "Salle de bain",
    location: "Fleury-les-Aubrais",
    date: "Novembre 2024",
    description: "Aménagement complet d'une salle d'eau dans des combles aménagés. Optimisation de l'espace avec douche et meuble vasque sur mesure.",
    images: [
      "https://images.pexels.com/photos/6782567/pexels-photo-6782567.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/6585598/pexels-photo-6585598.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    tags: ["Combles", "Sur mesure", "Optimisation"],
  },
  {
    id: 5,
    title: "Remplacement chaudière gaz",
    category: "Chauffage",
    location: "Orléans La Source",
    date: "Octobre 2024",
    description: "Installation d'une chaudière gaz à condensation dernière génération en remplacement d'un ancien modèle. Rendement optimal.",
    images: [
      "https://images.pexels.com/photos/7937300/pexels-photo-7937300.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    tags: ["Condensation", "Économique", "Garantie"],
  },
  {
    id: 6,
    title: "Rénovation réseau plomberie",
    category: "Plomberie",
    location: "Saran",
    date: "Septembre 2024",
    description: "Remplacement complet des canalisations en plomb par du PER multicouche dans une maison des années 60. Mise aux normes complète.",
    images: [
      "https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    tags: ["Mise aux normes", "PER", "Rénovation"],
  },
];

const categories = ["Tous", "Salle de bain", "Chauffage", "Dépannage", "Plomberie"];

export default function RealisationsPage() {
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedProject, setSelectedProject] = useState<Realisation | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [realisations, setRealisations] = useState<Realisation[]>(realisationsData);

  // Charger les réalisations depuis l'API
  useEffect(() => {
    const fetchRealisations = async () => {
      try {
        const response = await fetch("/api/realisations?published=true");
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setRealisations(data);
          }
        }
      } catch (error) {
        // Garder les données statiques en cas d'erreur
        console.log("Utilisation des données statiques");
      }
    };
    fetchRealisations();
  }, []);

  const filteredRealisations = selectedCategory === "Tous"
    ? realisations
    : realisations.filter((r) => r.category === selectedCategory);

  const openProject = (project: Realisation) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50" data-testid="realisations-page">
      <Header
        onAppointmentClick={() => setAppointmentModalOpen(true)}
        onQuoteClick={() => setQuoteModalOpen(true)}
      />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <Badge className="bg-primary/10 text-primary border-0 px-4 py-1.5 text-sm font-medium mb-6">
                Notre savoir-faire
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-6">
                Nos <span className="gradient-text">réalisations</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                Découvrez nos derniers chantiers : rénovations de salles de bain,
                installations de chauffage, dépannages... La qualité au service de votre confort.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-slate-50 border-b border-slate-100 sticky top-16 md:top-20 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-white shadow-lg"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                  data-testid={`filter-${category.toLowerCase().replace(" ", "-")}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Realisations Grid */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRealisations.map((project) => (
                <article
                  key={project.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => openProject(project)}
                  data-testid={`project-${project.id}`}
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                      <Badge className="bg-white/90 text-slate-900 border-0">
                        {project.category}
                      </Badge>
                      <span className="text-white text-sm flex items-center gap-1">
                        <ArrowRight className="w-4 h-4" />
                        Voir le projet
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {project.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {project.date}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredRealisations.length === 0 && (
              <div className="text-center py-16">
                <p className="text-slate-500 text-lg">Aucune réalisation dans cette catégorie.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Votre projet est le prochain ?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Contactez-nous pour discuter de votre projet et obtenir un devis gratuit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => setQuoteModalOpen(true)}
                className="bg-white text-primary hover:bg-white/90 h-14 px-10 rounded-full text-lg font-semibold shadow-xl"
                data-testid="realisations-quote-btn"
              >
                Demander un devis gratuit
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Project Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden" data-testid="project-modal">
          {selectedProject && (
            <div className="flex flex-col lg:flex-row">
              {/* Image Gallery */}
              <div className="relative lg:w-1/2 h-64 lg:h-auto lg:min-h-[500px] bg-slate-900">
                <img
                  src={selectedProject.images[currentImageIndex]}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />

                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); prevImage(); }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                      data-testid="prev-image-btn"
                    >
                      <ChevronLeft className="w-5 h-5 text-slate-900" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                      data-testid="next-image-btn"
                    >
                      <ChevronRight className="w-5 h-5 text-slate-900" />
                    </button>

                    {/* Image indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedProject.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                          className={`w-2 h-2 rounded-full transition-all ${
                            idx === currentImageIndex ? "bg-white w-6" : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Content */}
              <div className="lg:w-1/2 p-8">
                <Badge className="bg-primary/10 text-primary border-0 mb-4">
                  {selectedProject.category}
                </Badge>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  {selectedProject.title}
                </h2>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6 text-sm text-slate-500 mb-8">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    {selectedProject.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    {selectedProject.date}
                  </span>
                </div>

                <Button
                  onClick={() => {
                    setSelectedProject(null);
                    setQuoteModalOpen(true);
                  }}
                  className="w-full bg-primary hover:bg-primary/90 h-12 rounded-full font-semibold"
                  data-testid="project-quote-btn"
                >
                  Un projet similaire ? Demandez un devis
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

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
