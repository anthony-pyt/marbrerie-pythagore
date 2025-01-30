"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import "animate.css";
import { Analytics } from "@vercel/analytics/react";
import { usePathname } from "next/navigation";
import Loader from "./components/loader";
import { metadata } from "./../../datas/metadata";
import { useEffect, useState } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 250);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
    >
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
          {/* {loading && <Loader />} */}
          {children}
          <Analytics />
        </body>
      </html>
    </GoogleReCaptchaProvider>
  );
}
