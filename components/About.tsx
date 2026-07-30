import HomeContainer from "./HomeContainer";
import Reveal from "./Reveal";
import ProfileCard from "./ProfileCard";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-24">
      <Reveal>
      <HomeContainer className="grid gap-14 lg:grid-cols-[240px_1fr] lg:gap-20">
        {/* Left: portrait + meta */}
        <div className="flex flex-col">
          <ProfileCard />
        </div>

        {/* Right: statement + intro */}
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
        </div>
      </HomeContainer>
      </Reveal>
    </section>
  );
}
