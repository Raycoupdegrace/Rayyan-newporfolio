'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * AuroraBackground — two restrained radial gradients with subtle desktop
 * motion. CSS-only fallback: if JS never runs, the static gradient still
 * looks right.
 *
 * PERF: the orbs only ever animate `translate3d` (a composited transform), so
 * the expensive `blur()` layer is rasterised once and reused. Animating
 * `scale()` on a blurred element forces the browser to re-run the blur on
 * every frame — the single biggest source of scroll jank on this page.
 */
export function AuroraBackground({
  className,
  intensity = 1,
}: {
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      // Transform-only update: stays on the compositor, never re-blurs.
      node.style.transform = `translate3d(${currentX * 24}px, ${currentY * 24}px, 0)`;
      raf =
        Math.abs(targetX - currentX) > 0.001 ||
        Math.abs(targetY - currentY) > 0.001
          ? requestAnimationFrame(tick)
          : 0;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 -z-10 overflow-hidden will-change-transform',
        className,
      )}
    >
      {/* Base wash */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(45,212,191,0.24),transparent_60%)]" />

      {/* Two restrained aurora layers keep the effect inexpensive to composite.
          Blur trimmed from 88/96px to 64/72px — visually equivalent on a dark
          backdrop, materially cheaper to rasterise. */}
      <div
        className="aurora-orb aurora-orb-primary absolute left-[-14%] top-[-22%] h-[55vmax] w-[55vmax] rounded-full blur-[64px] animate-[aurora-drift_26s_ease-in-out_infinite]"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(45,212,191,0.56), transparent 62%)',
          opacity: 0.82 * intensity,
        }}
      />
      <div
        className="aurora-orb aurora-orb-secondary absolute right-[-12%] top-[8%] h-[44vmax] w-[44vmax] rounded-full blur-[72px] animate-[aurora-drift_34s_ease-in-out_infinite_reverse]"
        style={{
          background:
            'radial-gradient(circle at 60% 40%, rgba(129,140,248,0.3), transparent 64%)',
          opacity: 0.48 * intensity,
        }}
      />
      {/* Subtle grid + vignette keep the aurora from reading as a generic blob. */}
      <div className="absolute inset-0 grid-noise opacity-[0.5]" />
      <div className="absolute inset-0 bg-[radial-gradient(100%_100%_at_50%_50%,transparent_40%,rgba(10,12,17,0.85)_100%)]" />

      <style jsx>{`
        /* Translate-only drift: no scale, so the blur layer is never
           re-rasterised. */
        @keyframes aurora-drift {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(4%, -5%, 0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .aurora-orb {
            animation: none !important;
          }
        }
        @media (pointer: coarse) {
          .aurora-orb {
            filter: blur(32px);
          }
          .aurora-orb-primary {
            width: 72vw;
            height: 72vw;
            animation-duration: 32s;
          }
          .aurora-orb-secondary {
            width: 58vw;
            height: 58vw;
            animation-duration: 40s;
          }
        }
      `}</style>
    </div>
  );
}
