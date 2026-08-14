"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  CircleDot,
  Code2,
  Database,
  Github,
  Globe2,
  Layers3,
  Mail,
  MapPin,
  Menu,
  Network,
  Send,
  Server,
  Terminal,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { ReactLenis } from "lenis/react";

type Project = {
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

type WorkTab = "projects" | "stack";

type StackCategory = {
  label: string;
  icon: LucideIcon;
  skills: string[];
  detail: string;
};

const navItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
];

const workTabs: { id: WorkTab; label: string; summary: string }[] = [
  { id: "projects", label: "Projects", summary: "7 selected" },
  { id: "stack", label: "Tech Stack", summary: "5 areas" },
];

const stackCategories: StackCategory[] = [
  {
    label: "Backend",
    icon: Server,
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
    icon: Code2,
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
    icon: Database,
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
    icon: Network,
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
    icon: Workflow,
    detail: "External services",
    skills: [
      "Midtrans Payment Gateway API",
      "Google Ads Integration",
      "Customer Support & Web Admin Services",
    ],
  },
];

const projects: Project[] = [
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
      alt: "Screenshot landing page AJM Bengkel Motor",
    },
    visitUrl: "https://ajm-bengkel.vercel.app/",
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

const marqueeItems = [
  "LARAVEL",
  "LIVEWIRE",
  "TAILWIND CSS",
  "MYSQL",
  "TYPESCRIPT",
  "RESTFUL API",
  "LINUX VPS",
  "REACT JS",
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-xs font-medium tracking-[0.08em] text-[#17cbb3]">
      {children}
    </p>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navbarHidden, setNavbarHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const [activeWorkTab, setActiveWorkTab] = useState<WorkTab>("projects");
  const contactRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress: contactProgress } = useScroll({
    target: contactRef,
    offset: ["start end", "end end"],
  });

  useMotionValueEvent(contactProgress, "change", (value) => {
    const shouldHide = value > 0.2;
    setNavbarHidden((current) =>
      current === shouldHide ? current : shouldHide,
    );
  });

  useEffect(() => {
    const sections = ["top", "about", "work", "contact"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-20% 0px -60%", threshold: [0, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const revealTransition = (delay = 0) => ({
    duration: reduceMotion ? 0 : 0.65,
    delay: reduceMotion ? 0 : delay,
    ease: "easeOut" as const,
  });

  return (
    <ReactLenis
      root
      options={{
        lerp: reduceMotion ? 1 : 0.08,
        smoothWheel: !reduceMotion,
        anchors: true,
      }}
    >
      <a
        href="#content"
        className="fixed left-4 top-4 z-50 -translate-y-24 bg-[#17cbb3] px-4 py-2 text-sm font-semibold text-[#0d1117] transition-transform focus:translate-y-0"
      >
        Lewati ke konten
      </a>
      <main
        id="content"
        className="grain min-h-screen overflow-hidden bg-[#0d1117] text-slate-100 selection:bg-[#17cbb3] selection:text-[#0d1117]"
      >
        <nav
          className={`fixed left-1/2 top-4 z-40 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 border border-white/10 bg-[#111820]/85 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_16px_50px_rgba(5,12,18,0.24)] backdrop-blur-xl transition-all duration-500 md:w-[calc(100%-3rem)] ${
            navbarHidden
              ? "pointer-events-none -translate-y-24 opacity-0"
              : "translate-y-0 opacity-100"
          }`}
          aria-label="Primary navigation"
        >
          <div className="flex items-center justify-between gap-4">
            <a
              href="#top"
              className="font-mono text-sm font-bold tracking-tight text-white"
              onClick={() => setMenuOpen(false)}
            >
              Fauzan Zhahir Arrafi
            </a>
            <div className="hidden items-center gap-6 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={
                    activeSection === item.href.slice(1)
                      ? "location"
                      : undefined
                  }
                  className={`relative py-1 text-sm transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-[#17cbb3] after:transition-all ${
                    activeSection === item.href.slice(1)
                      ? "text-white after:w-full"
                      : "text-slate-400 after:w-0 hover:text-white hover:after:w-full"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
            <a
              href="#contact"
              className="hidden items-center gap-2 bg-[#17cbb3] px-3 py-2 text-xs font-semibold text-[#0d1117] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-px md:inline-flex"
            >
              Contact <ArrowUpRight size={14} strokeWidth={2} />
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex p-1 text-slate-200 md:hidden"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
          {menuOpen && (
            <div className="mt-3 border-t border-white/10 pt-3 md:hidden">
              <div className="flex flex-col gap-1">
                {[...navItems, { label: "Contact", href: "#contact" }].map(
                  (item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="px-2 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
                    >
                      {item.label}
                    </a>
                  ),
                )}
              </div>
            </div>
          )}
        </nav>

        <section
          id="top"
          className="relative flex min-h-[100dvh] items-start border-b border-white/10 px-5 pb-28 pt-24 md:px-10 lg:items-center lg:pb-24 lg:pt-20"
        >
          <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:3rem_3rem] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
          <div className="absolute -right-32 top-20 h-[28rem] w-[28rem] rounded-full bg-[#17cbb3]/[0.06] blur-[8rem]" />
          <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-12">
            <motion.div
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              variants={reveal}
              transition={revealTransition(0.1)}
              className="lg:col-span-7"
            >
              <SectionLabel>
                Full Stack Web Developer · Bandung, Indonesia
              </SectionLabel>
              <h1 className="mt-6 max-w-4xl text-balance text-5xl font-semibold leading-[0.96] tracking-[-0.06em] text-white sm:text-6xl md:text-7xl lg:text-[5.25rem]">
                Membangun web yang{" "}
                <span className="text-[#17cbb3]">terstruktur,</span> siap
                dipakai.
              </h1>
              <p className="mt-6 max-w-[58ch] text-pretty text-base leading-7 text-slate-400 md:text-lg">
                Fauzan Zhahir Arrafi, Full Stack Web Developer yang membangun
                aplikasi web dari database, backend, frontend, sampai
                deployment.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 bg-[#17cbb3] px-5 py-3 text-sm font-semibold text-[#0d1117] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-px"
                >
                  Lihat Proyek <ArrowDownRight size={17} strokeWidth={2.2} />
                </a>
                <a
                  href="mailto:fauzanzha09@gmail.com"
                  className="inline-flex items-center gap-2 px-1 py-3 text-sm font-medium text-slate-300 underline decoration-white/20 underline-offset-8 transition-colors duration-200 hover:text-[#17cbb3] hover:decoration-[#17cbb3]"
                >
                  Kirim Email <Mail size={16} strokeWidth={2} />
                </a>
              </div>
            </motion.div>
            <motion.figure
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              variants={reveal}
              transition={revealTransition(0.25)}
              className="group relative order-first mx-auto mb-16 block w-full max-w-sm border border-white/15 bg-[#111820] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_60px_rgba(3,9,14,0.34)] sm:max-w-md lg:order-none lg:mb-0 lg:col-span-5 lg:ml-auto"
            >
              <div className="relative aspect-[4/5] overflow-hidden border border-white/10 bg-[#0d1117]">
                <Image
                  src="/profile-fauzan.jpg"
                  alt="Foto Fauzan Zhahir Arrafi"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center grayscale-[35%] saturate-[0.65] contrast-[1.04] transition-[transform,filter] duration-700 group-hover:scale-[1.025] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117]/85 via-transparent to-transparent" />
                <div className="absolute left-3 top-3 h-3 w-3 border-l border-t border-[#17cbb3]" />
                <div className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-[#17cbb3]" />
              </div>
              <figcaption className="absolute -bottom-7 left-3 right-3 border border-white/10 bg-[#111820]/95 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur sm:-bottom-5 sm:-left-3 sm:right-6 md:-left-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs text-[#17cbb3]">
                      Fauzan Zhahir Arrafi
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Siswa SMK · Rekayasa Perangkat Lunak (RPL)
                    </p>
                  </div>
                  <MapPin
                    size={18}
                    strokeWidth={1.7}
                    className="mt-0.5 shrink-0 text-[#17cbb3]"
                  />
                </div>
              </figcaption>
            </motion.figure>
          </div>
          <div className="absolute bottom-0 left-0 w-full overflow-hidden border-t border-white/10 bg-[#0d1117]/95 py-4">
            <div
              className={`flex w-max items-center gap-8 font-mono text-xs tracking-[0.16em] text-slate-500 ${reduceMotion ? "" : "animate-[marquee_28s_linear_infinite]"}`}
            >
              {[...marqueeItems, ...marqueeItems].map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="flex items-center gap-8 whitespace-nowrap"
                >
                  {item} <CircleDot size={13} className="text-[#17cbb3]" />
                </span>
              ))}
            </div>
          </div>
        </section>

        <section
          id="about"
          className="px-5 pb-32 pt-28 md:px-10 md:pb-40 md:pt-36"
        >
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={reveal}
              transition={revealTransition()}
              className="max-w-3xl"
            >
              <SectionLabel>01 / About</SectionLabel>
              <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-white md:text-5xl">
                Full Stack Web Developer yang membangun sistem web end-to-end.
              </h2>
              <p className="mt-6 max-w-[65ch] text-pretty text-base leading-8 text-slate-400 md:text-lg">
                Saya mengerjakan aplikasi web modern dari perancangan database,
                logika backend, antarmuka responsif, integrasi API, sampai
                deployment. Fokus saya adalah membangun codebase yang rapi,
                mudah dikelola, dan siap dikembangkan.
              </p>
            </motion.div>

            <div className="mt-14 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
              <motion.div
                initial={reduceMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={reveal}
                transition={revealTransition(0.05)}
                className="relative overflow-hidden bg-[#111820] p-7 md:col-span-2"
              >
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#17cbb3]/10 blur-3xl" />
                <Terminal size={25} className="text-[#17cbb3]" />
                <p className="mt-16 font-mono text-xs uppercase tracking-[0.16em] text-slate-500">
                  Focus
                </p>
                <p className="mt-3 max-w-md text-balance text-2xl font-medium tracking-[-0.025em] text-white">
                  Web modern yang dapat dikelola, dikembangkan, dan dipelihara.
                </p>
              </motion.div>
              <motion.div
                initial={reduceMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={reveal}
                transition={revealTransition(0.12)}
                className="bg-[#0d1117] p-7"
              >
                <Globe2 size={25} className="text-[#17cbb3]" />
                <p className="mt-16 font-mono text-xs uppercase tracking-[0.16em] text-slate-500">
                  Base
                </p>
                <p className="mt-3 text-lg font-medium text-white">Bandung</p>
                <p className="mt-1 text-sm text-slate-400">
                  Jawa Barat, Indonesia
                </p>
              </motion.div>
              <motion.div
                initial={reduceMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={reveal}
                transition={revealTransition(0.19)}
                className="bg-[#17cbb3]/10 p-7"
              >
                <Layers3 size={25} className="text-[#17cbb3]" />
                <p className="mt-16 font-mono text-xs uppercase tracking-[0.16em] text-[#17cbb3]">
                  Profile
                </p>
                <p className="mt-3 text-lg font-medium text-white">
                  Full Stack Web Developer
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  Backend, frontend, database, deployment
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section
          id="work"
          className="border-t border-white/10 bg-[#10161d] px-5 pb-32 pt-28 md:px-10 md:pb-40 md:pt-36"
        >
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={reveal}
              transition={revealTransition()}
              className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end"
            >
              <div className="max-w-3xl">
                <SectionLabel>02 / Stack & Projects</SectionLabel>
                <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-white md:text-5xl">
                  Stack teknis dan tujuh project pilihan.
                </h2>
              </div>
              <div
                role="tablist"
                aria-label="Stack dan project"
                className="grid w-full grid-cols-2 border border-white/10 bg-[#0d1117] p-1 sm:w-[25rem]"
              >
                {workTabs.map((tab) => {
                  const selected = activeWorkTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      id={`work-tab-${tab.id}`}
                      aria-selected={selected}
                      aria-controls={`work-panel-${tab.id}`}
                      onClick={() => setActiveWorkTab(tab.id)}
                      className={`min-h-11 px-3 py-2 text-left transition-[background-color,color] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#17cbb3] ${
                        selected
                          ? "bg-[#17cbb3] text-[#0d1117]"
                          : "text-slate-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span className="block text-sm font-semibold">
                        {tab.label}
                      </span>
                      <span
                        className={`mt-1 block font-mono text-[10px] uppercase tracking-[0.14em] ${
                          selected ? "text-[#0d1117]/65" : "text-slate-600"
                        }`}
                      >
                        {tab.summary}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {activeWorkTab === "projects" ? (
              <div
                role="tabpanel"
                id="work-panel-projects"
                aria-labelledby="work-tab-projects"
                className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-12"
              >
                {projects.map((project, index) => (
                  <motion.article
                    key={project.title}
                    initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.06 }}
                    variants={reveal}
                    transition={revealTransition(index * 0.07)}
                    className={`group min-w-0 overflow-hidden border border-white/10 bg-[#0d1117] p-4 transition-[border-color,transform,background-color] duration-300 hover:-translate-y-1 hover:border-[#17cbb3]/45 hover:bg-[#0e141b] sm:p-5 md:flex md:min-h-[24rem] md:flex-col ${
                      index === 0
                        ? "xl:col-span-7"
                        : index === 1
                          ? "xl:col-span-5"
                          : "xl:col-span-6"
                    }`}
                  >
                    {project.image ? (
                      <div className="overflow-hidden border border-white/10 bg-[#111820]">
                        <div className="flex min-w-0 items-center justify-between gap-3 border-b border-white/10 px-3 py-2 font-mono">
                          <div className="flex gap-1.5">
                            <span className="h-1.5 w-1.5 bg-slate-600" />
                            <span className="h-1.5 w-1.5 bg-slate-600" />
                            <span className="h-1.5 w-1.5 bg-[#17cbb3]" />
                          </div>
                          <span className="shrink-0 text-[10px] tracking-[0.08em] text-[#17cbb3] sm:text-[11px]">
                            {project.status}
                          </span>
                        </div>
                        <div className="relative aspect-[1920/963] bg-[#05080c]">
                          <Image
                            src={project.image.src}
                            alt={project.image.alt}
                            fill
                            sizes="(max-width: 768px) calc(100vw - 40px), (max-width: 1280px) calc(50vw - 48px), 58vw"
                            className="object-contain object-center opacity-95 saturate-[0.9] transition-transform duration-700 group-hover:scale-[1.01]"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex min-h-11 min-w-0 items-center justify-between gap-3 border border-white/10 bg-[#111820] px-3 py-2 font-mono">
                        <div className="flex gap-1.5">
                          <span className="h-1.5 w-1.5 bg-slate-600" />
                          <span className="h-1.5 w-1.5 bg-slate-600" />
                          <span className="h-1.5 w-1.5 bg-[#17cbb3]" />
                        </div>
                        <span className="shrink-0 text-[10px] tracking-[0.08em] text-[#17cbb3] sm:text-[11px]">
                          {project.status}
                        </span>
                      </div>
                    )}
                    <div className="mt-5 flex min-w-0 items-start justify-between gap-3 sm:mt-6 sm:gap-4">
                      <div className="min-w-0">
                        <p className="break-words font-mono text-[10px] uppercase tracking-[0.12em] text-slate-500 sm:tracking-[0.16em]">
                          {project.type}
                        </p>
                        <h3 className="mt-3 break-words text-balance text-xl font-medium leading-tight tracking-[-0.025em] text-white">
                          {project.title}
                        </h3>
                      </div>
                      <span className="font-mono text-xs tabular-nums text-slate-600 transition-colors duration-300 group-hover:text-[#17cbb3]">
                        /0{index + 1}
                      </span>
                    </div>
                    <p className="mt-4 break-words text-sm leading-6 text-slate-400">
                      {project.description}
                    </p>
                    <div className="pt-6 md:mt-auto">
                      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#17cbb3] sm:tracking-[0.16em]">
                        Role / {project.role}
                      </p>
                      <div className="mt-3 flex min-w-0 flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="max-w-full break-words bg-white/5 px-2 py-1 font-mono text-[10px] leading-4 text-slate-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {project.visitUrl ? (
                        <a
                          href={project.visitUrl}
                          target={
                            project.visitUrl.startsWith("http")
                              ? "_blank"
                              : undefined
                          }
                          rel={
                            project.visitUrl.startsWith("http")
                              ? "noreferrer"
                              : undefined
                          }
                          aria-label={`Live Demo ${project.title}`}
                          className="mt-5 inline-flex min-h-11 items-center gap-2 border border-[#17cbb3]/35 px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#17cbb3] transition-[background-color,border-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-[#17cbb3] hover:bg-[#17cbb3] hover:text-[#0d1117] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#17cbb3] active:translate-y-px"
                        >
                          Live Demo <ArrowUpRight size={14} strokeWidth={2.2} />
                        </a>
                      ) : null}
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div
                role="tabpanel"
                id="work-panel-stack"
                aria-labelledby="work-tab-stack"
                className="mt-14 grid gap-px border-y border-white/10 lg:grid-cols-2"
              >
                {stackCategories.map((category, index) => {
                  const Icon = category.icon;

                  return (
                    <motion.article
                      key={category.label}
                      initial={reduceMotion ? false : "hidden"}
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.15 }}
                      variants={reveal}
                      transition={revealTransition(index * 0.07)}
                      className="group border-b border-white/10 py-8 transition-colors duration-300 hover:bg-[#17cbb3]/[0.025] lg:px-7 lg:[&:nth-child(odd)]:border-r lg:[&:nth-last-child(-n+2)]:border-b-0"
                    >
                      <div className="flex items-start gap-4">
                        <div className="border border-[#17cbb3]/30 bg-[#17cbb3]/10 p-2.5 text-[#17cbb3]">
                          <Icon size={20} strokeWidth={1.8} />
                        </div>
                        <div>
                          <h3 className="text-xl font-medium text-white">
                            {category.label}
                          </h3>
                          <p className="mt-1 font-mono text-xs text-slate-500">
                            {category.detail}
                          </p>
                        </div>
                      </div>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {category.skills.map((skill) => (
                          <span
                            key={skill}
                            className="border border-white/10 px-2.5 py-1.5 text-xs text-slate-300 transition-colors duration-300 group-hover:border-[#17cbb3]/30"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <section
          ref={contactRef}
          id="contact"
          className="relative px-5 pb-32 pt-28 md:px-10 md:pb-40 md:pt-36"
        >
          <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-[#17cbb3]/[0.04] blur-[7rem]" />
          <div className="mx-auto max-w-7xl border-y border-white/10 py-16 md:py-24">
            <motion.div
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={reveal}
              transition={revealTransition()}
              className="grid gap-10 lg:grid-cols-12 lg:items-end"
            >
              <div className="lg:col-span-8">
                <SectionLabel>03 / Contact</SectionLabel>
                <h2 className="mt-5 max-w-3xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-white md:text-6xl">
                  Mari bangun sesuatu yang berguna.
                </h2>
              </div>
              <div className="lg:col-span-4">
                <p className="text-base leading-7 text-slate-400">
                  Terbuka untuk kolaborasi, project web, maintenance, dan
                  pengembangan produk digital.
                </p>
                <a
                  href="mailto:fauzanzha09@gmail.com"
                  className="mt-7 inline-flex items-center gap-2 bg-[#17cbb3] px-5 py-3 text-sm font-semibold text-[#0d1117] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-px"
                >
                  Mulai Percakapan <Send size={16} strokeWidth={2.2} />
                </a>
              </div>
            </motion.div>
            <div className="mt-16 grid gap-px border border-white/10 bg-white/10 md:grid-cols-12">
              <a
                href="mailto:fauzanzha09@gmail.com"
                className="group bg-[#0d1117] p-5 transition-colors duration-300 hover:bg-[#17cbb3]/10 md:col-span-5"
              >
                <Mail size={19} className="text-[#17cbb3]" />
                <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                  Email
                </p>
                <p className="mt-2 text-sm text-slate-200">
                  fauzanzha09@gmail.com
                </p>
              </a>
              <a
                href="https://github.com/nnazuaff"
                target="_blank"
                rel="noreferrer"
                className="group bg-[#0d1117] p-5 transition-colors duration-300 hover:bg-[#17cbb3]/10 md:col-span-4"
              >
                <Github size={19} className="text-[#17cbb3]" />
                <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                  GitHub
                </p>
                <p className="mt-2 text-sm text-slate-200">
                  github.com/nnazuaff
                </p>
              </a>
              <a
                href="https://wa.me/6282210513791"
                target="_blank"
                rel="noreferrer"
                className="group bg-[#0d1117] p-5 transition-colors duration-300 hover:bg-[#17cbb3]/10 md:col-span-3"
              >
                <Send size={19} className="text-[#17cbb3]" />
                <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                  WhatsApp
                </p>
                <p className="mt-2 text-sm text-slate-200">
                  WA: +6282210513791
                </p>
              </a>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 px-5 py-7 md:px-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Fauzan Zhahir Arrafi</p>
            
          </div>
        </footer>
      </main>
      <style jsx global>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        html {
          scroll-behavior: auto;
        }
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </ReactLenis>
  );
}
