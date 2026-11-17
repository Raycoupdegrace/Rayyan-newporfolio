'use client';

import { Reveal, RevealGroup, revealItem } from '@/components/animations/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TiltCard } from '@/components/animations/TiltCard';
import { Badge } from '@/components/ui/Badge';
import { DragCarousel } from '@/components/ui/DragCarousel';
import {
  Code2,
  Database,
  Globe,
  Layers,
  Server,
  Wind,
  GitBranch,
  Gauge,
  MousePointer2,
  MoveHorizontal,
} from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

type Bi = { id: string; en: string };

type Pillar = {
  id: string;
  title: Bi;
  span: string;
  body: Bi;
  items: string[];
  accent?: boolean;
};

const pillars: Pillar[] = [
  {
    id: 'backend',
    title: { id: 'Backend & Database', en: 'Backend & Database' },
    span: 'md:col-span-2',
    body: {
      id: 'Desain RESTful API, pemodelan database relasional, manajemen server, dan logika backend di Laravel & PHP. Dibangun untuk bertahan menghadapi trafik nyata, pertumbuhan konten nyata, dan pemeliharaan nyata.',
      en: 'RESTful API design, relational database modelling, server management and backend logic in Laravel & PHP. Built to survive real traffic, real content growth and real maintenance.',
    },
    items: ['Laravel', 'PHP', 'REST API', 'MySQL', 'Server Ops'],
    accent: true,
  },
  {
    id: 'frontend',
    title: { id: 'Frontend & UI', en: 'Frontend & UI' },
    span: 'md:col-span-1',
    body: {
      id: 'Antarmuka React.js dan Next.js dengan animasi lanjutan, aksesibilitas, dan sistem layout yang konsisten di setiap breakpoint.',
      en: 'React.js and Next.js interfaces with advanced animation, accessibility and a layout system that holds across every breakpoint.',
    },
    items: ['React.js', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: 'wordpress',
    title: { id: 'Ekosistem WordPress', en: 'WordPress Ecosystem' },
    span: 'md:col-span-1',
    body: {
      id: 'Arsitektur WordPress modern: Elementor Pro, Flexbox Containers, struktur data dinamis, penguatan CMS, dan optimasi server.',
      en: 'Modern WordPress architecture: Elementor Pro, Flexbox Containers, dynamic data structures, CMS hardening, server optimisation.',
    },
    items: ['Elementor Pro', 'Flexbox Containers', 'ACF', 'CMS Security'],
  },
  {
    id: 'craft',
    title: { id: 'Performa & Keahlian', en: 'Performance & Craft' },
    span: 'md:col-span-2',
    body: {
      id: 'Setiap proyek dirilis dengan anggaran performa. Core Web Vitals diukur, bukan diasumsikan. Animasi ramah GPU dan sadar reduced-motion.',
      en: 'Every project ships with a performance budget. Core Web Vitals are measured, not assumed. Animations are GPU-friendly and reduced-motion aware.',
    },
    items: ['Lighthouse 95+', 'Core Web Vitals', 'Accessibility', 'GSAP'],
  },
];

const skills = [
  { name: 'React.js', Icon: Code2 },
  { name: 'Next.js', Icon: Layers },
  { name: 'Tailwind CSS', Icon: Wind },
  { name: 'Laravel / PHP', Icon: Server },
  { name: 'WordPress', Icon: Globe },
  { name: 'MySQL', Icon: Database },
  { name: 'Git / Version Control', Icon: GitBranch },
  { name: 'Core Web Vitals', Icon: Gauge },
];

export function ExpertiseContent() {
  const { t, lang } = useLanguage();

  return (
    <div className="flex flex-col gap-10">
      <SectionHeading
        eyebrow={t.expertise.eyebrow}
        title={t.expertise.title}
        description={t.expertise.description}
      />

      <RevealGroup
        className="grid auto-rows-[minmax(160px,auto)] gap-4 md:grid-cols-3"
        stagger={0.07}
      >
        {pillars.map((p) => (
          <Reveal key={p.id} variants={revealItem} className={p.span}>
            <TiltCard className="h-full">
              <div
                className={`card-surface flex h-full flex-col gap-3 p-5 ${
                  p.accent ? 'border-accent-400/30' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-fluid-lg font-semibold text-white">
                    {p.title[lang]}
                  </h3>
                  {p.accent && (
                    <span className="h-2 w-2 shrink-0 rounded-full bg-accent-400 shadow-glow" />
                  )}
                </div>
                <p className="text-sm text-ink-400">{p.body[lang]}</p>
                <ul className="mt-auto flex flex-wrap gap-2">
                  {p.items.map((i) => (
                    <Badge key={i} tone={p.accent ? 'accent' : 'default'}>
                      {i}
                    </Badge>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </RevealGroup>

      <section aria-label={t.expertise.coreStack} className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-medium uppercase tracking-widest text-ink-400">
            {t.expertise.coreStack}
          </p>
          <span className="inline-flex items-center gap-1.5 text-xs text-ink-400">
            <MousePointer2 size={13} />
            <MoveHorizontal size={13} />
            {t.expertise.stackHint}
          </span>
        </div>
        <DragCarousel speed={0.6}>
          {skills.map(({ name, Icon }) => (
            <div
              key={name}
              className="card-surface mr-3 flex shrink-0 items-center gap-3 px-5 py-3 text-sm font-medium text-ink-200"
            >
              <Icon size={20} strokeWidth={1.7} className="text-accent-300" aria-hidden="true" />
              <span className="whitespace-nowrap">{name}</span>
            </div>
          ))}
        </DragCarousel>
      </section>
    </div>
  );
}
