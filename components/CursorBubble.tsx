"use client";
import { useEffect, useRef } from "react";

/**
 * Cursor-follow bubble: while hovering the wrapped area, the native cursor
 * hides and a small accent pill ("Read case") trails the pointer with a
 * soft lerp. Desktop pointer-fine only; reduced-motion and touch devices
 * never see it. The bubble is pointer-events:none so clicks pass through.
 */
export default function CursorBubble({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  const areaRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const area = areaRef.current;
    const bubble = bubbleRef.current;
    if (!area || !bubble) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let raf = 0;
    let active = false;
    let x = 0, y = 0, tx = 0, ty = 0;

    const tick = () => {
      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      bubble.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (active || Math.abs(tx - x) + Math.abs(ty - y) > 0.5) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const onEnter = (e: PointerEvent) => {
      active = true;
      tx = e.clientX; ty = e.clientY;
      // First frame: appear at the pointer, no fly-in from a stale corner.
      x = tx; y = ty;
      bubble.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      area.classList.add("bubble-active");
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      tx = e.clientX; ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      active = false;
      area.classList.remove("bubble-active");
    };

    area.addEventListener("pointerenter", onEnter);
    area.addEventListener("pointermove", onMove);
    area.addEventListener("pointerleave", onLeave);
    return () => {
      area.removeEventListener("pointerenter", onEnter);
      area.removeEventListener("pointermove", onMove);
      area.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={areaRef} className={`cursor-bubble-area ${className}`}>
      {children}
      <div ref={bubbleRef} aria-hidden="true" className="cursor-bubble">
        <span className="cursor-bubble-pill">{label}</span>
      </div>
    </div>
  );
}
