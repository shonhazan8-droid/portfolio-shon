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
    src: "/work/21.png",
    client: "Ministry of Defense",
    name: "Public Website & Personal Area",
    category: "Government • 2024",
    metric: "",
    description:
      "Redesigned the public website and personal area for easier self-service.",
  },
  {
    src: "/work/31.png",
    client: "Israel Post",
    name: "Self-Service Payment Kiosk",
    category: "Enterprise • 2023",
    metric: "",
    description:
      "Designed a kiosk experience for bill payments across Israel Post branches.",
  },
  {
    src: "/work/41.png",
    client: "Polissa",
    name: "Insurance Comparison Platform",
    category: "Fintech • 2023",
    metric: "",
    description:
      "Designed an end-to-end insurance comparison flow with gamified onboarding.",
  },
  {
    src: "/work/51.png",
    client: "Ministry of Defense",
    name: "Internal AI Dashboard",
    category: "Internal Tool • 2024",
    metric: "",
    description:
      "Designed a dashboard for reviewing forms and prioritizing cases with AI.",
  },
  {
    src: "/work/136shots_so.png",
    client: "Israel Electric Corporation",
    name: "Electric Consultants Dashboard",
    category: "B2B • 2022",
    metric: "",
    description:
      "Redesigned the system managing electrical consultants and field operations.",
  },
  {
    src: "/work/742shots_so.png",
    client: "Israel Post",
    name: "Parcel Pickup System",
    category: "Internal Tool • 2022",
    metric: "",
    description:
      "Redesigned the system clerks use to manage parcel pickup across centers.",
  },
  {
    src: "/work/824shots_so.png",
    client: "Israel Post",
    name: "Homepage & Information Architecture",
    category: "Consumer Product • 2023",
    metric: "",
    description:
      "Restructured the homepage to improve content discovery and navigation.",
  },
];
