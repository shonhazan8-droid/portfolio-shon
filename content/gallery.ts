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
    client: "Sheba Medical Center",
    name: "Patient Dashboard",
    category: "",
    metric: "",
    description:
      "A digital hub that helps patients manage their hospital stay, access medical information, and use bedside entertainment services.",
  },
  {
    src: "/work/G2.0.png",
    client: "Israel Post Bank",
    name: "Private Banking Platform",
    category: "",
    metric: "",
    description:
      "A banking system for managing accounts, payments, and everyday financial operations.",
  },
  {
    src: "/work/G3.0.png",
    client: "Israel Post",
    name: "Bill Payment Kiosk",
    category: "",
    metric: "",
    description:
      "A self-service kiosk that lets customers pay bills independently, reducing queues at post offices.",
  },
  {
    src: "/work/G4.0.png",
    client: "Israel Post",
    name: "Parcel Pickup Centers",
    category: "",
    metric: "",
    description:
      "A B2B platform that helps parcel pickup locations manage deliveries and daily operations.",
  },
  {
    src: "/work/G5.0.png",
    client: "Ministry of Defense",
    name: "Rehabilitation Dashboard",
    category: "",
    metric: "",
    description:
      "An internal dashboard for managing rehabilitation data, prioritizing cases, and exploring information with AI-powered insights.",
  },
  {
    src: "/work/G6.0.png",
    client: "Polisa",
    name: "Insurance Comparison Flow",
    category: "",
    metric: "",
    description:
      "An end-to-end insurance comparison experience designed to simplify complex decisions and increase completion.",
  },
  {
    src: "/work/G7.0.png",
    client: "Israel Post",
    name: "Corporate Website",
    category: "",
    metric: "",
    description:
      "A redesigned homepage focused on helping customers quickly access the services they need.",
  },
];
