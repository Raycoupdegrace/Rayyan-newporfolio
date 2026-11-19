/** @type {import('next').NextConfig} */

// Vercel runs the `api/` folder as serverless functions, so the project must
// not be built with `output: 'export'` there. GitHub Pages only needs the
// static export, so the flag is enabled unless Vercel is building.
const isVercel = Boolean(process.env.VERCEL);

const nextConfig = {
  output: isVercel ? undefined : 'export',
  trailingSlash: true,
  basePath:
    process.env.NEXT_PUBLIC_BASE_PATH ||
    (isVercel ? '' : process.env.NODE_ENV === 'production' ? '/Rayyan-newporfolio' : ''),
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
