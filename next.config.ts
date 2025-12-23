import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.cdninstagram.com',
      },
    ],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // ggf. '20mb'
    },
  },

  reactCompiler: true,
}

export default nextConfig
