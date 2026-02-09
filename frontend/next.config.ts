import type { NextConfig } from "next";

const isGithubPages =
  process.env.GITHUB_ACTIONS || process.env.DEPLOY_TARGET === "GH_PAGES";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
      {
        protocol: 'https',
        hostname: 'via.assets.so',
      },
      {
        protocol: 'https',
        hostname: 'www.worldhistory.org',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'rawg.io',
      },
      {
        protocol: 'https',
        hostname: 'media.rawg.io',
      },
    ],
  },
};

export default nextConfig;
