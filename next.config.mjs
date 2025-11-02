/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  output: 'standalone',

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'khedme-api.onrender.com',
      },
    ],
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  pageExtensions: ['js', 'jsx'],
};

export default nextConfig;
