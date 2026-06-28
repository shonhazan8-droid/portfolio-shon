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
    year: "2025 - 2026",
    role: "Product Designer",
    client: "Ministry of Defense",
    focus: "Strategy, IA, Core Flows",
    context:
      "A government rehabilitation experience serving people who needed clear medical, operational, and service information in moments that were already heavy.",
    headline: "People weren’t looking for information.\nThey were looking for certainty.",
    summary:
      "The platform exposed different services and assets from personnel through some of the hardest points of their service, injury, benefits, and recovery. It had to carry complex information without making people decode the organization first.",
    cover: { type: "lottie", src: "/Animate/shik-animate.json" },
    coverAlt: "Rehabilitation platform homepage interface",
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
    title: `${project.title} - Shon`,
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
            {isRehabilitation ? (
              <>
                <p className="mb-8 text-sm text-[var(--color-accent)]">{project.year}</p>
                <h1
                  className="max-w-[44ch] text-pretty font-normal leading-[1.08] tracking-[-0.015em]"
                  style={{ fontSize: "var(--font-size-h1)" }}
                >
                  {project.headline.split("\n").map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h1>
              </>
            ) : (
              <>
                <p className="mb-4 text-sm text-[var(--color-faint)]">{project.eyebrow}</p>
                <h1
                  className="max-w-[11ch] font-normal leading-[1.08] tracking-[-0.015em]"
                  style={{ fontSize: "var(--font-size-hero)" }}
                >
                  {project.title}
                </h1>
                <p className="mt-6 max-w-[58ch] text-[var(--font-size-body-lg)] leading-[1.55] text-[var(--color-muted)]">
                  {project.headline}
                </p>
              </>
            )}
          </header>

          <section className="rise rise-1">
            {project.cover.type === "image" ? (
              <div className="overflow-hidden rounded-[var(--radius-frame)] bg-[var(--color-app)]">
                <Image
                  src={project.cover.src}
                  alt={project.coverAlt}
                  width={project.cover.width}
                  height={project.cover.height}
                  priority
                  className="h-auto w-full"
                />
              </div>
            ) : (
              <CaseCover src={project.cover.src} label="[ Case cover ]" />
            )}
          </section>

          {isRehabilitation ? (
            <CaseStudyMeta
              items={[
                ["PROJECT", project.client ?? "Ministry of Defense"],
                ["ROLE", "Product Designer · End-to-end"],
                ["SCOPE", project.focus ?? "Strategy, IA, Core Flows"],
              ]}
            />
          ) : null}

          {!isRehabilitation ? (
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
          ) : null}

          {isRehabilitation ? (
            <>
              <IntroBlock>
                <p>
                  The platform supports IDF disabled veterans and security forces personnel through some of the
                  hardest periods of their lives: recovery, rights, benefits, and the ordinary logistics that suddenly
                  aren’t ordinary anymore.
                </p>
                <p>
                  Hundreds of services. Dozens of departments. One website standing between a person and the help
                  they’re entitled to. The stakes here are rarely convenience. They’re whether someone receives what
                  they need, at the moment they need it.
                </p>
              </IntroBlock>

              <CaseTextSection label="Problem" title="The experience reflected how the organization worked, not how people think.">
                <p>
                  Users struggled to understand what applied to them, where they were in the process, and what to do
                  next. The service was organized around internal logic and topic trees, while users arrived with
                  concrete life situations and urgent questions. In this domain confusion does not just slow people
                  down, it often stops them.
                </p>
              </CaseTextSection>

              <CaseTextSection label="Research">
                <p>
                  We needed a shared understanding of where uncertainty was being created and how different actors
                  interpreted the same process. Users were constantly translating service language into personal
                  meaning.
                </p>
                <div className="space-y-11 pt-7">
                  <NumberedCasePoint
                    number="01"
                    title="Understanding the people behind the process"
                    body="Interviews with veterans at different stages of their journey helped uncover how people make sense of rights, treatments, and bureaucratic processes in their own words."
                  />
                  <NumberedCasePoint
                    number="02"
                    title="Learning from those who guide them"
                    body="Conversations with caregivers, lawyers, case workers, and physicians revealed where people relied on human support to navigate the system and understand what applied to them."
                  />
                  <NumberedCasePoint
                    number="03"
                    title="Testing the experience against reality"
                    body="Usability testing, journey mapping, and cross-functional workshops helped identify where the service structure diverged from real-world situations and decision-making."
                  />
                </div>
              </CaseTextSection>

              <CaseTextSection label="Findings" title="Three findings that changed the strategy.">
                <div className="space-y-8">
                  <FindingBlock
                    title="Users thought in situations, not services."
                    body='Nobody asked for "the mobility benefit application." They said, "I can’t get up the stairs anymore." The gap between how users described their needs and how the service was organized became impossible to ignore.'
                  />
                  <FindingBlock
                    title="The system depended on human translators."
                    body="Call-center staff and social workers were often helping users understand which services were relevant and how different processes connected. The service worked because people helped bridge the gaps."
                  />
                  <FindingBlock
                    title="Information was everywhere. Relevance was missing."
                    body="Information wasn’t missing. It was abundant. The challenge was understanding what mattered and what could be ignored. Without context, everything competed equally for attention."
                  />
                </div>
              </CaseTextSection>

              <CaseTextSection
                label="The Shift"
                title="We stopped organizing around services and started organizing around situations."
              >
                <p>
                  Instead of asking people to learn the structure of an organization, we built the structure around
                  the moments that bring people in. The question changed from “Which department handles this?” to
                  “What’s happening in your life right now?”
                </p>
                <p>
                  Everything downstream - navigation, content, eligibility, forms - followed from that single move.
                  It wasn’t a redesign of pages. It was a change in what the product was for.
                </p>
              </CaseTextSection>

              <CaseTextSection label="IA" title="Restructuring the information architecture.">
                <p>
                  The original navigation exposed large parts of the site’s hierarchy upfront, requiring users to
                  choose between multiple paths before understanding where they would lead.
                </p>
                <p>
                  The information architecture was reorganized around clearer journeys, reducing navigation depth and
                  creating more predictable paths through the service.
                </p>
                <CaseImage
                  src="/Case01/shik1.png"
                  alt="Before view of the original rehabilitation navigation"
                  width={1856}
                  height={1170}
                />
                <CaseImage
                  src="/Case01/shik2.png"
                  alt="After view of the improved rehabilitation navigation"
                  width={1856}
                  height={1170}
                />
              </CaseTextSection>

              <CaseTextSection label="Relevance" title="Prioritizing relevance.">
                <p>
                  Research showed that users often struggled to understand which services, benefits, and content were
                  relevant to their situation.
                </p>
                <p>
                  New content hubs introduced situation-based entry points and filtering, helping users narrow the
                  experience before exploring available services.
                </p>
                <CaseImage
                  src="/Case01/shik3.png"
                  alt="Before and after mobile screens for the rehabilitation service"
                  width={1856}
                  height={2050}
                />
                <CaseImage
                  src="/Case01/shik4.png"
                  alt="Situation-based filtering and relevant service hubs for the rehabilitation service"
                  width={1856}
                  height={1100}
                />
              </CaseTextSection>

              <CaseTextSection label="Search" title="Adding context to search.">
                <p>
                  The ideal was to extend the same situation-based filtering into search. A client constraint made
                  that infeasible in this phase, so the honest move was to acknowledge the limitation rather than
                  pretend the end state was reachable now.
                </p>
                <p>
                  Instead of shipping nothing, I made a deliberate trade-off: a lighter interim solution that still
                  created value. Content type labels and a clearer result hierarchy helped users understand results
                  faster and navigate them more confidently — not the ideal, but a real improvement under the
                  constraint.
                </p>
                <p>
                  Bringing life situations into search context was scoped as an intentional next step, planned for a
                  later phase rather than forced prematurely. Naming the compromise — and the path beyond it — was
                  part of the design decision.
                </p>
                <CaseImage
                  src="/Case01/shik5.png"
                  alt="Before and after search experience for the rehabilitation service"
                  width={1856}
                  height={2050}
                />
                <CaseImage
                  src="/Case01/shik6.png"
                  alt="Search filtering and result hierarchy in the rehabilitation service"
                  width={1856}
                  height={1190}
                />
              </CaseTextSection>

              <CaseTextSection label="Outcome" title="The site started answering the questions users actually arrived with.">
                <p>
                  The work shifted the service from a directory of departments to an experience organized around real
                  situations. Users could understand what mattered, what applied to them, and what to do next without
                  first decoding the organization behind the service.
                </p>
              </CaseTextSection>

              <NextProjectLink />
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

function CaseStudyMeta({ items }: { items: [string, string][] }) {
  return (
    <section className="grid gap-8 py-12 md:grid-cols-3 md:gap-12">
      {items.map(([label, value]) => (
        <div key={label}>
          <p className="text-[10px] uppercase tracking-[.14em] text-[var(--color-accent)]">{label}</p>
          <p className="mt-2 text-[clamp(0.8rem,1vw,0.9rem)] font-normal leading-[1.4] text-[var(--color-ink)]">
            {value}
          </p>
        </div>
      ))}
    </section>
  );
}

function IntroBlock({ children }: { children: React.ReactNode }) {
  return (
    <section className="max-w-[58ch] space-y-7 pb-14 text-[var(--font-size-body-lg)] leading-[1.65] text-[var(--color-muted)]">
      {children}
    </section>
  );
}

function CaseTextSection({
  label,
  title,
  children,
}: {
  label?: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-5 py-14">
      <div>
        {label ? (
          <p className="text-sm uppercase tracking-[.08em] text-[var(--color-accent)]">
            <span aria-hidden="true">/ </span>
            {label}
          </p>
        ) : null}
      </div>
      <div className="space-y-5 text-base leading-[1.65] text-[var(--color-muted)] [&>*:not(.case-img)]:max-w-[38rem]">
        {title ? (
          <h2 className="text-2xl font-normal leading-[1.35] tracking-[-0.008em] text-[var(--color-ink)]">{title}</h2>
        ) : null}
        {children}
      </div>
    </section>
  );
}

function QuoteBand() {
  return (
    <section className="relative left-1/2 my-12 w-screen -translate-x-1/2 bg-[var(--color-surface)] px-6 py-14 text-center md:px-12 md:py-16">
      <p className="mx-auto max-w-[22ch] text-[clamp(2rem,3vw,2.75rem)] font-normal leading-[1.18] tracking-[-0.026em] text-[var(--color-ink)]">
        Information was organized around services.{" "}
        <span className="text-[var(--color-accent)]">Users arrived with situations.</span>
      </p>
    </section>
  );
}

function ResearchPeekCard() {
  return (
    <section className="relative left-1/2 my-14 w-screen -translate-x-1/2 overflow-hidden">
      <div className="relative h-[180px] overflow-hidden bg-[var(--color-app)] md:h-[248px]">
        <Image
          src="/12.png"
          alt="Research artifacts, interview session, and briefing material"
          width={2047}
          height={581}
          className="absolute left-1/2 top-0 h-auto w-[1320px] max-w-none -translate-x-1/2 md:w-[1680px] lg:w-[2047px]"
        />
      </div>
    </section>
  );
}

function NumberedCasePoint({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <div className="grid gap-5 md:grid-cols-[36px_1fr]">
      <p className="text-sm leading-[1.5] text-[var(--color-accent)]">{number}</p>
      <div>
        <h3 className="text-xl font-normal leading-[1.25] tracking-[-0.008em] text-[var(--color-ink)]">
          {title}
        </h3>
        <p className="mt-4 text-base leading-[1.65] text-[var(--color-muted)]">{body}</p>
      </div>
    </div>
  );
}

function FindingBlock({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="text-xl font-normal leading-[1.25] tracking-[-0.008em] text-[var(--color-ink)]">{title}</h3>
      <p className="mt-3 text-base leading-[1.65] text-[var(--color-muted)]">{body}</p>
    </div>
  );
}

function CaseImage({
  src,
  alt,
  width = 1856,
  height = 1188,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}) {
  return (
    <div className="case-img my-8 w-full overflow-hidden rounded-[var(--radius-frame)] bg-[var(--color-surface)]">
      <Image src={src} alt={alt} width={width} height={height} className="h-auto w-full" />
    </div>
  );
}

function NextProjectLink() {
  return (
    <a
      href="/case-studies/bank-account-opening"
      className="group flex items-center justify-between border-t border-[var(--color-line)] py-10 text-[var(--color-ink)] no-underline"
    >
      <span>
        <span className="block text-sm text-[var(--color-faint)]">Next Project</span>
        <span className="mt-2 block text-base leading-[1.4] text-[var(--color-muted)]">Israel Post Opening Bank</span>
      </span>
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-surface)] text-[var(--color-accent)] transition-transform duration-150 ease-[var(--ease-out)] group-hover:translate-x-1">
        <ArrowRight className="h-3 w-3" />
      </span>
    </a>
  );
}
