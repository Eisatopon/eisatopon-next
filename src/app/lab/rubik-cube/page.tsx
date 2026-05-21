"use client";

export default function RubikCubePage() {
  return (
    <main
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(circle at top, #0b1020 0%, #05070a 60%)",
      }}
    >
      <iframe
        src="/rubik-cube/index.html"
        style={{
          width: "100%",
          height: "100vh",
          border: "none",
        }}
        title="Rubik's Cube Solver"
      />
    </main>
  );
}