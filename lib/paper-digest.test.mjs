import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  NO_FILTERS,
  PAGE_SIZE,
  briefHash,
  cleanText,
  dayLabel,
  digestPageUrl,
  editionKeys,
  filterPapers,
  groupKey,
  groupLabel,
  groupPapers,
  groupsToShow,
  isFiltered,
  latestEdition,
  listPage,
  localizePaper,
  localizeDigest,
  resolvePaperId,
  planBriefLink,
  plural,
  matchesQuery,
  normalizePapers,
  safeUrl,
  taxonomyOptions,
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
  assert.deepEqual(groupPapers(papers, "week").map((g) => [g.key, g.papers.length]), [["2026-09-21", 1], ["2026-09-14", 2]]);
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

test("optional enums and timestamps survive localization; a highlight missing a language is dropped", () => {
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
  // The only pick has no Chinese Why It Matters, so neither page shows it.
  assert.ok(!("highlights" in localized));
  assert.ok(!("highlights" in localizeDigest(data, "en")));
});

test("invalid optional values cannot discard papers or exceed limits", () => {
  const input = doc([paper("A", "2026-09-19", { domains: ["unknown", "floods", "floods", "groundwater", "urban_water"], methods: "rag", updated_at: "2026-02-30T00:00:00Z" }), paper("B", "2026-09-19"), paper("C", "2026-09-19"), paper("D", "2026-09-19")]);
  const data = normalizePapers({ ...input, highlights: { week_start: "2026-11-02", updated_at: "2026-11-07T00:00:00Z", papers: [
    { id: "missing", why_it_matters: { en: "bad", zh: null } },
    { id: "A", why_it_matters: { en: 3, zh: null } },
    ...["A", "A", "B", "C", "D"].map((id) => ({ id, why_it_matters: { en: "Why", zh: "理由" } }))
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

test("deep links clear only the restrictions that hide the paper and reveal its group", () => {
  const days = ["2026-11-02", "2026-10-26", "2026-10-19", "2026-10-12", "2026-10-05", "2026-09-28"];
  const papers = normalizePapers(doc(days.map((day, i) => paper(String(i), day, i === 5 ? { type: "preprint" } : {}))))
    .papers.map((p) => localizePaper(p, "en"));
  const none = { edition: "", type: "all", query: "", savedOnly: false, domain: "", method: "" };
  // An old ID resolves, and paging reaches the oldest week.
  assert.deepEqual(planBriefLink("#brief-old", papers, { old: "5" }, { visibleCount: 2 }), { id: "5", ...none, visibleCount: 6 });
  // Each restriction that hides the paper is cleared...
  assert.deepEqual(
    planBriefLink("#brief-5", papers, {}, { granularity: "week", edition: "2026-11-02", type: "published", query: "Paper 5", savedOnly: true, savedIds: new Set(), visibleCount: 2 }),
    { id: "5", edition: "", type: "all", query: "Paper 5", savedOnly: false, domain: "", method: "", visibleCount: 2 }
  );
  // ...the others stay, and so does the grouping.
  assert.deepEqual(
    planBriefLink("#brief-5", papers, {}, { granularity: "week", edition: "2026-09-28", type: "preprint", query: "Summary", savedOnly: true, savedIds: new Set(["5"]), visibleCount: 30 }),
    { id: "5", edition: "2026-09-28", type: "preprint", query: "Summary", savedOnly: true, domain: "", method: "", visibleCount: 30 }
  );
  assert.deepEqual(
    planBriefLink("#brief-1", papers, {}, { granularity: "month", edition: "2026-10", visibleCount: 1 }),
    { id: "1", ...none, edition: "2026-10", visibleCount: 4 }
  );
  assert.deepEqual(planBriefLink("#brief-1", papers, {}, { query: "missing" }), { id: "1", ...none, visibleCount: PAGE_SIZE });
  assert.deepEqual(planBriefLink("#brief-missing", papers), { unavailable: true });
  assert.deepEqual(planBriefLink("#brief-%invalid", papers), { unavailable: true });
  assert.equal(planBriefLink("#saved", papers), null);
  assert.equal(planBriefLink("", papers), null);
});

test("a shared link's fragment reads back to its paper, whatever the ID holds", () => {
  const id = "SRC_URL_https://x.org/a b?c=1#d%e";
  const papers = normalizePapers(doc([paper(id, "2026-11-02")])).papers.map((p) => localizePaper(p, "en"));
  assert.ok(briefHash(id).startsWith("#brief-"));
  assert.deepEqual(planBriefLink(briefHash(id), papers, {}), { id, edition: "", type: "all", query: "", savedOnly: false, domain: "", method: "", visibleCount: PAGE_SIZE });
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

test("venue, title and authors are decoded and their whitespace collapsed; AI text is not", () => {
  // The four venues in the 2026-11-13 data, then numeric references.
  assert.equal(cleanText("Environmental Science &amp;\nTechnology"), "Environmental Science & Technology");
  assert.equal(
    cleanText("Nuclear Plant Instrumentation and Control &amp; Human-Machine Interface Technology (NPIC&amp;HMIT 2025)"),
    "Nuclear Plant Instrumentation and Control & Human-Machine Interface Technology (NPIC&HMIT 2025)"
  );
  assert.equal(cleanText("Communications AI &amp; Computing"), "Communications AI & Computing");
  assert.equal(cleanText("ScholarsArchive  (Brigham Young University)"), "ScholarsArchive (Brigham Young University)");
  assert.equal(cleanText("A &#38; B &#x26; C &#9999999; D"), "A & B & C &#9999999; D");
  // Decoded once only; references to nothing, and unknown names, stay as written.
  assert.equal(cleanText("&lt;i&gt; &quot;x&quot; &apos;y&apos; &amp;lt;"), "<i> \"x\" 'y' &lt;");
  assert.equal(cleanText("&#xD800; &#0; &copy;"), "&#xD800; &#0; &copy;");
  assert.equal(cleanText(`a${String.fromCharCode(0xa0)}&nbsp;\t b`), "a b");
  assert.equal(cleanText(null), "");
  const [a, b] = normalizePapers(doc([
    paper("A", "2026-09-19", {
      title: " Floods &amp;\n droughts ",
      venue: "Environmental Science &amp;\nTechnology",
      authors: ["Ada &amp; Bob", " ", "&nbsp;"],
      summary: { en: "Kept &amp; as written", zh: null }
    }),
    paper("B", "2026-09-19", { venue: " &nbsp; " })
  ])).papers;
  assert.equal(a.title, "Floods & droughts");
  assert.equal(a.venue, "Environmental Science & Technology");
  assert.deepEqual(a.authors, ["Ada & Bob"]);
  assert.equal(a.summary.en, "Kept &amp; as written");
  assert.equal(b.venue, null);
});

test("Copy link and the RSS channel use the page's own address", () => {
  assert.equal(digestPageUrl("en"), "https://hydroagentlab.com/paper-digest/");
  assert.equal(digestPageUrl("zh"), "https://hydroagentlab.com/zh/paper-digest/");
});

test("papers group by day, week or month, newest group first", () => {
  const days = ["2026-11-12", "2026-11-10", "2026-11-09", "2026-10-31", "2025-12-31", "2026-01-01"];
  const { papers } = normalizePapers(doc(days.map((day, i) => paper("abcdef"[i], day))));
  assert.equal(groupKey("2026-11-12", "day"), "2026-11-12");
  assert.equal(groupKey("2026-11-12", "week"), "2026-11-09");
  assert.equal(groupKey("2026-11-12", "month"), "2026-11");
  const shape = (granularity) => groupPapers(papers, granularity).map((g) => [g.key, g.papers.map((p) => p.id).join("")]);
  assert.deepEqual(shape("day"), [["2026-11-12", "a"], ["2026-11-10", "b"], ["2026-11-09", "c"], ["2026-10-31", "d"], ["2026-01-01", "f"], ["2025-12-31", "e"]]);
  assert.deepEqual(shape("week"), [["2026-11-09", "abc"], ["2026-10-26", "d"], ["2025-12-29", "fe"]]);
  assert.deepEqual(shape("month"), [["2026-11", "abc"], ["2026-10", "d"], ["2026-01", "f"], ["2025-12", "e"]]);
  assert.deepEqual(editionKeys(papers, "month"), ["2026-11", "2026-10", "2026-01", "2025-12"]);
  assert.deepEqual(editionKeys([...papers].reverse(), "week"), ["2026-11-09", "2026-10-26", "2025-12-29"]);
});

test("group labels name the day, week or month, with the year when it is not the current one", () => {
  assert.equal(groupLabel("2026-11-12", "day", "en", 2026), "Nov 12");
  assert.equal(groupLabel("2026-11-12", "day", "zh", 2026), "11月12日");
  assert.equal(groupLabel("2025-12-31", "day", "en", 2026), "Dec 31, 2025");
  assert.equal(groupLabel("2025-12-31", "day", "zh", 2026), "2025年12月31日");
  assert.equal(groupLabel("2026-11-09", "week", "en", 2026), "Nov 9 – 15");
  assert.equal(groupLabel("2025-12-29", "week", "zh", 2026), "2025年12月29日 – 2026年1月4日");
  assert.equal(groupLabel("2026-11", "month", "en", 2026), "November 2026");
  assert.equal(groupLabel("2026-11", "month", "zh", 2026), "2026年11月");
});

test("filters combine: type, search, edition and Saved only must all hold", () => {
  const papers = normalizePapers(doc([
    paper("a", "2026-11-12", { title: "Flood agents" }),
    paper("b", "2026-11-10", { title: "Flood RAG", type: "preprint" }),
    paper("c", "2026-10-30", { title: "Drought agents" })
  ])).papers.map((p) => localizePaper(p, "en"));
  const ids = (options) => filterPapers(papers, options).map((p) => p.id).join("");
  assert.equal(ids(), "abc");
  assert.equal(ids({ query: "flood" }), "ab");
  assert.equal(ids({ query: "flood", type: "published" }), "a");
  assert.equal(ids({ granularity: "month", edition: "2026-11" }), "ab");
  assert.equal(ids({ granularity: "day", edition: "2026-11-10" }), "b");
  assert.equal(ids({ granularity: "week", edition: "2026-10-26" }), "c");
  assert.equal(ids({ savedOnly: true }), "");
  assert.equal(ids({ savedOnly: true, savedIds: new Set(["b", "c"]) }), "bc");
  assert.equal(ids({ savedOnly: true, savedIds: new Set(["b", "c"]), query: "agents", granularity: "month", edition: "2026-10" }), "c");
});

test("the list counts as filtered when any filter or the search holds it back", () => {
  assert.deepEqual(NO_FILTERS, { query: "", edition: "", type: "all", savedOnly: false, domain: "", method: "" });
  assert.ok(Object.isFrozen(NO_FILTERS));
  assert.equal(isFiltered(NO_FILTERS), false);
  assert.equal(isFiltered({ ...NO_FILTERS, query: "   " }), false); // spaces are no search
  for (const change of [{ query: "flood" }, { edition: "2026-11" }, { type: "preprint" }, { savedOnly: true }, { domain: "floods" }, { method: "benchmarks" }]) {
    assert.equal(isFiltered({ ...NO_FILTERS, ...change }), true, JSON.stringify(change));
  }
});

test("a filter given as undefined takes its default, as an absent one does", () => {
  const unset = { query: undefined, edition: undefined, type: undefined, savedOnly: undefined, domain: undefined, method: undefined };
  assert.equal(isFiltered(unset), false);
  const papers = normalizePapers(doc([paper("a", "2026-10-20"), paper("b", "2026-10-21", { type: "preprint" })])).papers;
  assert.equal(filterPapers(papers, unset).length, 2);
  assert.deepEqual(planBriefLink(briefHash("a"), papers, {}, unset), planBriefLink(briefHash("a"), papers, {}));
});

test("paging adds whole groups until at least a page of papers shows", () => {
  const groups = (...sizes) => sizes.map((n, i) => ({ key: String(i), papers: Array(n).fill(null) }));
  assert.equal(PAGE_SIZE, 10);
  assert.equal(groupsToShow(groups(10, 20, 5), 30), 2); // exactly 30
  assert.equal(groupsToShow(groups(10, 19, 5), 30), 3); // 29, then 34
  assert.equal(groupsToShow(groups(40, 5), 30), 1); // one group past a page
  assert.equal(groupsToShow(groups(10, 5), 30), 2); // less than a page in all
  assert.equal(groupsToShow([], 30), 0);
  assert.equal(groupsToShow(groups(10, 20, 5, 30), 60), 4);
});

test("the list shows Show earlier while groups are hidden, and Hide earlier once past the first page", () => {
  const groups = (...sizes) => sizes.map((n, i) => ({ key: String(i), papers: Array(n).fill(null) }));
  const page = (list, count) => {
    const { shown, earlier, hide } = listPage(list, count);
    return { shown: shown.length, earlier, hide };
  };
  const weeks = groups(3, 8, 8);
  assert.equal(listPage(weeks, PAGE_SIZE).shown[1], weeks[1]); // the groups themselves, newest first
  assert.deepEqual(page(weeks, PAGE_SIZE), { shown: 2, earlier: true, hide: false }); // 3 + 8 = 11
  assert.deepEqual(page(weeks, PAGE_SIZE * 2), { shown: 3, earlier: false, hide: true }); // all shown: only Hide
  assert.deepEqual(page(groups(12, 5, 5), 15), { shown: 2, earlier: true, hide: true }); // both
  assert.deepEqual(page(groups(3, 4), PAGE_SIZE), { shown: 2, earlier: false, hide: false }); // under a page: neither
  assert.deepEqual(page(groups(3, 4), 40), { shown: 2, earlier: false, hide: false }); // a shared link's larger count: still neither
  assert.deepEqual(page([], PAGE_SIZE), { shown: 0, earlier: false, hide: false });
});

test("Domain and Method filter like the others: every restriction holds, and an untagged paper drops out", () => {
  const papers = normalizePapers(doc([
    paper("a", "2026-11-12", { title: "Flood agents", domains: ["floods"], methods: ["agents_tool_use"] }),
    paper("b", "2026-11-10", { title: "Flood RAG", type: "preprint", domains: ["floods", "urban_water"], methods: ["rag_knowledge_graphs"] }),
    paper("c", "2026-10-30", { title: "Untagged" })
  ])).papers.map((p) => localizePaper(p, "en"));
  const ids = (options) => filterPapers(papers, options).map((p) => p.id).join("");
  assert.equal(ids(), "abc");
  assert.equal(ids({ domain: "floods" }), "ab");
  assert.equal(ids({ domain: "urban_water" }), "b");
  assert.equal(ids({ method: "agents_tool_use" }), "a");
  assert.equal(ids({ domain: "floods", method: "rag_knowledge_graphs" }), "b");
  assert.equal(ids({ domain: "floods", type: "published" }), "a");
  assert.equal(ids({ domain: "groundwater" }), "");
  assert.equal(ids({ method: "agents_tool_use", query: "rag" }), "");
});

test("a shared link clears a Domain or Method its paper lacks and keeps one it has", () => {
  const papers = normalizePapers(doc([
    paper("a", "2026-11-12", { domains: ["floods"], methods: ["agents_tool_use"] }),
    paper("b", "2026-11-10")
  ])).papers.map((p) => localizePaper(p, "en"));
  const plan = (id, view) => planBriefLink(briefHash(id), papers, {}, view);
  assert.deepEqual(
    plan("a", { domain: "floods", method: "agents_tool_use" }),
    { id: "a", edition: "", type: "all", query: "", savedOnly: false, domain: "floods", method: "agents_tool_use", visibleCount: PAGE_SIZE }
  );
  assert.deepEqual(
    plan("a", { domain: "urban_water", method: "agents_tool_use" }),
    { id: "a", edition: "", type: "all", query: "", savedOnly: false, domain: "", method: "agents_tool_use", visibleCount: PAGE_SIZE }
  );
  assert.deepEqual(
    plan("b", { domain: "floods", method: "benchmarks", type: "published" }),
    { id: "b", edition: "", type: "published", query: "", savedOnly: false, domain: "", method: "", visibleCount: PAGE_SIZE }
  );
});

test("the Filters options are the Domains and Methods in use, in the contract's order", () => {
  const papers = normalizePapers(doc([
    paper("a", "2026-11-12", { domains: ["groundwater", "floods"], methods: ["benchmarks"] }),
    paper("b", "2026-11-10", { domains: ["catchment_hydrology"], methods: ["prompting", "benchmarks"] }),
    paper("c", "2026-11-09")
  ])).papers;
  assert.deepEqual(taxonomyOptions(papers), { domains: ["catchment_hydrology", "floods", "groundwater"], methods: ["prompting", "benchmarks"] });
  assert.deepEqual(taxonomyOptions(papers.slice(2)), { domains: [], methods: [] });
  assert.deepEqual(taxonomyOptions([]), { domains: [], methods: [] });
});

test("a highlight shows only with Why It Matters in both languages, the same picks on both pages", () => {
  const stamp = "2026-11-16T11:42:03+00:00";
  const data = normalizePapers({ ...doc([paper("A", "2026-11-12"), paper("B", "2026-11-12"), paper("C", "2026-11-12")]), highlights: {
    week_start: "2026-11-16", updated_at: stamp,
    papers: [
      { id: "A", why_it_matters: { en: "Why A", zh: "A 的理由" } },
      { id: "B", why_it_matters: { en: "Why B", zh: null } },
      { id: "C", why_it_matters: { en: "  ", zh: "C 的理由" } }
    ]
  } });
  assert.deepEqual(data.highlights.papers.map((p) => p.id), ["A"]); // the rule applies when reading, before the cap counts
  for (const [lang, why] of [["en", "Why A"], ["zh", "A 的理由"]]) {
    assert.deepEqual(localizeDigest(data, lang).highlights, { weekStart: "2026-11-16", updatedAt: stamp, papers: [{ id: "A", whyItMatters: why }] });
  }
  assert.ok(!("highlights" in localizeDigest(normalizePapers(doc([paper("A", "2026-11-12")])), "en")));
});

test("a pick missing a language does not count toward the cap of three", () => {
  const why = (name) => ({ en: `Why ${name}`, zh: `${name} 的理由` });
  const data = normalizePapers({ ...doc(["A", "B", "C", "D"].map((id) => paper(id, "2026-11-12"))), highlights: {
    week_start: "2026-11-16", updated_at: "2026-11-16T11:42:03+00:00",
    papers: [
      { id: "A", why_it_matters: { en: "Why A", zh: null } },
      ...["B", "C", "D"].map((id) => ({ id, why_it_matters: why(id) }))
    ]
  } });
  assert.deepEqual(data.highlights.papers.map((p) => p.id), ["B", "C", "D"]);
});
