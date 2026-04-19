import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.mitvana.com",
        // port: "",
        // pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
