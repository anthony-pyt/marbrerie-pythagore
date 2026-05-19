import axios from "axios";

const cache = new Map();
const CACHE_TTL = 300 * 1000;

export async function GET() {
  const cacheKey = "categories-with-parent-matieres";
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return Response.json(cached.data);
  }

  const apiUrl = process.env.API_GATEWAY_URL;
  try {
    const response = await axios.get(`${apiUrl}/api/stock/categories-with-parent-matieres`);

    cache.set(cacheKey, {
      data: response.data,
      timestamp: Date.now(),
    });
    console.log(response);
    
    return Response.json(response.data);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return Response.json(
      { error: error.response?.data || "Failed to fetch categories" },
      { status: error.response?.status || 500 },
    );
  }
}
