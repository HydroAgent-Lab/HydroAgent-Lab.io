"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { plural } from "@/lib/paper-digest.mjs";
import { MAX_BACKUP_BYTES, backupFileName, buildBackup, mergeBackup, sortBySaved } from "@/lib/saved-papers.mjs";
import { PaperRow } from "./paper-row";
import { useSavedPapers } from "./saved-papers-store";

// A saved paper that has left the public digest, drawn from the details
// saved with it (its ID stands in for a missing title).
const fromSnapshot = ({ id, meta = {} }) => ({
  ...meta,
  id,
  title: meta.title || id,
  authors: meta.authors || [],
  authorsTotal: meta.authorsTotal || 0
});

// Saved papers (#saved): newest save first, Export and Import, and how saving
// works. The order is fixed when the view opens, so a paper unsaved here keeps
// its place (and can be saved again) until the reader leaves; papers saved
// meanwhile in another tab go on top. A paper still in the digest uses the
// list's row (reading, Copy link). PaperDigestViews passes everything in.
export function SavedPapersView({ papers, resolve, lang, copy, savedCopy, save, share, notify }) {
  const { ready, items, replace } = useSavedPapers();
  const [shown, setShown] = useState(null);
  const [status, setStatus] = useState("");
  const headingRef = useRef(null);
  const fileRef = useRef(null);
  const byId = useMemo(() => new Map(papers.map((paper) => [paper.id, paper])), [papers]);

  // The view opens at the top (PaperDigestViews); focus goes to its heading.
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  // Fix the order once the browser's list is in.
  useEffect(() => {
    if (ready && shown === null) setShown(sortBySaved(items));
  }, [ready, items, shown]);

  const current = new Map(items.map((item) => [item.id, item]));
  const fixed = shown ?? [];
  const fixedIds = new Set(fixed.map((item) => item.id));
  const rows = [...sortBySaved(items).filter((item) => !fixedIds.has(item.id)), ...fixed];

  const exportBackup = () => {
    const url = URL.createObjectURL(new Blob([buildBackup(items)], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = backupFileName();
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  const importBackup = async (event) => {
    const input = event.currentTarget;
    const file = input.files?.[0];
    input.value = ""; // the same file can be chosen again
    if (!file) return;
    if (file.size > MAX_BACKUP_BYTES) {
      setStatus(savedCopy.importErrors.size);
      return;
    }
    let text;
    try {
      text = await file.text();
    } catch {
      setStatus(savedCopy.importErrors.json);
      return;
    }
    const result = mergeBackup(items, text, resolve);
    if (result.error) {
      setStatus(savedCopy.importErrors[result.error]);
      return;
    }
    if (!replace(result.items)) {
      notify(savedCopy.toast.saveFailed, true);
      return;
    }
    setShown(sortBySaved(result.items));
    setStatus(
      [
        plural(savedCopy.imported.added, result.added),
        result.duplicates ? plural(savedCopy.imported.duplicates, result.duplicates) : "",
        result.invalid ? plural(savedCopy.imported.invalid, result.invalid) : ""
      ]
        .filter(Boolean)
        .join(" · ")
    );
  };

  return (
    <section className="content-section pd-saved" aria-labelledby="pd-saved-title">
      <a className="pd-back" href="#latest">
        <span aria-hidden="true">←</span> {savedCopy.back}
      </a>
      <h1 id="pd-saved-title" ref={headingRef} tabIndex={-1}>
        {savedCopy.title}
      </h1>
      <p className="pd-saved-total">{ready ? plural(savedCopy.count, items.length) : ""}</p>
      <div className="pd-saved-actions">
        {items.length ? (
          <button type="button" className="secondary-action pd-button" onClick={exportBackup}>
            {savedCopy.export}
          </button>
        ) : null}
        <button type="button" className="secondary-action pd-button" onClick={() => fileRef.current?.click()}>
          {savedCopy.import}
        </button>
        <input ref={fileRef} type="file" accept=".json,application/json" hidden onChange={importBackup} />
      </div>
      <p className="pd-saved-note">{savedCopy.localNote}</p>
      <details className="pd-howto">
        <summary>{savedCopy.howTitle}</summary>
        <p>{savedCopy.howText}</p>
      </details>
      <p className="pd-results" role="status">
        {status}
      </p>
      {rows.length ? (
        <ul className="pd-week-list pd-saved-list">
          {rows.map((row) => {
            const item = current.get(row.id) ?? row;
            const paper = byId.get(resolve(row.id));
            return (
              <PaperRow
                key={row.id}
                paper={paper ?? fromSnapshot(item)}
                lang={lang}
                copy={copy}
                anchor={false}
                saved={current.has(row.id)}
                savedAt={item.savedAt}
                note={paper ? undefined : savedCopy.missing}
                onToggleSave={() => save(paper ?? { id: row.id, ...item.meta })}
                onShare={paper ? () => share(paper.id) : undefined}
              />
            );
          })}
        </ul>
      ) : ready ? (
        <div className="pd-saved-empty">
          <h2>{savedCopy.emptyTitle}</h2>
          <p>{savedCopy.emptyText}</p>
          <a className="secondary-action pd-button" href="#latest">
            {savedCopy.emptyAction}
          </a>
        </div>
      ) : null}
    </section>
  );
}
