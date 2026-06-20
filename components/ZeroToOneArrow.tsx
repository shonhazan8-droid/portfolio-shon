"use client";
import Lottie from "lottie-react";
import arrowUp from "@/content/arrowUp.json";

export default function ZeroToOneArrow() {
  return (
    <span className="mx-[0.05em] inline-block h-[1.5em] w-[1.5em] rotate-90 align-[-0.45em] text-[var(--color-ink)]">
      <Lottie animationData={arrowUp} loop autoplay className="h-full w-full" />
    </span>
  );
}
