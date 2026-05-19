/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  reactCompiler: isProd,
  output: isProd ? "standalone" : undefined,

  // Webpack uniquement en dev (ignoré en prod avec Turbopack)
  ...(isProd
    ? {}
    : {
        webpack: (config) => {
          config.watchOptions = {
            poll: 500,
            aggregateTimeout: 300,
          };
          return config;
        },
      }),
};

export default nextConfig;
