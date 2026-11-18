/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '/Rayyan-newporfolio',
  reactStrictMode: true,
  outputFileTracingRoot: process.cwd(),
  // Tree-shake barrel-file packages so only the icons/modules actually used
  // are bundled. Big win for `lucide-react` (hundreds of icons) and
  // `framer-motion`.
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
};

export default nextConfig;
