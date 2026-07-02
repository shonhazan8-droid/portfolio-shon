import Image from "next/image";
import Button from "./Button";
import ArrowRight from "./ArrowRight";
import HomeContainer from "./HomeContainer";

export default function Contact() {
  return (
    <footer
      id="contact"
      className="relative isolate mt-12 min-h-[480px] overflow-hidden pt-10 pb-6 md:mt-16 md:flex md:min-h-[520px] md:flex-col md:justify-center md:pt-14 md:pb-8"
    >
      <Image
        src="/Footer-bg-2.png"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-bottom"
      />

      {/* Soft fade: page background melts into the image so its top edge isn't a hard line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-[var(--color-bg)] to-transparent md:h-40"
      />

      <HomeContainer className="relative">
        <div className="rounded-[var(--radius-frame)] bg-[color-mix(in_srgb,var(--color-bg)_90%,transparent)] px-7 py-14 backdrop-blur-md md:px-16 md:py-20 lg:px-20">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-20">
            <div>
              <h2 className="max-w-[15ch] text-[2rem] font-normal leading-[1.08] tracking-[-0.015em] md:text-[2.5rem]">
                Let&rsquo;s build something clear.
              </h2>
              <p className="mt-5 max-w-[58ch] text-base leading-[1.55] text-[var(--color-text)]">
                I&apos;m open to product design roles and collaborations where complex systems need a clearer way forward.
                Email is the best way to reach me.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 md:justify-end">
              <Button href="mailto:Shonhazan8@gmail.com" className="justify-center px-5! py-3!">
                Email <ArrowRight className="h-3 w-3" />
              </Button>
              <Button
                href="https://www.linkedin.com/in/shon-hazan-095373199/?skipRedirect=true"
                variant="ghost"
                target="_blank"
                rel="noopener noreferrer"
                className="justify-center px-5! py-3!"
              >
                LinkedIn
              </Button>
              <Button
                href="https://drive.google.com/file/d/1qKo8IO4lXuZ-khmXrRMzQStjYEVFvfIy/view?usp=sharing"
                variant="ghost"
                target="_blank"
                rel="noopener noreferrer"
                className="justify-center px-5! py-3!"
              >
                Resume
              </Button>
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-white">
          &copy; 2026 Designed by me.
        </p>
      </HomeContainer>
    </footer>
  );
}
