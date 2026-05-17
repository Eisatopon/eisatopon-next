import type { Metadata } from "next";
import {
  Playfair_Display,
  Source_Serif_4,
  JetBrains_Mono,
  Inter,
} from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin", "latin-ext"],
  variable: "--font-source-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const fontVars = [
  playfair.variable,
  sourceSerif.variable,
  jetbrains.variable,
  inter.variable,
].join(" ");

export const metadata: Metadata = {
  title: {
    default: "EisatoponAI — Mathematical Problem Banks",
    template: "%s | EisatoponAI",
  },
  description: "Interactive mathematical archives, olympiad problems and AI-powered learning.",
  keywords: ["mathematics", "olympiad", "problem solving", "IMO", "panelladikes", "hellenic exams"],
  authors: [{ name: "Sokratis Koromilás" }],
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "EisatoponAI — Mathematical Problem Banks",
    description: "Interactive mathematical archives, olympiad problems and AI-powered learning.",
    siteName: "EisatoponAI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "EisatoponAI",
      },
    ],
  },
};

// ─── JSON-LD Schema ─────────────────────────────────────
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "EisatoponAI",
  url: "https://eisatopon.gr",
  description: "Interactive mathematical archives, olympiad problems and AI-powered learning.",
  publisher: {
    "@type": "Organization",
    name: "EisatoponAI",
    logo: {
      "@type": "ImageObject",
      url: "https://eisatopon.gr/logo.png",
      width: 512,
      height: 512,
    },
  },
  sameAs: [
    "https://facebook.com/eisatopon",
    "https://linkedin.com/company/eisatopon",
    "https://x.com/eisatopon",
    "https://instagram.com/eisatopon",
    "https://youtube.com/@eisatopon",
    "https://pinterest.com/eisatopon",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el" className={`${fontVars} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="bg-base text-ink-primary">
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}