import { NextResponse } from "next/server";
import { canManageSite, loginWithPassword, revokeToken, tokenClaims } from "@/lib/session/auth-api";
import { saveSession } from "@/lib/session/server";
import { sessionFromTokens } from "@/lib/session/token-refresh";

/**
 * Connexion à l'espace d'administration (23/11/2026) : identifiant (e-mail ou nom d'utilisateur) et mot de passe envoyés
 * au serveur du site, qui obtient les jetons d'auth-api par la Gateway (password grant, sans parcours PKCE). Les jetons
 * restent dans des cookies chiffrés httpOnly ; le navigateur ne reçoit que le nom à afficher.
 */
export async function POST(req) {
  const body = await req.json().catch(() => null);
  const login = typeof body?.login === "string" ? body.login.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  if (!login || !password) {
    return NextResponse.json({ message: "Identifiant et mot de passe requis." }, { status: 422 });
  }

  let result;
  try {
    result = await loginWithPassword({ login, password });
  } catch (error) {
    console.error("[auth/login] configuration incomplète :", error.message);
    return NextResponse.json({ message: "Connexion impossible : configuration incomplète." }, { status: 500 });
  }
  if (!result.ok) {
    const status = [401, 422, 429].includes(result.status) ? result.status : 502;
    const message = status === 429 ? "Trop d'essais. Merci de patienter avant de réessayer."
      : status === 502 ? "Service d'authentification indisponible." : "Identifiant ou mot de passe incorrect.";
    return NextResponse.json({ message }, { status: status === 422 ? 401 : status });
  }

  // Seuls les administrateurs (rôles admin et super-admin) ouvrent l'espace d'administration ; sinon le jeton est révoqué.
  if (!canManageSite(tokenClaims(result.data.access_token))) {
    await revokeToken(result.data.access_token);
    return NextResponse.json({ message: "Votre compte n'a pas accès à l'administration du site." }, { status: 403 });
  }

  const user = { full_name: tokenClaims(result.data.access_token)?.user?.full_name ?? null };
  try {
    return saveSession(NextResponse.json({ user }), sessionFromTokens(result.data, { user }));
  } catch (error) {
    console.error("[auth/login] session impossible à enregistrer :", error.message);
    return NextResponse.json({ message: "Connexion impossible : configuration incomplète." }, { status: 500 });
  }
}
