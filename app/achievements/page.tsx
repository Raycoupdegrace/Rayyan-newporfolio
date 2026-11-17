import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/animations/PageTransition';
import { AchievementsContent } from '@/components/sections/AchievementsContent';

export const metadata: Metadata = {
  title: 'Achievements',
  description:
    'Certifications, statistics and the principles that drive craft forward.',
};

export default function AchievementsPage() {
  return (
    <>
      <Navbar />
      <PageTransition>
        <div className="section-padding pt-24">
          <div className="section-shell">
            <AchievementsContent />
          </div>
        </div>
      </PageTransition>
      <Footer />
    </>
  );
}
