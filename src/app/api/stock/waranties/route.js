import { catalogResponse } from "@/lib/stockCatalog";

// Garanties (auparavant lues directement par le navigateur, sans cache).
export async function GET() {
  return catalogResponse("waranties");
}
