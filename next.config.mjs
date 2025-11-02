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
};

export default nextConfig;
