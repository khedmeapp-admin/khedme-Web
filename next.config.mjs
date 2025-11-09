import path from "path";

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
  webpack: (config) => {
    // Alias @/ to src/ for absolute imports
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    return config;
  },
};

export default nextConfig;
