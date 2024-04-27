/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "global.unitednations.entermediadb.net",
        port: '',
      },
    ],
  },
};

export default nextConfig;
