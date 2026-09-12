"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Braces, Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { getNextNavigationState } from "./navigation-state";

const defaultItems = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const brandVariants: Variants = {
  expanded: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { type: "spring", damping: 17 },
  },
  collapsed: {
    opacity: 0,
    x: -16,
    rotate: -25,
    transition: { duration: 0.18 },
  },
};

const itemVariants: Variants = {
  expanded: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", damping: 18 },
  },
  collapsed: {
    opacity: 0,
    x: -12,
    scale: 0.96,
    transition: { duration: 0.14 },
  },
};

type AnimatedNavFramerProps = {
  items?: typeof defaultItems;
};

export function AnimatedNavFramer({
  items = defaultItems,
}: AnimatedNavFramerProps) {
  const [isExpanded, setExpanded] = React.useState(true);
  const [activeSection, setActiveSection] = React.useState("top");
  const shouldReduceMotion = useReducedMotion();
  const expandedRef = React.useRef(true);
  const lastScrollY = React.useRef(0);
  const scrollPositionOnCollapse = React.useRef(0);

  const updateExpanded = React.useCallback((expanded: boolean) => {
    expandedRef.current = expanded;
    setExpanded(expanded);
  }, []);

  React.useEffect(() => {
    const sections = items
      .map(({ href }) => document.getElementById(href.replace("#", "")))
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
  }, [items]);

  React.useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const latest = window.scrollY;
      if (shouldReduceMotion) {
        lastScrollY.current = latest;
        return;
      }

      const next = getNextNavigationState({
        isExpanded: expandedRef.current,
        latest,
        previous: lastScrollY.current,
        collapsePosition: scrollPositionOnCollapse.current,
      });

      if (next.isExpanded !== expandedRef.current) {
        updateExpanded(next.isExpanded);
      }
      scrollPositionOnCollapse.current = next.collapsePosition;
      lastScrollY.current = latest;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [shouldReduceMotion, updateExpanded]);

  return (
    <div className="pointer-events-none fixed left-1/2 top-3 z-40 -translate-x-1/2 sm:top-5">
      <motion.nav
        aria-label="Navigasi utama"
        initial={shouldReduceMotion ? false : { y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { type: "spring", damping: 22, stiffness: 320 }
        }
        className={cn(
          "pointer-events-auto relative flex h-[3.25rem] items-center overflow-hidden rounded-full border-2 border-ink/15 bg-paper/95 text-ink print-shadow backdrop-blur-sm transition-[max-width] duration-500 ease-out motion-reduce:transition-none",
          isExpanded
            ? "max-w-[calc(100vw-1rem)]"
            : "max-w-[3.25rem] justify-center",
        )}
      >
        <motion.div
          variants={brandVariants}
          animate={isExpanded ? "expanded" : "collapsed"}
          aria-hidden={!isExpanded}
          className="flex shrink-0 items-center gap-2 pl-2.5 pr-1.5 sm:pl-3 sm:pr-2"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-tosca text-ink">
            <Braces size={16} strokeWidth={2.5} />
          </span>
          <span className="font-display hidden whitespace-nowrap text-sm font-bold sm:inline">
            Fauzan Z.A.
          </span>
        </motion.div>

        <motion.div
          className={cn(
            "flex items-center gap-0 pr-1.5 sm:gap-1 sm:pr-2.5",
            !isExpanded && "pointer-events-none invisible",
          )}
          aria-hidden={!isExpanded}
        >
          {items.map((item) => {
            const section = item.href.replace("#", "");
            const active = activeSection === section;

            return (
              <motion.a
                key={item.href}
                href={item.href}
                variants={itemVariants}
                animate={isExpanded ? "expanded" : "collapsed"}
                tabIndex={isExpanded ? 0 : -1}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "relative whitespace-nowrap rounded-full px-2 py-2 font-display text-[11px] font-bold text-ink/65 transition-colors hover:bg-tosca/10 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tosca sm:px-2.5 sm:text-xs",
                  active && "bg-tosca text-ink hover:bg-tosca hover:text-ink",
                )}
              >
                {item.label}
              </motion.a>
            );
          })}
        </motion.div>

        {!isExpanded ? (
          <motion.button
            type="button"
            aria-label="Buka navigasi"
            aria-expanded="false"
            onClick={() => updateExpanded(true)}
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.06 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
            className="absolute inset-0 grid place-items-center rounded-full text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-tosca"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </motion.button>
        ) : null}
      </motion.nav>
    </div>
  );
}
