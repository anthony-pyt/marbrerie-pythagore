// app/api/google-reviews/route.js
import axios from "axios";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/get_google_reviews`,
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Erreur API Google Reviews:", error.message);
    return NextResponse.json({ error: "Service Unavailable" }, { status: 503 });
  }
}
