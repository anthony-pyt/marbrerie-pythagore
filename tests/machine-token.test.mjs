import assert from "node:assert/strict";
import { generateKeyPairSync, sign } from "node:crypto";
import { test } from "node:test";

import { publicKeysFromEnv, verifyMachineToken } from "../src/app/lib/machineToken.js";

// Rotation de la clé d'auth-api (ADR-04, 18/11/2026) : pendant la transition, un jeton machine signé par l'une ou
// l'autre clé est accepté ; hors rotation, une autre clé est refusée.
const pair = () => generateKeyPairSync("rsa", { modulusLength: 2048 });
const current = pair();
const next = pair();
const pem = (keys) => keys.publicKey.export({ type: "spki", format: "pem" });
const b64 = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");

function token(keys, claims = {}) {
  const head = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({ client_id: "stock", is_machine: true, exp: Date.now() / 1000 + 60, ...claims })}`;
  return `Bearer ${head}.${sign("RSA-SHA256", Buffer.from(head), keys.privateKey).toString("base64url")}`;
}

const options = { publicKey: [pem(current)], allowedClientIds: ["stock"] };

test("hors rotation, un jeton d'une autre clé est refusé", async () => {
  assert.equal((await verifyMachineToken(token(current), options))?.client_id, "stock");
  assert.equal(await verifyMachineToken(token(next), options), null);
});

test("pendant une rotation, les deux clés sont acceptées (clé sur une ligne comme dans Coolify)", async () => {
  const rotating = { ...options, publicKey: [pem(current), pem(next).replace(/\n/g, "\\n")] };

  assert.equal((await verifyMachineToken(token(next), rotating))?.client_id, "stock");
  assert.equal((await verifyMachineToken(token(current), rotating))?.client_id, "stock");
  assert.equal(await verifyMachineToken(token(next, { exp: Date.now() / 1000 - 10 }), rotating), null);
});

test("une seule clé (chaîne) reste acceptée, une clé absente refuse tout", async () => {
  assert.equal((await verifyMachineToken(token(current), { ...options, publicKey: pem(current) }))?.client_id, "stock");
  assert.equal(await verifyMachineToken(token(current), { ...options, publicKey: [undefined, ""] }), null);
});

test("AUTH_PASSPORT_PUBLIC_KEY seule, puis la clé secondaire ; l'ancien nom OAUTH_PUBLIC_KEY n'est plus lu", () => {
  assert.deepEqual(publicKeysFromEnv({ AUTH_PASSPORT_PUBLIC_KEY: "neuve", AUTH_PASSPORT_PUBLIC_KEY_SECONDARY: "rotation" }), ["neuve", "rotation"]);
  assert.deepEqual(publicKeysFromEnv({ OAUTH_PUBLIC_KEY: "ancienne" }), []);
});
