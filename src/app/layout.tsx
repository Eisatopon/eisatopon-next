import type { Metadata } from "next";
import {
  Playfair_Display,
  Source_Serif_4,
  JetBrains_Mono,
  Inter,
} from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";

const playfair    = Playfair_Display({ subsets: ["latin", "latin-ext"], variable: "--font-playfair",    display: "swap" });
const sourceSerif = Source_Serif_4({  subsets: ["latin", "latin-ext"], variable: "--font-source-serif", display: "swap", weight: ["400", "600"] });
const jetbrains   = JetBrains_Mono({  subsets: ["latin"],              variable: "--font-jetbrains",    display: "swap" });
const inter       = Inter({           subsets: ["latin", "latin-ext"], variable: "--font-inter",         display: "swap" });

const fontVars = [
  playfair.variable,
  sourceSerif.variable,
  jetbrains.variable,
  inter.variable,
].join(" ");

export const metadata: Metadata = {
  title: {
    default:  "EisatoponAI — Mathematical Problem Banks",
    template: "%s | EisatoponAI",
  },
  description: "Interactive mathematical archives, olympiad problems and AI-powered learning.",
  keywords: ["μαθηματικά", "πανελλαδικές", "ολυμπιάδα", "mathematics", "olympiad", "problem solving"],
  authors: [{ name: "Σωκράτης Κορομηλάς" }],
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title:       "EisatoponAI — Mathematical Problem Banks",
    description: "Interactive mathematical archives, olympiad problems and AI-powered learning.",
    siteName:    "EisatoponAI",
    locale:      "el_GR",
    type:        "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el" className={`${fontVars} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
