"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Link from "next/link";
import MainNavbar from "@/components/MainNavbar";
import katex from "katex";
import "katex/dist/katex.min.css";

// --- Types ---
interface IMOProblem {
  year: number;
  day: number;
  problem_id: string;
  topic: string;
  statement: string;
  official_solution_link?: string;
  shortlist_link?: string;
}

interface IMOLocation {
  country: string;
  city: string;
}

// --- Data ---
const YEAR_URLS: Record<string, string> = {
  "2025": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_2025.json",
  "2024": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_2024.json",
  "2023": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_2023.json",
  "2022": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_2022.json",
  "2021": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_2021.json",
  "2020": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_2020.json",
  "2019": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_2019.json",
  "2018": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_2018.json",
  "2017": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_2017.json",
  "2016": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_2016.json",
  "2015": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_2015.json",
  "2014": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_2014.json",
  "2013": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_2013.json",
  "2012": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_2012.json",
  "2011": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_2011.json",
  "2010": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_2010.json",
  "2009": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_2009.json",
  "2008": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_2008.json",
  "2007": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_2007.json",
  "2006": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_2006.json",
  "2005": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_2005.json",
  "2004": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_2004.json",
  "2003": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_2003.json",
  "2002": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_2002.json",
  "2001": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_2001.json",
  "2000": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_2000.json",
  "1999": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1999.json",
  "1998": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1998.json",
  "1997": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1997.json",
  "1996": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1996.json",
  "1995": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1995.json",
  "1994": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1994.json",
  "1993": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1993.json",
  "1992": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1992.json",
  "1991": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1991.json",
  "1990": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1990.json",
  "1989": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1989.json",
  "1988": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1988.json",
  "1987": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1987.json",
  "1986": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1986.json",
  "1985": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1985.json",
  "1984": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1984.json",
  "1983": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1983.json",
  "1982": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1982.json",
  "1981": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1981.json",
  // 1980: not held — intentionally omitted to avoid fetch error
  "1979": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1979.json",
  "1978": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1978.json",
  "1977": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1977.json",
  "1976": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1976.json",
  "1975": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1975.json",
  "1974": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1974.json",
  "1973": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1973.json",
  "1972": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1972.json",
  "1971": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1971.json",
  "1970": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1970.json",
  "1969": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1969.json",
  "1968": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1968.json",
  "1967": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1967.json",
  "1966": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1966.json",
  "1965": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1965.json",
  "1964": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1964.json",
  "1963": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1963.json",
  "1962": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1962.json",
  "1961": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1961.json",
  "1960": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1960.json",
  "1959": "https://raw.githubusercontent.com/Eisatopon/IMO-BANK/main/data/imo_1959.json",
};

const IMO_LOCATIONS: Record<string, IMOLocation> = {
  "2025": { country: "Australia", city: "Sydney" },
  "2024": { country: "United Kingdom", city: "Bath" },
  "2023": { country: "Japan", city: "Chiba" },
  "2022": { country: "Norway", city: "Oslo" },
  "2021": { country: "Russia", city: "St. Petersburg (online)" },
  "2020": { country: "Russia", city: "St. Petersburg (cancelled)" },
  "2019": { country: "United Kingdom", city: "Bath" },
  "2018": { country: "Romania", city: "Cluj-Napoca" },
  "2017": { country: "Brazil", city: "Rio de Janeiro" },
  "2016": { country: "Hong Kong", city: "Hong Kong" },
  "2015": { country: "Thailand", city: "Chiang Mai" },
  "2014": { country: "South Africa", city: "Cape Town" },
  "2013": { country: "Colombia", city: "Santa Marta" },
  "2012": { country: "Argentina", city: "Mar del Plata" },
  "2011": { country: "Netherlands", city: "Amsterdam" },
  "2010": { country: "Kazakhstan", city: "Astana" },
  "2009": { country: "Germany", city: "Bremen" },
  "2008": { country: "Spain", city: "Madrid" },
  "2007": { country: "Vietnam", city: "Hanoi" },
  "2006": { country: "Slovenia", city: "Ljubljana" },
  "2005": { country: "Mexico", city: "Mérida" },
  "2004": { country: "Greece", city: "Athens" },
  "2003": { country: "Japan", city: "Tokyo" },
  "2002": { country: "United Kingdom", city: "Glasgow" },
  "2001": { country: "USA", city: "Washington DC" },
  "2000": { country: "South Korea", city: "Taejon" },
  "1999": { country: "Romania", city: "Bucharest" },
  "1998": { country: "Taiwan", city: "Taipei" },
  "1997": { country: "Argentina", city: "Mar del Plata" },
  "1996": { country: "India", city: "Mumbai" },
  "1995": { country: "Canada", city: "Toronto" },
  "1994": { country: "Hong Kong", city: "Hong Kong" },
  "1993": { country: "Turkey", city: "Istanbul" },
  "1992": { country: "Russia", city: "Moscow" },
  "1991": { country: "Sweden", city: "Sigtuna" },
  "1990": { country: "China", city: "Beijing" },
  "1989": { country: "Germany", city: "Braunschweig" },
  "1988": { country: "Australia", city: "Canberra" },
  "1987": { country: "Cuba", city: "Havana" },
  "1986": { country: "Poland", city: "Warsaw" },
  "1985": { country: "Finland", city: "Joutsa" },
  "1984": { country: "Czechoslovakia", city: "Prague" },
  "1983": { country: "France", city: "Paris" },
  "1982": { country: "Hungary", city: "Budapest" },
  "1981": { country: "USA", city: "Washington DC" },
  "1980": { country: "—", city: "Not held" },
  "1979": { country: "United Kingdom", city: "London" },
  "1978": { country: "Romania", city: "Bucharest" },
  "1977": { country: "Yugoslavia", city: "Belgrade" },
  "1976": { country: "Austria", city: "Lienz" },
  "1975": { country: "Bulgaria", city: "Burgas" },
  "1974": { country: "East Germany", city: "Erfurt" },
  "1973": { country: "Soviet Union", city: "Moscow" },
  "1972": { country: "Poland", city: "Toruń" },
  "1971": { country: "Czechoslovakia", city: "Žilina" },
  "1970": { country: "Hungary", city: "Keszthely" },
  "1969": { country: "Romania", city: "Bucharest" },
  "1968": { country: "Soviet Union", city: "Moscow" },
  "1967": { country: "Yugoslavia", city: "Cetinje" },
  "1966": { country: "Bulgaria", city: "Sofia" },
  "1965": { country: "East Germany", city: "Berlin" },
  "1964": { country: "Soviet Union", city: "Moscow" },
  "1963": { country: "Poland", city: "Warsaw" },
  "1962": { country: "Czechoslovakia", city: "Bratislava" },
  "1961": { country: "Hungary", city: "Veszprém" },
  "1960": { country: "Romania", city: "Sinaia" },
  "1959": { country: "Romania", city: "Brașov" },
};

const CONTINENT_COLORS: Record<string, string> = {
  Europe: "#7fa8d4",
  Asia: "#c4a96a",
  Africa: "#7fb069",
  Oceania: "#8a70c0",
  Americas: "#c4706e",
};

const COUNTRY_TO_CONTINENT: Record<string, string> = {
  Australia: "Oceania", "United Kingdom": "Europe", Japan: "Asia",
  Norway: "Europe", Russia: "Europe", Romania: "Europe",
  Brazil: "Americas", "Hong Kong": "Asia", Thailand: "Asia",
  "South Africa": "Africa", Colombia: "Americas", Argentina: "Americas",
  Netherlands: "Europe", Kazakhstan: "Asia", Germany: "Europe",
  Spain: "Europe", Vietnam: "Asia", Slovenia: "Europe",
  Mexico: "Americas", Greece: "Europe", USA: "Americas",
  "South Korea": "Asia", Taiwan: "Asia", India: "Asia",
  Canada: "Americas", Turkey: "Asia", China: "Asia",
  Cuba: "Americas", Poland: "Europe", Finland: "Europe",
  Czechoslovakia: "Europe", France: "Europe", Hungary: "Europe",
  Yugoslavia: "Europe", Austria: "Europe", Bulgaria: "Europe",
  "East Germany": "Europe", "Soviet Union": "Europe", Sweden: "Europe",
};

const TOPIC_COLORS: Record<string, string> = {
  Algebra: "text-cat-red border-cat-red/30 bg-cat-red/5",
  Geometry: "text-cat-blue border-cat-blue/30 bg-cat-blue/5",
  "Number Theory": "text-cat-amber border-cat-amber/30 bg-cat-amber/5",
  Combinatorics: "text-cat-green border-cat-green/30 bg-cat-green/5",
};

// --- Components ---

const OlympicRings = () => (
  <svg width="120" height="80" viewBox="0 0 110 70" className="shrink-0">
    <circle cx="25" cy="22" r="11" fill="none" stroke="#0085C7" strokeWidth="3" />
    <circle cx="55" cy="22" r="11" fill="none" stroke="#000000" strokeWidth="3" />
    <circle cx="85" cy="22" r="11" fill="none" stroke="#DF0024" strokeWidth="3" />
    <circle cx="40" cy="40" r="11" fill="none" stroke="#F4C300" strokeWidth="3" />
    <circle cx="70" cy="40" r="11" fill="none" stroke="#009F3D" strokeWidth="3" />
  </svg>
);

const LocationBadge = ({ year }: { year: number }) => {
  const loc = IMO_LOCATIONS[year.toString()];
  if (!loc || loc.country === "—") return null;

  const continent = COUNTRY_TO_CONTINENT[loc.country] || "Europe";
  const color = CONTINENT_COLORS[continent];

  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.65rem] font-medium border"
      style={{
        backgroundColor: `${color}15`,
        borderColor: `${color}40`,
        color: color,
      }}
    >
      <span>🌍</span>
      {loc.city}, {loc.country}
    </span>
  );
};

const TopicBadge = ({ topic }: { topic: string }) => {
  const style = TOPIC_COLORS[topic] || "text-ink-muted border-border-dim bg-card";
  return (
    <span className={`text-[0.65rem] tracking-wider uppercase px-2 py-0.5 rounded border ${style}`}>
      {topic}
    </span>
  );
};

// --- KaTeX renderer ---
// Splits the statement on \(...\) and \[...\] delimiters,
// renders each math segment with KaTeX, and escapes the rest as plain HTML.
function renderStatement(raw: string): string {
  // Split on display math \[...\] first, then inline \(...\)
  const parts = raw.split(/(\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\))/g);

  return parts
    .map((part) => {
      if (part.startsWith("\\[") && part.endsWith("\\]")) {
        const latex = part.slice(2, -2);
        try {
          return katex.renderToString(latex, { displayMode: true, throwOnError: false });
        } catch {
          return `<span class="text-red-400">${escapeHtml(part)}</span>`;
        }
      }
      if (part.startsWith("\\(") && part.endsWith("\\)")) {
        const latex = part.slice(2, -2);
        try {
          return katex.renderToString(latex, { displayMode: false, throwOnError: false });
        } catch {
          return `<span class="text-red-400">${escapeHtml(part)}</span>`;
        }
      }
      // Plain text — escape HTML and convert newlines to <br />
      return escapeHtml(part).replace(/\n/g, "<br />");
    })
    .join("");
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// --- Main Page ---

export default function IMOPage() {
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const [selectedDay, setSelectedDay] = useState<string>("all");
  const [selectedProblem, setSelectedProblem] = useState<string>("all");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [allProblems, setAllProblems] = useState<IMOProblem[]>([]);       // FIX 1: was useState<<IMOProblem[]>
  const [filteredProblems, setFilteredProblems] = useState<IMOProblem[]>([]); // FIX 1: same
  const [loading, setLoading] = useState(false);
  const [selectedForExam, setSelectedForExam] = useState<Set<string>>(new Set()); // FIX 1: same
  const [showExamModal, setShowExamModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrUrl, setQrUrl] = useState<string>("");
  const [info, setInfo] = useState("Loading...");

  // FIX 2: Keep filters in a ref so loadYear doesn't re-create on every
  // filter change, which was causing spurious re-fetches via useEffect.
  const filtersRef = useRef({ selectedDay, selectedProblem, selectedTopic, searchQuery });
  useEffect(() => {
    filtersRef.current = { selectedDay, selectedProblem, selectedTopic, searchQuery };
  }, [selectedDay, selectedProblem, selectedTopic, searchQuery]);

  // Apply all filters — pure function, no side effects
  const applyFilters = useCallback((
    problems: IMOProblem[],
    day: string,
    problem: string,
    topic: string,
    query: string
  ) => {
    const filtered = problems.filter((p) => {
      if (day !== "all" && String(p.day) !== day) return false;
      if (problem !== "all" && p.problem_id !== problem) return false;
      if (topic !== "all" && p.topic !== topic) return false;
      if (query) {
        const q = query.toLowerCase();
        if (
          !p.statement.toLowerCase().includes(q) &&
          !p.topic.toLowerCase().includes(q) &&
          !p.problem_id.toLowerCase().includes(q)
        ) return false;
      }
      return true;
    });
    setFilteredProblems(filtered);
  }, []);

  // FIX 2: loadYear no longer depends on filter state — uses ref instead.
  // This means changing a filter dropdown does NOT trigger a new network request.
  const loadYear = useCallback(async (year: number) => {
    // FIX 3: Guard against 1980 (not held) — no URL exists for it
    const url = YEAR_URLS[year.toString()];
    if (!url) {
      setAllProblems([]);
      setFilteredProblems([]);
      setInfo(`IMO ${year} was not held.`);
      return;
    }

    setLoading(true);
    setInfo(`Loading ${year}...`);

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const problems: IMOProblem[] = Array.isArray(data) ? data : [];
      setAllProblems(problems);
      setInfo(`Loaded ${problems.length} problem${problems.length !== 1 ? "s" : ""} for ${year}.`);
      // Use the current filter values from ref, not stale closure values
      const { selectedDay, selectedProblem, selectedTopic, searchQuery } = filtersRef.current;
      applyFilters(problems, selectedDay, selectedProblem, selectedTopic, searchQuery);
    } catch {
      setAllProblems([]);
      setFilteredProblems([]);
      setInfo(`Failed to load year ${year}.`);
    } finally {
      setLoading(false);
    }
  }, [applyFilters]); // applyFilters is stable (no deps that change)

  // Initial load + reload when year changes
  useEffect(() => {
    loadYear(selectedYear);
  }, [selectedYear, loadYear]);

  // Filter handlers — these only re-filter already-loaded data, no fetch
  const handleSearch = useCallback(() => {
    applyFilters(allProblems, selectedDay, selectedProblem, selectedTopic, searchQuery);
  }, [allProblems, selectedDay, selectedProblem, selectedTopic, searchQuery, applyFilters]);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    setSelectedForExam(new Set());
    setSearchQuery("");
    // Reset filter UI but keep them in state; loadYear will pick up via ref
    setSelectedDay("all");
    setSelectedProblem("all");
    setSelectedTopic("all");
  };

  // Toggle problem selection for exam builder
  const toggleProblem = (year: number, problemId: string) => {
    const key = `${year}_${problemId}`;
    setSelectedForExam((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  // Generate QR Code
  const generateQR = () => {
    const examData = JSON.stringify({
      problems: Array.from(selectedForExam),
      timestamp: Date.now(),
      url: window.location.href,
    });
    const encoded = encodeURIComponent(examData);
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encoded}`);
    setShowQRModal(true);
  };

  // Build exam preview HTML (used for PDF/print)
  const buildExamHTML = useCallback(() => {
    return Array.from(selectedForExam)
      .map((key) => {
        const [y, pid] = key.split("_");
        return allProblems.find((p) => p.year === Number(y) && p.problem_id === pid);
      })
      .filter(Boolean)
      .map((p, idx) => {
        const prob = p as IMOProblem;
        const loc = IMO_LOCATIONS[prob.year.toString()] || { city: "—", country: "—" };
        return `
          <div style="margin-bottom:35px; page-break-inside:avoid;">
            <div style="background:#1a1a2e; padding:12px 16px; border-radius:8px; margin-bottom:12px; border-left:3px solid #c4a96a;">
              <strong style="color:#c4a96a;">Problem ${idx + 1}:</strong>
              <span style="color:#e8e6e3;">IMO ${prob.year} (${loc.city}, ${loc.country}) — ${prob.problem_id} — ${prob.topic}</span>
            </div>
            <div style="padding:16px; line-height:1.8; color:#b8b4ad; font-size:15px;">
              ${prob.statement.replace(/\n/g, "<br>")}
            </div>
          </div>
        `;
      })
      .join("");
  }, [selectedForExam, allProblems]);

  // Download PDF / print fallback
  const downloadPDF = useCallback(() => {
    const htmlContent = `
      <div style="font-family: Georgia, serif; background:#0a0c10; color:#e8e6e3; padding:40px;">
        <div style="text-align:center; border-bottom:2px solid #c4a96a; padding-bottom:24px; margin-bottom:32px;">
          <h1 style="color:#c4a96a; font-size:28px; margin-bottom:8px;">Mathematics Exam</h1>
          <p style="color:#8a8580; font-size:16px;">Selected IMO Problems</p>
          <p style="color:#5a5652; font-size:13px;">${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
        ${buildExamHTML()}
      </div>
    `;

    if (typeof window !== "undefined" && (window as any).html2pdf) {
      const opt = {
        margin: 15,
        filename: `IMO_Exam_${Date.now()}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };
      (window as any).html2pdf().set(opt).from(htmlContent).save();
    } else {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`<html><head><title>IMO Exam</title></head><body>${htmlContent}</body></html>`);
        printWindow.document.close();
        printWindow.print();
      }
    }
  }, [buildExamHTML]);

  // Deduplicated resource links from currently filtered problems
  const officialLinks = useMemo(() => {
    const map = new Map<number, string>();
    filteredProblems.forEach((p) => {
      if (p.official_solution_link) map.set(p.year, p.official_solution_link);
    });
    return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
  }, [filteredProblems]);

  const shortlistLinks = useMemo(() => {
    const map = new Map<number, string>();
    filteredProblems.forEach((p) => {
      if (p.shortlist_link) map.set(p.year, p.shortlist_link);
    });
    return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
  }, [filteredProblems]);

  const availableTopics = useMemo(() => {
    const topics = new Set(allProblems.map((p) => p.topic));
    return Array.from(topics).sort();
  }, [allProblems]);

  // FIX 3: Year list — exclude 1980 (not held, no data file)
  // We still show it as a disabled option so users understand the gap.
  const years = Array.from({ length: 67 }, (_, i) => 2025 - i);

  return (
    <main className="min-h-screen bg-base text-ink-primary">
      <MainNavbar />

      {/* HERO */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(0,40,60,0.4) 0%, rgba(10,12,16,0.9) 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(196,169,106,0.3) 1px, transparent 1px),
                                radial-gradient(circle at 75% 75%, rgba(196,169,106,0.3) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 max-w-[1200px]">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <OlympicRings />
            <div className="text-center md:text-left">
              <div className="text-[0.7rem] tracking-[0.3em] uppercase text-gold font-medium mb-2">
                International Mathematical Olympiad
              </div>
              <h1 className="font-playfair text-[clamp(1.8rem,5vw,3rem)] font-bold leading-tight mb-2">
                IMO <span className="text-gold">Problem Bank</span>
              </h1>
              <p className="text-ink-tertiary text-base md:text-lg">
                Archive of Problems (1959 – 2025)
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center md:justify-start gap-6 md:gap-10 mt-8 text-[0.75rem] tracking-widest text-ink-muted">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-ink-primary font-playfair">66</div>
              {/* FIX 3: 67 years total but 1980 not held → 66 actual competitions */}
              <div className="uppercase mt-1">Contests</div>
            </div>
            <div className="w-px h-8 bg-border-dim" />
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-ink-primary font-playfair">400+</div>
              <div className="uppercase mt-1">Problems</div>
            </div>
            <div className="w-px h-8 bg-border-dim" />
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gold font-playfair">110+</div>
              <div className="uppercase mt-1">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTROLS */}
      <section className="sticky top-0 z-30 bg-base/95 backdrop-blur-md border-y border-border-dim">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4 max-w-[1200px]">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-end">

            {/* Search */}
            <div className="flex-[2] min-w-[200px]">
              <label className="block text-[0.7rem] tracking-wider uppercase text-ink-muted mb-1.5 font-medium">
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search problem text, topic, or ID..."
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
            <div className="flex-1 min-w-[120px]">
              <label className="block text-[0.7rem] tracking-wider uppercase text-ink-muted mb-1.5 font-medium">
                Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => handleYearChange(Number(e.target.value))}
                className="w-full bg-card border border-border-dim rounded-lg px-3 py-2.5 text-sm text-ink-primary focus:outline-none focus:border-gold/50 transition-colors appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%235a5652'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center", backgroundSize: "16px", paddingRight: "36px" }}
              >
                {years.map((y) => (
                  // FIX 3: 1980 shown but disabled — prevents fetch of missing file
                  <option key={y} value={y} disabled={y === 1980}>
                    {y === 1980 ? "1980 (not held)" : y}
                  </option>
                ))}
              </select>
            </div>

            {/* Day */}
            <div className="flex-1 min-w-[120px]">
              <label className="block text-[0.7rem] tracking-wider uppercase text-ink-muted mb-1.5 font-medium">
                Day
              </label>
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="w-full bg-card border border-border-dim rounded-lg px-3 py-2.5 text-sm text-ink-primary focus:outline-none focus:border-gold/50 transition-colors appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%235a5652'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center", backgroundSize: "16px", paddingRight: "36px" }}
              >
                <option value="all">All Days</option>
                <option value="1">Day 1</option>
                <option value="2">Day 2</option>
              </select>
            </div>

            {/* Problem */}
            <div className="flex-1 min-w-[120px]">
              <label className="block text-[0.7rem] tracking-wider uppercase text-ink-muted mb-1.5 font-medium">
                Problem
              </label>
              <select
                value={selectedProblem}
                onChange={(e) => setSelectedProblem(e.target.value)}
                className="w-full bg-card border border-border-dim rounded-lg px-3 py-2.5 text-sm text-ink-primary focus:outline-none focus:border-gold/50 transition-colors appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%235a5652'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center", backgroundSize: "16px", paddingRight: "36px" }}
              >
                <option value="all">All Problems</option>
                {["P1", "P2", "P3", "P4", "P5", "P6"].map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Topic */}
            <div className="flex-1 min-w-[120px]">
              <label className="block text-[0.7rem] tracking-wider uppercase text-ink-muted mb-1.5 font-medium">
                Topic
              </label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full bg-card border border-border-dim rounded-lg px-3 py-2.5 text-sm text-ink-primary focus:outline-none focus:border-gold/50 transition-colors appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%235a5652'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center", backgroundSize: "16px", paddingRight: "36px" }}
              >
                <option value="all">All Topics</option>
                {availableTopics.map((topic) => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-6 py-2.5 bg-gold/20 text-gold border border-gold/40 rounded-lg font-semibold text-sm hover:bg-gold/30 active:bg-gold/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] shrink-0"
            >
              {loading ? "Loading..." : "Search"}
            </button>
          </div>
        </div>
      </section>

      {/* RESULTS INFO */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-6 max-w-[1200px]">
        <div className="flex items-center justify-between">
          <p className="text-[0.85rem] font-medium text-gold">{info}</p>
          {filteredProblems.length > 0 && (
            <p className="text-[0.75rem] text-ink-muted">
              Showing <span className="text-ink-secondary">{filteredProblems.length}</span> of {allProblems.length} problems
            </p>
          )}
        </div>
      </div>

      {/* PROBLEMS */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-[1200px]">
        {filteredProblems.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">📭</div>
            <h3 className="font-playfair text-xl text-ink-primary mb-2">No problems found</h3>
            <p className="text-ink-muted">Try adjusting your filters or search query.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProblems.map((problem) => {
              const isSelected = selectedForExam.has(`${problem.year}_${problem.problem_id}`);

              return (
                <div
                  key={`${problem.year}-${problem.problem_id}`}
                  className="group rounded-xl border border-border-dim bg-card p-5 md:p-6 hover:border-gold/20 transition-all duration-300"
                >
                  {/* Badges row */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <label className="inline-flex items-center cursor-pointer mr-1">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleProblem(problem.year, problem.problem_id)}
                        className="w-5 h-5 rounded border-border-dim bg-card text-gold focus:ring-gold/30 focus:ring-2 cursor-pointer accent-gold"
                        aria-label={`Select ${problem.year} ${problem.problem_id} for exam`}
                      />
                    </label>

                    <span className="px-2.5 py-1 rounded-full text-[0.65rem] font-bold bg-gold/15 text-gold border border-gold/30">
                      {problem.year}
                    </span>

                    <LocationBadge year={problem.year} />

                    <span className="px-2.5 py-1 rounded-full text-[0.65rem] font-bold bg-cat-amber/10 text-cat-amber border border-cat-amber/20">
                      Day {problem.day}
                    </span>

                    <span className="px-2.5 py-1 rounded-full text-[0.65rem] font-bold bg-white/5 text-ink-secondary border border-border-dim">
                      {problem.problem_id}
                    </span>

                    <TopicBadge topic={problem.topic} />
                  </div>

                  {/* Problem text — FIX 4: extracted to renderStatement() for clarity */}
                  <div
                    className="text-[0.95rem] leading-[1.85] text-ink-secondary text-justify"
                    dangerouslySetInnerHTML={{ __html: renderStatement(problem.statement) }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* BOTTOM LINKS */}
      {(officialLinks.length > 0 || shortlistLinks.length > 0) && (
        <div className="mx-auto px-4 sm:px-6 lg:px-8 pb-10 max-w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {officialLinks.length > 0 && (
              <div className="rounded-xl border border-border-dim bg-card p-5">
                <h4 className="text-[0.8rem] tracking-wider uppercase text-gold font-semibold mb-3 sticky top-0 bg-card pb-2">
                  Official Solutions
                </h4>
                <div className="space-y-2 max-h-[200px] overflow-y-auto scrollbar-thin">
                  {officialLinks.map(([year, url]) => (
                    <a key={year} href={url} target="_blank" rel="noopener noreferrer" className="block text-sm text-ink-secondary hover:text-gold transition-colors py-1">
                      📄 IMO {year} — Official Solutions
                    </a>
                  ))}
                </div>
              </div>
            )}

            {shortlistLinks.length > 0 && (
              <div className="rounded-xl border border-border-dim bg-card p-5">
                <h4 className="text-[0.8rem] tracking-wider uppercase text-gold font-semibold mb-3 sticky top-0 bg-card pb-2">
                  Shortlisted Problems
                </h4>
                <div className="space-y-2 max-h-[200px] overflow-y-auto scrollbar-thin">
                  {shortlistLinks.map(([year, url]) => (
                    <a key={year} href={url} target="_blank" rel="noopener noreferrer" className="block text-sm text-ink-secondary hover:text-gold transition-colors py-1">
                      📄 IMO {year} — Shortlist
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FLOATING EXAM BUTTON */}
      {selectedForExam.size > 0 && (
        <button
          onClick={() => setShowExamModal(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3 bg-gold text-black font-bold text-sm rounded-full shadow-lg shadow-gold/20 hover:scale-105 active:scale-95 transition-transform"
          aria-label={`Create exam with ${selectedForExam.size} selected problems`}
        >
          📝 Create Exam
          <span className="bg-black/20 px-2 py-0.5 rounded-full text-xs">
            {selectedForExam.size}
          </span>
        </button>
      )}

      {/* EXAM MODAL */}
      {showExamModal && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm overflow-y-auto p-4 md:p-8"
          onClick={(e) => e.target === e.currentTarget && setShowExamModal(false)}
        >
          <div className="relative max-w-3xl mx-auto bg-card border border-border-dim rounded-2xl p-6 md:p-10 my-8 shadow-2xl">
            {/* relative is present here ✅ */}
            <button
              onClick={() => setShowExamModal(false)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full text-ink-muted hover:text-ink-primary hover:bg-white/5 transition-colors text-xl"
              aria-label="Close exam builder"
            >
              ✕
            </button>

            <h2 className="font-playfair text-2xl md:text-3xl font-bold text-center text-ink-primary mb-8">
              🎓 <span className="text-gold">IMO</span> Exam
            </h2>

            <div className="space-y-6">
              {Array.from(selectedForExam).map((key) => {
                const [y, pid] = key.split("_");
                const p = allProblems.find((prob) => prob.year === Number(y) && prob.problem_id === pid);
                if (!p) return null;
                const loc = IMO_LOCATIONS[p.year.toString()] || { city: "—", country: "—" };

                return (
                  <div key={key} className="border-l-2 border-gold pl-4">
                    <div className="text-[0.8rem] text-gold mb-2 font-medium">
                      IMO {p.year} ({loc.city}, {loc.country}) — {p.problem_id} — {p.topic}
                    </div>
                    <div className="text-sm text-ink-secondary leading-relaxed">
                      {p.statement.substring(0, 200)}...
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-border-dim">
              <button
                onClick={downloadPDF}
                className="flex-1 min-w-[140px] px-5 py-3 bg-gold/20 text-gold border border-gold/40 rounded-lg font-semibold text-sm hover:bg-gold/30 transition-colors"
              >
                📥 Download PDF
              </button>
              <button
                onClick={generateQR}
                className="flex-1 min-w-[140px] px-5 py-3 bg-cat-blue/10 text-cat-blue border border-cat-blue/30 rounded-lg font-semibold text-sm hover:bg-cat-blue/20 transition-colors"
              >
                📱 QR Code
              </button>
              <button
                onClick={() => { setSelectedForExam(new Set()); setShowExamModal(false); }}
                className="flex-1 min-w-[140px] px-5 py-3 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg font-semibold text-sm hover:bg-red-500/20 transition-colors"
              >
                🗑️ Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR MODAL — FIX 5: added `relative` to parent so absolute close button positions correctly */}
      {showQRModal && qrUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setShowQRModal(false)}
        >
          <div className="relative bg-card border border-border-dim rounded-2xl p-6 md:p-8 max-w-sm w-full text-center shadow-2xl">
            {/* FIX 5: `relative` added above — close button now positions correctly */}
            <button
              onClick={() => setShowQRModal(false)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full text-ink-muted hover:text-ink-primary hover:bg-white/5 transition-colors text-xl"
              aria-label="Close QR code modal"
            >
              ✕
            </button>

            <h3 className="font-playfair text-xl font-bold text-ink-primary mb-2">
              📱 Scan to Share
            </h3>
            <p className="text-sm text-ink-muted mb-4">
              Scan this QR code to access the selected problems on another device.
            </p>

            <div className="bg-white rounded-xl p-4 inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrUrl} alt="QR Code for exam sharing" width={200} height={200} />
            </div>

            <p className="text-xs text-ink-muted mt-4">
              {selectedForExam.size} problems selected
            </p>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-border-dim bg-black/50 mt-auto">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-[1200px] text-center">
          <Link href="/" className="font-playfair text-lg font-bold text-ink-primary hover:text-gold transition-colors">
            Eisatopon<span className="text-gold">AI</span>
          </Link>
          <p className="text-[0.8rem] text-ink-muted mt-2">
            IMO Problem Bank — Interactive mathematical archives
          </p>
        </div>
      </footer>

    </main>
  );
}