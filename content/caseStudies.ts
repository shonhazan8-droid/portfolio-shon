export type CaseStudy = {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  /** Optional Lottie animation (in /public) used as the cover. */
  cover?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "rehabilitation-platform",
    eyebrow: "Case study · Public sector",
    title: "Rehabilitation platform IA",
    summary: "The site was organized around departments. We reorganized it around\nthe real situations that bring people in.",
    cover: "/Animate/shik-animate.json",
  },
  {
    slug: "bank-account-opening",
    eyebrow: "Case study · Fintech",
    title: "Bank account opening, rebuilt",
    summary: "Digitizing the flow removed the banker who built confidence. The redesign makes progress visible and asks for one decision at a time.",
    cover: "/Animate/post-animate.json",
  },
];
