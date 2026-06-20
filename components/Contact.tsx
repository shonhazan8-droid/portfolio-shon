import Button from "./Button";
import Container from "./Container";
import ArrowRight from "./ArrowRight";

export default function Contact() {
  return (
    <section id="contact" className="py-24 border-t border-[var(--color-line)]">
      <Container>
        <p className="mb-4 text-sm text-[var(--color-muted)]">Contact</p>
        <h2
          className="mb-4 max-w-[16ch] font-medium leading-[1.1] tracking-[-0.02em]"
          style={{ fontSize: "var(--font-size-hero)" }}
        >
          Let&rsquo;s build something clear.
        </h2>
        <p className="max-w-[46ch] text-lg leading-[1.55] text-[var(--color-muted)]">
          {/* Replace: availability + what you're looking for */}
          [ Supporting line — availability, what you're looking for, how to reach you. ]
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
