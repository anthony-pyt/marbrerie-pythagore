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

    // Mélanger les fichiers aléatoirement
    const shuffledFiles = shuffleArray(files);

    // Construire la liste complète des URLs des images
    const images = shuffledFiles.map(
      (file) => `/images/accueil/savoir-faire/${file}?t=${Date.now()}`
    );

    return new Response(JSON.stringify({ images }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to read directory" }), {
      status: 500,
    });
  }
}

// Fonction pour mélanger un tableau
function shuffleArray(array) {
  const shuffled = [...array]; // Créer une copie pour éviter de modifier l'original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }
  return shuffled;
}
