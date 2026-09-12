"use client";

import Image from "next/image";
import { useState, type KeyboardEvent, type ReactNode } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  CircleDot,
  Code2,
  Database,
  Github,
  Globe2,
  Instagram,
  Layers3,
  Mail,
  MapPin,
  Network,
  Send,
  Server,
  Terminal,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { ReactLenis } from "lenis/react";

import { AnimatedNavFramer } from "@/components/ui/navigation-menu";

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
    <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-tosca-dark">
      {children}
    </p>
  );
}

const projectLayouts = [
  "xl:col-span-7 md:-rotate-1",
  "xl:col-span-5 md:rotate-1",
  "xl:col-span-5 md:rotate-[0.7deg]",
  "xl:col-span-7 md:-rotate-[0.6deg]",
  "xl:col-span-7 md:rotate-[0.5deg]",
  "xl:col-span-5 md:-rotate-1",
  "xl:col-span-6 md:rotate-[0.6deg]",
];

const stackRotations = [
  "md:-rotate-[0.7deg]",
  "md:rotate-[0.6deg]",
  "md:rotate-[0.4deg]",
  "md:-rotate-[0.5deg]",
  "md:rotate-[0.7deg]",
];

export default function Home() {
  const [activeWorkTab, setActiveWorkTab] = useState<WorkTab>("projects");
  const reduceMotion = useReducedMotion();

  const revealTransition = (delay = 0) => ({
    duration: reduceMotion ? 0 : 0.58,
    delay: reduceMotion ? 0 : delay,
    ease: "easeOut" as const,
  });

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) => {
    let nextIndex = currentIndex;
    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % workTabs.length;
    else if (event.key === "ArrowLeft")
      nextIndex = (currentIndex - 1 + workTabs.length) % workTabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = workTabs.length - 1;
    else return;

    event.preventDefault();
    const nextTab = workTabs[nextIndex];
    setActiveWorkTab(nextTab.id);
    document.getElementById(`work-tab-${nextTab.id}`)?.focus();
  };

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
        className="fixed left-4 top-4 z-[70] -translate-y-24 rounded-full bg-tosca px-4 py-2 font-display text-sm font-bold text-ink transition-transform focus:translate-y-0 motion-reduce:transition-none"
      >
        Lewati ke konten
      </a>
      <main
        id="content"
        className="grain min-h-screen overflow-hidden bg-paper text-ink selection:bg-tosca selection:text-ink"
      >
        <AnimatedNavFramer />

        <section
          id="top"
          className="relative flex min-h-[100dvh] items-center border-b-2 border-ink/10 px-5 pb-28 pt-24 md:px-10 lg:pb-24 lg:pt-20"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(23,32,51,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(23,32,51,0.045)_1px,transparent_1px)] [background-size:2.5rem_2.5rem] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]"
          />
          <div aria-hidden="true" className="absolute -left-10 top-28 h-24 w-24 rotate-12 rounded-[42%] bg-sun/70" />
          <div aria-hidden="true" className="absolute -right-20 top-24 h-64 w-64 rounded-full bg-sky/80" />

          <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-12 lg:gap-8">
            <motion.div
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              variants={reveal}
              transition={revealTransition(0.08)}
              className="lg:col-span-7"
            >
              <div className="inline-flex -rotate-1 items-center gap-2 border-2 border-ink/10 bg-sun px-4 py-2 print-shadow md:-ml-3">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-tosca" />
                <SectionLabel>Full Stack Web Developer · Bandung, Indonesia</SectionLabel>
              </div>
              <h1 className="mt-7 max-w-4xl text-balance font-display text-5xl font-bold leading-[0.98] tracking-[-0.035em] sm:text-6xl md:text-7xl lg:text-[4.8rem]">
                Bikin web yang <span className="relative text-tosca-dark">rapi,<span aria-hidden="true" className="absolute -bottom-1 left-0 h-1 w-full -rotate-1 rounded-full bg-tosca/25" /></span> enak dipakai.
              </h1>
              <p className="mt-6 max-w-[52ch] text-pretty text-base leading-7 text-ink/75 md:text-lg">
                Hai, saya Fauzan. Saya bikin web dari database sampai tampilan, lalu memastikan semuanya benar-benar enak dipakai.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  href="#work"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-tosca px-6 py-3 font-display text-sm font-bold text-ink print-shadow transition-transform hover:-translate-y-0.5 active:translate-y-px motion-reduce:transition-none"
                >
                  Lihat Proyek <ArrowDownRight size={17} strokeWidth={2.3} />
                </a>
                <a
                  href="mailto:fauzanzha09@gmail.com"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-ink/15 bg-white px-5 py-3 font-display text-sm font-bold text-ink transition-colors hover:border-tosca hover:text-tosca-dark"
                >
                  Kirim Email <Mail size={16} strokeWidth={2.2} />
                </a>
              </div>
            </motion.div>

            <motion.figure
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              variants={reveal}
              transition={revealTransition(0.2)}
              className="group relative mx-auto mb-8 w-full max-w-[22rem] rotate-0 bg-white p-3 pb-20 print-shadow md:max-w-md md:rotate-2 lg:col-span-5 lg:mb-0 lg:ml-auto"
            >
              <span aria-hidden="true" className="tape-strip -top-3 left-1/2 -translate-x-1/2 -rotate-3" />
              <div className="relative aspect-[4/5] overflow-hidden bg-sky">
                <Image
                  src="/profile-fauzan.jpg"
                  alt="Foto Fauzan Zhahir Arrafi"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center brightness-[1.12] contrast-[0.94] saturate-[0.88] transition-transform duration-700 group-hover:scale-[1.02] motion-reduce:transition-none"
                />
              </div>
              <figcaption className="absolute inset-x-5 bottom-4 flex items-end justify-between gap-4">
                <div>
                  <p className="font-display text-lg font-bold">Fauzan Zhahir Arrafi</p>
                  <p className="mt-1 text-sm text-ink/65">Siswa SMK · Rekayasa Perangkat Lunak (RPL)</p>
                </div>
                <MapPin size={20} className="shrink-0 text-tosca-dark" aria-hidden="true" />
              </figcaption>
              <span aria-hidden="true" className="absolute -right-12 bottom-24 hidden -rotate-6 font-display text-sm font-bold text-tosca-dark lg:block">based in Bandung ↙</span>
            </motion.figure>
          </div>

          <div className="absolute bottom-0 left-0 w-full overflow-hidden border-y-2 border-ink/10 bg-sun/70 py-3 [mask-image:linear-gradient(to_right,transparent,black_3rem,black_calc(100%-3rem),transparent)]">
            <div className={`flex w-max items-center gap-8 font-mono text-xs font-semibold tracking-[0.12em] text-ink/65 ${reduceMotion ? "" : "animate-[marquee_28s_linear_infinite]"}`}>
              {[...marqueeItems, ...marqueeItems].map((item, index) => (
                <span key={`${item}-${index}`} aria-hidden={index >= marqueeItems.length} className="flex items-center gap-8 whitespace-nowrap">
                  {item} <CircleDot size={13} className="text-tosca-dark" aria-hidden="true" />
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="relative px-5 pb-28 pt-28 md:px-10 md:pb-40 md:pt-36">
          <div aria-hidden="true" className="absolute right-[8%] top-20 h-16 w-40 -rotate-6 bg-sky/70" />
          <div className="relative mx-auto max-w-7xl">
            <motion.div
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={reveal}
              transition={revealTransition()}
              className="max-w-3xl"
            >
              <SectionLabel>01 / About</SectionLabel>
              <h2 className="mt-5 text-balance font-display text-4xl font-bold leading-[1.04] tracking-[-0.025em] md:text-6xl">
                Full Stack Web Developer yang membangun sistem web end-to-end.
              </h2>
              <p className="mt-6 max-w-[65ch] text-pretty text-base leading-8 text-ink/68 md:text-lg">
                Saya mengerjakan aplikasi web modern dari perancangan database, logika backend, antarmuka responsif, integrasi API, sampai deployment. Fokus saya adalah membangun codebase yang rapi, mudah dikelola, dan siap dikembangkan.
              </p>
            </motion.div>

            <div className="mt-16 grid items-start gap-6 md:grid-cols-12 md:gap-5">
              <motion.article
                initial={reduceMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={reveal}
                transition={revealTransition(0.05)}
                className="paper-card relative rounded-[2rem_1rem_2.5rem_1.25rem] bg-sun p-7 md:col-span-7 md:-rotate-1 md:p-9"
              >
                <span aria-hidden="true" className="tape-strip -top-4 left-8 rotate-2" />
                <Terminal size={28} className="text-tosca-dark" aria-hidden="true" />
                <p className="mt-12 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-ink/65">Focus</p>
                <p className="mt-3 max-w-xl text-balance font-display text-2xl font-bold md:text-3xl">Web modern yang dapat dikelola, dikembangkan, dan dipelihara.</p>
              </motion.article>

              <motion.article
                initial={reduceMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={reveal}
                transition={revealTransition(0.12)}
                className="paper-card rounded-[1.2rem_2.5rem_1.4rem_2rem] bg-sky p-7 md:col-span-5 md:mt-12 md:rotate-1"
              >
                <Globe2 size={28} className="text-tosca-dark" aria-hidden="true" />
                <p className="mt-12 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-ink/65">Base</p>
                <p className="mt-3 font-display text-2xl font-bold">Bandung</p>
                <p className="mt-1 text-sm text-ink/65">Jawa Barat, Indonesia</p>
              </motion.article>

              <motion.article
                initial={reduceMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={reveal}
                transition={revealTransition(0.19)}
                className="paper-card rounded-[2.4rem_1.3rem_1.8rem_1rem] p-7 md:col-span-8 md:col-start-3 md:-mt-1 md:rotate-[0.6deg]"
              >
                <Layers3 size={28} className="text-tosca-dark" aria-hidden="true" />
                <p className="mt-10 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-tosca-dark">Profile</p>
                <p className="mt-3 font-display text-2xl font-bold">Full Stack Web Developer</p>
                <p className="mt-1 text-sm text-ink/65">Backend, frontend, database, deployment</p>
              </motion.article>
            </div>
          </div>
        </section>

        <section id="work" className="border-y-2 border-ink/10 bg-sky/55 px-5 pb-28 pt-28 md:px-10 md:pb-40 md:pt-36">
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
                <h2 className="mt-5 text-balance font-display text-4xl font-bold leading-[1.04] tracking-[-0.025em] md:text-6xl">Stack teknis dan tujuh project pilihan.</h2>
              </div>
              <div role="tablist" aria-label="Stack dan project" className="grid w-full grid-cols-2 rounded-full border-2 border-ink/15 bg-paper p-1.5 print-shadow sm:w-[25rem]">
                {workTabs.map((tab, index) => {
                  const selected = activeWorkTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      id={`work-tab-${tab.id}`}
                      aria-selected={selected}
                      aria-controls={`work-panel-${tab.id}`}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setActiveWorkTab(tab.id)}
                      onKeyDown={(event) => handleTabKeyDown(event, index)}
                      className={`min-h-12 rounded-full px-4 py-2 text-left transition-colors motion-reduce:transition-none ${selected ? "bg-tosca text-ink" : "text-ink/65 hover:bg-tosca/10 hover:text-ink"}`}
                    >
                      <span className="block font-display text-sm font-bold">{tab.label}</span>
                      <span className={`mt-0.5 block font-mono text-[10px] uppercase tracking-[0.12em] ${selected ? "text-ink" : "text-ink/65"}`}>{tab.summary}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {activeWorkTab === "projects" ? (
              <div role="tabpanel" id="work-panel-projects" aria-labelledby="work-tab-projects" className="mt-14 grid gap-7 md:grid-cols-2 xl:grid-cols-12 xl:gap-8">
                {projects.map((project, index) => (
                  <motion.article
                    key={project.title}
                    initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.06 }}
                    variants={reveal}
                    transition={revealTransition(index * 0.06)}
                    className={`paper-card group min-w-0 overflow-hidden rounded-[1.4rem_0.8rem_1.8rem_1rem] p-4 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 sm:p-5 md:flex md:min-h-[25rem] md:flex-col motion-reduce:transition-none ${projectLayouts[index]}`}
                  >
                    <div className="overflow-hidden border-2 border-ink/10 bg-paper">
                      <div className="flex min-h-10 min-w-0 items-center justify-between gap-3 border-b-2 border-ink/10 bg-sun/60 px-3 py-2 font-mono">
                        <div className="flex gap-1.5" aria-hidden="true"><span className="h-2 w-2 rounded-full bg-ink/25" /><span className="h-2 w-2 rounded-full bg-ink/25" /><span className="h-2 w-2 rounded-full bg-tosca" /></div>
                        <span className="shrink-0 text-[10px] font-semibold tracking-[0.08em] text-tosca-dark sm:text-[11px]">{project.status}</span>
                      </div>
                      {project.image ? (
                        <div className="relative aspect-[1920/963] bg-white">
                          <Image src={project.image.src} alt={project.image.alt} fill sizes="(max-width: 768px) calc(100vw - 40px), (max-width: 1280px) calc(50vw - 48px), 58vw" className="object-contain object-center transition-transform duration-700 group-hover:scale-[1.01] motion-reduce:transition-none" />
                        </div>
                      ) : (
                        <div aria-hidden="true" className="grid aspect-[1920/963] place-items-center bg-sky/45"><Code2 className="h-10 w-10 text-ink/15" /></div>
                      )}
                    </div>
                    <div className="mt-5 flex min-w-0 items-start justify-between gap-3 sm:mt-6">
                      <div className="min-w-0">
                        <p className="break-words font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/65">{project.type}</p>
                        <h3 className="mt-3 break-words text-balance font-display text-xl font-bold leading-tight md:text-2xl">{project.title}</h3>
                      </div>
                      <span className="font-mono text-xs tabular-nums text-tosca-dark">/0{index + 1}</span>
                    </div>
                    <p className="mt-4 break-words text-sm leading-6 text-ink/65">{project.description}</p>
                    <div className="pt-6 md:mt-auto">
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-tosca-dark">Role / {project.role}</p>
                      <div className="mt-3 flex min-w-0 flex-wrap gap-1.5">
                        {project.tags.map((tag) => <span key={tag} className="max-w-full break-words rounded-full border border-ink/10 bg-sky/55 px-2.5 py-1 font-mono text-[10px] leading-4 text-ink/65">{tag}</span>)}
                      </div>
                      {project.visitUrl ? (
                        <a
                          href={project.visitUrl}
                          target={project.visitUrl.startsWith("http") ? "_blank" : undefined}
                          rel={project.visitUrl.startsWith("http") ? "noreferrer" : undefined}
                          aria-label={`Live Demo ${project.title}`}
                          className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-tosca px-4 py-2 font-display text-xs font-bold text-tosca-dark transition-colors hover:bg-tosca hover:text-ink"
                        >
                          Live Demo <ArrowUpRight size={14} strokeWidth={2.3} />
                        </a>
                      ) : null}
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div role="tabpanel" id="work-panel-stack" aria-labelledby="work-tab-stack" className="mt-14 grid gap-7 md:grid-cols-2">
                {stackCategories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <motion.article
                      key={category.label}
                      initial={reduceMotion ? false : "hidden"}
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.15 }}
                      variants={reveal}
                      transition={revealTransition(index * 0.06)}
                      className={`paper-card rounded-[1.6rem_1rem_2rem_1.2rem] p-7 ${index % 2 === 0 ? "bg-white" : "bg-sun/65"} ${stackRotations[index]}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-tosca p-3 text-ink"><Icon size={21} strokeWidth={2} aria-hidden="true" /></div>
                        <div><h3 className="font-display text-2xl font-bold">{category.label}</h3><p className="mt-1 font-mono text-xs text-ink/65">{category.detail}</p></div>
                      </div>
                      <div className="mt-7 flex flex-wrap gap-2">
                        {category.skills.map((skill) => <span key={skill} className="rounded-full border-2 border-ink/10 bg-paper px-3 py-1.5 text-xs font-semibold text-ink/70">{skill}</span>)}
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <section id="contact" className="relative px-5 pb-28 pt-28 md:px-10 md:pb-40 md:pt-36">
          <div aria-hidden="true" className="absolute -left-20 bottom-20 h-60 w-60 rounded-full bg-sun/70" />
          <div className="relative mx-auto max-w-7xl">
            <motion.div
              initial={reduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={reveal}
              transition={revealTransition()}
              className="paper-card relative overflow-visible rounded-[2.5rem_1.2rem_2rem_1.5rem] bg-sun p-7 md:p-12 lg:p-16"
            >
              <span aria-hidden="true" className="tape-strip -top-4 right-12 -rotate-3" />
              <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-8">
                  <SectionLabel>03 / Contact</SectionLabel>
                  <h2 className="mt-5 max-w-3xl text-balance font-display text-5xl font-bold leading-[1] tracking-[-0.03em] md:text-7xl">Mari bangun sesuatu yang berguna.</h2>
                </div>
                <div className="lg:col-span-4">
                  <p className="text-base leading-7 text-ink/68">Terbuka untuk kolaborasi, project web, maintenance, dan pengembangan produk digital.</p>
                  <a href="mailto:fauzanzha09@gmail.com" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-tosca px-6 py-3 font-display text-sm font-bold text-ink print-shadow transition-transform hover:-translate-y-0.5 active:translate-y-px motion-reduce:transition-none">Mulai Percakapan <Send size={16} strokeWidth={2.3} /></a>
                </div>
              </div>
            </motion.div>

            <div className="mt-10 grid gap-5 md:grid-cols-12">
              <a href="mailto:fauzanzha09@gmail.com" className="paper-card group rounded-[1.5rem_1rem_2rem_1.2rem] bg-white p-6 transition-transform hover:-translate-y-1 motion-reduce:transition-none md:col-span-5 md:-rotate-1">
                <Mail size={21} className="text-tosca-dark" aria-hidden="true" /><p className="mt-8 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/65">Email</p><p className="mt-2 break-all font-display text-base font-bold">fauzanzha09@gmail.com</p>
              </a>
              <a href="https://github.com/nnazuaff" target="_blank" rel="noreferrer" className="paper-card group rounded-[1rem_2rem_1.3rem_1.7rem] bg-sky p-6 transition-transform hover:-translate-y-1 motion-reduce:transition-none md:col-span-4 md:rotate-1">
                <Github size={21} className="text-tosca-dark" aria-hidden="true" /><p className="mt-8 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/65">GitHub</p><p className="mt-2 font-display text-base font-bold">github.com/nnazuaff</p>
              </a>
              <a href="https://www.instagram.com/nnzuaf" target="_blank" rel="noreferrer" aria-label="Instagram @nnzuaf" className="paper-card group rounded-[2rem_1.2rem_1.7rem_1rem] bg-white p-6 transition-transform hover:-translate-y-1 motion-reduce:transition-none md:col-span-3 md:-rotate-[0.5deg]">
                <Instagram size={21} className="text-tosca-dark" aria-hidden="true" /><p className="mt-8 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/65">Instagram</p><p className="mt-2 font-display text-base font-bold">@nnzuaf</p>
              </a>
            </div>
          </div>
        </section>

        <footer className="border-t-2 border-ink/10 bg-white/55 px-5 py-7 md:px-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 text-xs font-semibold text-ink/65 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Fauzan Zhahir Arrafi</p>
            <p className="font-display text-tosca-dark">Built with care in Bandung.</p>
          </div>
        </footer>
      </main>
      <style jsx global>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        html { scroll-behavior: auto; }
      `}</style>
    </ReactLenis>
  );
}
