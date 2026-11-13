import { PaperDigestPageContent } from "@/components/pages/paper-digest";
import { paperDigestContent } from "@/content/pages/paper-digest";

const shareTitle = "HydroAgent Paper Digest — LLM × Hydrology";
const description = paperDigestContent.en.meta.description;

export const metadata = {
  title: "Paper Digest | HydroAgent-Lab",
  // Its own canonical (the layout's "/" would point search engines at the home
  // page) and the RSS feed built from the same papers.json.
  alternates: {
    canonical: "/paper-digest/",
    types: { "application/rss+xml": "/paper-digest/feed.xml" }
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
    url: "/paper-digest/",
    locale: "en_US"
  },
  twitter: { card: "summary_large_image", title: shareTitle, description }
};

export default function PaperDigestPage() {
  return <PaperDigestPageContent lang="en" />;
}
