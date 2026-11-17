/** Bilingual string. */
export type Bi = { id: string; en: string };

export type Experience = {
  company: string;
  logo?: string;
  role: Bi;
  period: Bi;
  location: Bi;
  current: boolean;
  summary: Bi;
  highlights: { id: string[]; en: string[] };
};

export const experiences: Experience[] = [
  {
    company: 'Melon Branding Agency',
    logo: '/images/companies/melon-branding.png',
    role: { id: 'Intern IT Developer', en: 'Intern IT Developer' },
    period: { id: '19 Jan 2025 — 19 Nov 2026', en: 'Jan 19, 2025 — Nov 19, 2026' },
    location: { id: 'Indonesia', en: 'Indonesia' },
    current: true,
    summary: {
      id: 'Menjalani magang industri sebagai IT Developer di agensi branding: membangun dan memelihara website klien, mengerjakan perbaikan performa (PageSpeed, LCP), serta menangani kebutuhan teknis harian mulai dari WordPress hingga deployment.',
      en: 'Serving an industrial internship as an IT Developer at a branding agency: building and maintaining client websites, working on performance improvements (PageSpeed, LCP), and handling day-to-day technical needs from WordPress to deployment.',
    },
    highlights: {
      id: [
        'Membangun & memelihara website klien berbasis WordPress sesuai brand guideline agensi.',
        'Memperbaiki performa website: optimasi PageSpeed, LCP, dan Core Web Vitals.',
        'Menangani deployment, pemeliharaan rutin, dan perbaikan bug lintas proyek.',
      ],
      en: [
        'Built & maintained WordPress-based client websites following the agency brand guidelines.',
        'Improved website performance: PageSpeed, LCP and Core Web Vitals optimisation.',
        'Handled deployment, routine maintenance and bug fixes across projects.',
      ],
    },
  },
  {
    company: 'Independent Practice',
    logo: undefined,
    role: {
      id: 'Web Developer & Website Maintenance',
      en: 'Web Developer & Website Maintenance',
    },
    period: { id: '2024 — 2025', en: '2024 — 2025' },
    location: { id: 'Remote / Global', en: 'Remote / Global' },
    current: false,
    summary: {
      id: 'Mengerjakan proyek web dan jasa pemeliharaan website: audit performa, perbaikan LCP, optimasi gambar & aset, serta perawatan rutin agar situs tetap cepat dan stabil.',
      en: 'Worked on web projects and website maintenance services: performance audits, LCP fixes, image & asset optimisation, and routine upkeep to keep sites fast and stable.',
    },
    highlights: {
      id: [
        'Audit & optimasi performa: perbaikan LCP, mengurangi layout shift, dan skor PageSpeed.',
        'Optimasi aset: kompresi gambar, lazy-loading, dan strategi caching.',
        'Pemeliharaan rutin: pembaruan, perbaikan bug, dan monitoring uptime.',
      ],
      en: [
        'Performance audit & optimisation: LCP fixes, reduced layout shift, and PageSpeed scores.',
        'Asset optimisation: image compression, lazy-loading and caching strategy.',
        'Routine maintenance: updates, bug fixes and uptime monitoring.',
      ],
    },
  },
  {
    company: 'SMK — SIJA',
    logo: undefined,
    role: {
      id: 'Pelajar — Sistem Informasi Jaringan & Aplikasi',
      en: 'Student — Network & Application Information Systems',
    },
    period: { id: '2023 — 2026', en: '2023 — 2026' },
    location: { id: 'Indonesia', en: 'Indonesia' },
    current: false,
    summary: {
      id: 'Menempuh pendidikan kejuruan SIJA: mempelajari dasar pemrograman, jaringan, dan pengembangan aplikasi web melalui proyek nyata, tugas sekolah, dan sertifikasi LSP.',
      en: 'Vocational education in SIJA: learning programming fundamentals, networking and web application development through real projects, school assignments and LSP certification.',
    },
    highlights: {
      id: [
        'Mengerjakan proyek web nyata sebagai bagian dari tugas & praktik sekolah.',
        'Lulus sertifikasi kompetensi Junior Web Developer (LSP) 2025.',
        'Menjalani PKL di industri branding & teknologi.',
      ],
      en: [
        'Shipped real web projects as part of school assignments & practice.',
        'Passed the Junior Web Developer competency certification (LSP) 2025.',
        'Completed an industrial internship (PKL) in branding & technology.',
      ],
    },
  },
];
