/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? "/sina-portfolio" : "",
  },
  ...(isGithubPages
    ? {
        output: "export",
        basePath: "/sina-portfolio",
        assetPrefix: "/sina-portfolio/",
        images: {
          unoptimized: true,
        },
      }
    : {}),
};

export default nextConfig;
