import Link from "next/link";
import { localizeHref } from "@/content/site";

export function CtaBand({ lang = "en", content }) {
  const cta = content.ui.cta;
  return (
    <section className="cta-band">
      <div className="cta-copy">
        {cta.eyebrow ? <p className="eyebrow">{cta.eyebrow}</p> : null}
        <h2>{cta.title}</h2>
        <p>{cta.text}</p>
      </div>
      <div className="cta-actions">
        <Link className="primary-action" href={localizeHref(lang, cta.primaryPath)}>
          {cta.primary}
        </Link>
        <Link className="secondary-action" href={localizeHref(lang, cta.secondaryPath)}>
          {cta.secondary}
        </Link>
      </div>
    </section>
  );
}
