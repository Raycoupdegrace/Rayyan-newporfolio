'use client';

import Link from 'next/link';
import { Github, Linkedin, Mail, Send, Instagram, ArrowUp, MapPin } from 'lucide-react';
import { navigation, siteConfig } from '@/lib/site';
import { navKeyByHref } from '@/lib/i18n';
import { useLanguage } from '@/components/providers/LanguageProvider';

const socials = [
  { href: siteConfig.social.github, label: 'GitHub', Icon: Github },
  { href: siteConfig.social.linkedin, label: 'LinkedIn', Icon: Linkedin },
  { href: siteConfig.social.telegram, label: 'Telegram', Icon: Send },
  { href: siteConfig.social.instagram, label: 'Instagram', Icon: Instagram },
];

export function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLanguage();

  const scrollTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative border-t border-white/[0.08]">
      {/* Main columns — items-start so no column is stretched into dead space */}
      <div className="section-shell grid items-start gap-x-10 gap-y-10 py-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)] lg:py-14">
        {/* Brand + bio + availability */}
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <Link href="/" className="w-fit text-lg font-semibold tracking-tight">
            {siteConfig.shortName}
            <span className="text-accent-400">.</span>
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-ink-400">
            {t.siteRole}. {t.footer.description}
          </p>
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-accent-400/25 bg-accent-400/[0.06] px-3 py-1.5 text-xs text-accent-200">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-400" />
            </span>
            {t.hero.availability}
          </p>
        </div>

        {/* Navigation — two balanced columns */}
        <nav aria-label="Footer" className="flex flex-col gap-4">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-ink-400">
            {t.footer.navigate}
          </h3>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-ink-200 transition-colors hover:text-accent-300"
                >
                  {t.nav[navKeyByHref[item.href]]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social + contact */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-ink-400">
            {t.footer.elsewhere}
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {socials.map(({ href, label, Icon }) =>
              href.trim() ? (
                <a
                  key={label}
                  href={href}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-ink-200 transition-colors hover:border-accent-400/50 hover:text-accent-300"
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Icon size={18} />
                </a>
              ) : (
                <span
                  key={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-ink-200"
                  role="img"
                  aria-label={`${label} link belum diatur`}
                  title={`${label} link belum diatur`}
                >
                  <Icon size={18} />
                </span>
              ),
            )}
          </div>
          <div className="flex flex-col gap-2">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-start gap-2 text-[13px] leading-snug text-ink-200 transition-colors hover:text-accent-300"
            >
              <Mail size={15} className="shrink-0 text-accent-300" />
              <span className="min-w-0">{siteConfig.email}</span>
            </a>
            <span className="inline-flex items-start gap-2 text-[13px] leading-snug text-ink-400">
              <MapPin size={15} className="shrink-0 text-accent-300" />
              {siteConfig.location}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom bar — copyright left, back-to-top right (no empty right side) */}
      <div className="section-shell flex flex-col items-start gap-3 border-t border-white/[0.08] py-5 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {siteConfig.name}. {t.footer.rights}
        </p>
        <button
          type="button"
          onClick={scrollTop}
          className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 transition-colors hover:border-accent-400/50 hover:text-accent-300"
        >
          {t.footer.backToTop}
          <ArrowUp
            size={13}
            className="transition-transform duration-300 group-hover:-translate-y-0.5"
          />
        </button>
      </div>
    </footer>
  );
}
