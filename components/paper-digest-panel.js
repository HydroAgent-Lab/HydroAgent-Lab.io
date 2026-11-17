"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronIcon } from "./icons";

// At 560px and below (the site's phone breakpoint) a panel is a bottom sheet:
// a modal dialog over a backdrop. Wider, it drops below its button and is not
// modal.
const SHEET = "(max-width: 560px)";

// A toolbar button and the panel it opens (Time and edition; Filters). The
// button shows `summary`, what the panel has in force, and is named
// "label: summary" (just "label" when the two are the same). `badge`, when
// given, is a small count beside the summary (how many filters are on); the
// name already says which, so it is not read out. Every change in the panel
// applies at once; Done, shown in the sheet only, closes it.
export function ToolbarPanel({ className, label, summary, badge, icon, doneLabel, children }) {
  const panelId = useId();
  const titleId = useId();
  const buttonRef = useRef(null);
  const panelRef = useRef(null);
  const [open, setOpen] = useState(false);

  // Focus goes back to the button, unless the reader has put it somewhere
  // else (a click outside the panel).
  const close = (returnFocus) => {
    panelRef.current?.close();
    if (returnFocus) buttonRef.current?.focus();
  };

  const toggle = () => {
    const panel = panelRef.current;
    if (panel.open) {
      close(true);
      return;
    }
    if (window.matchMedia(SHEET).matches) panel.showModal();
    else panel.show();
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const sheet = window.matchMedia(SHEET);
    // A click outside closes the panel below the button; the sheet has its
    // own backdrop for that.
    const onPointerDown = (event) => {
      if (panel.matches(":modal") || panel.contains(event.target) || buttonRef.current?.contains(event.target)) return;
      close(false);
    };
    // Crossing 560px (turning a phone, resizing a window) closes either form.
    const onBreakpoint = () => close(panel.contains(document.activeElement));
    document.addEventListener("pointerdown", onPointerDown);
    sheet.addEventListener("change", onBreakpoint);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      sheet.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  return (
    <div className={className}>
      <button
        ref={buttonRef}
        type="button"
        className="pd-time-button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={summary === label ? label : `${label}: ${summary}`}
        onClick={toggle}
      >
        {icon}
        <span className="pd-time-summary">{summary}</span>
        {badge ? (
          <span className="pd-time-badge" aria-hidden="true">
            {badge}
          </span>
        ) : null}
        <ChevronIcon className="pd-time-chevron" />
      </button>
      <dialog
        ref={panelRef}
        id={panelId}
        className="pd-panel"
        aria-labelledby={titleId}
        onClose={() => setOpen(false)}
        onKeyDown={(event) => {
          // The sheet (modal) closes on Esc by itself; the panel below the button does not.
          if (event.key === "Escape" && !event.currentTarget.matches(":modal")) {
            event.preventDefault();
            close(true);
          }
        }}
        onClick={(event) => {
          // Only the backdrop is the dialog itself: its body fills the rest.
          if (event.target === event.currentTarget) close(true);
        }}
      >
        <div className="pd-panel-body">
          <h2 className="pd-panel-title" id={titleId}>
            {label}
          </h2>
          {children}
          <div className="pd-panel-foot">
            <button type="button" className="secondary-action pd-button pd-panel-done" onClick={() => close(true)}>
              {doneLabel}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
