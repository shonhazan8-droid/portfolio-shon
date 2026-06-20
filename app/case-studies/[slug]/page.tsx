import Image from "next/image";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import Container from "@/components/Container";
import Button from "@/components/Button";
import CaseCover from "@/components/CaseCover";
import ArrowRight from "@/components/ArrowRight";
import { caseStudies } from "@/content/caseStudies";

const caseStudyDetails = [
  {
    slug: "rehabilitation-platform",
    title: "Rehabilitation platform IA",
    eyebrow: "Public sector case study",
    year: "2021",
    role: "Product design, information architecture, service flow",
    context:
      "A government rehabilitation experience serving people who needed clear medical, operational, and service information in moments that were already heavy.",
    headline:
      "Reorganizing a dense rehabilitation platform around real user situations instead of internal departments.",
    summary:
      "The original experience exposed people to the organization's structure: departments, forms, and scattered service paths. The redesign moved the interface toward recognizable life situations, clearer next actions, and fewer dead ends.",
    cover: { type: "lottie", src: "/Animate/shik-animate.json" },
    coverAlt: "Animated rehabilitation platform preview",
    challenge:
      "People arrived with urgent questions but had to translate their need into the language of departments and forms. That created friction before they could even understand which service, document, or appointment path was relevant.",
    approach: [
      "Mapped the core journeys around the user's situation: treatment, appointments, benefits, documents, and daily support.",
      "Grouped related actions into fewer decision points so the interface could answer what to do next without asking users to understand the organization first.",
      "Reduced form-first paths and exposed service entry points only after the user had enough context to choose confidently.",
    ],
    resultTitle: "Less organizational logic. More human orientation.",
    outcome:
      "The primary path became faster to scan and easier to explain: fewer forms up front, clearer content groups, and a system structure that matched the user's mental model.",
  },
  {
    slug: "bank-account-opening",
    title: "Bank account opening, rebuilt",
    eyebrow: "Fintech case study",
    year: "2022",
    role: "Product design, onboarding flow, decision architecture",
    context:
      "A digital account-opening flow had to replace the confidence usually created by a banker sitting across the table.",
    headline:
      "Rebuilding a sensitive financial onboarding flow around progress, clarity, and one decision at a time.",
    summary:
      "When the process moved online, users lost the person who could explain the next step, reduce doubt, and make the application feel safe. The redesign gave that confidence back through structure.",
    cover: { type: "lottie", src: "/Animate/post-animate.json" },
    coverAlt: "Animated bank account opening flow preview",
    challenge:
      "Users were asked to complete a high-trust financial task without the reassurance of a human guide. Too many decisions appeared together, progress felt unclear, and uncertainty turned into drop-off.",
    approach: [
      "Split the application into clear moments so each screen asked for one decision or one small group of related details.",
      "Made progress visible throughout the flow, reducing the sense of an open-ended form.",
      "Rewrote decision points around user confidence: what is needed, why it matters, and what happens next.",
    ],
    resultTitle: "A flow that explains itself while users move through it.",
    outcome:
      "The redesigned path made the application feel more guided and less transactional, improving completion while lowering the friction that had pushed users out of the flow.",
  },
];

export function generateStaticParams() {
  return caseStudyDetails.map((project) => ({ slug: project.slug }));
}

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = caseStudyDetails.find((item) => item.slug === slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} — Shon`,
    description: project.summary,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = caseStudyDetails.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const study = caseStudies.find((item) => item.slug === project.slug);

  return (
    <>
      <SiteHeader variant="caseStudy" />
      <main>
        <Container className="py-12 md:py-16">
          <header className="rise pb-12">
            <p className="mb-4 text-sm text-[var(--color-faint)]">{project.eyebrow}</p>
            <h1
              className="max-w-[11ch] font-normal leading-[1.08] tracking-[-0.02em]"
              style={{ fontSize: "var(--font-size-hero)" }}
            >
              {project.title}
            </h1>
            <p className="mt-6 max-w-[58ch] text-[var(--font-size-body-lg)] leading-[1.55] text-[var(--color-muted)]">
              {project.headline}
            </p>
          </header>

          <section className="rise rise-1">
            {project.cover.type === "image" ? (
              <div className="overflow-hidden rounded-[var(--radius-frame)] bg-[var(--color-app)]">
                <Image
                  src={project.cover.src}
                  alt={project.coverAlt}
                  width={1920}
                  height={1440}
                  priority
                  className="h-auto w-full"
                />
              </div>
            ) : (
              <CaseCover src={project.cover.src} label="[ Case cover ]" />
            )}
          </section>

          <section className="grid gap-8 border-b border-t border-[var(--color-line)] py-10 md:grid-cols-3">
            <div>
              <p className="text-sm text-[var(--color-faint)]">Role</p>
              <p className="mt-2 leading-[1.55]">{project.role}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--color-faint)]">Year</p>
              <p className="mt-2 leading-[1.55]">{project.year}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--color-faint)]">Impact</p>
              <p className="mt-2 leading-[1.55]">
                {study?.stats.map((stat) => `${stat.value} ${stat.label.toLowerCase()}`).join(" · ")}
              </p>
            </div>
          </section>

          <section className="grid gap-8 border-b border-[var(--color-line)] py-14 md:grid-cols-[220px_1fr]">
            <h2 className="text-2xl font-normal leading-[1.2] tracking-[-0.012em]">Context</h2>
            <div className="max-w-[58ch] space-y-5 text-base leading-[1.65] text-[var(--color-muted)]">
              <p>{project.context}</p>
              <p>{project.summary}</p>
            </div>
          </section>

          <section className="grid gap-8 border-b border-[var(--color-line)] py-14 md:grid-cols-[220px_1fr]">
            <h2 className="text-2xl font-normal leading-[1.2] tracking-[-0.012em]">Challenge</h2>
            <p className="max-w-[58ch] text-base leading-[1.65] text-[var(--color-muted)]">
              {project.challenge}
            </p>
          </section>

          <section className="grid gap-8 border-b border-[var(--color-line)] py-14 md:grid-cols-[220px_1fr]">
            <h2 className="text-2xl font-normal leading-[1.2] tracking-[-0.012em]">Approach</h2>
            <div className="grid gap-5">
              {project.approach.map((item) => (
                <p key={item} className="max-w-[58ch] text-base leading-[1.65] text-[var(--color-muted)]">
                  {item}
                </p>
              ))}
            </div>
          </section>

          <section className="py-14">
            <p className="mb-4 text-sm text-[var(--color-faint)]">Result</p>
            <h2 className="max-w-[16ch] text-2xl font-normal leading-[1.2] tracking-[-0.012em]">
              {project.resultTitle}
            </h2>
            <p className="mt-5 max-w-[58ch] text-base leading-[1.65] text-[var(--color-muted)]">
              {project.outcome}
            </p>
            <div className="mt-8">
              <Button href="/#contact">
                Talk about a project <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          </section>
        </Container>
      </main>
    </>
  );
}
