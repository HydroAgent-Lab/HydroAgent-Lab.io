import { CtaBand } from "@/components/cta-band";
import { DemoChat } from "@/components/demo-chat";
import { PageLead } from "@/components/page-lead";
import { SiteShell } from "@/components/shell";
import { getSiteContent } from "@/content/site";

export function DemoPageContent({ lang = "en" }) {
  const content = getSiteContent(lang);
  const page = content.demo;

  return (
    <SiteShell lang={lang}>
      <main className="main-content demo-page">
        <PageLead
          eyebrow={page.lead.eyebrow}
          title={page.lead.title}
          text={page.lead.text}
          facts={page.lead.facts}
        />

        <section className="content-section demo-chat-section">
          <DemoChat content={page.chat} lang={lang} />
        </section>

        <CtaBand lang={lang} content={content} />
      </main>
    </SiteShell>
  );
}
