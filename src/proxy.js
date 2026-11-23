import { NextResponse } from "next/server";
import { readSession } from "@/lib/session/session-cookies";

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

  // Session chiffrée posée par /api/auth/login (23/11/2026). Avant : simple présence d'un cookie, que n'importe qui
  // pouvait poser par POST /api/cookies (route supprimée). Le jeton lui-même est revérifié par api-marbrerie-pythagore
  // à chaque écriture.
  let loggedIn = false;
  try {
    loggedIn = Boolean(readSession(req.cookies, process.env.SITE_SESSION_SECRET));
  } catch (error) {
    console.error("[proxy] SITE_SESSION_SECRET manquant ou trop court", error.message);
  }

  // Si l'utilisateur est déjà connecté et tente d'accéder à /login
  if (pathname === "/login" && loggedIn) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // Si l'utilisateur n'est pas connecté et tente d'accéder à /admin
  if (!loggedIn && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/api/:path*"],
};
