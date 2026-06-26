export const dynamic = "force-static";

const BASE_URL = "https://hydroagentlab.com";

const routes = [
  "",
  "platform",
  "capabilities",
  "research",
  "white-papers",
  "events",
  "team",
  "members",
  "careers",
  "contact"
];

export default function sitemap() {
  const lastModified = new Date();
  const entries = [];

  for (const route of routes) {
    const path = route ? `/${route}` : "";
    // English (default) version
    entries.push({
      url: `${BASE_URL}${path}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: route === "" ? 1 : 0.8
    });
    // Chinese version under /zh
    entries.push({
      url: `${BASE_URL}/zh${path}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: route === "" ? 0.9 : 0.7
    });
  }

  return entries;
}
