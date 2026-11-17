import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { pageview } from '@/lib/analytics';
import { SmoothScroll } from '@/components/animations/SmoothScroll';
import { LanguageProvider } from '@/components/providers/LanguageProvider';
import { siteConfig } from '@/lib/site';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Muhammad Rayyan Yuwono',
    'Junior Full Stack Developer',
    'WordPress Architect',
    'Next.js Developer',
    'Laravel Developer',
    'React Developer',
    'Tailwind CSS',
    'Indonesia Web Developer',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  themeColor: '#0a0c11',
  width: 'device-width',
  initialScale: 1,
  // Mobile-first: never allow the browser to widen the layout for desktop sites.
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <meta
          name="impact-site-verification"
          content="a02aa6f-2253-419e-9f42-9a4710a36e43"
        />
      </head>
      <body
        className="bg-ink-950 text-ink-50 font-sans antialiased"
        suppressHydrationWarning
      >
        <SmoothScroll>
          <LanguageProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-accent-500 focus:px-5 focus:py-2 focus:text-ink-950 focus:font-medium"
            >
              Skip to content
            </a>
            {children}
          </LanguageProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
