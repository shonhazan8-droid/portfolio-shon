import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/style-guide",
    },
    sitemap: "https://portfolio-shon.vercel.app/sitemap.xml",
  };
}
