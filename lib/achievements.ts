export interface Certification {
  name: string;
  issuer: string;
  year: string;
  image: string;
  accent?: boolean;
  description: { id: string; en: string };
}

export const certifications: Certification[] = [
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
  {
    name: 'The Complete Web Development Bootcamp',
    issuer: 'Udemy',
    year: '2025',
    image: '/images/certs/dicoding-fe.jpg',
    description: {
      id: 'Kursus web development lengkap dari dasar hingga full stack: HTML, CSS, JavaScript, Node.js, dan database. Diambil selama masa PKL.',
      en: 'Complete web development course from fundamentals to full stack: HTML, CSS, JavaScript, Node.js and databases. Taken during the internship.',
    },
  },
  {
    name: 'Modern React with Redux',
    issuer: 'Udemy',
    year: '2025',
    image: '/images/certs/dicoding-fe.jpg',
    description: {
      id: 'Kursus React modern: hooks, state management, dan pola komponen. Diambil selama masa PKL untuk memperkuat kemampuan frontend.',
      en: 'Modern React course: hooks, state management and component patterns. Taken during the internship to strengthen frontend skills.',
    },
  },
  {
    name: 'Next.js & React — The Complete Guide',
    issuer: 'Udemy',
    year: '2025',
    image: '/images/certs/dicoding-wp.jpg',
    description: {
      id: 'Kursus Next.js & React: routing, rendering, API routes, dan deployment produksi. Diambil selama masa PKL.',
      en: 'Next.js & React course: routing, rendering, API routes and production deployment. Taken during the internship.',
    },
  },
  {
    name: 'WordPress Development Masterclass',
    issuer: 'Udemy',
    year: '2025',
    image: '/images/certs/dicoding-wp.jpg',
    description: {
      id: 'Kursus pengembangan WordPress: tema kustom, plugin, dan optimasi performa situs. Diambil selama masa PKL.',
      en: 'WordPress development course: custom themes, plugins and site performance optimisation. Taken during the internship.',
    },
  },
  {
    name: 'Web Performance Optimization',
    issuer: 'Udemy',
    year: '2025',
    image: '/images/certs/lsp-jwd.jpg',
    description: {
      id: 'Kursus optimasi performa web: Core Web Vitals, LCP, caching, dan teknik mempercepat situs. Relevan langsung dengan pekerjaan maintenance.',
      en: 'Web performance optimisation course: Core Web Vitals, LCP, caching and site-speed techniques. Directly relevant to maintenance work.',
    },
  },
  {
    name: 'WordPress Site Development',
    issuer: 'Dicoding Indonesia',
    year: '2024',
    image: '/images/certs/dicoding-wp.jpg',
    description: {
      id: 'Pelatihan pengembangan website WordPress: kustomisasi tema, plugin, dan optimasi performa.',
      en: 'WordPress website development training: theme customization, plugins, and performance optimization.',
    },
  },
  {
    name: 'Front-End Web Development',
    issuer: 'Dicoding Indonesia',
    year: '2024',
    image: '/images/certs/dicoding-fe.jpg',
    description: {
      id: 'Pelatihan front-end dengan HTML, CSS, JavaScript, dan responsive design. Mencakup aksesibilitas web dan best practices.',
      en: 'Front-end training with HTML, CSS, JavaScript, and responsive design. Covers web accessibility and best practices.',
    },
  },
];

export const stats = [
  { labelKey: 'experience', value: 1, suffix: { id: '+ Tahun', en: '+ Year' } },
  { labelKey: 'projects', value: 5, suffix: { id: '+', en: '+' } },
  { labelKey: 'certifications', value: 8, suffix: { id: '', en: '' } },
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
