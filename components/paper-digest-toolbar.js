"use client";

import { GRANULARITIES, TYPES, groupLabel, plural } from "@/lib/paper-digest.mjs";
import { CalendarIcon, FilterIcon } from "./icons";
import { ToolbarPanel } from "./paper-digest-panel";

const TYPE_OPTIONS = ["all", ...TYPES];

// A labelled select whose first option, `all`, lifts the restriction (value
// ""). `nameOf` gives each key's label.
function SelectField({ label, all, value, options, nameOf, onSelect }) {
  return (
    <label className="pd-field">
      <span>{label}</span>
      <select value={value} onChange={(event) => onSelect(event.target.value)}>
        <option value="">{all}</option>
        {options.map((key) => (
          <option key={key} value={key}>
            {nameOf(key)}
          </option>
        ))}
      </select>
    </label>
  );
}

// Search, then Time and edition, then Filters (Domain and Method). Each
// button's summary names what its panel has in force, so nothing a panel
// holds is out of sight; every change in a panel applies at once. Filters is
// left out while no paper has a Domain or a Method: `taxonomy` is
// taxonomyOptions(papers), the values in use.
export function PaperDigestToolbar({ copy, lang, currentYear, filters, editions, taxonomy, count, onChange }) {
  const summary = [
    copy.granularities[filters.granularity],
    filters.edition ? groupLabel(filters.edition, filters.granularity, lang, currentYear) : copy.allEditions,
    filters.type !== "all" ? copy.filters[filters.type] : "",
    filters.savedOnly ? copy.savedOnlyShort : ""
  ]
    .filter(Boolean)
    .join(" · ");
  const names = copy.taxonomy;
  const topicNames = [filters.domain && names.domains[filters.domain], filters.method && names.methods[filters.method]].filter(Boolean);
  const topicsSummary = topicNames.join(" · ") || copy.topics.label;
  const hasTopics = taxonomy.domains.length > 0 || taxonomy.methods.length > 0;

  return (
    <div className="pd-toolbar">
      <div className="pd-search">
        <input
          name="q"
          type="search"
          value={filters.query}
          onChange={(event) => onChange({ query: event.target.value })}
          placeholder={copy.searchPlaceholder}
          aria-label={copy.searchLabel}
          autoComplete="off"
          spellCheck={false}
        />
      </div>
      <div className="pd-toolbar-buttons">
        <ToolbarPanel className="pd-time" label={copy.timeLabel} summary={summary} icon={<CalendarIcon className="pd-time-icon" />} doneLabel={copy.done}>
          <div className="pd-filter" role="group" aria-label={copy.granularityLabel}>
            {GRANULARITIES.map((value) => (
              <button
                key={value}
                type="button"
                className="pd-filter-option"
                aria-pressed={filters.granularity === value}
                onClick={() => onChange({ granularity: value, edition: "" })}
              >
                {copy.granularities[value]}
              </button>
            ))}
          </div>
          <SelectField
            label={copy.editionLabel}
            all={copy.allEditions}
            value={filters.edition}
            options={editions}
            nameOf={(key) => groupLabel(key, filters.granularity, lang, currentYear)}
            onSelect={(edition) => onChange({ edition })}
          />
          <label className="pd-field">
            <span>{copy.filterLabel}</span>
            <select value={filters.type} onChange={(event) => onChange({ type: event.target.value })}>
              {TYPE_OPTIONS.map((value) => (
                <option key={value} value={value}>
                  {copy.filters[value]}
                </option>
              ))}
            </select>
          </label>
          <label className="pd-check">
            <input type="checkbox" checked={filters.savedOnly} onChange={(event) => onChange({ savedOnly: event.target.checked })} />
            {copy.savedOnly}
          </label>
          <p className="pd-panel-count">{plural(copy.count, count)}</p>
        </ToolbarPanel>
        {hasTopics ? (
          <ToolbarPanel
            className="pd-time pd-topics"
            label={copy.topics.label}
            summary={topicsSummary}
            badge={topicNames.length}
            icon={<FilterIcon className="pd-time-icon" />}
            doneLabel={copy.done}
          >
            <SelectField
              label={copy.topics.domain}
              all={copy.topics.allDomains}
              value={filters.domain}
              options={taxonomy.domains}
              nameOf={(id) => names.domains[id]}
              onSelect={(domain) => onChange({ domain })}
            />
            <SelectField
              label={copy.topics.method}
              all={copy.topics.allMethods}
              value={filters.method}
              options={taxonomy.methods}
              nameOf={(id) => names.methods[id]}
              onSelect={(method) => onChange({ method })}
            />
            <p className="pd-panel-count">{plural(copy.count, count)}</p>
          </ToolbarPanel>
        ) : null}
      </div>
    </div>
  );
}
