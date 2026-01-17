import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Output standalone para Docker (gera build otimizado com apenas deps necessárias)
  output: "standalone",
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  reactCompiler: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [new URL("https://lh3.googleusercontent.com/**")],
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // Em produção, restringir para tauri://localhost
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
          },
        ],
      },
    ];
  },
  devIndicators: {
    position: "bottom-right",
  },
};

export default nextConfig;
