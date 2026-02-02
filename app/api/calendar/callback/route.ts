import { NextRequest, NextResponse } from "next/server";
import { getTokens } from "@/lib/google-calendar";
import dbConnect from "@/lib/mongodb";
import GoogleToken from "@/models/GoogleToken";
import { auth } from "@/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      console.error("OAuth error:", error);
      return NextResponse.redirect(
        new URL("/admin?calendar_error=access_denied", request.url)
      );
    }

    if (!code) {
      return NextResponse.redirect(
        new URL("/admin?calendar_error=no_code", request.url)
      );
    }

    const tokens = await getTokens(code);

    if (!tokens.access_token || !tokens.refresh_token) {
      return NextResponse.redirect(
        new URL("/admin?calendar_error=no_tokens", request.url)
      );
    }

    await dbConnect();

    await GoogleToken.findOneAndUpdate(
      { user_email: session.user.email },
      {
        user_email: session.user.email,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expiry_date: tokens.expiry_date,
        updated_at: new Date(),
      },
      { upsert: true, new: true }
    );

    return NextResponse.redirect(
      new URL("/admin?calendar_connected=true", request.url)
    );
  } catch (error) {
    console.error("Error in calendar callback:", error);
    return NextResponse.redirect(
      new URL("/admin?calendar_error=unknown", request.url)
    );
  }
}
