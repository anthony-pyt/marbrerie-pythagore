// Session côté serveur (route handlers Next) : lecture, renouvellement, écriture des cookies chiffrés.
import { NextResponse } from "next/server";
import { refreshTokens } from "./auth-api.js";
import { clearSession, readSession, writeSession } from "./session-cookies.js";
import { createRefreshCoalescer, renewSession } from "./token-refresh.js";

// Un seul renouvellement à la fois par jeton de rafraîchissement dans ce processus Next. Gardé sur
// globalThis : chaque route handler peut être compilé dans son propre bundle.
const refreshOnce = (globalThis.__siteRefreshOnce ??= createRefreshCoalescer({ refresh: refreshTokens }));

/** En-tête posé sur les 401 de session absente ou expirée : le navigateur renvoie alors vers /login. */
export const SESSION_EXPIRED_HEADER = "X-Session-Expired";

export function sessionSecret() {
  return process.env.SITE_SESSION_SECRET;
}

const secure = () => process.env.NODE_ENV === "production";

/** Session de la requête, sans renouvellement (null si absente, altérée ou périmée). */
export function getSession(req) {
  return readSession(req.cookies, sessionSecret());
}

/**
 * Session de la requête, renouvelée si le jeton d'accès expire dans moins de 2 minutes (ou toujours avec
 * `force`). Résultat de `renewSession` : `{ status, session }`, à reporter sur la réponse par `commitSession`.
 */
export async function currentSession(req, { force = false, session = getSession(req) } = {}) {
  return renewSession(session, { refreshOnce, force });
}

/** Reporte le résultat d'un renouvellement sur la réponse : cookies réécrits ou effacés. */
export function commitSession(response, outcome) {
  if (outcome.status === "renewed") {
    writeSession(response.cookies, outcome.session, sessionSecret(), { secure: secure() });
  } else if (outcome.status === "expired" || outcome.status === "none") {
    clearSession(response.cookies, { secure: secure() });
  }
  return response;
}

export function saveSession(response, session) {
  writeSession(response.cookies, session, sessionSecret(), { secure: secure() });
  return response;
}

export function destroySession(response) {
  clearSession(response.cookies, { secure: secure() });
  return response;
}

/** Réponse à une requête sans session valable : 401 + cookies effacés. */
export function sessionExpiredResponse() {
  const response = NextResponse.json(
    { error: "session_expired", message: "Votre session a expiré. Merci de vous reconnecter." },
    { status: 401, headers: { [SESSION_EXPIRED_HEADER]: "1", "Cache-Control": "no-store" } },
  );
  return destroySession(response);
}

/** auth-api injoignable alors que le jeton d'accès n'est plus utilisable : session gardée, nouvel essai possible. */
export function authUnavailableResponse() {
  return NextResponse.json(
    { error: "auth_unavailable", message: "Service d'authentification indisponible. Merci de réessayer." },
    { status: 503, headers: { "Cache-Control": "no-store" } },
  );
}
