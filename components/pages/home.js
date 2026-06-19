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

        <section className="content-section home-alt-bg">
          <div className="what-section">
            <SectionHeader
              eyebrow={page.whatSection.eyebrow}
              title={page.whatSection.title}
            />
            <div className="what-diagram">
              <img
                src="/assets/hydroagent_architecture_final.svg"
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
                <img src="https://images.unsplash.com/photo-1446776858070-70c3d5ed6758?w=720&h=600&fit=crop&crop=center" alt="Flood forecasting operations" />
              </div>
            </div>
          </div>
        </section>

        <section className="content-section home-alt-bg">
          <SectionHeader
            eyebrow={page.trustSection.eyebrow}
            title={page.trustSection.title}
          />
          <div className="flip-grid">
            {page.trustSection.items.map((item, i) => {
              const labels = lang === "zh"
                ? ["真实流域验证", "独立事件校验", "多模型适配", "学术发表", "人类主权"]
                : ["Basin tested", "Validated results", "Multi-model ready", "Published research", "Human authority"];
              return (
                <article className="flip-card" key={item.slice(0, 24)}>
                  <div className="flip-card-inner">
                    <div className={`flip-card-front flip-bg-${i}`}>
                      <h3>{labels[i]}</h3>
                      <span className="flip-arrow" aria-hidden="true">→</span>
                    </div>
                    <div className="flip-card-back"><p>{item}</p></div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="content-section">
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
