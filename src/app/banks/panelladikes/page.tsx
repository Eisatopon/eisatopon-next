"use client";

import { useEffect } from "react";

export default function PanelladikesRedirect() {
  useEffect(() => {
    window.location.replace("/banks/panelladikes-bank/" + window.location.search);
  }, []);

  return (
    <main style={{ padding: "48px 24px", textAlign: "center" }}>
      <p>The Panhellenic Exams Bank has a new page.</p>
      <p><a href="/banks/panelladikes-bank/">Open the new page</a></p>
    </main>
  );
}