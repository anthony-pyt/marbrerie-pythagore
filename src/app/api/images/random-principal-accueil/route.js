import fs from "fs";
import path from "path";

export async function GET() {
  const imageDir = path.join(
    process.cwd(),
    "public/images/accueil/principales",
  );

  // 1. Lire et filtrer les fichiers par extension
  const validExtensions = [".jpg", ".jpeg", ".png", ".webp", ".avif"];
  const files = fs.readdirSync(imageDir).filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return validExtensions.includes(ext);
  });

  if (files.length === 0) {
    return new Response(JSON.stringify({ error: "No images found" }), {
      status: 404,
    });
  }

  const randomImage = files[Math.floor(Math.random() * files.length)];

  return new Response(
    JSON.stringify({ src: `/images/accueil/principales/${randomImage}` }),
    { headers: { "Content-Type": "application/json" } },
  );

  // return new Response(
  //   JSON.stringify({ src: `/images/accueil/principales/batiment.jpg` }),
  //   {
  //     headers: { "Content-Type": "application/json" },
  //   }
  // );
}
