"use client";

import { useEffect, useId, useRef, useState } from "react";
import { GRANULARITIES, TYPES, groupLabel, plural } from "@/lib/paper-digest.mjs";
import { CalendarIcon, ChevronIcon } from "./icons";

const TYPE_OPTIONS = ["all", ...TYPES];
// At 560px and below (the site's phone breakpoint) the panel is a bottom
// sheet: a modal dialog over a backdrop. Wider, it drops below its button and
// is not modal.
const SHEET = "(max-width: 560px)";

// Search, and the Time and edition button. The button's summary names every
// setting in force, so nothing the panel holds is out of sight. Every change
// in the panel applies at once.
export function PaperDigestToolbar({ copy, lang, currentYear, filters, editions, count, onChange }) {
  const panelId = useId();
  const titleId = useId();
  const buttonRef = useRef(null);
  const panelRef = useRef(null);
  const [open, setOpen] = useState(false);

  const summary = [
    copy.granularities[filters.granularity],
    filters.edition ? groupLabel(filters.edition, filters.granularity, lang, currentYear) : copy.allEditions,
    filters.type !== "all" ? copy.filters[filters.type] : "",
    filters.savedOnly ? copy.savedOnlyShort : ""
  ]
    .filter(Boolean)
    .join(" · ");

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
    <div className="pd-toolbar">
      <div className="pd-search">
        <input
          name="q"
          type="search"
          value={filters.query}
          onChange={(event) => onChange({ query: event.target.value })}
          placeholder={copy.searchPlaceholder}
          aria-label={copy.searchLabel}
          autoComplete="off"
          spellCheck={false}
        />
      </div>
      <div className="pd-time">
        <button
          ref={buttonRef}
          type="button"
          className="pd-time-button"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`${copy.timeLabel}: ${summary}`}
          onClick={toggle}
        >
          <CalendarIcon className="pd-time-icon" />
          <span className="pd-time-summary">{summary}</span>
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
              {copy.timeLabel}
            </h2>
            <div className="pd-filter" role="group" aria-label={copy.granularityLabel}>
              {GRANULARITIES.map((value) => (
                <button
                  key={value}
                  type="button"
                  className="pd-filter-option"
                  aria-pressed={filters.granularity === value}
                  onClick={() => onChange({ granularity: value, edition: "" })}
                >
                  {copy.granularities[value]}
                </button>
              ))}
            </div>
            <label className="pd-field">
              <span>{copy.editionLabel}</span>
              <select value={filters.edition} onChange={(event) => onChange({ edition: event.target.value })}>
                <option value="">{copy.allEditions}</option>
                {editions.map((key) => (
                  <option key={key} value={key}>
                    {groupLabel(key, filters.granularity, lang, currentYear)}
                  </option>
                ))}
              </select>
            </label>
            <label className="pd-field">
              <span>{copy.filterLabel}</span>
              <select value={filters.type} onChange={(event) => onChange({ type: event.target.value })}>
                {TYPE_OPTIONS.map((value) => (
                  <option key={value} value={value}>
                    {copy.filters[value]}
                  </option>
                ))}
              </select>
            </label>
            <label className="pd-check">
              <input type="checkbox" checked={filters.savedOnly} onChange={(event) => onChange({ savedOnly: event.target.checked })} />
              {copy.savedOnly}
            </label>
            <p className="pd-panel-count">{plural(copy.count, count)}</p>
            <div className="pd-panel-foot">
              <button type="button" className="secondary-action pd-button pd-panel-done" onClick={() => close(true)}>
                {copy.done}
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}
