export interface Project {
  slug: string;
  image: string;
  imageFit?: 'contain' | 'cover';
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
    slug: 'raybookstore',
    image: '/images/projects/book-store-rayyan-storefront.jpg',
    title: 'RayBookstore — Toko Buku Online',
    description: {
      id: 'Aplikasi toko buku yang saya kembangkan dengan Laravel. Fitur mencakup katalog dan pencarian buku, keranjang, checkout, serta panel administrasi.',
      en: 'A Laravel bookstore application I built, with a book catalog and search, cart, checkout, and an admin dashboard.',
    },
    techStack: ['Laravel', 'PHP', 'MySQL', 'Blade', 'Tailwind CSS'],
    year: 2026,
    category: 'E-Commerce',
    links: {
      github: 'https://github.com/Raycoupdegrace/book-store-rayyan',
    },
  },
  {
    slug: 'multiprima-indosejahtera',
    image: '/images/projects/multiprima-site.jpg',
    title: 'Multiprima Indosejahtera',
    description: {
      id: 'Pengembangan dan pengelolaan website perusahaan Multiprima Indosejahtera selama magang. Situs yang aktif saat ini dibuat dengan Wix.',
      en: 'Developed and maintained the Multiprima Indosejahtera company website during my internship. The currently live site is built with Wix.',
    },
    techStack: ['Wix'],
    year: 2024,
    category: 'Wix',
    links: {
      liveDemo: 'https://www.multiprima.co.id/beranda',
    },
  },
  {
    slug: 'millenia-group',
    image: '/images/projects/millenia-group-site.jpg',
    title: 'Millenia Group',
    description: {
      id: 'Website profil perusahaan dan layanan Millenia Group yang saya kembangkan dengan WordPress dan Elementor.',
      en: 'A company profile and services website for Millenia Group that I developed with WordPress and Elementor.',
    },
    techStack: ['WordPress', 'Elementor'],
    year: 2026,
    category: 'WordPress',
    links: {
      liveDemo: 'https://milleniagroup.id/',
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
  {
    slug: 'joki-rank-diamond',
    image: '/images/projects/joki-rank-diamond.png',
    imageFit: 'contain',
    title: 'Joki Rank & Diamond — Joki Rayyan Point Store',
    description: {
      id: 'Landing page promosi layanan joki rank dan top-up diamond Mobile Legends, dengan informasi layanan, skin terbaru, dan ajakan pemesanan.',
      en: 'A promotional landing page for Mobile Legends rank-boosting and diamond top-ups, featuring service details, featured skins, and calls to order.',
    },
    techStack: [],
    year: 2026,
    category: 'Application',
    links: {},
  },
  {
    slug: 'ray-killing-chess',
    image: '/images/projects/ray-killing-chess.png',
    imageFit: 'contain',
    title: 'Ray Killing Chess',
    description: {
      id: 'Game catur berbasis web dengan papan interaktif, tombol permainan baru, fitur balik papan, dan opsi lawan AI.',
      en: 'A web-based chess game with an interactive board, new-game control, board-flip option, and an AI opponent toggle.',
    },
    techStack: [],
    year: 2026,
    category: 'Application',
    links: {},
  },
] as const;

export const projectCategories = [
  'All',
  ...Array.from(new Set(projects.map((p) => p.category))),
] as const;

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
