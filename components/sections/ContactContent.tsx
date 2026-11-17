'use client';

import { useState } from 'react';
import { Reveal } from '@/components/animations/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Magnetic } from '@/components/animations/Magnetic';
import { ButtonEl } from '@/components/ui/Button';
import { Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/components/providers/LanguageProvider';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactContent() {
  const { t } = useLanguage();
  const c = t.contact;
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState<string>('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? c.error);
      }

      setStatus('success');
      setMessage(c.success);
      form.reset();
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : c.error);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
      <div className="flex flex-col gap-6">
        <SectionHeading
          eyebrow={c.eyebrow}
          title={c.title}
          description={c.description}
          align="left"
        />

        <Reveal className="flex flex-col gap-5">
          <div className="flex items-center gap-3 text-ink-200">
            <Mail size={18} className="text-accent-300" />
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-fluid transition-colors hover:text-white"
            >
              {siteConfig.email}
            </a>
          </div>
          <div className="flex items-center gap-3 text-ink-200">
            <MapPin size={18} className="text-accent-300" />
            <span className="text-fluid">{siteConfig.location}</span>
          </div>
        </Reveal>

        <Reveal className="card-surface p-6">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-400">
            {c.whatToInclude}
          </h3>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-ink-200">
            {[c.include1, c.include2, c.include3].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-400" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <form
          onSubmit={onSubmit}
          className="card-surface flex flex-col gap-5 p-6 sm:p-8"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-ink-200">
              {c.name}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              minLength={2}
              placeholder={c.namePlaceholder}
              className="rounded-xl border border-white/10 bg-ink-950/60 px-4 py-3 text-sm text-white placeholder:text-ink-600 focus:border-accent-400/60 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-ink-200">
              {c.email}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder={c.emailPlaceholder}
              className="rounded-xl border border-white/10 bg-ink-950/60 px-4 py-3 text-sm text-white placeholder:text-ink-600 focus:border-accent-400/60 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="text-sm font-medium text-ink-200"
            >
              {c.message}
            </label>
            <textarea
              id="message"
              name="message"
              required
              minLength={10}
              rows={5}
              placeholder={c.messagePlaceholder}
              className="resize-none rounded-xl border border-white/10 bg-ink-950/60 px-4 py-3 text-sm text-white placeholder:text-ink-600 focus:border-accent-400/60 focus:outline-none"
            />
          </div>

          {status !== 'idle' && message && (
            <div
              className={cn(
                'flex items-center gap-2 rounded-xl border px-4 py-3 text-sm',
                status === 'success'
                  ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
                  : 'border-rose-400/30 bg-rose-400/10 text-rose-300',
              )}
            >
              {status === 'success' ? (
                <CheckCircle size={16} />
              ) : (
                <AlertCircle size={16} />
              )}
              {message}
            </div>
          )}

          <Magnetic className="self-start" strength={8}>
            <ButtonEl
              type="submit"
              variant="primary"
              size="lg"
              disabled={status === 'submitting'}
              className="inline-flex items-center gap-2"
            >
              {status === 'submitting' ? c.sending : c.send}
              <Send size={16} />
            </ButtonEl>
          </Magnetic>
        </form>
      </Reveal>
    </div>
  );
}
