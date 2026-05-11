import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@react-pdf/renderer"],
  images: {
    unoptimized: false,
  },
};

export default nextConfig;
