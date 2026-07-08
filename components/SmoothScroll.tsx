"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Site-wide smooth scrolling (Lenis). Eases wheel/touch scrolling and
 * anchor jumps for a calmer, weightier feel. Disabled entirely for
 * users who prefer reduced motion.
 */
export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      lerp: 0.1,
    });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Next scrolls the window to the top on route change, but Lenis keeps its
  // own virtual scroll position and can override that — leaving you partway
  // down the new page. Reset Lenis to the top whenever the path changes
  // (unless the URL targets an in-page anchor).
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) return;
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
