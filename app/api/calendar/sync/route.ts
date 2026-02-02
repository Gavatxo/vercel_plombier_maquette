import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import { createCalendarEvent } from "@/lib/google-calendar";

export async function POST(request: NextRequest) {
  try {
    const { appointmentId, accessToken, refreshToken } = await request.json();

    if (!appointmentId || !accessToken || !refreshToken) {
      return NextResponse.json(
        { error: "Paramètres manquants" },
        { status: 400 }
      );
    }

    await dbConnect();
    const appointment = await Appointment.findOne({ id: appointmentId });

    if (!appointment) {
      return NextResponse.json(
        { error: "Rendez-vous non trouvé" },
        { status: 404 }
      );
    }

    // Créer l'événement dans Google Calendar
    const event = await createCalendarEvent(accessToken, refreshToken, {
      client_name: appointment.client_name,
      client_phone: appointment.client_phone,
      intervention_type: appointment.intervention_type,
      city: appointment.city,
      preferred_date: appointment.preferred_date,
      preferred_time: appointment.preferred_time,
      description: appointment.description,
    });

    // Mettre à jour le rendez-vous avec l'ID de l'événement Google Calendar
    await Appointment.findOneAndUpdate(
      { id: appointmentId },
      { google_calendar_event_id: event.id }
    );

    return NextResponse.json({
      success: true,
      eventId: event.id,
      eventLink: event.htmlLink,
    });
  } catch (error) {
    console.error("Error syncing to Google Calendar:", error);
    return NextResponse.json(
      { error: "Erreur lors de la synchronisation avec Google Calendar" },
      { status: 500 }
    );
  }
}
