import fs from "node:fs";
import path from "node:path";
import { projects } from "./projects";

export type Slide = {
  src: string;
  name: string;
  category: string;
  metric: string;
};

const IMAGE_RE = /\.(png|jpe?g|webp|avif|gif|svg)$/i;

/**
 * Reads every image in /public/work and turns it into a gallery slide.
 * Whatever is in the folder shows up — drop a file in, it appears.
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
      return { src: `/work/${file}`, name: meta.name, category: meta.category, metric: meta.metric };
    }

    const name = file
      .replace(IMAGE_RE, "")
      .replace(/[-_]+/g, " ")
      .trim()
      .replace(/\b\w/g, (c) => c.toUpperCase());

    return { src: `/work/${file}`, name: name || file, category: "Selected work", metric: "" };
  });
}
