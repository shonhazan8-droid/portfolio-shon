import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/Button";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Style Guide — Shon",
  description: "Design tokens, typography, colors, spacing, and component rules for the portfolio.",
};

const colors = [
  { name: "Background", token: "--color-bg", value: "#FFFFFF", usage: "Base background across every page" },
  { name: "Surface", token: "--color-surface", value: "#F1F0F6", usage: "Cards and small background areas" },
  { name: "Ink", token: "--color-ink", value: "#0C0C0C", usage: "Headings" },
  { name: "Text", token: "--color-text", value: "#333333", usage: "Body copy and all supporting text" },
  { name: "Line", token: "--color-line", value: "#F1F0F6", usage: "Section dividers and ghost controls" },
  { name: "Accent", token: "--color-accent", value: "#F54E00", usage: "Selected states and emphasis" },
  { name: "Button", token: "--color-btn", value: "#0C0C0C", usage: "Primary CTA fill" },
];

const typeScale = [
  { name: "Caption", token: "--font-size-caption", value: "0.75rem / 12px", sample: "Metadata and tiny labels" },
  { name: "Small", token: "--font-size-small", value: "0.875rem / 14px", sample: "Navigation and compact text" },
  { name: "Body", token: "--font-size-body", value: "1rem / 16px", sample: "Default paragraph copy" },
  { name: "Body large", token: "--font-size-body-lg", value: "1.125rem / 18px", sample: "Intro copy and lead text" },
  { name: "H3", token: "--font-size-h3", value: "1.25rem / 20px", sample: "Card titles and carousel captions" },
  { name: "H2", token: "--font-size-h2", value: "1.5rem / 24px", sample: "Section headings" },
  { name: "H1", token: "--font-size-h1", value: "1.875rem / 30px", sample: "Page-level headings" },
  { name: "Hero", token: "--font-size-hero", value: "clamp(2.0625rem, 4.4vw, 3.25rem)", sample: "Large hero moments" },
];

const layoutRules = [
  { name: "Main container", value: "max-width: 752px", detail: "Shared content width for the home page and header." },
  { name: "Page padding", value: "24px mobile, 0px desktop", detail: "Container keeps small screens breathable." },
  { name: "Media cover", value: "aspect-ratio: 752 / 480", detail: "Used for case-study Lottie covers." },
  { name: "Project carousel", value: "aspect-ratio: 16 / 9", detail: "Used for selected work screenshots." },
  { name: "Frame radius", value: "14px", detail: "Shared radius token: --radius-frame." },
];

const motionRules = [
  { name: "Ease out", token: "--ease-out", value: "cubic-bezier(0.23, 1, 0.32, 1)" },
  { name: "Ease in out", token: "--ease-in-out", value: "cubic-bezier(0.77, 0, 0.175, 1)" },
  { name: "Entrance", token: ".rise", value: "0.55s, translateY(10px) to rest" },
  { name: "Marquee", token: ".marquee-track", value: "48s linear loop; disabled for reduced motion" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-[var(--color-line)] py-12">
      <h2 className="mb-8 text-[var(--font-size-h2)] font-normal tracking-[-0.008em]">{title}</h2>
      {children}
    </section>
  );
}

function TokenMeta({ token, value }: { token: string; value: string }) {
  return (
    <div className="mt-1 font-mono text-[11px] leading-5 text-[var(--color-text)]">
      <span>{token}</span>
      <span className="px-2 text-[var(--color-line)]">/</span>
      <span>{value}</span>
    </div>
  );
}

export default function StyleGuidePage() {
  return (
    <main className="min-h-screen">
      <Container className="py-12 md:py-16">
        <Link
          href="/"
          className="mb-10 inline-flex text-sm text-[var(--color-text)] no-underline transition-colors hover:text-[var(--color-ink)]"
        >
          Back to home
        </Link>

        <header className="pb-12">
          <p className="mb-4 text-sm text-[var(--color-text)]">Portfolio system</p>
          <h1
            className="max-w-[10ch] font-normal leading-[1.08] tracking-[-0.015em]"
            style={{ fontSize: "var(--font-size-hero)" }}
          >
            Style guide
          </h1>
          <p className="mt-6 max-w-[54ch] text-[var(--font-size-body-lg)] leading-[1.55] text-[var(--color-text)]">
            A compact reference for the site's design language: color tokens, typography,
            layout rules, motion, and reusable component behavior.
          </p>
        </header>

        <Section title="Color">
          <div className="grid gap-3">
            {colors.map((color) => (
              <div
                key={color.token}
                className="grid grid-cols-[72px_1fr] items-center gap-4 rounded-[var(--radius-frame)] bg-[var(--color-surface)] p-3"
              >
                <div
                  className="h-14 rounded-[10px]"
                  style={{ backgroundColor: `var(${color.token})` }}
                  aria-label={`${color.name} color swatch`}
                />
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-base font-normal">{color.name}</h3>
                    <span className="text-sm text-[var(--color-text)]">{color.usage}</span>
                  </div>
                  <TokenMeta token={color.token} value={color.value} />
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Typography">
          <div className="mb-8 grid gap-4 rounded-[var(--radius-frame)] bg-[var(--color-surface)] p-5">
            <div>
              <h3 className="text-base font-normal">Sans</h3>
              <TokenMeta token="--font-sans" value="Geist, system-ui, sans-serif" />
            </div>
            <div>
              <h3 className="font-mono text-base font-normal">Mono</h3>
              <TokenMeta token="--font-mono" value="JetBrains Mono, monospace" />
            </div>
          </div>

          <div className="grid gap-4">
            {typeScale.map((type) => (
              <div key={type.token} className="border-t border-[var(--color-line)] pt-4">
                <div
                  className="font-normal leading-[1.2] tracking-[-0.008em]"
                  style={{ fontSize: `var(${type.token})` }}
                >
                  {type.sample}
                </div>
                <TokenMeta token={type.token} value={type.value} />
              </div>
            ))}
          </div>
        </Section>

        <Section title="Layout">
          <div className="grid gap-3">
            {layoutRules.map((rule) => (
              <div key={rule.name} className="rounded-[var(--radius-frame)] bg-[var(--color-surface)] p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-base font-normal">{rule.name}</h3>
                  <span className="font-mono text-[11px] text-[var(--color-text)]">{rule.value}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text)]">{rule.detail}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Components">
          <div className="grid gap-8">
            <div>
              <h3 className="mb-4 text-base font-normal">Buttons</h3>
              <div className="flex flex-wrap gap-3">
                <Button href="/style-guide">Primary button</Button>
                <Button href="/style-guide" variant="ghost">Ghost button</Button>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-base font-normal">Media frames</h3>
              <div className="grid gap-5">
                <div>
                  <div className="aspect-video w-full overflow-hidden rounded-[var(--radius-frame)] bg-[var(--color-surface)]">
                    <div className="flex h-full items-center justify-center bg-[var(--color-surface)] text-sm text-[var(--color-text)]">
                      16 / 9 project image frame
                    </div>
                  </div>
                  <TokenMeta token="Project frame" value="borderless, no shadow, radius 14px" />
                </div>
                <div>
                  <div className="aspect-[752/480] w-full overflow-hidden rounded-[var(--radius-frame)] bg-[var(--color-surface)]">
                    <div className="flex h-full items-center justify-center bg-[var(--color-surface)] text-sm text-[var(--color-text)]">
                      752 / 480 case cover frame
                    </div>
                  </div>
                  <TokenMeta token="Case cover" value="matches main content width" />
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Motion">
          <div className="grid gap-3">
            {motionRules.map((rule) => (
              <div key={rule.token} className="rounded-[var(--radius-frame)] bg-[var(--color-surface)] p-5">
                <h3 className="text-base font-normal">{rule.name}</h3>
                <TokenMeta token={rule.token} value={rule.value} />
              </div>
            ))}
          </div>
        </Section>
      </Container>
    </main>
  );
}
