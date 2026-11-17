export interface Project {
  slug: string;
  image: string;
  title: string;
  description: { id: string; en: string };
  techStack: string[];
  year: number;
  category: string;
  links: {
    liveDemo?: string;
    github?: string;
  };
}

export const projects: Project[] = [
  {
    slug: 'ecommerce-toko-buku-lsp',
    image: '/images/projects/ecommerce-toko-buku.jpg',
    title: 'E-Commerce Toko Buku (LSP)',
    description: {
      id: 'Proyek tugas akhir sertifikasi LSP: website toko buku online dengan fitur keranjang, checkout, dan manajemen produk menggunakan PHP & MySQL.',
      en: 'LSP certification final project: online bookstore website with cart, checkout, and product management features using PHP & MySQL.',
    },
    techStack: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    year: 2025,
    category: 'E-Commerce',
    links: {
      liveDemo: 'https://github.com/muhammadrayyan/ecommerce-toko-buku',
      github: 'https://github.com/muhammadrayyan/ecommerce-toko-buku',
    },
  },
  {
    slug: 'multiprima-indosejahtera-wordpress',
    image: '/images/projects/multiprima-wordpress.jpg',
    title: 'Multiprima Indosejahtera (WordPress/Magang)',
    description: {
      id: 'Proyek magang: membangun dan mengelola website perusahaan Multiprima Indosejahtera menggunakan WordPress dengan tema kustom dan plugin.',
      en: 'Internship project: building and managing Multiprima Indosejahtera company website using WordPress with custom theme and plugins.',
    },
    techStack: ['WordPress', 'Elementor', 'CSS', 'PHP'],
    year: 2024,
    category: 'WordPress',
    links: {
      liveDemo: 'https://multiprimaindosejahtera.com',
      github: 'https://github.com/muhammadrayyan/multiprima-wordpress',
    },
  },
  {
    slug: 'kuis-edukasi-interaktif-pkk',
    image: '/images/projects/kuis-edukasi-pkk.jpg',
    title: 'Kuis Edukasi Interaktif PKK',
    description: {
      id: 'Proyek mata pelajaran PKK: kuis edukasi interaktif berbasis web dengan sistem penilaian otomatis dan tampilan responsif.',
      en: 'PKK subject project: interactive web-based educational quiz with automatic scoring system and responsive design.',
    },
    techStack: ['HTML', 'CSS', 'JavaScript', 'LocalStorage'],
    year: 2024,
    category: 'Application',
    links: {
      liveDemo: 'https://github.com/muhammadrayyan/kuis-edukasi-pkk',
      github: 'https://github.com/muhammadrayyan/kuis-edukasi-pkk',
    },
  },
] as const;

export const projectCategories = [
  'All',
  ...Array.from(new Set(projects.map((p) => p.category))),
] as const;

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
