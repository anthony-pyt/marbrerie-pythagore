// Adresse du visiteur transmise à la Gateway (DT-40, 26/11/2026) : le serveur du site appelle la Gateway à la place du
// navigateur ; sans cet en-tête, la Gateway verrait la même adresse (celle du site) pour tous les visiteurs, et sa limite
// de débit par adresse les regrouperait. La chaîne posée par le proxy de Coolify est reprise telle quelle : la Gateway,
// qui fait confiance au réseau privé, retient la dernière adresse publique (une adresse inventée en tête est ignorée).

/** En-tête `X-Forwarded-For` à joindre aux appels de la Gateway faits pour une requête du navigateur. */
export function forwardedFor(request) {
  const chain = request?.headers?.get?.("x-forwarded-for")?.trim();
  return chain ? { "X-Forwarded-For": chain } : {};
}
