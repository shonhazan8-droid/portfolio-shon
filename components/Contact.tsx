import Image from "next/image";
import Link from "next/link";
import HomeContainer from "./HomeContainer";
import Reveal from "./Reveal";

function ArrowUpRight({ className = "h-[13px] w-[13px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 13 13" fill="none" aria-hidden="true" className={className}>
      <path d="M3.5 9.5 9.5 3.5M4.75 3.5h4.75v4.75" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-4 w-4">
      <rect x="1.5" y="3" width="13" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="m2.5 4.5 5.5 4 5.5-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="h-4 w-4">
      <path d="M13.6 1H2.4A1.4 1.4 0 0 0 1 2.4v11.2A1.4 1.4 0 0 0 2.4 15h11.2a1.4 1.4 0 0 0 1.4-1.4V2.4A1.4 1.4 0 0 0 13.6 1ZM5.2 12.9H3.1V6.2h2.1v6.7ZM4.15 5.3a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4Zm8.75 7.6h-2.1V9.65c0-.78-.02-1.78-1.09-1.78-1.09 0-1.25.85-1.25 1.72v3.31H6.35V6.2h2v.92h.03a2.2 2.2 0 0 1 1.98-1.09c2.12 0 2.54 1.4 2.54 3.22v3.65Z" />
    </svg>
  );
}

const emailHref = "mailto:Shonhazan8@gmail.com";
const linkedInHref = "https://www.linkedin.com/in/shon-hazan-095373199/?skipRedirect=true";

export default function Contact() {
  return (
    <footer id="contact" className="bg-[var(--color-bg)]">
      <Reveal>
        <HomeContainer>
          <div className="grid gap-14 py-20 md:grid-cols-[1fr_auto] md:items-end md:py-24">
            <div>
              <Link
                href="/"
                aria-label="Shon Hazan home"
                className="inline-flex items-center gap-1.5 no-underline transition-opacity duration-150 hover:opacity-80"
              >
                <Image src="/Portal.svg" alt="" width={36} height={36} className="h-9 w-9" />
              </Link>

              <h2 className="mt-12 text-[1.875rem] font-normal leading-[1.3] tracking-[-0.04em] text-[var(--color-ink)]">
                <span className="block">Looking for the right</span>
                <span className="block">problem to own.</span>
              </h2>
            </div>

            <nav aria-label="Footer links" className="flex flex-col items-start gap-3 md:items-end">
              <a
                href={emailHref}
                className="group inline-flex items-center gap-2.5 text-[17px] tracking-[-0.024em] text-[var(--color-ink)] no-underline transition-colors hover:text-[var(--color-accent)]"
              >
                <MailIcon />
                shonhazan8@gmail.com
                <ArrowUpRight className="h-[13px] w-[13px] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href={linkedInHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-surface)] px-5 py-3 text-sm font-medium text-[var(--color-ink)] no-underline transition-[transform,background-color,color] duration-150 ease-[var(--ease-out)] hover:-translate-y-px hover:bg-[color-mix(in_srgb,var(--color-accent)_9%,var(--color-surface))] hover:text-[var(--color-accent)] active:translate-y-0"
              >
                <LinkedInIcon />
                LinkedIn
                <ArrowUpRight className="h-[13px] w-[13px] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </nav>
          </div>
        </HomeContainer>
        <div className="bg-[var(--color-surface)]">
          <HomeContainer>
            <p className="py-5 text-center text-xs text-[var(--color-text)]">&copy; 2026 Designed &amp; built by me.</p>
          </HomeContainer>
        </div>
      </Reveal>
    </footer>
  );
}
