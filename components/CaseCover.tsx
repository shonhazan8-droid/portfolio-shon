"use client";
import { useEffect, useRef, useState } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";

type Props = { src: string; label: string };

export default function CaseCover({ src, label }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const reduced = useRef(false);
  const [data, setData] = useState<object | null>(null);
  const [inView, setInView] = useState(false);

  // Observe visibility; preload a little before entering the viewport.
  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "300px 0px", threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Fetch the (large) JSON only once, the first time it nears the viewport.
  useEffect(() => {
    if (!inView || data) return;
    let cancelled = false;
    fetch(src)
      .then((r) => r.json())
      .then((json) => { if (!cancelled) setData(json); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [inView, data, src]);

  // Lottie's own `autoplay` starts the loop reliably once data mounts (the JSON
  // is only fetched while in view). This effect just pauses offscreen / on
  // reduced-motion and resumes when it comes back.
  useEffect(() => {
    const l = lottieRef.current;
    if (!l || !data) return;
    if (inView && !reduced.current) l.play();
    else l.pause();
  }, [inView, data]);

  return (
    <div
      ref={containerRef}
      className="relative flex aspect-[752/480] w-full items-center justify-center overflow-hidden rounded-[var(--radius-frame)] bg-[var(--color-surface)]"
    >
      {data ? (
        <Lottie
          lottieRef={lottieRef}
          animationData={data}
          loop
          autoplay
          className="h-full w-full"
          rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
        />
      ) : (
        <span className="font-mono text-[11px] uppercase tracking-[.06em] text-[var(--color-text)]">
          {label}
        </span>
      )}
    </div>
  );
}
