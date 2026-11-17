'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

/**
 * PageTransition — fade-through on route change.
 * `AnimatePresence` lives in the layout via `key={pathname}`; this component is
 * the animated shell each page renders inside.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.main
      id="main"
      key={pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}
