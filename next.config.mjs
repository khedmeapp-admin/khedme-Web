/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "khedme-api.onrender.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    turbo: false, // Disable Turbopack
  },
};

export default nextConfig;
