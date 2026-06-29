import HomeContainer from "./HomeContainer";
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
      <HomeContainer>
        <h2 className="mb-12 text-2xl font-normal tracking-[-0.008em]">Words from people I&apos;ve worked with</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              style={{ animationDelay: `${i * 0.8}s`, animationDuration: `${5.6 + (i % 2) * 1.4}s` }}
              className="float-card flex h-full flex-col gap-5 rounded-[var(--radius-frame)] bg-[var(--color-surface)] p-6"
            >
              <blockquote className="text-base leading-[1.55] text-[var(--color-ink)]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3">
                {t.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-10 w-10 shrink-0 rounded-full border border-[var(--color-line)] object-cover"
                    draggable={false}
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] text-xs font-medium tracking-[.02em] text-[var(--color-text)]"
                  >
                    {initials(t.name)}
                  </span>
                )}
                <span>
                  <span className="block text-sm font-medium text-[var(--color-ink)]">{t.name}</span>
                  <span className="block text-xs text-[var(--color-text)]">
                    {t.role}{t.company ? ` · ${t.company}` : ""}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </HomeContainer>
    </section>
  );
}
