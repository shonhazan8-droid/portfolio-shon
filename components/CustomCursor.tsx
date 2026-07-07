"use client";
import { useEffect, useRef } from "react";

/**
 * Site-wide cursor replacement: a small solid dot, dark by default and
 * flipping to white whenever it sits over a dark-background element (so it
 * always stays readable, without the odd off-brand tints a real
 * mix-blend-mode: difference produces over colored surfaces like the accent
 * orange). Desktop pointer-fine only; reduced-motion and touch devices keep
 * the native cursor. Fades out while the case-cover bubble
 * (components/CursorBubble.tsx) is active, so the two never overlap.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    document.documentElement.classList.add("custom-cursor");

    let raf = 0;
    let x = 0, y = 0, tx = 0, ty = 0;
    let started = false;

    // Luminance of the nearest opaque background under a point, so the dot
    // can flip to white over dark surfaces (photos, dark sections, etc).
    const bgLuminance = (el: HTMLElement | null) => {
      while (el) {
        const bg = getComputedStyle(el).backgroundColor;
        const m = bg.match(/rgba?\(([^)]+)\)/);
        if (m) {
          const parts = m[1].split(",").map((n) => parseFloat(n));
          const [r, g, b, a = 1] = parts;
          if (a > 0.5) {
            const chan = (v: number) => {
              v /= 255;
              return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
            };
            return 0.2126 * chan(r) + 0.7152 * chan(g) + 0.0722 * chan(b);
          }
        }
        el = el.parentElement;
      }
      return 1; // default page background is white
    };

    const CLICKABLE = 'a, button, [role="button"], input, textarea, select, summary, label, [data-cursor-hover]';

    const tick = () => {
      x += (tx - x) * 0.35;
      y += (ty - y) * 0.35;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      const el = document.elementFromPoint(tx, ty) as HTMLElement | null;
      dot.classList.toggle("on-dark", bgLuminance(el) < 0.4);
      dot.classList.toggle("on-clickable", !!el?.closest(CLICKABLE));
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX; ty = e.clientY;
      if (!started) {
        started = true;
        x = tx; y = ty;
        dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        dot.classList.add("custom-cursor-visible");
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeaveWindow = () => dot.classList.remove("custom-cursor-visible");
    const onEnterWindow = () => { if (started) dot.classList.add("custom-cursor-visible"); };
    const onBubble = (e: Event) => {
      dot.classList.toggle("custom-cursor-hidden", (e as CustomEvent<boolean>).detail);
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);
    window.addEventListener("cursorbubble", onBubble);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);
      window.removeEventListener("cursorbubble", onBubble);
      document.documentElement.classList.remove("custom-cursor");
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={dotRef} aria-hidden="true" className="custom-cursor-dot">
      <div className="custom-cursor-dot-inner" />
    </div>
  );
}
