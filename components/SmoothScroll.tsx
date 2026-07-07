"use client";
import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Site-wide smooth scrolling (Lenis). Eases wheel/touch scrolling and
 * anchor jumps for a calmer, weightier feel. Disabled entirely for
 * users who prefer reduced motion.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      lerp: 0.1,
    });
    return () => lenis.destroy();
  }, []);
  return null;
}
