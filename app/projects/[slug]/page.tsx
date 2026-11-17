import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/animations/PageTransition';
import { ProjectDetail } from '@/components/sections/ProjectDetail';
import { projects, getProject } from '@/lib/projects';

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description.id,
  };
}

export default async function ProjectSlugPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <Navbar />
      <PageTransition>
        <div className="section-padding pt-24">
          <div className="section-shell">
            <ProjectDetail project={project} />
          </div>
        </div>
      </PageTransition>
      <Footer />
    </>
  );
}
