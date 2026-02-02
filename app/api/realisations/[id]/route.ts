import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Realisation from "@/models/Realisation";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const realisation = await Realisation.findOne({ id });

    if (!realisation) {
      return NextResponse.json(
        { error: "Réalisation non trouvée" },
        { status: 404 }
      );
    }

    return NextResponse.json(realisation);
  } catch (error) {
    console.error("Error fetching realisation:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération de la réalisation" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();

    const realisation = await Realisation.findOneAndUpdate(
      { id },
      { ...body, updated_at: new Date() },
      { new: true }
    );

    if (!realisation) {
      return NextResponse.json(
        { error: "Réalisation non trouvée" },
        { status: 404 }
      );
    }

    return NextResponse.json(realisation);
  } catch (error) {
    console.error("Error updating realisation:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de la réalisation" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const realisation = await Realisation.findOneAndDelete({ id });

    if (!realisation) {
      return NextResponse.json(
        { error: "Réalisation non trouvée" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Réalisation supprimée" });
  } catch (error) {
    console.error("Error deleting realisation:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de la réalisation" },
      { status: 500 }
    );
  }
}
