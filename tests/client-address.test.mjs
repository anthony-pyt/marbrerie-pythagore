import { test } from "node:test";
import assert from "node:assert/strict";
import { forwardedFor } from "../src/app/lib/client-address.js";

// DT-40 (26/11/2026) : le serveur du site transmet à la Gateway l'adresse du visiteur (chaîne du proxy de Coolify).
test("la chaîne X-Forwarded-For du visiteur est transmise telle quelle, rien sans elle", () => {
  const request = new Request("http://site.test/api/web-api/blog", { headers: { "x-forwarded-for": "203.0.113.7, 10.0.1.4" } });
  assert.deepEqual(forwardedFor(request), { "X-Forwarded-For": "203.0.113.7, 10.0.1.4" });
  assert.deepEqual(forwardedFor(new Request("http://site.test/")), {});
  assert.deepEqual(forwardedFor(undefined), {});
});
