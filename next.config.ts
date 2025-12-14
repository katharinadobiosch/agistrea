import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // Instagram serves images from many regional subdomains (e.g. scontent-fra5-2.cdninstagram.com)
        hostname: '*.cdninstagram.com',
      },
    ],
  },
  /* config options here */
  reactCompiler: true,
}

export default nextConfig
