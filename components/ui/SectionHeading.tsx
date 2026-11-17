import { cn } from '@/lib/utils';
import { Reveal } from '@/components/animations/Reveal';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
};

/** Consistent section header: eyebrow chip, fluid title, optional lede. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow && <span className="chip w-fit">{eyebrow}</span>}
      <h2 className="text-display-sm font-semibold tracking-tight text-gradient max-w-3xl">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'max-w-2xl text-fluid text-ink-400',
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
