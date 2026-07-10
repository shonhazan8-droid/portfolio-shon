"use client";
import { useEffect, useRef } from "react";

/**
 * About-section portrait: a slow idle float plus a pointer-led 3D tilt that
 * follows the cursor across the page. Desktop pointer-fine only; reduced-motion
 * and touch devices get the static card.
 */
export default function ProfileCard() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const card = cardRef.current;
    if (!wrap || !card) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      const centerX = r.left + r.width / 2;
      const centerY = r.top + r.height / 2;
      const px = clamp((e.clientX - centerX) / (window.innerWidth * 0.5), -1, 1);
      const py = clamp((e.clientY - centerY) / (window.innerHeight * 0.5), -1, 1);

      wrap.classList.add("is-hovered");
      wrap.style.setProperty("--profile-tilt-x", `${(-py * 7).toFixed(2)}deg`);
      wrap.style.setProperty("--profile-tilt-y", `${(px * 9).toFixed(2)}deg`);
      wrap.style.setProperty("--profile-shadow-x", `${(-px * 16).toFixed(2)}px`);
      wrap.style.setProperty("--profile-shadow-y", `${(18 - py * 10).toFixed(2)}px`);
    };
    const onLeave = () => {
      wrap.classList.remove("is-hovered");
      wrap.style.removeProperty("--profile-tilt-x");
      wrap.style.removeProperty("--profile-tilt-y");
      wrap.style.removeProperty("--profile-shadow-x");
      wrap.style.removeProperty("--profile-shadow-y");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className="profile-card-wrap">
      <div className="profile-card-float">
        <div ref={cardRef} className="profile-card-depth">
          {/* Profile card: exported as-is from Figma (tilt, photo, name/role baked in) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Container.svg"
            alt="Shon Hazan — Product Designer"
            className="profile-card-img h-auto w-full max-w-[230px]"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
