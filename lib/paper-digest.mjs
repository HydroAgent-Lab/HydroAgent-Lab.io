// Paper Digest data: pure functions shared by the build (server) and the
// feed (client). The input is papers.json from HydroAgent-Lab/paper-digest-data
// (schema_version 1, written by the collector's digest/public.py). Nothing
// here formats dates with Intl: the server and the browser must render the
// same text, and their ICU data can differ.

export const SCHEMA_VERSION = 1;
export const LANGS = ["en", "zh"];
export const TYPES = ["published", "preprint"];
export const DOMAINS = ["catchment_hydrology", "floods", "water_resources_reservoirs", "urban_water", "water_quality_ecology", "groundwater"];
export const METHODS = ["prompting", "rag_knowledge_graphs", "fine_tuning_domain_models", "agents_tool_use", "multi_agent", "multimodal", "benchmarks"];

// A plain object: not null, not an array. Shared with lib/saved-papers.mjs.
export const object = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const validDay = (value) => typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
export const validTimestamp = (value) => typeof value === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(value) && validDay(value.slice(0, 10)) && Number.isFinite(Date.parse(value));

// Public IDs take precedence. Invalid, cyclic and dangling aliases never redirect.
export function resolvePaperId(id, papers, aliases = {}) {
  const ids = new Set(papers.map((paper) => paper.id));
  const visited = new Set();
  while (typeof id === "string" && id && !visited.has(id)) {
    if (ids.has(id)) return id;
    visited.add(id);
    id = object(aliases) && Object.hasOwn(aliases, id) ? aliases[id] : null;
  }
  return null;
}

function optionalPaperFields(paper) {
  const result = {};
  for (const [key, values] of [["domains", DOMAINS], ["methods", METHODS]]) {
    if (Array.isArray(paper[key])) result[key] = [...new Set(paper[key].filter((value) => values.includes(value)))].slice(0, 2);
  }
  if (validTimestamp(paper.updated_at)) result.updatedAt = paper.updated_at;
  return result;
}

// Shared with lib/saved-papers.mjs, which checks saved snapshots the same way.
export const DAY = /^\d{4}-\d{2}-\d{2}$/;
export const DATE = /^\d{4}(-\d{2}(-\d{2})?)?$/;
// Authors kept per paper; the rest are counted in authorsTotal.
export const MAX_AUTHORS = 4;
const MONTHS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTH_NAMES_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const GRANULARITIES = ["day", "week", "month"];
// Papers shown before "Show earlier papers", and how many each click adds.
// Groups are never split, so a page can run past it.
export const PAGE_SIZE = 30;

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

const SITE_URL = "https://hydroagentlab.com";

// The digest page's path in a language (the page's metadata), and its full
// address (Copy link and the RSS channel point here).
export const digestPagePath = (lang) => `${lang === "zh" ? "/zh" : ""}/paper-digest/`;
export const digestPageUrl = (lang) => `${SITE_URL}${digestPagePath(lang)}`;

// The collector leaves HTML entities and stray whitespace in bibliographic
// fields ("Environmental Science &amp;\nTechnology"). They are decoded once
// ("&amp;lt;" becomes "&lt;", not "<"; &nbsp; becomes a plain space, which the
// next step would make of it anyway), then each run of whitespace becomes one
// space. A numeric reference outside Unicode, to a surrogate or to U+0000
// stays as written. AI text is not passed through here: it is shown as made.
const NAMED_ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
const ENTITY = /&(?:#(\d+)|#[xX]([0-9a-fA-F]+)|(amp|lt|gt|quot|apos|nbsp));/g;

export function cleanText(value) {
  if (typeof value !== "string") return "";
  return value
    .replace(ENTITY, (match, decimal, hex, name) => {
      if (name) return NAMED_ENTITIES[name];
      const code = decimal ? Number(decimal) : parseInt(hex, 16);
      return code > 0 && code <= 0x10ffff && (code < 0xd800 || code > 0xdfff) ? String.fromCodePoint(code) : match;
    })
    .replace(/\s+/g, " ")
    .trim();
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
    const title = cleanText(p?.title);
    const valid =
      p &&
      typeof p.id === "string" &&
      p.id &&
      !seen.has(p.id) &&
      title &&
      typeof p.included_on === "string" &&
      DAY.test(p.included_on) &&
      TYPES.includes(p.type);
    if (!valid) {
      dropped += 1;
      continue;
    }
    seen.add(p.id);
    const doi = typeof p.doi === "string" && p.doi.trim() ? p.doi.trim() : null;
    const authors = Array.isArray(p.authors) ? p.authors.map(cleanText).filter(Boolean).slice(0, MAX_AUTHORS) : [];
    papers.push({
      id: p.id,
      title,
      type: p.type,
      includedOn: p.included_on,
      date: typeof p.date === "string" && DATE.test(p.date) ? p.date : null,
      authors,
      authorsTotal: Number.isInteger(p.authors_total) && p.authors_total >= authors.length ? p.authors_total : authors.length,
      venue: cleanText(p.venue) || null,
      url: safeUrl(p.url) ?? (doi ? `https://doi.org/${doi}` : null),
      summary: text(p.summary),
      details: text(p.details),
      limitations: text(p.limitations),
      ...optionalPaperFields(p)
    });
  }
  papers.sort((a, b) => b.includedOn.localeCompare(a.includedOn) || a.title.localeCompare(b.title));
  const result = { generatedAt: typeof raw.generated_at === "string" ? raw.generated_at : null, papers, dropped };
  if (object(raw.aliases)) {
    result.aliases = Object.fromEntries(Object.keys(raw.aliases).flatMap((id) => {
      const target = resolvePaperId(id, papers, raw.aliases);
      return target && target !== id ? [[id, target]] : [];
    }));
  }
  // A pick needs Why It Matters in both languages (the same no-fallback rule
  // as paper readings), so the two pages always show the same picks. One
  // missing a language is skipped before the cap of three counts.
  const h = raw.highlights;
  if (object(h) && validDay(h.week_start) && validTimestamp(h.updated_at) && Array.isArray(h.papers)) {
    const highlighted = new Set();
    const entries = [];
    for (const entry of h.papers) {
      if (!object(entry) || !object(entry.why_it_matters)) continue;
      const id = resolvePaperId(entry.id, papers, result.aliases);
      const why = text(entry.why_it_matters);
      if (!id || highlighted.has(id) || !LANGS.every((lang) => why[lang])) continue;
      highlighted.add(id);
      entries.push({ id, whyItMatters: why });
      if (entries.length === 3) break;
    }
    result.highlights = { weekStart: h.week_start, updatedAt: h.updated_at, papers: entries };
  }
  return result;
}

// Only the page language's text goes to the browser; a missing translation
// stays null and is left out, never replaced by the other language.
// `noReading` marks a paper with no reading in any language: the collector
// found no usable abstract (DESIGN_SUMMARY §2.4). A gap in one language alone
// does not count.
export function localizePaper(paper, lang) {
  const { summary, details, limitations, ...rest } = paper;
  const noReading = [summary, details, limitations].every((field) => LANGS.every((code) => !field[code]));
  return {
    ...rest,
    summary: summary[lang],
    details: details[lang],
    limitations: limitations[lang],
    ...(noReading ? { noReading: true } : {})
  };
}

function parseDay(day) {
  const [y, m, d] = day.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

// A Date's UTC day, YYYY-MM-DD.
export function formatDay(date) {
  return date.toISOString().slice(0, 10);
}

// Monday of the ISO week that contains `day` (YYYY-MM-DD).
export function weekStart(day) {
  const date = parseDay(day);
  date.setUTCDate(date.getUTCDate() - ((date.getUTCDay() + 6) % 7));
  return formatDay(date);
}

// The group a day (YYYY-MM-DD) falls in: the day itself, the Monday of its
// week, or its month (YYYY-MM).
export function groupKey(day, granularity) {
  if (granularity === "day") return day;
  if (granularity === "month") return day.slice(0, 7);
  return weekStart(day);
}

// Papers grouped by when they were added, newest group first. Within a group
// they keep their order (newest first, then by title).
export function groupPapers(papers, granularity) {
  const groups = new Map();
  for (const paper of papers) {
    const key = groupKey(paper.includedOn, granularity);
    if (!groups.has(key)) groups.set(key, { key, papers: [] });
    groups.get(key).papers.push(paper);
  }
  return [...groups.values()].sort((a, b) => b.key.localeCompare(a.key));
}

// Every edition (group) the papers fall into, newest first: the panel's list.
export function editionKeys(papers, granularity) {
  return [...new Set(papers.map((paper) => groupKey(paper.includedOn, granularity)))].sort((a, b) => b.localeCompare(a));
}

// How many groups, newest first, it takes to show at least `count` papers;
// all of them when there are fewer.
export function groupsToShow(groups, count) {
  let total = 0;
  for (let i = 0; i < groups.length; i += 1) {
    total += groups[i].papers.length;
    if (total >= count) return i + 1;
  }
  return groups.length;
}

// The newest day papers were added (YYYY-MM-DD) and how many came in that day:
// the "latest edition". The page shows it instead of generated_at, which
// changes on every export even when no paper does (DESIGN_SUMMARY §5.8).
export function latestEdition(papers) {
  let day = null;
  let count = 0;
  for (const paper of papers) {
    if (day === null || paper.includedOn > day) {
      day = paper.includedOn;
      count = 1;
    } else if (paper.includedOn === day) {
      count += 1;
    }
  }
  return day === null ? null : { day, count };
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

// "1 paper" / "3 papers": `forms` is { one, other }, each with an optional
// {n} for the count. Used by the hero (server) and the feed (client).
export const plural = (forms, n) => (n === 1 ? forms.one : forms.other).replace("{n}", String(n));

// "Sep 14" / "9月14日" for a single YYYY-MM-DD day.
export function dayLabel(day, lang) {
  const [, m, d] = day.split("-").map(Number);
  return lang === "zh" ? `${m}月${d}日` : `${MONTHS_EN[m - 1]} ${d}`;
}

// A group's heading. A day is "Nov 12" / "11月12日", with the year when it is
// not `currentYear`; a week is its weekRange; a month is "November 2026" /
// "2026年11月".
export function groupLabel(key, granularity, lang, currentYear) {
  if (granularity === "month") {
    const [y, m] = key.split("-").map(Number);
    return lang === "zh" ? `${y}年${m}月` : `${MONTH_NAMES_EN[m - 1]} ${y}`;
  }
  if (granularity === "week") {
    const end = parseDay(key);
    end.setUTCDate(end.getUTCDate() + 6);
    return weekRange(key, formatDay(end), lang, currentYear);
  }
  const year = Number(key.slice(0, 4));
  const day = dayLabel(key, lang);
  if (year === currentYear) return day;
  return lang === "zh" ? `${year}年${day}` : `${day}, ${year}`;
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

// The filters a reader can set, each at "no restriction": where the list
// starts, and what "Clear all filters" goes back to. The grouping is not one
// of them; it stays.
export const NO_FILTERS = Object.freeze({ query: "", edition: "", type: "all", savedOnly: false, domain: "", method: "" });
export const DEFAULT_GRANULARITY = "week";

// The six filters, each left out or undefined taken at its default.
const withDefaults = ({
  query = NO_FILTERS.query,
  edition = NO_FILTERS.edition,
  type = NO_FILTERS.type,
  savedOnly = NO_FILTERS.savedOnly,
  domain = NO_FILTERS.domain,
  method = NO_FILTERS.method
} = {}) => ({ query, edition, type, savedOnly, domain, method });

// Whether a paper's Domain or Method list holds a value; a paper with no
// list holds none.
const tagged = (list, value) => (list ?? []).includes(value);

// Whether any filter, or the search, holds the list back.
export function isFiltered(filters) {
  const { query, edition, type, savedOnly, domain, method } = withDefaults(filters);
  return query.trim() !== "" || edition !== "" || type !== "all" || savedOnly || domain !== "" || method !== "";
}

// Every restriction must hold: type, search, edition (a group key at the
// current grouping), Saved only, Domain and Method.
export function filterPapers(papers, { granularity = DEFAULT_GRANULARITY, savedIds = new Set(), ...filters } = {}) {
  const { query, edition, type, savedOnly, domain, method } = withDefaults(filters);
  return papers.filter(
    (paper) =>
      (type === "all" || paper.type === type) &&
      (!edition || groupKey(paper.includedOn, granularity) === edition) &&
      (!savedOnly || savedIds.has(paper.id)) &&
      (!domain || tagged(paper.domains, domain)) &&
      (!method || tagged(paper.methods, method)) &&
      matchesQuery(paper, query)
  );
}

// The Domain and Method values the papers use, in the contract's order: the
// Filters panel's options. Both empty: there is no Filters button.
export function taxonomyOptions(papers) {
  const used = (key, values) => values.filter((value) => papers.some((paper) => tagged(paper[key], value)));
  return { domains: used("domains", DOMAINS), methods: used("methods", METHODS) };
}

// Only the page language's Why It Matters goes to the browser; every pick has
// both (normalizePapers keeps no other). With no picks, there are no highlights.
export function localizeDigest(data, lang) {
  const { highlights, ...rest } = data;
  const result = { ...rest, papers: data.papers.map((paper) => localizePaper(paper, lang)) };
  if (highlights?.papers.length) result.highlights = { ...highlights, papers: highlights.papers.map((pick) => ({ ...pick, whyItMatters: pick.whyItMatters[lang] })) };
  return result;
}

const BRIEF = "#brief-";

// A shared paper's link fragment (Copy link writes it, planBriefLink reads it).
export const briefHash = (id) => `${BRIEF}${encodeURIComponent(id)}`;
export const isBriefHash = (hash) => hash.startsWith(BRIEF);

// A shared link (#brief-<id>). The ID is resolved against every paper before
// the view's restrictions apply; then only the restrictions that would hide
// the paper are cleared (the grouping stays), and paging reaches its group.
export function planBriefLink(hash, papers, aliases, view = {}) {
  const { granularity = DEFAULT_GRANULARITY, savedIds = new Set(), visibleCount = PAGE_SIZE, ...filters } = view;
  const { edition, type, query, savedOnly, domain, method } = withDefaults(filters);
  if (!isBriefHash(hash)) return null;
  let requested;
  try { requested = decodeURIComponent(hash.slice(BRIEF.length)); } catch { return { unavailable: true }; }
  const id = resolvePaperId(requested, papers, aliases);
  if (!id) return { unavailable: true };
  const paper = papers.find((item) => item.id === id);
  const next = {
    edition: !edition || groupKey(paper.includedOn, granularity) === edition ? edition : "",
    type: type === "all" || type === paper.type ? type : "all",
    query: matchesQuery(paper, query) ? query : "",
    savedOnly: savedOnly && savedIds.has(id),
    domain: !domain || tagged(paper.domains, domain) ? domain : "",
    method: !method || tagged(paper.methods, method) ? method : ""
  };
  const groups = groupPapers(filterPapers(papers, { ...next, granularity, savedIds }), granularity);
  const index = groups.findIndex((group) => group.papers.some((item) => item.id === id));
  const needed = groups.slice(0, index + 1).reduce((sum, group) => sum + group.papers.length, 0);
  return { id, ...next, visibleCount: Math.max(visibleCount, needed) };
}
