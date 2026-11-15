"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PAGE_SIZE, editionKeys, filterPapers, groupLabel, groupPapers, groupsToShow, planBriefLink, plural } from "@/lib/paper-digest.mjs";
import { PaperDigestToolbar } from "./paper-digest-toolbar";
import { usePaperDigest } from "./paper-digest-views";
import { PaperRow } from "./paper-row";
import { useSavedPapers } from "./saved-papers-store";

// What "Clear all filters" resets; the grouping stays.
const NO_FILTERS = { query: "", edition: "", type: "all", savedOnly: false };

// The list under "Latest papers". Papers arrive localized (one language, no
// fallback) through PaperDigestViews and are fully rendered on the server, so
// the page reads without JS; the toolbar, Save, Copy link and "show earlier"
// need it. Groups are days, weeks or months. "Show earlier" adds whole
// groups, PAGE_SIZE papers at a time, while nothing is filtered.
export function PaperDigestFeed() {
  const { papers, aliases, lang, copy, currentYear, hash, save, share } = usePaperDigest();
  const { ids } = useSavedPapers();
  const [filters, setFilters] = useState({ granularity: "week", ...NO_FILTERS });
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [linkTarget, setLinkTarget] = useState(null);
  const [highlightId, setHighlightId] = useState(null);
  const statusRef = useRef(null);
  const view = useRef(null);
  view.current = { ...filters, savedIds: ids, visibleCount };

  // A shared link (#brief-<id>) clears only what would hide its paper. The
  // hash comes from PaperDigestViews, which shows the home view in the same
  // render, so the paper is on screen when the next effect looks for it.
  useEffect(() => {
    const plan = planBriefLink(hash, papers, aliases, view.current);
    setLinkTarget(plan);
    if (!plan || plan.unavailable) return;
    const { edition, type, query, savedOnly, visibleCount: count } = plan;
    setFilters((value) => ({ ...value, edition, type, query, savedOnly }));
    setVisibleCount(count);
  }, [hash, papers, aliases]);

  // Then go to it, at once: a glide down a long list ends after the mark has
  // faded. Its reading opens; the focus goes to the paper itself (keyboard
  // and screen reader users start there; no ring, the mark is the cue); the
  // mark shows for a moment.
  useEffect(() => {
    if (!linkTarget) return;
    if (linkTarget.unavailable) {
      statusRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
      return;
    }
    const row = document.getElementById(`brief-${linkTarget.id}`);
    if (!row) return;
    const reading = row.querySelector("details");
    if (reading) reading.open = true;
    row.scrollIntoView({ block: "start", behavior: "instant" });
    row.focus({ preventScroll: true });
    setHighlightId(linkTarget.id);
  }, [linkTarget]);

  // 1.5 s of a fading wash; with reduced motion, 2 s of a still one.
  useEffect(() => {
    if (!highlightId) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setHighlightId(null), still ? 2000 : 1500);
    return () => window.clearTimeout(timer);
  }, [highlightId]);

  // Any change the reader makes ends a shared link's hold on the view, and
  // its "no longer available" note.
  const change = (patch) => {
    setLinkTarget(null);
    setFilters((value) => ({ ...value, ...patch }));
  };

  const matches = useMemo(() => filterPapers(papers, { ...filters, savedIds: ids }), [papers, filters, ids]);
  const groups = useMemo(() => groupPapers(matches, filters.granularity), [matches, filters.granularity]);
  const editions = useMemo(() => editionKeys(papers, filters.granularity), [papers, filters.granularity]);
  const filtering = filters.query.trim() !== "" || filters.type !== "all" || filters.edition !== "" || filters.savedOnly;
  // A filter or search shows every match; paging applies to the full list only.
  const shown = filtering ? groups : groups.slice(0, groupsToShow(groups, visibleCount));

  return (
    <div className="pd-feed">
      <PaperDigestToolbar
        copy={copy}
        lang={lang}
        currentYear={currentYear}
        filters={filters}
        editions={editions}
        count={matches.length}
        onChange={change}
      />
      <p ref={statusRef} className="pd-results" role="status">
        {linkTarget?.unavailable ? copy.unavailable : filtering ? plural(copy.results, matches.length) : ""}
      </p>

      {shown.length ? (
        shown.map((group) => (
          <section key={group.key} className="pd-week" aria-labelledby={`pd-week-${group.key}`}>
            <h3 className="pd-week-label" id={`pd-week-${group.key}`}>
              <span>{groupLabel(group.key, filters.granularity, lang, currentYear)}</span>
              <span className="pd-week-count">{plural(copy.count, group.papers.length)}</span>
            </h3>
            <ul className="pd-week-list">
              {group.papers.map((paper) => (
                <PaperRow
                  key={paper.id}
                  paper={paper}
                  lang={lang}
                  copy={copy}
                  saved={ids.has(paper.id)}
                  onToggleSave={() => save(paper)}
                  onShare={() => share(paper.id)}
                  highlighted={highlightId === paper.id}
                />
              ))}
            </ul>
          </section>
        ))
      ) : (
        <div className="pd-empty">
          <p>{filters.savedOnly && !ids.size ? copy.emptySaved : copy.empty}</p>
          {filtering ? (
            <button type="button" className="secondary-action pd-button" onClick={() => change(NO_FILTERS)}>
              {copy.clearFilters}
            </button>
          ) : null}
        </div>
      )}

      {!filtering && shown.length < groups.length ? (
        <div className="pd-more-row">
          <button type="button" className="secondary-action pd-more" onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}>
            {copy.more}
          </button>
        </div>
      ) : null}
    </div>
  );
}
