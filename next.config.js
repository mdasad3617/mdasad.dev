/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["covers.openlibrary.org", "drive.google.com"],
    unoptimized: true,
  },
}

module.exports = nextConfig
