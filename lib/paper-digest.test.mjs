import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  dayLabel,
  filterPapers,
  groupByWeek,
  latestEdition,
  localizePaper,
  localizeDigest,
  resolvePaperId,
  planBriefLink,
  plural,
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


test("old data keeps its exact normalized shape", () => {
  const data = normalizePapers(doc([paper("A", "2026-09-19")]));
  assert.deepEqual(Object.keys(data), ["generatedAt", "papers", "dropped"]);
  assert.deepEqual(Object.keys(data.papers[0]), ["id", "title", "type", "includedOn", "date", "authors", "authorsTotal", "venue", "url", "summary", "details", "limitations"]);
});

test("optional enums, timestamps and highlights survive localization without fallback", () => {
  const stamp = "2026-11-07T12:00:00+08:00";
  const data = normalizePapers({ ...doc([paper("A", "2026-09-19", {
    domains: ["floods", "groundwater"], methods: ["agents_tool_use"], updated_at: stamp
  })]), aliases: { old: "A" }, highlights: {
    week_start: "2026-11-02", updated_at: stamp,
    papers: [{ id: "old", why_it_matters: { en: "Useful", zh: null } }]
  } });
  const localized = localizeDigest(data, "zh");
  assert.deepEqual(localized.papers[0].domains, ["floods", "groundwater"]);
  assert.deepEqual(localized.papers[0].methods, ["agents_tool_use"]);
  assert.equal(localized.papers[0].updatedAt, stamp);
  assert.deepEqual(localized.aliases, { old: "A" });
  assert.deepEqual(localized.highlights, { weekStart: "2026-11-02", updatedAt: stamp, papers: [{ id: "A", whyItMatters: null }] });
});

test("invalid optional values cannot discard papers or exceed limits", () => {
  const input = doc([paper("A", "2026-09-19", { domains: ["unknown", "floods", "floods", "groundwater", "urban_water"], methods: "rag", updated_at: "2026-02-30T00:00:00Z" }), paper("B", "2026-09-19"), paper("C", "2026-09-19"), paper("D", "2026-09-19")]);
  const data = normalizePapers({ ...input, highlights: { week_start: "2026-11-02", updated_at: "2026-11-07T00:00:00Z", papers: [
    { id: "missing", why_it_matters: { en: "bad", zh: null } },
    { id: "A", why_it_matters: { en: 3, zh: null } },
    ...["A", "A", "B", "C", "D"].map((id) => ({ id, why_it_matters: { en: "Why", zh: null } }))
  ] } });
  assert.equal(data.dropped, 0);
  assert.equal(data.papers.length, 4);
  assert.deepEqual(data.papers[0].domains, ["floods", "groundwater"]);
  assert.ok(!("methods" in data.papers[0]));
  assert.ok(!("updatedAt" in data.papers[0]));
  assert.deepEqual(data.highlights.papers.map((p) => p.id), ["A", "B", "C"]);
  for (const highlights of [null, [], {}, { week_start: "2026-02-30", updated_at: "bad", papers: [] }]) {
    const result = normalizePapers({ ...input, highlights, aliases: [] });
    assert.ok(!("highlights" in result));
    assert.ok(!("aliases" in result));
    assert.equal(result.papers.length, 4);
  }
});

test("aliases resolve chains but reject cycles, self links, dangling and public-ID overrides", () => {
  const input = doc([paper("A", "2026-09-19")]);
  const aliases = { old: "older", older: "A", loop: "cycle", cycle: "loop", self: "self", gone: "missing", bad: 1, A: "missing" };
  const data = normalizePapers({ ...input, aliases });
  assert.deepEqual(data.aliases, { old: "A", older: "A" });
  assert.equal(resolvePaperId("A", data.papers, aliases), "A");
  assert.equal(resolvePaperId("old", data.papers, aliases), "A");
  for (const id of ["loop", "cycle", "self", "gone", "bad", "toString", "missing"]) assert.equal(resolvePaperId(id, data.papers, aliases), null);
});

test("deep links reveal old weeks and clear only conflicting restrictions", () => {
  const papers = normalizePapers(doc(["2026-11-02", "2026-10-26", "2026-10-19", "2026-10-12", "2026-10-05", "2026-09-28"].map((date, i) => paper(String(i), date)))).papers.map((p) => localizePaper(p, "en"));
  assert.deepEqual(planBriefLink("#brief-old", papers, { old: "5" }), { id: "5", type: "all", query: "", visibleWeeks: 6 });
  assert.deepEqual(planBriefLink("#brief-5", papers, {}, { type: "preprint", query: "Paper", visibleWeeks: 4 }), { id: "5", type: "all", query: "Paper", visibleWeeks: 6 });
  assert.deepEqual(planBriefLink("#brief-5", papers, {}, { type: "published", query: "missing", visibleWeeks: 8 }), { id: "5", type: "published", query: "", visibleWeeks: 8 });
  assert.deepEqual(planBriefLink("#brief-missing", papers), { unavailable: true });
  assert.deepEqual(planBriefLink("#brief-%invalid", papers), { unavailable: true });
  assert.equal(planBriefLink("#other", papers), null);
});

test("the latest edition is the newest day papers were added, with its count", () => {
  const { papers } = normalizePapers(doc([paper("a", "2026-11-12"), paper("b", "2026-11-13"), paper("c", "2026-11-13")]));
  assert.deepEqual(latestEdition(papers), { day: "2026-11-13", count: 2 });
  assert.deepEqual(latestEdition([...papers].reverse()), { day: "2026-11-13", count: 2 });
  assert.equal(latestEdition([]), null);
});

test("plural picks the one or other form and fills in the count", () => {
  const en = { one: "1 paper", other: "{n} papers" };
  assert.equal(plural(en, 1), "1 paper");
  assert.equal(plural(en, 0), "0 papers");
  assert.equal(plural(en, 3), "3 papers");
  assert.equal(plural({ one: "{n} 篇", other: "{n} 篇" }, 1), "1 篇");
});

test("a paper with no reading in any language is flagged; a missing translation is not", () => {
  const { papers } = normalizePapers(doc([
    paper("A", "2026-09-19", { summary: { en: null, zh: null } }),
    paper("B", "2026-09-19")
  ]));
  const [a, b] = papers;
  assert.equal(localizePaper(a, "en").noReading, true);
  assert.equal(localizePaper(a, "zh").noReading, true);
  assert.equal("noReading" in localizePaper(b, "zh"), false);
});
