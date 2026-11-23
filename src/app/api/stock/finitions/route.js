import { catalogResponse } from "@/lib/stockCatalog";

// Finitions.
export async function GET() {
  return catalogResponse("finitions");
}
