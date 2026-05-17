import fs from "fs/promises";
import path from "path";

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

async function createPost() {
  const title = process.argv.slice(2).join(" ");

  if (!title) {
    console.log("❌ Please provide a title.");
    process.exit(1);
  }

  const slug = slugify(title);

  const today = new Date().toISOString().split("T")[0];

  const mdxContent = `---
title: "${title}"
date: "${today}"
author: "EisatoponAI Team"
category: "Mathematics"
featured: false
readTime: "5 min read"
summary: ""
image: ""
---

Write your article here.
`;

  await fs.mkdir(ARTICLES_DIR, { recursive: true });

  const filePath = path.join(
    ARTICLES_DIR,
    `${slug}.mdx`
  );

  try {
    await fs.access(filePath);

    console.log("❌ File already exists.");
    process.exit(1);
  } catch {
    // file does not exist
  }

  await fs.writeFile(filePath, mdxContent);

  console.log(`✅ Created:
${filePath}`);
}

createPost().catch(console.error);