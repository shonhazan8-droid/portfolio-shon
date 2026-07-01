import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const cursorGothic = localFont({
  variable: "--font-cursor-gothic",
  display: "swap",
  src: [
    { path: "./fonts/CursorGothic-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/CursorGothic-Italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/CursorGothic-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/CursorGothic-BoldItalic.woff2", weight: "700", style: "italic" },
  ],
});

// Always resolve OG/canonical URLs to the PUBLIC production domain.
// VERCEL_URL (per-deployment) is intentionally avoided: those URLs sit behind
// Vercel Deployment Protection and 302 to a login page, so social crawlers
// can't fetch the OG image from them.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://portfolio-shon.vercel.app");

const siteDescription =
  "Six years designing clarity into complex products. Fintech, public sector, health.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Shon · Senior Product Designer",
  description: siteDescription,
  openGraph: {
    title: "Shon Hazan · Product Designer",
    description: siteDescription,
    url: "/",
    siteName: "Shon Hazan",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-cover.png",
        width: 1200,
        height: 664,
        alt: "Shon Hazan · Product Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shon Hazan · Product Designer",
    description: siteDescription,
    images: ["/og-cover.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cursorGothic.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
