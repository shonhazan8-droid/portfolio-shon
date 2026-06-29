"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import ArrowRight from "./ArrowRight";

type SiteHeaderProps = {
  variant?: "default" | "caseStudy";
};

export default function SiteHeader({ variant = "default" }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const isCaseStudy = variant === "caseStudy";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-20 border-b bg-[color-mix(in_srgb,var(--color-bg)_88%,transparent)] backdrop-blur-md transition-colors duration-200 ${
        scrolled ? "border-[var(--color-line)]" : "border-transparent"
      }`}
    >
      <div
        className="relative mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-6 md:px-8 xl:px-0"
      >
        <Link href="/" aria-label="Shon" className="inline-flex no-underline transition-opacity duration-150 hover:opacity-80" style={{ perspective: "500px" }}>
          <Image
            src="/Portal.svg"
            alt="Shon"
            width={40}
            height={40}
            priority
            className="logo-flip"
          />
        </Link>
        {!isCaseStudy ? (
          <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 gap-8 md:flex" aria-label="Main">
            {[["Case studies","/#cases"],["About","/#about"],["Contact","/#contact"]].map(([label,href])=>(
              <Link key={href} href={href} className="text-sm text-[var(--color-ink)] no-underline transition-colors hover:text-[var(--color-accent)]">{label}</Link>
            ))}
          </nav>
        ) : null}
        <Button href={isCaseStudy ? "/#cases" : "/#contact"} variant="primary" className="py-[9px]!">
          {isCaseStudy ? (
            <>
              <ArrowRight className="h-3 w-3 rotate-180" />
              Back
            </>
          ) : (
            <>
              Get in touch <ArrowRight className="h-3 w-3" />
            </>
          )}
        </Button>
      </div>
    </header>
  );
}
