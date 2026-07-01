import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GeistMono } from "geist/font/mono";
import SiteHeader from "@/components/SiteHeader";
import Container from "@/components/Container";
import Button from "@/components/Button";
import CaseCover from "@/components/CaseCover";
import ArrowRight from "@/components/ArrowRight";
import { caseStudies } from "@/content/caseStudies";
import shik1 from "@/public/Case01/shik1.png";
import shik2 from "@/public/Case01/shik2.png";
import shik3 from "@/public/Case01/shik3.png";
import shik4 from "@/public/Case01/shik4.png";
import shik5 from "@/public/Case01/shik5.png";
import shik6 from "@/public/Case01/shik6.png";
import researchCollage from "@/public/Case01/26253.png";
import bankFlowStructure from "@/public/Case02/flow-structure.png";
import bankSystemToExperience from "@/public/Case02/system-to-experience.png";
import bankFocusedDecisions from "@/public/Case02/focused-decisions.png";
import bankFieldBranch from "@/public/Case02/field-branch.png";
import bankFieldSystem from "@/public/Case02/field-system.png";

type CaseStudyCover =
  | { type: "image"; src: string; width: number; height: number }
  | { type: "lottie"; src: string };

type CaseStudyDetail = {
  slug: string;
  title: string;
  eyebrow: string;
  year: string;
  role: string;
  client?: string;
  focus?: string;
  context: string;
  headline: string;
  summary: string;
  cover: CaseStudyCover;
  coverAlt: string;
  challenge: string;
  approach: string[];
  resultTitle: string;
  outcome: string;
};

const caseStudyDetails: CaseStudyDetail[] = [
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
    headline: "Replacing 30-minute branch visits with\n10-minute digital onboarding.",
    summary:
      "A clerk-guided, branch-only account opening, rebuilt as a self-serve digital flow that translates regulatory complexity into clarity, progress, and one decision at a time.",
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
  const isBank = project.slug === "bank-account-opening";
  const isFeature = isRehabilitation || isBank;
  const metaItems: [string, string][] = isRehabilitation
    ? [
        ["PROJECT", project.client ?? "Ministry of Defense"],
        ["ROLE", "Product Designer · End-to-end"],
        ["SCOPE", project.focus ?? "Strategy, IA, Core Flows"],
      ]
    : [
        ["PROJECT", "Digital banking"],
        ["ROLE", "Product Designer · End-to-end"],
        ["SCOPE", "Research, Onboarding, Flows"],
      ];

  return (
    <>
      <SiteHeader variant="caseStudy" />
      <main>
        <Container className="py-12 md:py-16">
          <header className="rise pb-12">
            {isFeature ? (
              <>
                <p className={`${GeistMono.className} mb-6 text-sm text-[var(--color-accent)]`}>{project.year}</p>
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
                <p className="mb-4 text-sm text-[var(--color-text)]">{project.eyebrow}</p>
                <h1
                  className="max-w-[11ch] font-normal leading-[1.08] tracking-[-0.015em]"
                  style={{ fontSize: "var(--font-size-hero)" }}
                >
                  {project.title}
                </h1>
                <p className="mt-6 max-w-[58ch] text-[var(--font-size-body-lg)] leading-[1.55] text-[var(--color-text)]">
                  {project.headline}
                </p>
              </>
            )}
          </header>

          <section className="rise rise-1 case-media">
            {project.cover.type === "image" ? (
              <div className="overflow-hidden rounded-[var(--radius-frame)] bg-[var(--color-surface)]">
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

          {isFeature ? <CaseStudyMeta items={metaItems} /> : null}

          {!isFeature ? (
            <section className="grid gap-8 border-b border-t border-[var(--color-line)] py-10 md:grid-cols-3">
              <div>
                <p className="text-sm text-[var(--color-text)]">Role</p>
                <p className="mt-2 leading-[1.55] text-[var(--color-ink)]">{project.role}</p>
              </div>
              <div>
                <p className="text-sm text-[var(--color-text)]">Year</p>
                <p className="mt-2 leading-[1.55] text-[var(--color-ink)]">{project.year}</p>
              </div>
              <div>
                <p className="text-sm text-[var(--color-text)]">Impact</p>
                <p className="mt-2 leading-[1.55] text-[var(--color-ink)]">
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
                <div className="case-img mt-14">
                  <div className="overflow-hidden rounded-[var(--radius-frame)] bg-[var(--color-surface)]">
                    <Image
                      src={researchCollage}
                      alt="Research in progress: remote user interviews, a How-Might-We workshop wall, and stakeholder sessions"
                      className="h-auto w-full"
                    />
                  </div>
                  <p className="mt-3 text-[13px] italic leading-[1.45] text-[var(--color-text)]">
                    Remote interviews, a How-Might-We workshop, and stakeholder sessions, where the reframe took shape.
                  </p>
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
                  src={shik1}
                  alt="Before view of the original rehabilitation navigation"
                  width={1856}
                  height={1170}
                />
                <CaseImage
                  src={shik2}
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
                  src={shik3}
                  alt="Before and after mobile screens for the rehabilitation service"
                  width={1856}
                  height={2050}
                />
                <CaseImage
                  src={shik4}
                  alt="Situation-based filtering and relevant service hubs for the rehabilitation service"
                  width={1856}
                  height={1190}
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
                  faster and navigate them more confidently. Not the ideal, but a real improvement under the
                  constraint.
                </p>
                <p>
                  Bringing life situations into search context was scoped as an intentional next step, planned for a
                  later phase rather than forced prematurely. Naming the compromise, and the path beyond it, was
                  part of the design decision.
                </p>
                <CaseImage
                  src={shik5}
                  alt="Before and after search experience for the rehabilitation service"
                  width={1856}
                  height={2050}
                />
                <CaseImage
                  src={shik6}
                  alt="Search filtering and result hierarchy in the rehabilitation service"
                  width={1856}
                  height={1190}
                />
              </CaseTextSection>

              <CaseTextSection label="Evidence of Impact">
                <p className="text-sm italic leading-[1.5] text-[var(--color-text)]">
                  Observed through Google Analytics, Microsoft Clarity session recordings, and follow-up usability
                  sessions after launch.
                </p>
                <div className="space-y-8 pt-2">
                  <FindingBlock
                    title="Clearer navigation journeys"
                    body="Users reached relevant services through more direct paths, with fewer unnecessary navigation decisions before finding what was relevant to them."
                  />
                  <FindingBlock
                    title="Reduced reliance on internal search"
                    body="Analytics showed a noticeable reduction in internal search usage after introducing situation-based navigation, suggesting users were able to find relevant content through the information architecture itself."
                  />
                  <FindingBlock
                    title="Faster orientation"
                    body="Follow-up usability sessions showed users identified the correct starting point earlier, spending less time figuring out where to begin."
                  />
                  <FindingBlock
                    title="Reduced dependency on organizational knowledge"
                    body="Users no longer needed to understand the Ministry’s internal structure before finding the service relevant to their situation."
                  />
                  <FindingBlock
                    title="72 forms removed from the primary navigation"
                    body="Simplifying the primary navigation reduced noise, shortened decision paths, and made the experience easier to understand."
                  />
                </div>
              </CaseTextSection>

              <CaseTextSection label="Reflection">
                <p>
                  Looking back, the biggest success wasn’t the navigation itself. It was changing how the team thought
                  about the product. We stopped organizing around departments and started organizing around people’s
                  real situations. Once that shift happened, every design decision became easier to align, easier to
                  validate through research, and ultimately easier for users to navigate.
                </p>
              </CaseTextSection>

              <CaseStudyOutro
                title="Bank account opening, rebuilt"
                href="/case-studies/bank-account-opening"
              />
            </>
          ) : isBank ? (
            <>
              <IntroBlock>
                <p>
                  Opening an account used to mean a physical branch visit, a manual, clerk-driven process running on
                  legacy operational systems. The challenge was broader than digitizing paperwork.
                </p>
                <p>
                  The audience included people with low digital confidence, so the interface had to teach structure as
                  it moved, replacing face-to-face guidance with a flow people could trust and complete on their own.
                </p>
              </IntroBlock>

              <CaseTextSection label="Problem" title="The flow relied on human orientation at every step.">
                <p>
                  The challenge wasn’t simplifying the process, but recreating the clarity, trust, and confidence a
                  clerk provided, through structure, expectation-setting, and plain-language decisions.
                </p>
              </CaseTextSection>

              <CaseTextSection label="Research">
                <p>
                  The work started in the branch, not in Figma. We watched clerks orienting customers rather than doing
                  the hard parts for them. Uncertainty, not task difficulty, was the main source of friction.
                </p>
                <div className="space-y-11 pt-7">
                  <NumberedCasePoint
                    number="01"
                    title="Field observations inside branches"
                    body="On-site observation of the account-opening process to understand the flow, the environment, and the systems clerks actually used."
                  />
                  <NumberedCasePoint
                    number="02"
                    title="Interviews with branch clerks"
                    body="Conversations with clerks to understand account opening from the operational side, and where customers leaned on them most."
                  />
                  <NumberedCasePoint
                    number="03"
                    title="Lean UX workshop with stakeholders"
                    body="Early alignment between product, operations, compliance, and design before any screen was drawn."
                  />
                  <NumberedCasePoint
                    number="04"
                    title="Collaboration with regulatory and operational teams"
                    body="Balancing regulatory requirements against usability and customer-experience needs."
                  />
                </div>
                <div className="case-img mt-14 mb-8 grid gap-4 sm:grid-cols-2">
                  <FieldPhoto
                    src={bankFieldBranch}
                    alt="A branch clerk’s workstation with the legacy account-opening terminal"
                    caption="The branch reality: a clerk’s desk and the legacy terminal behind account opening."
                  />
                  <FieldPhoto
                    src={bankFieldSystem}
                    alt="The legacy operational system observed in use during branch sessions"
                    caption="Observing the operational system in use, to learn what each step really asked for."
                  />
                </div>
              </CaseTextSection>

              <CaseTextSection label="Insights" title="Three insights that shaped the design.">
                <div className="space-y-8">
                  <FindingBlock
                    title="The branch experience was a guidance layer."
                    body="Customers relied on clerks to sequence the process, explain what mattered, and reassure them they were on the right path."
                  />
                  <FindingBlock
                    title="Uncertainty, not task difficulty, created friction."
                    body="People got stuck when they didn’t know how long it would take, why something was needed, or what counted as success."
                  />
                  <FindingBlock
                    title="Regulation needed translation."
                    body="The product couldn’t simply expose operational rules. It had to turn them into a legible customer journey."
                  />
                </div>
              </CaseTextSection>

              <CaseTextSection label="Direction" title="Recreating confidence in a self-service flow.">
                <p>
                  The goal was a self-serve process people could finish independently, even on their first digital
                  banking flow. One meaningful decision per screen, with progress and expectation-setting doing the work
                  a clerk used to do.
                </p>
              </CaseTextSection>

              <CaseTextSection label="Reframe" title="From internal system to customer experience.">
                <p>
                  The operational flow was redesigned into a visible, user-facing sequence that explained why each stage
                  existed. Backend and compliance steps were reframed as clear customer actions.
                </p>
                <CaseImage
                  src={bankSystemToExperience}
                  alt="The legacy internal terminal reframed into a clean customer-facing mobile flow"
                  width={1774}
                  height={1114}
                />
              </CaseTextSection>

              <CaseTextSection label="Focus" title="Reducing cognitive load through focused decisions.">
                <p>
                  Regulatory requirements were broken into isolated, digestible decisions. Each screen was narrowed to a
                  single choice or input, with supporting copy explaining what was needed and why.
                </p>
                <CaseImage
                  src={bankFocusedDecisions}
                  alt="Conditional follow-up questions that keep each screen to a single decision"
                  width={1774}
                  height={1114}
                />
              </CaseTextSection>

              <CaseTextSection label="Structure" title="Setting expectations through structure.">
                <p>
                  Visible progress, onboarding framing, and consistent sequencing replaced much of the reassurance
                  branch staff used to provide.
                </p>
                <CaseImage
                  src={bankFlowStructure}
                  alt="A three-phase structure with a visible step-of-three progress indicator across screens"
                  width={1774}
                  height={1114}
                />
              </CaseTextSection>

              <CaseTextSection label="Outcome" title="From a 30-minute branch visit to a 10-minute digital flow.">
                <p>
                  The final experience turned a clerk-guided branch process into a structured self-service onboarding
                  flow. Account-opening time dropped from roughly 30 minutes in-branch to about 10 minutes digitally.
                  Uncertainty was reduced through clearer structure, visible progress, and simpler decisions throughout.
                </p>
              </CaseTextSection>

              <CaseStudyOutro
                title="Rehabilitation platform IA"
                href="/case-studies/rehabilitation-platform"
              />
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
    <section className="flex flex-col gap-8 py-12 md:flex-row md:justify-between md:gap-10">
      {items.map(([label, value]) => (
        <div key={label}>
          <p className={`${GeistMono.className} text-sm uppercase tracking-normal text-[var(--color-accent)]`}>{label}</p>
          <p className="mt-2 whitespace-nowrap text-base font-normal leading-[1.4] text-[var(--color-ink)]">
            {value}
          </p>
        </div>
      ))}
    </section>
  );
}

function IntroBlock({ children }: { children: React.ReactNode }) {
  return (
    <section
      className="max-w-[58ch] space-y-7 pb-14 text-[var(--font-size-body-lg)] leading-[1.65]"
      style={{ color: "var(--color-ink)" }}
    >
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
          <p className={`${GeistMono.className} text-sm uppercase tracking-normal text-[var(--color-accent)]`}>
            <span aria-hidden="true">/ </span>
            {label}
          </p>
        ) : null}
      </div>
      <div className="space-y-5 text-base leading-[1.65] text-[var(--color-text)] [&>*:not(.case-img)]:max-w-[38rem]">
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
      <div className="relative h-[180px] overflow-hidden bg-[var(--color-surface)] md:h-[248px]">
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
      <p className={`${GeistMono.className} text-sm leading-[1.5] text-[var(--color-accent)]`}>{number}</p>
      <div>
        <h3 className="text-xl font-normal leading-[1.25] tracking-[-0.008em] text-[var(--color-ink)]">
          {title}
        </h3>
        <p className="mt-4 text-base leading-[1.65] text-[var(--color-text)]">{body}</p>
      </div>
    </div>
  );
}

function FindingBlock({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="text-xl font-normal leading-[1.25] tracking-[-0.008em] text-[var(--color-ink)]">{title}</h3>
      <p className="mt-3 text-base leading-[1.65] text-[var(--color-text)]">{body}</p>
    </div>
  );
}

function CaseImage({
  src,
  alt,
  width = 1856,
  height = 1188,
}: {
  src: string | StaticImageData;
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

function FieldPhoto({
  src,
  alt,
  caption,
}: {
  src: StaticImageData;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="m-0">
      <div className="aspect-[4/3] overflow-hidden rounded-[var(--radius-frame)] bg-[var(--color-surface)]">
        <Image src={src} alt={alt} className="h-full w-full object-cover" />
      </div>
      <figcaption className="mt-2.5 max-w-[42ch] text-[13px] leading-[1.45] text-[var(--color-text)]">
        {caption}
      </figcaption>
    </figure>
  );
}

function CaseStudyOutro({
  title,
  href,
}: {
  title: string;
  href: string;
}) {
  return (
    <section aria-labelledby="next-project-title" className="border-t border-[var(--color-line)] py-10 md:py-12">
      <p className={`${GeistMono.className} text-sm text-[var(--color-accent)]`}>Next case study</p>
      <Link
        href={href}
        className="group mt-3 inline-flex items-center gap-3 no-underline outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-bg)]"
      >
        <h2
          id="next-project-title"
          className="text-[clamp(1.25rem,3vw,1.75rem)] font-normal leading-[1.2] tracking-[-0.01em] text-[var(--color-ink)]"
        >
          {title}
        </h2>
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-surface)] text-[var(--color-accent)] transition-transform duration-150 ease-[var(--ease-out)] group-hover:translate-x-1">
          <ArrowRight className="h-3 w-3" />
        </span>
      </Link>
    </section>
  );
}
