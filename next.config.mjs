// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Ensure Vercel uses the src/pages directory correctly
  pageExtensions: ["js", "jsx", "ts", "tsx"],

  images: {
    domains: ["khedme-api.onrender.com"],
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  experimental: {
    appDir: false,
  },

// Tell Next.js to look inside src for pages
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["khedme-api.onrender.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    appDir: false,
  },
  // 👇 this ensures src/pages is treated as root
  pageExtensions: ["js", "jsx"]
};

export default nextConfig;
