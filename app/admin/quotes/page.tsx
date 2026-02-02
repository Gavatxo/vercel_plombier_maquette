"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, MapPin, FileText, Check, Send } from "lucide-react";
import { toast } from "sonner";

interface Quote {
  id: string;
  client_name: string;
  client_phone: string;
  client_email?: string;
  intervention_type: string;
  city: string;
  description: string;
  status: string;
  created_at: string;
}

const statusLabels: Record<string, string> = {
  pending: "En attente",
  sent: "Devis envoyé",
  accepted: "Accepté",
  rejected: "Refusé",
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  sent: "bg-blue-100 text-blue-800",
  accepted: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
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

export default function QuotesAdminPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetchQuotes = async () => {
    try {
      const response = await fetch("/api/quotes");
      if (response.ok) {
        const data = await response.json();
        setQuotes(data);
      }
    } catch (error) {
      console.error("Error fetching quotes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/quotes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        toast.success("Statut mis à jour");
        fetchQuotes();
      }
    } catch (error) {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const filteredQuotes = filter === "all"
    ? quotes
    : quotes.filter((q) => q.status === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Demandes de devis</h1>
          <p className="text-slate-600 mt-1">
            Gérez les demandes de devis
          </p>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="sent">Devis envoyé</SelectItem>
            <SelectItem value="accepted">Acceptés</SelectItem>
            <SelectItem value="rejected">Refusés</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Chargement...</div>
        ) : filteredQuotes.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {filteredQuotes.map((quote) => (
              <div key={quote.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg text-slate-900">
                        {quote.client_name}
                      </h3>
                      <Badge className={statusColors[quote.status]}>
                        {statusLabels[quote.status]}
                      </Badge>
                      <Badge variant="outline">
                        {interventionLabels[quote.intervention_type] || quote.intervention_type}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                      <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {quote.client_phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {quote.city}
                      </span>
                    </div>

                    <p className="text-sm text-slate-500 max-w-2xl">
                      <FileText className="w-4 h-4 inline mr-1" />
                      {quote.description}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {quote.status === "pending" && (
                      <Button
                        size="sm"
                        onClick={() => updateStatus(quote.id, "sent")}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Send className="w-4 h-4 mr-1" />
                        Marquer envoyé
                      </Button>
                    )}
                    {quote.status === "sent" && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => updateStatus(quote.id, "accepted")}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Accepté
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateStatus(quote.id, "rejected")}
                        >
                          Refusé
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-slate-500">
            Aucune demande de devis {filter !== "all" ? "avec ce statut" : ""}
          </div>
        )}
      </div>
    </div>
  );
}
