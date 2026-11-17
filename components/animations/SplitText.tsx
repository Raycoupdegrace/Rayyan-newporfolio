'use client';

import { useEffect, useState } from 'react';
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
  const [visibleCharacters, setVisibleCharacters] = useState(characters.length);

  useEffect(() => {
    const characterCount = Array.from(text).length;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisibleCharacters(characterCount);
      return;
    }

    let visible = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const step = () => {
      if (!deleting) {
        visible += 1;
      } else {
        visible -= 1;
      }

      setVisibleCharacters(visible);

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

    setVisibleCharacters(0);
    timeout = setTimeout(step, delay * 1000);
    return () => clearTimeout(timeout);
  }, [delay, eraseStagger, pause, stagger, text]);

  const visibleText = characters.slice(0, visibleCharacters).join('');
  const [firstLine = '', ...remainingLines] = visibleText.split('\n');
  const secondLine = remainingLines.join('\n');
  const separator = secondLine.indexOf(' ');
  const secondLineName = separator < 0 ? secondLine : secondLine.slice(0, separator);
  const secondLineAccent = separator < 0 ? '' : secondLine.slice(separator);
  const fullSecondLine = text.split('\n').slice(1).join(' ');
  const accessibleText = text.replace(/\n/g, ' ');

  return (
    <Tag className={cn('inline-block', className)} aria-label={accessibleText}>
      <span className="sr-only">{accessibleText}</span>
      <span aria-hidden className="inline-block text-left">
        {firstLine}
        {visibleText.includes('\n') ? (
          <>
            <br />
            <span className="whitespace-nowrap">
              {secondLineName}
              {separator >= 0 && (
                <span className="text-white">{secondLineAccent}</span>
              )}
              <span className="ml-1 inline-block h-[0.8em] w-[0.07em] translate-y-[0.08em] rounded-sm bg-accent-300 animate-pulse" />
            </span>
          </>
        ) : (
          <>
            <span className="ml-1 inline-block h-[0.8em] w-[0.07em] translate-y-[0.08em] rounded-sm bg-accent-300 animate-pulse" />
            <br />
            <span className="invisible whitespace-nowrap">{fullSecondLine}</span>
          </>
        )}
      </span>
    </Tag>
  );
}
