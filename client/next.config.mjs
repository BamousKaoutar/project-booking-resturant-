/** @type {import('next').NextConfig} */
/*const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  devIndicators: false
}

export default nextConfig */

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ skip ESLint during build
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ skip TS errors during build
  },
  images: {
    unoptimized: true, // ✅ disables next/image optimization
  },
  // 🔥 enables fast refresh & improves HMR performance
  experimental: {
    turbo: true,         // ✅ turbo compiler (Next.js 13+)
    serverActions: true, // if you're using server components
  },
  // 🚫 disable annoying dev overlay if not needed
  devIndicators: {
    buildActivity: false,
  },
  // Optional: reduce logs
  onDemandEntries: {
    maxInactiveAge: 60 * 1000, // 1 min cache per page
    pagesBufferLength: 5,      // how many pages to keep compiled
  },
}

export default nextConfig
