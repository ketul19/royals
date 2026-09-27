import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    // Static export requires unoptimized images (no Next.js image optimization server)
    unoptimized: true,
  },
};

export default nextConfig;
