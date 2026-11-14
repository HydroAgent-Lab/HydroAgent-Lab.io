"use client";

import { useEffect, useState } from "react";
import { useSavedPapers } from "./saved-papers-store";

// The header's way into Saved papers (#saved, on this page). The count fills
// in once the browser's saved list is read; until then its place is kept, so
// nothing shifts. At 560px and below only the icon and the count show; the
// name stays in aria-label. The header is outside <main>, so the link marks
// its own language.
export function SavedPapersLink({ label, countLabel, lang }) {
  const { ready, items } = useSavedPapers();
  const [current, setCurrent] = useState(false);

  useEffect(() => {
    const update = () => setCurrent(window.location.hash === "#saved");
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  return (
    <a
      className="pd-saved-link"
      href="#saved"
      lang={lang === "zh" ? "zh-CN" : undefined}
      aria-current={current ? "true" : undefined}
      aria-label={ready ? countLabel.replace("{n}", String(items.length)) : label}
    >
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M5 3h10v14l-5-3.5L5 17z" />
      </svg>
      <span className="pd-saved-link-label">{label}</span>
      <span className="pd-saved-count" aria-hidden="true">
        {ready ? items.length : ""}
      </span>
    </a>
  );
}
