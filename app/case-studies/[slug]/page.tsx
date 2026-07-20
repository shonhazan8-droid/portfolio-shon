import Image, { type StaticImageData } from "next/image";
import { notFound } from "next/navigation";
import { GeistMono } from "geist/font/mono";
import SiteHeader from "@/components/SiteHeader";
import Container from "@/components/Container";
import CaseCover from "@/components/CaseCover";
import TransitionLink from "@/components/TransitionLink";
import ArrowRight from "@/components/ArrowRight";
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
// TODO(placeholder): these are "before" screenshots pulled from the original
// UX expert report, not final production screenshots. Swap for real
// production captures of the shipped AI-classification flow before shipping
// this case study. See vault: 03 Projects/Portfolio Site/01 In Progress/
// Case Study - Document Upload/README.md for what's still needed.
// The old flow shown once, as a single 3-screen "before" strip (empty state →
// subject dropdown open → after one file). Replaces the scattered per-screen
// stills so the same UI isn't repeated across multiple sections.
import oldFlowComposite from "@/public/Case03/26273.png";
// The before/after comparison, placed near the end as the transformation payoff.
import beforeAfter from "@/public/Case03/beforeafter.png";

type CaseStudyCover =
  | { type: "image"; src: string; width: number; height: number }
  | { type: "lottie"; src: string };

type CaseStudyDetail = {
  slug: string;
  title: string;
  year: string;
  headline: string;
  summary: string;
  cover: CaseStudyCover;
  coverAlt: string;
  meta: [string, string][];
};

// Keep the Document Upload case private until Shon explicitly decides to publish it.
// Set NEXT_PUBLIC_PUBLISH_DOCUMENT_UPLOAD=true only when the case is ready to go live.
const isDocumentUploadPublished = process.env.NEXT_PUBLIC_PUBLISH_DOCUMENT_UPLOAD === "true";

const caseStudyDetails: CaseStudyDetail[] = [
  {
    slug: "rehabilitation-platform",
    title: "Rehabilitation platform IA",
    year: "2024 - 2026",
    headline: "People weren’t looking for information.\nThey were looking for certainty.",
    summary:
      "The platform exposed different services and assets from personnel through some of the hardest points of their service, injury, benefits, and recovery. It had to carry complex information without making people decode the organization first.",
    cover: { type: "lottie", src: "/Animate/shik-animate.json" },
    coverAlt: "Rehabilitation platform homepage interface",
    meta: [
      ["PROJECT", "Ministry of Defense"],
      ["ROLE", "Product Designer · End-to-end"],
      ["SCOPE", "Strategy, IA, Core Flows"],
    ],
  },
  {
    slug: "bank-account-opening",
    title: "Bank account opening, rebuilt",
    year: "2025",
    headline: "Replacing 30-minute branch visits with\n10-minute digital onboarding.",
    summary:
      "A clerk-guided, branch-only account opening, rebuilt as a self-serve digital flow that translates regulatory complexity into clarity, progress, and one decision at a time.",
    cover: { type: "lottie", src: "/Animate/post-animate.json" },
    coverAlt: "Animated bank account opening flow preview",
    meta: [
      ["PROJECT", "Digital banking"],
      ["ROLE", "Product Designer · End-to-end"],
      ["SCOPE", "Research, Onboarding, Flows"],
    ],
  },
  {
    // DRAFT — scope to confirm. See vault README for full brief.
    // 2026-07-11: reframed per /design-team review — differentiator is "the
    // system understands content," not "responsibility shift" (that framing
    // is already used by the Rehabilitation Platform case).
    slug: "document-upload",
    title: "Document submission, rethought",
    year: "2025 - 2026",
    headline: "The system used to ask people to explain their files.\nNow it reads them instead.",
    summary:
      "Uploading a document meant classifying it first. We replaced that step with a system that understands what people submit — without asking them to explain it.",
    cover: { type: "image", src: "/Case03/casehero.png", width: 1774, height: 1114 },
    coverAlt: "The redesigned submission flow: a single clean upload area, and the uploaded files automatically classified by the system with editable type tags.",
    meta: [
      ["PROJECT", "Ministry of Defense"],
      ["ROLE", "Product Designer · End-to-end"],
      ["SCOPE", "Research, AI-assisted flow"],
    ],
  },
];

export function generateStaticParams() {
  return caseStudyDetails
    .filter((project) => project.slug !== "document-upload" || isDocumentUploadPublished)
    .map((project) => ({ slug: project.slug }));
}

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = caseStudyDetails.find(
    (item) => item.slug === slug && (item.slug !== "document-upload" || isDocumentUploadPublished),
  );

  if (!project) {
    return {};
  }

  const pageTitle = `${project.title} · Shon Hazan`;
  const url = `/case-studies/${slug}`;

  return {
    title: pageTitle,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: {
      title: pageTitle,
      description: project.summary,
      url,
      type: "article",
      images: ["/og-cover.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: project.summary,
      images: ["/og-cover.png"],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = caseStudyDetails.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  // Each case study's body lives in its own component (below) and is looked
  // up by slug — avoids a growing ternary/if-else chain as more cases are added.
  const Body = CASE_BODIES[project.slug];

  return (
    <>
      <SiteHeader variant="caseStudy" />
      <main>
        <Container className="py-12 md:py-16">
          <header className="case-load case-load-0 pb-12">
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
          </header>

          <section className="case-media">
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

          <CaseStudyMeta items={project.meta} />

          {Body ? <Body /> : null}
        </Container>
      </main>
    </>
  );
}

// --- Case study bodies (one component per slug, looked up via CASE_BODIES) ---

function RehabilitationBody() {
  return (
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
                  <p className="mt-4 text-[15px] italic leading-[1.5] text-[var(--color-text)]">
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
  );
}

function BankAccountBody() {
  return (
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
                title={isDocumentUploadPublished ? "Document upload, rethought with AI" : "Rehabilitation platform IA"}
                href={isDocumentUploadPublished ? "/case-studies/document-upload" : "/case-studies/rehabilitation-platform"}
              />
    </>
  );
}

// DRAFT — placeholder body, rebuilt 2026-07-11 per /design-team review of a
// new narrative brief. Real screenshots still don't exist for most sections —
// every unlabeled gap below is a PlaceholderVisual, clearly marked. DO NOT
// commit/push/deploy until every placeholder is replaced with a real
// production screenshot (a page with visible "[PLACEHOLDER]" text in
// production contradicts the case study's own point). See vault README:
// 03 Projects/Portfolio Site/01 In Progress/Case Study - Document Upload/README.md
function DocumentUploadBody() {
  return (
    <>
      <IntroBlock>
        <p>
          Uploading a document should be one of the simplest things a person does in a product. In the
          Rehabilitation Division&rsquo;s platform, it had quietly become one of the most cognitively
          demanding — and it sat in front of nearly every service, so that weight spread everywhere.
        </p>
      </IntroBlock>

      <CaseTextSection label="The conflict" title="The person thinks in documents. The system thinks in categories.">
        <p>
          Ask someone what they&rsquo;re doing, and it&rsquo;s one sentence. Ask the system, and it&rsquo;s a
          checklist.
        </p>
        <MentalModelComparison />
        <p className="pt-2">
          Every line in that second column is a decision the system made the person answer before it would
          take a single file. The whole project lived in that gap.
        </p>
      </CaseTextSection>

      <CaseTextSection label="The cost" title="Every screen asked for another decision.">
        <p>
          This wasn&rsquo;t a hunch. I took the live flow apart to see exactly how much it put on the person,
          then checked that against how people actually behaved.
        </p>
        <div className="space-y-11 pt-7">
          <NumberedCasePoint
            number="01"
            title="A close audit of the live flow"
            body="I went through the flow screen by screen, rating each friction point by severity. The same shape kept repeating — decide first, then you may act — and it got worse with every extra document a request carried."
          />
          <NumberedCasePoint
            number="02"
            title="What people actually did"
            body="Then I looked at real behavior — Google Analytics for the numbers, and Microsoft Clarity session recordings to watch where people stalled, backed out, or dumped everything under one category to avoid the choices."
          />
        </div>
        <div className="case-img mt-14">
          <div className="overflow-hidden rounded-[var(--radius-frame)] bg-[var(--color-surface)]">
            <Image
              src={oldFlowComposite}
              alt="The old upload flow across three screens: choosing a subject before uploading, the subject dropdown open, and the state after one file where a second attach area appears with two different 'add file' actions."
              className="h-auto w-full"
            />
          </div>
          <p className="mt-4 text-[15px] italic leading-[1.5] text-[var(--color-text)]">
            Each screen adds a decision: pick a subject before you can upload, reopen the same menu for every
            file, then untangle a second attach area the moment a document doesn&rsquo;t match the first.
          </p>
        </div>
        <p className="pt-2">Then the behavior data settled it. Of 1,038,513 requests submitted in 2025:</p>
        <StatCallout value="4.3%">
          bundled more than one document type. People weren&rsquo;t using the flow wrong — they were escaping
          it, dumping everything under one category to dodge the pile of decisions.
        </StatCallout>
      </CaseTextSection>

      <CaseTextSection label="Scale" title="And it was rarely one document.">
        <p>
          A single rehabilitation request could carry eight documents. Sometimes fourteen — across different
          categories, some required, some optional, some the person wasn&rsquo;t sure about. Every one of them
          meant another full round of the same decisions.
        </p>
        <p>
          That was the real brief. Not &ldquo;make upload nicer,&rdquo; but: hold that much complexity without
          handing it to the person one decision at a time.
        </p>
      </CaseTextSection>

      <CaseTextSection label="Directions" title="What if the person didn't have to decide at all?">
        <p>
          Add it up: for every file, choose a category, a topic, a state, a group — then repeat. The design
          problem was never the upload button. It was the stack of decisions standing in front of it.
        </p>
        <p>
          So the question stopped being &ldquo;how do we lay this out better&rdquo; and became: who has to make
          all these decisions — and what if the answer could be no one? I explored three ways to get there,
          each one taking more of the decision off the person.
        </p>
        <p>
          These aren&rsquo;t mockups. I built each direction as real, working screens in Figma Make —
          vibe-coding them from scratch, then wiring in our own design-system tokens so they behaved like the
          live product. That let me iterate in hours, and judge each version the way it would actually feel: the
          motion, the hovers, the moment a file lands. The clips below are those builds, editor and all.
        </p>

        <SolutionDirection
          status="Rejected"
          title="Move the decision — make it once, for everything."
          body="One control set a category for the whole batch. Faster only if every document was the same type — and per the data, they almost never were. The decision was still the person's; it just moved."
        />
        <CaseVideo
          src="/Case03/solution-rejected.mp4"
          poster="/Case03/poster-rejected.png"
          caption="Direction 1: one category applied to every file at once, plus a per-file dropdown. The decision is still there — now in two places."
        />

        <SolutionDirection
          status="Interim"
          title="Soften the decision — make it friendlier."
          body="Files were grouped by type through named areas instead of a blocking dropdown. Genuinely better. But it still asked people to know what each document was before the system would take it."
        />
        <CaseVideo
          src="/Case03/solution-interim.mp4"
          poster="/Case03/poster-interim.png"
          caption="Direction 2: grouping by type with named cards and chips. Cleaner — but classification is still the person's job."
        />

        <SolutionDirection
          status="Shipped"
          title="Remove the decision — let the system read the file."
          body="The person drops every file in one action. The system reads each one, assigns its type, and shows it back with an edit control in case it's wrong. The only direction that took the decision off the person entirely — which is exactly why the rest of the flow could get this simple."
        />
        <CaseVideo
          src="/Case03/solution-ai.mp4"
          poster="/Case03/poster-ai.png"
          caption="Direction 3, shipped: upload everything, the system classifies each file, and you can correct any label."
        />

        <p className="pt-2">
          The first two directions moved the decision around. Only the third made it disappear — and the moment
          no one had to classify anything, the whole flow got simpler on its own.
        </p>
      </CaseTextSection>

      <CaseTextSection label="The shipped flow" title="The system reads the file. The person explains nothing.">
        <p>
          The clip above shows it end to end. You drop every file at once, with nothing to classify first.
          Behind the upload, the AI reads each document and tags it against the classification list we defined
          in the backend — the exact set of categories a person used to sort through by hand. The result comes
          back editable, in case it&rsquo;s wrong, but the default path asks the person for nothing.
        </p>
        <p>
          That&rsquo;s where the AI actually lives: not a feature bolted on top, but the thing doing the one job
          we took off the person — matching a document to the system&rsquo;s own categories. The taxonomy didn&rsquo;t
          change; who has to navigate it did.
        </p>
        <p>
          Everything else falls out of that one move. A single, legible status instead of per-file menus.
          Preview and validation before anything is sent. One progress indicator for the whole request, whether
          it holds one document or fourteen. Each part earns its place by removing a decision, not adding a
          feature.
        </p>
        <div className="case-img mt-14">
          <div className="overflow-hidden rounded-[var(--radius-frame)] bg-[var(--color-surface)]">
            <Image
              src={beforeAfter}
              alt="Before and after, side by side: the old screen with a subject dropdown and a disabled upload button, next to the redesigned screen with a single open upload area."
              className="h-auto w-full"
            />
          </div>
          <p className="mt-4 text-[15px] italic leading-[1.5] text-[var(--color-text)]">
            Before and after: a screen built around the system&rsquo;s categories, remade into one that asks for
            the file and nothing else.
          </p>
        </div>
      </CaseTextSection>

      <CaseTextSection label="Outcome" title="Fewer decisions, and room to grow.">
        <p>
          The redesign pulled the decisions out of the front of the flow, and left an architecture that can take
          new document types without a rebuild each time. The numbers that would prove it — completion time,
          drop-off, support load — aren&rsquo;t in yet, so I won&rsquo;t claim a result the data hasn&rsquo;t
          shown. The 4.3% measured the problem; the fix will be measured by how the flow gets used.
        </p>
      </CaseTextSection>

      <CaseTextSection label="Reflection">
        <p>
          This project changed how I think about AI in product design. The goal was never to make the interface
          smarter. It was to stop asking people to understand the system — and to build a system that
          understands them instead.
        </p>
        <p>
          That&rsquo;s the thread through everything here. The best interaction is often not a better version of
          the old one. It&rsquo;s the one nobody has to do at all.
        </p>
      </CaseTextSection>

      <CaseStudyOutro
        title="Rehabilitation platform IA"
        href="/case-studies/rehabilitation-platform"
      />
    </>
  );
}

const CASE_BODIES: Record<string, () => React.ReactNode> = {
  "rehabilitation-platform": RehabilitationBody,
  "bank-account-opening": BankAccountBody,
  "document-upload": DocumentUploadBody,
};

function CaseStudyMeta({ items }: { items: [string, string][] }) {
  return (
    <section className="case-load case-load-2 flex flex-col gap-8 py-12 md:flex-row md:justify-between md:gap-10">
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
      className="case-load case-load-3 max-w-[58ch] space-y-7 pb-14 text-[var(--font-size-body-lg)] leading-[1.65]"
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
    <section className="case-load case-load-section grid gap-5 py-14">
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

// A prototype recording, shown with its Figma Make editor frame intact — the
// editor is deliberately part of the story (prototyping in Figma to feel motion
// and interaction, not static mockups). Autoplays muted + looped so the motion
// reads on the page; controls let the viewer scrub.
function CaseVideo({
  src,
  poster,
  caption,
}: {
  src: string;
  poster?: string;
  caption?: string;
}) {
  return (
    <div className="case-img mt-14">
      <div className="overflow-hidden rounded-[var(--radius-frame)] bg-[var(--color-surface)]">
        <video
          className="h-auto w-full"
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="metadata"
        />
      </div>
      {caption ? (
        <p className="mt-4 text-[15px] italic leading-[1.5] text-[var(--color-text)]">{caption}</p>
      ) : null}
    </div>
  );
}

// One explored design direction, with a status badge (Rejected / Interim /
// Shipped), a short rationale, and its visual. Used in the "Directions" section
// to show the three approaches that led to the chosen one.
function SolutionDirection({
  status,
  title,
  body,
}: {
  status: "Rejected" | "Interim" | "Shipped";
  title: string;
  body: string;
}) {
  const isShipped = status === "Shipped";
  return (
    <div className="border-t border-[var(--color-line)] pt-8">
      <span
        className={`${GeistMono.className} inline-block text-sm uppercase tracking-normal ${
          isShipped ? "text-[var(--color-accent)]" : "text-[var(--color-text)]"
        }`}
      >
        {status}
      </span>
      <h3 className="mt-3 text-xl font-normal leading-[1.25] tracking-[-0.008em] text-[var(--color-ink)]">
        {title}
      </h3>
      <p className="mt-4 text-base leading-[1.65] text-[var(--color-text)]">{body}</p>
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

// The case's single strongest data point, pulled out large so it lands instead
// of getting swallowed in a body paragraph.
function StatCallout({ value, children }: { value: string; children: React.ReactNode }) {
  return (
    <div className="my-16">
      <p
        className="font-normal leading-[0.9] tracking-[-0.03em] text-[var(--color-accent)]"
        style={{ fontSize: "clamp(4rem, 12vw, 7rem)" }}
      >
        {value}
      </p>
      <p className="mt-6 max-w-[34rem] text-xl leading-[1.45] text-[var(--color-ink)]">{children}</p>
    </div>
  );
}

function MentalModelComparison() {
  return (
    <div className="mt-14 grid gap-4 sm:grid-cols-2">
      <div className="rounded-[var(--radius-frame)] border border-[var(--color-line)] bg-[var(--color-surface)] p-8">
        <p className={`${GeistMono.className} mb-4 text-sm uppercase tracking-normal text-[var(--color-accent)]`}>
          User
        </p>
        <p className="text-lg leading-[1.5] text-[var(--color-ink)]">“I have documents.”</p>
      </div>
      <div className="rounded-[var(--radius-frame)] border border-[var(--color-line)] bg-[var(--color-surface)] p-8">
        <p className={`${GeistMono.className} mb-4 text-sm uppercase tracking-normal text-[var(--color-accent)]`}>
          System
        </p>
        <ol className="space-y-2 text-lg leading-[1.5] text-[var(--color-ink)]">
          <li>Choose category</li>
          <li>Choose topic</li>
          <li>Choose state</li>
          <li>Choose group</li>
          <li>Upload</li>
          <li>Repeat</li>
        </ol>
      </div>
    </div>
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
      <TransitionLink
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
      </TransitionLink>
    </section>
  );
}
