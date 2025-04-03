import fs from "fs";
import path from "path";

export async function GET() {
  const imageDir = path.join(process.cwd(), "public/images/accueil/savoir-faire");
  const files = fs.readdirSync(imageDir);

  if (files.length === 0) {
    return new Response(JSON.stringify({ error: "No images found" }), {
      status: 404,
    });
  }

  const randomImage = files[Math.floor(Math.random() * files.length)];

  // return new Response(JSON.stringify({ src: `/images/accueil/savoir-faire/${randomImage}` }), {
  //   headers: { "Content-Type": "application/json" },
  // });
  return new Response(
    JSON.stringify({ src: `/images/accueil/principales/batiment.jpg` }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
