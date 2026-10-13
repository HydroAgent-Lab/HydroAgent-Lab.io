import { PageLead } from "@/components/page-lead";
import { SiteShell } from "@/components/shell";
import { SubscribeForm } from "@/components/subscribe-form";
import { paperDigestContent } from "@/content/pages/paper-digest";

// One job: explain the digest and take an email address. The form sits under
// the title in PageLead's `actions` slot; the client boundary is the form only.
export function PaperDigestPageContent({ lang = "en" }) {
  const c = paperDigestContent[lang] || paperDigestContent.en;

  return (
    <SiteShell lang={lang}>
      {/* The shell sets no lang and <html> is always "en", so /zh marks its copy here. */}
      <main className="main-content paper-digest-page" lang={lang === "zh" ? "zh-CN" : undefined}>
        <PageLead
          eyebrow={c.lead.eyebrow}
          title={c.lead.title}
          text={c.lead.text}
          facts={c.lead.facts}
          actions={<SubscribeForm lang={lang} copy={c.form} />}
        />
      </main>
    </SiteShell>
  );
}
