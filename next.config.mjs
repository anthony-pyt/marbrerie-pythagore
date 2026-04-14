import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.DOCKER_MODE ? "standalone" : undefined,
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve("./src/app"),
    };
    return config;
  },

  async rewrites() {
    return [
      {
        // Correction de la faute de frappe :path*
        source: "/backend/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/:path*`,
      },
      {
        source: "/stocks/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_STOCK_URL}/:path*`,
      },
    ];
  },

  images: {
    unoptimized: process.env.NODE_ENV === "development",
    // On migre tout dans remotePatterns et on vide 'domains' qui est déprécie
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "11000", // Ton port backend d'images
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pythagore.doliplus.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.stock.marbrerie-pythagore.fr",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
