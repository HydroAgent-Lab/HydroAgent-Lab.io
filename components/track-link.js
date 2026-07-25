"use client";

import Link from "next/link";

/**
 * A next/link that reports a GA4 event on click.
 *
 * Exists so pages can stay Server Components: only this leaf needs the client
 * boundary, not the section that renders it.
 *
 * gtag is loaded with strategy="afterInteractive" (app/layout.js), so it may not
 * exist yet on a very fast click. The guard makes that a silently dropped event
 * rather than a thrown error — navigation must never depend on analytics.
 */
export function TrackLink({ event = "cta_click", params, children, onClick, ...props }) {
  function handleClick(e) {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", event, params);
    }
    if (onClick) onClick(e);
  }

  return (
    <Link {...props} onClick={handleClick}>
      {children}
    </Link>
  );
}
