"use client";

import { useEffect, useState } from "react";
import { BookmarkIcon, CheckIcon, LinkIcon } from "./icons";

// Save and Copy link for one paper: on each list row, in Saved papers and on
// a Highlights card. `describedBy` is the id of the paper's title, so each
// button is read with the paper it acts on.
// - onToggleSave(paper): the page's Save.
// - onShare(id): resolves to whether the link was copied; left out, there is
//   no Copy link (a paper no longer in the digest has no link to share).
// A copied link shows a check and says so for 2.5 s; copying again starts the
// 2.5 s over.
export function PaperActions({ paper, copy, saved, onToggleSave, onShare, describedBy }) {
  const [copied, setCopied] = useState(0);
  useEffect(() => {
    if (!copied) return undefined;
    const timer = window.setTimeout(() => setCopied(0), 2500);
    return () => window.clearTimeout(timer);
  }, [copied]);
  const copyLink = async () => {
    if (await onShare(paper.id)) setCopied((n) => n + 1);
  };

  return (
    <div className="pd-paper-actions">
      <button type="button" className="pd-icon-button pd-save" aria-pressed={saved} aria-describedby={describedBy} title={copy.save} onClick={() => onToggleSave(paper)}>
        <BookmarkIcon />
        <span className="pd-sr">{copy.save}</span>
      </button>
      {onShare ? (
        <button
          type="button"
          className="pd-icon-button pd-copy"
          data-copied={copied ? "" : undefined}
          aria-describedby={describedBy}
          title={copied ? copy.copied : copy.share}
          onClick={copyLink}
        >
          {copied ? <CheckIcon /> : <LinkIcon />}
          <span className="pd-sr">{copied ? copy.copied : copy.share}</span>
        </button>
      ) : null}
    </div>
  );
}
