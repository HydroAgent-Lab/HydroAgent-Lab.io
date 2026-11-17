"use client";

import { useId } from "react";
import { briefHash } from "@/lib/paper-digest.mjs";
import { PaperActions } from "./paper-actions";
import { NameList, PaperTitle, byline, etAl, topicNames } from "./paper-row";
import { usePaperDigest } from "./paper-digest-views";
import { useSavedPapers } from "./saved-papers-store";

// The week's Highlights, between the hero and the list: up to three
// AI-selected papers, each with why it matters. `highlights` is localized and
// holds only picks with Why It Matters in both languages (localizeDigest), as
// { id, whyItMatters }; each paper itself comes from the list's papers. No
// picks, no section.
export function PaperDigestHighlights({ highlights }) {
  const { papers, lang, copy, save, share, revisit } = usePaperDigest();
  const { ids } = useSavedPapers();
  const picks = (highlights?.papers ?? []).flatMap((pick) => {
    const paper = papers.find((item) => item.id === pick.id);
    return paper ? [{ paper, why: pick.whyItMatters }] : [];
  });
  if (!picks.length) return null;

  return (
    <section className="content-section pd-section pd-highlights" id="highlights" aria-labelledby="pd-highlights-title">
      <div className="pd-head">
        <h2 id="pd-highlights-title">{copy.highlights.title}</h2>
        <p>{copy.highlights.note}</p>
      </div>
      <ul className="pd-highlight-list">
        {picks.map(({ paper, why }) => (
          <HighlightCard
            key={paper.id}
            paper={paper}
            why={why}
            lang={lang}
            copy={copy}
            saved={ids.has(paper.id)}
            onToggleSave={save}
            onShare={share}
            onRevisit={revisit}
          />
        ))}
      </ul>
    </section>
  );
}

// One pick: type and Domains; the title (opens the paper); why it matters,
// run on from its label; the source; then View AI summary (the paper in the
// list, its reading open), Save and Copy link. Only the title, the link and
// the buttons act: the card itself is not a control.
function HighlightCard({ paper, why, lang, copy, saved, onToggleSave, onShare, onRevisit }) {
  const titleId = useId();
  const domains = topicNames(paper, copy.taxonomy, ["domains"]);
  // Journal · first author (et al. when there are more) · date; what is
  // missing is left out. Neither the name nor the date splits across lines.
  const source = byline(
    paper.venue,
    paper.authors[0] && <span className="pd-nowrap">{paper.authors[0] + etAl(paper, copy, 1)}</span>,
    paper.date
  );
  const hash = briefHash(paper.id);

  return (
    <li>
      <article className="pd-highlight" aria-labelledby={titleId}>
        <p className="pd-highlight-meta">
          <span className={`pd-badge is-${paper.type}`}>{copy.badges[paper.type]}</span>
          {domains.length ? (
            <span>
              <NameList names={domains} />
            </span>
          ) : null}
        </p>
        <PaperTitle as="h3" id={titleId} paper={paper} lang={lang} copy={copy} />
        <p className="pd-highlight-why">
          <span className="pd-highlight-why-label">{copy.highlights.why}</span>
          {why}
        </p>
        <div className="pd-highlight-foot">
          {source.length ? <p className="pd-highlight-source">{source}</p> : null}
          <div className="pd-highlight-actions">
            {/* Only to a reading there is: a paper with none in this language
                would land on a row with nothing to open. Clicked while the
                address already holds the link, the browser fires no
                hashchange, so the list is asked to go to this paper (revisit,
                with the link: the address may hold it without the page having
                followed it). */}
            {paper.details || paper.limitations ? (
              <a
                className="pd-highlight-view"
                href={hash}
                aria-describedby={titleId}
                onClick={(event) => {
                  if (window.location.hash !== hash) return;
                  event.preventDefault();
                  onRevisit(hash);
                }}
              >
                {copy.highlights.view}
              </a>
            ) : null}
            <PaperActions paper={paper} copy={copy} saved={saved} onToggleSave={onToggleSave} onShare={onShare} describedBy={titleId} />
          </div>
        </div>
      </article>
    </li>
  );
}
