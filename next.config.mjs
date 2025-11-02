/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // 👇 This tells Vercel that your pages are inside src/
  experimental: {
    appDir: false,
  },

  images: {
    domains: ["khedme-api.onrender.com"],
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  // 👇 Optional: fallback if using custom structure
  pageExtensions: ["js", "jsx"],
};

export default nextConfig;
