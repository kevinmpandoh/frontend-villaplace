// next.config.mjs
const nextConfig = {
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backend-villaplace.vercel.app",
        port: "",
        pathname: "/images/villa/**",
      },
    ],
  },
  experimental: {
    appDir: true,
    esmExternals: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
