import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export const getAuthUrl = () => {
  const scopes = [
    "https://www.googleapis.com/auth/calendar.events",
    "https://www.googleapis.com/auth/calendar",
  ];

  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
};

export const getTokens = async (code: string) => {
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
};

export const createCalendarEvent = async (
  accessToken: string,
  refreshToken: string,
  appointment: {
    client_name: string;
    client_phone: string;
    intervention_type: string;
    city: string;
    preferred_date: string;
    preferred_time: string;
    description?: string;
  }
) => {
  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  // Parse date and time
  const [startTime, endTime] = appointment.preferred_time.split("-");
  const startDateTime = `${appointment.preferred_date}T${startTime.trim()}:00`;
  const endDateTime = `${appointment.preferred_date}T${endTime.trim()}:00`;

  const interventionLabels: Record<string, string> = {
    depannage_urgence: "Dépannage urgence",
    fuite_eau: "Fuite d'eau",
    chaudiere_panne: "Chaudière en panne",
    entretien_chaudiere: "Entretien chaudière",
    installation: "Installation",
    renovation_sdb: "Rénovation salle de bain",
    autre: "Autre",
  };

  const event = {
    summary: `RDV: ${appointment.client_name} - ${interventionLabels[appointment.intervention_type] || appointment.intervention_type}`,
    description: `
Client: ${appointment.client_name}
Téléphone: ${appointment.client_phone}
Ville: ${appointment.city}
Type: ${interventionLabels[appointment.intervention_type] || appointment.intervention_type}

${appointment.description || "Pas de description"}
    `.trim(),
    start: {
      dateTime: startDateTime,
      timeZone: "Europe/Paris",
    },
    end: {
      dateTime: endDateTime,
      timeZone: "Europe/Paris",
    },
    location: appointment.city,
    reminders: {
      useDefault: false,
      overrides: [
        { method: "popup", minutes: 60 },
        { method: "popup", minutes: 30 },
      ],
    },
  };

  const response = await calendar.events.insert({
    calendarId: "primary",
    requestBody: event,
  });

  return response.data;
};
