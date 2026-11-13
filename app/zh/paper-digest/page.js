import { PaperDigestPageContent } from "@/components/pages/paper-digest";
import { paperDigestContent } from "@/content/pages/paper-digest";

const shareTitle = "水利大模型文献日报 — LLM × 水文学";
const description = paperDigestContent.zh.meta.description;

export const metadata = {
  title: "水利大模型文献日报 | HydroAgent-Lab",
  // Its own canonical (the layout's "/" would point search engines at the home
  // page) and the RSS feed built from the same papers.json.
  alternates: {
    canonical: "/zh/paper-digest/",
    types: { "application/rss+xml": "/zh/paper-digest/feed.xml" }
  },
  // One copy of the text, shared with the RSS channel description.
  description,
  // A page-level openGraph or twitter object replaces the layout's whole
  // object, so the shared fields are repeated here.
  openGraph: {
    type: "website",
    siteName: "HydroAgent-Lab",
    title: shareTitle,
    description,
    url: "/zh/paper-digest/",
    locale: "zh_CN"
  },
  twitter: { card: "summary_large_image", title: shareTitle, description }
};

export default function PaperDigestZhPage() {
  return <PaperDigestPageContent lang="zh" />;
}
