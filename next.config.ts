import createMDX from "@next/mdx";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import type { NextConfig } from "next";

/* ─────────────────────────────────────────────
   NEXT CONFIG
───────────────────────────────────────────── */

const nextConfig: NextConfig = {
  output: "export",

  distDir: "dist",

  reactStrictMode: true,

  images: {
    unoptimized: true,
  },

  pageExtensions: [
    "js",
    "jsx",
    "md",
    "mdx",
    "ts",
    "tsx",
  ],
};

/* ─────────────────────────────────────────────
   MDX + KATEX
───────────────────────────────────────────── */

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkMath],

    rehypePlugins: [rehypeKatex],
  },
});

/* ─────────────────────────────────────────────
   EXPORT
───────────────────────────────────────────── */

export default withMDX(nextConfig);