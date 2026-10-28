"use client";

import { useEffect, useState } from "react";

// Brevo's confirmation link sends readers back here with ?subscribed=1.
// window.location rather than useSearchParams: the latter needs a Suspense
// boundary in a static export. The parameter is removed so a reload or a
// shared link does not repeat the message. The live region stays in the
// tree (an inserted one can go unannounced) and takes no space when empty.
export function SubscribedNotice({ text }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("subscribed") !== "1") return;
    setShow(true);
    params.delete("subscribed");
    const query = params.toString();
    window.history.replaceState(null, "", window.location.pathname + (query ? `?${query}` : "") + window.location.hash);
  }, []);

  return (
    <p className="pd-notice" role="status">
      {show ? text : ""}
    </p>
  );
}
