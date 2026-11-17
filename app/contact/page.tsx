import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/animations/PageTransition';
import { ContactContent } from '@/components/sections/ContactContent';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Start a conversation — freelance, contract or collaboration inquiries welcome.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <PageTransition>
        <div className="section-padding pt-24">
          <div className="section-shell">
            <ContactContent />
          </div>
        </div>
      </PageTransition>
      <Footer />
    </>
  );
}
