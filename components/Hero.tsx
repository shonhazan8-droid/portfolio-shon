import Button from "./Button";
import Container from "./Container";
import ArrowRight from "./ArrowRight";
import ZeroToOneArrow from "./ZeroToOneArrow";

export default function Hero() {
  return (
    <section className="pt-16 pb-16 md:pt-24">
      <Container>
        <h1
          className="rise max-w-[18ch] font-normal leading-[1.22] tracking-[-0.015em] text-balance"
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
          <Button href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume <ArrowRight className="h-3 w-3" /></Button>
          <Button
            href="#contact"
            variant="ghost"
            className="border-transparent! font-normal! hover:border-transparent! hover:opacity-90"
            style={{ backgroundColor: "var(--color-surface)" }}
          >
            Get in touch
          </Button>
        </div>
      </Container>
    </section>
  );
}
