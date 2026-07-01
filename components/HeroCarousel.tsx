"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Slide } from "@/content/gallery";
import ArrowCircle from "./ArrowCircle";

const INTERVAL = 4500;

/**
 * Selected work: one large 4:3 image at a time, auto-advancing in a loop.
 * Pauses on hover. Text rail + nav controls on the left, image on the right.
 */
export default function HeroCarousel({
  slides,
  heading,
  description,
}: {
  slides: Slide[];
  heading: string;
  description: string;
}) {
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

  const arrowBtn =
    "flex h-10 w-10 items-center justify-center rounded-full transition-[opacity,transform] duration-150 ease-[var(--ease-out)] hover:opacity-80 active:scale-90";

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="group"
      aria-roledescription="carousel"
      aria-label="Selected work"
      className="grid gap-10 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-center lg:gap-16"
    >
      {/* Text rail + controls */}
      <div className="max-w-[52ch]">
        <h2 className="text-2xl font-normal tracking-[-0.008em]">{heading}</h2>
        <p className="mt-2 text-base leading-[1.55] text-[var(--color-text)]">{description}</p>

        {/* Nav: arrows below the text */}
        <div className="mt-8 flex items-center gap-3">
          <button onClick={() => go(-1)} aria-label="Previous" className={arrowBtn}>
            <ArrowCircle className="h-10 w-10" />
          </button>
          <button onClick={() => go(1)} aria-label="Next" className={arrowBtn}>
            <ArrowCircle className="h-10 w-10 -scale-x-100" />
          </button>
        </div>
      </div>

      {/* Frame + dots below the image */}
      <div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-frame)] bg-[var(--color-surface)]">
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
        </div>

        {/* Paging dots */}
        <div className="mt-5 flex items-center justify-center gap-1.5" role="tablist" aria-label="Choose slide">
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
    </div>
  );
}
