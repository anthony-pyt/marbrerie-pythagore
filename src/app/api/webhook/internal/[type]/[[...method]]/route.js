import { revalidateTag } from "next/cache";
import { CATALOG_TAG } from "@/lib/stockCatalog";
import { verifyMachineToken } from "@/lib/machineToken";

/**
 * Webhooks internes relayés par la Gateway (`PUT /api/webhook/internal/{type}/{method}`, consommateur
 * `website` dans gateway-api/config/internal_events.php). Seul le jeton machine de stock est accepté.
 * `catalog/changed` : les données du catalogue en cache sont expirées, la visite suivante relit stock.
 */
export async function PUT(request, context) {
  const payload = await verifyMachineToken(request.headers.get("authorization"), {
    publicKey: process.env.OAUTH_PUBLIC_KEY,
    allowedClientIds: (process.env.STOCK_MACHINE_CLIENT_ID ?? "").split(",").filter(Boolean),
  });

  if (!payload) {
    return Response.json({ message: "Jeton machine invalide ou émetteur non autorisé." }, { status: 401 });
  }

  const { type, method } = await context.params;

  if (`${type}.${method?.[0] ?? ""}` !== "catalog.changed") {
    return Response.json({ message: `Événement interne non géré : ${type}.` }, { status: 404 });
  }

  // Expiration immédiate (Next 16) : la prochaine lecture va chercher la version à jour dans stock.
  revalidateTag(CATALOG_TAG, { expire: 0 });

  return Response.json({ revalidated: [CATALOG_TAG] });
}
