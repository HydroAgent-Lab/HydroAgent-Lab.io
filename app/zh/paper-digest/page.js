import { PaperDigestPageContent } from "@/components/pages/paper-digest";
import { paperDigestContent } from "@/content/pages/paper-digest";

export const metadata = {
  title: "水利大模型文献日报 | HydroAgent-Lab",
  // Its own canonical (the layout's "/" would point search engines at the home
  // page) and the RSS feed built from the same papers.json.
  alternates: {
    canonical: "/zh/paper-digest/",
    types: { "application/rss+xml": "/zh/paper-digest/feed.xml" }
  },
  // One copy of the text, shared with the RSS channel description.
  description: paperDigestContent.zh.meta.description
};

export default function PaperDigestZhPage() {
  return <PaperDigestPageContent lang="zh" />;
}
