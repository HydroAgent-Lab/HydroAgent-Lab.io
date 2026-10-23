import { PageLead } from "@/components/page-lead";
import { PaperDigestFeed } from "@/components/paper-digest-feed";
import { SiteShell } from "@/components/shell";
import { SubscribeForm } from "@/components/subscribe-form";
import { SubscribedNotice } from "@/components/subscribed-notice";
import { paperDigestContent, paperDigestEndpoints } from "@/content/pages/paper-digest";
import { localizeHref } from "@/content/helpers";
import { loadPaperDigest } from "@/lib/load-paper-digest";
import { dayLabel, localizePaper } from "@/lib/paper-digest.mjs";

// One page: the lead takes the sign-up (form, language, privacy note), the
// section below lists every public paper, read from papers.json at build
// time. Only the page language's text is passed to the client feed.
export function PaperDigestPageContent({ lang = "en" }) {
  const c = paperDigestContent[lang] || paperDigestContent.en;
  const data = loadPaperDigest();
  const papers = data.papers.map((paper) => localizePaper(paper, lang));
  const count = String(papers.length);
  const generatedDay = data.generatedAt ? data.generatedAt.slice(0, 10) : null;
  const currentYear = generatedDay ? Number(generatedDay.slice(0, 4)) : new Date().getUTCFullYear();
  const facts = c.lead.facts.map((fact) => ({ ...fact, value: fact.value.replace("{count}", count) }));

  return (
    <SiteShell lang={lang}>
      {/* The shell sets no lang and <html> is always "en", so /zh marks its copy here. */}
      <main className="main-content paper-digest-page" lang={lang === "zh" ? "zh-CN" : undefined}>
        <SubscribedNotice text={c.subscribed} />
        <PageLead
          eyebrow={c.lead.eyebrow}
          title={c.lead.title}
          text={c.lead.text}
          facts={facts}
          actions={
            <>
              <SubscribeForm lang={lang} copy={c.form} endpoints={paperDigestEndpoints} />
              <details className="pd-privacy">
                <summary>{c.privacy.summary}</summary>
                <ul>
                  {c.privacy.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </details>
            </>
          }
        />
        <section className="content-section pd-section" aria-labelledby="pd-feed-title">
          <div className="pd-head">
            <h2 id="pd-feed-title">{c.feed.title}</h2>
            <p>
              {c.feed.intro.replace("{count}", count)}
              {generatedDay ? <> · {c.feed.updated.replace("{date}", dayLabel(generatedDay, lang))}</> : null}
            </p>
          </div>
          <PaperDigestFeed papers={papers} lang={lang} copy={c.feed} currentYear={currentYear} />
          <p className="pd-footnote">
            {c.feed.footnote}{" "}
            <a href={localizeHref(lang, "/paper-digest/feed.xml")}>{c.feed.rss}</a>
          </p>
        </section>
      </main>
    </SiteShell>
  );
}
