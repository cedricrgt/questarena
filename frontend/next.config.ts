import type { NextConfig } from "next";

const isGithubPages =
  process.env.GITHUB_ACTIONS || process.env.DEPLOY_TARGET === "GH_PAGES";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    domains: [
      "randomuser.me",
      "via.assets.so",
      "www.worldhistory.org",
      "example.com",
      "placehold.co",
      "rawg.io",
      "media.rawg.io",
    ],
  },
};

export default nextConfig;
