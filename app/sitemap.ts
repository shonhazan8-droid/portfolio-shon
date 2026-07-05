import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/caseStudies";

const BASE_URL = "https://portfolio-shon.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...caseStudies.map((study) => ({
      url: `${BASE_URL}/case-studies/${study.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
