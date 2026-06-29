import Button from "./Button";
import ArrowRight from "./ArrowRight";

export default function Contact() {
  return (
    <footer id="contact" className="pb-6 pt-16 md:pb-8 md:pt-24">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-8 xl:px-0">
        <div className="rounded-[var(--radius-frame)] bg-[var(--color-surface)] px-6 py-10 md:px-12 md:py-12">
          <div className="mx-auto grid max-w-[960px] gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-16">
            <div>
              <h2 className="max-w-[15ch] text-[1.75rem] font-normal leading-[1.08] tracking-[-0.015em] md:text-[2rem]">
                Let&rsquo;s build something clear.
              </h2>
              <p className="mt-3 max-w-[54ch] text-sm leading-[1.5] text-[var(--color-text)]">
                I&apos;m open to product design roles and collaborations where complex systems need a clearer way forward.
                Email is the best way to reach me.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 md:justify-end">
              <Button href="mailto:" className="justify-center px-3! py-2!">
                Email <ArrowRight className="h-3 w-3" />
              </Button>
              <Button
                href="https://linkedin.com/in/shon-hazan-095373199"
                variant="ghost"
                className="justify-center px-3! py-2!"
              >
                LinkedIn
              </Button>
              <Button href="/resume.pdf" variant="ghost" className="justify-center px-3! py-2!">
                Resume
              </Button>
            </div>
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-[var(--color-text)]">
          &copy; 2026 Designed by me.
        </p>
      </div>
    </footer>
  );
}
