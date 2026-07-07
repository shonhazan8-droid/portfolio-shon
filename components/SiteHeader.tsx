"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import ArrowRight from "./ArrowRight";

type SiteHeaderProps = {
  variant?: "default" | "caseStudy";
};

const resumeHref = "https://drive.google.com/file/d/1qKo8IO4lXuZ-khmXrRMzQStjYEVFvfIy/view?usp=sharing";

export default function SiteHeader({ variant = "default" }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const isCaseStudy = variant === "caseStudy";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isCaseStudy) {
    return (
      <header className="sticky top-0 z-20 px-4 pt-3 md:px-6">
        <Button
          href="/#cases"
          variant="ghost"
          transition
          className="border-transparent! py-[9px]! text-[16px]! text-[var(--color-ink)]! hover:border-transparent! hover:opacity-90"
          style={{ backgroundColor: "var(--color-surface)" }}
        >
          <ArrowRight className="h-3 w-3 rotate-180" />
          Back
        </Button>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-20 px-4 pt-3 md:px-6">
      <div
        className={`header-drop relative mx-auto flex h-16 w-full items-center justify-between rounded-full border pl-6 pr-3 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
          scrolled
            ? "max-w-[752px] border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-surface)_85%,transparent)] backdrop-blur-xl"
            : "max-w-[1027px] border-transparent bg-[var(--color-surface)]"
        }`}
      >
        <Link href="/" aria-label="Shon" className="inline-flex items-center gap-1.5 no-underline transition-opacity duration-150 hover:opacity-80" style={{ perspective: "500px" }}>
          <Image
            src="/Portal.svg"
            alt=""
            width={36}
            height={36}
            priority
            className="logo-flip"
          />
          <span className="text-[16px] font-medium tracking-[-0.04em] text-[#201B21]" style={{ fontFamily: "var(--font-open-runde)" }}>Shon hazan</span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <nav className="flex items-center gap-8" aria-label="Main">
            {[["Work","/#cases"],["About","/#about"],["Contact","/#contact"]].map(([label,href])=>(
              <Link key={href} href={href} className="text-sm text-[var(--color-ink)] no-underline transition-colors hover:text-[var(--color-accent)]">{label}</Link>
            ))}
          </nav>
          <Button
            href={resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="py-[9px]!"
          >
            Resume
          </Button>
        </div>
        <Button
          href={resumeHref}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          className="py-[9px]! md:hidden"
        >
          Resume
        </Button>
      </div>
    </header>
  );
}
