export type InterventionType =
  | "depannage_urgence"
  | "fuite_eau"
  | "chaudiere_panne"
  | "entretien_chaudiere"
  | "installation"
  | "renovation_sdb"
  | "autre";

export type UrgencyLevel = "urgence" | "rapide" | "normal";

export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";

export type QuoteStatus = "pending" | "sent" | "accepted" | "rejected";

export type RealisationCategory = "Salle de bain" | "Chauffage" | "Dépannage" | "Plomberie";

export interface Appointment {
  _id?: string;
  id: string;
  client_name: string;
  client_phone: string;
  client_email?: string;
  intervention_type: InterventionType;
  urgency: UrgencyLevel;
  city: string;
  preferred_date: string;
  preferred_time: string;
  description?: string;
  status: AppointmentStatus;
  google_calendar_event_id?: string;
  created_at: Date;
}

export interface Quote {
  _id?: string;
  id: string;
  client_name: string;
  client_phone: string;
  client_email?: string;
  intervention_type: InterventionType;
  city: string;
  description: string;
  photos_urls?: string[];
  status: QuoteStatus;
  created_at: Date;
}

export interface Realisation {
  _id?: string;
  id: string;
  title: string;
  category: RealisationCategory;
  location: string;
  date: string;
  description: string;
  images: string[];
  tags: string[];
  published: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface User {
  _id?: string;
  id: string;
  email: string;
  password_hash: string;
  name: string;
  role: "admin";
  created_at: Date;
}
