import { NextRequest, NextResponse } from "next/server";
import { getTokens } from "@/lib/google-calendar";
import dbConnect from "@/lib/mongodb";
import GoogleToken from "@/models/GoogleToken";
import { auth } from "@/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    console.log("Calendar callback - Session:", JSON.stringify(session, null, 2));

    if (!session?.user) {
      console.log("Calendar callback - No session, redirecting to login");
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const userEmail = session.user.email || process.env.ADMIN_EMAIL;

    if (!userEmail) {
      console.log("Calendar callback - No email found");
      return NextResponse.redirect(
        new URL("/admin?calendar_error=no_email", request.url)
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    console.log("Calendar callback - Code:", code ? "present" : "missing");
    console.log("Calendar callback - Error:", error);

    if (error) {
      console.error("OAuth error:", error);
      return NextResponse.redirect(
        new URL("/admin?calendar_error=access_denied", request.url)
      );
    }

    if (!code) {
      console.log("Calendar callback - No code in URL");
      return NextResponse.redirect(
        new URL("/admin?calendar_error=no_code", request.url)
      );
    }

    console.log("Calendar callback - Getting tokens from Google...");
    const tokens = await getTokens(code);
    console.log("Calendar callback - Tokens received:", {
      access_token: tokens.access_token ? "present" : "missing",
      refresh_token: tokens.refresh_token ? "present" : "missing",
    });

    if (!tokens.access_token) {
      console.log("Calendar callback - No access token");
      return NextResponse.redirect(
        new URL("/admin?calendar_error=no_access_token", request.url)
      );
    }

    await dbConnect();
    console.log("Calendar callback - Connected to DB");

    const result = await GoogleToken.findOneAndUpdate(
      { user_email: userEmail },
      {
        user_email: userEmail,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token || "",
        expiry_date: tokens.expiry_date,
        updated_at: new Date(),
      },
      { upsert: true, new: true }
    );

    console.log("Calendar callback - Token saved for:", userEmail);

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
