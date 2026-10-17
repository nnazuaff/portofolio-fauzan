import Image from "next/image";
import { ArrowUpRight, Github, Instagram, Mail } from "lucide-react";
import { projects, socialLinks, stackCategories } from "@/lib/portfolio";
import { Reveal } from "./reveal";

export function Sections() {
  const icons = [Github, Instagram, Mail];
  return (
    <div className="sections-shell">
      <section id="about" data-section className="section about-section">
        <Reveal className="about-layout">
          <p className="section-label"><span>01</span> Sedikit tentang saya</p>
          <div>
            <h2>Senang merapikan hal rumit.<br /><span>Lewat web, salah satunya.</span></h2>
            <p className="body-copy">Saya Fauzan, siswa SMK jurusan Rekayasa Perangkat Lunak di Bandung. Saya mengerjakan web dari perancangan database, backend, antarmuka, integrasi API, sampai deployment.</p>
            <p className="body-copy">Banyak bekerja dengan Laravel dan Livewire. Yang saya cari sederhana: sistem yang jalan, mudah dipakai, dan nggak menyulitkan orang yang merawatnya nanti.</p>
          </div>
        </Reveal>
      </section>

      <section id="work" data-section className="section projects-section">
        <Reveal className="section-heading">
          <div><p className="section-label"><span>02</span> Beberapa yang saya kerjakan</p><h2>Proyek pilihan<span className="accent-dot">.</span></h2></div>
          <p className="section-aside">Web untuk bisnis, sekolah,<br className="hidden sm:block" /> dan ide yang ingin dicoba.</p>
        </Reveal>
        <div className="project-list">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={(index % 2) * 0.06}>
              <article className={`project-row${project.image ? "" : " project-row-text"}`}>
                {project.image && (
                  <div className="project-image">
                    <div className="project-image-inner"><Image src={project.image.src} alt={project.image.alt} fill sizes="(max-width: 767px) calc(100vw - 40px), 470px" className="object-contain" /></div>
                  </div>
                )}
                <div className="project-info">
                  <div className="project-meta"><span className="project-index">{String(index + 1).padStart(2, "0")}</span><span>{project.role}</span><span className={`project-status${project.status === "IN PROGRESS" ? " in-progress" : ""}`}>{project.status === "IN PROGRESS" ? "Dikerjakan" : "Selesai"}</span></div>
                  <p className="project-type">{project.type}</p>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <ul className="tag-list" aria-label={`Teknologi ${project.title}`}>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                  {project.visitUrl && <a href={project.visitUrl} target={project.visitUrl.startsWith("http") ? "_blank" : undefined} rel={project.visitUrl.startsWith("http") ? "noopener noreferrer" : undefined} className="text-link" aria-label={`Lihat website ${project.title}`}>Lihat website<ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" /></a>}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="stack" data-section className="section stack-section">
        <Reveal className="section-heading">
          <div><p className="section-label"><span>03</span> Tools of the trade</p><h2>Di balik layarnya<span className="accent-dot">.</span></h2></div>
          <p className="section-aside">Pilih alat yang sesuai.<br />Bukan sekadar ikut ramai.</p>
        </Reveal>
        <div className="stack-list">
          {stackCategories.map((category, index) => (
            <Reveal key={category.label} delay={index * 0.04}>
              <div className="stack-row"><div><h3>{category.label}</h3><p>{category.detail}</p></div><ul className="skill-list">{category.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="contact" data-section className="section contact-section">
        <Reveal>
          <p className="section-label"><span>04</span> Selalu berawal dari obrolan</p>
          <h2>Ada yang bisa<br />kita <span>kerjakan bareng?</span></h2>
          <p className="body-copy">Project baru, web yang perlu dirapikan, atau sekadar tukar ide. Cerita dulu aja.</p>
          <a className="button button-primary contact-button" href="mailto:fauzanzha09@gmail.com">Kirim email<ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" /></a>
          <div className="contact-links">{socialLinks.map((link, index) => {
            const Icon = icons[index];
            return <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}><Icon size={15} strokeWidth={1.5} aria-hidden="true" /><span>{link.label === "Email" ? link.handle : link.label}</span><ArrowUpRight size={12} aria-hidden="true" /></a>;
          })}</div>
        </Reveal>
      </section>
      <footer className="site-footer"><p>© 2026 Fauzan Zhahir Arrafi</p><a href="#top">Kembali ke atas ↑</a></footer>
    </div>
  );
}
