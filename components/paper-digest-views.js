"use client";

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { briefHash, digestPageUrl, isBriefHash, resolvePaperId } from "@/lib/paper-digest.mjs";
import { SavedPapersView } from "./saved-papers-view";
import { useSavedPapers } from "./saved-papers-store";

const PaperDigestContext = createContext(null);

// The papers, the list's copy, a shared paper's link, and Save and Copy link.
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
    // the command threw: not copied
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
export function PaperDigestViews({ papers, aliases, lang, copy, savedCopy, currentYear, children }) {
  const { toggle, normalize } = useSavedPapers();
  const [hash, setHash] = useState("");
  const [toast, setToast] = useState("");
  const toastTimer = useRef(0);
  const viewRef = useRef("home");
  const homeScroll = useRef(null);
  const homeFocus = useRef(null);
  const view = hash === "#saved" ? "saved" : "home";

  const resolve = useCallback((id) => resolvePaperId(id, papers, aliases) ?? id, [papers, aliases]);

  // Papers saved under an ID that has since changed move to the new one.
  useEffect(() => {
    normalize(resolve);
  }, [normalize, resolve]);

  // The page's hash listener (the header's Saved papers link keeps its own,
  // for aria-current): the view and the list both follow it, so a shared link
  // opened from Saved papers lands on a visible paper.
  useEffect(() => {
    const update = (event) => {
      const next = window.location.hash;
      const nextView = next === "#saved" ? "saved" : "home";
      // Where the reader was and what had the focus (usually the header's
      // Saved papers link), to bring them back; not after a direct visit.
      if (event && nextView === "saved" && viewRef.current === "home") {
        homeScroll.current = window.scrollY;
        homeFocus.current = document.activeElement;
      }
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
  // Leaving Saved papers removes whatever had the focus there, so the focus
  // goes back to what had it before (keyboard users keep their place). It
  // runs when the view changes and reads the hash as it is then.
  useLayoutEffect(() => {
    if (view === "saved") {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    const top = homeScroll.current;
    const focus = homeFocus.current;
    homeScroll.current = null;
    homeFocus.current = null;
    if (isBriefHash(hash)) return;
    if (top !== null) {
      window.scrollTo({ top, behavior: "instant" });
      // On the browser's Back, the browser then restores its own record of
      // the place, a few px off; set it once more in the next frame, before
      // anything is painted.
      window.requestAnimationFrame(() => {
        if (Math.abs(window.scrollY - top) >= 1) window.scrollTo({ top, behavior: "instant" });
      });
    } else if (hash.length > 1) document.getElementById(hash.slice(1))?.scrollIntoView();
    if (focus?.isConnected && focus !== document.body && document.activeElement === document.body) focus.focus({ preventScroll: true });
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
      const fragment = briefHash(id);
      if (await copyText(digestPageUrl(lang) + fragment)) {
        notify(savedCopy.toast.copied);
      } else {
        window.history.replaceState(window.history.state, "", fragment);
        notify(savedCopy.toast.copyFailed, true);
      }
    },
    [lang, notify, savedCopy]
  );

  // Only a shared paper's link matters to the list. Other hash changes
  // (#saved, #latest, #subscribe) leave the context as it was, so the list
  // and its rows do not re-render for them.
  const linkHash = isBriefHash(hash) ? hash : "";
  const value = useMemo(
    () => ({ papers, aliases, lang, copy, currentYear, linkHash, save, share }),
    [papers, aliases, lang, copy, currentYear, linkHash, save, share]
  );

  return (
    <PaperDigestContext value={value}>
      {/* The shell sets no lang and <html> is always "en", so /zh marks its
          copy here. */}
      <main className="main-content paper-digest-page" lang={lang === "zh" ? "zh-CN" : undefined} data-view={view}>
        {children}
        {view === "saved" ? (
          <SavedPapersView papers={papers} resolve={resolve} lang={lang} copy={copy} savedCopy={savedCopy} save={save} share={share} notify={notify} />
        ) : null}
        {/* Always in the page, so what appears in it is announced; a div, so
            while empty it takes no space (a p brings its own margins). */}
        <div className="pd-toast" role="status">
          {toast}
        </div>
      </main>
    </PaperDigestContext>
  );
}
