/** @type {import('next').NextConfig} */

// Empty on a custom domain; "/usstm-website" when served from usstm.github.io/usstm-website.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

const nextConfig = {
  output: 'export',
  basePath,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
