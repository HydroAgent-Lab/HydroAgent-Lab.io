import { PaperDigestFeed } from "@/components/paper-digest-feed";
import { SiteShell } from "@/components/shell";
import { SubscribeForm } from "@/components/subscribe-form";
import { SubscribedNotice } from "@/components/subscribed-notice";
import { paperDigestContent, paperDigestEndpoints } from "@/content/pages/paper-digest";
import { localizeHref } from "@/content/helpers";
import { loadPaperDigest } from "@/lib/load-paper-digest";
import { dayLabel, latestEdition, localizeDigest } from "@/lib/paper-digest.mjs";

const plural = (forms, n) => (n === 1 ? forms.one : forms.other).replace("{n}", String(n));

// One page in three parts: the hero (what the digest is, the latest edition
// and the two actions), every public paper read from papers.json at build
// time, and the navy sign-up band. Only the page language's text is passed
// to the client feed.
export function PaperDigestPageContent({ lang = "en" }) {
  const c = paperDigestContent[lang] || paperDigestContent.en;
  const data = localizeDigest(loadPaperDigest(), lang);
  const papers = data.papers;
  const count = String(papers.length);
  const edition = latestEdition(papers);
  // generated_at is not shown: it changes on every export even when no paper
  // does (DESIGN_SUMMARY §5.8). The latest edition dates the page instead.
  const currentYear = edition ? Number(edition.day.slice(0, 4)) : new Date().getUTCFullYear();
  const facts = c.lead.facts.map((fact) => ({ ...fact, value: fact.value.replace("{count}", count) }));

  return (
    <SiteShell lang={lang}>
      {/* The shell sets no lang and <html> is always "en", so /zh marks its copy here. */}
      <main className="main-content paper-digest-page" lang={lang === "zh" ? "zh-CN" : undefined}>
        <SubscribedNotice text={c.subscribed} />
        <section className="pd-hero" aria-labelledby="pd-hero-title">
          <div className="pd-hero-copy">
            <p className="eyebrow">{c.lead.eyebrow}</p>
            <h1 id="pd-hero-title">
              {c.lead.title.before}
              <span className="pd-hero-accent">{c.lead.title.accent}</span>
              {c.lead.title.after}
            </h1>
            <p className="pd-hero-text">{c.lead.text}</p>
            <div className="pd-hero-actions">
              <a className="secondary-action" href="#latest">
                {c.lead.explore} <span aria-hidden="true">↓</span>
              </a>
              <a className="primary-action" href="#subscribe">
                {c.lead.subscribe}
              </a>
            </div>
          </div>
          <aside className="pd-edition" aria-labelledby="pd-edition-label">
            <p className="pd-edition-label" id="pd-edition-label">
              {c.lead.edition}
            </p>
            {edition ? (
              <>
                <p className="pd-edition-day">
                  <time dateTime={edition.day}>{dayLabel(edition.day, lang)}</time>
                </p>
                <p className="pd-edition-count">{plural(c.feed.weekCount, edition.count)}</p>
              </>
            ) : null}
            <dl className="pd-edition-stats">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </section>
        <section className="content-section pd-section" id="latest" aria-labelledby="pd-feed-title">
          <div className="pd-head">
            <h2 id="pd-feed-title">{c.feed.title}</h2>
            <p>
              {c.feed.intro.replace("{count}", count)}
              {edition ? (
                <>
                  {" · "}
                  <span className="pd-nowrap">{c.feed.latest.replace("{date}", dayLabel(edition.day, lang))}</span>
                </>
              ) : null}
            </p>
          </div>
          <p className="pd-ai-note">{c.feed.aiNote}</p>
          <PaperDigestFeed papers={papers} aliases={data.aliases} lang={lang} copy={c.feed} currentYear={currentYear} />
          <p className="pd-footnote">
            {c.feed.footnote}{" "}
            <a href={localizeHref(lang, "/paper-digest/feed.xml")}>{c.feed.rss}</a>
          </p>
        </section>
        <div className="pd-subscribe-wrap">
          <section id="subscribe" className="pd-subscribe" aria-labelledby="pd-subscribe-title">
            <div>
              <p className="eyebrow">{c.subscribeBand.eyebrow}</p>
              <h2 id="pd-subscribe-title">{c.subscribeBand.title}</h2>
            </div>
            <div>
              <SubscribeForm lang={lang} copy={c.form} endpoints={paperDigestEndpoints} />
              <details className="pd-privacy">
                <summary>{c.privacy.summary}</summary>
                <ul>
                  {c.privacy.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </details>
            </div>
          </section>
        </div>
      </main>
    </SiteShell>
  );
}
