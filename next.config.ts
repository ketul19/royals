import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — no server required; deployable to any CDN
  output: "export",

  // For static export, Next.js image optimization requires a custom loader
  // or the `unoptimized` flag. We use unoptimized here since assets are served
  // from the same CDN and there is no image-optimization server.
  images: {
    unoptimized: true,
  },

  // Trailing slashes ensure each route maps to a directory/index.html
  trailingSlash: true,
};

export default nextConfig;

