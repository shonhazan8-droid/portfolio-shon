import HomeContainer from "./HomeContainer";
import { experience } from "@/content/experience";

export default function About() {
  return (
    <section id="about" className="border-t border-[var(--color-line)] py-20 md:py-24">
      <HomeContainer className="grid gap-16 lg:grid-cols-[2fr_1fr] lg:gap-24">
        {/* Profile */}
        <div className="max-w-[640px]">
          {/* Portrait — black & white */}
          <div className="aspect-[4/5] w-[180px] overflow-hidden rounded-[18px] bg-[var(--color-surface)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Profile.png"
              alt="Shon Hazan"
              className="h-full w-full object-cover grayscale"
              draggable={false}
            />
          </div>

          <h2 className="mt-6 text-xl font-normal tracking-[-0.008em]">Shon Hazan</h2>
          <p className="mt-1 text-lg text-[var(--color-text)]">Designer &amp; Creative thinker</p>

          <p className="mt-8 max-w-[52ch] text-base leading-[1.55] text-[var(--color-ink)]">
            I build scalable product systems and structured interfaces — function over decoration.
            Today I design complex systems for government and enterprise, turning high-friction,
            regulated processes into clear, usable flows.
          </p>
        </div>

        {/* Experience */}
        <div>
          <h3 className="flex items-center gap-2 text-xl font-normal">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="var(--color-accent)" aria-hidden="true">
              <path d="M12 0c.5 6.2 5.3 11 11.5 11.5C17.3 12 12.5 16.8 12 23c-.5-6.2-5.3-11-11.5-11.5C6.7 11 11.5 6.2 12 0z" />
            </svg>
            Experience
          </h3>
          <p className="mt-1 text-[var(--color-text)]">Where I&apos;ve been</p>

          <ul className="mt-8">
            {experience.map((r) => (
              <li
                key={`${r.title}-${r.period}`}
                className="border-b border-[var(--color-line)] py-5 first:pt-0"
              >
                <div className="text-base font-normal tracking-[-0.008em] text-[var(--color-ink)]">{r.title}</div>
                <div className="mt-1 flex items-baseline justify-between gap-4">
                  <span className="text-[var(--color-text)]">{r.company}</span>
                  <span className="text-[var(--color-text)]">{r.period}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </HomeContainer>
    </section>
  );
}
