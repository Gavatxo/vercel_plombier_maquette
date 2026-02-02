import { Wrench, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white py-16" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">Plombier Orléans</span>
            </div>
            <p className="text-slate-400 mb-6 max-w-sm">
              Votre plombier chauffagiste de confiance à Orléans et ses environs.
              Dépannage rapide, entretien et installation.
            </p>
            <div className="flex flex-col gap-3">
              <a href="tel:0238000000" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                <span>02 38 00 00 00</span>
              </a>
              <a href="mailto:contact@plombier-orleans.fr" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                <span>contact@plombier-orleans.fr</span>
              </a>
              <div className="flex items-center gap-3 text-slate-300">
                <MapPin className="w-4 h-4" />
                <span>Orléans Métropole</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-3">
              <li><a href="#services" className="text-slate-400 hover:text-white transition-colors">Dépannage urgence</a></li>
              <li><a href="#services" className="text-slate-400 hover:text-white transition-colors">Installation chaudière</a></li>
              <li><a href="#services" className="text-slate-400 hover:text-white transition-colors">Rénovation salle de bain</a></li>
              <li><a href="#services" className="text-slate-400 hover:text-white transition-colors">Entretien annuel</a></li>
            </ul>
          </div>

          {/* Zones */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Zones d&apos;intervention</h4>
            <ul className="space-y-3">
              <li><span className="text-slate-400">Orléans</span></li>
              <li><span className="text-slate-400">Olivet</span></li>
              <li><span className="text-slate-400">Saint-Jean-de-Braye</span></li>
              <li><span className="text-slate-400">Fleury-les-Aubrais</span></li>
              <li><a href="#zones" className="text-primary hover:text-primary/80 transition-colors">Voir toutes les zones →</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} Plombier Orléans. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-white text-sm transition-colors">Mentions légales</a>
            <a href="#" className="text-slate-500 hover:text-white text-sm transition-colors">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
