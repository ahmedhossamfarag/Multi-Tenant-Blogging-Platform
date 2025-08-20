/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'amplify-d2doz3yazz64tf-ma-blogstoragebucket2d79d24-orpldlurmfbs.s3.us-east-1.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
