"use client";

import { useState, useEffect } from "react";

interface ShareButtonsProps {
  title: string;
  summary?: string;
  image?: string | null;
  url?: string; // Προαιρετικό: πέρνα από server
}

export default function ShareButtons({ title, summary = "", image, url }: ShareButtonsProps) {
  const [currentUrl, setCurrentUrl] = useState(url || "");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!url && typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, [url]);

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedSummary = encodeURIComponent(summary);

  const shareLinks = [
    {
      name: "Facebook",
      icon: "📘",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "X",
      icon: "𝕏",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: "Pinterest",
      icon: "📌",
      href: image
        ? `https://www.pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}&media=${encodeURIComponent(image)}`
        : `https://www.pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
    },
    {
      name: "LinkedIn",
      icon: "💼",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: "Copy",
      icon: "🔗",
      onClick: async () => {
        try {
          await navigator.clipboard.writeText(currentUrl);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          // Fallback για older browsers
          const input = document.createElement("input");
          input.value = currentUrl;
          document.body.appendChild(input);
          input.select();
          document.execCommand("copy");
          document.body.removeChild(input);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      },
    },
  ];

  return (
    <div className="mt-12 pt-8 border-t border-border-dim">
      <p className="text-ink-muted text-sm mb-4 flex items-center gap-2">
        🔗 ΜΟΙΡΆΣΟΥ ΤΟ ΆΡΘΡΟ
      </p>

      <div className="flex flex-wrap gap-3">
        {shareLinks.map((item) => (
          item.onClick ? (
            <button
              key={item.name}
              onClick={item.onClick}
              className="flex items-center gap-3 px-5 py-3 rounded-xl border border-border-dim bg-card hover:bg-zinc-800 hover:text-white transition-all text-sm"
            >
              <span className="text-xl">{item.icon}</span>
              <span>{copied && item.name === "Copy" ? "✅ Αντιγράφηκε!" : item.name}</span>
            </button>
          ) : (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 rounded-xl border border-border-dim bg-card hover:bg-zinc-800 hover:text-white transition-all text-sm"
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </a>
          )
        ))}
      </div>
    </div>
  );
}