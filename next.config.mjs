/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: ['img.youtube.com'],
  },
  // output: 'export',
  reactStrictMode: true,
};

export default nextConfig;
