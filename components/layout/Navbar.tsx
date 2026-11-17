'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navigation, siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';
import { Magnetic } from '@/components/animations/Magnetic';
import { LanguageToggle } from '@/components/layout/LanguageToggle';
import { useLanguage } from '@/components/providers/LanguageProvider';

const navKeyByHref: Record<string, string> = {
  '/': 'home',
  '/about': 'about',
  '/expertise': 'expertise',
  '/experience': 'experience',
  '/projects': 'projects',
  '/achievements': 'achievements',
  '/contact': 'contact',
};

export function Navbar() {
  const pathname = usePathname();
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // PERF: a scroll listener that calls setState on every frame keeps React
    // busy during fast scrolls. A 1px sentinel + IntersectionObserver lets the
    // browser tell us once when we cross the threshold, with zero per-frame work.
    const sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText =
      'position:absolute;top:0;left:0;width:1px;height:16px;pointer-events:none;';
    document.body.prepend(sentinel);
    const io = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(sentinel);
    return () => {
      io.disconnect();
      sentinel.remove();
    };
  }, []);

  // Close the mobile sheet on navigation.
  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll while the sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-swift',
        scrolled
          ? 'border-b border-white/[0.08] bg-ink-950/90'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav className="section-shell flex h-16 items-center justify-between sm:h-18">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight"
          aria-label={`${siteConfig.name} — home`}
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-xs font-bold text-accent-300">
            RY
          </span>
          <span className="hidden text-ink-200 transition-colors group-hover:text-white sm:inline">
            {siteConfig.shortName}
            <span className="text-accent-400">.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => {
            const active =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'relative rounded-full px-3.5 py-2 text-sm transition-colors',
                    active
                      ? 'text-white'
                      : 'text-ink-400 hover:text-ink-100',
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/[0.05]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {t.nav[navKeyByHref[item.href] as keyof (typeof t)['nav']]}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <LanguageToggle className="hidden sm:inline-flex" />
          <Magnetic className="hidden sm:inline-flex" strength={8}>
            <Link
              href="/contact"
              className="rounded-full border border-accent-400/40 bg-accent-400/10 px-4 py-2 text-sm font-medium text-accent-300 transition-colors hover:bg-accent-400/20"
            >
              {lang === 'id' ? 'Ngobrol' : "Let's talk"}
            </Link>
          </Magnetic>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-white/[0.08] bg-ink-950/[0.98] lg:hidden"
          >
            <ul className="section-shell flex flex-col py-4">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block border-b border-white/5 py-3.5 text-base text-ink-200 transition-colors hover:text-white"
                  >
                    {t.nav[navKeyByHref[item.href] as keyof (typeof t)['nav']]}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
