"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ReactLenis } from "lenis/react";
import { Pause, Play } from "lucide-react";
import { backgroundMedia } from "@/lib/portfolio";
import { shouldPlayVideo } from "./experience-state";
import { useMotionPreference } from "./reveal";

function CustomCursor() {
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const hide = () => {
      root.classList.remove("custom-cursor-active");
      if (cursor.current) cursor.current.style.opacity = "0";
    };
    const move = (event: PointerEvent) => {
      const element = cursor.current;
      if (!element) return;
      if (event.pointerType !== "mouse" || !(event.target instanceof Element)
        || event.target.closest('input, textarea, select, [contenteditable="true"]')) {
        hide();
        return;
      }
      element.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      element.dataset.interactive = String(Boolean(event.target.closest('a[href], button:not(:disabled), [role="button"]')));
      element.style.opacity = "1";
      root.classList.add("custom-cursor-active");
    };
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Tab") hide();
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", move, { passive: true });
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    window.addEventListener("keydown", keydown);
    return () => {
      hide();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", move);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      window.removeEventListener("keydown", keydown);
    };
  }, []);

  return <div ref={cursor} className="custom-cursor" aria-hidden="true" />;
}

function AmbientLight() {
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const smoothX = useSpring(x, { stiffness: 65, damping: 25 });
  const smoothY = useSpring(y, { stiffness: 65, damping: 25 });

  useEffect(() => {
    const move = (event: PointerEvent) => {
      x.set(event.clientX - 300);
      y.set(event.clientY - 300);
    };
    const leave = () => { x.set(-900); y.set(-900); };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [x, y]);

  return <motion.div aria-hidden="true" className="ambient-light" style={{ x: smoothX, y: smoothY }} />;
}

export function SectionNav() {
  const [active, setActive] = useState("top");
  const reduced = useMotionPreference();

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section]")).reverse();
    let observer: IntersectionObserver;
    const observe = () => {
      observer?.disconnect();
      const visible = new Set<string>();
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const current = sections.find((section) => visible.has(section.id));
        if (current) setActive(current.id);
      }, { rootMargin: `-96px 0px -${Math.round(innerHeight * 0.65)}px 0px`, threshold: 0 });
      sections.forEach((section) => observer.observe(section));
    };
    observe();
    window.addEventListener("resize", observe);
    return () => { observer.disconnect(); window.removeEventListener("resize", observe); };
  }, []);

  return (
    <div className="nav-slot">
      <nav aria-label="Navigasi portofolio" className={`section-nav${active !== "top" ? " is-docked" : ""}`}>
        {[["top", "Home"], ["about", "Tentang"], ["work", "Proyek"], ["stack", "Keahlian"], ["contact", "Kontak"]].map(([id, label]) => (
          <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined}>
            {active === id && (reduced ? <span className="nav-indicator" data-nav-indicator="" aria-hidden="true" /> : (
              <motion.span layoutId="portfolio-nav-indicator" className="nav-indicator" data-nav-indicator="" aria-hidden="true"
                initial={false} transition={{ type: "spring", stiffness: 420, damping: 36 }} />
            ))}
            <span className="nav-label">{label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}

export function Experience({ children }: { children: ReactNode }) {
  const reduceMotion = useMotionPreference();
  const [entered, setEntered] = useState(false);
  const [gateOpen, setGateOpen] = useState(true);
  const [requested, setRequested] = useState(false);
  const [manualPlayback, setManualPlayback] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const [finePointer, setFinePointer] = useState(false);
  const [visible, setVisible] = useState(true);
  const [heroVisible, setHeroVisible] = useState(true);
  const video = useRef<HTMLVideoElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const gateButton = useRef<HTMLButtonElement>(null);

  const playVideo = useCallback(() => {
    const element = video.current;
    if (!element) return;
    if (!element.getAttribute("src")) element.src = backgroundMedia.src;
    element.play().catch((error: DOMException) => {
      if (error.name !== "AbortError") setRequested(false);
    });
  }, []);

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    setSaveData(Boolean(connection?.saveData));
    const pointer = matchMedia("(hover: hover) and (pointer: fine)");
    const updatePointer = () => setFinePointer(pointer.matches);
    updatePointer();
    pointer.addEventListener("change", updatePointer);
    return () => pointer.removeEventListener("change", updatePointer);
  }, []);

  useEffect(() => {
    const update = () => setVisible(document.visibilityState === "visible");
    update();
    document.addEventListener("visibilitychange", update);
    const hero = document.getElementById("top");
    const observer = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), { threshold: 0 });
    if (hero) observer.observe(hero);
    return () => { document.removeEventListener("visibilitychange", update); observer.disconnect(); };
  }, []);

  useEffect(() => {
    if (!gateOpen) return;
    const previousOverflow = document.body.style.overflow;
    const previousRestoration = window.history.scrollRestoration;
    const pageContent = content.current;
    const resetScroll = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    window.history.scrollRestoration = "manual";
    document.body.style.overflow = "hidden";
    pageContent?.setAttribute("inert", "");
    resetScroll();
    const frame = requestAnimationFrame(resetScroll);
    window.addEventListener("scroll", resetScroll, { passive: true });
    window.addEventListener("load", resetScroll);
    gateButton.current?.focus({ preventScroll: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", resetScroll);
      window.removeEventListener("load", resetScroll);
      window.history.scrollRestoration = previousRestoration;
      document.body.style.overflow = previousOverflow;
      pageContent?.removeAttribute("inert");
    };
  }, [gateOpen]);

  useEffect(() => {
    const shouldPlay = shouldPlayVideo({
      entered, requested, manualPlayback, reducedMotion: Boolean(reduceMotion),
      saveData, visible, heroVisible, failed,
    });
    if (shouldPlay) playVideo();
    else video.current?.pause();
  }, [entered, requested, manualPlayback, reduceMotion, saveData, visible, heroVisible, failed, playVideo]);

  const enter = () => {
    const allowPlayback = !matchMedia("(prefers-reduced-motion: reduce)").matches && !saveData;
    // Keep play inside the gesture; never wait for the media before opening the page.
    if (allowPlayback) playVideo();
    setRequested(allowPlayback);
    setEntered(true);
    setGateOpen(false);
  };

  const toggleVideo = () => {
    if (requested && playing) setRequested(false);
    else { setManualPlayback(true); setRequested(true); playVideo(); }
  };

  return (
    <div className={`experience${entered ? " has-entered" : ""}`}>
      <div aria-hidden="true" className="hero-backdrop">
        <video
          ref={video}
          poster={backgroundMedia.poster}
          muted loop playsInline preload="none" tabIndex={-1}
          className={`hero-video${failed ? " is-unavailable" : ""}`}
          onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
          onError={() => { setFailed(true); setRequested(false); }}
        />
        <div className="hero-shade" />
      </div>
      {finePointer && reduceMotion === false && <CustomCursor />}
      {entered && !reduceMotion && finePointer && <AmbientLight />}
      {entered && !reduceMotion && <ReactLenis root options={{ autoRaf: true, lerp: 0.085, smoothWheel: true, syncTouch: false, anchors: true }} />}
      <div ref={content} className="page-content" aria-hidden={gateOpen || undefined}>
        {children}
        <button type="button" className="media-control" onClick={toggleVideo} disabled={failed}
          aria-label={failed ? "Video tidak tersedia" : playing ? "Jeda video latar" : "Putar video latar"}>
          {playing ? <Pause size={13} aria-hidden="true" /> : <Play size={13} aria-hidden="true" />}
          <span>{failed ? "Latar statis" : playing ? "Jeda latar" : "Putar latar"}</span>
        </button>
        <span className="sr-only" role="status">{failed ? "Video tidak tersedia. Latar statis tetap ditampilkan." : ""}</span>
      </div>
      <AnimatePresence onExitComplete={() => {
        if (entered) document.getElementById("profile-name")?.focus({ preventScroll: true });
      }}>
        {gateOpen && (
          <motion.button ref={gateButton} type="button" data-entry-gate="" aria-label="Click anywhere to enter"
            className="entry-gate" onClick={enter} initial={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}>
            <span className="entry-monogram" aria-hidden="true">f<span>.</span></span>
            <span className="entry-prompt">Click anywhere to enter</span>
            <span className="entry-hint">klik atau tekan Enter</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
