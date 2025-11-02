/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { appDir: false },
  pageExtensions: ["js", "jsx"],
  images: { domains: ["khedme-api.onrender.com"] },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
