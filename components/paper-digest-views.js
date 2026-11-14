"use client";

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { digestPageUrl, resolvePaperId } from "@/lib/paper-digest.mjs";
import { useSavedPapers } from "./saved-papers-store";

const PaperDigestContext = createContext(null);

// The papers, the list's copy, the location hash, and Save and Copy link.
export const usePaperDigest = () => useContext(PaperDigestContext);

// The Clipboard API first; where it is missing or refused, the older copy
// command on a hidden text field. Focus goes back to where it was.
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // fall through to the copy command
  }
  const active = document.activeElement;
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.opacity = "0";
  document.body.append(field);
  field.select();
  field.setSelectionRange(0, text.length);
  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }
  field.remove();
  active?.focus?.({ preventScroll: true });
  return copied;
}

// The page's <main>. It is rendered here rather than wrapped, so the page's
// sections stay its direct children (main.main-content > .content-section).
// #saved shows Saved papers and hides the home sections, which stay mounted:
// the list keeps its filters, search and open readings. The papers arrive
// here once and reach the list through context.
export function PaperDigestViews({ papers, aliases, lang, mainLang, copy, savedCopy, currentYear, children }) {
  const { toggle, normalize } = useSavedPapers();
  const [hash, setHash] = useState("");
  const [toast, setToast] = useState("");
  const toastTimer = useRef(0);
  const viewRef = useRef("home");
  const homeScroll = useRef(null);
  const view = hash === "#saved" ? "saved" : "home";

  const resolve = useCallback((id) => resolvePaperId(id, papers, aliases) ?? id, [papers, aliases]);

  // Papers saved under an ID that has since changed move to the new one.
  useEffect(() => {
    normalize(resolve);
  }, [normalize, resolve]);

  // The page's one hash listener: the view and the list both follow `hash`,
  // so a shared link opened from Saved papers lands on a visible paper.
  useEffect(() => {
    const update = (event) => {
      const next = window.location.hash;
      const nextView = next === "#saved" ? "saved" : "home";
      // Where the reader was, to bring them back (not after a direct visit).
      if (event && nextView === "saved" && viewRef.current === "home") homeScroll.current = window.scrollY;
      viewRef.current = nextView;
      setHash(next);
    };
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  // Saved papers opens at the top. Back on the home view, a shared paper's
  // link is placed by the list; otherwise the reader returns to where they
  // were or, after a direct visit to #saved, to the section the link names.
  // It runs when the view changes and reads the hash as it is then.
  useLayoutEffect(() => {
    if (view === "saved") {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    const top = homeScroll.current;
    homeScroll.current = null;
    if (hash.startsWith("#brief-")) return;
    if (top !== null) window.scrollTo({ top, behavior: "instant" });
    else if (hash.length > 1) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [view]);

  // Success shows for 3 s, a failure for 6 s; a new message replaces the old.
  const notify = useCallback((text, failure = false) => {
    window.clearTimeout(toastTimer.current);
    setToast(text);
    toastTimer.current = window.setTimeout(() => setToast(""), failure ? 6000 : 3000);
  }, []);
  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  // A save that works says nothing; one the browser refuses says so, and the
  // bookmark stays as it was.
  const save = useCallback(
    (paper) => {
      if (!toggle(paper)) notify(savedCopy.toast.saveFailed, true);
    },
    [toggle, notify, savedCopy]
  );

  // Copies the paper's link on this page, in this language. If the browser
  // will not copy, the link goes into the address bar (no hashchange, so the
  // page does not move).
  const share = useCallback(
    async (id) => {
      const fragment = `#brief-${encodeURIComponent(id)}`;
      if (await copyText(digestPageUrl(lang) + fragment)) {
        notify(savedCopy.toast.copied);
      } else {
        window.history.replaceState(window.history.state, "", fragment);
        notify(savedCopy.toast.copyFailed, true);
      }
    },
    [lang, notify, savedCopy]
  );

  const value = useMemo(
    () => ({ papers, aliases, lang, copy, currentYear, hash, save, share }),
    [papers, aliases, lang, copy, currentYear, hash, save, share]
  );

  return (
    <PaperDigestContext value={value}>
      <main className="main-content paper-digest-page" lang={mainLang} data-view={view}>
        {children}
        {/* Always in the page, so what appears in it is announced; a div, so
            while empty it takes no space (a p brings its own margins). */}
        <div className="pd-toast" role="status">
          {toast}
        </div>
      </main>
    </PaperDigestContext>
  );
}
