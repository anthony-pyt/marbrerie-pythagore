import axios from "axios";

// Cache en mémoire (attention : reset à chaque redéploiement / cold start serverless)
const cache = new Map();
const CACHE_TTL = 300 * 1000; // 5 minutes
const REQUEST_TIMEOUT = 10 * 1000; // 10s

const apiClient = axios.create({
  timeout: REQUEST_TIMEOUT,
});

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  // Inclut les query params dans la clé de cache si tu veux les supporter
  const cacheKey = `inspirations:${searchParams.toString()}`;

  const cached = cache.get(cacheKey);
  const now = Date.now();

  // Retourne le cache s'il est valide
  if (cached && now - cached.timestamp < CACHE_TTL) {
    return Response.json(cached.data, {
      headers: { "X-Cache": "HIT" },
    });
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_STOCK_URL;

  if (!apiUrl) {
    console.error("NEXT_PUBLIC_API_STOCK_URL is not defined");
    return Response.json(
      { error: "Server misconfiguration" },
      { status: 500 },
    );
  }

  try {
    const response = await apiClient.get(`${apiUrl}/stock/inspirations`, {
      params: Object.fromEntries(searchParams),
    });

    cache.set(cacheKey, {
      data: response.data,
      timestamp: now,
    });

    return Response.json(response.data, {
      headers: { "X-Cache": "MISS" },
    });
  } catch (error) {
    // Si une erreur survient mais qu'on a un cache expiré, on peut le renvoyer en fallback
    if (cached) {
      console.warn("Falling back to stale cache due to fetch error");
      return Response.json(cached.data, {
        headers: { "X-Cache": "STALE" },
      });
    }

    const status = error.response?.status || 500;
    const message =
      error.code === "ECONNABORTED"
        ? "Request timed out"
        : error.response?.data || error.message || "Failed to fetch inspirations";

    console.error("Error fetching inspirations:", {
      message: error.message,
      status,
    });

    return Response.json({ error: message }, { status });
  }
}