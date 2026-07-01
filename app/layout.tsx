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

export const metadata: Metadata = {
  title: "Shon · Senior Product Designer",
  description: "Six years designing clarity into complex products. Fintech, public sector, health.",
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
