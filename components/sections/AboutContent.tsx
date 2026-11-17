'use client';

import { Reveal, RevealGroup, revealItem } from '@/components/animations/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { siteConfig } from '@/lib/site';
import { principles } from '@/lib/achievements';
import { education } from '@/lib/education';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

export function AboutContent() {
  const { t, lang } = useLanguage();
  const a = t.about;

  return (
    <div className="flex flex-col gap-12">
      <SectionHeading
        eyebrow={a.eyebrow}
        title={a.title}
        description={a.description}
      />

      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-10">
        {/* Narrative */}
        <Reveal className="flex flex-col gap-4 text-fluid text-ink-200">
          <p>{a.p1.replace('{name}', siteConfig.name)}</p>
          <p>{a.p2}</p>
          <p>{a.p3}</p>
        </Reveal>

        {/* Side facts */}
        <Reveal delay={0.15} className="flex flex-col gap-4">
          <div className="card-surface p-5">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-ink-400">
              {a.focusAreas}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              <Badge>Full Stack Architecture</Badge>
              <Badge tone="accent">Next.js / React.js</Badge>
              <Badge tone="accent">Laravel / PHP</Badge>
              <Badge>WordPress Engineering</Badge>
              <Badge>Database Design</Badge>
              <Badge>Performance Engineering</Badge>
              <Badge>UI/UX Craft</Badge>
            </ul>
          </div>
          <div className="card-surface p-5">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-ink-400">
              {a.basedIn}
            </h3>
            <p className="mt-2 text-fluid text-ink-100">{siteConfig.location}</p>
          </div>
          <div className="card-surface p-5">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-ink-400">
              {a.availability}
            </h3>
            <p className="mt-2 text-fluid text-ink-100">{t.hero.availability}</p>
          </div>
        </Reveal>
      </div>

      {/* Education */}
      <Reveal className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h3 className="text-fluid-lg font-semibold text-white">
            {a.educationTitle}
          </h3>
          <p className="text-sm text-ink-400">{a.educationHint}</p>
        </div>
        <RevealGroup className="grid gap-4 md:grid-cols-1" stagger={0.08}>
          {education.map((ed, i) => (
            <Reveal
              key={i}
              variants={revealItem}
              className="card-surface flex flex-col gap-4 p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-accent-400/25 bg-accent-400/10 text-accent-300">
                    <GraduationCap size={20} />
                  </span>
                  <div className="flex flex-col">
                    <h4 className="text-fluid-lg font-semibold text-white">
                      {ed.school[lang]}
                    </h4>
                    <p className="text-sm font-medium text-accent-300">
                      {ed.program[lang]}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-1 text-xs text-ink-400 sm:items-end">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={13} />
                    {ed.period[lang]}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={13} />
                    {ed.location[lang]}
                  </span>
                </div>
              </div>
              <p className="text-fluid text-ink-200">{ed.summary[lang]}</p>
              <ul className="flex flex-col gap-2">
                {ed.highlights[lang].map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2.5 text-sm text-ink-400"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-400" />
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </RevealGroup>
      </Reveal>

      {/* Principles */}
      <RevealGroup className="grid gap-4 md:grid-cols-3">
        {principles.map((p, i) => (
          <Reveal
            key={i}
            variants={revealItem}
            className="card-surface flex h-full flex-col gap-2 p-5"
          >
            <h3 className="text-fluid-lg font-semibold text-white">
              {p.title[lang]}
            </h3>
            <p className="text-sm text-ink-400">{p.body[lang]}</p>
          </Reveal>
        ))}
      </RevealGroup>
    </div>
  );
}
