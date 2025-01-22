/** @type {import('next').NextConfig} */
const nextConfig = {
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
    domains: ["assets.aceternity.com", "images.unsplash.com", "pbs.twimg.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
