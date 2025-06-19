import type { NextConfig } from "next";
import { hostname } from "os";

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
      {protocol:"https",
      hostname:"avatars.githubusercontent.com"
      },
      
    ],
  },
  experimental:{
    ppr:"incremental",
  },
};

export default nextConfig;
