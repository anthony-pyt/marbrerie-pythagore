"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import "animate.css";
import { Analytics } from "@vercel/analytics/react";
import { usePathname, useSearchParams } from "next/navigation";
import Loader from "./components/loader";
import { metadata } from "./../../datas/metadata";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleClick = (event) => {
      const target = event.target.closest("a");
      if (target && target.href.startsWith(window.location.origin)) {
        setLoading(true);
      }
    };

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    setLoading(false); // Arrête le loader quand la page a changé
  }, [pathname, searchParams]);

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
        {loading && <Loader />}
        {children}
        <Analytics />
      </body>
    </html>
  );
}
