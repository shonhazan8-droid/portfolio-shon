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

function FileIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-4 w-4">
      <path d="M9.5 1.5H4.25a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V4.75L9.5 1.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M9.5 1.5v3.25h3.25M5.75 8.5h4.5M5.75 11h4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
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

const links = [
  {
    label: "Resume",
    href: "https://drive.google.com/file/d/1qKo8IO4lXuZ-khmXrRMzQStjYEVFvfIy/view?usp=sharing",
    icon: <FileIcon />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shon-hazan-095373199/?skipRedirect=true",
    icon: <LinkedInIcon />,
  },
];

export default function Contact() {
  return (
    <footer id="contact" className="bg-[var(--color-surface)] pt-20 pb-16 md:pt-24 md:pb-20">
      <Reveal>
      <HomeContainer>
        <p className="text-base tracking-[-0.02em] text-[var(--color-text)]">Contact</p>

        <div className="mt-5 flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-[1.875rem] font-normal leading-[1.3] tracking-[-0.044em] text-[var(--color-ink)]">
              Looking for the right
              <br />
              problem to own.
            </h2>
            <a
              href="mailto:Shonhazan8@gmail.com"
              className="group mt-7 inline-flex items-center gap-2.5 text-[17px] tracking-[-0.024em] text-[var(--color-ink)] no-underline transition-colors hover:text-[var(--color-accent)]"
            >
              <MailIcon />
              shonhazan8@gmail.com
              <ArrowUpRight className="h-[13px] w-[13px] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <ul className="w-full md:w-[200px]">
            {links.map((l) => (
              <li key={l.label} className="border-b border-black/[0.07]">
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-3.5 text-[15px] tracking-[-0.02em] text-[var(--color-ink)] no-underline transition-colors hover:text-[var(--color-accent)]"
                >
                  <span className="flex items-center gap-2.5">
                    {l.icon}
                    {l.label}
                  </span>
                  <ArrowUpRight className="h-[13px] w-[13px] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-16 text-center text-xs text-[var(--color-text)]">&copy; 2026 Designed by me.</p>
      </HomeContainer>
      </Reveal>
    </footer>
  );
}
