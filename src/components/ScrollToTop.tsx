"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {

  const [visible, setVisible] = useState(false);

  useEffect(() => {

    const toggleVisibility = () => {
      setVisible(window.scrollY > 150);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);

  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-6 z-50
        w-12 h-12 rounded-full
        bg-white/10 backdrop-blur-md
        border border-white/10
        text-white text-xl
        transition-all duration-300
        hover:bg-white/20 hover:scale-110
        ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
    >
      ^
    </button>
  );
}

