import { catalogResponse } from "@/lib/stockCatalog";

// Matières affichées sur le site (filtres et pagination transmis à stock).
export async function GET(request) {
  return catalogResponse("products_only_matieres", request);
}
