/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'my-gpacalculator.com' }],
        destination: 'https://www.my-gpacalculator.com/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig