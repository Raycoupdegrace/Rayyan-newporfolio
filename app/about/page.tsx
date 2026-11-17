import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/animations/PageTransition';
import { AboutContent } from '@/components/sections/AboutContent';

export const metadata: Metadata = {
  title: 'About',
  description:
    'The philosophy, mindset and craft behind every line of code — Muhammad Rayyan Yuwono.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <PageTransition>
        <div className="section-padding pt-24">
          <div className="section-shell">
            <AboutContent />
          </div>
        </div>
      </PageTransition>
      <Footer />
    </>
  );
}
