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
    role: "Product Designer",
    client: "Ministry of Defense",
    focus: "Service Design · End-to-end",
    context:
      "A government rehabilitation experience serving people who needed clear medical, operational, and service information in moments that were already heavy.",
    headline:
      "People weren’t looking for information. They were looking for certainty.",
    summary:
      "The platform exposed different services and assets from personnel through some of the hardest points of their service, injury, benefits, and recovery. It had to carry complex information without making people decode the organization first.",
    cover: { type: "lottie", src: "/Animate/shik-animate.json" },
    coverAlt: "Animated rehabilitation platform preview",
    challenge:
      "The experience reflected how the organization worked, not how people think. Users arrived with questions, but had to translate those questions into departments, benefits, documents, and service names.",
    approach: [
      "Studied how users actually understood their situation before they understood the services around it.",
      "Mapped the system around situations and questions instead of departments and internal ownership.",
      "Restructured content so relevance, next actions, and reassurance appeared before forms and service names.",
    ],
    resultTitle: "Less organizational logic. More human orientation.",
    outcome:
      "The site started answering the questions users actually arrived with, helping them understand what mattered, what applied to them, and what they should do next.",
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
  const isRehabilitation = project.slug === "rehabilitation-platform";

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
              <p className="text-sm text-[var(--color-faint)]">{isRehabilitation ? "Client" : "Role"}</p>
              <p className="mt-2 leading-[1.55]">{isRehabilitation ? project.client : project.role}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--color-faint)]">Role</p>
              <p className="mt-2 leading-[1.55]">{project.role}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--color-faint)]">{isRehabilitation ? "Focus" : "Impact"}</p>
              <p className="mt-2 leading-[1.55]">
                {isRehabilitation ? project.focus : study?.stats.map((stat) => `${stat.value} ${stat.label.toLowerCase()}`).join(" · ")}
              </p>
            </div>
          </section>

          {isRehabilitation ? (
            <>
              <CaseTextSection label="Context" title="A system with many services, but no single mental model.">
                <p>{project.context}</p>
                <p>{project.summary}</p>
                <p>
                  Much of the information already existed, but it was shaped by internal ownership.
                  Users had to know what they were looking for before the site could help them find it.
                </p>
              </CaseTextSection>

              <CaseTextSection label="Problem" title="The experience reflected how the organization worked, not how people think.">
                <p>{project.challenge}</p>
                <p>
                  Even when the content itself was important, users were forced to move through
                  categories that made sense to the system before they could understand what was
                  relevant to their own situation.
                </p>
              </CaseTextSection>

              <QuoteBand>
                Information was organized around services. Users arrived with situations.
              </QuoteBand>

              <CaseTextSection label="Research" title="We needed to understand how people actually saw their own situation.">
                <p>
                  We looked at different points in the journey and tested how people moved from
                  uncertainty to action: what they searched for, what language they used, and when
                  they needed context before choosing a path.
                </p>
                <div className="grid gap-5 pt-2">
                  {[
                    "Understanding the ecosystem behind the process: where services connect, where ownership gets split, and where users lose context.",
                    "Learning from people who guide them: support teams, service owners, and professionals who repeatedly explain the same steps.",
                    "Testing the experience against reality: checking whether users could recognize themselves in the flow without already knowing the correct service name.",
                  ].map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </CaseTextSection>

              <MediaPlaceholder label="Research boards, journey maps, and early IA explorations" />

              <CaseTextSection label="Findings" title="Three findings changed the strategy.">
                <div className="grid gap-5">
                  <p>
                    Users thought in situations, not services. They did not start with a department;
                    they started with a life event, a medical need, or a question about what happens next.
                  </p>
                  <p>
                    The system depended on human translators. Call centers and service teams were
                    repeatedly translating organizational language into human language.
                  </p>
                  <p>
                    Information was everywhere. Relevance was missing. The problem was not only
                    availability of content, but the lack of clear prioritization around what mattered now.
                  </p>
                </div>
              </CaseTextSection>

              <CaseTextSection label="The shift" title="We stopped organizing around services and started organizing around situations.">
                <p>
                  Instead of asking people to learn the structure of the organization, we built the
                  structure around recognizable situations: treatment, documents, appointments,
                  eligibility, and daily support.
                </p>
                <p>
                  Everything became contextual. Rights, forms, services, and next steps were grouped
                  around the practical questions people arrived with.
                </p>
              </CaseTextSection>

              <CaseTextSection label="IA" title="Restructuring the information architecture.">
                <p>
                  The original navigation exposed internal groupings. The new structure reduced the
                  need to know service ownership and brought related information closer together.
                </p>
                <p>
                  This turned the platform into something closer to a guide: fewer entry points,
                  clearer labels, and a path that could support people through the service.
                </p>
              </CaseTextSection>

              <div className="grid gap-6 py-6">
                <MediaPlaceholder label="Old architecture and content inventory" />
                <div className="overflow-hidden rounded-[var(--radius-frame)] bg-[var(--color-app)]">
                  <Image
                    src="/work/rehabilitation-platform.png"
                    alt="Rehabilitation platform interface direction"
                    width={1920}
                    height={1440}
                    className="h-auto w-full"
                  />
                </div>
              </div>

              <CaseTextSection label="Flow" title="Prioritizing reassurance.">
                <p>
                  Research showed that users often stopped to understand which service, benefit,
                  or contact was relevant to them before moving forward.
                </p>
                <p>
                  We made the interface more reassuring by surfacing context, status, and next
                  actions before asking users to choose a formal path.
                </p>
              </CaseTextSection>

              <MediaPlaceholder label="Mobile flows, reassurance states, and service entry points" />

              <CaseTextSection label="Search" title="Adding context to search.">
                <p>
                  Search was not treated as a shortcut around the structure. It became another way
                  to help users orient themselves when they did not know the official language.
                </p>
                <p>
                  Results needed to explain why they were relevant, what service they belonged to,
                  and what the user could do next.
                </p>
              </CaseTextSection>

              <MediaPlaceholder label="Search behavior, filters, and contextual result cards" />

              <CaseTextSection label="Result" title="The site started answering the questions users actually arrived with.">
                <p>{project.outcome}</p>
              </CaseTextSection>

              <div className="py-14 md:pl-[252px]">
                <Button href="/#contact">
                  Talk about a project <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </>
          ) : (
            <>
              <CaseTextSection title="Context">
                <p>{project.context}</p>
                <p>{project.summary}</p>
              </CaseTextSection>

              <CaseTextSection title="Challenge">
                <p>{project.challenge}</p>
              </CaseTextSection>

              <CaseTextSection title="Approach">
                {project.approach.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </CaseTextSection>

              <CaseTextSection label="Result" title={project.resultTitle}>
                <p>{project.outcome}</p>
              </CaseTextSection>

              <div className="py-14 md:pl-[252px]">
                <Button href="/#contact">
                  Talk about a project <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </>
          )}
        </Container>
      </main>
    </>
  );
}

function CaseTextSection({
  label,
  title,
  children,
}: {
  label?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-8 border-b border-[var(--color-line)] py-14 md:grid-cols-[220px_1fr]">
      <div className="md:pt-1">
        {label ? (
          <p className="text-sm uppercase tracking-[.08em] text-[var(--color-accent)]">
            <span aria-hidden="true">/ </span>
            {label}
          </p>
        ) : null}
      </div>
      <div className="max-w-[58ch] space-y-5 text-base leading-[1.65] text-[var(--color-muted)]">
        <h2 className="text-2xl font-normal leading-[1.2] tracking-[-0.012em] text-[var(--color-ink)]">{title}</h2>
        {children}
      </div>
    </section>
  );
}

function QuoteBand({ children }: { children: React.ReactNode }) {
  return (
    <section className="my-12 rounded-[var(--radius-frame)] bg-[var(--color-surface)] px-6 py-12 text-center md:px-12">
      <p className="mx-auto max-w-[18ch] text-2xl font-normal leading-[1.18] tracking-[-0.012em]">
        {children}
      </p>
    </section>
  );
}

function MediaPlaceholder({ label }: { label: string }) {
  return (
    <div className="my-6 flex aspect-[752/480] w-full items-center justify-center rounded-[var(--radius-frame)] bg-[var(--color-surface)] px-6 text-center text-sm leading-6 text-[var(--color-faint)]">
      Placeholder: {label}
    </div>
  );
}
