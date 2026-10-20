/**
 * Vérification d'un jeton machine d'auth-api (JWT RS256) reçu sur un webhook interne : signature avec la
 * clé publique d'auth-api, expiration, `is_machine`, et client émetteur autorisé. WebCrypto uniquement.
 */
const decoder = new TextDecoder();

function base64UrlToBytes(value) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");

  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
}

async function importPublicKey(pem) {
  const body = pem.replace(/\\n/g, "\n").replace(/-----(BEGIN|END) PUBLIC KEY-----/g, "").replace(/\s+/g, "");

  return crypto.subtle.importKey("spki", base64UrlToBytes(body), { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
}

/**
 * @returns {Promise<object|null>} le payload si le jeton est valide et émis par un client autorisé, sinon null
 */
export async function verifyMachineToken(authorization, { publicKey, allowedClientIds, now = Date.now() / 1000 }) {
  const token = authorization?.startsWith("Bearer ") ? authorization.slice(7) : null;
  const parts = token?.split(".");

  if (!publicKey || !allowedClientIds?.length || parts?.length !== 3) {
    return null;
  }

  try {
    const header = JSON.parse(decoder.decode(base64UrlToBytes(parts[0])));
    if (header.alg !== "RS256") {
      return null;
    }

    const valid = await crypto.subtle.verify(
      "RSASSA-PKCS1-v1_5",
      await importPublicKey(publicKey),
      base64UrlToBytes(parts[2]),
      new TextEncoder().encode(`${parts[0]}.${parts[1]}`),
    );
    const payload = JSON.parse(decoder.decode(base64UrlToBytes(parts[1])));

    const fresh = (!payload.exp || payload.exp > now) && (!payload.nbf || payload.nbf <= now + 60);
    const allowed = payload.is_machine === true && allowedClientIds.includes(String(payload.client_id));

    return valid && fresh && allowed ? payload : null;
  } catch {
    return null;
  }
}
