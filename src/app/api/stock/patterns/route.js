import { catalogResponse } from "@/lib/stockCatalog";

// Motifs.
export async function GET() {
  return catalogResponse("patterns");
}
