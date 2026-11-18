'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Project } from '@/lib/projects';
import { Badge } from '@/components/ui/Badge';
import { Reveal, RevealGroup, revealItem } from '@/components/animations/Reveal';
import { TiltCard } from '@/components/animations/TiltCard';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { categoryKeyByValue } from '@/lib/i18n';
import { ProtectedImage } from '@/components/ui/ProtectedImage';

type Props = {
  project: Project;
};

export function ProjectDetail({ project }: Props) {
  const { t, lang } = useLanguage();
  const d = t.projectDetail;
  const categoryLabel =
    t.categories[categoryKeyByValue[project.category] ?? 'all'];

  return (
    <div className="flex flex-col gap-8">
      {/* Back link + header */}
      <Reveal>
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 text-sm text-ink-400 transition-colors hover:text-white"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          {d.back}
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Badge tone="accent">{categoryLabel}</Badge>
          <span className="text-sm text-ink-400">{project.year}</span>
        </div>
        <h1 className="mt-4 text-display-md font-semibold tracking-tight text-gradient">
          {project.title}
        </h1>
        <p className="mt-4 max-w-3xl text-fluid text-ink-200">
          {project.description[lang]}
        </p>
      </Reveal>

      {/* Hero media slot */}
      <Reveal>
        <TiltCard className="w-full">
          <div className="card-surface relative aspect-video w-full overflow-hidden rounded-3xl border border-white/[0.08]">
            <ProtectedImage
              src={project.image}
              alt={project.title}
              fill
              sizes="100vw"
              className={
                project.imageFit === 'contain' ? 'object-contain' : 'object-cover'
              }
            />
          </div>
        </TiltCard>
      </Reveal>

      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        {/* Main write-up */}
        <Reveal className="flex flex-col gap-6 text-fluid text-ink-200">
          <p>{d.p1.replace('{category}', categoryLabel)}</p>
          <p>{d.p2}</p>

          {project.techStack.length > 0 && (
            <>
              <h2 className="mt-4 text-display-xs font-semibold text-white">
                {d.techUsed}
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge key={tech} tone="accent">
                    {tech}
                  </Badge>
                ))}
              </div>
            </>
          )}
        </Reveal>

        {/* Meta card */}
        <Reveal delay={0.1} className="h-fit">
          <div className="card-surface p-6">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-ink-400">
              {d.category}
            </h2>
            <p className="mt-2 text-ink-200">{categoryLabel}</p>

            <h2 className="mt-8 text-sm font-semibold uppercase tracking-widest text-ink-400">
              {d.year}
            </h2>
            <p className="mt-2 text-ink-200">{project.year}</p>

            {(project.links.liveDemo || project.links.github) && (
              <>
                <h2 className="mt-8 text-sm font-semibold uppercase tracking-widest text-ink-400">
                  {d.link}
                </h2>
                <ul className="mt-2 flex flex-wrap gap-2 text-sm">
                  {project.links.liveDemo && (
                    <li>
                      <a
                        href={project.links.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-300 hover:underline"
                      >
                        Live Demo →
                      </a>
                    </li>
                  )}
                  {project.links.github && (
                    <li>
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-300 hover:underline"
                      >
                        GitHub →
                      </a>
                    </li>
                  )}
                </ul>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
