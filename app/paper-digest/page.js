import { PaperDigestPageContent } from "@/components/pages/paper-digest";
import { paperDigestContent } from "@/content/pages/paper-digest";

export const metadata = {
  title: "Paper Digest | HydroAgent-Lab",
  // Its own canonical (the layout's "/" would point search engines at the home
  // page) and the RSS feed built from the same papers.json.
  alternates: {
    canonical: "/paper-digest/",
    types: { "application/rss+xml": "/paper-digest/feed.xml" }
  },
  // One copy of the text, shared with the RSS channel description.
  description: paperDigestContent.en.meta.description
};

export default function PaperDigestPage() {
  return <PaperDigestPageContent lang="en" />;
}
