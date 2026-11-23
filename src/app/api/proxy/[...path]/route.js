import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_API_GATEWAY_URL;
const GATEWAY_SECRET = process.env.INTERNAL_API_KEY;

async function handler(req, context) {
  try {
    if (!API_URL) throw new Error("NEXT_API_GATEWAY_URL non défini");
    if (!GATEWAY_SECRET) throw new Error("INTERNAL_API_KEY non défini");

    const { path } = await context.params;
    const fullPath = path.join("/");
    const search = req.nextUrl.search;
    const targetUrl = `${API_URL}/${fullPath}${search}`;

    const body =
      req.method !== "GET" && req.method !== "HEAD"
        ? await req.text()
        : undefined;

    // Transmettre les headers clients utiles (Authorization, etc.)
    const headers = new Headers();
    if (req.headers.get("content-type")) {
      headers.set("Content-Type", req.headers.get("content-type"));
    }
    if (req.headers.get("authorization")) {
      headers.set("Authorization", req.headers.get("authorization"));
    }

    // Injection de la clé secrète de sécurité
    headers.set("X-Internal-Secret", GATEWAY_SECRET);
    headers.set("Accept", "application/json");

    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body,
    });

    const data = await response.text();

    return new NextResponse(data, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("content-type") || "application/json",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
};