// Re-export helpers
export { normalizePath, localizeHref, stripLangPrefix, getLanguageSwitchHref } from "./helpers";

// Re-export team members
export { hydroAgentTeamMembers } from "./team-members";

// Assemble siteContent from sub-modules
import { navContent } from "./nav";
import { homeContent } from "./pages/home";
import { platformContent } from "./pages/platform";
import { capabilitiesContent } from "./pages/capabilities";
import { demoContent } from "./pages/demo";
import { researchContent } from "./pages/research";
import { whitePapersContent } from "./pages/white-papers";
import { teamContent } from "./pages/team";
import { careersContent } from "./pages/careers";
import { contactContent } from "./pages/contact";

export const siteContent = {
  en: {
    ui: navContent.en,
    home: homeContent.en,
    platform: platformContent.en,
    capabilities: capabilitiesContent.en,
    demo: demoContent.en,
    research: researchContent.en,
    whitePapers: whitePapersContent.en,
    team: teamContent.en,
    careers: careersContent.en,
    contact: contactContent.en
  },
  zh: {
    ui: navContent.zh,
    home: homeContent.zh,
    platform: platformContent.zh,
    capabilities: capabilitiesContent.zh,
    demo: demoContent.zh,
    research: researchContent.zh,
    whitePapers: whitePapersContent.zh,
    team: teamContent.zh,
    careers: careersContent.zh,
    contact: contactContent.zh
  }
};

export function getSiteContent(lang = "en") {
  return siteContent[lang] || siteContent.en;
}
