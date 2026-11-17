'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { AuroraBackground } from '@/components/animations/AuroraBackground';
import { SplitText } from '@/components/animations/SplitText';
import { Magnetic } from '@/components/animations/Magnetic';
import { Counter } from '@/components/ui/Counter';
import { Footer } from '@/components/layout/Footer';
import { siteConfig } from '@/lib/site';
import { stats } from '@/lib/achievements';
import { useLanguage } from '@/components/providers/LanguageProvider';

export function HeroSection() {
  const { t } = useLanguage();
  return (
    <>
      <section className="relative min-h-svh w-full overflow-hidden">
        <AuroraBackground />

        <div className="section-shell relative z-10 flex min-h-svh flex-col justify-center pb-20 pt-28">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
            <div className="min-w-0">
              {/* Availability chip */}
              <div className="mb-8 flex items-center gap-2.5 text-sm text-ink-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
                </span>
                {t.hero.availability}
              </div>

              {/* Typewriter headline */}
              <h1 className="text-display-sm font-semibold tracking-[-0.03em] text-gradient">
                <SplitText text={'Muhammad\nRayyan Yuwono'} delay={0.15} />
              </h1>

              {/* Role line */}
              <p className="mt-7 max-w-2xl text-fluid-lg text-ink-200">
                {t.hero.role}
              </p>

              {/* CTAs */}
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <Link
                    href="/projects"
                    className="group inline-flex items-center gap-2 rounded-full bg-accent-500 px-7 py-3.5 text-base font-medium text-ink-950 shadow-[0_12px_50px_-12px_rgba(45,212,191,0.8)] transition-colors hover:bg-accent-400"
                  >
                    {t.hero.exploreWork}
                    <ArrowUpRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </Magnetic>

                <Magnetic strength={6}>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-base font-medium text-white transition-colors hover:border-accent-400/60 hover:bg-white/[0.06]"
                  >
                    {t.hero.startProject}
                  </Link>
                </Magnetic>
              </div>
            </div>

            <div
              className="relative mx-auto aspect-[4/5] w-36 overflow-hidden rounded-[2rem] border border-accent-400/20 bg-ink-900 shadow-[0_0_80px_-32px_rgba(45,212,191,0.45)] sm:w-44 lg:mx-0 lg:w-full"
            >
              <Image
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
                  <Counter value={s.value} suffix={s.suffix} />
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
