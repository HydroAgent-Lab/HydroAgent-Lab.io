import { CtaBand } from "@/components/cta-band";
import { Hero } from "@/components/hero";
import { SectionHeader } from "@/components/section-header";
import { SiteShell } from "@/components/shell";
import { getSiteContent, localizeHref } from "@/content/site";

export function HomePageContent({ lang = "en" }) {
  const content = getSiteContent(lang);
  const page = content.home;

  return (
    <SiteShell lang={lang}>
      <main className="main-content">
        <Hero lang={lang} content={content} />

        <section className="content-section what-section-wrap">
          <div className="what-section">
            <SectionHeader
              eyebrow={page.whatSection.eyebrow}
              title={page.whatSection.title}
            />
            <div className="what-diagram">
              <img
                src={lang === "zh"
                  ? "/assets/assets/hydroagent_architecture_version1_zh.png"
                  : "/assets/assets/hydroagent_architecture_final_version1.svg"}
                alt={lang === "zh" ? "HydroAgent 架构图" : "HydroAgent architecture diagram"}
              />
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="flagship-wrapper">
            <SectionHeader
              eyebrow={page.flagshipSection.eyebrow}
              title={page.flagshipSection.title}
            />
            <div className="flagship-grid">
              <div className="flagship-copy">
                <p className="flagship-text">{page.flagshipSection.text}</p>
                <a className="flagship-cta" href={localizeHref(lang, page.flagshipSection.ctaPath)}>
                  {page.flagshipSection.cta} <span className="action-arrow">→</span>
                </a>
              </div>
              <div className="flagship-image">
                <img src="/assets/assets/hero-hydroagent-lab.png" alt="HydroAgent Lab" />
              </div>
            </div>
          </div>
        </section>

        <section className="content-section">
          <SectionHeader
            eyebrow={page.trustSection.eyebrow}
            title={page.trustSection.title}
          />
          <div className="evidence-grid">
            {page.trustSection.items.map((item, i) => {
              const labels = lang === "zh"
                ? ["真实流域验证", "独立事件校验", "多模型适配", "学术发表", "人类主权"]
                : ["Basin tested", "Validated results", "Multi-LLM ready", "Published research", "Human authority"];
              return (
                <article className={`evidence-card evidence-bg-${i}`} key={item.slice(0, 24)}>
                  <div className="evidence-overlay">
                    <h3 className="evidence-label">{labels[i]}</h3>
                    <p className="evidence-text">{item}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="content-section home-bottom-band">
          <SectionHeader
            eyebrow={page.whoSection.eyebrow}
            title={page.whoSection.title}
          />
          <div className="scroll-strip">
            {page.whoSection.items.map((item) => (
              <article className="scroll-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <CtaBand lang={lang} content={content} />
      </main>
    </SiteShell>
  );
}
