/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.aliice.space",
      },
      {
        protocol: "https",
        hostname: "aestheticclinic.vercel.app",
      },
    ],
  },
};

export default nextConfig;
