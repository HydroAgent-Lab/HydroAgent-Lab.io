"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { PAGE_SIZE, filterPapers, groupLabel, groupPapers, groupsToShow, planBriefLink, plural } from "@/lib/paper-digest.mjs";
import { usePaperDigest } from "./paper-digest-views";
import { PaperRow } from "./paper-row";
import { useSavedPapers } from "./saved-papers-store";

const TYPES = ["all", "published", "preprint"];

// The list, grouped by the week each paper was added. Papers arrive localized
// (one language, no fallback) through PaperDigestViews and are fully rendered
// on the server, so the page reads without JS; filtering, search and "show
// earlier" need it. "Show earlier" adds whole groups, PAGE_SIZE papers at a time.
export function PaperDigestFeed() {
  const { papers, aliases, lang, copy, currentYear, hash, save, share } = usePaperDigest();
  const { ids } = useSavedPapers();
  const searchId = useId();
  const [type, setType] = useState("all");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const [linkTarget, setLinkTarget] = useState(null);
  const statusRef = useRef(null);
  const view = useRef({ type, query, visibleCount });
  view.current = { type, query, visibleCount };

  // A shared link (#brief-<id>). The hash comes from PaperDigestViews, which
  // shows the home view in the same render, so the paper is on screen when
  // the next effect looks for it.
  useEffect(() => {
    const plan = planBriefLink(hash, papers, aliases, view.current);
    setLinkTarget(plan);
    if (!plan || plan.unavailable) return;
    setType(plan.type);
    setQuery(plan.query);
    setVisibleCount(plan.visibleCount);
  }, [hash, papers, aliases]);

  useEffect(() => {
    if (!linkTarget) return;
    if (linkTarget.unavailable) {
      statusRef.current?.scrollIntoView({ block: "start" });
      return;
    }
    const row = document.getElementById(`brief-${linkTarget.id}`);
    if (!row) return;
    const reading = row.querySelector("details");
    if (reading) reading.open = true;
    row.scrollIntoView({ block: "start" });
  }, [linkTarget]);

  const matches = useMemo(() => filterPapers(papers, { type, query }), [papers, type, query]);
  const groups = useMemo(() => groupPapers(matches, "week"), [matches]);
  const filtering = type !== "all" || query.trim() !== "";
  // A filter or search shows every match; paging only applies to the full list.
  const shown = filtering ? groups : groups.slice(0, groupsToShow(groups, visibleCount));

  return (
    <div className="pd-feed">
      <div className="pd-toolbar">
        <div className="pd-filter" role="group" aria-label={copy.filterLabel}>
          {TYPES.map((value) => (
            <button
              key={value}
              type="button"
              className="pd-filter-option"
              aria-pressed={type === value}
              onClick={() => {
                setLinkTarget(null);
                setType(value);
              }}
            >
              {copy.filters[value]}
            </button>
          ))}
        </div>
        <div className="pd-search">
          <input
            id={searchId}
            name="q"
            type="search"
            value={query}
            onChange={(event) => {
              setLinkTarget(null);
              setQuery(event.target.value);
            }}
            placeholder={copy.searchPlaceholder}
            aria-label={copy.searchLabel}
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>
      <p ref={statusRef} className="pd-results" role="status">
        {linkTarget?.unavailable ? copy.unavailable : filtering ? plural(copy.results, matches.length) : ""}
      </p>

      {shown.length ? (
        shown.map((group) => (
          <section key={group.key} className="pd-week" aria-labelledby={`pd-week-${group.key}`}>
            <h3 className="pd-week-label" id={`pd-week-${group.key}`}>
              <span>{groupLabel(group.key, "week", lang, currentYear)}</span>
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
                />
              ))}
            </ul>
          </section>
        ))
      ) : (
        <p className="pd-empty">{copy.empty}</p>
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
