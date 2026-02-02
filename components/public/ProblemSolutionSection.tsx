import { Phone, Users, Calendar, Bell, ArrowRight, CheckCircle2, LucideIcon } from "lucide-react";

interface Problem {
  icon: LucideIcon;
  text: string;
}

const ProblemSolutionSection = () => {
  const problems: Problem[] = [
    { icon: Phone, text: "Trop d'appels pendant les interventions" },
    { icon: Users, text: "Clients non qualifiés, demandes vagues" },
    { icon: Calendar, text: "Agenda mal organisé, créneaux perdus" },
    { icon: Bell, text: "Rendez-vous oubliés ou annulés" },
  ];

  const solutions: string[] = [
    "Vos clients réservent seuls en ligne",
    "Formulaire qui qualifie les demandes",
    "Agenda synchronisé automatiquement",
    "Rappels et confirmations automatiques",
  ];

  return (
    <section className="py-20 md:py-28 bg-white section-fade" data-testid="problem-solution-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Votre quotidien, on le connaît
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            En tant qu&apos;artisan, vous passez plus de temps à gérer les appels qu&apos;à travailler.
            On a la solution.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Problems */}
          <div className="bg-slate-50 rounded-3xl p-8 md:p-10" data-testid="problems-card">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <Phone className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Le problème</h3>
            </div>
            <ul className="space-y-5">
              {problems.map((problem, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <problem.icon className="w-4 h-4 text-red-400" />
                  </div>
                  <span className="text-slate-700 font-medium">{problem.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution */}
          <div className="bg-primary rounded-3xl p-8 md:p-10 text-white" data-testid="solution-card">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold">La solution</h3>
            </div>
            <p className="text-xl font-semibold mb-8 text-white/90">
              Un site qui prend les rendez-vous à votre place.
            </p>
            <ul className="space-y-5">
              {solutions.map((solution, index) => (
                <li key={index} className="flex items-center gap-4">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-white/90 font-medium">{solution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
