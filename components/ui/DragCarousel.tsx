'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type DragCarouselProps = {
  children: React.ReactNode;
  /** Auto-scroll speed in px per frame (60fps). */
  speed?: number;
  className?: string;
};

/**
 * Infinite, draggable carousel.
 *
 * - Auto-scrolls continuously so the row never stops moving.
 * - The user can grab it with the mouse (or finger) and fling it; momentum
 *   decays smoothly and the auto-scroll resumes.
 * - Seamless wrap: the children are rendered twice and the track offset is
 *   kept inside one copy's width, so there is never a visible jump.
 *
 * PERF: one `requestAnimationFrame` loop writing a single `transform`, no
 * React re-renders per frame, and no permanent `will-change`.
 */
export function DragCarousel({
  children,
  speed = 0.55,
  className,
}: DragCarouselProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const state = useRef({
    offset: 0,
    velocity: 0,
    dragging: false,
    lastX: 0,
    lastT: 0,
    half: 0,
    raf: 0,
  });

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const s = state.current;
    const measure = () => {
      s.half = track.scrollWidth / 2;
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(track);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const tick = () => {
      if (!s.dragging) {
        s.offset -= speed;
        s.offset -= s.velocity;
        s.velocity *= 0.94;
        if (Math.abs(s.velocity) < 0.01) s.velocity = 0;
      }
      if (s.half > 0) {
        while (s.offset <= -s.half) s.offset += s.half;
        while (s.offset > 0) s.offset -= s.half;
      }
      track.style.transform = `translate3d(${s.offset}px,0,0)`;
      s.raf = requestAnimationFrame(tick);
    };
    if (!reduce) s.raf = requestAnimationFrame(tick);

    const onDown = (e: PointerEvent) => {
      s.dragging = true;
      s.velocity = 0;
      s.lastX = e.clientX;
      s.lastT = performance.now();
      wrap.style.cursor = 'grabbing';
      try {
        wrap.setPointerCapture(e.pointerId);
      } catch {
        /* capture is best-effort */
      }
    };

    const onMove = (e: PointerEvent) => {
      if (!s.dragging) return;
      const now = performance.now();
      const dx = e.clientX - s.lastX;
      const dt = Math.max(1, now - s.lastT);
      s.offset += dx;
      s.velocity = -(dx / dt) * 14;
      s.lastX = e.clientX;
      s.lastT = now;
    };

    const onUp = (e: PointerEvent) => {
      s.dragging = false;
      wrap.style.cursor = 'grab';
      try {
        wrap.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    };

    wrap.addEventListener('pointerdown', onDown);
    wrap.addEventListener('pointermove', onMove);
    wrap.addEventListener('pointerup', onUp);
    wrap.addEventListener('pointercancel', onUp);
    wrap.addEventListener('pointerleave', onUp);

    return () => {
      cancelAnimationFrame(s.raf);
      ro.disconnect();
      wrap.removeEventListener('pointerdown', onDown);
      wrap.removeEventListener('pointermove', onMove);
      wrap.removeEventListener('pointerup', onUp);
      wrap.removeEventListener('pointercancel', onUp);
      wrap.removeEventListener('pointerleave', onUp);
    };
  }, [speed]);

  return (
    <div
      ref={wrapRef}
      className={cn(
        'marquee-fade relative w-full select-none overflow-hidden',
        className,
      )}
      style={{ cursor: 'grab', touchAction: 'pan-y' }}
    >
      <div ref={trackRef} className="flex w-max items-stretch">
        <div className="flex shrink-0 items-stretch">{children}</div>
        <div className="flex shrink-0 items-stretch" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
