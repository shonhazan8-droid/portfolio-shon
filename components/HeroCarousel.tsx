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

  const current = slides[index];
  const pad = (n: number) => String(n).padStart(2, "0");

  const arrowBtn =
    "flex h-10 w-10 items-center justify-center rounded-full transition-[opacity,transform] duration-150 ease-[var(--ease-out)] hover:opacity-80 active:scale-90";

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="group"
      aria-roledescription="carousel"
      aria-label="Selected work"
      className="grid gap-10 lg:grid-cols-[340px_minmax(0,1fr)] lg:items-stretch lg:gap-6"
    >
      {/* Text rail + controls + slide info card */}
      <div className="flex flex-col">
        <h2 className="text-2xl font-normal tracking-[-0.008em]">{heading}</h2>
        <p className="mt-2 max-w-[52ch] text-base leading-[1.55] text-[var(--color-text)]">{description}</p>

        {/* Nav: arrows below the text */}
        <div className="mt-8 flex items-center gap-3">
          <button onClick={() => go(-1)} aria-label="Previous" className={arrowBtn}>
            <ArrowCircle className="h-10 w-10" />
          </button>
          <button onClick={() => go(1)} aria-label="Next" className={arrowBtn}>
            <ArrowCircle className="h-10 w-10 -scale-x-100" />
          </button>
        </div>

        {/* Info card: follows the active slide */}
        <div
          key={current.src}
          aria-live="polite"
          className="info-fade mt-10 rounded-[var(--radius-frame)] bg-[var(--color-surface)] p-6 lg:mt-auto"
        >
          <span className="mb-4 inline-block rounded-full bg-[color-mix(in_srgb,var(--color-accent)_9%,transparent)] px-3 py-1.5 text-xs font-medium tracking-normal text-[var(--color-accent)]">
            {pad(index + 1)}/{pad(len)}
          </span>
          <h3 className="text-base tracking-[-0.008em]">
            {current.client ? (
              <span className="text-[var(--color-ink)]">{current.client} · </span>
            ) : null}
            <span className="font-medium text-[var(--color-ink)]">{current.name}</span>
          </h3>
          {current.description ? (
            <p className="mt-2 text-base leading-[1.55] text-[var(--color-text)]">{current.description}</p>
          ) : null}
        </div>
      </div>

      {/* Sliding frame */}
      <div className="relative aspect-[4/3] w-full self-center overflow-hidden rounded-[var(--radius-frame)] bg-[var(--color-surface)]">
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
    </div>
  );
}
