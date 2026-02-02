import { NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/mongodb";
import GoogleToken from "@/models/GoogleToken";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ connected: false });
    }

    await dbConnect();
    const token = await GoogleToken.findOne({ user_email: session.user.email });

    return NextResponse.json({
      connected: !!token,
    });
  } catch (error) {
    console.error("Error checking calendar status:", error);
    return NextResponse.json({ connected: false });
  }
}
