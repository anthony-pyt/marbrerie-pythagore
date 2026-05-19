import axios from "axios";

const cache = new Map();
const CACHE_TTL = 300 * 1000;

export async function GET(request) {
  const cacheKey = "colors";
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return Response.json(cached.data);
  }

  const apiUrl = process.env.API_GATEWAY_URL;
  try {
    const cookieHeader = request.headers.get("cookie");

    const response = await axios.get(`${apiUrl}/api/stock/colors`, {
      headers: {
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      },
      withCredentials: true
    });

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
