import axios from "axios";

// ✅ Ajoute cette ligne pour empêcher le prerendering au build
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/get_google_reviews`,
    );
    return Response.json(response.data);
  } catch (error) {
    console.error("Erreur API Google Reviews:", error.message);
    return Response.json({ error: "Service Unavailable" }, { status: 503 });
  }
}
