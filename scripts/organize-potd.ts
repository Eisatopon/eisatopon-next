import fs from "fs/promises";
import path from "path";

const POTD_DIR = path.join(process.cwd(), "content/potd");

async function organize() {
  const entries = await fs.readdir(POTD_DIR, { withFileTypes: true });
  const mdxFiles = entries.filter(e => e.isFile() && e.name.endsWith(".mdx"));
  
  for (const file of mdxFiles) {
    const match = file.name.match(/^(\d{4})-(\d{2})-\d{2}\.mdx$/);
    if (!match) continue;
    
    const [, year, month] = match;
    const monthDir = path.join(POTD_DIR, year, month);
    
    await fs.mkdir(monthDir, { recursive: true });
    await fs.rename(
      path.join(POTD_DIR, file.name),
      path.join(monthDir, file.name)
    );
    console.log(`✅ ${file.name} → ${year}/${month}/`);
  }
}

organize().catch(console.error);