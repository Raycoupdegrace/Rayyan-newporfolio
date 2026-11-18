export const siteConfig = {
  name: 'Muhammad Rayyan Yuwono',
  shortName: 'Rayyan',
  role: 'Junior Full Stack Developer & WordPress Architect',
  tagline: 'I build web ecosystems that feel inevitable.',
  description:
    'Junior Full Stack Developer & WordPress Architect specialising in end-to-end web ecosystems — pairing React/Next.js interfaces with high-performance Laravel & PHP backends.',
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
    'http://localhost:3000',
  email: 'muhammadrayyanyuwono@gmail.com',
  location: 'Indonesia (Remote / Global)',
  availability: 'Open to junior freelance & contract engagements — Q3 2026 onwards.', // will be overridden by i18n
  social: {
    github: 'https://github.com/Raycoupdegrace',
    linkedin: 'https://www.linkedin.com/in/muhammad-rayyan-b28118351',
    telegram: 'https://t.me/+6285648361572',
    instagram: 'https://www.instagram.com/rayynn._com',
    whatsapp: '',
  },
} as const;

export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Expertise', href: '/expertise' },
  { label: 'Experience', href: '/experience' },
  { label: 'Projects', href: '/projects' },
  { label: 'Achievements', href: '/achievements' },
  { label: 'Contact', href: '/contact' },
] as const;
