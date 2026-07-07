import HomeContainer from "./HomeContainer";
import Reveal from "./Reveal";
import { testimonials } from "@/content/testimonials";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Testimonials() {
  return (
    <section className="py-20 md:py-24">
      <Reveal>
      <HomeContainer>
        <h2 className="mb-12 text-center text-2xl font-normal tracking-[-0.008em]">Words from people I&apos;ve worked with</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex h-full flex-col rounded-[var(--radius-frame)] bg-[var(--color-surface)] px-6 py-7"
            >
              <blockquote className="mb-8 text-base leading-[1.6] text-[var(--color-ink)]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-3 md:mt-auto">
                {t.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-10 w-10 shrink-0 rounded-full object-cover"
                    draggable={false}
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-surface)] text-xs font-medium tracking-[.02em] text-[var(--color-text)]"
                  >
                    {initials(t.name)}
                  </span>
                )}
                <span>
                  <span className="block text-base font-medium text-[var(--color-ink)]">{t.name}</span>
                  <span className="block text-sm text-[var(--color-text)]">
                    {t.role}
                    {t.company ? ` · ${t.company}` : ""}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </HomeContainer>
      </Reveal>
    </section>
  );
}
