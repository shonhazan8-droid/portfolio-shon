"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Slide } from "@/content/gallery";
import ArrowCircle from "./ArrowCircle";

const INTERVAL = 4500;

/**
 * Selected work carousel. Two layouts share one state:
 *  - Desktop (lg+): text rail + info card on the left, large image on the right.
 *  - Mobile (<lg): a swipeable full-width image stacked over the info card,
 *    with a dot indicator. Both auto-advance and honor reduced motion.
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
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
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

  // Pause autoplay only over the interactive/content bits (image, info card,
  // arrows) — not the heading/description above them.
  const pauseHandlers = {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
  };

  // Horizontal swipe on touch devices → previous/next slide.
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const startX = touchStartX.current;
    const startY = touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;
    if (startX == null || startY == null) return;
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;

    // A vertical page scroll often includes a little horizontal drift. Only
    // change slides when the gesture is clearly horizontal, so scrolling past
    // the gallery never advances it accidentally.
    if (Math.abs(dx) < 40 || Math.abs(dx) <= Math.abs(dy) * 1.25) return;
    go(dx < 0 ? 1 : -1);
  };

  // Shared sliding track of images (used by both layouts).
  const track = (
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
  );

  const infoCardInner = (
    <>
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
    </>
  );

  return (
    <div role="group" aria-roledescription="carousel" aria-label="Selected work">
      {/* ---------- Desktop (lg+) ---------- */}
      <div className="hidden lg:grid lg:grid-cols-[340px_minmax(0,1fr)] lg:items-stretch lg:gap-6">
        {/* Text rail + controls + slide info card */}
        <div className="flex flex-col">
          <h2 className="max-w-[290px] text-2xl font-normal tracking-[-0.008em]">{heading}</h2>
          <p className="mt-2 max-w-[290px] text-base leading-[1.55] text-[var(--color-text)]">{description}</p>

          {/* Nav: arrows below the text */}
          <div {...pauseHandlers} className="mt-8 flex w-fit items-center gap-3">
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
            {...pauseHandlers}
            aria-live="polite"
            className="info-fade mt-10 rounded-[36px] [corner-shape:squircle] bg-[var(--color-surface)] p-6 lg:mt-auto"
          >
            {infoCardInner}
          </div>
        </div>

        {/* Sliding frame */}
        <div
          {...pauseHandlers}
          className="relative aspect-[4/3] w-full self-center overflow-hidden rounded-[36px] [corner-shape:squircle] bg-[var(--color-surface)]"
        >
          {track}
        </div>
      </div>

      {/* ---------- Mobile (<lg) ---------- */}
      <div className="lg:hidden">
        <h2 className="text-2xl font-normal tracking-[-0.008em]">{heading}</h2>
        <p className="mt-2 text-base leading-[1.55] text-[var(--color-text)]">{description}</p>

        {/* Swipeable frame — pan-y lets the page scroll vertically while we
            capture horizontal swipes. */}
        <div
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="relative mt-6 aspect-[4/3] w-full touch-pan-y select-none overflow-hidden rounded-[36px] [corner-shape:squircle] bg-[var(--color-surface)]"
        >
          {track}
        </div>

        {/* Info card */}
        <div aria-live="polite" className="mt-4 grid">
          {slides.map((slide, i) => (
            <div
              key={slide.src}
              aria-hidden={i !== index}
              className={`col-start-1 row-start-1 rounded-[36px] [corner-shape:squircle] bg-[var(--color-surface)] p-6 transition-opacity duration-300 ease-[var(--ease-out)] ${
                i === index ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <span className="mb-4 inline-block rounded-full bg-[color-mix(in_srgb,var(--color-accent)_9%,transparent)] px-3 py-1.5 text-xs font-medium tracking-normal text-[var(--color-accent)]">
                {pad(i + 1)}/{pad(len)}
              </span>
              <h3 className="text-base tracking-[-0.008em]">
                {slide.client ? <span className="text-[var(--color-ink)]">{slide.client} · </span> : null}
                <span className="font-medium text-[var(--color-ink)]">{slide.name}</span>
              </h3>
              {slide.description ? (
                <p className="mt-2 text-base leading-[1.55] text-[var(--color-text)]">{slide.description}</p>
              ) : null}
            </div>
          ))}
        </div>

        {/* Dot indicator */}
        <div className="mt-6 flex justify-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.src}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all duration-300 ease-[var(--ease-out)] ${
                i === index
                  ? "w-6 bg-[var(--color-accent)]"
                  : "w-2 bg-[color-mix(in_srgb,var(--color-ink)_15%,transparent)]"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
