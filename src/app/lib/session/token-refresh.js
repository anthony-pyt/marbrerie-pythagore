// Renouvellement des jetons d'auth-api (modèle : tablette-2025, src/lib/token-refresh.js). Module sans
// dépendance Next : testé par `npm test` (tests/session.test.mjs).

/** Le jeton d'accès est renouvelé 2 minutes avant son expiration, pas au milieu d'une requête. */
export const REFRESH_MARGIN_MS = 120_000;

/**
 * Durée de vie du jeton de rafraîchissement (décision du 09/11/2026 : 3 jours). auth-api ne la renvoie pas
 * (réponse OAuth : `expires_in` ne concerne que le jeton d'accès) : la session et ses cookies durent donc
 * 3 jours à partir du dernier renouvellement. À aligner sur REFRESH_TOKEN_TTL_DAYS d'auth-api.
 */
export const REFRESH_TOKEN_TTL_SECONDS = 3 * 24 * 60 * 60;

/**
 * Session construite à partir d'une réponse d'auth-api (`access_token`, `refresh_token`, `expires_in`).
 * `expiresAt` / `refreshExpiresAt` : horodatages en millisecondes. Sans `expires_in` lisible, le jeton est
 * considéré comme expiré (il sera renouvelé à la requête suivante).
 */
export function sessionFromTokens(tokens, { user, now = Date.now() } = {}) {
  const expiresIn = Number(tokens.expires_in);
  return {
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token ?? null,
    expiresAt: Number.isFinite(expiresIn) && expiresIn > 0 ? now + expiresIn * 1000 : now,
    refreshExpiresAt: now + REFRESH_TOKEN_TTL_SECONDS * 1000,
    user: user ?? null,
  };
}

/** Faut-il renouveler ? Seulement avec un jeton de rafraîchissement et un jeton d'accès qui expire bientôt. */
export function needsRefresh(session, now = Date.now(), marginMs = REFRESH_MARGIN_MS) {
  return Boolean(session?.refreshToken) && Number.isFinite(session.expiresAt) && session.expiresAt - now <= marginMs;
}

/**
 * auth-api invalide un jeton de rafraîchissement dès qu'il a servi. Le navigateur envoie souvent plusieurs
 * requêtes à la fois avec le même cookie : un seul renouvellement doit partir, et son résultat est gardé
 * `keepMs` pour les requêtes arrivées juste après avec l'ancien cookie. Un échec réseau n'est pas gardé
 * (nouvel essai possible) ; un refus (résultat `null`) l'est, pour que toutes ces requêtes concluent à la
 * même déconnexion.
 *
 * @param {{ refresh: (refreshToken: string) => Promise<object|null>, now?: () => number, keepMs?: number }} options
 * @returns {(refreshToken: string) => Promise<object|null>}
 */
export function createRefreshCoalescer({ refresh, now = Date.now, keepMs = 30_000 }) {
  const entries = new Map();

  return function refreshOnce(refreshToken) {
    for (const [key, entry] of entries) {
      if (entry.settledAt !== null && now() - entry.settledAt >= keepMs) entries.delete(key);
    }

    const existing = entries.get(refreshToken);
    if (existing) return existing.promise;

    const entry = { settledAt: null, promise: null };
    entry.promise = Promise.resolve()
      .then(() => refresh(refreshToken))
      .then(
        (result) => {
          entry.settledAt = now();
          return result;
        },
        (error) => {
          entries.delete(refreshToken);
          throw error;
        },
      );
    entries.set(refreshToken, entry);

    return entry.promise;
  };
}

/**
 * Décide et effectue le renouvellement d'une session.
 * - `none` : pas de session ;
 * - `unchanged` : jeton encore valable (hors marge), ou auth-api injoignable alors que le jeton est encore valable ;
 * - `renewed` : nouveaux jetons (les cookies doivent être réécrits) ;
 * - `expired` : auth-api refuse le jeton de rafraîchissement, ou il n'y en a pas alors qu'il le faudrait
 *   (les cookies doivent être effacés, réponse 401) ;
 * - `unavailable` : auth-api injoignable et jeton d'accès inutilisable (expiré ou refusé) : session gardée,
 *   réponse 503 (une coupure d'auth-api ne déconnecte personne).
 *
 * `force` : la Gateway a répondu 401 avec le jeton courant, il faut le remplacer même s'il n'est pas expiré.
 */
export async function renewSession(session, { refreshOnce, force = false, now = Date.now() }) {
  if (!session) return { status: "none", session: null };
  const accessExpired = !Number.isFinite(session.expiresAt) || session.expiresAt <= now;
  if (!force && !needsRefresh(session, now)) {
    return accessExpired ? { status: "expired", session: null } : { status: "unchanged", session };
  }
  if (!session.refreshToken) return { status: "expired", session: null };

  let tokens;
  try {
    tokens = await refreshOnce(session.refreshToken);
  } catch {
    return force || accessExpired ? { status: "unavailable", session } : { status: "unchanged", session };
  }
  if (!tokens?.access_token) return { status: "expired", session: null };

  return { status: "renewed", session: sessionFromTokens(tokens, { user: session.user, now }) };
}
