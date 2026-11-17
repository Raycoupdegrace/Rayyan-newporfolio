import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/animations/PageTransition';
import { ProjectsContent } from '@/components/sections/ProjectsContent';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Selected projects spanning e-commerce platforms, corporate websites and interactive applications.',
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <PageTransition>
        <div className="section-padding pt-24">
          <div className="section-shell">
            <ProjectsContent />
          </div>
        </div>
      </PageTransition>
      <Footer />
    </>
  );
}
