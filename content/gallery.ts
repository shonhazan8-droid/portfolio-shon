export type Slide = {
  src: string;
  name: string;
  category: string;
  metric: string;
  description: string;
  client?: string;
};

/** Gallery content for the "More work" carousel (components/HeroCarousel.tsx). */
export const placeholderSlides: Slide[] = [
  {
    src: "/work/G1.0.png",
    client: "Ministry of Defense",
    name: "Public Website & Personal Area",
    category: "Government • 2024",
    metric: "",
    description:
      "Redesigned the public website and personal area for easier self-service.",
  },
  {
    src: "/work/G2.0.png",
    client: "Israel Post",
    name: "Self-Service Payment Kiosk",
    category: "Enterprise • 2023",
    metric: "",
    description:
      "Designed a kiosk experience for bill payments across Israel Post branches.",
  },
  {
    src: "/work/G3.0.png",
    client: "Polissa",
    name: "Insurance Comparison Platform",
    category: "Fintech • 2023",
    metric: "",
    description:
      "Designed an end-to-end insurance comparison flow with gamified onboarding.",
  },
  {
    src: "/work/G4.0.png",
    client: "Ministry of Defense",
    name: "Internal AI Dashboard",
    category: "Internal Tool • 2024",
    metric: "",
    description:
      "Designed a dashboard for reviewing forms and prioritizing cases with AI.",
  },
  {
    src: "/work/G5.0.png",
    client: "Israel Electric Corporation",
    name: "Electric Consultants Dashboard",
    category: "B2B • 2022",
    metric: "",
    description:
      "Redesigned the system managing electrical consultants and field operations.",
  },
  {
    src: "/work/G6.0.png",
    client: "Israel Post",
    name: "Parcel Pickup System",
    category: "Internal Tool • 2022",
    metric: "",
    description:
      "Redesigned the system clerks use to manage parcel pickup across centers.",
  },
  {
    src: "/work/G7.0.png",
    client: "Israel Post",
    name: "Homepage & Information Architecture",
    category: "Consumer Product • 2023",
    metric: "",
    description:
      "Restructured the homepage to improve content discovery and navigation.",
  },
];
