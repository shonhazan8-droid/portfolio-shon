"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Slide } from "@/content/gallery";
import ArrowRight from "./ArrowRight";

const INTERVAL = 4500;

/**
 * Selected work — one large 4:3 image at a time, auto-advancing in a loop.
 * Pauses on hover. No captions (handled separately later).
 */
export default function HeroCarousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedRef = useRef(false);
  const len = slides.length;

  const go = useCallback((dir: number) => {
    setIndex((i) => (i + dir + len) % len);
  }, [len]);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (paused || reducedRef.current || len <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % len), INTERVAL);
    return () => clearInterval(id);
  }, [paused, len]);

  if (len === 0) return null;

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="group"
      aria-roledescription="carousel"
      aria-label="Selected work"
    >
      {/* Frame — one screen at a time */}
      <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-frame)] bg-[var(--color-surface)]">
        <div
          className="flex h-full will-change-transform transition-transform duration-[850ms] ease-[var(--ease-gallery)]"
          style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
        >
          {slides.map((s, i) => (
            <div
              key={s.src}
              className="h-full w-full shrink-0 bg-[var(--color-surface)]"
              aria-hidden={i !== index}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.src}
                alt={s.name}
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Arrows — fade in on hover/focus, stay reachable by keyboard */}
        <button
          onClick={() => go(-1)}
          aria-label="Previous"
          className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-surface)_85%,transparent)] text-[var(--color-ink)] opacity-0 backdrop-blur-sm transition-[opacity,border-color,transform] duration-200 ease-[var(--ease-out)] hover:border-[var(--color-ink)] focus-visible:opacity-100 active:scale-90 group-hover:opacity-100"
        >
          <ArrowRight className="h-3.5 w-3.5 -scale-x-100" />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next"
          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-surface)_85%,transparent)] text-[var(--color-ink)] opacity-0 backdrop-blur-sm transition-[opacity,border-color,transform] duration-200 ease-[var(--ease-out)] hover:border-[var(--color-ink)] focus-visible:opacity-100 active:scale-90 group-hover:opacity-100"
        >
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Paging dots */}
      <div className="mt-4 flex items-center justify-center gap-1.5" role="tablist" aria-label="Choose slide">
        {slides.map((s, i) => (
          <button
            key={s.src}
            onClick={() => setIndex(i)}
            role="tab"
            aria-selected={i === index}
            aria-label={`Show slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ease-[var(--ease-out)] ${
              i === index ? "w-5 bg-[var(--color-ink)]" : "w-1.5 bg-[var(--color-line)] hover:bg-[var(--color-text)]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
