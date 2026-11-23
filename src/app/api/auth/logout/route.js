import { NextResponse } from "next/server";
import { revokeToken } from "@/lib/session/auth-api";
import { destroySession, getSession } from "@/lib/session/server";

/** Déconnexion : le jeton de cette session est révoqué dans auth-api, les cookies effacés quoi qu'il arrive. */
export async function POST(req) {
  const session = getSession(req);
  if (session?.accessToken) await revokeToken(session.accessToken);

  return destroySession(NextResponse.json({ ok: true }));
}
