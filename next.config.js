/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export", // Removed to allow client components with dynamic routes
  images: {
    unoptimized: true,
    domains: [],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
};

module.exports = nextConfig;
