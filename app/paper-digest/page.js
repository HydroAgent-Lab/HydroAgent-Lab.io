import { PaperDigestPageContent } from "@/components/pages/paper-digest";

export const metadata = {
  title: "Paper Digest | HydroAgent-Lab",
  // Its own canonical (the layout's "/" would point search engines at the home
  // page) and the RSS feed built from the same papers.json.
  alternates: {
    canonical: "/paper-digest/",
    types: { "application/rss+xml": "/paper-digest/feed.xml" }
  },
  description:
    "New papers on large language models in hydrology and water resources, screened and summarized by AI every day, with a daily email digest."
};

export default function PaperDigestPage() {
  return <PaperDigestPageContent lang="en" />;
}
