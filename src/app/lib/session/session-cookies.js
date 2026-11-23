// Cookies de session du site public (espace d'administration) : HttpOnly, chiffrés (seal.js), jamais lisibles par le navigateur.
// Deux cookies, comme la tablette : le JWT d'auth-api porte rôles et permissions (≈ 2,3 Ko mesurés le
// 05/11/2026) ; avec le jeton de rafraîchissement dans le même cookie chiffré, la limite de 4 Ko des
// navigateurs serait dépassée. Module sans dépendance Next (testé par `npm test`).

import { seal, unseal } from "./seal.js";

export const SESSION_COOKIE = "site_session";
export const REFRESH_COOKIE = "site_refresh";

function cookieOptions(maxAgeSeconds, secure) {
  return { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: maxAgeSeconds };
}

/**
 * Session `{ accessToken, refreshToken, expiresAt, refreshExpiresAt, user }` lue dans les cookies de la
 * requête (`cookies.get(name)?.value`, API de NextRequest), ou null si absente, altérée ou périmée.
 */
export function readSession(cookies, secret, now = Date.now()) {
  const main = unseal(cookies.get(SESSION_COOKIE)?.value, secret, "session");
  if (typeof main?.accessToken !== "string") return null;
  if (Number.isFinite(main.refreshExpiresAt) && main.refreshExpiresAt <= now) return null;
  const refresh = unseal(cookies.get(REFRESH_COOKIE)?.value, secret, "refresh");

  return {
    accessToken: main.accessToken,
    refreshToken: typeof refresh?.refreshToken === "string" ? refresh.refreshToken : null,
    expiresAt: main.expiresAt,
    refreshExpiresAt: main.refreshExpiresAt,
    user: main.user ?? null,
  };
}

/** Écrit la session dans les cookies d'une réponse (`response.cookies`, API de NextResponse). */
export function writeSession(cookies, session, secret, { secure = false, now = Date.now() } = {}) {
  const maxAge = Math.max(1, Math.floor((session.refreshExpiresAt - now) / 1000));
  const options = cookieOptions(maxAge, secure);
  const { refreshToken, ...main } = session;

  cookies.set(SESSION_COOKIE, seal(main, secret, "session"), options);
  if (refreshToken) {
    cookies.set(REFRESH_COOKIE, seal({ refreshToken }, secret, "refresh"), options);
  } else {
    cookies.set(REFRESH_COOKIE, "", cookieOptions(0, secure));
  }
}

/** Efface la session (cookies expirés immédiatement). */
export function clearSession(cookies, { secure = false } = {}) {
  cookies.set(SESSION_COOKIE, "", cookieOptions(0, secure));
  cookies.set(REFRESH_COOKIE, "", cookieOptions(0, secure));
}
