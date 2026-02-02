import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Quote from "@/models/Quote";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  try {
    await dbConnect();
    const quotes = await Quote.find({}).sort({ created_at: -1 });
    return NextResponse.json(quotes);
  } catch (error) {
    console.error("Error fetching quotes:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des devis" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();

    const quote = new Quote({
      id: uuidv4(),
      ...body,
      status: "pending",
      created_at: new Date(),
    });

    await quote.save();

    return NextResponse.json(quote, { status: 201 });
  } catch (error) {
    console.error("Error creating quote:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du devis" },
      { status: 500 }
    );
  }
}
