import Image from "next/image";
import { ArrowDown, ArrowUpRight, Github, Instagram, Mail, MapPin } from "lucide-react";
import { profile, socialLinks } from "@/lib/portfolio";
import { SectionNav } from "./experience";

export function BioCard() {
  const icons = [Github, Instagram, Mail];
  return (
    <div className="bio-stage">
      <div className="bio-card">
        <div className="bio-step avatar-wrap">
          <Image src={profile.avatar} alt="Foto Fauzan Zhahir Arrafi" width={88} height={88} priority className="avatar" />
          <span className="avatar-mark" aria-hidden="true">✳</span>
        </div>
        <div className="bio-step">
          <p className="profile-role">{profile.role}</p>
          <h1 id="profile-name" tabIndex={-1}>{profile.name}</h1>
          <p className="profile-location"><MapPin size={12} strokeWidth={1.5} aria-hidden="true" />{profile.location}</p>
        </div>
        <p className="bio-step profile-bio">{profile.bio}</p>
        <div className="bio-step">
          <div className="social-links" aria-label="Media sosial dan email">
            {socialLinks.map((link, index) => {
              const Icon = icons[index];
              return <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined} aria-label={`${link.label} ${link.handle}`} title={`${link.label} · ${link.handle}`}>
                <Icon size={19} strokeWidth={1.5} aria-hidden="true" />
              </a>;
            })}
          </div>
          <div className="bio-actions">
            <a href="#work" className="button button-primary">Lihat proyek<ArrowDown size={15} strokeWidth={1.6} aria-hidden="true" /></a>
            <a href="#contact" className="button button-quiet">Say hello<ArrowUpRight size={15} strokeWidth={1.6} aria-hidden="true" /></a>
          </div>
        </div>
      </div>
      <SectionNav />
    </div>
  );
}
