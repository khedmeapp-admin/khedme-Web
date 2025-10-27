/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {}, // ✅ ensures build compatibility
  serverExternalPackages: ['pg'],
  webpack: (config) => config,
};

export default nextConfig;
