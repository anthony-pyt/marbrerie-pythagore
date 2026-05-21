import axios from "axios";

const cache = new Map();
const CACHE_TTL = 300 * 1000;

export async function GET(request) {
  const cacheKey = "colors";
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return Response.json(cached.data);
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_STOCK_URL;
  try {
    const response = await axios.get(`${apiUrl}/colors`);

    cache.set(cacheKey, {
      data: response.data,
      timestamp: Date.now(),
    });

    return Response.json(response.data);
  } catch (error) {
    console.error("Error fetching colors:", error);
    return Response.json(
      { error: error.response?.data || "Failed to fetch colors" },
      { status: error.response?.status || 500 },
    );
  }
}
