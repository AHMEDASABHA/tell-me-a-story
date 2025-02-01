import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.clerk.com",
      },
      {
        protocol: "https",
        hostname: "**.imagekit.io",
        port: "",
        pathname: "/twaykgtjnj/**",
      },
    ],
  },
};

export default nextConfig;
