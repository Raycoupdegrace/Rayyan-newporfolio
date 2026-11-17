/** Bilingual string. */
export type Bi = { id: string; en: string };

export type Education = {
  school: Bi;
  program: Bi;
  period: Bi;
  location: Bi;
  summary: Bi;
  highlights: { id: string[]; en: string[] };
};

export const education: Education[] = [
  {
    school: { id: 'SMK — Jurusan SIJA', en: 'Vocational High School — SIJA' },
    program: {
      id: 'Sistem Informasi Jaringan dan Aplikasi',
      en: 'Network & Application Information Systems',
    },
    period: { id: '2023 — 2026', en: '2023 — 2026' },
    location: { id: 'Indonesia', en: 'Indonesia' },
    summary: {
      id: 'Menempuh pendidikan kejuruan dengan fokus rekayasa perangkat lunak, jaringan, dan pengembangan aplikasi web — dasar teknis sekaligus tempat pertama saya mengerjakan proyek nyata untuk klien dan industri.',
      en: 'Vocational education focused on software engineering, networking and web application development — my technical foundation and the first place I shipped real projects for clients and industry.',
    },
    highlights: {
      id: [
        'Praktik langsung pengembangan web: HTML, CSS, JavaScript, PHP, dan MySQL.',
        'Lulus sertifikasi kompetensi Junior Web Developer (LSP) pada 2025.',
        'Menjalani Praktik Kerja Lapangan (PKL) di industri branding & teknologi.',
      ],
      en: [
        'Hands-on web development practice: HTML, CSS, JavaScript, PHP and MySQL.',
        'Passed the Junior Web Developer competency certification (LSP) in 2025.',
        'Completed an industrial internship (PKL) in the branding & technology sector.',
      ],
    },
  },
];
