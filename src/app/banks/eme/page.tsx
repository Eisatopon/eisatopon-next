"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import MainNavbar from "@/components/MainNavbar";
import katex from "katex";
import "katex/dist/katex.min.css";

interface EMEProblem {
  id: number;
  year: string;
  phase: "thales" | "euclides" | "archimedes";
  grade: string;
  problem_number: string;
  content: string;
  image: string | null;
}

const DATA_URLS: Record<string, string> = {
  "2024-2025": "https://cdn.jsdelivr.net/gh/Eisatopon/eisatopon-bank@main/math_competitions_2024_2025_latex.json",
  "2023-2024": "https://cdn.jsdelivr.net/gh/Eisatopon/eisatopon-bank@main/math_competitions_2023_2024_latex.json",
  "2022-2023": "https://cdn.jsdelivr.net/gh/Eisatopon/eisatopon-bank@main/math_competitions_2022_2023_latex.json",
  "2021-2022": "https://cdn.jsdelivr.net/gh/Eisatopon/eisatopon-bank@main/math_competitions_2021_2022_latex.json",
  "2020-2021": "https://cdn.jsdelivr.net/gh/Eisatopon/eisatopon-bank@main/math_competitions_2020_2021_latex.json",
  "2019-2020": "https://cdn.jsdelivr.net/gh/Eisatopon/eisatopon-bank@main/math_competitions_2019_2020_latex.json",
  "2018-2019": "https://cdn.jsdelivr.net/gh/Eisatopon/eisatopon-bank@main/math_competitions_2018_2019_latex.json",
  "2017-2018": "https://cdn.jsdelivr.net/gh/Eisatopon/eisatopon-bank@main/math_competitions_2017_2018_latex.json",
  "2016-2017": "https://cdn.jsdelivr.net/gh/Eisatopon/eisatopon-bank@main/math_competitions_2016_2017_latex.json",
  "2015-2016": "https://cdn.jsdelivr.net/gh/Eisatopon/eisatopon-bank@main/math_competitions_2015_2016_latex.json",
  "2014-2015": "https://cdn.jsdelivr.net/gh/Eisatopon/eisatopon-bank@main/math_competitions_2014_2015_latex.json",
  "2013-2014": "https://cdn.jsdelivr.net/gh/Eisatopon/eisatopon-bank@main/math_competitions_2013_2014_latex.json",
  "2012-2013": "https://cdn.jsdelivr.net/gh/Eisatopon/eisatopon-bank@main/math_competitions_2012_2013_latex.json",
  "2011-2012": "https://cdn.jsdelivr.net/gh/Eisatopon/eisatopon-bank@main/math_competitions_2011_2012_latex.json",
  "2010-2011": "https://cdn.jsdelivr.net/gh/Eisatopon/eisatopon-bank@main/math_competitions_2010_2011_latex.json",
  "2009-2010": "https://cdn.jsdelivr.net/gh/Eisatopon/eisatopon-bank@main/math_competitions_2009_2010_latex.json",
  "2008-2009": "https://cdn.jsdelivr.net/gh/Eisatopon/eisatopon-bank@main/math_competitions_2008_2009_latex.json",
  "2007-2008": "https://cdn.jsdelivr.net/gh/Eisatopon/eisatopon-bank@main/math_competitions_2007_2008_latex.json",
  "2006-2007": "https://cdn.jsdelivr.net/gh/Eisatopon/eisatopon-bank@main/math_competitions_2006_2007_latex.json",
  "2005-2006": "https://cdn.jsdelivr.net/gh/Eisatopon/eisatopon-bank@main/math_competitions_2005_2006_latex.json",
  "2004-2005": "https://cdn.jsdelivr.net/gh/Eisatopon/eisatopon-bank@main/math_competitions_2004_2005_latex.json",
  "2003-2004": "https://cdn.jsdelivr.net/gh/Eisatopon/eisatopon-bank@main/math_competitions_2003_2004_latex.json",
  "2002-2003": "https://cdn.jsdelivr.net/gh/Eisatopon/eisatopon-bank@main/math_competitions_2002_2003_latex.json",
  "2001-2002": "https://cdn.jsdelivr.net/gh/Eisatopon/eisatopon-bank@main/math_competitions_2001_2002_latex.json",
  "2000-2001": "https://cdn.jsdelivr.net/gh/Eisatopon/eisatopon-bank@main/math_competitions_2000_2001_latex.json",
  "1999-2000": "https://cdn.jsdelivr.net/gh/Eisatopon/eisatopon-bank@main/math_competitions_1999_2000_latex.json",
  "1998-1999": "https://cdn.jsdelivr.net/gh/Eisatopon/eisatopon-bank@main/math_competitions_1998_1999_latex.json",
  "1997-1998": "https://cdn.jsdelivr.net/gh/Eisatopon/eisatopon-bank@main/math_competitions_1997_1998_latex.json",
  "1996-1997": "https://cdn.jsdelivr.net/gh/Eisatopon/eisatopon-bank@main/math_competitions_1996_1997_latex.json",
  "1995-1996": "https://cdn.jsdelivr.net/gh/Eisatopon/eisatopon-bank@main/math_competitions_1995_1996_latex.json",
};

const IMAGES_BASE_URL = "https://cdn.jsdelivr.net/gh/Eisatopon/eisatopon-bank@main/images/";

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

const YEARS = Object.keys(DATA_URLS).sort((a, b) => b.localeCompare(a));

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

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderContent(raw: string): string {
  const normalized = raw.replace(/\\n/g, "\n");

  // Protect inline HTML (images etc) before any processing
  const htmlChunks: string[] = [];
  const withProtectedHtml = normalized.replace(/<div[\s\S]*?<\/div>/gi, (match) => {
    htmlChunks.push(match);
    return `\x00HTML${htmlChunks.length - 1}\x00`;
  });

  // Split on all math delimiters
  const parts = withProtectedHtml.split(
    /(\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)|\$\$[\s\S]*?\$\$|\$[^$\n]+?\$)/g
  );

  return parts
    .map((part) => {
      // Restore protected HTML
      if (part.includes("\x00HTML")) {
        return part.replace(/\x00HTML(\d+)\x00/g, (_, i) => htmlChunks[parseInt(i)]);
      }
      // Display math: \[...\] or $$...$$
      if ((part.startsWith("\\[") && part.endsWith("\\]")) ||
          (part.startsWith("$$") && part.endsWith("$$"))) {
        const latex = part.startsWith("\\[") ? part.slice(2, -2) : part.slice(2, -2);
        try {
          return katex.renderToString(latex, { displayMode: true, throwOnError: false });
        } catch {
          return `<span class="text-red-400 font-mono text-xs">${escapeHtml(part)}</span>`;
        }
      }
      // Inline math: \(...\) or $...$
      if ((part.startsWith("\\(") && part.endsWith("\\)")) ||
          (part.startsWith("$") && part.endsWith("$"))) {
        const latex = part.startsWith("\\(") ? part.slice(2, -2) : part.slice(1, -1);
        try {
          return katex.renderToString(latex, { displayMode: false, throwOnError: false });
        } catch {
          return `<span class="text-red-400 font-mono text-xs">${escapeHtml(part)}</span>`;
        }
      }
      return escapeHtml(part).replace(/\n/g, "<br />");
    })
    .join("");
}

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

export default function EMEPage() {
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedPhase, setSelectedPhase] = useState<string>("");
  const [selectedGrade, setSelectedGrade] = useState<string>("");
  const [selectedProblem, setSelectedProblem] = useState<string>("");
  const [allProblems, setAllProblems] = useState<EMEProblem[]>([]);
  const [filteredProblems, setFilteredProblems] = useState<EMEProblem[]>([]);
  const [selectedForExam, setSelectedForExam] = useState<EMEProblem[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadedYear, setLoadedYear] = useState<string | null>(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrUrl, setQrUrl] = useState<string>("");
  const [info, setInfo] = useState("Επιλέξτε φίλτρα για να δείτε θέματα");
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const loadedYearRef = useRef<string | null>(null);
  const allProblemsRef = useRef<EMEProblem[]>([]);

  useEffect(() => { loadedYearRef.current = loadedYear; }, [loadedYear]);
  useEffect(() => { allProblemsRef.current = allProblems; }, [allProblems]);

  const loadYear = useCallback(async (year: string): Promise<EMEProblem[] | false> => {
    if (loadedYearRef.current === year && allProblemsRef.current.length > 0) {
      return allProblemsRef.current;
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
      const text = await response.text();
      let data;
      try {
        data = text.trim() ? JSON.parse(text) : {};
      } catch {
        setInfo(`❌ Σφάλμα: Κατεστραμμένο αρχείο JSON για ${year}`);
        return false;
      }
      const rawProblems = data["προβλήματα"] || {};
      const recordYear = data.year || year;
      const problems: EMEProblem[] = [];
      const values = Object.values(rawProblems);
      if (values.length > 0) {
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
        } else {
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
      return problems;
    } catch (e: any) {
      setInfo(`❌ Σφάλμα: ${e.message}`);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const applyFilters = useCallback((problems: EMEProblem[], phase: string, grade: string, problemNum: string) => {
    const filtered = problems.filter((p) => {
      if (phase && p.phase !== phase) return false;
      if (grade && p.grade !== grade) return false;
      if (problemNum && p.problem_number !== problemNum) return false;
      return true;
    });
    setFilteredProblems(filtered);
    setInfo(`Βρέθηκαν ${filtered.length} θέματα`);
  }, []);

  const handleSearch = async () => {
    if (!selectedYear) { setInfo("⚠️ Επιλέξτε σχολικό έτος"); return; }
    const problems = await loadYear(selectedYear);
    if (problems) applyFilters(problems, selectedPhase, selectedGrade, selectedProblem);
  };

  const handleReset = () => {
    setSelectedYear(""); setSelectedPhase(""); setSelectedGrade(""); setSelectedProblem("");
    setAllProblems([]); setFilteredProblems([]); setLoadedYear(null);
    setInfo("Επιλέξτε φίλτρα για να δείτε θέματα");
  };

  const gradeOptions = selectedPhase === "archimedes" ? ARCHIMEDES_GRADES : NORMAL_GRADES;

  const addToExam = (problem: EMEProblem) => {
    setSelectedForExam((prev) => {
      if (prev.find((p) => p.id === problem.id)) { setInfo("⚠️ Το θέμα υπάρχει ήδη!"); return prev; }
      return [...prev, problem];
    });
  };

  const removeFromExam = (id: number) => setSelectedForExam((prev) => prev.filter((p) => p.id !== id));
  const printExam = () => { if (!selectedForExam.length) { setInfo("⚠️ Δεν έχετε επιλέξει θέματα"); return; } window.print(); };
  const clearExam = () => { if (!selectedForExam.length) return; setShowClearConfirm(true); };
  const confirmClear = () => { setSelectedForExam([]); setShowQRModal(false); setShowClearConfirm(false); };

  const generateQR = () => {
    if (!selectedForExam.length) { setInfo("⚠️ Πρώτα προσθέστε θέματα"); return; }
    const ids = selectedForExam.map((p) => p.id).join(",");
    const base = typeof window !== "undefined" ? window.location.href.split("?")[0] : "";
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(`${base}?problems=${ids}&year=${loadedYear}`)}`);
    setShowQRModal(true);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const ids = params.get("problems"); const year = params.get("year");
    if (!ids || !year) return;
    loadYear(year).then((problems) => {
      if (!problems) return;
      const idList = ids.split(",").map((id) => parseInt(id, 10));
      const selected = problems.filter((p) => idList.includes(p.id));
      setSelectedForExam(selected);
      if (selected.length > 0) setInfo(`✅ Φορτώθηκαν ${selected.length} θέματα από QR`);
    });
  }, [loadYear]);

  const selectStyle = { backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%235a5652'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center", backgroundSize: "16px", paddingRight: "36px" };
  const selectClass = "w-full bg-card border border-border-dim rounded-lg px-3 py-2.5 text-sm text-ink-primary focus:outline-none focus:border-gold/50 transition-colors appearance-none cursor-pointer";

  return (
    <main className="min-h-screen bg-base text-ink-primary">
      <MainNavbar />

      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#1a3a1a] via-[#0a0c10] to-[#1a1000]">
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
            <div className="text-center"><div className="text-2xl md:text-3xl font-bold text-gold font-playfair">3</div><div className="uppercase mt-1">Διαγωνισμοί</div></div>
            <div className="w-px h-8 bg-border-dim" />
            <div className="text-center"><div className="text-2xl md:text-3xl font-bold text-ink-primary font-playfair">30+</div><div className="uppercase mt-1">Έτη</div></div>
            <div className="w-px h-8 bg-border-dim" />
            <div className="text-center"><div className="text-2xl md:text-3xl font-bold text-gold font-playfair">500+</div><div className="uppercase mt-1">Θέματα</div></div>
          </div>
        </div>
      </section>

      <section className="sticky top-0 z-30 bg-base/95 backdrop-blur-md border-y border-border-dim">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4 max-w-[1200px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <div>
              <label className="block text-[0.7rem] tracking-wider uppercase text-ink-muted mb-1.5 font-medium">📅 Σχολικό Έτος</label>
              <select value={selectedYear} onChange={(e) => { setSelectedYear(e.target.value); setAllProblems([]); setFilteredProblems([]); setLoadedYear(null); }} className={selectClass} style={selectStyle}>
                <option value="">Επιλέξτε έτος</option>
                {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[0.7rem] tracking-wider uppercase text-ink-muted mb-1.5 font-medium">🏅 Φάση Διαγωνισμού</label>
              <select value={selectedPhase} onChange={(e) => { setSelectedPhase(e.target.value); setSelectedGrade(""); }} className={selectClass} style={selectStyle}>
                <option value="">Όλες οι φάσεις</option>
                <option value="thales">Θαλής (Α' Φάση)</option>
                <option value="euclides">Ευκλείδης (Β' Φάση)</option>
                <option value="archimedes">Αρχιμήδης (Γ' Φάση)</option>
              </select>
            </div>
            <div>
              <label className="block text-[0.7rem] tracking-wider uppercase text-ink-muted mb-1.5 font-medium">🎓 Τάξη / Κατηγορία</label>
              <select value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)} className={selectClass} style={selectStyle}>
                {gradeOptions.map((g) => <option key={g.value} value={g.value}>{g.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[0.7rem] tracking-wider uppercase text-ink-muted mb-1.5 font-medium">🎯 Αριθμός Θέματος</label>
              <select value={selectedProblem} onChange={(e) => setSelectedProblem(e.target.value)} className={selectClass} style={selectStyle}>
                <option value="">Όλα τα θέματα</option>
                {[1,2,3,4].map((n) => <option key={n} value={String(n)}>Θέμα {n}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <button onClick={handleSearch} disabled={loading} className="px-6 py-2.5 bg-gold/20 text-gold border border-gold/40 rounded-lg font-semibold text-sm hover:bg-gold/30 transition-all disabled:opacity-50">
              {loading ? "⏳ Φόρτωση..." : "🔍 Αναζήτηση"}
            </button>
            <button onClick={handleReset} className="px-6 py-2.5 bg-white/5 text-ink-muted border border-border-dim rounded-lg font-semibold text-sm hover:border-gold/30 hover:text-ink-secondary transition-all">
              🔄 Επαναφορά
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-6 max-w-[1200px]">
        <div className="bg-gold-dim border border-gold-border rounded-lg px-4 py-3 text-center">
          <p className="text-sm font-medium text-gold">{info}</p>
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-[1200px]">
        {filteredProblems.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📋</div>
            <h3 className="font-playfair text-xl text-ink-primary mb-2">
              {allProblems.length === 0 ? "Επιλέξτε έτος και πατήστε Αναζήτηση" : "Δεν βρέθηκαν θέματα"}
            </h3>
            <p className="text-ink-muted">Προσαρμόστε τα φίλτρα σας</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProblems.map((problem) => (
              <div key={problem.id} className="group rounded-xl border border-border-dim bg-card p-5 md:p-6 hover:border-gold/20 transition-all duration-300 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gold to-cat-amber opacity-60" />
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pl-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[0.65rem] font-bold bg-gold/15 text-gold border border-gold/30">{problem.year}</span>
                    <PhaseBadge phase={problem.phase} />
                    <GradeBadge grade={problem.grade} />
                  </div>
                  <button onClick={() => addToExam(problem)} className="px-4 py-2 bg-gold/10 text-gold border border-gold/30 rounded-lg text-sm font-semibold hover:bg-gold/20 transition-colors">✅ Προσθήκη</button>
                </div>
                <h3 className="font-playfair text-lg font-semibold text-ink-primary mb-3 pl-3">Θέμα {problem.problem_number}</h3>
                <div className="text-[0.95rem] leading-[1.85] text-ink-secondary pl-3" dangerouslySetInnerHTML={{ __html: renderContent(problem.content) }} />
                {problem.image && (
                  <div className="mt-4 pl-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={problem.image} alt={`Σχήμα θέματος ${problem.problem_number}`} className="max-w-full h-auto rounded-lg border border-border-dim" loading="lazy" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <section className="mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-[1200px] border-t border-border-dim">
        <h2 className="font-playfair text-2xl font-bold text-ink-primary mb-6 flex items-center gap-2">📝 <span className="text-gold">Η επιλογή μου</span></h2>
        {selectedForExam.length > 0 && (
          <div className="bg-gold-dim border border-gold-border rounded-lg px-4 py-3 mb-4 text-center">
            <p className="text-sm font-medium text-gold">Έχετε προσθέσει <span className="font-bold">{selectedForExam.length}</span> θέματα</p>
          </div>
        )}
        <div className="rounded-xl border-2 border-dashed border-gold/30 bg-card p-6 min-h-[150px]">
          {selectedForExam.length === 0 ? (
            <div className="text-center py-10"><div className="text-4xl mb-3">✏️</div><p className="text-ink-muted">Πατήστε «Προσθήκη» στα θέματα που θέλετε</p></div>
          ) : (
            <div className="space-y-6">
              {selectedForExam.map((p, idx) => (
                <div key={p.id} className="border-b border-border-dim pb-6 last:border-0">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-gold font-bold text-lg">{idx + 1}.</span>
                      <span className="font-semibold text-ink-primary">{PHASE_LABELS[p.phase]} – {GRADE_LABELS[p.grade]} – Θέμα {p.problem_number}</span>
                      <span className="text-sm text-ink-muted">({p.year})</span>
                    </div>
                    <button onClick={() => removeFromExam(p.id)} className="px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg text-sm hover:bg-red-500/20 transition-colors">❌ Αφαίρεση</button>
                  </div>
                  <div className="text-sm text-ink-secondary leading-relaxed" dangerouslySetInnerHTML={{ __html: renderContent(p.content) }} />
                  {p.image && (
                    <div className="mt-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.image} alt={`Σχήμα θέματος ${p.problem_number}`} className="max-w-full h-auto rounded-lg border border-border-dim" loading="lazy" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-3 mt-4">
          <button onClick={printExam} disabled={!selectedForExam.length} className="px-5 py-2.5 bg-gold/20 text-gold border border-gold/40 rounded-lg font-semibold text-sm hover:bg-gold/30 transition-colors disabled:opacity-30">🖨️ Εκτύπωση</button>
          <button onClick={generateQR} disabled={!selectedForExam.length} className="px-5 py-2.5 bg-cat-blue/10 text-cat-blue border border-cat-blue/30 rounded-lg font-semibold text-sm hover:bg-cat-blue/20 transition-colors disabled:opacity-30">📱 QR Code</button>
          <button onClick={clearExam} disabled={!selectedForExam.length} className="px-5 py-2.5 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg font-semibold text-sm hover:bg-red-500/20 transition-colors disabled:opacity-30">🗑️ Καθαρισμός</button>
        </div>
        {showClearConfirm && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/5 p-4 flex flex-col sm:flex-row items-center gap-3">
            <p className="text-sm text-red-400 flex-1">Θέλετε σίγουρα να διαγράψετε όλα τα θέματα;</p>
            <div className="flex gap-2">
              <button onClick={confirmClear} className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/40 rounded-lg text-sm font-semibold hover:bg-red-500/30 transition-colors">Ναι, διαγραφή</button>
              <button onClick={() => setShowClearConfirm(false)} className="px-4 py-2 bg-white/5 text-ink-muted border border-border-dim rounded-lg text-sm font-semibold hover:border-gold/30 transition-colors">Ακύρωση</button>
            </div>
          </div>
        )}
        {showQRModal && qrUrl && (
          <div className="mt-6 rounded-xl border border-border-dim bg-card p-6 text-center">
            <h4 className="text-gold font-semibold mb-4">📱 QR Code για κοινοποίηση</h4>
            <div className="bg-white rounded-xl p-4 inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrUrl} alt="QR Code" className="w-[220px] h-[220px]" />
            </div>
          </div>
        )}
      </section>

      <footer className="border-t border-border-dim bg-black/50 mt-auto">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-[1200px] text-center">
          <Link href="/" className="font-playfair text-lg font-bold text-ink-primary hover:text-gold transition-colors">Eisatopon<span className="text-gold">AI</span></Link>
          <p className="text-[0.8rem] text-ink-muted mt-2">Ελληνική Μαθηματική Εταιρεία — Θαλής • Ευκλείδης • Αρχιμήδης</p>
          <p className="text-[0.75rem] text-ink-muted mt-1">© 2026 eisatopon.gr</p>
        </div>
      </footer>
    </main>
  );
}
