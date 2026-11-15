"use client";

import { useMemo, useSyncExternalStore } from "react";
import { STORAGE_KEY, cleanSaved, readStored, serializeStored, toggleSaved } from "@/lib/saved-papers.mjs";

// The only place that touches localStorage. Every reader shares one cached
// list, parsed again only when the stored text changes, so the hook returns
// the same array until something is saved. The static HTML knows nothing of
// a reader's saved papers: the server snapshot is a constant, and `ready`
// turns true once the browser's list takes its place after hydration.
const SERVER_ITEMS = Object.freeze([]);
const listeners = new Set();
let cache = { raw: undefined, items: [] };

function readRaw() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null; // storage turned off: an empty list
  }
}

function getSnapshot() {
  const raw = readRaw();
  if (raw !== cache.raw) cache = { raw, items: readStored(raw) };
  return cache.items;
}

const getServerSnapshot = () => SERVER_ITEMS;

function emit() {
  for (const listener of listeners) listener();
}

// Another tab saved or cleared (key null: the whole storage was cleared).
function onStorage(event) {
  if (event.key === STORAGE_KEY || event.key === null) emit();
}

function subscribe(listener) {
  listeners.add(listener);
  if (listeners.size === 1) window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    if (!listeners.size) window.removeEventListener("storage", onStorage);
  };
}

// False when the browser refuses (storage full or turned off); then nothing
// changes, so a bookmark falls back to how it was.
function write(items) {
  try {
    window.localStorage.setItem(STORAGE_KEY, serializeStored(items));
  } catch {
    return false;
  }
  emit();
  return true;
}

// Module-level, so every reader gets the same functions on every render.
const toggle = (paper) => write(toggleSaved(getSnapshot(), paper));

// Moves entries saved under an ID that has since changed to the current ID,
// and writes only when that changed something.
function normalize(resolve) {
  const current = getSnapshot();
  const next = cleanSaved(current, resolve).items;
  if (serializeStored(next) !== serializeStored(current)) write(next);
}

export function useSavedPapers() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = items !== SERVER_ITEMS;
  const ids = useMemo(() => new Set(items.map((item) => item.id)), [items]);
  return { ready, items, ids, toggle, replace: write, normalize };
}
