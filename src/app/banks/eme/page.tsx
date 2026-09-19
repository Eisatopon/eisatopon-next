"use client";

import { useEffect } from "react";

export default function EMERedirect() {
  useEffect(() => {
    window.location.replace("/banks/eme-bank/" + window.location.search);
  }, []);

  return (
    <main style={{ padding: "48px 24px", textAlign: "center" }}>
      <p>Η Τράπεζα Θεμάτων ΕΜΕ έχει νέα διεύθυνση:</p>
      <p><a href="/banks/eme-bank/">www.eisatopon.gr/banks/eme-bank/</a></p>
    </main>
  );
}