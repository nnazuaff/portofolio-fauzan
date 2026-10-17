export type Project = {
  title: string;
  type: string;
  role: string;
  status: "COMPLETED" | "IN PROGRESS";
  description: string;
  tags: string[];
  image?: {
    src: string;
    alt: string;
  };
  visitUrl?: string;
};

export const projects: Project[] = [
  {
    title: "Acis Pedia — SMM Panel Website",
    type: "Commercial Web Platform",
    role: "Full Stack",
    status: "COMPLETED",
    description:
      "Platform komersial dengan alur layanan, manajemen data, pembayaran, dan deployment server yang terintegrasi.",
    tags: [
      "Laravel",
      "TypeScript",
      "Tailwind",
      "MySQL",
      "Midtrans",
      "Ubuntu VPS",
      "Hostinger",
    ],
    image: {
      src: "/project-acispedia.png",
      alt: "Screenshot halaman beranda Acis Pedia SMM Panel",
    },
    visitUrl: "https://acispedia.com/",
  },
  {
    title: "Portfolio Fauzan Zhahir Arrafi",
    type: "Personal Portfolio",
    role: "Frontend Developer",
    status: "COMPLETED",
    description:
      "Website portfolio pribadi untuk menampilkan profil, tech stack, project pilihan, dan kanal kontak dalam satu halaman responsif.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    image: {
      src: "/project-portfolio.png",
      alt: "Screenshot halaman utama portfolio Fauzan Zhahir Arrafi",
    },
    visitUrl: "#top",
  },
  {
    title: "Sistem Informasi Management PKL & Portal PPID Sekolah",
    type: "Institutional Web System — In Progress",
    role: "Full Stack",
    status: "IN PROGRESS",
    description:
      "Sistem institusional untuk pengelolaan PKL dan portal informasi publik sekolah dengan panel administrasi terstruktur.",
    tags: ["Laravel", "Filament", "Livewire", "Tailwind", "MySQL"],
  },
  {
    title: "Webstore E-Commerce Platform",
    type: "E-Commerce System",
    role: "Backend-Focused",
    status: "COMPLETED",
    description:
      "Platform e-commerce yang berfokus pada arsitektur backend, transaksi, katalog, dan integrasi payment gateway.",
    tags: ["Laravel", "Livewire", "Tailwind", "MySQL", "Payment Gateway API"],
  },
  {
    title: "Mindhug — Web Curhat Anonim",
    type: "Interactive Social Web App",
    role: "Full Stack",
    status: "COMPLETED",
    description:
      "Aplikasi sosial interaktif untuk berbagi cerita secara anonim dengan pengalaman antarmuka yang responsif.",
    tags: ["Laravel", "Livewire", "Alpine.js", "Tailwind", "MySQL"],
    image: {
      src: "/project-mindhug.png",
      alt: "Screenshot halaman utama MindHug",
    },
  },
  {
    title: "Landing Page AJM — Bengkel Motor",
    type: "Business Profile",
    role: "Web Developer",
    status: "COMPLETED",
    description:
      "Landing page business profile untuk bengkel motor dengan informasi layanan yang jelas dan responsif.",
    tags: ["Next.js", "React", "Tailwind CSS"],
    image: {
      src: "/project-ajm-bengkel.png",
      alt: "Screenshot desktop live website Ahad Jaya Motor di Katapang",
    },
    visitUrl: "https://ajmbengkel.id/",
  },
  {
    title: "Web Blog & CMS Admin Dashboard",
    type: "WPU Course Project",
    role: "Web Developer",
    status: "COMPLETED",
    description:
      "Blog dan dashboard CMS untuk mengelola konten melalui workflow admin berbasis Laravel.",
    tags: ["Laravel", "PHP", "Blade", "MySQL", "Tailwind CSS"],
  },
];

export const stackCategories = [
  {
    label: "Backend",
    detail: "Application logic & API",
    skills: [
      "PHP",
      "Laravel",
      "Livewire",
      "Blade Templating Engine",
      "Filament (Admin Panel)",
      "Node.js",
      "RESTful API",
    ],
  },
  {
    label: "Frontend",
    detail: "Interface systems",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "TypeScript",
      "Tailwind CSS",
      "Alpine.js",
      "React JS",
    ],
  },
  {
    label: "Database",
    detail: "Structured data",
    skills: [
      "MySQL",
      "SQLite",
      "Relational Database Design (ERD)",
      "Query Optimization",
    ],
  },
  {
    label: "Server & DevOps",
    detail: "Ship & maintain",
    skills: [
      "Linux (Ubuntu VPS)",
      "Hostinger Deployment",
      "Git",
      "GitHub",
      "Nginx/Apache Basic Config",
    ],
  },
  {
    label: "Integrasi",
    detail: "External services",
    skills: [
      "Midtrans Payment Gateway API",
      "Google Ads Integration",
      "Customer Support & Web Admin Services",
    ],
  },
];

export const profile = {
  name: "Fauzan Zhahir Arrafi",
  role: "Full Stack Web Developer",
  location: "Bandung, Indonesia",
  avatar: "/media/profile-fauzan.webp",
  bio: "Dari database sampai tampilan. Saya bikin web yang rapi dan enak dipakai.",
};

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/nnazuaff", handle: "nnazuaff" },
  { label: "Instagram", href: "https://www.instagram.com/nnzuaf", handle: "@nnzuaf" },
  { label: "Email", href: "mailto:fauzanzha09@gmail.com", handle: "fauzanzha09@gmail.com" },
];

export const backgroundMedia = {
  src: "/media/ambient.mp4",
  poster: "/media/hero-poster.webp",
  // Replace src with your own MP4; this public source remains a drop-in placeholder.
  placeholder: "https://videos.pexels.com/video-files/3163534/3163534-hd_1920_1080_30fps.mp4",
};
