"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import MainNavbar from "@/components/MainNavbar";
import katex from "katex";
import "katex/dist/katex.min.css";

// --- Types ---
interface EMEProblem {
  id: number;
  year: string;
  phase: "thales" | "euclides" | "archimedes";
  grade: string;
  problem_number: string;
  content: string;
  image: string | null;
}

// --- Data ---
const DATA_URLS: Record<string, string> = {
  "2024-2025": "https://raw.githubusercontent.com/Eisatopon/eisatopon-bank/main/thalys_2024.json",
  "2012-2013": "https://raw.githubusercontent.com/Eisatopon/eisatopon-bank/main/eme_2012_2013.json",
  "2011-2012": "https://raw.githubusercontent.com/Eisatopon/eisatopon-bank/main/eme_2011_2012.json",
  "2010-2011": "https://raw.githubusercontent.com/Eisatopon/eisatopon-bank/main/eme_2010_2011.json",
  "2009-2010": "https://raw.githubusercontent.com/Eisatopon/eisatopon-bank/main/eme_2009_2010.json",
  "2008-2009": "https://raw.githubusercontent.com/Eisatopon/eisatopon-bank/main/eme_2008_2009.json",
  "2007-2008": "https://raw.githubusercontent.com/Eisatopon/eisatopon-bank/main/eme_2007_2008.json",
  "2006-2007": "https://raw.githubusercontent.com/Eisatopon/eisatopon-bank/main/eme_2006_2007.json",
  "2005-2006": "https://raw.githubusercontent.com/Eisatopon/eisatopon-bank/main/eme_2005_2006.json",
  "2004-2005": "https://raw.githubusercontent.com/Eisatopon/eisatopon-bank/main/eme_2004_2005.json",
  "2003-2004": "https://raw.githubusercontent.com/Eisatopon/eisatopon-bank/main/eme_2003_2004.json",
  "2002-2003": "https://raw.githubusercontent.com/Eisatopon/eisatopon-bank/main/eme_2002_2003.json",
};

const IMAGES_BASE_URL = "https://raw.githubusercontent.com/Eisatopon/eisatopon-bank/main/images/";

const GRADE_LABELS: Record<string, string> = {
  B_gym: "Β' Γυμνασίου",
  G_gym: "Γ' Γυμνασίου",
  A_lyk: "Α' Λυκείου",
  B_lyk: "Β' Λυκείου",
  G_lyk: "Γ' Λυκείου",
  arch_small: "Αρχιμήδης (μικροί)",
  arch_big: "Αρχιμήδης (μεγάλοι)",
};

const GRADE_MAP: Record<string, string> = {
  "Β_Γυμνασίου": "B_gym",
  "Γ_Γυμνασίου": "G_gym",
  "Α_Λυκείου": "A_lyk",
  "Β_Λυκείου": "B_lyk",
  "Γ_Λυκείου": "G_lyk",
  "μικροί": "arch_small",
  "μεγάλοι": "arch_big",
};

const PHASE_LABELS: Record<string, string> = {
  thales: "Θαλής",
  euclides: "Ευκλείδης",
  archimedes: "Αρχιμήδης",
};

const PHASE_MAP: Record<string, string> = {
  "Θαλής": "thales",
  "Ευκλείδης": "euclides",
  "Αρχιμήδης": "archimedes",
};

const YEARS = [
  "2024-2025", "2012-2013", "2011-2012", "2010-2011", "2009-2010",
  "2008-2009", "2007-2008", "2006-2007", "2005-2006", "2004-2005",
  "2003-2004", "2002-2003",
];

const NORMAL_GRADES = [
  { value: "", label: "Όλες οι τάξεις" },
  { value: "B_gym", label: "Β' Γυμνασίου" },
  { value: "G_gym", label: "Γ' Γυμνασίου" },
  { value: "A_lyk", label: "Α' Λυκείου" },
  { value: "B_lyk", label: "Β' Λυκείου" },
  { value: "G_lyk", label: "Γ' Λυκείου" },
];

const ARCHIMEDES_GRADES = [
  { value: "", label: "Όλες οι κατηγορίες" },
  { value: "arch_small", label: "Αρχιμήδης (μικροί)" },
  { value: "arch_big", label: "Αρχιμήδης (μεγάλοι)" },
];

// --- KaTeX renderer ---
// FIX 1 (formatContent): Correct order — escape HTML first, then
// parse LaTeX delimiters \(...\) and \[...\] with KaTeX.
// Old code did LaTeX replacements BEFORE HTML escaping, which broke the LaTeX.

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderContent(raw: string): string {
  // Normalize escaped newlines from JSON
  const normalized = raw.replace(/\\n/g, "\n");

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
      // Plain text: escape HTML, then convert newlines to <br />
      return escapeHtml(part).replace(/\n/g, "<br />");
    })
    .join("");
}

// --- Components ---

const PhaseBadge = ({ phase }: { phase: string }) => {
  const colors: Record<string, string> = {
    thales: "bg-cat-blue/10 text-cat-blue border-cat-blue/30",
    euclides: "bg-cat-green/10 text-cat-green border-cat-green/30",
    archimedes: "bg-cat-amber/10 text-cat-amber border-cat-amber/30",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-[0.65rem] font-bold border ${colors[phase] || "bg-white/5 text-ink-secondary border-border-dim"}`}>
      {PHASE_LABELS[phase] || phase}
    </span>
  );
};

const GradeBadge = ({ grade }: { grade: string }) => (
  <span className="px-2.5 py-1 rounded-full text-[0.65rem] font-bold bg-gold/10 text-gold border border-gold/30">
    {GRADE_LABELS[grade] || grade}
  </span>
);

// --- Main Page ---

export default function EMEPage() {
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedPhase, setSelectedPhase] = useState<string>("");
  const [selectedGrade, setSelectedGrade] = useState<string>("");
  const [selectedProblem, setSelectedProblem] = useState<string>("");

  // FIX 2: Correct generic syntax — was useState<<EMEProblem[]>
  const [allProblems, setAllProblems] = useState<EMEProblem[]>([]);
  const [filteredProblems, setFilteredProblems] = useState<EMEProblem[]>([]);
  const [selectedForExam, setSelectedForExam] = useState<EMEProblem[]>([]);

  const [loading, setLoading] = useState(false);
  const [loadedYear, setLoadedYear] = useState<string | null>(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrUrl, setQrUrl] = useState<string>("");
  const [info, setInfo] = useState("Επιλέξτε φίλτρα για να δείτε θέματα");

  // FIX 3: Keep loadedYear in a ref so loadYear's dependency array stays
  // stable and doesn't cause re-creation on every render.
  const loadedYearRef = useRef<string | null>(null);
  const allProblemsRef = useRef<EMEProblem[]>([]);

  // Keep refs in sync
  useEffect(() => { loadedYearRef.current = loadedYear; }, [loadedYear]);
  useEffect(() => { allProblemsRef.current = allProblems; }, [allProblems]);

  // Load year data — stable: no state in dependency array
  const loadYear = useCallback(async (year: string): Promise<boolean> => {
    // Return cached data if already loaded
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

      const rawProblems = data["προβλήματα"] || {};
      const recordYear = data.year || year;
      const problems: EMEProblem[] = [];
      const values = Object.values(rawProblems);

      if (values.length > 0) {
        // Old structure (Thales only): { gradeKey: [...problems] }
        if (Array.isArray(values[0])) {
          Object.entries(rawProblems).forEach(([gradeKey, list]: [string, any]) => {
            const gradeCode = GRADE_MAP[gradeKey] || gradeKey;
            (list || []).forEach((p: any) => {
              problems.push({
                id: p.id || problems.length + 1,
                year: recordYear,
                phase: "thales",
                grade: gradeCode,
                problem_number: String(p["αριθμός"] ?? ""),
                content: String(p["statement"] ?? ""),
                image: p["image"] ? IMAGES_BASE_URL + encodeURIComponent(p["image"]) : null,
              });
            });
          });
        }
        // New structure (multiple phases): { phaseName: { gradeKey: [...problems] } }
        else {
          Object.entries(rawProblems).forEach(([phaseName, perPhaseObj]: [string, any]) => {
            const phaseCode = PHASE_MAP[phaseName] || phaseName;
            Object.entries(perPhaseObj || {}).forEach(([gradeKey, list]: [string, any]) => {
              const gradeCode = GRADE_MAP[gradeKey] || gradeKey;
              (list || []).forEach((p: any) => {
                problems.push({
                  id: p.id || problems.length + 1,
                  year: recordYear,
                  phase: phaseCode as EMEProblem["phase"],
                  grade: gradeCode,
                  problem_number: String(p["αριθμός"] ?? ""),
                  content: String(p["statement"] ?? ""),
                  image: p["image"] ? IMAGES_BASE_URL + encodeURIComponent(p["image"]) : null,
                });
              });
            });
          });
        }
      }

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
  }, []); // stable — uses refs, not state

  // Apply filters — operates on already-loaded allProblems
  const applyFilters = useCallback((
    problems: EMEProblem[],
    phase: string,
    grade: string,
    problemNum: string
  ) => {
    const filtered = problems.filter((p) => {
      if (phase && p.phase !== phase) return false;
      if (grade && p.grade !== grade) return false;
      if (problemNum && p.problem_number !== problemNum) return false;
      return true;
    });
    setFilteredProblems(filtered);
    setInfo(`Βρέθηκαν ${filtered.length} θέματα`);
  }, []);

  // Search handler
  const handleSearch = async () => {
    if (!selectedYear) {
      setInfo("⚠️ Επιλέξτε σχολικό έτος");
      return;
    }
    const ok = await loadYear(selectedYear);
    if (ok) {
      // After loadYear, allProblemsRef.current has the fresh data
      applyFilters(allProblemsRef.current, selectedPhase, selectedGrade, selectedProblem);
    }
  };

  // Reset all state
  const handleReset = () => {
    setSelectedYear("");
    setSelectedPhase("");
    setSelectedGrade("");
    setSelectedProblem("");
    setAllProblems([]);
    setFilteredProblems([]);
    setLoadedYear(null);
    setInfo("Επιλέξτε φίλτρα για να δείτε θέματα");
  };

  // Grade options depend on selected phase
  const gradeOptions = selectedPhase === "archimedes" ? ARCHIMEDES_GRADES : NORMAL_GRADES;

  // Add problem to exam (deduplicated)
  const addToExam = (problem: EMEProblem) => {
    setSelectedForExam((prev) => {
      if (prev.find((p) => p.id === problem.id)) {
        setInfo("⚠️ Το θέμα υπάρχει ήδη!");
        return prev;
      }
      return [...prev, problem];
    });
  };

  // Remove problem from exam
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

  // FIX 4: Replace confirm() with a simple state-based approach
  // confirm() can be blocked in some browser/Next.js environments
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
    // FIX 5: Safe URL construction — window.location is always available
    // in "use client" components but we guard anyway
    const base = typeof window !== "undefined"
      ? window.location.href.split("?")[0]
      : "";
    const url = `${base}?problems=${ids}&year=${loadedYear}`;
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(url)}`);
    setShowQRModal(true);
  };

  // FIX 6: URL params loading — the old code ran on mount when allProblems
  // was still [], so the filter found nothing. Now we load first, then filter.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const ids = params.get("problems");
    const year = params.get("year");

    if (!ids || !year) return;

    loadYear(year).then((ok) => {
      if (!ok) return;
      // allProblemsRef.current is now populated by loadYear
      const idList = ids.split(",").map((id) => parseInt(id, 10));
      const problems = allProblemsRef.current.filter((p) => idList.includes(p.id));
      setSelectedForExam(problems);
      if (problems.length > 0) {
        setInfo(`✅ Φορτώθηκαν ${problems.length} θέματα από QR`);
      }
    });
  }, [loadYear]); // loadYear is now stable so this runs exactly once

  return (
    <main className="min-h-screen bg-base text-ink-primary">
      <MainNavbar />

      {/* HERO */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#1a3a1a] via-[#0a0c10] to-[#1a1000]">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 50%, rgba(196,169,106,0.3) 1px, transparent 1px),
                                radial-gradient(circle at 70% 50%, rgba(44,95,45,0.3) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 max-w-[1200px] text-center">
          <div className="text-6xl mb-4">🏛️</div>
          <h1 className="font-playfair text-[clamp(1.8rem,5vw,3rem)] font-bold leading-tight mb-4">
            Τράπεζα Προβλημάτων<br />
            <span className="text-gold">Ελληνικής Μαθηματικής Εταιρείας</span>
          </h1>
          <p className="text-ink-tertiary text-lg md:text-xl max-w-2xl mx-auto">
            Θαλής • Ευκλείδης • Αρχιμήδης — Όλοι οι διαγωνισμοί σε μία πλατφόρμα
          </p>

          <div className="flex items-center justify-center gap-6 md:gap-10 mt-8 text-[0.75rem] tracking-widest text-ink-muted">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gold font-playfair">3</div>
              <div className="uppercase mt-1">Διαγωνισμοί</div>
            </div>
            <div className="w-px h-8 bg-border-dim" />
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-ink-primary font-playfair">12+</div>
              <div className="uppercase mt-1">Έτη</div>
            </div>
            <div className="w-px h-8 bg-border-dim" />
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gold font-playfair">500+</div>
              <div className="uppercase mt-1">Θέματα</div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="sticky top-0 z-30 bg-base/95 backdrop-blur-md border-y border-border-dim">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4 max-w-[1200px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">

            {/* Year */}
            <div>
              <label className="block text-[0.7rem] tracking-wider uppercase text-ink-muted mb-1.5 font-medium">
                📅 Σχολικό Έτος
              </label>
              <select
                value={selectedYear}
                onChange={(e) => {
                  setSelectedYear(e.target.value);
                  // Clear loaded data when year changes so next search re-fetches
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

            {/* Phase */}
            <div>
              <label className="block text-[0.7rem] tracking-wider uppercase text-ink-muted mb-1.5 font-medium">
                🏅 Φάση Διαγωνισμού
              </label>
              <select
                value={selectedPhase}
                onChange={(e) => {
                  setSelectedPhase(e.target.value);
                  setSelectedGrade(""); // reset grade when phase changes
                }}
                className="w-full bg-card border border-border-dim rounded-lg px-3 py-2.5 text-sm text-ink-primary focus:outline-none focus:border-gold/50 transition-colors appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%235a5652'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center", backgroundSize: "16px", paddingRight: "36px" }}
              >
                <option value="">Όλες οι φάσεις</option>
                <option value="thales">Θαλής (Α' Φάση)</option>
                <option value="euclides">Ευκλείδης (Β' Φάση)</option>
                <option value="archimedes">Αρχιμήδης (Γ' Φάση)</option>
              </select>
            </div>

            {/* Grade */}
            <div>
              <label className="block text-[0.7rem] tracking-wider uppercase text-ink-muted mb-1.5 font-medium">
                🎓 Τάξη / Κατηγορία
              </label>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="w-full bg-card border border-border-dim rounded-lg px-3 py-2.5 text-sm text-ink-primary focus:outline-none focus:border-gold/50 transition-colors appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%235a5652'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center", backgroundSize: "16px", paddingRight: "36px" }}
              >
                {gradeOptions.map((g) => (
                  <option key={g.value} value={g.value}>{g.label}</option>
                ))}
              </select>
            </div>

            {/* Problem number */}
            <div>
              <label className="block text-[0.7rem] tracking-wider uppercase text-ink-muted mb-1.5 font-medium">
                🎯 Αριθμός Θέματος
              </label>
              <select
                value={selectedProblem}
                onChange={(e) => setSelectedProblem(e.target.value)}
                className="w-full bg-card border border-border-dim rounded-lg px-3 py-2.5 text-sm text-ink-primary focus:outline-none focus:border-gold/50 transition-colors appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%235a5652'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center", backgroundSize: "16px", paddingRight: "36px" }}
              >
                <option value="">Όλα τα θέματα</option>
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={String(n)}>Θέμα {n}</option>
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
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gold to-cat-amber opacity-60" />

                <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pl-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[0.65rem] font-bold bg-gold/15 text-gold border border-gold/30">
                      {problem.year}
                    </span>
                    <PhaseBadge phase={problem.phase} />
                    <GradeBadge grade={problem.grade} />
                  </div>
                  <button
                    onClick={() => addToExam(problem)}
                    className="px-4 py-2 bg-gold/10 text-gold border border-gold/30 rounded-lg text-sm font-semibold hover:bg-gold/20 transition-colors"
                    aria-label={`Προσθήκη θέματος ${problem.problem_number} στην επιλογή μου`}
                  >
                    ✅ Προσθήκη
                  </button>
                </div>

                <h3 className="font-playfair text-lg font-semibold text-ink-primary mb-3 pl-3">
                  Θέμα {problem.problem_number}
                </h3>

                {/* FIX 1: renderContent() instead of formatContent() */}
                <div
                  className="text-[0.95rem] leading-[1.85] text-ink-secondary pl-3"
                  dangerouslySetInnerHTML={{ __html: renderContent(problem.content) }}
                />

                {problem.image && (
                  <div className="mt-4 pl-3">
                    {/* FIX 7: next/image warning suppressed with eslint comment;
                        using <img> here because image dimensions are unknown at build time */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={problem.image}
                      alt={`Σχήμα θέματος ${problem.problem_number}`}
                      className="max-w-full h-auto rounded-lg border border-border-dim"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MY EXAM SECTION */}
      <section className="mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-[1200px] border-t border-border-dim">
        <h2 className="font-playfair text-2xl font-bold text-ink-primary mb-6 flex items-center gap-2">
          📝 <span className="text-gold">Η επιλογή μου</span>
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
              {selectedForExam.map((p, idx) => (
                <div key={p.id} className="border-b border-border-dim pb-6 last:border-0">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-gold font-bold text-lg">{idx + 1}.</span>
                      <span className="font-semibold text-ink-primary">
                        {PHASE_LABELS[p.phase]} – {GRADE_LABELS[p.grade]} – Θέμα {p.problem_number}
                      </span>
                      <span className="text-sm text-ink-muted">({p.year})</span>
                    </div>
                    <button
                      onClick={() => removeFromExam(p.id)}
                      className="px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg text-sm hover:bg-red-500/20 transition-colors"
                      aria-label={`Αφαίρεση θέματος ${p.problem_number}`}
                    >
                      ❌ Αφαίρεση
                    </button>
                  </div>
                  {/* FIX 1: renderContent() here too */}
                  <div
                    className="text-sm text-ink-secondary leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: renderContent(p.content) }}
                  />
                  {p.image && (
                    <div className="mt-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.image}
                        alt={`Σχήμα θέματος ${p.problem_number}`}
                        className="max-w-full h-auto rounded-lg border border-border-dim"
                        loading="lazy"
                      />
                    </div>
                  )}
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

        {/* FIX 4: Inline confirm dialog instead of window.confirm() */}
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
            {typeof window !== "undefined" && (
              <p className="text-xs text-ink-muted mt-3 break-all">
                <strong>URL:</strong> {window.location.href}
              </p>
            )}
          </div>
        )}
      </section>

      {/* FOOTER */}
      {/* FIX 8: Updated copyright year to 2026 */}
      <footer className="border-t border-border-dim bg-black/50 mt-auto">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-[1200px] text-center">
          <Link href="/" className="font-playfair text-lg font-bold text-ink-primary hover:text-gold transition-colors">
            Eisatopon<span className="text-gold">AI</span>
          </Link>
          <p className="text-[0.8rem] text-ink-muted mt-2">
            Ελληνική Μαθηματική Εταιρεία — Θαλής • Ευκλείδης • Αρχιμήδης
          </p>
          <p className="text-[0.75rem] text-ink-muted mt-1">
            © 2026 eisatopon.gr
          </p>
        </div>
      </footer>
    </main>
  );
}