import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import GoogleToken from "@/models/GoogleToken";
import { createCalendarEvent } from "@/lib/google-calendar";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }

    const { appointmentId } = await request.json();

    if (!appointmentId) {
      return NextResponse.json(
        { error: "ID du rendez-vous manquant" },
        { status: 400 }
      );
    }

    await dbConnect();

    const token = await GoogleToken.findOne({ user_email: session.user.email });

    if (!token) {
      return NextResponse.json(
        { error: "Google Calendar non connecté. Veuillez d'abord connecter votre compte Google." },
        { status: 400 }
      );
    }

    const appointment = await Appointment.findOne({ id: appointmentId });

    if (!appointment) {
      return NextResponse.json(
        { error: "Rendez-vous non trouvé" },
        { status: 404 }
      );
    }

    const event = await createCalendarEvent(token.access_token, token.refresh_token, {
      client_name: appointment.client_name,
      client_phone: appointment.client_phone,
      intervention_type: appointment.intervention_type,
      city: appointment.city,
      preferred_date: appointment.preferred_date,
      preferred_time: appointment.preferred_time,
      description: appointment.description,
    });

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
