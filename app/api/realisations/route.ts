import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Realisation from "@/models/Realisation";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const published = searchParams.get("published");

    let query = {};
    if (published === "true") {
      query = { published: true };
    }

    const realisations = await Realisation.find(query).sort({ created_at: -1 });
    return NextResponse.json(realisations);
  } catch (error) {
    console.error("Error fetching realisations:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des réalisations" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();

    const realisation = new Realisation({
      id: uuidv4(),
      ...body,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await realisation.save();

    return NextResponse.json(realisation, { status: 201 });
  } catch (error) {
    console.error("Error creating realisation:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la réalisation" },
      { status: 500 }
    );
  }
}
