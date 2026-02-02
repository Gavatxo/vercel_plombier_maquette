"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, FileText } from "lucide-react";

interface QuoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  client_name: string;
  client_phone: string;
  client_email: string;
  intervention_type: string;
  city: string;
  description: string;
}

const QuoteModal = ({ open, onOpenChange }: QuoteModalProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    client_name: "",
    client_phone: "",
    client_email: "",
    intervention_type: "",
    city: "",
    description: "",
  });

  const interventionTypes = [
    { value: "depannage_urgence", label: "Dépannage urgence" },
    { value: "fuite_eau", label: "Fuite d'eau" },
    { value: "chaudiere_panne", label: "Chaudière en panne" },
    { value: "entretien_chaudiere", label: "Entretien chaudière" },
    { value: "installation", label: "Installation" },
    { value: "renovation_sdb", label: "Rénovation salle de bain" },
    { value: "autre", label: "Autre" },
  ];

  const cities = [
    "Orléans",
    "Olivet",
    "Saint-Jean-de-Braye",
    "Fleury-les-Aubrais",
    "Saint-Jean-de-la-Ruelle",
    "Saran",
    "La Chapelle-Saint-Mesmin",
    "Saint-Pryvé-Saint-Mesmin",
    "Ingré",
    "Chécy",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.client_name || !formData.client_phone || !formData.intervention_type || !formData.city || !formData.description) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi");
      }

      toast.success("Demande de devis envoyée !", {
        description: "Nous vous recontacterons sous 24h avec un devis détaillé.",
      });
      onOpenChange(false);
      setFormData({
        client_name: "",
        client_phone: "",
        client_email: "",
        intervention_type: "",
        city: "",
        description: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue", {
        description: "Veuillez réessayer ou nous appeler directement.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]" data-testid="quote-modal">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary" />
            Demander un devis
          </DialogTitle>
          <DialogDescription>
            Décrivez votre projet et recevez un devis gratuit sous 24h.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quote_client_name">Nom complet *</Label>
              <Input
                id="quote_client_name"
                placeholder="Jean Dupont"
                value={formData.client_name}
                onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                data-testid="quote-input-client-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quote_client_phone">Téléphone *</Label>
              <Input
                id="quote_client_phone"
                placeholder="06 12 34 56 78"
                value={formData.client_phone}
                onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })}
                data-testid="quote-input-client-phone"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quote_client_email">Email (optionnel)</Label>
            <Input
              id="quote_client_email"
              type="email"
              placeholder="jean.dupont@email.fr"
              value={formData.client_email}
              onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
              data-testid="quote-input-client-email"
            />
          </div>

          {/* Intervention Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Type de travaux *</Label>
              <Select
                value={formData.intervention_type}
                onValueChange={(value) => setFormData({ ...formData, intervention_type: value })}
              >
                <SelectTrigger data-testid="quote-select-intervention-type">
                  <SelectValue placeholder="Sélectionnez" />
                </SelectTrigger>
                <SelectContent>
                  {interventionTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Ville *</Label>
              <Select
                value={formData.city}
                onValueChange={(value) => setFormData({ ...formData, city: value })}
              >
                <SelectTrigger data-testid="quote-select-city">
                  <SelectValue placeholder="Sélectionnez" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="quote_description">Description de votre projet *</Label>
            <Textarea
              id="quote_description"
              placeholder="Décrivez votre projet en détail : type de travaux, surface, contraintes particulières..."
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              data-testid="quote-textarea-description"
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-primary/90 rounded-full font-semibold"
            disabled={loading}
            data-testid="submit-quote-btn"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              "Demander mon devis gratuit"
            )}
          </Button>

          <p className="text-xs text-center text-slate-500">
            Devis gratuit et sans engagement. Réponse sous 24h.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteModal;
