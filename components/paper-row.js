"use client";

import { memo, useId } from "react";
import { dayLabel } from "@/lib/paper-digest.mjs";

const CJK = /[㐀-鿿]/;

// The reader's own calendar day for a save time: the save happened in this
// browser, and this text is never rendered on the server.
function localDay(stamp) {
  const date = new Date(stamp);
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

// One paper: type and dates, then Save and Copy link; the title (opens the
// paper); the AI summary; venue, authors and date; and the reading behind a
// disclosure. Used by the list and by Saved papers.
// - anchor: the list's copy carries id="brief-<id>", which shared links target;
//   Saved papers passes false, so ids stay unique on the page.
// - onShare: left out for a paper no longer in the digest (no link to share).
// - note: shown instead of the reading (Saved papers: "No longer in the
//   public digest").
// - highlighted: the brief wash after a shared link lands here.
// - onToggleSave(paper), onShare(id): the list passes the page's own Save and
//   Copy link, which never change, so a row re-renders only when its own
//   props do (memo): saving one paper does not redraw the others.
export const PaperRow = memo(function PaperRow({ paper, lang, copy, saved, onToggleSave, onShare, savedAt, anchor = true, note, highlighted = false }) {
  const titleId = useId();
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
    <li className={highlighted ? "pd-paper is-target" : "pd-paper"} id={anchor ? `brief-${paper.id}` : undefined} tabIndex={-1}>
      <div className="pd-paper-meta">
        <div className="pd-paper-tags">
          {paper.type ? <span className={`pd-badge is-${paper.type}`}>{copy.badges[paper.type]}</span> : null}
          {paper.includedOn ? (
            <time dateTime={paper.includedOn}>{copy.addedOn.replace("{date}", dayLabel(paper.includedOn, lang))}</time>
          ) : null}
          {savedAt ? <time dateTime={savedAt}>{copy.savedOn.replace("{date}", dayLabel(localDay(savedAt), lang))}</time> : null}
        </div>
        <div className="pd-paper-actions">
          <button type="button" className="pd-icon-button pd-save" aria-pressed={saved} aria-describedby={titleId} title={copy.save} onClick={() => onToggleSave(paper)}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true" focusable="false">
              <path d="M5 3h10v14l-5-3.5L5 17z" />
            </svg>
            <span className="pd-sr">{copy.save}</span>
          </button>
          {onShare ? (
            <button type="button" className="pd-icon-button" aria-describedby={titleId} title={copy.share} onClick={() => onShare(paper.id)}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                <path d="M10 12.5V3M6.5 6.5L10 3l3.5 3.5M4 10.5v5.5h12v-5.5" />
              </svg>
              <span className="pd-sr">{copy.share}</span>
            </button>
          ) : null}
        </div>
      </div>
      <h4 className="pd-paper-title" id={titleId} lang={titleLang}>
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
      {note ? (
        <p className="pd-no-ai">{note}</p>
      ) : paper.details || paper.limitations ? (
        <details className="pd-paper-more">
          <summary>{copy.details.summary}</summary>
          <dl>
            {paper.details ? (
              <div className="pd-reading-part">
                <dt>{copy.details.details}</dt>
                <dd>{paper.details}</dd>
              </div>
            ) : null}
            {paper.limitations ? (
              <div className="pd-reading-part is-limits">
                <dt>{copy.details.limitations}</dt>
                <dd>{paper.limitations}</dd>
              </div>
            ) : null}
          </dl>
        </details>
      ) : paper.noReading ? (
        <p className="pd-no-ai">{copy.noAbstract}</p>
      ) : null}
    </li>
  );
});
