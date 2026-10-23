import { PaperDigestPageContent } from "@/components/pages/paper-digest";

export const metadata = {
  title: "水利大模型文献日报 | HydroAgent-Lab",
  // Its own canonical (the layout's "/" would point search engines at the home
  // page) and the RSS feed built from the same papers.json.
  alternates: {
    canonical: "/zh/paper-digest/",
    types: { "application/rss+xml": "/zh/paper-digest/feed.xml" }
  },
  description: "水利 × 大模型领域的新文献：每天由 AI 筛选并生成摘要，并通过邮件推送给订阅者。"
};

export default function PaperDigestZhPage() {
  return <PaperDigestPageContent lang="zh" />;
}
