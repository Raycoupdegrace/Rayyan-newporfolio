'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  /**
   * Optional custom variants. When Reveal is used inside a RevealGroup the
   * shared `revealItem` variants must be passed so the parent can stagger
   * children; otherwise the internal default is used.
   */
  variants?: Variants;
};

/**
 * Scroll-triggered reveal. Defaults to `once` so content never re-animates on
 * scroll-back (a common source of jank on long pages).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  once = true,
  variants,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const defaultVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : y,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.35,
        ease: [0.22, 1, 0.36, 1],
        delay: shouldReduceMotion ? 0 : delay,
      },
    },
  };

  return (
    <motion.div
      className={cn(className)}
      variants={variants ?? defaultVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-12% 0px -12% 0px' }}
    >
      {children}
    </motion.div>
  );
}

/** Staggered container for lists of Reveal-able children. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};
