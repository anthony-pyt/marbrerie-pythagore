import fs from "fs";
import path from "path";

export async function GET() {
  const imageDir = path.join(
    process.cwd(),
    "public/images/accueil/savoir-faire"
  );

  try {
    const files = fs.readdirSync(imageDir);

    if (files.length === 0) {
      return new Response(JSON.stringify({ error: "No images found" }), {
        status: 404,
      });
    }

    // Construire la liste complète des URLs des images
    const images = files.map((file) => `/images/accueil/savoir-faire/${file}`);

    return new Response(JSON.stringify({ images }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to read directory" }), {
      status: 500,
    });
  }
}
