'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type SplitTextProps = {
  text: string;
  className?: string;
  /** Seconds between character changes while typing. */
  stagger?: number;
  /** Seconds between character changes while erasing. */
  eraseStagger?: number;
  /** Pause after completing or clearing the text. */
  pause?: number;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
};

/**
 * Loops a type-and-erase reveal. Reduced-motion preferences show the full text.
 */
export function SplitText({
  text,
  className,
  stagger = 0.1,
  eraseStagger = 0.045,
  pause = 1.2,
  delay = 0,
  as: Tag = 'span',
}: SplitTextProps) {
  const characters = Array.from(text);
  const firstLineRef = useRef<HTMLSpanElement>(null);
  const secondLineNameRef = useRef<HTMLSpanElement>(null);
  const secondLineAccentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const animationCharacters = Array.from(text);
    const characterCount = animationCharacters.length;
    const renderCharacters = (count: number) => {
      const visibleCharacters = animationCharacters.slice(0, count);
      const visibleNewLineIndex = visibleCharacters.indexOf('\n');
      const firstLine =
        visibleNewLineIndex < 0
          ? visibleCharacters.join('')
          : visibleCharacters.slice(0, visibleNewLineIndex).join('');
      const secondLine =
        visibleNewLineIndex < 0
          ? ''
          : visibleCharacters.slice(visibleNewLineIndex + 1).join('');
      const separator = secondLine.indexOf(' ');

      if (firstLineRef.current) firstLineRef.current.textContent = firstLine;
      if (secondLineNameRef.current) {
        secondLineNameRef.current.textContent =
          separator < 0 ? secondLine : secondLine.slice(0, separator);
      }
      if (secondLineAccentRef.current) {
        secondLineAccentRef.current.textContent =
          separator < 0 ? '' : secondLine.slice(separator);
      }
    };

    renderCharacters(characterCount);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let visible = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const step = () => {
      if (!deleting) {
        visible += 1;
      } else {
        visible -= 1;
      }

      renderCharacters(visible);

      if (!deleting && visible === characterCount) {
        deleting = true;
        timeout = setTimeout(step, pause * 1000);
      } else if (deleting && visible === 0) {
        deleting = false;
        timeout = setTimeout(step, pause * 1000);
      } else {
        timeout = setTimeout(
          step,
          (deleting ? eraseStagger : stagger) * 1000,
        );
      }
    };

    renderCharacters(0);
    timeout = setTimeout(step, delay * 1000);
    return () => clearTimeout(timeout);
  }, [delay, eraseStagger, pause, stagger, text]);

  const newLineIndex = characters.indexOf('\n');
  const firstLine = characters
    .slice(0, newLineIndex < 0 ? characters.length : newLineIndex)
    .join('');
  const secondLine = characters
    .slice(newLineIndex < 0 ? characters.length : newLineIndex + 1)
    .join('');
  const separator = secondLine.indexOf(' ');
  const accessibleText = text.replace(/\n/g, ' ');

  return (
    <Tag className={cn('inline-block', className)} aria-label={accessibleText}>
      <span className="sr-only">{accessibleText}</span>
      <span aria-hidden className="inline-block text-left">
        <span ref={firstLineRef}>{firstLine}</span>
        <br />
        <span className="relative inline-block whitespace-nowrap">
          <span className="invisible">{secondLine}</span>
          <span className="absolute inset-0">
            <span ref={secondLineNameRef}>
              {separator < 0 ? secondLine : secondLine.slice(0, separator)}
            </span>
            <span ref={secondLineAccentRef} className="text-white">
              {separator < 0 ? '' : secondLine.slice(separator)}
            </span>
            <span className="ml-1 inline-block h-[0.8em] w-[0.07em] translate-y-[0.08em] rounded-sm bg-accent-300 animate-pulse" />
          </span>
        </span>
      </span>
    </Tag>
  );
}
