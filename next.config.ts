import createMDX from "@next/mdx";

import remarkGfm from "remark-gfm";
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

  trailingSlash: true,
};

/* ─────────────────────────────────────────────
   MDX + KATEX
───────────────────────────────────────────── */

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm as any, remarkMath],

    rehypePlugins: [rehypeKatex],
  },
});

/* ─────────────────────────────────────────────
   EXPORT
───────────────────────────────────────────── */

export default withMDX(nextConfig);