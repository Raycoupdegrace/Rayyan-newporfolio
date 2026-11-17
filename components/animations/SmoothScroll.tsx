'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Lenis smooth-scroll provider.
 *
 * PERF notes:
 *  - `autoRaf: true` lets Lenis own a single internal RAF loop that idles when
 *    there is nothing to animate, instead of our own always-on loop.
 *  - `prefers-reduced-motion` skips Lenis entirely (native scroll wins).
 *  - `anchors: true` replaces the old global click listener.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      // Native momentum on touch is better than a simulated one on mobile.
      syncTouch: false,
      // Handle in-page anchor links (`#main`, `#foo`) natively.
      anchors: { offset: -96 },
      // Let Lenis manage its own requestAnimationFrame loop.
      autoRaf: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
