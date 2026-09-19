"use client";

import { useEffect } from "react";

export default function IMORedirect() {
  useEffect(() => {
    window.location.replace("/banks/imo-bank/" + window.location.search);
  }, []);

  return (
    <main style={{ padding: "48px 24px", textAlign: "center" }}>
      <p>The IMO Problem Bank has a new page.</p>
      <p><a href="/banks/imo-bank/">Open the new page</a></p>
    </main>
  );
}