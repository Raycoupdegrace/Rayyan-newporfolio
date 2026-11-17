'use client';

import { Reveal, revealItem } from '@/components/animations/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { ProtectedImage } from '@/components/ui/ProtectedImage';
import { experiences } from '@/lib/experience';
import { useLanguage } from '@/components/providers/LanguageProvider';

export function ExperienceContent() {
  const { t, lang } = useLanguage();

  return (
    <div className="flex flex-col gap-10">
      <SectionHeading
        eyebrow={t.experience.eyebrow}
        title={t.experience.title}
        description={t.experience.description}
      />

      <ol className="relative flex flex-col gap-6 border-l border-white/[0.08] pl-7 sm:pl-10">
        {experiences.map((exp, i) => (
          <li key={`${exp.company}-${i}`} className="relative list-none">
            {/* Timeline node */}
            <span
              aria-hidden="true"
              className={`absolute -left-[calc(1.75rem+1px)] top-6 grid h-5 w-5 place-items-center rounded-full border sm:-left-[calc(2.5rem+1px)] ${
                exp.current
                  ? 'border-accent-400 bg-accent-400/20'
                  : 'border-white/15 bg-ink-900'
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  exp.current ? 'bg-accent-400' : 'bg-ink-400'
                }`}
              />
            </span>

            <Reveal variants={revealItem} className="card-surface p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  {exp.logo ? (
                    <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl border border-white/10 bg-white p-1.5">
                      <ProtectedImage
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        width={40}
                        height={40}
                        className="h-full w-full object-contain"
                      />
                    </span>
                  ) : (
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-sm font-bold text-accent-300">
                      {exp.company.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                  <div className="flex flex-col">
                    <h3 className="text-fluid-lg font-semibold text-white">
                      {exp.role[lang]}
                    </h3>
                    <p className="text-sm font-medium text-accent-300">
                      {exp.company} · {exp.location[lang]}
                    </p>
                  </div>
                </div>
                <Badge tone={exp.current ? 'accent' : 'muted'}>
                  {exp.period[lang]}
                </Badge>
              </div>

              <p className="mt-3 text-fluid text-ink-200">{exp.summary[lang]}</p>
              <ul className="mt-4 flex flex-col gap-2">
                {exp.highlights[lang].map((h) => (
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
          </li>
        ))}
      </ol>
    </div>
  );
}
