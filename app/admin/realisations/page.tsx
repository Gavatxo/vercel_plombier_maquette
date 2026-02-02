"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

interface Realisation {
  id: string;
  title: string;
  category: string;
  location: string;
  date: string;
  published: boolean;
  images: string[];
}

export default function RealisationsAdminPage() {
  const [realisations, setRealisations] = useState<Realisation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRealisations = async () => {
    try {
      const response = await fetch("/api/realisations");
      if (response.ok) {
        const data = await response.json();
        setRealisations(data);
      }
    } catch (error) {
      console.error("Error fetching realisations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealisations();
  }, []);

  const togglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/realisations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !currentStatus }),
      });

      if (response.ok) {
        toast.success(currentStatus ? "Réalisation dépubliée" : "Réalisation publiée");
        fetchRealisations();
      }
    } catch (error) {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const deleteRealisation = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette réalisation ?")) return;

    try {
      const response = await fetch(`/api/realisations/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Réalisation supprimée");
        fetchRealisations();
      }
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Réalisations</h1>
          <p className="text-slate-600 mt-1">
            Gérez vos projets et réalisations
          </p>
        </div>
        <Link href="/admin/realisations/new">
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle réalisation
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Chargement...</div>
        ) : realisations.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {realisations.map((realisation) => (
              <div
                key={realisation.id}
                className="p-6 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  {realisation.images[0] && (
                    <img
                      src={realisation.images[0]}
                      alt={realisation.title}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {realisation.title}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {realisation.category} - {realisation.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant={realisation.published ? "default" : "secondary"}
                  >
                    {realisation.published ? "Publié" : "Brouillon"}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => togglePublished(realisation.id, realisation.published)}
                    title={realisation.published ? "Dépublier" : "Publier"}
                  >
                    {realisation.published ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                  <Link href={`/admin/realisations/${realisation.id}`}>
                    <Button variant="ghost" size="icon">
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteRealisation(realisation.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-slate-500">
            Aucune réalisation pour le moment
          </div>
        )}
      </div>
    </div>
  );
}
