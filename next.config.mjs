// next.config.mjs
const nextConfig = {
  images: {
    domains: ["localhost"],
  },
  experimental: {
    appDir: true,
    esmExternals: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
