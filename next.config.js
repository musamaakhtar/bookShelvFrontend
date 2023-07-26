/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: { 
    mySecret: 'secret',
    secondPort: 3004,
  },
  publicRuntimeConfig: {
    staticFolder: '/static',
  },
}
module.exports = nextConfig

