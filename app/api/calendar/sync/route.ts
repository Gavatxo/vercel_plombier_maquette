import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import GoogleToken from "@/models/GoogleToken";
import { createCalendarEvent } from "@/lib/google-calendar";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    console.log("Calendar sync - Session user:", session?.user?.email || "no email");

    if (!session?.user) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }

    const userEmail = session.user.email || process.env.ADMIN_EMAIL;

    if (!userEmail) {
      return NextResponse.json(
        { error: "Email non trouvé" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { appointmentId } = body;
    console.log("Calendar sync - Appointment ID:", appointmentId);

    if (!appointmentId) {
      return NextResponse.json(
        { error: "ID du rendez-vous manquant" },
        { status: 400 }
      );
    }

    await dbConnect();
    console.log("Calendar sync - Connected to DB");

    const token = await GoogleToken.findOne({ user_email: userEmail });
    console.log("Calendar sync - Token found:", !!token);
    console.log("Calendar sync - Has refresh token:", !!token?.refresh_token);

    if (!token) {
      return NextResponse.json(
        { error: "Google Calendar non connecté. Veuillez d'abord connecter votre compte Google." },
        { status: 400 }
      );
    }

    if (!token.refresh_token) {
      return NextResponse.json(
        { error: "Token de rafraîchissement manquant. Veuillez reconnecter Google Calendar." },
        { status: 400 }
      );
    }

    const appointment = await Appointment.findOne({ id: appointmentId });
    console.log("Calendar sync - Appointment found:", !!appointment);

    if (!appointment) {
      return NextResponse.json(
        { error: "Rendez-vous non trouvé" },
        { status: 404 }
      );
    }

    console.log("Calendar sync - Appointment data:", {
      client_name: appointment.client_name,
      preferred_date: appointment.preferred_date,
      preferred_time: appointment.preferred_time,
    });

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

    console.log("Calendar sync - Success, event ID:", event.id);

    return NextResponse.json({
      success: true,
      eventId: event.id,
      eventLink: event.htmlLink,
    });
  } catch (error: any) {
    console.error("Calendar sync - Error:", error.message);
    console.error("Calendar sync - Full error:", error);

    // Check for specific Google API errors
    if (error.message?.includes("invalid_grant") || error.message?.includes("Token has been expired")) {
      return NextResponse.json(
        { error: "Session Google expirée. Veuillez reconnecter Google Calendar depuis le Dashboard." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: `Erreur: ${error.message || "Erreur lors de la synchronisation"}` },
      { status: 500 }
    );
  }
}
