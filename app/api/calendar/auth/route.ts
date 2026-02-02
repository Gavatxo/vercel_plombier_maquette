import { NextResponse } from "next/server";
import { getAuthUrl } from "@/lib/google-calendar";

export async function GET() {
  try {
    const authUrl = getAuthUrl();
    return NextResponse.json({ url: authUrl });
  } catch (error) {
    console.error("Error generating auth URL:", error);
    return NextResponse.json(
      { error: "Erreur lors de la génération de l'URL d'authentification" },
      { status: 500 }
    );
  }
}
