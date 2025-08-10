/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'amplify-awsamplifygen2-a1-blogstoragebucket2d79d24-dl6ctrdxql1z.s3.eu-north-1.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
