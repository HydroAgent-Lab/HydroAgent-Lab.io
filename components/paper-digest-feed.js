"use client";

import { useId, useMemo, useState } from "react";
import { dayLabel, filterPapers, groupByWeek, weekRange } from "@/lib/paper-digest.mjs";

const TYPES = ["all", "published", "preprint"];
// Weeks shown before "show earlier"; each click adds as many again.
const WEEKS_PER_STEP = 4;
const CJK = /[㐀-鿿]/;

const plural = (forms, n) => (n === 1 ? forms.one : forms.other).replace("{n}", String(n));

// The week-grouped list. Papers arrive already localized (one language, no
// fallback) and fully rendered on the server, so the page reads without JS;
// filtering, search and "show earlier" need it.
export function PaperDigestFeed({ papers, lang, copy, currentYear }) {
  const searchId = useId();
  const [type, setType] = useState("all");
  const [query, setQuery] = useState("");
  const [visibleWeeks, setVisibleWeeks] = useState(WEEKS_PER_STEP);

  const matches = useMemo(() => filterPapers(papers, { type, query }), [papers, type, query]);
  const weeks = useMemo(() => groupByWeek(matches), [matches]);
  const filtering = type !== "all" || query.trim() !== "";
  // A filter or search shows every match; paging only applies to the full list.
  const shown = filtering ? weeks : weeks.slice(0, visibleWeeks);

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
              onClick={() => setType(value)}
            >
              {copy.filters[value]}
            </button>
          ))}
        </div>
        <div className="pd-search">
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.searchPlaceholder}
            aria-label={copy.searchLabel}
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>
      <p className="pd-results" role="status">
        {filtering ? plural(copy.results, matches.length) : ""}
      </p>

      {shown.length ? (
        shown.map((week) => (
          <section key={week.start} className="pd-week" aria-labelledby={`pd-week-${week.start}`}>
            <h3 className="pd-week-label" id={`pd-week-${week.start}`}>
              <span>{weekRange(week.start, week.end, lang, currentYear)}</span>
              <span className="pd-week-count">{plural(copy.weekCount, week.papers.length)}</span>
            </h3>
            <ul className="pd-week-list">
              {week.papers.map((paper) => (
                <PaperRow key={paper.id} paper={paper} lang={lang} copy={copy} />
              ))}
            </ul>
          </section>
        ))
      ) : (
        <p className="pd-empty">{copy.empty}</p>
      )}

      {!filtering && weeks.length > visibleWeeks ? (
        <div className="pd-more-row">
          <button type="button" className="secondary-action pd-more" onClick={() => setVisibleWeeks((n) => n + WEEKS_PER_STEP)}>
            {copy.more}
          </button>
        </div>
      ) : null}
    </div>
  );
}

function PaperRow({ paper, lang, copy }) {
  const authors =
    paper.authors.join(", ") +
    (paper.authorsTotal > paper.authors.length ? copy.moreAuthors.replace("{n}", String(paper.authorsTotal)) : "");
  // The date never splits across lines ("2026-08-" / "01").
  const byline = [paper.venue, authors, paper.date && <span className="pd-nowrap">{paper.date}</span>]
    .filter(Boolean)
    .flatMap((part, i) => (i ? [" · ", part] : [part]));
  // Titles stay in their original language; mark English ones on the zh page.
  const titleLang = lang === "zh" && !CJK.test(paper.title) ? "en" : undefined;

  return (
    <li className="pd-paper">
      <div className="pd-paper-meta">
        <span className={`pd-badge is-${paper.type}`}>{copy.badges[paper.type]}</span>
        <time dateTime={paper.includedOn}>{copy.addedOn.replace("{date}", dayLabel(paper.includedOn, lang))}</time>
      </div>
      <h4 className="pd-paper-title" lang={titleLang}>
        {paper.url ? (
          <a href={paper.url} target="_blank" rel="noopener noreferrer">
            {paper.title}
            <span className="pd-ext" aria-hidden="true">↗</span>
            <span className="pd-sr">{copy.newTab}</span>
          </a>
        ) : (
          paper.title
        )}
      </h4>
      {paper.summary ? <p className="pd-paper-summary">{paper.summary}</p> : null}
      {byline.length ? <p className="pd-paper-byline">{byline}</p> : null}
      {paper.details || paper.limitations ? (
        <details className="pd-paper-more">
          <summary>{copy.details.summary}</summary>
          <dl>
            {paper.details ? (
              <>
                <dt>{copy.details.details}</dt>
                <dd>{paper.details}</dd>
              </>
            ) : null}
            {paper.limitations ? (
              <>
                <dt>{copy.details.limitations}</dt>
                <dd>{paper.limitations}</dd>
              </>
            ) : null}
          </dl>
        </details>
      ) : null}
    </li>
  );
}
