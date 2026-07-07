import fs from "node:fs";
import path from "node:path";
import { projects } from "./projects";

export type Slide = {
  src: string;
  name: string;
  category: string;
  metric: string;
  description: string;
  client?: string;
  tags?: string[];
};

/**
 * Placeholder gallery content — real copy, stand-in images (reusing whatever
 * is already in /public/work). Swap the `src` values and refine text later.
 * The carousel currently reads this instead of getGallerySlides().
 */
export const placeholderSlides: Slide[] = [
  {
    src: "/work/21.png",
    client: "Ministry of Defense",
    name: "Public Website & Personal Area",
    category: "Government • 2024",
    metric: "",
    description:
      "Redesigned the public website and personal area, improving navigation, information architecture and self-service.",
    tags: ["UX Research", "Product Design", "Accessibility"],
  },
  {
    src: "/work/31.png",
    client: "Israel Post",
    name: "Self-Service Payment Kiosk",
    category: "Enterprise • 2023",
    metric: "",
    description:
      "Designed a kiosk experience for bill payments used across Israel Post branches.",
    tags: ["Kiosk", "Service Design", "UX"],
  },
  {
    src: "/work/41.png",
    client: "Polissa",
    name: "Insurance Comparison Platform",
    category: "Fintech • 2023",
    metric: "",
    description:
      "Designed an end-to-end insurance comparison flow with a gamified onboarding experience.",
    tags: ["Conversion", "Gamification", "Landing Page"],
  },
  {
    src: "/work/51.png",
    client: "Ministry of Defense",
    name: "Internal AI Dashboard",
    category: "Internal Tool • 2024",
    metric: "",
    description:
      "Designed an operational dashboard for analyzing submitted forms and prioritizing cases using AI-assisted insights.",
    tags: ["AI Features", "Dashboard", "Internal Tool"],
  },
  {
    src: "/work/136shots_so.png",
    client: "Israel Electric Corporation",
    name: "Electric Consultants Dashboard",
    category: "B2B • 2022",
    metric: "",
    description:
      "Redesigned a complex internal system for managing electrical consultants and field operations.",
    tags: ["B2B", "Complex Workflows", "Dashboard"],
  },
  {
    src: "/work/742shots_so.png",
    client: "Israel Post",
    name: "Parcel Pickup System",
    category: "Internal Tool • 2022",
    metric: "",
    description:
      "Redesigned the system used by clerks to manage parcel pickup across delivery centers.",
    tags: ["Internal System", "Service Design"],
  },
  {
    src: "/work/824shots_so.png",
    client: "Israel Post",
    name: "Homepage & Information Architecture",
    category: "Consumer Product • 2023",
    metric: "",
    description:
      "Restructured the homepage and navigation to improve content discovery and user journeys.",
    tags: ["Information Architecture", "Navigation"],
  },
];

const IMAGE_RE = /\.(png|jpe?g|webp|avif|gif|svg)$/i;

/**
 * Reads every image in /public/work and turns it into a gallery slide.
 * Whatever is in the folder shows up: drop a file in, it appears.
 * Files matched against projects.ts (by filename) keep their metadata;
 * unmatched files get a caption derived from the filename.
 */
export function getGallerySlides(): Slide[] {
  const dir = path.join(process.cwd(), "public", "work");

  let files: string[] = [];
  try {
    files = fs.readdirSync(dir).filter((f) => IMAGE_RE.test(f));
  } catch {
    files = [];
  }

  files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const byFile = new Map(
    projects
      .filter((p) => p.image)
      .map((p) => [p.image!.replace(/^\/work\//, ""), p] as const),
  );

  return files.map((file) => {
    const meta = byFile.get(file);
    if (meta) {
      return { src: `/work/${file}`, name: meta.name, category: meta.category, metric: meta.metric, description: meta.description };
    }

    const name = file
      .replace(IMAGE_RE, "")
      .replace(/[-_]+/g, " ")
      .trim()
      .replace(/\b\w/g, (c) => c.toUpperCase());

    return { src: `/work/${file}`, name: name || file, category: "Selected work", metric: "", description: "" };
  });
}
