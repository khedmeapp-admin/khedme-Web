// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ✅ Make sure Vercel recognizes src/pages
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
