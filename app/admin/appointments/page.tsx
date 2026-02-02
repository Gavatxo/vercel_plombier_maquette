"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, MapPin, Phone, Check, X, CalendarPlus, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Appointment {
  id: string;
  client_name: string;
  client_phone: string;
  client_email?: string;
  intervention_type: string;
  urgency: string;
  city: string;
  preferred_date: string;
  preferred_time: string;
  description?: string;
  status: string;
  created_at: string;
  google_calendar_event_id?: string;
}

const statusLabels: Record<string, string> = {
  pending: "En attente",
  confirmed: "Confirmé",
  completed: "Terminé",
  cancelled: "Annulé",
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const interventionLabels: Record<string, string> = {
  depannage_urgence: "Dépannage urgence",
  fuite_eau: "Fuite d'eau",
  chaudiere_panne: "Chaudière en panne",
  entretien_chaudiere: "Entretien chaudière",
  installation: "Installation",
  renovation_sdb: "Rénovation salle de bain",
  autre: "Autre",
};

export default function AppointmentsAdminPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [calendarConnected, setCalendarConnected] = useState(false);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("/api/appointments");
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkCalendarStatus = async () => {
    try {
      const response = await fetch("/api/calendar/status");
      const data = await response.json();
      setCalendarConnected(data.connected);
    } catch (error) {
      console.error("Error checking calendar status:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
    checkCalendarStatus();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        toast.success("Statut mis à jour");
        fetchAppointments();
      }
    } catch (error) {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const syncToCalendar = async (appointmentId: string) => {
    setSyncingId(appointmentId);
    try {
      const response = await fetch("/api/calendar/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentId }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("RDV ajouté à Google Calendar !");
        fetchAppointments();
      } else {
        toast.error(data.error || "Erreur lors de la synchronisation");
      }
    } catch (error) {
      toast.error("Erreur lors de la synchronisation");
    } finally {
      setSyncingId(null);
    }
  };

  const filteredAppointments = filter === "all"
    ? appointments
    : appointments.filter((a) => a.status === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Rendez-vous</h1>
          <p className="text-slate-600 mt-1">
            Gérez les demandes de rendez-vous
          </p>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="confirmed">Confirmés</SelectItem>
            <SelectItem value="completed">Terminés</SelectItem>
            <SelectItem value="cancelled">Annulés</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Chargement...</div>
        ) : filteredAppointments.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg text-slate-900">
                        {appointment.client_name}
                      </h3>
                      <Badge className={statusColors[appointment.status]}>
                        {statusLabels[appointment.status]}
                      </Badge>
                      <Badge variant="outline">
                        {interventionLabels[appointment.intervention_type] || appointment.intervention_type}
                      </Badge>
                      {appointment.google_calendar_event_id && (
                        <Badge className="bg-green-100 text-green-800">
                          <Calendar className="w-3 h-3 mr-1" />
                          Sync
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                      <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {appointment.client_phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {appointment.city}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {appointment.preferred_date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {appointment.preferred_time}
                      </span>
                    </div>

                    {appointment.description && (
                      <p className="text-sm text-slate-500 max-w-2xl">
                        {appointment.description}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {calendarConnected && !appointment.google_calendar_event_id && appointment.status !== "cancelled" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => syncToCalendar(appointment.id)}
                        disabled={syncingId === appointment.id}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        {syncingId === appointment.id ? (
                          <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                        ) : (
                          <CalendarPlus className="w-4 h-4 mr-1" />
                        )}
                        Ajouter au calendrier
                      </Button>
                    )}
                    {appointment.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => updateStatus(appointment.id, "confirmed")}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Confirmer
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateStatus(appointment.id, "cancelled")}
                          className="text-red-500 hover:text-red-600"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Annuler
                        </Button>
                      </>
                    )}
                    {appointment.status === "confirmed" && (
                      <Button
                        size="sm"
                        onClick={() => updateStatus(appointment.id, "completed")}
                        className="bg-primary hover:bg-primary/90"
                      >
                        Marquer terminé
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-slate-500">
            Aucun rendez-vous {filter !== "all" ? "avec ce statut" : ""}
          </div>
        )}
      </div>
    </div>
  );
}
