"use client";

import { useMemo, useState } from "react";

export function CapabilityDirectory({ content }) {
  const page = content.capabilities;
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return page.items.filter((item) => {
      const categoryMatches = activeCategory === "all" || item.category === activeCategory;
      const searchableText = [
        item.title,
        item.summary,
        item.categoryLabel,
        item.stage,
        item.status,
        ...(item.tags || [])
      ]
        .join(" ")
        .toLowerCase();

      return categoryMatches && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
  }, [activeCategory, page.items, query]);

  return (
    <section className="capability-directory">
      <div className="capability-directory-head">
        <div>
          <p className="eyebrow">{page.directoryEyebrow}</p>
          <h2>{page.directoryTitle}</h2>
        </div>
        <label className="capability-search">
          <span>{page.searchLabel}</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={page.searchPlaceholder}
          />
        </label>
      </div>

      <div className="capability-filter-row" aria-label={page.filterLabel}>
        <button
          type="button"
          className={activeCategory === "all" ? "is-active" : ""}
          onClick={() => setActiveCategory("all")}
        >
          {page.allLabel}
        </button>
        {page.categories.map((category) => (
          <button
            type="button"
            key={category.id}
            className={activeCategory === category.id ? "is-active" : ""}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="capability-results">
        {filteredItems.map((item, index) => (
          <article className="capability-result" key={item.title}>
            <span className="capability-index">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <div className="capability-result-meta">
                <span>{item.categoryLabel}</span>
                <span>{item.stage}</span>
                <span>{item.status}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <div className="capability-tags">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredItems.length === 0 ? <p className="capability-empty">{page.emptyText}</p> : null}
    </section>
  );
}
