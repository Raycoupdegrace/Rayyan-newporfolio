import { cn } from '@/lib/utils';

/** Small metadata pill used across timeline, projects and achievements. */
export function Badge({
  children,
  className,
  tone = 'default',
}: {
  children: React.ReactNode;
  className?: string;
  tone?: 'default' | 'accent' | 'muted';
}) {
  const tones = {
    default: 'border-white/12 bg-white/[0.04] text-ink-200',
    accent: 'border-accent-400/40 bg-accent-400/10 text-accent-300',
    muted: 'border-white/[0.08] bg-transparent text-ink-400',
  } as const;

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
