import { google } from "googleapis";

const getOAuth2Client = () => {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
};

export const getAuthUrl = () => {
  const oauth2Client = getOAuth2Client();
  const scopes = [
    "https://www.googleapis.com/auth/calendar.events",
    "https://www.googleapis.com/auth/calendar",
  ];

  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    prompt: "consent", // Force to get refresh token
  });
};

export const getTokens = async (code: string) => {
  const oauth2Client = getOAuth2Client();
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
  const oauth2Client = getOAuth2Client();

  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  // Handle token refresh
  oauth2Client.on("tokens", (tokens) => {
    console.log("New tokens received:", tokens.access_token ? "access_token present" : "no access_token");
  });

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  // Parse date and time with better error handling
  let startDateTime: string;
  let endDateTime: string;

  try {
    if (appointment.preferred_time.includes("-")) {
      const [startTime, endTime] = appointment.preferred_time.split("-");
      startDateTime = `${appointment.preferred_date}T${startTime.trim()}:00`;
      endDateTime = `${appointment.preferred_date}T${endTime.trim()}:00`;
    } else {
      // Fallback: use the time as start and add 1 hour for end
      startDateTime = `${appointment.preferred_date}T${appointment.preferred_time}:00`;
      const startHour = parseInt(appointment.preferred_time.split(":")[0]);
      const endHour = (startHour + 1).toString().padStart(2, "0");
      endDateTime = `${appointment.preferred_date}T${endHour}:00:00`;
    }
  } catch (error) {
    console.error("Error parsing date/time:", error);
    console.error("preferred_date:", appointment.preferred_date);
    console.error("preferred_time:", appointment.preferred_time);
    throw new Error(`Invalid date/time format: ${appointment.preferred_date} ${appointment.preferred_time}`);
  }

  console.log("Creating calendar event with:", {
    startDateTime,
    endDateTime,
    client_name: appointment.client_name,
  });

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

  try {
    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
    });

    console.log("Calendar event created successfully:", response.data.id);
    return response.data;
  } catch (error: any) {
    console.error("Google Calendar API error:", error.message);
    console.error("Error details:", error.response?.data || error);
    throw error;
  }
};
