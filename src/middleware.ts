import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("pythagore_gateway_session")?.value;

  console.log(req.nextUrl.pathname);
  
  // Si l'utilisateur est déjà connecté et tente d'accéder à /login
  if (req.nextUrl.pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // Si l'utilisateur n'est pas connecté et tente d'accéder à /admin
  if (!token && req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
