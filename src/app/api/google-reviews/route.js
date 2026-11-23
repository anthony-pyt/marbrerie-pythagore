// app/api/google-reviews/route.js
import axios from "axios";
import { NextResponse } from "next/server";
import { gatewayUrl } from "@/lib/session/auth-api";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await axios.get(
      // Par la Gateway (/api/web-api/*), comme tout appel à api-marbrerie-pythagore (23/11/2026).
      gatewayUrl("web-api/get_google_reviews"),
      { timeout: 10_000 },
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Erreur API Google Reviews:", error.message);
    return NextResponse.json({ error: "Service Unavailable" }, { status: 503 });
  }
}
