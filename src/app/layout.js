import { Inter } from "next/font/google";
import "./globals.css";
import "animate.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Marbrerie Pythagore",
  description: "située en Bretagne",
  charset: "utf-8",
  keywords: "Vente de plans de travail de cuisine et de salle de bains",
  author: "La team dev de Pythagore",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <meta charSet={metadata.charset} />
        <meta name="viewport" content={metadata.viewport} />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <title>{metadata.title}</title>
      </head>
      <body className={[inter.className]} suppressHydrationWarning={true}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
