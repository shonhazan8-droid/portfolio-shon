import HomeContainer from "./HomeContainer";
import Reveal from "./Reveal";
import ProfileCard from "./ProfileCard";
import { experience } from "@/content/experience";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-24">
      <Reveal>
      <HomeContainer className="grid gap-14 lg:grid-cols-[240px_1fr] lg:gap-20">
        {/* Left: portrait + meta */}
        <div className="flex flex-col">
          <ProfileCard />
        </div>

        {/* Right: statement + intro + experience */}
        <div className="max-w-[640px]">
          <h2 className="text-[clamp(1.6rem,3vw,2.05rem)] font-normal leading-[1.25] tracking-[-0.014em]">
            A bit about me
          </h2>
          <p className="mt-6 max-w-[62ch] text-base leading-[1.6] text-[var(--color-text)]">
            I&apos;m obsessed with understanding how things work, and always
            experimenting with better ways to design them. Over the past six years I&apos;ve
            worked across different industries and product types, which taught me to adapt
            quickly instead of relying on familiar patterns. AI is now a core part of that
            process, not as a replacement for thinking, but as a way to think better.
          </p>

          <ul className="mt-14">
            {experience.map((r) => (
              <li
                key={`${r.title}-${r.period}`}
                className="flex items-baseline justify-between gap-4 border-b border-[var(--color-line)] py-5 first:border-t"
              >
                <div>
                  <div className="text-base font-medium tracking-[-0.008em] text-[var(--color-ink)]">{r.title}</div>
                  <div className="mt-0.5 text-sm text-[var(--color-text)]">{r.company}</div>
                </div>
                <span className="whitespace-nowrap text-[var(--color-text)]">{r.period}</span>
              </li>
            ))}
          </ul>
        </div>
      </HomeContainer>
      </Reveal>
    </section>
  );
}
