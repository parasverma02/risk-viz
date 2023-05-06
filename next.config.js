/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/risk-map',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
