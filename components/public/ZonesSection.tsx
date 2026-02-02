import { MapPin, CheckCircle } from "lucide-react";

interface Zone {
  name: string;
  main: boolean;
}

const ZonesSection = () => {
  const zones: Zone[] = [
    { name: "Orléans", main: true },
    { name: "Olivet", main: false },
    { name: "Saint-Jean-de-Braye", main: false },
    { name: "Fleury-les-Aubrais", main: false },
    { name: "Saint-Jean-de-la-Ruelle", main: false },
    { name: "Saran", main: false },
    { name: "La Chapelle-Saint-Mesmin", main: false },
    { name: "Saint-Pryvé-Saint-Mesmin", main: false },
    { name: "Ingré", main: false },
    { name: "Chécy", main: false },
    { name: "Boigny-sur-Bionne", main: false },
    { name: "Semoy", main: false },
  ];

  return (
    <section id="zones" className="py-20 md:py-28 bg-slate-50 section-fade" data-testid="zones-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Map/Visual */}
          <div className="relative">
            <div className="bg-primary/5 rounded-3xl p-8 md:p-12">
              <div className="flex items-center justify-center mb-8">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-lg">
                  <MapPin className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Orléans Métropole</h3>
                <p className="text-slate-600">et communes environnantes</p>
              </div>
              {/* Decorative circles */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border-2 border-dashed border-primary/20 rounded-full pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-dashed border-primary/10 rounded-full pointer-events-none hidden md:block" />
            </div>
          </div>

          {/* Zones List */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Zones d&apos;intervention
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Nous intervenons sur Orléans et toutes les communes de la métropole.
              Délai d&apos;intervention rapide garanti.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {zones.map((zone, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 p-3 rounded-xl transition-colors ${
                    zone.main
                      ? "bg-primary text-white"
                      : "bg-white border border-slate-100 hover:border-primary/30"
                  }`}
                  data-testid={`zone-${index}`}
                >
                  <CheckCircle className={`w-4 h-4 flex-shrink-0 ${zone.main ? "text-white" : "text-primary"}`} />
                  <span className={`font-medium text-sm ${zone.main ? "text-white" : "text-slate-700"}`}>
                    {zone.name}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-sm text-slate-500 mt-6">
              Votre commune n&apos;est pas listée ? Contactez-nous pour vérifier notre disponibilité.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZonesSection;
