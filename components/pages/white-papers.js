import { CtaBand } from "@/components/cta-band";
import { PageLead } from "@/components/page-lead";
import { SectionHeader } from "@/components/section-header";
import { SiteShell } from "@/components/shell";
import { getSiteContent } from "@/content/site";

function getWhitePaperFollowSocial(content, lang) {
  const socials = content.ui.social || [];
  if (lang === "zh") {
    return socials.find((s) => s.label.includes("微信")) || socials[0];
  }
  return socials.find((s) => s.label === "LinkedIn") || socials[0];
}

function renderStatusText(text, followLabel, followSocial) {
  if (!followSocial || !text.includes(followLabel)) {
    return text;
  }

  const [before, after] = text.split(followLabel);
  return (
    <>
      {before}
      <a className="wp-status-social-link" href={followSocial.href} target="_blank" rel="noreferrer">
        {followLabel}
      </a>
      {after}
    </>
  );
}

// Publication layout — the page is the report. Hallmark Split Studio, adapted:
// the hero is a diptych (cover | title and actions); everything below sits in
// one reading column on the hero's text axis. Split Studio alternates halves all
// the way down, but the conclusions are continuous prose, and halving attention
// on prose is exactly what that macrostructure warns against.
function WhitePaperPublication({ paper, cadence }) {
  const full = paper.links.find((link) => link.id === "full");
  const brief = paper.links.find((link) => link.id === "brief");
  const soon = paper.links.filter((link) => link.comingSoon);
  const doiHref = `https://doi.org/${paper.doi}`;

  return (
    <>
      <section className="wp-pub-hero">
        <div className="wp-pub-grid wp-pub-hero-grid">
          {/* Same target as the primary button beside it, so it is taken out of
              the tab order and the accessibility tree — one stop, not two. The
              cover is the LCP element: eager, high priority, never lazy. */}
          <a
            className="wp-pub-cover"
            href={full.href}
            target="_blank"
            rel="noreferrer"
            tabIndex={-1}
            aria-hidden="true"
          >
            <img
              src={paper.coverSrc}
              alt={paper.coverAlt}
              width={paper.coverWidth}
              height={paper.coverHeight}
              fetchPriority="high"
              decoding="async"
            />
          </a>

          {/* The shell sets no lang and the root <html> is always "en", even on
              /zh — so the Chinese title is marked for screen readers here. */}
          <div className="wp-pub-head">
            <h1 lang="zh-CN">
              {paper.titleLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
            <p className="wp-pub-subtitle" lang="zh-CN">{paper.subtitle}</p>
            <p className="wp-pub-byline">{paper.byline}</p>
          </div>

          <div className="wp-pub-body">
            <p className="wp-pub-summary">{paper.summary}</p>

            <div className="wp-pub-actions">
              <a className="primary-action" href={full.href} target="_blank" rel="noreferrer">
                {paper.linkLabels.full} <span className="action-arrow" aria-hidden="true">↗</span>
              </a>
              {/* Opens in the browser's PDF viewer rather than downloading:
                  readers asked to read it in one click (2026-10-10). */}
              <a className="secondary-action" href={brief.href} target="_blank" rel="noreferrer">
                {paper.linkLabels.brief} <span className="action-arrow" aria-hidden="true">↗</span>
              </a>
              {/* Not a link: an anchor with no target is a dead end for keyboard
                  and screen-reader users. It becomes one once the file exists. */}
              {soon.map((link) => (
                <span className="wp-pub-soon" key={link.id}>
                  {paper.linkLabels[link.id]}
                  <span className="wp-pub-soon-tag">{paper.comingSoonLabel}</span>
                </span>
              ))}
            </div>

            <ul className="wp-pub-meta">
              <li>{paper.version}</li>
              <li>{paper.released}</li>
              <li>{paper.evidenceTo}</li>
              <li>
                <a href={doiHref} target="_blank" rel="noreferrer">DOI {paper.doi}</a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="wp-pub-section wp-pub-findings">
        <div className="wp-pub-grid">
          <div className="wp-pub-col">
            <h2>{paper.findingsTitle}</h2>
            <p className="wp-pub-note">{paper.findingsNote}</p>
            {/* An <ol> already announces "1 of 3" — the drawn numeral is for the
                eye only, so it is hidden from screen readers. */}
            <ol className="wp-pub-findings-list">
              {paper.sections.map((section, i) => (
                <li key={section.label}>
                  <h3>
                    <span className="wp-pub-findings-num" aria-hidden="true">{i + 1}</span>
                    {section.label}
                  </h3>
                  <p>{section.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="wp-pub-section wp-pub-colophon">
        <div className="wp-pub-grid">
          <div className="wp-pub-col">
            <h2>{paper.colophonTitle}</h2>
            <dl className="wp-pub-facts">
              {paper.colophon.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
              <div>
                <dt>{paper.planLabel}</dt>
                <dd>
                  <ul className="wp-pub-plan">
                    {cadence.items.map((item) => (
                      <li key={item.label}>
                        <strong>{item.label}</strong>
                        {item.text.trim()}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt>{paper.citeLabel}</dt>
                <dd lang="zh-CN">
                  {paper.citation}{" "}
                  <a href={doiHref} target="_blank" rel="noreferrer">{doiHref}</a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}

export function WhitePapersPageContent({ lang = "en" }) {
  const content = getSiteContent(lang);
  const c = content.whitePapers;
  const followLabel = lang === "zh" ? "关注我们" : "Follow us";
  const followSocial = getWhitePaperFollowSocial(content, lang);
  // Only the featured release renders. An archive list for later issues is
  // designed when the second one exists — until then a non-featured entry in
  // `papers` would not appear.
  const featuredPaper = c.papers.find((paper) => paper.featured);

  return (
    <SiteShell lang={lang}>
      <main className="main-content white-papers-page">
        {featuredPaper ? (
          <WhitePaperPublication paper={featuredPaper} cadence={c.cadenceSection} />
        ) : (
          <>
            {/* A — Hero */}
            <PageLead
              eyebrow={c.lead.eyebrow}
              title={c.lead.title}
              text={c.lead.text}
              facts={c.lead.facts}
            />

            {/* B — Archive, empty until the first release in this language */}
            <section className="content-section wp-archive-section">
              <SectionHeader
                eyebrow={c.releasesSection.eyebrow}
                title={c.releasesSection.title}
              />
              <div className="wp-empty">
                <strong>{c.status.title}</strong>
                <p>{renderStatusText(c.status.text, followLabel, followSocial)}</p>
              </div>
            </section>

            {/* C — Cadence */}
            <section className="content-section">
              <SectionHeader
                eyebrow={c.cadenceSection.eyebrow}
                title={c.cadenceSection.title}
              />
              <div className="wp-cadence-list">
                {c.cadenceSection.items.map((item) => (
                  <article className="wp-cadence-item" key={item.label}>
                    <h3>{item.label}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}

        {/* D — CTA (site-wide) */}
        <CtaBand lang={lang} content={content} />
      </main>
    </SiteShell>
  );
}
