/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx"], // Only JS/JSX files
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
};

export default nextConfig;
