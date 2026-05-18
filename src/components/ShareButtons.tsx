"use client";

interface ShareButtonsProps {
  title: string;
  summary?: string;
  image?: string | null;
}

export default function ShareButtons({ title, summary = "", image }: ShareButtonsProps) {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedImage = image ? encodeURIComponent(image) : "";

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
      href: `https://www.pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}&media=${encodedImage}`,
    },
    {
      name: "LinkedIn",
      icon: "💼",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: "Copy",
      icon: "🔗",
      onClick: () => {
        navigator.clipboard.writeText(currentUrl);
        alert("✅ Το link αντιγράφηκε!");
      },
    },
  ];

  return (
    <div className="mt-12 pt-8 border-t border-border-dim">
      <p className="text-ink-muted text-sm mb-4 flex items-center gap-2">
        🔗 ΜΟΙΡΆΣΟΥ ΤΟ ΆΡΘΡΟ
      </p>

      <div className="flex flex-wrap gap-3">
        {shareLinks.map((item, index) => (
          item.onClick ? (
            <button
              key={index}
              onClick={item.onClick}
              className="flex items-center gap-3 px-5 py-3 rounded-xl border border-border-dim bg-card hover:bg-zinc-800 hover:text-white transition-all text-sm"
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ) : (
            <a
              key={index}
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