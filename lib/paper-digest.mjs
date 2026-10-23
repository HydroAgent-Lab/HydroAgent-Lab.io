// Paper Digest data: pure functions shared by the build (server) and the
// feed (client). The input is papers.json from HydroAgent-Lab/paper-digest-data
// (schema_version 1, written by the collector's digest/public.py). Nothing
// here formats dates with Intl: the server and the browser must render the
// same text, and their ICU data can differ.

export const SCHEMA_VERSION = 1;
export const LANGS = ["en", "zh"];
export const TYPES = ["published", "preprint"];

const DAY = /^\d{4}-\d{2}-\d{2}$/;
const DATE = /^\d{4}(-\d{2}(-\d{2})?)?$/;
const MONTHS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function safeUrl(value) {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    const ok = (url.protocol === "https:" || url.protocol === "http:") && !url.username && !url.password;
    return ok ? value : null;
  } catch {
    return null;
  }
}

function text(value) {
  const out = {};
  for (const lang of LANGS) {
    const v = value && typeof value[lang] === "string" ? value[lang].trim() : "";
    out[lang] = v || null;
  }
  return out;
}

// Validates and reshapes papers.json. A malformed file throws; a malformed
// paper is dropped and counted, so one bad row never empties the page.
export function normalizePapers(raw) {
  if (!raw || typeof raw !== "object" || raw.schema_version !== SCHEMA_VERSION || !Array.isArray(raw.papers)) {
    throw new Error("Paper Digest: papers.json is missing or has an unsupported schema_version.");
  }
  const seen = new Set();
  const papers = [];
  let dropped = 0;
  for (const p of raw.papers) {
    const valid =
      p &&
      typeof p.id === "string" &&
      p.id &&
      !seen.has(p.id) &&
      typeof p.title === "string" &&
      p.title.trim() &&
      typeof p.included_on === "string" &&
      DAY.test(p.included_on) &&
      TYPES.includes(p.type);
    if (!valid) {
      dropped += 1;
      continue;
    }
    seen.add(p.id);
    const doi = typeof p.doi === "string" && p.doi.trim() ? p.doi.trim() : null;
    const authors = Array.isArray(p.authors) ? p.authors.filter((a) => typeof a === "string" && a.trim()).slice(0, 4) : [];
    papers.push({
      id: p.id,
      title: p.title.trim(),
      type: p.type,
      includedOn: p.included_on,
      date: typeof p.date === "string" && DATE.test(p.date) ? p.date : null,
      authors,
      authorsTotal: Number.isInteger(p.authors_total) && p.authors_total >= authors.length ? p.authors_total : authors.length,
      venue: typeof p.venue === "string" && p.venue.trim() ? p.venue.trim() : null,
      url: safeUrl(p.url) ?? (doi ? `https://doi.org/${doi}` : null),
      summary: text(p.summary),
      details: text(p.details),
      limitations: text(p.limitations)
    });
  }
  papers.sort((a, b) => b.includedOn.localeCompare(a.includedOn) || a.title.localeCompare(b.title));
  return { generatedAt: typeof raw.generated_at === "string" ? raw.generated_at : null, papers, dropped };
}

// Only the page language's text goes to the browser; a missing translation
// stays null and is left out, never replaced by the other language.
export function localizePaper(paper, lang) {
  const { summary, details, limitations, ...rest } = paper;
  return { ...rest, summary: summary[lang], details: details[lang], limitations: limitations[lang] };
}

function parseDay(day) {
  const [y, m, d] = day.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function formatDay(date) {
  return date.toISOString().slice(0, 10);
}

// Monday of the ISO week that contains `day` (YYYY-MM-DD).
export function weekStart(day) {
  const date = parseDay(day);
  date.setUTCDate(date.getUTCDate() - ((date.getUTCDay() + 6) % 7));
  return formatDay(date);
}

export function groupByWeek(papers) {
  const groups = new Map();
  for (const paper of papers) {
    const start = weekStart(paper.includedOn);
    if (!groups.has(start)) {
      const end = parseDay(start);
      end.setUTCDate(end.getUTCDate() + 6);
      groups.set(start, { start, end: formatDay(end), papers: [] });
    }
    groups.get(start).papers.push(paper);
  }
  return [...groups.values()].sort((a, b) => b.start.localeCompare(a.start));
}

// "Sep 14 – 20" / "Aug 31 – Sep 6" and "9月14日 – 20日" / "8月31日 – 9月6日";
// the year is added only when it differs from `currentYear`.
export function weekRange(start, end, lang, currentYear) {
  const [y1, m1, d1] = start.split("-").map(Number);
  const [y2, m2, d2] = end.split("-").map(Number);
  const showYear = y1 !== currentYear || y2 !== currentYear;
  if (lang === "zh") {
    const from = `${showYear ? `${y1}年` : ""}${m1}月${d1}日`;
    const to = `${showYear && y2 !== y1 ? `${y2}年` : ""}${m2 !== m1 || y2 !== y1 ? `${m2}月` : ""}${d2}日`;
    return `${from} – ${to}`;
  }
  const from = `${MONTHS_EN[m1 - 1]} ${d1}`;
  const to = m2 !== m1 || y2 !== y1 ? `${MONTHS_EN[m2 - 1]} ${d2}` : `${d2}`;
  return `${from} – ${to}${showYear ? `, ${y2}` : ""}`;
}

// "Sep 14" / "9月14日" for a single YYYY-MM-DD day.
export function dayLabel(day, lang) {
  const [, m, d] = day.split("-").map(Number);
  return lang === "zh" ? `${m}月${d}日` : `${MONTHS_EN[m - 1]} ${d}`;
}

// Every whitespace-separated term must appear in the title, summary, venue or
// authors. Case-insensitive; Chinese matches as plain substrings.
export function matchesQuery(paper, query) {
  const terms = String(query || "").toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return true;
  const haystack = [paper.title, paper.summary, paper.venue, ...(paper.authors || [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return terms.every((term) => haystack.includes(term));
}

export function filterPapers(papers, { type = "all", query = "" } = {}) {
  return papers.filter((paper) => (type === "all" || paper.type === type) && matchesQuery(paper, query));
}
