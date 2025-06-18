import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'imgs.search.brave.com',
      },
      
    ],
  },
  experimental:{
    ppr:"incremental",
  },
};

export default nextConfig;
