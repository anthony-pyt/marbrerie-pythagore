import { catalogResponse } from "@/lib/stockCatalog";

// Épaisseurs.
export async function GET() {
  return catalogResponse("thiknesses");
}
