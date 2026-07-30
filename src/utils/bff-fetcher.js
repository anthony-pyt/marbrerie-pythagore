const API_URL = process.env.NEXT_API_GATEWAY_URL;

export class BffFetchError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "BffFetchError";
    this.status = status;
    this.data = data;
  }
}

export const bffFetcher = async (url, options = {}) => {
  if (!API_URL) {
    throw new Error("NEXT_API_GATEWAY_URL n'est pas défini");
  }

  const { params, headers, ...restOptions } = options;

  // Construction de l'URL avec query params
  const fullUrl = new URL(url.replace(/^\//, ""), API_URL);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        fullUrl.searchParams.append(key, String(value));
      }
    });
  }

  const response = await fetch(fullUrl.toString(), {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    throw new BffFetchError(
      `Erreur API: ${response.status} ${response.statusText}`,
      response.status,
      data
    );
  }

  return data;
};