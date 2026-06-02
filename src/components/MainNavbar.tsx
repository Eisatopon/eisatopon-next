"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/lab",             label: "Lab" },
  { href: "/lab/rubik-cube",  label: "Rubik Cube" },
  { href: "/lab/math-chaser", label: "Math Chaser" },
  { href: "/lab/taboo",       label: "Taboo" },
  { href: "/banks",           label: "Problem Banks" },
];

export default function MainNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        className="sticky top-0 z-50 border-b backdrop-blur-xl"
        style={{
          borderColor: "var(--color-border-dim)",
          background: "rgba(5,7,10,0.92)",
        }}
      >
        <div
          className="mx-auto px-6 sm:px-12 flex items-center justify-between"
          style={{ maxWidth: "1280px", height: "72px" }}
        >
          {/* LOGO */}
          <Link href="/" className="group flex items-center gap-3" style={{ textDecoration: "none" }}>
            <img
              src="/logo/eisatoponai-logo.svg"
              alt="EisatoponAI"
              className="h-10 w-auto transition-all duration-500 group-hover:opacity-90"
              style={{ display: "block" }}
            />
            <span
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.5rem, 4vw, 2.35rem)",
                fontWeight: 600,
                color: "#f5f1e8",
                letterSpacing: "-0.045em",
                lineHeight: 1,
              }}
            >
              Eisatopon<span style={{ color: "#c8a96b" }}>AI</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav
            className="hidden md:flex items-center gap-8"
            style={{
              fontSize: "0.8rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(245,241,232,0.72)",
            }}
          >
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-[#d4af37] transition-colors duration-300">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* RIGHT: Search + Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/search"
              className="flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 hover:scale-105"
              style={{
                color: "var(--color-ink-muted)",
                borderColor: "var(--color-border-dim)",
                background: "rgba(255,255,255,0.03)",
              }}
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35m1.85-5.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
              </svg>
            </Link>

            {/* Hamburger — mobile only */}
            <button
              className="flex md:hidden flex-col justify-center items-center w-10 h-10 gap-[5px]"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              <span style={{ display: "block", width: 22, height: 2, background: "#f5f1e8", borderRadius: 2, transition: "all 0.3s", transform: open ? "rotate(45deg) translateY(7px)" : "none" }} />
              <span style={{ display: "block", width: 22, height: 2, background: "#f5f1e8", borderRadius: 2, transition: "all 0.3s", opacity: open ? 0 : 1 }} />
              <span style={{ display: "block", width: 22, height: 2, background: "#f5f1e8", borderRadius: 2, transition: "all 0.3s", transform: open ? "rotate(-45deg) translateY(-7px)" : "none" }} />
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: open ? "400px" : "0px",
            borderTop: open ? "1px solid rgba(255,255,255,0.06)" : "none",
            background: "rgba(5,7,10,0.97)",
          }}
        >
          <nav className="flex flex-col px-6 py-4 gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  fontSize: "0.85rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(245,241,232,0.75)",
                  padding: "12px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  textDecoration: "none",
                  display: "block",
                  transition: "color 0.2s",
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}