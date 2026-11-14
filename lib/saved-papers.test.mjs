import assert from "node:assert/strict";
import test from "node:test";
import {
  BACKUP_SCHEMA,
  STORAGE_KEY,
  backupFileName,
  buildBackup,
  cleanMeta,
  cleanSaved,
  mergeBackup,
  readStored,
  serializeStored,
  snapshot,
  sortBySaved,
  toggleSaved
} from "./saved-papers.mjs";

const paper = {
  id: "A",
  title: "Flood agents",
  type: "published",
  url: "https://example.org/a",
  venue: "Water Research",
  authors: ["Ada"],
  authorsTotal: 3,
  date: "2026-11",
  includedOn: "2026-11-12",
  summary: "AI text",
  details: "AI text",
  limitations: "AI text",
  domains: ["floods"]
};
const at = (stamp) => new Date(stamp);

test("a snapshot keeps the bibliographic fields only", () => {
  assert.deepEqual(snapshot(paper), {
    title: "Flood agents",
    type: "published",
    url: "https://example.org/a",
    venue: "Water Research",
    authors: ["Ada"],
    authorsTotal: 3,
    date: "2026-11",
    includedOn: "2026-11-12"
  });
});

test("saving puts the paper first; saving it again removes it", () => {
  const one = toggleSaved([], paper, at("2026-11-13T10:00:00Z"));
  assert.deepEqual(one, [{ id: "A", savedAt: "2026-11-13T10:00:00.000Z", meta: snapshot(paper) }]);
  const two = toggleSaved(one, { ...paper, id: "B" }, at("2026-11-13T11:00:00Z"));
  assert.deepEqual(two.map((item) => item.id), ["B", "A"]);
  assert.deepEqual(toggleSaved(two, paper).map((item) => item.id), ["B"]);
  assert.equal(one.length, 1); // the input list is not changed
});

test("stored text that is broken, of another shape or another version reads as empty", () => {
  for (const raw of [null, "", "{", "[]", '{"v":2,"items":[]}', '{"v":1,"items":{}}']) assert.deepEqual(readStored(raw), []);
  const items = toggleSaved([], paper, at("2026-11-13T10:00:00Z"));
  assert.equal(serializeStored(items), JSON.stringify({ v: 1, items }));
  assert.deepEqual(readStored(serializeStored(items)), items);
  assert.equal(STORAGE_KEY, "hydroagent.saved.v1");
});

test("cleaning drops invalid entries, moves old IDs and keeps the first entry for each", () => {
  const stamp = "2026-11-13T10:00:00.000Z";
  const { items, invalid } = cleanSaved(
    [
      { id: "old", savedAt: stamp },
      { id: "A", savedAt: "2026-11-12T10:00:00.000Z" }, // the same paper as "old"
      { id: "", savedAt: stamp },
      { id: "x".repeat(201), savedAt: stamp },
      { id: "B", savedAt: "2026-02-30T00:00:00Z" },
      { id: 7, savedAt: stamp },
      null,
      { id: "C", savedAt: stamp, meta: "not an object" }
    ],
    (id) => (id === "old" ? "A" : id)
  );
  assert.deepEqual(items, [{ id: "A", savedAt: stamp }, { id: "C", savedAt: stamp }]);
  assert.equal(invalid, 5);
});

test("imported details are checked field by field", () => {
  assert.equal(cleanMeta(null), undefined);
  assert.equal(cleanMeta({ url: "javascript:alert(1)" }), undefined);
  assert.deepEqual(
    cleanMeta({
      title: " Floods &amp; droughts ",
      type: "dataset",
      url: "javascript:alert(1)",
      venue: "v".repeat(301),
      authors: ["Ada", "a".repeat(201), "", "Bob", "Cy", "Di", "Ed"],
      authorsTotal: 12,
      date: "Nov 2026",
      includedOn: "2026-11-12",
      summary: "AI text",
      extra: 1
    }),
    { title: "Floods & droughts", authors: ["Ada", "Bob", "Cy", "Di"], authorsTotal: 12, includedOn: "2026-11-12" }
  );
  assert.equal(cleanMeta({ title: "t".repeat(501) }), undefined);
  assert.deepEqual(cleanMeta({ title: "T", authors: ["Ada"], authorsTotal: 10001 }), { title: "T", authors: ["Ada"] });
  assert.deepEqual(cleanMeta({ title: "T", authors: ["Ada", "Bob"], authorsTotal: 1 }), { title: "T", authors: ["Ada", "Bob"] });
});

test("saved papers sort newest first without changing the list", () => {
  const items = [
    { id: "a", savedAt: "2026-11-12T10:00:00Z" },
    { id: "b", savedAt: "2026-11-13T09:00:00+02:00" },
    { id: "c", savedAt: "2026-11-13T08:00:00Z" }
  ];
  assert.deepEqual(sortBySaved(items).map((item) => item.id), ["c", "b", "a"]);
  assert.deepEqual(items.map((item) => item.id), ["a", "b", "c"]);
});

test("a backup exports and imports back unchanged", () => {
  const first = toggleSaved([], paper, at("2026-11-12T10:00:00Z"));
  const items = toggleSaved(first, { ...paper, id: "B", url: null, venue: null }, at("2026-11-13T10:00:00Z"));
  const text = buildBackup(items, at("2026-11-13T12:00:00Z"));
  const data = JSON.parse(text);
  assert.equal(data.schema, BACKUP_SCHEMA);
  assert.equal(data.version, 1);
  assert.equal(data.exportedAt, "2026-11-13T12:00:00.000Z");
  assert.deepEqual(mergeBackup([], text), { items, added: 2, duplicates: 0, invalid: 0 });
  // The file name uses the UTC day.
  assert.equal(backupFileName(at("2026-11-13T23:30:00-02:00")), "hydroagent-saved-papers-2026-11-14.json");
});

test("an import keeps local entries, counts duplicates and invalid ones, and names what is wrong", () => {
  const local = [{ id: "A", savedAt: "2026-11-13T10:00:00.000Z" }];
  const backup = (items, extra = {}) =>
    JSON.stringify({ schema: BACKUP_SCHEMA, version: 1, exportedAt: "2026-11-13T12:00:00.000Z", items, ...extra });
  const result = mergeBackup(
    local,
    backup([
      { id: "A", savedAt: "2026-01-01T00:00:00.000Z" },
      { id: "old", savedAt: "2026-11-01T00:00:00.000Z" },
      { id: "", savedAt: "2026-11-01T00:00:00.000Z" }
    ]),
    (id) => (id === "old" ? "B" : id)
  );
  assert.deepEqual(result, { items: [local[0], { id: "B", savedAt: "2026-11-01T00:00:00.000Z" }], added: 1, duplicates: 1, invalid: 1 });
  assert.deepEqual(mergeBackup(local, "{"), { error: "json" });
  assert.deepEqual(mergeBackup(local, JSON.stringify({ schema: "other", version: 1, items: [] })), { error: "schema" });
  assert.deepEqual(mergeBackup(local, backup([], { version: 2 })), { error: "version" });
  assert.deepEqual(mergeBackup(local, JSON.stringify({ schema: BACKUP_SCHEMA, version: 1 })), { error: "schema" });
});
