"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import MainNavbar from "@/components/MainNavbar";
import katex from "katex";
import "katex/dist/katex.min.css";

// --- Types ---
interface PanelladikoProblem {
  id: number;
  year: string;
  school: string;
  exam: string;
  subject: string;
  topic: string;
  content: string;
}

// --- Data ---
const DATA_URLS: Record<string, string> = {
  "2025": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/2025.json",
  "2024": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/2024.json",
  "2023": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/2023.json",
  "2022": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/2022.json",
  "2021": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/2021.json",
  "2020": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/2020.json",
  "2019": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/2019.json",
  "2018": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/2018.json",
  "2017": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/2017.json",
  "2016": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/2016.json",
  "2015": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/2015.json",
  "2014": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/2014.json",
  "2013": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/2013.json",
  "2012": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/2012.json",
  "2011": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/2011.json",
  "2010": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/2010.json",
  "2009": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/2009.json",
  "2008": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/2008.json",
  "2007": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/2007.json",
  "2006": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/2006.json",
  "2005": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/2005.json",
  "2004": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/2004.json",
  "2003": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/2003.json",
  "2002": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/2002.json",
  "2001": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/2001.json",
  "2000": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/2000.json",
  "1999": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/1999.json",
  "1998": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/1998.json",
  "1997": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/1997.json",
  "1996": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/1996.json",
  "1995": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/1995.json",
  "1994": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/1994.json",
  "1993": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/1993.json",
  "1992": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/1992.json",
  "1991": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/1991.json",
  "1990": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/1990.json",
  "1989": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/1989.json",
  "1988": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/1988.json",
  "1987": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/1987.json",
  "1986": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/1986.json",
  "1985": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/1985.json",
  "1984": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/1984.json",
  "1983": "https://raw.githubusercontent.com/Eisatopon/TRAPEZA-THEMATON/refs/heads/main/data/1983.json",
};

const YEARS = Object.keys(DATA_URLS).sort((a, b) => Number(b) - Number(a));

const SCHOOL_OPTIONS = [
  { value: "", label: "Όλα" },
  { value: "gel", label: "ΓΕΛ Ημερήσια" },
  { value: "gel_repeat", label: "ΓΕΛ Επαναληπτικές" },
  { value: "epal", label: "ΕΠΑΛ Ημερήσια" },
  { value: "epal_repeat", label: "ΕΠΑΛ Επαναληπτικές" },
  { value: "omogeneis", label: "Ομογενείς" },
];

// FIX 1: Removed unused SUBJECT_OPTIONS (dead code)

const TOPIC_OPTIONS = [
  { value: "", label: "Όλα" },
  { value: "A", label: "Θέμα Α" },
  { value: "B", label: "Θέμα Β" },
  { value: "C", label: "Θέμα Γ" },
  { value: "D", label: "Θέμα Δ" },
];

const GREEK_LETTERS: Record<string, string> = {
  A: "Α", B: "Β", C: "Γ", D: "Δ", E: "Ε",
};

// --- KaTeX renderer ---
// FIX 2: Correct order — HTML escape first, then KaTeX rendering.
// Old formatContent() did LaTeX replacements BEFORE HTML escaping,
// which broke the math. Also had the variable-shadowing crash (see FIX 3).

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderContent(raw: string): string {
  // Strip exam header lines (ΠΑΝΕΛΛΑΔΙΚ..., ΕΠΑΝΑΛΗΠΤΙΚ..., etc.)
  const stripped = raw.replace(/^.*?(ΠΑΝΕΛΛΑΔΙΚ|ΕΠΑΝΑΛΗΠΤΙΚ|ΟΜΟΓΕΝΕΙΣ|ΕΞΕΤΑΣΕΙΣ).*?\n/gi, "");

  // Normalize escaped newlines and line breaks from JSON
  const normalized = stripped
    .replace(/\\n/g, "\n")
    .replace(/\r\n|\r/g, "\n");

  // Split on display \[...\] and inline \(...\) delimiters
  const parts = normalized.split(/(\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\))/g);

  return parts
    .map((part) => {
      if (part.startsWith("\\[") && part.endsWith("\\]")) {
        const latex = part.slice(2, -2);
        try {
          return katex.renderToString(latex, { displayMode: true, throwOnError: false });
        } catch {
          return `<span class="text-red-400 font-mono text-xs">${escapeHtml(part)}</span>`;
        }
      }
      if (part.startsWith("\\(") && part.endsWith("\\)")) {
        const latex = part.slice(2, -2);
        try {
          return katex.renderToString(latex, { displayMode: false, throwOnError: false });
        } catch {
          return `<span class="text-red-400 font-mono text-xs">${escapeHtml(part)}</span>`;
        }
      }
      // Plain text: escape HTML then convert newlines to <br />
      return escapeHtml(part).replace(/\n/g, "<br />");
    })
    .join("");
}

// --- Components ---

const SchoolBadge = ({ school, exam }: { school: string; exam: string }) => {
  let text = school.toUpperCase();
  let color = "bg-cat-blue/10 text-cat-blue border-cat-blue/30";

  if (school === "omogeneis" || exam === "omogeneis") {
    text = "ΟΜΟΓΕΝΕΙΣ";
    color = "bg-cat-amber/10 text-cat-amber border-cat-amber/30";
  } else if (exam === "gel_repeat") {
    text = "ΓΕΛ ΕΠΑΝΑΛΗΠΤΙΚΕΣ";
    color = "bg-cat-green/10 text-cat-green border-cat-green/30";
  } else if (exam === "epal_repeat") {
    text = "ΕΠΑΛ ΕΠΑΝΑΛΗΠΤΙΚΕΣ";
    color = "bg-cat-red/10 text-cat-red border-cat-red/30";
  } else if (school === "epal") {
    color = "bg-cat-purple/10 text-cat-purple border-cat-purple/30";
  }

  return (
    <span className={`px-2.5 py-1 rounded-full text-[0.65rem] font-bold border ${color}`}>
      {text}
    </span>
  );
};

// --- Main Page ---

export default function PanelladikesPage() {
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedSchool, setSelectedSchool] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // FIX 4: Correct generic syntax — was useState<<PanelladikoProblem[]>
  const [allProblems, setAllProblems] = useState<PanelladikoProblem[]>([]);
  const [filteredProblems, setFilteredProblems] = useState<PanelladikoProblem[]>([]);
  const [selectedForExam, setSelectedForExam] = useState<PanelladikoProblem[]>([]);

  const [loading, setLoading] = useState(false);
  const [loadedYear, setLoadedYear] = useState<string | null>(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrUrl, setQrUrl] = useState<string>("");
  const [info, setInfo] = useState("Επιλέξτε φίλτρα για να δείτε θέματα");

  // FIX 5: Use refs so loadYear stays stable and doesn't re-create
  // on every render (old code had [loadedYear, allProblems.length] as deps)
  const loadedYearRef = useRef<string | null>(null);
  const allProblemsRef = useRef<PanelladikoProblem[]>([]);

  useEffect(() => { loadedYearRef.current = loadedYear; }, [loadedYear]);
  useEffect(() => { allProblemsRef.current = allProblems; }, [allProblems]);

  // Load year data — stable callback, uses refs not state
  const loadYear = useCallback(async (year: string): Promise<boolean> => {
    if (loadedYearRef.current === year && allProblemsRef.current.length > 0) {
      return true;
    }

    const url = DATA_URLS[year];
    if (!url) {
      setInfo(`❌ Δεν υπάρχουν δεδομένα για το έτος ${year}`);
      return false;
    }

    setLoading(true);
    setInfo(`Φόρτωση ${year}...`);

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();

      const problems: PanelladikoProblem[] = data.map((q: any, i: number) => ({
        id: q.id ?? i + 1,
        year: String(q.year || year),
        school: String(q.school || ""),
        exam: String(q.exam || ""),
        subject: String(q.subject || "Μαθηματικά"),
        topic: String(q.topic || ""),
        content: String(q.content || ""),
      }));

      setAllProblems(problems);
      setLoadedYear(year);
      setInfo(`✅ Φορτώθηκαν ${problems.length} θέματα για ${year}`);
      return true;
    } catch (e: any) {
      setInfo(`❌ Σφάλμα: ${e.message}`);
      return false;
    } finally {
      setLoading(false);
    }
  }, []); // stable — uses refs

  // Apply filters — takes problems explicitly to avoid stale closure
  // FIX 3: Renamed inner variable from `q` to `query` to avoid
  // shadowing the filter parameter `q`, which caused runtime crash:
  // `q.content` was called on a string instead of a PanelladikoProblem.
  const applyFilters = useCallback((
    problems: PanelladikoProblem[],
    school: string,
    subject: string,
    topic: string,
    search: string,
  ) => {
    const filtered = problems.filter((q) => {
      if (subject && !q.subject.includes(subject)) return false;
      if (topic && !q.topic.toUpperCase().startsWith(topic.toUpperCase())) return false;

      if (school) {
        if (school === "gel" && !(q.school === "gel" && q.exam !== "gel_repeat" && q.exam !== "omogeneis")) return false;
        if (school === "gel_repeat" && q.exam !== "gel_repeat") return false;
        if (school === "epal" && !(q.school === "epal" && q.exam !== "epal_repeat")) return false;
        if (school === "epal_repeat" && q.exam !== "epal_repeat") return false;
        if (school === "omogeneis" && !(q.school === "omogeneis" || q.exam === "omogeneis")) return false;
      }

      // FIX 3: `query` (not `q`) so it doesn't shadow the filter param
      if (search) {
        const query = search.toLowerCase();
        const matchesContent = q.content.toLowerCase().includes(query);
        const matchesTopic = q.topic.toLowerCase().includes(query);
        if (!matchesContent && !matchesTopic) return false;
      }

      return true;
    });

    setFilteredProblems(filtered);
    setInfo(`Βρέθηκαν ${filtered.length} θέματα`);
  }, []);

  // Search handler
  const handleSearch = async () => {
    if (!selectedYear) {
      setInfo("⚠️ Επιλέξτε έτος");
      return;
    }
    const ok = await loadYear(selectedYear);
    if (ok) {
      // FIX 5: Use ref for fresh data — state may be stale here
      applyFilters(allProblemsRef.current, selectedSchool, selectedSubject, selectedTopic, searchQuery);
    }
  };

  // Reset all state
  const handleReset = () => {
    setSelectedYear("");
    setSelectedSchool("");
    setSelectedSubject("");
    setSelectedTopic("");
    setSearchQuery("");
    setAllProblems([]);
    setFilteredProblems([]);
    setLoadedYear(null);
    setInfo("Επιλέξτε φίλτρα για να δείτε θέματα");
  };

  // Add to exam (deduplicated)
  const addToExam = (problem: PanelladikoProblem) => {
    setSelectedForExam((prev) => {
      if (prev.find((p) => p.id === problem.id)) {
        setInfo("⚠️ Το θέμα υπάρχει ήδη!");
        return prev;
      }
      return [...prev, problem];
    });
  };

  // Remove from exam
  const removeFromExam = (id: number) => {
    setSelectedForExam((prev) => prev.filter((p) => p.id !== id));
  };

  // Print exam
  const printExam = () => {
    if (!selectedForExam.length) {
      setInfo("⚠️ Δεν έχετε επιλέξει θέματα");
      return;
    }
    window.print();
  };

  // FIX 6: Replace window.confirm() with inline confirm UI
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const clearExam = () => {
    if (!selectedForExam.length) return;
    setShowClearConfirm(true);
  };

  const confirmClear = () => {
    setSelectedForExam([]);
    setShowQRModal(false);
    setShowClearConfirm(false);
  };

  // Generate QR Code
  const generateQR = () => {
    if (!selectedForExam.length) {
      setInfo("⚠️ Πρώτα προσθέστε θέματα");
      return;
    }
    const ids = selectedForExam.map((p) => p.id).join(",");
    const base = typeof window !== "undefined"
      ? window.location.href.split("?")[0]
      : "";
    const url = `${base}?questions=${ids}&year=${loadedYear}`;
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(url)}`);
    setShowQRModal(true);
  };

  // FIX 7: URL params — wait for loadYear to finish before filtering,
  // so allProblemsRef.current is populated (old code used empty allProblems state)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const ids = params.get("questions");
    const year = params.get("year");

    if (!ids || !year) return;

    loadYear(year).then((ok) => {
      if (!ok) return;
      const idList = ids.split(",").map((id) => parseInt(id, 10));
      const problems = allProblemsRef.current.filter((p) => idList.includes(p.id));
      setSelectedForExam(problems);
      if (problems.length > 0) {
        setInfo(`✅ Φορτώθηκαν ${problems.length} θέματα από QR`);
      }
    });
  }, [loadYear]); // loadYear is stable so this runs exactly once

  return (
    <main className="min-h-screen bg-base text-ink-primary">
      <MainNavbar />

      {/* HERO */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0a1a2e] via-[#0a0c10] to-[#0d0824]">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 50%, rgba(127,168,212,0.3) 1px, transparent 1px),
                                radial-gradient(circle at 70% 50%, rgba(196,169,106,0.3) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 max-w-[1200px] text-center">
          {/* FIX 8: h-15 doesn't exist in Tailwind — replaced with h-14/h-16 alternating */}
          <div className="flex justify-center items-end gap-2 mb-6">
            {[
              { color: "from-cat-red to-red-800",     height: "h-14", delay: "0s" },
              { color: "from-cat-green to-green-800", height: "h-16", delay: "0.2s" },
              { color: "from-cat-blue to-blue-800",   height: "h-14", delay: "0.4s" },
              { color: "from-cat-amber to-amber-800", height: "h-16", delay: "0.6s" },
              { color: "from-cat-purple to-purple-800", height: "h-14", delay: "0.8s" },
            ].map((book, i) => (
              <div
                key={i}
                className={`w-10 ${book.height} rounded bg-gradient-to-t ${book.color} shadow-lg animate-bounce`}
                style={{ animationDelay: book.delay, animationDuration: "3s" }}
              />
            ))}
          </div>

          <h1 className="font-playfair text-[clamp(1.8rem,5vw,3rem)] font-bold leading-tight mb-4">
            Τράπεζα Θεμάτων<br />
            <span className="text-gold">Πανελλαδικών Εξετάσεων</span>
          </h1>
          <p className="text-ink-tertiary text-lg md:text-xl max-w-2xl mx-auto">
            Μαθηματικά 1983 – 2025 • ΓΕΛ • ΕΠΑΛ • Επαναληπτικές • Ομογενείς
          </p>

          <div className="flex items-center justify-center gap-6 md:gap-10 mt-8 text-[0.75rem] tracking-widest text-ink-muted">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gold font-playfair">43</div>
              <div className="uppercase mt-1">Έτη</div>
            </div>
            <div className="w-px h-8 bg-border-dim" />
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-ink-primary font-playfair">1000+</div>
              <div className="uppercase mt-1">Θέματα</div>
            </div>
            <div className="w-px h-8 bg-border-dim" />
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gold font-playfair">4</div>
              <div className="uppercase mt-1">Τύποι Σχολείων</div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="sticky top-0 z-30 bg-base/95 backdrop-blur-md border-y border-border-dim">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4 max-w-[1200px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">

            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-[0.7rem] tracking-wider uppercase text-ink-muted mb-1.5 font-medium">
                🔍 Αναζήτηση
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Αναζήτηση σε κείμενο θέματος..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full bg-card border border-border-dim rounded-lg px-3 py-2.5 pl-10 text-sm text-ink-primary placeholder:text-ink-muted focus:outline-none focus:border-gold/50 transition-colors"
                />
                <svg className="absolute left-3 top-2.5 w-4 h-4 text-ink-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Year */}
            <div>
              <label className="block text-[0.7rem] tracking-wider uppercase text-ink-muted mb-1.5 font-medium">
                📅 Έτος
              </label>
              <select
                value={selectedYear}
                onChange={(e) => {
                  setSelectedYear(e.target.value);
                  setAllProblems([]);
                  setFilteredProblems([]);
                  setLoadedYear(null);
                }}
                className="w-full bg-card border border-border-dim rounded-lg px-3 py-2.5 text-sm text-ink-primary focus:outline-none focus:border-gold/50 transition-colors appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%235a5652'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center", backgroundSize: "16px", paddingRight: "36px" }}
              >
                <option value="">Επιλέξτε έτος</option>
                {YEARS.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            {/* School */}
            <div>
              <label className="block text-[0.7rem] tracking-wider uppercase text-ink-muted mb-1.5 font-medium">
                🏫 Τύπος Σχολείου
              </label>
              <select
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                className="w-full bg-card border border-border-dim rounded-lg px-3 py-2.5 text-sm text-ink-primary focus:outline-none focus:border-gold/50 transition-colors appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%235a5652'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center", backgroundSize: "16px", paddingRight: "36px" }}
              >
                {SCHOOL_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>

            {/* Topic */}
            <div>
              <label className="block text-[0.7rem] tracking-wider uppercase text-ink-muted mb-1.5 font-medium">
                🎯 Θέμα
              </label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full bg-card border border-border-dim rounded-lg px-3 py-2.5 text-sm text-ink-primary focus:outline-none focus:border-gold/50 transition-colors appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%235a5652'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center", backgroundSize: "16px", paddingRight: "36px" }}
              >
                {TOPIC_OPTIONS.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-6 py-2.5 bg-gold/20 text-gold border border-gold/40 rounded-lg font-semibold text-sm hover:bg-gold/30 transition-all disabled:opacity-50"
            >
              {loading ? "⏳ Φόρτωση..." : "🔍 Αναζήτηση"}
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-white/5 text-ink-muted border border-border-dim rounded-lg font-semibold text-sm hover:border-gold/30 hover:text-ink-secondary transition-all"
            >
              🔄 Επαναφορά
            </button>
          </div>
        </div>
      </section>

      {/* RESULTS INFO */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-6 max-w-[1200px]">
        <div className="bg-gold-dim border border-gold-border rounded-lg px-4 py-3 text-center">
          <p className="text-sm font-medium text-gold">{info}</p>
        </div>
      </div>

      {/* PROBLEMS GRID */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-[1200px]">
        {filteredProblems.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📋</div>
            <h3 className="font-playfair text-xl text-ink-primary mb-2">
              {allProblems.length === 0
                ? "Επιλέξτε έτος και πατήστε Αναζήτηση"
                : "Δεν βρέθηκαν θέματα"}
            </h3>
            <p className="text-ink-muted">Προσαρμόστε τα φίλτρα σας</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProblems.map((problem) => (
              <div
                key={problem.id}
                className="group rounded-xl border border-border-dim bg-card p-5 md:p-6 hover:border-gold/20 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cat-blue to-cat-purple opacity-60" />

                <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pl-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[0.65rem] font-bold bg-gold/15 text-gold border border-gold/30">
                      {problem.year}
                    </span>
                    <SchoolBadge school={problem.school} exam={problem.exam} />
                    <span className="px-2.5 py-1 rounded-full text-[0.65rem] font-bold bg-cat-green/10 text-cat-green border border-cat-green/30">
                      {problem.subject}
                    </span>
                  </div>
                  <button
                    onClick={() => addToExam(problem)}
                    className="px-4 py-2 bg-gold/10 text-gold border border-gold/30 rounded-lg text-sm font-semibold hover:bg-gold/20 transition-colors"
                    aria-label={`Προσθήκη θέματος ${GREEK_LETTERS[problem.topic] || problem.topic}`}
                  >
                    ✅ Προσθήκη
                  </button>
                </div>

                <h3 className="font-playfair text-lg font-semibold text-ink-primary mb-3 pl-3">
                  Θέμα {GREEK_LETTERS[problem.topic] || problem.topic}
                </h3>

                {/* FIX 2: renderContent() with correct escape order + KaTeX */}
                <div
                  className="text-[0.95rem] leading-[1.85] text-ink-secondary pl-3"
                  dangerouslySetInnerHTML={{ __html: renderContent(problem.content) }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MY EXAM SECTION */}
      <section className="mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-[1200px] border-t border-border-dim">
        <h2 className="font-playfair text-2xl font-bold text-ink-primary mb-6 flex items-center gap-2">
          🧮 <span className="text-gold">Το διαγώνισμά μου</span>
        </h2>

        {selectedForExam.length > 0 && (
          <div className="bg-gold-dim border border-gold-border rounded-lg px-4 py-3 mb-4 text-center">
            <p className="text-sm font-medium text-gold">
              Έχετε προσθέσει <span className="font-bold">{selectedForExam.length}</span> θέματα
            </p>
          </div>
        )}

        <div className="rounded-xl border-2 border-dashed border-gold/30 bg-card p-6 min-h-[150px]">
          {selectedForExam.length === 0 ? (
            <div className="text-center py-10">
              <div className="text-4xl mb-3">✏️</div>
              <p className="text-ink-muted">Πατήστε «Προσθήκη» στα θέματα που θέλετε</p>
            </div>
          ) : (
            <div className="space-y-6">
              {selectedForExam.map((q, idx) => (
                <div key={q.id} className="border-b border-border-dim pb-6 last:border-0">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-gold font-bold text-lg">{idx + 1}.</span>
                      <span className="font-semibold text-ink-primary">
                        Θέμα {GREEK_LETTERS[q.topic] || q.topic}
                      </span>
                      <span className="text-sm text-ink-muted">
                        ({q.year} – {q.school.toUpperCase()})
                      </span>
                    </div>
                    <button
                      onClick={() => removeFromExam(q.id)}
                      className="px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg text-sm hover:bg-red-500/20 transition-colors"
                      aria-label={`Αφαίρεση θέματος ${GREEK_LETTERS[q.topic] || q.topic}`}
                    >
                      ❌ Αφαίρεση
                    </button>
                  </div>
                  {/* FIX 2: renderContent() here too */}
                  <div
                    className="text-sm text-ink-secondary leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: renderContent(q.content) }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 mt-4">
          <button
            onClick={printExam}
            disabled={!selectedForExam.length}
            className="px-5 py-2.5 bg-gold/20 text-gold border border-gold/40 rounded-lg font-semibold text-sm hover:bg-gold/30 transition-colors disabled:opacity-30"
          >
            🖨️ Εκτύπωση
          </button>
          <button
            onClick={generateQR}
            disabled={!selectedForExam.length}
            className="px-5 py-2.5 bg-cat-blue/10 text-cat-blue border border-cat-blue/30 rounded-lg font-semibold text-sm hover:bg-cat-blue/20 transition-colors disabled:opacity-30"
          >
            📱 QR Code
          </button>
          <button
            onClick={clearExam}
            disabled={!selectedForExam.length}
            className="px-5 py-2.5 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg font-semibold text-sm hover:bg-red-500/20 transition-colors disabled:opacity-30"
          >
            🗑️ Καθαρισμός
          </button>
        </div>

        {/* FIX 6: Inline confirm instead of window.confirm() */}
        {showClearConfirm && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/5 p-4 flex flex-col sm:flex-row items-center gap-3">
            <p className="text-sm text-red-400 flex-1">
              Θέλετε σίγουρα να διαγράψετε όλα τα θέματα;
            </p>
            <div className="flex gap-2">
              <button
                onClick={confirmClear}
                className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/40 rounded-lg text-sm font-semibold hover:bg-red-500/30 transition-colors"
              >
                Ναι, διαγραφή
              </button>
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 bg-white/5 text-ink-muted border border-border-dim rounded-lg text-sm font-semibold hover:border-gold/30 transition-colors"
              >
                Ακύρωση
              </button>
            </div>
          </div>
        )}

        {/* QR Panel */}
        {showQRModal && qrUrl && (
          <div className="mt-6 rounded-xl border border-border-dim bg-card p-6 text-center">
            <h4 className="text-gold font-semibold mb-4">📱 QR Code για κοινοποίηση</h4>
            <div className="bg-white rounded-xl p-4 inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrUrl} alt="QR Code" className="w-[220px] h-[220px]" />
            </div>
            {/* FIX 9: Guard window.location.href */}
            {typeof window !== "undefined" && (
              <p className="text-xs text-ink-muted mt-3 break-all">
                <strong>URL:</strong> {window.location.href}
              </p>
            )}
          </div>
        )}
      </section>

      {/* FOOTER */}
      {/* FIX 10: Updated copyright year to 2026 */}
      <footer className="border-t border-border-dim bg-black/50 mt-auto">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-[1200px] text-center">
          <Link href="/" className="font-playfair text-lg font-bold text-ink-primary hover:text-gold transition-colors">
            Eisatopon<span className="text-gold">AI</span>
          </Link>
          <p className="text-[0.8rem] text-ink-muted mt-2">
            Πανελλαδικές Εξετάσεις 1983 – 2025
          </p>
          <p className="text-[0.75rem] text-ink-muted mt-1">
            © 2026 eisatopon.gr
          </p>
        </div>
      </footer>
    </main>
  );
}