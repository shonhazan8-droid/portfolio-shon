"use client";
import { useEffect, useRef } from "react";

/**
 * About-section portrait: a slow idle float (CSS keyframe on a wrapper) plus
 * a light cursor-following 3D tilt on the image itself, so the two motions
 * compose instead of fighting over the same transform. Desktop pointer-fine
 * only; reduced-motion and touch devices get the static card.
 */
export default function ProfileCard() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      img.style.transform = `scale(1.04) rotateX(${(-py * 22).toFixed(2)}deg) rotateY(${(px * 22).toFixed(2)}deg)`;
    };
    const onLeave = () => {
      img.style.transform = "";
    };

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className="profile-card-wrap">
      <div className="profile-card-float">
        {/* Profile card: exported as-is from Figma (tilt, photo, name/role baked in) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src="/Container.svg"
          alt="Shon Hazan — Product Designer"
          className="profile-card-img h-auto w-full max-w-[230px]"
          draggable={false}
        />
      </div>
    </div>
  );
}
