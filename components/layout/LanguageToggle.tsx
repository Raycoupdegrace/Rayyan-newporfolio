'use client';

import { useLanguage } from '@/components/providers/LanguageProvider';
import { cn } from '@/lib/utils';

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] p-0.5',
        className,
      )}
      role="group"
      aria-label="Language"
    >
      {(['id', 'en'] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={cn(
            'rounded-full px-2.5 py-1 text-xs font-medium uppercase transition-colors',
            lang === code
              ? 'bg-accent-400/15 text-accent-300'
              : 'text-ink-400 hover:text-ink-100',
          )}
        >
          {code}
        </button>
      ))}
    </div>
  );
}