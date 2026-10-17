"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function useMotionPreference() {
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function Reveal({ children, className = "", delay = 0 }: {
  children: ReactNode; className?: string; delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });
  const reduced = useMotionPreference();
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  return (
    <motion.div ref={ref} className={className} initial={false}
      animate={ready && !reduced && !inView ? { opacity: 0, y: 16 } : { opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.6, delay: inView ? delay : 0, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}
