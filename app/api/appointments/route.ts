import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  try {
    await dbConnect();
    const appointments = await Appointment.find({}).sort({ created_at: -1 });
    return NextResponse.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des rendez-vous" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();

    const appointment = new Appointment({
      id: uuidv4(),
      ...body,
      status: "pending",
      created_at: new Date(),
    });

    await appointment.save();

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du rendez-vous" },
      { status: 500 }
    );
  }
}
