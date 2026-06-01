import Link from "next/link";

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Link href="/" style={{
        position: "fixed", top: "16px", left: "16px", zIndex: 1000,
        color: "#c9a227", fontSize: "13px", fontWeight: 600,
        textDecoration: "none", display: "flex", alignItems: "center",
        gap: "6px", opacity: 0.75,
      }}>
        ← EisatoponAI
      </Link>
      {children}
    </>
  );
}