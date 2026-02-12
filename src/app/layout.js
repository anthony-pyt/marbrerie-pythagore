"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import "animate.css";
import { Analytics } from "@vercel/analytics/react";
import { usePathname } from "next/navigation";
import Loader from "./components/loader";
import { metadata } from "./datas/metadata";
import { useEffect, useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleClick = (event) => {
      const target = event.target.closest("a");
      if (target) {
        const url = new URL(target.href, window.location.origin);
        const isSamePage = url.pathname === pathname && url.hash === "";

        if (!isSamePage) {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 3000);
        }
      }
    };

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  useEffect(() => {
    setLoading(false); // Arrête le loader quand la page a changé
  }, [pathname]);

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
      <body className={inter.className} suppressHydrationWarning={true}>
        <GoogleReCaptchaProvider
          reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          scriptProps={{
            async: false,
            defer: false,
            appendTo: "head",
            nonce: undefined,
          }}
        >
          {loading && <Loader />}
          {children}
          <SpeedInsights />
          <Analytics />
          <Script
            id="clickio-setup"
            strategy="afterInteractive"
            src="//clickiocmp.com/t/consent_247457.js"
          >
            {``}
          </Script>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-EJL39GP0FX"
            strategy="afterInteractive"
            data-cfasync="false"
          ></Script>
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-EJL39GP0FX');
          `}
          </Script>
        </GoogleReCaptchaProvider>
      </body>
    </html>
  );
}
