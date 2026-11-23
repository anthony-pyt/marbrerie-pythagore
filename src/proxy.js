import { NextResponse } from "next/server";

// Détecte une navigation directe du navigateur (URL tapée, lien, onglet)
// par opposition à un appel fetch/axios fait depuis le site.
function isBrowserNavigation(req) {
  const mode = req.headers.get("sec-fetch-mode");
  const dest = req.headers.get("sec-fetch-dest");
  if (mode || dest) {
    return mode === "navigate" || dest === "document";
  }
  // Repli pour les navigateurs qui n'envoient pas les en-têtes Sec-Fetch-*
  return (req.headers.get("accept") || "").startsWith("text/html");
}

export async function proxy(req) {
  const { pathname } = req.nextUrl;

  // Empêche l'ouverture des routes API directement dans le navigateur
  if (pathname.startsWith("/api/")) {
    if (isBrowserNavigation(req)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  const token = req.cookies.get("pythagore_gateway_session")?.value;

  // Si l'utilisateur est déjà connecté et tente d'accéder à /login
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // Si l'utilisateur n'est pas connecté et tente d'accéder à /admin
  if (!token && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/api/:path*"],
};
