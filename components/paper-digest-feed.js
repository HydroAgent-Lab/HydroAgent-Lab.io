"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { DEFAULT_GRANULARITY, NO_FILTERS, PAGE_SIZE, editionKeys, filterPapers, groupLabel, groupPapers, isFiltered, listPage, planBriefLink, plural, taxonomyOptions } from "@/lib/paper-digest.mjs";
import { PaperDigestToolbar } from "./paper-digest-toolbar";
import { usePaperDigest } from "./paper-digest-views";
import { PaperRow } from "./paper-row";
import { useSavedPapers } from "./saved-papers-store";

// The list under "Latest papers". Papers arrive localized (one language, no
// fallback) through PaperDigestViews and are fully rendered on the server, so
// the page reads without JS; the toolbar, Save, Copy link and "show earlier"
// need it. Groups are days, weeks or months. "Show earlier" adds whole
// groups, PAGE_SIZE papers at a time, filtered or not; "Hide earlier" goes
// back to the first page; any change in the toolbar starts from it again.
export function PaperDigestFeed() {
  const { papers, aliases, lang, copy, currentYear, linkHash, linkSeq, save, share } = usePaperDigest();
  const { ids } = useSavedPapers();
  const [filters, setFilters] = useState({ granularity: DEFAULT_GRANULARITY, ...NO_FILTERS });
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [linkTarget, setLinkTarget] = useState(null);
  const [highlightId, setHighlightId] = useState(null);
  const statusRef = useRef(null);
  const moreRowRef = useRef(null);
  const earlierRef = useRef(null);
  const lessRef = useRef(null);
  // Set when "Show earlier" is pressed, until the list has grown.
  const showing = useRef(false);
  // Where the button row stood when "Hide earlier" was pressed (null: not hiding).
  const hideFrom = useRef(null);
  const view = useRef(null);
  view.current = { ...filters, savedIds: ids, visibleCount };

  // A shared link (#brief-<id>) clears only what would hide its paper. The
  // link comes from PaperDigestViews, which shows the home view in the same
  // render, so the paper is on screen when the next effect looks for it.
  // Leaving the link (to #saved, #latest…) empties `linkHash`, which ends it;
  // a new `linkSeq` asks for the same link again (PaperDigestViews' revisit).
  useEffect(() => {
    const plan = planBriefLink(linkHash, papers, aliases, view.current);
    setLinkTarget(plan);
    if (!plan || plan.unavailable) return;
    const { id, visibleCount: count, ...cleared } = plan;
    setFilters((value) => ({ ...value, ...cleared }));
    setVisibleCount(count);
  }, [linkHash, linkSeq, papers, aliases]);

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
  // its "no longer available" note, and starts the list from its first page.
  const change = (patch) => {
    setLinkTarget(null);
    setFilters((value) => ({ ...value, ...patch }));
    setVisibleCount(PAGE_SIZE);
  };

  // "Show earlier" adds the next page above the buttons; the screen stays
  // where it is. Its last press removes it, and the focus, which would drop
  // to the page, moves to "Hide earlier", now in its place.
  const showEarlier = () => {
    showing.current = true;
    setVisibleCount((n) => n + PAGE_SIZE);
  };

  // "Hide earlier" removes the papers above the buttons. The row stays where
  // the reader pressed it (measured after layout, so the browser's own scroll
  // anchoring is already counted), and the focus moves to "Show earlier",
  // since the pressed button is gone.
  const hideEarlier = () => {
    hideFrom.current = moreRowRef.current?.getBoundingClientRect().top ?? null;
    setVisibleCount(PAGE_SIZE);
  };

  useLayoutEffect(() => {
    if (showing.current) {
      showing.current = false;
      if (!earlierRef.current) lessRef.current?.focus({ preventScroll: true });
      return;
    }
    if (hideFrom.current === null) return;
    const before = hideFrom.current;
    hideFrom.current = null;
    const row = moreRowRef.current;
    if (!row) return;
    window.scrollBy({ top: row.getBoundingClientRect().top - before, behavior: "instant" });
    earlierRef.current?.focus({ preventScroll: true });
  }, [visibleCount]);

  const matches = useMemo(() => filterPapers(papers, { ...filters, savedIds: ids }), [papers, filters, ids]);
  const groups = useMemo(() => groupPapers(matches, filters.granularity), [matches, filters.granularity]);
  const editions = useMemo(() => editionKeys(papers, filters.granularity), [papers, filters.granularity]);
  // The Domains and Methods in use: the Filters panel's options.
  const taxonomy = useMemo(() => taxonomyOptions(papers), [papers]);
  const filtering = isFiltered(filters);
  // Filtered or not, the list pages; "found N" still counts every match.
  const { shown, earlier, hide } = listPage(groups, visibleCount);

  return (
    <div className="pd-feed">
      <PaperDigestToolbar
        copy={copy}
        lang={lang}
        currentYear={currentYear}
        filters={filters}
        editions={editions}
        taxonomy={taxonomy}
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
                  onToggleSave={save}
                  onShare={share}
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

      {earlier || hide ? (
        <div className="pd-more-row" ref={moreRowRef}>
          <div className="pd-more-actions">
            {earlier ? (
              <button type="button" ref={earlierRef} className="secondary-action pd-button pd-more" onClick={showEarlier}>
                {copy.more}
              </button>
            ) : null}
            {hide ? (
              <button type="button" ref={lessRef} className="secondary-action pd-button pd-less" onClick={hideEarlier}>
                {copy.less}
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
