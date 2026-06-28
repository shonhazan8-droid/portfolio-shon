import Button from "./Button";
import Container from "./Container";
import ArrowRight from "./ArrowRight";

export default function Contact() {
  return (
    <section id="contact" className="py-24 border-t border-[var(--color-line)]">
      <Container>
        <p className="mb-4 text-sm text-[var(--color-text)]">Contact</p>
        <h2
          className="mb-4 max-w-[16ch] font-normal leading-[1.1] tracking-[-0.015em]"
          style={{ fontSize: "var(--font-size-hero)" }}
        >
          Let&rsquo;s build something clear.
        </h2>
        <p className="max-w-[46ch] text-base leading-[1.55] text-[var(--color-text)]">
          I&apos;m open to product design roles and collaborations where complex systems need a clearer way forward.
          Email is the best way to reach me.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="mailto:">Email <ArrowRight className="h-3 w-3" /></Button>
          <Button href="https://linkedin.com/in/shon-hazan-095373199" variant="ghost">LinkedIn</Button>
          <Button href="/resume.pdf" variant="ghost">Resume</Button>
        </div>
      </Container>
    </section>
  );
}
