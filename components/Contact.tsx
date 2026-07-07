import Image from "next/image";
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
    <Image src="/mailicon.svg" alt="" width={20} height={16} className="h-4 w-auto" />
  );
}

const emailHref = "mailto:Shonhazan8@gmail.com";
const linkedInHref = "https://www.linkedin.com/in/shon-hazan-095373199/?skipRedirect=true";

export default function Contact() {
  return (
    <footer id="contact" className="bg-[var(--color-bg)]">
      <Reveal>
        <HomeContainer>
          <div className="grid gap-14 pt-20 pb-10 md:grid-cols-[1fr_auto] md:items-end md:pt-24 md:pb-14">
            <div>
              <p className="mb-4 text-sm font-normal text-[var(--color-text)]">Contact</p>
              <h2 className="text-[1.875rem] font-normal leading-[1.3] tracking-[-0.04em] text-[var(--color-ink)]">
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
                LinkedIn
                <ArrowUpRight className="h-[13px] w-[13px] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </nav>
          </div>
        </HomeContainer>
        <div className="bg-[var(--color-surface)] py-4">
          <p className="text-center text-xs text-[var(--color-text)]">&copy; 2026 Designed &amp; built by me.</p>
        </div>
      </Reveal>
    </footer>
  );
}
