import { NextResponse } from "next/server";
import { authUnavailableResponse, commitSession, currentSession, sessionExpiredResponse } from "@/lib/session/server";

/** Session de l'espace d'administration : nom à afficher, ou 401 (cookies effacés). Renouvelle le jeton si besoin. */
export async function GET(req) {
  const outcome = await currentSession(req);
  if (outcome.status === "expired" || outcome.status === "none") return sessionExpiredResponse();
  if (outcome.status === "unavailable") return authUnavailableResponse();

  return commitSession(NextResponse.json({ user: outcome.session.user }, { headers: { "Cache-Control": "no-store" } }), outcome);
}
