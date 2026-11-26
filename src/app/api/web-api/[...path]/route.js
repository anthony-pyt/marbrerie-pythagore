import { NextResponse } from "next/server";
import { gatewayUrl } from "@/lib/session/auth-api";
import { authUnavailableResponse, commitSession, currentSession, getSession, sessionExpiredResponse } from "@/lib/session/server";
import { forwardedFor } from "@/lib/client-address";

const GATEWAY_TIMEOUT_MS = 30_000;
/** Rejouées après un 401 et un renouvellement : seulement les méthodes idempotentes (une écriture n'est jamais rejouée). */
const REPLAYABLE_METHODS = new Set(["GET", "HEAD", "PUT", "DELETE"]);

/**
 * Relais du site vers api-marbrerie-pythagore (contenu : blog, offres d'emploi, avis, formulaires), toujours par la
 * Gateway (`/api/web-api/*`, 23/11/2026) : le navigateur n'appelle plus l'API directement. Lectures et formulaires
 * publics sans session ; avec une session de l'espace d'administration, son jeton est joint (renouvelé si besoin).
 * Limité au préfixe `web-api` : ce n'est pas un relais ouvert vers la Gateway.
 */
async function handler(req, { params }) {
  const path = (await params).path.map(encodeURIComponent).join("/");
  const search = req.nextUrl.searchParams.toString();
  const url = gatewayUrl(`web-api/${path}${search ? `?${search}` : ""}`);

  let outcome = null;
  if (getSession(req)) {
    outcome = await currentSession(req);
    if (outcome.status === "expired" || outcome.status === "none") return sessionExpiredResponse();
    if (outcome.status === "unavailable") return authUnavailableResponse();
  }

  // Corps relayé tel quel (JSON ou multipart d'une candidature), avec son type.
  const body = ["GET", "HEAD"].includes(req.method) ? undefined : await req.arrayBuffer();
  const call = (token) => fetch(url, {
    method: req.method,
    headers: {
      Accept: "application/json",
      ...forwardedFor(req),
      ...(req.headers.get("content-type") && { "Content-Type": req.headers.get("content-type") }),
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body,
    cache: "no-store",
    redirect: "manual",
    signal: AbortSignal.timeout(GATEWAY_TIMEOUT_MS),
  });

  let response;
  try {
    response = await call(outcome?.session.accessToken);
    if (response.status === 401 && outcome) {
      const renewed = await currentSession(req, { session: outcome.session, force: true });
      if (renewed.status === "expired" || renewed.status === "none") return sessionExpiredResponse();
      if (renewed.status === "unavailable") return authUnavailableResponse();
      outcome = renewed;
      if (REPLAYABLE_METHODS.has(req.method)) response = await call(outcome.session.accessToken);
    }
  } catch (error) {
    console.error(`[web-api] Gateway injoignable (${req.method} ${path})`, error.name);
    return NextResponse.json({ message: "Service indisponible. Merci de réessayer." }, { status: 502 });
  }

  const headers = { "Cache-Control": "no-store" };
  const contentType = response.headers.get("content-type");
  if (contentType) headers["Content-Type"] = contentType;
  const status = response.status >= 300 && response.status < 400 ? 502 : response.status;
  const relayed = new NextResponse(status === 204 ? null : response.body, { status, headers });

  return outcome ? commitSession(relayed, outcome) : relayed;
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
