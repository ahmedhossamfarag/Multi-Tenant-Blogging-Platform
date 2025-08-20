/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'amplify-awsamplifygen2-a1-blogstoragebucket2d79d24-dl6ctrdxql1z.s3.eu-north-1.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: process.env.NEXT_PUBLIC_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_DOMAIN,
        pathname: '/**',
      }
    ],
  },
}

module.exports = nextConfig
