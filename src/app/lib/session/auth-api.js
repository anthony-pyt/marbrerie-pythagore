import { forwardedFor } from "../client-address.js";
// Appels serveur → Gateway → auth-api pour la session de l'espace d'administration du site (modèle : extranet-front-v2,
// src/lib/session/auth-api.js). Les jetons et mots de passe ne sont jamais journalisés ni renvoyés au navigateur.
//   - connexion : POST {NEXT_API_GATEWAY_URL}/authenticate/api/login (public) → auth-api POST /api/login, compte interne
//     (`user_type` pythagore) et client OAuth du site, dont le secret reste côté serveur ;
//   - renouvellement : POST {NEXT_API_GATEWAY_URL}/authenticate/oauth/token (public), grant refresh_token ;
//   - révocation : POST {NEXT_API_GATEWAY_URL}/auth-access/sso/revoke (Bearer) : le seul jeton de cette session.
// NEXT_API_GATEWAY_URL se termine par /api (ex. http://gateway-api:8000/api).

const LOGIN_TIMEOUT_MS = 15_000;
const REFRESH_TIMEOUT_MS = 10_000;
const REVOKE_TIMEOUT_MS = 5_000;

/** Seuls les comptes internes ouvrent l'espace d'administration (décision du 23/11/2026). */
export const SITE_USER_TYPE = "pythagore";

export function gatewayUrl(path) {
  const base = process.env.NEXT_API_GATEWAY_URL;
  if (!base) throw new Error("NEXT_API_GATEWAY_URL manquant");
  return `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

function passwordClient() {
  const clientId = process.env.SITE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.SITE_OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) throw new Error("SITE_OAUTH_CLIENT_ID / SITE_OAUTH_CLIENT_SECRET manquants");
  return { client_id: clientId, client_secret: clientSecret };
}

async function postJson(path, body, { timeoutMs, token, headers = {} } = {}) {
  return fetch(gatewayUrl(path), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    body: JSON.stringify(body ?? {}),
    cache: "no-store",
    redirect: "manual",
    signal: AbortSignal.timeout(timeoutMs),
  });
}

/** @returns {Promise<{ ok: true, data: object } | { ok: false, status: number }>} */
/** `request` : requête du navigateur, pour transmettre l'adresse du visiteur (limite de tentatives par adresse). */
export async function loginWithPassword({ login, password, request }) {
  let response;
  try {
    response = await postJson(
      "authenticate/api/login",
      { email: login, password, user_type: SITE_USER_TYPE, grant_type: "password", ...passwordClient() },
      { timeoutMs: LOGIN_TIMEOUT_MS, headers: forwardedFor(request) },
    );
  } catch (error) {
    console.error("[session] connexion : Gateway injoignable", error.name);
    return { ok: false, status: 502 };
  }

  const payload = await response.json().catch(() => null);
  if (response.ok && typeof payload?.data?.access_token === "string") return { ok: true, data: payload.data };
  return { ok: false, status: response.status };
}

/** Nouveaux jetons, `null` si auth-api refuse (400/401), exception si auth-api ou la Gateway est injoignable (5xx). */
export async function refreshTokens(refreshToken) {
  const response = await postJson(
    "authenticate/oauth/token",
    { grant_type: "refresh_token", refresh_token: refreshToken, scope: "", ...passwordClient() },
    { timeoutMs: REFRESH_TIMEOUT_MS },
  );
  const payload = await response.json().catch(() => null);

  if (response.ok && typeof payload?.access_token === "string") return payload;
  if (response.status === 400 || response.status === 401) return null;
  throw new Error(`renouvellement impossible (HTTP ${response.status})`);
}

/** Révoque le jeton d'accès et son jeton de rafraîchissement ; la session locale est effacée quoi qu'il arrive. */
export async function revokeToken(accessToken) {
  try {
    const response = await postJson("auth-access/sso/revoke", {}, { timeoutMs: REVOKE_TIMEOUT_MS, token: accessToken });
    return response.ok;
  } catch (error) {
    console.warn("[session] révocation impossible (Gateway injoignable)", error.name);
    return false;
  }
}

/** Claims d'un JWT (sans vérification : il vient d'auth-api, reçu de serveur à serveur par la Gateway). */
export function tokenClaims(accessToken) {
  try {
    return JSON.parse(Buffer.from(String(accessToken).split(".")[1], "base64url").toString("utf8"));
  } catch {
    return null;
  }
}

/**
 * Gérer le site = administrateur interne (décision de l'utilisateur du 23/11/2026 : rôles admin et super-admin), c'est-à-
 * dire le claim `is_super_admin` posé par auth-api pour les rôles de sa liste `super_admin_roles` (admin, Super Admin,
 * Dev). api-marbrerie-pythagore revérifie chaque écriture (RequireSiteAdministrator).
 */
export function canManageSite(claims) {
  return claims?.identity?.user_type === SITE_USER_TYPE && !claims?.is_machine && claims?.is_super_admin === true;
}
