import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/animations/PageTransition';
import { ExperienceContent } from '@/components/sections/ExperienceContent';

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'Professional career path — from frontend development roots to full-stack leadership.',
};

export default function ExperiencePage() {
  return (
    <>
      <Navbar />
      <PageTransition>
        <div className="section-padding pt-24">
          <div className="section-shell">
            <ExperienceContent />
          </div>
        </div>
      </PageTransition>
      <Footer />
    </>
  );
}
