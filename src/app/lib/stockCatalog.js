import { unstable_cache } from "next/cache";

/**
 * Lectures du catalogue de stock pour le site public, en cache côté serveur (cache de données Next) :
 * stock reçoit au plus un appel par donnée toutes les 10 minutes, quel que soit le nombre de visiteurs.
 * - Une erreur de stock n'est jamais mise en cache ; si stock échoue lors d'un rafraîchissement, la
 *   dernière version connue continue d'être servie.
 * - Toute modification du catalogue dans stock déclenche le webhook interne `catalog/changed`
 *   (src/app/api/webhook/internal/...) qui expire l'étiquette CATALOG_TAG : le site se met à jour aussitôt.
 */
export const CATALOG_TAG = "catalog";
const REVALIDATE_SECONDS = 600;
const TIMEOUT_MS = 10_000;

class StockError extends Error {
  constructor(status, data) {
    super(`stock a répondu ${status}`);
    this.status = status;
    this.data = data;
  }
}

async function fetchStock(path, query) {
  // Même construction d'URL qu'auparavant (NEXT_PUBLIC_API_STOCK_URL) : le routage de production ne change pas.
  const url = new URL(`${process.env.NEXT_PUBLIC_API_STOCK_URL}/stock/${path}`);
  Object.entries(query).forEach(([key, value]) => url.searchParams.append(key, value));

  const response = await fetch(url, {
    headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
    cache: "no-store", // le cache est unstable_cache, pas le cache fetch
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new StockError(response.status, data); // levée = jamais mise en cache
  }

  return data;
}

/** Lecture en cache d'un chemin de stock ; `query` fait partie de la clé de cache. */
export function getCatalog(path, query = {}) {
  const sorted = Object.fromEntries(Object.entries(query).sort(([a], [b]) => a.localeCompare(b)));

  return unstable_cache(() => fetchStock(path, sorted), ["stock", path, JSON.stringify(sorted)], {
    revalidate: REVALIDATE_SECONDS,
    tags: [CATALOG_TAG],
  })();
}

/** Route GET du site : lecture en cache, erreur de stock relayée avec son statut. */
export async function catalogResponse(path, request) {
  const query = request ? Object.fromEntries(new URL(request.url).searchParams.entries()) : {};

  try {
    return Response.json(await getCatalog(path, query));
  } catch (error) {
    console.error(`[stockCatalog] ${path}:`, error.message);
    const status = error instanceof StockError ? error.status : 503;

    return Response.json({ error: error.data ?? "Catalogue momentanément indisponible" }, { status });
  }
}
