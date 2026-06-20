export type Project = {
  slug: string;
  name: string;
  category: string;
  description: string;
  metric: string;
  year: string;
  /** Screenshot shown in the hero gallery. */
  image?: string;
};

export const projects: Project[] = [
  { slug: "account-opening", name: "Account Opening", category: "Fintech · Mobile", description: "Onboarding reduced to one decision at a time.", metric: "−40% drop-off", year: "2025", image: "/work/1931.png" },
  { slug: "rehabilitation-platform", name: "Rehabilitation Platform", category: "Public Sector · Web", description: "IA rebuilt around life situations, not departments.", metric: "−72 forms", year: "2024", image: "/work/rehabilitation-platform.png" },
  { slug: "doctors-panel", name: "Doctors Panel", category: "Healthcare · Web", description: "Automated prescription approval, both sides in sync.", metric: "−65% approval time", year: "2024", image: "/work/1927.png" },
  { slug: "field-quote-tool", name: "Field Quote Tool", category: "SaaS · Web", description: "Manual estimates turned into a guided, repeatable flow.", metric: "10× faster", year: "2023", image: "/work/1928.png" },
  { slug: "trading-system", name: "Trading System", category: "Fintech · Tooling", description: "A disciplined interface for entries, exits and limits.", metric: "20 rules enforced", year: "2023", image: "/work/1929.png" },
  { slug: "pattern-library", name: "Pattern Library", category: "Design Systems", description: "A static, searchable source of truth for UI patterns.", metric: "1 source of truth", year: "2022", image: "/work/1930.png" },
];
