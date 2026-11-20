"use client";

import { Fragment, memo, useId } from "react";
import { dayLabel } from "@/lib/paper-digest.mjs";
import { ExternalIcon } from "./icons";
import { PaperActions } from "./paper-actions";

const CJK = /[㐀-鿿]/;

// The reader's own calendar day for a save time: the save happened in this
// browser, and this text is never rendered on the server.
function localDay(stamp) {
  const date = new Date(stamp);
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

// Names joined by " · ", where a name never splits across lines and its dot
// stays with it: a line breaks only between "name ·" and the next name. The
// text reads exactly as names.join(" · "). Also used by the Highlights card.
export function NameList({ names }) {
  return names.map((name, i) => (
    <Fragment key={name}>
      {i ? " " : null}
      <span className="pd-nowrap">{i < names.length - 1 ? `${name} ·` : name}</span>
    </Fragment>
  ));
}

// A paper's title, a link to the paper (new tab) when it has a URL. Titles
// stay in their original language: an English one is marked on the zh page.
// The list's rows set it as an h4, a Highlights card as an h3, both in the
// same class (the face, size and spacing are the row's). A linked title ends
// in the external-link icon (an icon, not "↗": the web font has no arrows,
// so each device drew that in a system font). The title's last character
// goes with the icon in a span that never wraps: a line may break before any
// inline icon, and the icon must never start a line on its own.
export function PaperTitle({ as: Heading = "h4", className = "pd-paper-title", id, paper, lang, copy }) {
  const titleLang = lang === "zh" && !CJK.test(paper.title) ? "en" : undefined;
  const head = Array.from(paper.title);
  const last = head.pop();
  return (
    <Heading className={className} id={id} lang={titleLang}>
      {paper.url ? (
        <a href={paper.url} target="_blank" rel="noopener noreferrer">
          {head.join("")}
          <span className="pd-nowrap">
            {last}
            <ExternalIcon className="pd-ext" />
          </span>
          <span className="pd-sr">{copy.newTab}</span>
        </a>
      ) : (
        paper.title
      )}
    </Heading>
  );
}

// Venue · authors · date, what is missing left out. The date never splits
// across lines ("2026-08-" / "01"). Also used by the Highlights card.
export function byline(venue, authors, date) {
  return [venue, authors, date && <span className="pd-nowrap">{date}</span>]
    .filter(Boolean)
    .flatMap((part, i) => (i ? [" · ", part] : [part]));
}

// " et al." (zh: the count) after the `named` authors, when the paper has more.
export function etAl(paper, copy, named) {
  return paper.authorsTotal > named ? copy.moreAuthors.replace("{n}", String(paper.authorsTotal)) : "";
}

// The names of a paper's Domains, then Methods (or of either, by `keys`), in
// the data's order; an id the copy does not name is left out.
export function topicNames(paper, names, keys = ["domains", "methods"]) {
  return keys.flatMap((k) => (paper[k] ?? []).map((id) => names[k][id])).filter(Boolean);
}

// One paper: type and dates, then Save and Copy link; the title (opens the
// paper); the AI summary; venue, authors and date; its Domains and Methods;
// and the reading behind a disclosure. Used by the list and by Saved papers.
// - anchor: the list's copy carries id="brief-<id>", which shared links target;
//   Saved papers passes false, so ids stay unique on the page.
// - onShare: left out for a paper no longer in the digest (no link to share).
// - note: shown instead of the reading (Saved papers: "No longer in the
//   public digest").
// - highlighted: the brief wash after a shared link lands here.
// - onToggleSave(paper), onShare(id): the list passes the page's own Save and
//   Copy link, which never change, so a row re-renders only when its own
//   props do (memo): saving one paper does not redraw the others. onShare
//   resolves to whether the link was copied (PaperActions shows the check).
export const PaperRow = memo(function PaperRow({ paper, lang, copy, saved, onToggleSave, onShare, savedAt, anchor = true, note, highlighted = false }) {
  const titleId = useId();
  const source = byline(paper.venue, paper.authors.join(", ") + etAl(paper, copy, paper.authors.length), paper.date);
  // Domains, then Methods, by name: quiet text, not chips (they are not controls).
  const topics = topicNames(paper, copy.taxonomy);

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
        <PaperActions paper={paper} copy={copy} saved={saved} onToggleSave={onToggleSave} onShare={onShare} describedBy={titleId} />
      </div>
      <PaperTitle id={titleId} paper={paper} lang={lang} copy={copy} />
      {paper.summary ? <p className="pd-paper-summary">{paper.summary}</p> : null}
      {source.length ? <p className="pd-paper-byline">{source}</p> : null}
      {topics.length ? (
        <p className="pd-paper-topics">
          <span className="pd-sr">{copy.topics.prefix}</span>
          <NameList names={topics} />
        </p>
      ) : null}
      {note ? (
        <p className="pd-no-ai">{note}</p>
      ) : paper.details || paper.limitations ? (
        <details className="pd-paper-more">
          <summary>{paper.limitations ? copy.details.summary : copy.details.summaryOnly}</summary>
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
