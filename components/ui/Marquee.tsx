import { cn } from '@/lib/utils';

type MarqueeProps = {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  /** Seconds for one full loop. */
  duration?: number;
  pauseOnHover?: boolean;
};

/**
 * Marquee — seamless infinite scroll via duplicated track + translate.
 * Pure CSS animation (no JS ticker) so it costs nothing on the main thread.
 *
 * PERF: `will-change-transform` is intentionally NOT set here. A permanent
 * `will-change` promotes the layer and pins GPU memory for the entire session
 * even while the element is off-screen; the transform animation is already
 * composited without it.
 */
export function Marquee({
  children,
  className,
  reverse = false,
  duration = 42,
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        'group relative flex w-full overflow-hidden marquee-fade',
        className,
      )}
    >
      <div
        className={cn(
          'flex w-max shrink-0 items-center gap-4',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee',
          pauseOnHover && 'group-hover:[animation-play-state:paused]',
        )}
        style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-center gap-4 pr-4">{children}</div>
        <div className="flex shrink-0 items-center gap-4 pr-4" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
