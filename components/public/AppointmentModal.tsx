"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface AppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  client_name: string;
  client_phone: string;
  client_email: string;
  intervention_type: string;
  urgency: string;
  city: string;
  preferred_time: string;
  description: string;
}

const AppointmentModal = ({ open, onOpenChange }: AppointmentModalProps) => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState<FormData>({
    client_name: "",
    client_phone: "",
    client_email: "",
    intervention_type: "",
    urgency: "",
    city: "",
    preferred_time: "",
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

  const urgencyLevels = [
    { value: "urgence", label: "Urgence (dans les 24h)" },
    { value: "rapide", label: "Rapide (sous 48-72h)" },
    { value: "normal", label: "Normal (selon disponibilité)" },
  ];

  const timeSlots = [
    { value: "08:00-10:00", label: "08h00 - 10h00" },
    { value: "10:00-12:00", label: "10h00 - 12h00" },
    { value: "14:00-16:00", label: "14h00 - 16h00" },
    { value: "16:00-18:00", label: "16h00 - 18h00" },
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

    if (!formData.client_name || !formData.client_phone || !formData.intervention_type || !formData.urgency || !formData.city || !date || !formData.preferred_time) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          preferred_date: format(date, "yyyy-MM-dd"),
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi");
      }

      toast.success("Demande de rendez-vous envoyée !", {
        description: "Nous vous contacterons rapidement pour confirmer.",
      });
      onOpenChange(false);
      setFormData({
        client_name: "",
        client_phone: "",
        client_email: "",
        intervention_type: "",
        urgency: "",
        city: "",
        preferred_time: "",
        description: "",
      });
      setDate(undefined);
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
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto" data-testid="appointment-modal">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Prendre rendez-vous</DialogTitle>
          <DialogDescription>
            Remplissez ce formulaire et nous vous recontacterons rapidement pour confirmer votre rendez-vous.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client_name">Nom complet *</Label>
              <Input
                id="client_name"
                placeholder="Jean Dupont"
                value={formData.client_name}
                onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                data-testid="input-client-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client_phone">Téléphone *</Label>
              <Input
                id="client_phone"
                placeholder="06 12 34 56 78"
                value={formData.client_phone}
                onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })}
                data-testid="input-client-phone"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="client_email">Email (optionnel)</Label>
            <Input
              id="client_email"
              type="email"
              placeholder="jean.dupont@email.fr"
              value={formData.client_email}
              onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
              data-testid="input-client-email"
            />
          </div>

          {/* Intervention Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Type d&apos;intervention *</Label>
              <Select
                value={formData.intervention_type}
                onValueChange={(value) => setFormData({ ...formData, intervention_type: value })}
              >
                <SelectTrigger data-testid="select-intervention-type">
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
              <Label>Niveau d&apos;urgence *</Label>
              <Select
                value={formData.urgency}
                onValueChange={(value) => setFormData({ ...formData, urgency: value })}
              >
                <SelectTrigger data-testid="select-urgency">
                  <SelectValue placeholder="Sélectionnez" />
                </SelectTrigger>
                <SelectContent>
                  {urgencyLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Ville *</Label>
            <Select
              value={formData.city}
              onValueChange={(value) => setFormData({ ...formData, city: value })}
            >
              <SelectTrigger data-testid="select-city">
                <SelectValue placeholder="Sélectionnez votre ville" />
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

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date souhaitée *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    data-testid="date-picker-trigger"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: fr }) : "Choisir une date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    locale={fr}
                    data-testid="calendar"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>Créneau horaire *</Label>
              <Select
                value={formData.preferred_time}
                onValueChange={(value) => setFormData({ ...formData, preferred_time: value })}
              >
                <SelectTrigger data-testid="select-time">
                  <SelectValue placeholder="Sélectionnez" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot.value} value={slot.value}>
                      {slot.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description du problème (optionnel)</Label>
            <Textarea
              id="description"
              placeholder="Décrivez brièvement votre problème..."
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              data-testid="textarea-description"
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-primary/90 rounded-full font-semibold"
            disabled={loading}
            data-testid="submit-appointment-btn"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              "Envoyer ma demande"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
