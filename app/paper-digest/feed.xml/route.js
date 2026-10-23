import { rssResponse } from "@/lib/paper-digest-rss";

// Rendered once at build time into out/paper-digest/feed.xml.
export const dynamic = "force-static";

export function GET() {
  return rssResponse("en");
}
