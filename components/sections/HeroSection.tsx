'use client';

import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { SplitText } from '@/components/animations/SplitText';
import { Counter } from '@/components/ui/Counter';
import { ProtectedImage } from '@/components/ui/ProtectedImage';
import { Footer } from '@/components/layout/Footer';
import { siteConfig } from '@/lib/site';
import { stats } from '@/lib/achievements';
import { useLanguage } from '@/components/providers/LanguageProvider';

export function HeroSection() {
  const { lang, t } = useLanguage();
  return (
    <>
      <section className="relative min-h-svh w-full overflow-hidden">
        <div className="section-shell relative flex min-h-svh flex-col justify-center pb-20 pt-28">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
            <div className="min-w-0">
              <div className="mb-8 flex items-center gap-2.5 text-sm text-ink-400">
                <span className="h-2 w-2 rounded-full bg-accent-400" />
                {t.hero.availability}
              </div>

              <h1 className="text-display-sm font-semibold tracking-[-0.03em] text-white">
                <SplitText
                  text={'Muhammad\nRayyan Yuwono'}
                  stagger={0.08}
                  eraseStagger={0.04}
                  pause={1.4}
                  delay={0.25}
                />
              </h1>

              {/* Role line */}
              <p className="mt-7 max-w-2xl text-fluid-lg text-ink-200">
                {t.hero.role}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/projects"
                  className="group inline-flex min-h-11 items-center gap-2 rounded-md bg-accent-500 px-5 py-3 text-base font-medium text-ink-950 transition-colors hover:bg-accent-400"
                >
                  {t.hero.exploreWork}
                  <ArrowUpRight size={18} />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/20 px-5 py-3 text-base font-medium text-white transition-colors hover:border-white/50"
                >
                  {t.hero.startProject}
                </Link>
              </div>
            </div>

            <div
              className="relative mx-auto aspect-[4/5] w-36 overflow-hidden rounded-xl border border-white/10 bg-ink-900 sm:w-44 lg:mx-0 lg:w-full"
            >
              <ProtectedImage
                src="/profile.jpeg"
                alt="Muhammad Rayyan Yuwono"
                fill
                priority
                sizes="(min-width: 1024px) 288px, 176px"
                className="object-cover object-[center_35%]"
              />
            </div>
          </div>

          {/* Stats strip */}
          <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/[0.08] pt-8 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.labelKey} className="flex flex-col gap-1">
                <dt className="text-xs uppercase tracking-widest text-ink-400">
                  {t.stats[s.labelKey as keyof (typeof t)['stats']]}
                </dt>
                <dd className="text-display-xs font-semibold text-white">
                  <Counter value={s.value} suffix={s.suffix[lang]} />
                </dd>
              </div>
            ))}
          </dl>

          {/* Scroll cue */}
          <Link
            href="/about"
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-ink-400 transition-colors hover:text-accent-300"
            aria-label="Go to about"
          >
            <ArrowDown size={20} className="animate-bounce" />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
