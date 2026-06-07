/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: false }, // خلي false لشوف الأخطاء
  eslint: { ignoreDuringBuilds: true },
};

module.exports = nextConfig;
