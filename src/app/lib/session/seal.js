// Chiffrement authentifié (AES-256-GCM) des cookies de session du site public (espace d'administration) (modèle : admin-app,
// src/lib/auth/seal.js). La clé est dérivée (HKDF-SHA256) de SITE_SESSION_SECRET, propre au site.
// `purpose` est lié au chiffré (données associées) : un cookie chiffré pour un usage (jeton de
// rafraîchissement) n'est pas accepté pour un autre (session).

import { createCipheriv, createDecipheriv, hkdfSync, randomBytes } from "node:crypto";

export const MIN_SECRET_LENGTH = 32;
const IV_BYTES = 12;
const TAG_BYTES = 16;
const keys = new Map();

function keyFor(secret) {
  if (typeof secret !== "string" || secret.length < MIN_SECRET_LENGTH) {
    throw new Error(`SITE_SESSION_SECRET manquant ou trop court (${MIN_SECRET_LENGTH} caractères minimum)`);
  }
  if (!keys.has(secret)) {
    keys.set(secret, Buffer.from(hkdfSync("sha256", secret, "marbrerie-pythagore", "site session cookie v1", 32)));
  }
  return keys.get(secret);
}

/** @returns {string} base64url(iv | tag | chiffré) */
export function seal(payload, secret, purpose) {
  const iv = randomBytes(IV_BYTES);
  const cipher = createCipheriv("aes-256-gcm", keyFor(secret), iv);
  cipher.setAAD(Buffer.from(purpose));
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(payload), "utf8"), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), encrypted]).toString("base64url");
}

/** @returns {any|null} la charge utile, ou null si le cookie est absent, altéré ou chiffré pour un autre usage */
export function unseal(value, secret, purpose) {
  if (typeof value !== "string" || !value) return null;
  const key = keyFor(secret);
  try {
    const raw = Buffer.from(value, "base64url");
    if (raw.length <= IV_BYTES + TAG_BYTES) return null;
    const decipher = createDecipheriv("aes-256-gcm", key, raw.subarray(0, IV_BYTES));
    decipher.setAAD(Buffer.from(purpose));
    decipher.setAuthTag(raw.subarray(IV_BYTES, IV_BYTES + TAG_BYTES));
    const clear = Buffer.concat([decipher.update(raw.subarray(IV_BYTES + TAG_BYTES)), decipher.final()]);
    return JSON.parse(clear.toString("utf8"));
  } catch {
    return null;
  }
}
