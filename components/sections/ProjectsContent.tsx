'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal, RevealGroup, revealItem } from '@/components/animations/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TiltCard } from '@/components/animations/TiltCard';
import { Badge } from '@/components/ui/Badge';
import { projects, projectCategories } from '@/lib/projects';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { categoryKeyByValue } from '@/lib/i18n';
import { ProtectedImage } from '@/components/ui/ProtectedImage';

export function ProjectsContent() {
  const [active, setActive] = useState<string>('All');
  const { t, lang } = useLanguage();
  const catLabel = (c: string) =>
    c === 'All' ? t.categories.all : t.categories[categoryKeyByValue[c] ?? 'all'];
  const filtered =
    active === 'All'
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <div className="flex flex-col gap-8">
      <SectionHeading
        eyebrow={t.projects.eyebrow}
        title={t.projects.title}
        description={t.projects.description}
      />

      {/* Filter bar */}
      <Reveal>
        <div className="flex flex-wrap gap-2">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                active === cat
                  ? 'border-accent-400/40 bg-accent-400/10 text-accent-300'
                  : 'border-white/10 bg-white/[0.03] text-ink-300 hover:text-white',
              )}
              aria-pressed={active === cat}
            >
              {catLabel(cat)}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Grid */}
      <RevealGroup
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        stagger={0.08}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-10%' }}
              variants={revealItem}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
            >
              <TiltCard className="h-full">
                <div className="card-surface group flex h-full flex-col p-5 transition-colors hover:border-white/16">
                  {/* Image slot */}
                  <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                    <ProtectedImage
                      src={p.image}
                      alt={p.title}
                      fill
                      className={
                        p.imageFit === 'contain' ? 'object-contain' : 'object-cover'
                      }
                    />
                    <div className="absolute right-3 top-3 flex gap-2">
                      {p.links.liveDemo && (
                        <a
                          href={p.links.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-ink-950/80 text-white opacity-100 transition-opacity duration-150 sm:h-9 sm:w-9 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
                          aria-label="Live Demo"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                      {p.links.github && (
                        <a
                          href={p.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-ink-950/80 text-white opacity-100 transition-opacity duration-150 sm:h-9 sm:w-9 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
                          aria-label="GitHub"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={16} />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <Badge tone="accent">{catLabel(p.category)}</Badge>
                    <span className="text-xs text-ink-400">{p.year}</span>
                  </div>

                  <h3 className="mt-4 text-fluid-lg font-semibold text-white">
                    {p.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-ink-400">
                    {p.description[lang]}
                  </p>

                  {p.techStack.length > 0 && (
                    <ul className="mt-auto flex flex-wrap gap-2 pt-5">
                      {p.techStack.slice(0, 3).map((tech) => (
                        <li key={tech} className="text-xs text-ink-200">
                          {tech}
                        </li>
                      ))}
                      {p.techStack.length > 3 && (
                        <li className="text-xs text-ink-400">
                          +{p.techStack.length - 3}
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </RevealGroup>
    </div>
  );
}
