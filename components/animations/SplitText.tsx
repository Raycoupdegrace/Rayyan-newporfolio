'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type SplitTextProps = {
  text: string;
  className?: string;
  /** Seconds between typed characters. */
  stagger?: number;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
};

/**
 * SplitText — type-once reveal.
 *
 * PERF: an earlier version looped (type → erase → retype forever), which meant
 * a `setState` every ~60 ms for the entire session. Because this sits in the
 * hero, that re-rendered the whole hero subtree on a timer and kept the main
 * thread busy. It now types once and stops; the full text stays put.
 *
 * Also short-circuits to the final string for `prefers-reduced-motion`.
 */
export function SplitText({
  text,
  className,
  stagger = 0.06,
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
    let timeout: ReturnType<typeof setTimeout>;

    const step = () => {
      visible += 1;
      setVisibleCharacters(visible);
      if (visible < characterCount) {
        timeout = setTimeout(step, stagger * 1000);
      }
    };

    setVisibleCharacters(0);
    timeout = setTimeout(step, delay * 1000);
    return () => clearTimeout(timeout);
  }, [delay, stagger, text]);

  const visibleText = characters.slice(0, visibleCharacters).join('');
  const [firstLine = '', ...remainingLines] = visibleText.split('\n');
  const secondLine = remainingLines.join('\n');
  const separator = secondLine.indexOf(' ');
  const secondLineName = separator < 0 ? secondLine : secondLine.slice(0, separator);
  const secondLineAccent = separator < 0 ? '' : secondLine.slice(separator);
  const fullSecondLine = text.split('\n').slice(1).join(' ');
  const accessibleText = text.replace(/\n/g, ' ');
  const isTyping = visibleCharacters < characters.length;

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
                <span className="text-ink-400">{secondLineAccent}</span>
              )}
              {isTyping && (
                <span className="ml-1 inline-block h-[0.8em] w-[0.07em] translate-y-[0.08em] rounded-sm bg-accent-300 animate-pulse" />
              )}
            </span>
          </>
        ) : (
          <>
            {isTyping && (
              <span className="ml-1 inline-block h-[0.8em] w-[0.07em] translate-y-[0.08em] rounded-sm bg-accent-300 animate-pulse" />
            )}
            <br />
            <span className="invisible whitespace-nowrap">{fullSecondLine}</span>
          </>
        )}
      </span>
    </Tag>
  );
}
