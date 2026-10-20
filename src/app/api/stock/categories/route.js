import { catalogResponse } from "@/lib/stockCatalog";

// Catégories de matières.
export async function GET() {
  return catalogResponse("categories-with-parent-matieres");
}
