/**
 * Bilingual support (Indonesian & English)
 * Usage: const { t, lang } = useLanguage()
 */

export type Language = 'id' | 'en';

export type TranslationShape = {
  nav: { home: string; about: string; expertise: string; experience: string; projects: string; achievements: string; contact: string };
  hero: { availability: string; role: string; exploreWork: string; startProject: string };
  stats: { experience: string; projects: string; certifications: string; lighthouse: string };
  projects: { eyebrow: string; title: string; description: string };
  achievements: { eyebrow: string; title: string; description: string; certificationsTitle: string; certificationsHint: string; openToOpportunities: string; opportunitiesDesc: string; availability: string };
  about: { eyebrow: string; title: string; description: string; p1: string; p2: string; p3: string; focusAreas: string; basedIn: string; availability: string; educationTitle: string; educationHint: string };
  expertise: { eyebrow: string; title: string; description: string; coreStack: string; stackHint: string };
  experience: { eyebrow: string; title: string; description: string };
  contact: { eyebrow: string; title: string; description: string; whatToInclude: string; include1: string; include2: string; include3: string; name: string; namePlaceholder: string; email: string; emailPlaceholder: string; message: string; messagePlaceholder: string; send: string; sending: string; success: string; emailReady: string; error: string };
  projectDetail: { back: string; heroMedia: string; p1: string; p2: string; techUsed: string; category: string; year: string; link: string };
  categories: { all: string; ecommerce: string; wordpress: string; application: string; wix: string };
  siteRole: string;
  footer: { description: string; navigate: string; elsewhere: string; rights: string; backToTop: string };
};

export const translations: Record<Language, TranslationShape> = {
  id: {
    nav: { home: 'Beranda', about: 'Tentang', expertise: 'Keahlian', experience: 'Pengalaman', projects: 'Proyek', achievements: 'Pencapaian', contact: 'Kontak' },
    hero: {
      availability: 'Terbuka untuk peluang freelance & magang — Q3 2026',
      role: 'Junior Web Developer lulusan SIJA (Sistem Informasi Jaringan dan Aplikasi). Membangun website modern dengan React/Next.js dan WordPress.',
      exploreWork: 'Lihat Karya',
      startProject: 'Mulai Proyek',
    },
    stats: { experience: 'Pengalaman', projects: 'Proyek', certifications: 'Sertifikasi', lighthouse: 'Lighthouse' },
    projects: {
      eyebrow: 'Proyek',
      title: 'Karya terpilih dari sekolah & magang.',
      description: 'Proyek nyata dari tugas sekolah, proyek mandiri, dan pengalaman magang. Setiap proyek mencantumkan teknologi yang digunakan.',
    },
    achievements: {
      eyebrow: 'Pencapaian',
      title: 'Bukti kompetensi melalui sertifikasi.',
      description: 'Sertifikasi, pelatihan, dan pencapaian selama masa sekolah di jurusan SIJA (Sistem Informasi Jaringan dan Aplikasi).',
      certificationsTitle: 'Sertifikasi & Kredensial',
      certificationsHint: 'Geser dengan mouse atau sentuh untuk melihat semuanya',
      openToOpportunities: 'Terbuka untuk peluang junior',
      opportunitiesDesc: 'Freelance, magang, kontrak, dan proyek kolaborasi.',
      availability: 'Q3 2026 ke depan',
    },
    about: {
      eyebrow: 'Tentang',
      title: 'Kode yang bersih adalah kebaikan untuk dirimu di masa depan.',
      description: 'Seorang developer junior tidak diukur dari seberapa banyak yang dirilis, tapi dari seberapa lama hasil kerjanya tetap bernilai. Keyakinan itu terlihat di setiap keputusan di bawah ini.',
      p1: 'Saya {name} — junior full stack developer yang menganggap celah antara desain dan infrastruktur sebagai pekerjaan intinya. UI yang indah itu perlu, tetapi tidak cukup; hasil kerja hanya bertahan bila database di baliknya dirancang dengan niat, dan kontrak API dirancang sebelum komponen pertama ditulis.',
      p2: 'Perjalanan saya melewati arsitektur WordPress modern (Elementor Pro, Flexbox Containers, data dinamis), sistem Laravel & PHP produksi dengan skema relasional dan RESTful API, serta frontend React.js / Next.js dengan lapisan animasi lanjutan. Saya pernah memegang infrastruktur hosting, pipeline deployment, dan anggaran Core Web Vitals — pekerjaan tak menarik yang menentukan apakah sebuah situs terasa premium atau sekadar ada.',
      p3: 'Saya peduli pada bagian yang membosankan karena itulah yang menumpuk jadi hasil: kontrak bertipe, keputusan yang terdokumentasi, dan sistem layout yang tidak bergeser satu piksel pun antar breakpoint. Saat bagian membosankan sudah benar, bagian yang menarik menjadi mungkin.',
      focusAreas: 'Fokus Utama',
      basedIn: 'Berlokasi di',
      availability: 'Ketersediaan',
      educationTitle: 'Pendidikan',
      educationHint: 'Dasar teknis dan tempat pertama saya mengerjakan proyek nyata.',
    },
    expertise: {
      eyebrow: 'Keahlian',
      title: 'Kemampuan full-stack, dihadirkan sebagai satu sistem.',
      description: 'Ringkasan bento dari stack — setiap kotak adalah pilar yang saya kuasai end-to-end, bukan sekadar istilah yang pernah saya dengar.',
      coreStack: 'Stack utama',
      stackHint: 'Geser dengan mouse atau sentuh untuk menjelajah',
    },
    experience: {
      eyebrow: 'Pengalaman',
      title: 'Karier yang dibangun dari keputusan yang terus menumpuk.',
      description: 'Dari dasar frontend hingga kepemimpinan full-stack — setiap peran memperluas cakupan yang bisa saya tangani end-to-end.',
    },
    contact: {
      eyebrow: 'Kontak',
      title: 'Mari bangun sesuatu yang tak terelakkan.',
      description: 'Ceritakan proyeknya, tenggat waktunya, dan batasannya. Saya balas dalam 48 jam.',
      whatToInclude: 'Yang perlu disertakan',
      include1: 'Gambaran proyek dan tujuannya',
      include2: 'Stack yang diinginkan atau platform yang sudah ada',
      include3: 'Kisaran anggaran dan tanggal mulai',
      name: 'Nama',
      namePlaceholder: 'Nama Anda',
      email: 'Email',
      emailPlaceholder: 'anda@perusahaan.com',
      message: 'Pesan',
      messagePlaceholder: 'Ceritakan tentang proyek Anda...',
      send: 'Kirim pesan',
      sending: 'Mengirim...',
      success: 'Pesan terkirim. Saya akan membalas dalam 48 jam.',
      emailReady: 'Aplikasi email terbuka dengan draf pesan. Tekan Kirim di aplikasi email untuk menyelesaikan.',
      error: 'Gagal mengirim. Silakan coba lagi.',
    },
    projectDetail: {
      back: 'Kembali ke proyek',
      heroMedia: 'Media utama proyek',
      p1: 'Proyek ini adalah {category} yang saya kerjakan selama masa belajar/magang. Teknologi yang digunakan mencakup keseluruhan stack yang relevan dengan fokus pada pembelajaran dan praktik langsung.',
      p2: 'Desain antarmuka dibuat responsif dengan prinsip mobile-first, serta memperhatikan performa dan aksesibilitas web. Backend/data layer dikembangkan dengan struktur yang modular dan mudah dikelola.',
      techUsed: 'Teknologi yang digunakan',
      category: 'Kategori',
      year: 'Tahun',
      link: 'Tautan',
    },
    categories: { all: 'Semua', ecommerce: 'E-Commerce', wordpress: 'WordPress', application: 'Aplikasi', wix: 'Wix' },
    siteRole: 'Junior Full Stack Developer & Arsitek WordPress',
    footer: {
      description: 'Membangun web yang cepat, accessible, dan mudah dikelola dari arsitektur hingga interaksi.',
      navigate: 'Navigasi',
      elsewhere: 'Media Sosial',
      rights: 'Hak cipta dilindungi.',
      backToTop: 'Kembali ke atas',
    },
  },
  en: {
    nav: { home: 'Home', about: 'About', expertise: 'Expertise', experience: 'Experience', projects: 'Projects', achievements: 'Achievements', contact: 'Contact' },
    hero: {
      availability: 'Open to junior freelance & internship opportunities — Q3 2026 onwards',
      role: 'Junior Web Developer graduated from SIJA (Network & Application Information Systems). Building modern websites with React/Next.js and WordPress.',
      exploreWork: 'Explore the work',
      startProject: 'Start a project',
    },
    stats: { experience: 'Experience', projects: 'Projects', certifications: 'Certifications', lighthouse: 'Lighthouse' },
    projects: {
      eyebrow: 'Projects',
      title: 'Selected work from school & internship.',
      description: 'Real work from school assignments, independent projects, and internship experience. Each project lists the technologies used.',
    },
    achievements: {
      eyebrow: 'Achievements',
      title: 'Proof of competence through certification.',
      description: 'Certifications, training, and achievements during vocational school in SIJA (Network & Application Information Systems) major.',
      certificationsTitle: 'Certifications & Credentials',
      certificationsHint: 'Drag with your mouse or swipe to see them all',
      openToOpportunities: 'Open to junior opportunities',
      opportunitiesDesc: 'Freelance, internship, contract, and collaboration projects.',
      availability: 'Q3 2026 onwards',
    },
    about: {
      eyebrow: 'About',
      title: 'Clean code is a kindness to your future self.',
      description: "A junior developer isn't measured by how much they ship, but by how long what they ship stays valuable. That belief runs through every decision below.",
      p1: "I'm {name} — a junior full stack developer who treats the gap between design and infrastructure as the actual job. Beautiful UI is necessary but not sufficient; the work lives or dies on whether the database underneath it was modelled with intent, and whether the API contract was designed before the first component was written.",
      p2: "My path runs through modern WordPress architecture (Elementor Pro, Flexbox Containers, dynamic data), production Laravel & PHP systems with relational schemas and RESTful APIs, and React.js / Next.js frontends with advanced animation layers. I've owned hosting infrastructure, deployment pipelines, and Core Web Vitals budgets — the unglamorous work that decides whether a site feels premium or merely present.",
      p3: "I care about the boring parts because they compound: typed contracts, documented decisions, a layout system that doesn't shift by a pixel between breakpoints. When the boring parts are right, the interesting parts become possible.",
      focusAreas: 'Focus areas',
      basedIn: 'Based in',
      availability: 'Availability',
      educationTitle: 'Education',
      educationHint: 'The technical foundation and the first place I shipped real projects.',
    },
    expertise: {
      eyebrow: 'Expertise',
      title: 'Full-stack capability, delivered as one system.',
      description: "A bento overview of the stack — each tile a pillar I own end-to-end, not a buzzword I've heard of.",
      coreStack: 'Core stack',
      stackHint: 'Drag with your mouse or swipe to explore',
    },
    experience: {
      eyebrow: 'Experience',
      title: 'A career of compounding decisions.',
      description: 'From frontend roots to full-stack leadership — each role expanded the surface area I could own end-to-end.',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Let\u2019s build something inevitable.',
      description: 'Tell me about the project, the timeline, and the constraints. I\u2019ll reply within 48 hours.',
      whatToInclude: 'What to include',
      include1: 'Project overview and goals',
      include2: 'Desired stack or existing platform',
      include3: 'Budget range and start date',
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'you@company.com',
      message: 'Message',
      messagePlaceholder: 'Tell me about your project...',
      send: 'Send message',
      sending: 'Sending...',
      success: 'Message sent. I will get back to you within 48 hours.',
      emailReady: 'Your email app opened with a draft. Send it from your email app to complete.',
      error: 'Failed to send. Please try again.',
    },
    projectDetail: {
      back: 'Back to projects',
      heroMedia: 'Project hero media',
      p1: 'This project is a {category} I worked on during my studies/internship. The technologies used cover the entire relevant stack, with a focus on learning and hands-on practice.',
      p2: 'The interface design is responsive with a mobile-first approach, while paying attention to performance and web accessibility. The backend/data layer is built with a modular and maintainable structure.',
      techUsed: 'Technologies used',
      category: 'Category',
      year: 'Year',
      link: 'Link',
    },
    categories: { all: 'All', ecommerce: 'E-Commerce', wordpress: 'WordPress', application: 'Application', wix: 'Wix' },
    siteRole: 'Junior Full Stack Developer & WordPress Architect',
    footer: {
      description: 'Building fast, accessible, maintainable web ecosystems from architecture to interaction.',
      navigate: 'Navigate',
      elsewhere: 'Elsewhere',
      rights: 'All rights reserved.',
      backToTop: 'Back to top',
    },
  },
};

/** Maps a nav href to its translation key. */
export const navKeyByHref: Record<string, keyof TranslationShape['nav']> = {
  '/': 'home',
  '/about': 'about',
  '/expertise': 'expertise',
  '/experience': 'experience',
  '/projects': 'projects',
  '/achievements': 'achievements',
  '/contact': 'contact',
};

/** Maps a project category value to its translation key. */
export const categoryKeyByValue: Record<string, keyof TranslationShape['categories']> = {
  'E-Commerce': 'ecommerce',
  'WordPress': 'wordpress',
  'Application': 'application',
  'Wix': 'wix',
};
