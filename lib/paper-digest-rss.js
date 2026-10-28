import { paperDigestContent } from "@/content/pages/paper-digest";
import { loadPaperDigest } from "./load-paper-digest";
import { localizePaper } from "./paper-digest.mjs";

const BASE_URL = "https://hydroagentlab.com";
const LIMIT = 50;

const esc = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// RSS 2.0 of the newest papers, built from the same papers.json as the page.
// Each item links to the paper itself; the summary is in the feed's language
// and left out when that language is missing.
export function paperDigestRss(lang) {
  const c = paperDigestContent[lang] || paperDigestContent.en;
  const data = loadPaperDigest();
  const page = `${BASE_URL}${lang === "zh" ? "/zh" : ""}/paper-digest/`;
  const items = data.papers.slice(0, LIMIT).map((paper) => {
    const p = localizePaper(paper, lang);
    return [
      "    <item>",
      `      <title>${esc(p.title)}</title>`,
      p.url ? `      <link>${esc(p.url)}</link>` : null,
      `      <guid isPermaLink="false">${esc(p.id)}</guid>`,
      // Inclusion day at the 07:00 (Rome) run; the exact hour is not recorded.
      `      <pubDate>${new Date(`${p.includedOn}T06:00:00Z`).toUTCString()}</pubDate>`,
      `      <category>${esc(c.feed.badges[p.type])}</category>`,
      p.summary ? `      <description>${esc(p.summary)}</description>` : null,
      "    </item>"
    ]
      .filter(Boolean)
      .join("\n");
  });
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${esc(c.lead.eyebrow)}</title>`,
    `    <link>${page}</link>`,
    `    <atom:link href="${page}feed.xml" rel="self" type="application/rss+xml"/>`,
    `    <description>${esc(c.meta.description)}</description>`,
    `    <language>${lang === "zh" ? "zh-CN" : "en"}</language>`,
    data.generatedAt ? `    <lastBuildDate>${new Date(data.generatedAt).toUTCString()}</lastBuildDate>` : null,
    ...items,
    "  </channel>",
    "</rss>",
    ""
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export function rssResponse(lang) {
  return new Response(paperDigestRss(lang), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" }
  });
}
