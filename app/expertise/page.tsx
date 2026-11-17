import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/animations/PageTransition';
import { ExpertiseContent } from '@/components/sections/ExpertiseContent';

export const metadata: Metadata = {
  title: 'Expertise',
  description:
    'Full breadth of technical capability — from Laravel APIs and Next.js frontends to WordPress architecture.',
};

export default function ExpertisePage() {
  return (
    <>
      <Navbar />
      <PageTransition>
        <div className="section-padding pt-24">
          <div className="section-shell">
            <ExpertiseContent />
          </div>
        </div>
      </PageTransition>
      <Footer />
    </>
  );
}
