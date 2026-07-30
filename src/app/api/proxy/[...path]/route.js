// app/api/proxy/[...path]/route.js
import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_API_GATEWAY_URL;

async function handler(req, context) {
  try {
    console.log("=== PROXY DEBUG ===");
    console.log("API_URL:", API_URL);

    if (!API_URL) {
      throw new Error("NEXT_API_GATEWAY_URL non défini");
    }

    const { path } = await context.params;
    console.log("path:", path);

    const fullPath = path.join("/");
    const search = req.nextUrl.search;
    const targetUrl = `${API_URL}/${fullPath}${search}`;
    console.log("targetUrl:", targetUrl);

    const body =
      req.method !== "GET" && req.method !== "HEAD"
        ? await req.text()
        : undefined;

    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        "Content-Type": req.headers.get("content-type") || "application/json",
      },
      body,
    });

    console.log("gateway response status:", response.status);

    const data = await response.text();

    return new NextResponse(data, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("content-type") || "application/json",
      },
    });
  } catch (error) {
    console.error("=== ERREUR PROXY ===", error);
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