import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  dayLabel,
  filterPapers,
  groupByWeek,
  localizePaper,
  matchesQuery,
  normalizePapers,
  safeUrl,
  weekRange,
  weekStart
} from "./paper-digest.mjs";

const paper = (id, includedOn, extra = {}) => ({
  id,
  title: `Paper ${id}`,
  type: "published",
  included_on: includedOn,
  date: null,
  authors: [],
  authors_total: 0,
  venue: null,
  url: `https://example.org/${id}`,
  doi: null,
  summary: { en: `Summary ${id}`, zh: null },
  details: { en: null, zh: null },
  limitations: { en: null, zh: null },
  ...extra
});
const doc = (papers) => ({ schema_version: 1, generated_at: "2026-10-23T06:30:00+00:00", count: papers.length, papers });

test("a malformed file throws, a malformed paper is dropped", () => {
  assert.throws(() => normalizePapers({ schema_version: 2, papers: [] }));
  assert.throws(() => normalizePapers(null));
  const { papers, dropped } = normalizePapers(
    doc([
      paper("A", "2026-09-19"),
      paper("A", "2026-09-18"),
      paper("B", "19 Sep"),
      paper("C", "2026-09-17", { type: "dataset" }),
      paper("D", "2026-09-16", { title: " " })
    ])
  );
  assert.deepEqual(papers.map((p) => p.id), ["A"]);
  assert.equal(dropped, 4);
});

test("only http(s) links survive; a DOI is the fallback", () => {
  assert.equal(safeUrl("javascript:alert(1)"), null);
  assert.equal(safeUrl("https://user:pw@example.org"), null);
  assert.equal(safeUrl("http://example.org/a"), "http://example.org/a");
  const [p] = normalizePapers(doc([paper("A", "2026-09-19", { url: "javascript:alert(1)", doi: "10.1/x" })])).papers;
  assert.equal(p.url, "https://doi.org/10.1/x");
});

test("newest first, then by title; localized text has no fallback", () => {
  const { papers } = normalizePapers(doc([paper("B", "2026-09-01"), paper("A", "2026-09-19"), paper("C", "2026-09-19")]));
  assert.deepEqual(papers.map((p) => p.id), ["A", "C", "B"]);
  const zh = localizePaper(papers[0], "zh");
  assert.equal(zh.summary, null);
  assert.equal(localizePaper(papers[0], "en").summary, "Summary A");
  assert.equal("details" in zh && zh.details, null);
});

test("weeks start on Monday", () => {
  assert.equal(weekStart("2026-09-14"), "2026-09-14"); // Monday
  assert.equal(weekStart("2026-09-20"), "2026-09-14"); // Sunday
  assert.equal(weekStart("2026-09-21"), "2026-09-21");
  assert.equal(weekStart("2026-01-01"), "2025-12-29");
  const { papers } = normalizePapers(doc([paper("A", "2026-09-20"), paper("B", "2026-09-14"), paper("C", "2026-09-21")]));
  const weeks = groupByWeek(papers);
  assert.deepEqual(weeks.map((w) => [w.start, w.end, w.papers.length]), [["2026-09-21", "2026-09-27", 1], ["2026-09-14", "2026-09-20", 2]]);
});

test("week labels in both languages", () => {
  assert.equal(weekRange("2026-09-14", "2026-09-20", "en", 2026), "Sep 14 – 20");
  assert.equal(weekRange("2026-08-31", "2026-09-06", "en", 2026), "Aug 31 – Sep 6");
  assert.equal(weekRange("2026-09-14", "2026-09-20", "zh", 2026), "9月14日 – 20日");
  assert.equal(weekRange("2026-08-31", "2026-09-06", "zh", 2026), "8月31日 – 9月6日");
  assert.equal(weekRange("2025-12-29", "2026-01-04", "zh", 2026), "2025年12月29日 – 2026年1月4日");
  assert.equal(weekRange("2025-12-29", "2026-01-04", "en", 2026), "Dec 29 – Jan 4, 2026");
  assert.equal(dayLabel("2026-09-07", "zh"), "9月7日");
  assert.equal(dayLabel("2026-09-07", "en"), "Sep 7");
});

test("search matches every term across title, summary, venue and authors", () => {
  const p = { title: "LLM agents for Flood forecasting", summary: "洪水预报智能体", venue: "Water Research", authors: ["Ada Lovelace"], type: "preprint" };
  assert.ok(matchesQuery(p, "flood LLM"));
  assert.ok(matchesQuery(p, "  洪水 "));
  assert.ok(matchesQuery(p, "lovelace water"));
  assert.ok(!matchesQuery(p, "flood drought"));
  assert.ok(matchesQuery(p, ""));
  assert.deepEqual(filterPapers([p], { type: "published" }), []);
  assert.deepEqual(filterPapers([p], { type: "preprint", query: "flood" }), [p]);
});

test("the committed sample is valid", () => {
  const sample = JSON.parse(readFileSync(new URL("../content/data/paper-digest.sample.json", import.meta.url), "utf8"));
  const { papers, dropped } = normalizePapers(sample);
  assert.equal(dropped, 0);
  assert.equal(papers.length, sample.count);
});
