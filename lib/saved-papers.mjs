// Saved papers, the pure half (components/saved-papers-store.js is the browser
// half). A saved paper is { id, savedAt, meta? }. `meta` is the bibliographic
// snapshot taken when it was saved (title, type, link, venue, authors, dates),
// so a paper that later leaves the public digest can still be recognised and
// opened. AI text is not kept. Everything read back (localStorage, an
// imported backup) is untrusted and checked again here.
import { DATE, DAY, TYPES, cleanText, safeUrl, validTimestamp } from "./paper-digest.mjs";

export const STORAGE_KEY = "hydroagent.saved.v1";
export const BACKUP_SCHEMA = "hydroagent-saved-papers";
export const BACKUP_VERSION = 1;
// Checked against File.size before an imported file is read.
export const MAX_BACKUP_BYTES = 1024 * 1024;

const MAX_ID = 200;
const object = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
// Cleaned text, or undefined when it is empty or longer than `max`.
const capped = (value, max) => {
  const text = cleanText(value);
  return text && text.length <= max ? text : undefined;
};

// A snapshot read back: only the known fields, each checked; undefined when
// nothing is left.
export function cleanMeta(meta) {
  if (!object(meta)) return undefined;
  const authors = Array.isArray(meta.authors) ? meta.authors.map((name) => capped(name, 200)).filter(Boolean).slice(0, 4) : [];
  const fields = {
    title: capped(meta.title, 500),
    type: TYPES.includes(meta.type) ? meta.type : undefined,
    url: safeUrl(meta.url) ?? undefined,
    venue: capped(meta.venue, 300),
    authors: authors.length ? authors : undefined,
    authorsTotal:
      Number.isInteger(meta.authorsTotal) && meta.authorsTotal >= authors.length && meta.authorsTotal <= 10000 ? meta.authorsTotal : undefined,
    date: typeof meta.date === "string" && DATE.test(meta.date) ? meta.date : undefined,
    includedOn: typeof meta.includedOn === "string" && DAY.test(meta.includedOn) ? meta.includedOn : undefined
  };
  const kept = Object.entries(fields).filter(([, value]) => value !== undefined);
  return kept.length ? Object.fromEntries(kept) : undefined;
}

// The snapshot kept with a newly saved paper.
export function snapshot(paper) {
  const { title, type, url, venue, authors, authorsTotal, date, includedOn } = paper;
  return cleanMeta({ title, type, url, venue, authors, authorsTotal, date, includedOn });
}

// Saved entries read back. Invalid ones are dropped and counted; an ID that
// has changed moves to its current ID (`resolve`); the first entry for an ID
// wins.
export function cleanSaved(items, resolve = (id) => id) {
  const seen = new Set();
  const result = [];
  let invalid = 0;
  for (const item of Array.isArray(items) ? items : []) {
    if (!object(item) || typeof item.id !== "string" || !item.id || item.id.length > MAX_ID || !validTimestamp(item.savedAt)) {
      invalid += 1;
      continue;
    }
    const id = resolve(item.id);
    if (seen.has(id)) continue;
    seen.add(id);
    const meta = cleanMeta(item.meta);
    result.push(meta ? { id, savedAt: item.savedAt, meta } : { id, savedAt: item.savedAt });
  }
  return { items: result, invalid };
}

// localStorage text to saved entries; anything unreadable is an empty list.
export function readStored(raw) {
  try {
    const data = JSON.parse(raw);
    return object(data) && data.v === 1 && Array.isArray(data.items) ? cleanSaved(data.items).items : [];
  } catch {
    return [];
  }
}

export const serializeStored = (items) => JSON.stringify({ v: 1, items });

// Saved: removed. Not saved: added first, with its snapshot.
export function toggleSaved(items, paper, now = new Date()) {
  if (items.some((item) => item.id === paper.id)) return items.filter((item) => item.id !== paper.id);
  const savedAt = now.toISOString();
  const meta = snapshot(paper);
  return [meta ? { id: paper.id, savedAt, meta } : { id: paper.id, savedAt }, ...items];
}

// Newest save first; the list itself is not changed.
export const sortBySaved = (items) => [...items].sort((a, b) => Date.parse(b.savedAt) - Date.parse(a.savedAt));

export const buildBackup = (items, now = new Date()) =>
  JSON.stringify({ schema: BACKUP_SCHEMA, version: BACKUP_VERSION, exportedAt: now.toISOString(), items }, null, 2);

export const backupFileName = (now = new Date()) => `hydroagent-saved-papers-${now.toISOString().slice(0, 10)}.json`;

// Adds a backup's papers after the local ones. A paper already saved here
// keeps its local entry. The schema and version are checked before the items.
export function mergeBackup(items, text, resolve = (id) => id) {
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    return { error: "json" };
  }
  if (!object(data) || data.schema !== BACKUP_SCHEMA) return { error: "schema" };
  if (data.version !== BACKUP_VERSION) return { error: "version" };
  if (!Array.isArray(data.items)) return { error: "schema" };
  const incoming = cleanSaved(data.items, resolve);
  const have = new Set(items.map((item) => item.id));
  const added = incoming.items.filter((item) => !have.has(item.id));
  return { items: [...items, ...added], added: added.length, duplicates: incoming.items.length - added.length, invalid: incoming.invalid };
}
