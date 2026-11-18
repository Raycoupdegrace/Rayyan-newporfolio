import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        ink: {
          50: '#f6f7f9',
          200: '#d9dce2',
          400: '#8b93a3',
          600: '#4b5263',
          800: '#232936',
          900: '#12151c',
          950: '#0a0c11',
        },
        accent: {
          300: '#a5f3d0',
          400: '#5eead4',
          500: '#2dd4bf',
          600: '#14b8a6',
        },
      },
      fontSize: {
        // Fluid typography — mobile-first, no breakpoint jumps.
        'display-xs': ['clamp(1.75rem, 1.2rem + 2.2vw, 2.5rem)', { lineHeight: '1.05' }],
        'display-sm': ['clamp(2.25rem, 1.5rem + 3vw, 3.5rem)', { lineHeight: '1.03' }],
        'display-md': ['clamp(2.75rem, 1.6rem + 5vw, 5rem)', { lineHeight: '1' }],
        'display-lg': ['clamp(3.25rem, 1.4rem + 7.5vw, 7rem)', { lineHeight: '0.96' }],
        'fluid': ['clamp(1rem, 0.94rem + 0.3vw, 1.125rem)', { lineHeight: '1.65' }],
        'fluid-lg': ['clamp(1.125rem, 1rem + 0.6vw, 1.375rem)', { lineHeight: '1.6' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      opacity: {
        // Fine-grained opacities used across the design system (hairlines,
        // subtle surfaces). Tailwind's default scale skips these values.
        '2': '0.02',
        '3': '0.03',
        '8': '0.08',
        '12': '0.12',
        '15': '0.15',
        '16': '0.16',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        glow: '0 0 0 1px rgb(45 212 191 / 0.25), 0 24px 60px -20px rgb(45 212 191 / 0.35)',
        card: '0 1px 0 0 rgb(255 255 255 / 0.06) inset, 0 20px 40px -24px rgb(0 0 0 / 0.8)',
      },
      transitionTimingFunction: {
        swift: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translate3d(0,0,0)' },
          to: { transform: 'translate3d(-50%,0,0)' },
        },
        'fade-through': {
          from: { opacity: '0', transform: 'translate3d(0, 12px, 0)' },
          to: { opacity: '1', transform: 'translate3d(0,0,0)' },
        },
        shimmer: {
          from: { backgroundPosition: '200% 0' },
          to: { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        marquee: 'marquee var(--marquee-duration, 40s) linear infinite',
        'marquee-reverse': 'marquee var(--marquee-duration, 40s) linear infinite reverse',
        'fade-through': 'fade-through 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        shimmer: 'shimmer 6s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
