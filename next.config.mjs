
import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve("./src/app"),
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: process.env.NODE_ENV === "production" ? "https" : "http",
        hostname: "/",
        port: "",
        pathname: "/images/**",
      },
      //   {
      //     protocol: process.env.NODE_ENV === "production" ? "https" : "http",
      //     port: "",
      //     hostname: process.env.NEXT_PUBLIC_IMAGE_URL,
      //   },
    ],
    domains: [
      "assets.aceternity.com",
      "images.unsplash.com",
      "pbs.twimg.com",
      "pythagore.doliplus.com",
      "localhost",
      "192.168.1.210",
      "api.stock.marbrerie-pythagore.fr",
      process.env.NEXT_PUBLIC_IMAGE_URL,

    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
