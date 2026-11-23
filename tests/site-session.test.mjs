import assert from "node:assert/strict";
import { test } from "node:test";

import { canManageSite, gatewayUrl, tokenClaims } from "../src/app/lib/session/auth-api.js";
import { readSession, writeSession } from "../src/app/lib/session/session-cookies.js";

// Espace d'administration du site (23/11/2026) : session chiffrée côté serveur, réservée aux administrateurs internes
// (rôles admin et super-admin : claim `is_super_admin` d'auth-api). Avant : un cookie quelconque (posable par POST /api/cookies) ouvrait /admin.
const SECRET = "s".repeat(40);
const jar = () => {
  const store = new Map();
  return { get: (name) => (store.has(name) ? { value: store.get(name) } : undefined), set: (name, value) => store.set(name, value), store };
};
const jwt = (claims) => `e30.${Buffer.from(JSON.stringify(claims)).toString("base64url")}.sig`;

test("la session est chiffrée et refusée si elle est altérée ou posée à la main", () => {
  const cookies = jar();
  writeSession(cookies, { accessToken: "a", refreshToken: "r", expiresAt: Date.now() + 60_000, refreshExpiresAt: Date.now() + 3_600_000, user: { full_name: "Léa" } }, SECRET);

  assert.equal(readSession(cookies, SECRET)?.user.full_name, "Léa");
  assert.ok(!cookies.store.get("site_session").includes("Léa"), "rien de lisible dans le cookie");
  cookies.set("site_session", cookies.store.get("site_session").slice(0, -2) + "xx");
  assert.equal(readSession(cookies, SECRET), null);
  cookies.set("site_session", "authenticated");
  assert.equal(readSession(cookies, SECRET), null);
});

test("seuls les administrateurs internes (admin, super-admin) gèrent le site", () => {
  const internal = { identity: { user_type: "pythagore" } };
  assert.equal(canManageSite(tokenClaims(jwt({ ...internal, roles: ["admin"], is_super_admin: true }))), true);
  assert.equal(canManageSite({ ...internal, roles: ["Commercial"], permissions: ["edit site"], is_super_admin: false }), false);
  assert.equal(canManageSite({ identity: { user_type: "client" }, is_super_admin: true }), false);
  assert.equal(canManageSite({ ...internal, is_machine: true, is_super_admin: true }), false);
  assert.equal(canManageSite(tokenClaims("pas un jeton")), false);
});

test("les appels partent vers la Gateway configurée", () => {
  process.env.NEXT_API_GATEWAY_URL = "http://gateway-api:8000/api/";
  assert.equal(gatewayUrl("/web-api/blog/get_articles"), "http://gateway-api:8000/api/web-api/blog/get_articles");
});
