import { catalogResponse } from "@/lib/stockCatalog";

// Couleurs.
export async function GET() {
  return catalogResponse("colors");
}
