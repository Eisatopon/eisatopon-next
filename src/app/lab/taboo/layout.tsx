import Link from "next/link";

export default function TabooLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "#05070a", minHeight: "100vh" }}>
      <Link href="/lab" style={{
        position: "fixed", top: "16px", left: "16px", zIndex: 1000,
        color: "#e74c3c", fontSize: "13px", fontWeight: 600,
        textDecoration: "none", display: "flex", alignItems: "center",
        gap: "6px", opacity: 0.75,
      }}>
        ← Lab
      </Link>
      {children}
    </div>
  );
}