'use client';

import Image from 'next/image';
import { Reveal } from '@/components/animations/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DragCarousel } from '@/components/ui/DragCarousel';
import { Counter } from '@/components/ui/Counter';
import { certifications, stats } from '@/lib/achievements';
import { Badge } from '@/components/ui/Badge';
import { MousePointer2, MoveHorizontal, Award } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

export function AchievementsContent() {
  const { t, lang } = useLanguage();

  return (
    <div className="flex flex-col gap-12">
      <SectionHeading
        eyebrow={t.achievements.eyebrow}
        title={t.achievements.title}
        description={t.achievements.description}
      />

      {/* Stats row — one compact line */}
      <dl className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.labelKey} className="flex flex-col gap-1">
            <dd className="text-display-xs font-semibold text-white">
              <Counter value={s.value} suffix={s.suffix[lang]} />
            </dd>
            <dt className="text-xs uppercase tracking-widest text-ink-400">
              {t.stats[s.labelKey as keyof (typeof t)['stats']]}
            </dt>
          </div>
        ))}
      </dl>

      {/* Certifications carousel — draggable, never stops */}
      <Reveal>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-fluid-lg font-semibold text-white">
              {t.achievements.certificationsTitle}
            </h3>
            <span className="inline-flex items-center gap-1.5 text-xs text-ink-400">
              <MousePointer2 size={13} />
              <MoveHorizontal size={13} />
              {t.achievements.certificationsHint}
            </span>
          </div>
          <DragCarousel speed={0.5}>
            {certifications.map((c) => (
              <div
                key={`${c.name}-${c.year}`}
                className="card-surface mr-4 flex w-[260px] shrink-0 flex-col gap-3 p-3 sm:w-[300px]"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                  <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full border border-white/10 bg-ink-950/80 px-2 py-0.5 text-[10px] font-medium text-ink-200">
                    <Award size={11} className="text-accent-300" />
                    {c.year}
                  </span>
                </div>
                <div className="flex flex-col gap-1 px-1 pb-1">
                  <span className="line-clamp-2 text-sm font-semibold text-white">
                    {c.name}
                  </span>
                  <span className="text-xs text-accent-300">{c.issuer}</span>
                  <p className="line-clamp-2 text-xs text-ink-400">
                    {c.description[lang]}
                  </p>
                </div>
              </div>
            ))}
          </DragCarousel>
        </div>
      </Reveal>

      {/* Recognition strip */}
      <Reveal>
        <div className="card-surface p-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-fluid-lg font-semibold text-white">
                {t.achievements.openToOpportunities}
              </h3>
              <p className="mt-1 text-sm text-ink-400">
                {t.achievements.opportunitiesDesc}
              </p>
            </div>
            <Badge tone="accent">{t.achievements.availability}</Badge>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
