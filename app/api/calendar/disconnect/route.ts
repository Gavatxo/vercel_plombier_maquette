import { NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/mongodb";
import GoogleToken from "@/models/GoogleToken";

export async function POST() {
  try {
    const session = await auth();

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

    await dbConnect();
    await GoogleToken.deleteOne({ user_email: userEmail });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error disconnecting calendar:", error);
    return NextResponse.json(
      { error: "Erreur lors de la déconnexion" },
      { status: 500 }
    );
  }
}
