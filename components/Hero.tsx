import Image from "next/image";
import Button from "./Button";
import HomeContainer from "./HomeContainer";
import ArrowRight from "./ArrowRight";
import ZeroToOneArrow from "./ZeroToOneArrow";

export default function Hero() {
  return (
    <section className="py-16 md:py-20">
      <HomeContainer>
        <div className="max-w-[660px]">
          <Image
            src="/yoe-badge.svg"
            alt="6+ years of experience"
            width={69}
            height={26}
            priority
            className="rise mb-3 h-auto w-[60px] md:w-[69px]"
          />
        <h1
          className="rise rise-1 max-w-[18ch] text-balance font-normal leading-[1.22] tracking-[-0.015em]"
          style={{ fontSize: "clamp(1.625rem, 2.9vw, 2.125rem)" }}
        >
          Product Designer
          <br />
          bringing an AI mindset
          <br />
          to B2C &amp; B2B
        </h1>
        <div
          className="rise rise-1 mt-6 max-w-[52ch] text-[var(--font-size-body-lg)] leading-[1.55]"
          style={{ color: "var(--color-ink)" }}
        >
          I have worked on B2B, B2C and internal tools. Taking initiatives from{" "}
          <span className="whitespace-nowrap">
            0<ZeroToOneArrow />1
          </span>{" "}
          driven by user insights and business impact.
        </div>
        <div className="rise rise-2 mt-8 flex flex-wrap gap-3">
          <Button href="https://drive.google.com/file/d/1qKo8IO4lXuZ-khmXrRMzQStjYEVFvfIy/view?usp=sharing" target="_blank" rel="noopener noreferrer">
            Resume
          </Button>
          <Button
            href="#contact"
            variant="ghost"
            className="border-transparent! font-normal! hover:border-transparent! hover:opacity-90"
            style={{ backgroundColor: "var(--color-surface)" }}
          >
            Get in touch
          </Button>
        </div>
        </div>
      </HomeContainer>
    </section>
  );
}
