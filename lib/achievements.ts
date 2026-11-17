export interface Certification {
  name: string;
  issuer: string;
  year: string;
  image: string;
  imageFit?: 'contain' | 'cover';
  accent?: boolean;
  description: { id: string; en: string };
}

export const certifications: Certification[] = [
  {
    name: 'Mastering Elementor: Dari Dasar Hingga Mahir',
    issuer: 'Udemy — Pemoola Group',
    year: '2026',
    image: '/images/certs/udemy-mastering-elementor.png',
    imageFit: 'contain',
    description: {
      id: 'Kursus Elementor dari dasar hingga mahir, dengan 25 jam materi. Diselesaikan pada 3 Juli 2026.',
      en: 'An Elementor course from fundamentals to advanced skills, with 25 hours of content. Completed July 3, 2026.',
    },
  },
  {
    name: 'The Complete Soft Skills Course for Techies and Coders',
    issuer: 'Udemy — Libby Seery',
    year: '2025',
    image: '/images/certs/udemy-soft-skills-techies.png',
    imageFit: 'contain',
    description: {
      id: 'Kursus soft skills untuk profesional teknologi, dengan 8 jam materi. Diselesaikan pada 14 November 2025.',
      en: 'A soft skills course for technology professionals, with 8 hours of content. Completed November 14, 2025.',
    },
  },
  {
    name: 'Web Design for WordPress Users',
    issuer: 'Udemy — Andrew Williams',
    year: '2026',
    image: '/images/certs/udemy-wordpress-web-design.png',
    imageFit: 'contain',
    description: {
      id: 'Kursus desain web untuk pengguna WordPress, mencakup 10 jam materi. Diselesaikan pada 2 Oktober 2026.',
      en: 'A web design course for WordPress users, with 10 hours of content. Completed October 2, 2026.',
    },
  },
  {
    name: 'Sertifikasi Junior Web Developer',
    issuer: 'LSP (Lembaga Sertifikasi Profesi)',
    year: '2025',
    image: '/images/certs/lsp-jwd.jpg',
    accent: true,
    description: {
      id: 'Sertifikasi kompetensi pengembangan website modern dengan HTML, CSS, JavaScript, dan PHP. Mencakup pembuatan website responsif dan manajemen database.',
      en: 'Competency certification for modern web development with HTML, CSS, JavaScript, and PHP. Covers responsive websites and database management.',
    },
  },
];

export const stats = [
  { labelKey: 'experience', value: 1, suffix: { id: '+ Tahun', en: '+ Year' } },
  { labelKey: 'projects', value: 5, suffix: { id: '+', en: '+' } },
  { labelKey: 'certifications', value: 4, suffix: { id: '', en: '' } },
  { labelKey: 'lighthouse', value: 96, suffix: { id: '', en: '' } },
] as const;

export const principles = [
  {
    title: {
      id: 'Pemecahan masalah dengan algoritma',
      en: 'Problem-solving by algorithm',
    },
    body: {
      id: 'Berpikir terstruktur dan algoritmik diterapkan pada eksekusi: uraikan, prioritaskan, dan validasi sebelum merilis. 800+ soal yang diselesaikan menjaga intuisi tetap terkalibrasi.',
      en: 'Structured, algorithmic thinking applied to delivery: decompose, prioritise, and validate before shipping. 800+ solved problems keeps intuition calibrated.',
    },
  },
  {
    title: {
      id: 'Performa adalah fitur',
      en: 'Performance is a feature',
    },
    body: {
      id: 'Cepat itu dirancang, bukan ditempel belakangan. Setiap proyek dirilis dengan anggaran performa dan baseline Core Web Vitals.',
      en: 'Fast is designed, not bolted on. Every project ships with a performance budget and a Core Web Vitals baseline.',
    },
  },
  {
    title: {
      id: 'Sistem yang bertahan melewati peluncuran',
      en: 'Systems that outlive launch',
    },
    body: {
      id: 'Arsitektur dipilih dengan mempertimbangkan biaya pemeliharaan — skema relasional, kontrak bertipe, dan dokumentasi yang akan disyukuri dirimu di masa depan.',
      en: 'Architecture chosen for maintenance cost — relational schemas, typed contracts, and documentation your future self will thank you for.',
    },
  },
];
