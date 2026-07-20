import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import PageTransition from "@/components/PageTransition";
import SmoothScroll from "@/components/SmoothScroll";
import Splash from "@/components/Splash";
import CustomCursor from "@/components/CustomCursor";
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

const openRunde = localFont({
  variable: "--font-open-runde",
  display: "swap",
  src: [
    { path: "./fonts/OpenRunde-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/OpenRunde-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/OpenRunde-Semibold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/OpenRunde-Bold.woff2", weight: "700", style: "normal" },
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

const clarityProjectId = "xpgsamnrdi";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Shon Hazan · Product Designer",
  description: siteDescription,
  applicationName: "Shon Hazan · Portfolio",
  authors: [{ name: "Shon Hazan", url: siteUrl }],
  creator: "Shon Hazan",
  publisher: "Shon Hazan",
  keywords: [
    "Shon Hazan",
    "Product Designer",
    "UX Designer",
    "UI Designer",
    "Product design portfolio",
    "UX portfolio",
    "Design systems",
    "Information architecture",
    "Fintech design",
    "Public sector UX",
    "AI product design",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
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

// Machine-readable profile (schema.org). Not rendered visually, but parsed by
// search engines and AI systems (e.g. recruiting tools) for a richer, accurate
// picture than the on-page copy alone. Facts here are all derived from the
// site's own content — no invented credentials.
const profileJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Shon Hazan",
      givenName: "Shon",
      familyName: "Hazan",
      jobTitle: "Product Designer",
      description:
        "Shon Hazan is a product designer with 6+ years of experience designing clear, usable products across fintech, public sector, and healthcare. Currently a Senior UX Designer at Matrix, he has designed end-to-end experiences for organizations including the Israeli Ministry of Defense, Israel Post, Israel Post Bank, and Sheba Medical Center, spanning user research, information architecture, core flows, and design systems, with AI woven into his process.",
      url: siteUrl,
      email: "shonhazan8@gmail.com",
      image: `${siteUrl}/og-cover.png`,
      sameAs: ["https://www.linkedin.com/in/shon-hazan-095373199/"],
      worksFor: { "@type": "Organization", name: "Matrix" },
      knowsLanguage: ["English", "Hebrew"],
      knowsAbout: [
        "Product design",
        "User experience (UX) design",
        "User interface (UI) design",
        "Information architecture",
        "User research",
        "Design systems",
        "Interaction design",
        "Prototyping",
        "Usability testing",
        "AI-assisted design",
        "B2B products",
        "B2C products",
        "Fintech",
        "Public sector digital services",
        "Healthcare product design",
      ],
      hasOccupation: {
        "@type": "Occupation",
        name: "Product Designer",
        occupationLocation: { "@type": "Country", name: "Israel" },
        skills:
          "Product design, UX design, UI design, information architecture, user research, design systems, AI-assisted design, prototyping, usability testing",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Shon Hazan · Product Designer",
      description: siteDescription,
      inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: "Shon Hazan · Product Designer",
      inLanguage: "en",
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#person` },
      mainEntity: { "@id": `${siteUrl}/#person` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cursorGothic.variable} ${openRunde.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityProjectId}");
          `}
        </Script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Structured data: machine-readable profile for search engines and AI. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
        />
        {/* Mark repeat visits before paint so the splash only plays once per session */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('sh-splash'))document.documentElement.dataset.splash='seen';else sessionStorage.setItem('sh-splash','1')}catch(e){}",
          }}
        />
        <Splash />
        <CustomCursor />
        <SmoothScroll />
        <PageTransition>{children}</PageTransition>
        <Analytics />
      </body>
    </html>
  );
}
