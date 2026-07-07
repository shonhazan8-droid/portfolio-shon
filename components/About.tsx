import HomeContainer from "./HomeContainer";
import Reveal from "./Reveal";
import { experience } from "@/content/experience";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-24">
      <Reveal>
      <HomeContainer className="grid gap-14 lg:grid-cols-[240px_1fr] lg:gap-20">
        {/* Left: portrait + meta */}
        <div className="flex flex-col">
          {/* Profile card: exported as-is from Figma (tilt, photo, name/role baked in) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Container.svg"
            alt="Shon Hazan — Product Designer"
            className="h-auto w-full max-w-[230px]"
            draggable={false}
          />
        </div>

        {/* Right: statement + intro + experience */}
        <div className="max-w-[640px]">
          <h2 className="text-[clamp(1.6rem,3vw,2.05rem)] font-normal leading-[1.25] tracking-[-0.014em]">
            I build scalable product systems.<br />
            Structure over decoration.
          </h2>
          <p className="mt-6 max-w-[62ch] text-base leading-[1.6] text-[var(--color-text)]">
            Today I design complex systems for government and enterprise, turning high-friction,
            regulated processes into clear, usable flows. I work best in cross-functional
            environments where the design problem sits inside a business problem.
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
