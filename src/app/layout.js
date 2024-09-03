import { Inter } from "next/font/google";
import "./globals.css";
import "animate.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Marbrerie Pythagore",
  description: "située en Bretagne",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={[inter.className]}>{children}</body>
    </html>
  );
}
