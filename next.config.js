/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: process.env.AWS_S3_HOSTNAME,
      },
    ]
  }
}

module.exports = nextConfig
