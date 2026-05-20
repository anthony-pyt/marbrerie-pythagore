import axios from "axios";

const cache = new Map();
const CACHE_TTL = 60 * 1000;

export async function GET(request) {
  const cacheKey = JSON.stringify("product_only_matieres");
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return Response.json(cached.data);
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_STOCK_URL;
  
  try {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());

    const response = await axios.get(`${apiUrl}/products_only_matieres`, {
      params,
    });

    cache.set(cacheKey, {
      data: response.data,
      timestamp: Date.now(),
    });

    return Response.json(response.data);
  } catch (error) {
    console.error("Error fetching products:", error);
    return Response.json(
      { error: error.response?.data || "Failed to fetch products" },
      { status: error.response?.status || 500 },
    );
  }
}
