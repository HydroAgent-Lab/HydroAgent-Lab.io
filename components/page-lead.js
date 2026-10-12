// `actions` is optional and renders under the title; the page passes its own
// wrapper and styles it, so pages that omit it render exactly as before.
export function PageLead({ eyebrow, title, text, facts = [], actions = null }) {
  return (
    <section className="page-lead">
      <div className="page-lead-main">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {actions}
      </div>
      <div className="page-lead-side">
        {text ? <p>{text}</p> : null}
        {facts.length ? (
          <div className="page-lead-facts">
            {facts.map((fact) => (
              <article key={fact.label} className="page-lead-fact">
                <span>{fact.label}</span>
                <strong>{fact.value}</strong>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
