"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { localizeHref } from "@/content/helpers";

/* ==========================================================
   DemoChat — scripted replay of real HydroAgent sessions.
   No backend: the visitor advances a pre-recorded transcript
   turn by turn; assistant blocks stream in with a typewriter
   effect for text and staged reveal for tables/lists.
   ========================================================== */

const TYPE_INTERVAL_MS = 24;
const CHARS_PER_TICK = 1; // reveal 1 char/tick ≈ 42 chars/sec, ChatGPT-like pace
const BLOCK_PAUSE_TICKS = 14;
const THINKING_TICKS = 26;

const AGENT_AVATAR_SRC = "/assets/hydroagent-mark.svg";

/* Chat avatars shown beside each message bubble. */
function AgentAvatar() {
  return (
    <span className="demo-avatar demo-avatar-agent" aria-hidden="true">
      <img src={AGENT_AVATAR_SRC} alt="" />
    </span>
  );
}

function UserAvatar() {
  return (
    <span className="demo-avatar demo-avatar-user" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    </span>
  );
}

/* Inline renderer for **bold** and `code` spans. */
function InlineText({ text }) {
  const parts = useMemo(() => text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g), [text]);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return <code key={i}>{part.slice(1, -1)}</code>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

/* Character budget of a block, used to drive the typewriter. */
function blockLength(block) {
  switch (block.t) {
    case "p":
    case "h":
      return block.text.length;
    case "list":
    case "check":
      return block.items.join("").length;
    default:
      return 0; // tables, result cards & images reveal as a whole
  }
}

function sliceItems(items, budget) {
  const out = [];
  let left = budget;
  for (const item of items) {
    if (left <= 0) break;
    out.push(item.length <= left ? item : item.slice(0, left));
    left -= item.length;
  }
  return out;
}

/* Render one content block, optionally truncated to `budget` chars. */
function Block({ block, budget = Infinity }) {
  switch (block.t) {
    case "p": {
      const text = budget >= block.text.length ? block.text : block.text.slice(0, budget);
      return (
        <p className="demo-block-p">
          <InlineText text={text} />
        </p>
      );
    }
    case "h": {
      const text = budget >= block.text.length ? block.text : block.text.slice(0, budget);
      return <h4 className="demo-block-h">{text}</h4>;
    }
    case "list":
    case "check": {
      const items = budget === Infinity ? block.items : sliceItems(block.items, budget);
      return (
        <ul className={block.t === "check" ? "demo-block-check" : "demo-block-list"}>
          {items.map((item, i) => (
            <li key={i}>
              <InlineText text={item} />
            </li>
          ))}
        </ul>
      );
    }
    case "table":
      return (
        <div className="demo-block-table-wrap">
          <table className="demo-block-table">
            <thead>
              <tr>
                {block.head.map((cell, i) => (
                  <th key={i}>{cell}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "img":
      return (
        <figure className="demo-block-img">
          <img src={block.src} alt={block.alt || ""} loading="lazy" />
          {block.caption ? <figcaption>{block.caption}</figcaption> : null}
        </figure>
      );
    case "result":
      return (
        <div className="demo-block-result">
          <p className="demo-block-result-title">{block.title}</p>
          <dl>
            {block.items.map((item) => (
              <div key={item.label} className="demo-block-result-row">
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      );
    default:
      return null;
  }
}

function AssistantMessage({ blocks, visibleBlocks, charBudget, thinking, isStreaming }) {
  if (thinking) {
    return (
      <div className="demo-msg demo-msg-assistant">
        <span className="demo-typing" aria-label="typing">
          <i />
          <i />
          <i />
        </span>
      </div>
    );
  }
  return (
    <div
      className={`demo-msg demo-msg-assistant${isStreaming ? " is-streaming" : ""}`}
    >
      {blocks.slice(0, visibleBlocks).map((block, i) => (
        <Block
          key={i}
          block={block}
          budget={i === visibleBlocks - 1 ? charBudget : Infinity}
        />
      ))}
    </div>
  );
}

export function DemoChat({ content, lang = "en" }) {
  const scenarios = content.scenarios;
  const [scenarioId, setScenarioId] = useState(scenarios[0].id);
  const scenario = scenarios.find((s) => s.id === scenarioId) || scenarios[0];

  // Conversation progress within the active scenario.
  const [turnCount, setTurnCount] = useState(0); // completed turns
  const [stream, setStream] = useState(null); // { turn, block, chars, pause, thinking }
  const scrollRef = useRef(null);
  const timerRef = useRef(null);

  const resetScenario = useCallback((id) => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    setScenarioId(id);
    setTurnCount(0);
    setStream(null);
  }, []);

  const finished = turnCount >= scenario.turns.length && !stream;

  const sendNext = useCallback(() => {
    if (stream || turnCount >= scenario.turns.length) return;
    setStream({
      turn: turnCount,
      block: 0,
      chars: 0,
      pause: 0,
      thinking: THINKING_TICKS
    });
  }, [stream, turnCount, scenario]);

  const skip = useCallback(() => {
    if (!stream) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    setTurnCount(stream.turn + 1);
    setStream(null);
  }, [stream]);

  // Typewriter loop.
  useEffect(() => {
    if (!stream) return undefined;
    const blocks = scenario.turns[stream.turn].assistant;
    timerRef.current = setInterval(() => {
      setStream((prev) => {
        if (!prev) return prev;
        if (prev.thinking > 0) return { ...prev, thinking: prev.thinking - 1 };
        if (prev.pause > 0) return { ...prev, pause: prev.pause - 1 };
        const current = blocks[prev.block];
        const len = blockLength(current);
        if (prev.chars < len) {
          return { ...prev, chars: Math.min(prev.chars + CHARS_PER_TICK, len) };
        }
        if (prev.block + 1 < blocks.length) {
          return { ...prev, block: prev.block + 1, chars: 0, pause: BLOCK_PAUSE_TICKS };
        }
        return { ...prev, done: true };
      });
    }, TYPE_INTERVAL_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stream !== null, stream?.turn, scenarioId]);

  // Commit finished stream outside the reducer.
  useEffect(() => {
    if (stream?.done) {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
      setTurnCount(stream.turn + 1);
      setStream(null);
    }
  }, [stream]);

  // Follow the stream: keep the newest content in view.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [stream, turnCount, scenarioId]);

  const nextUserMessage =
    !finished && !stream ? scenario.turns[turnCount].user : null;

  return (
    <div className="demo-chat">
      <div className="demo-chat-toolbar">
        <span className="demo-replay-badge">
          <span className="demo-replay-dot" aria-hidden="true" />
          {content.replayBadge}
        </span>
      </div>

      <div className="demo-scenarios" role="tablist" aria-label={content.scenarioLabel}>
        {scenarios.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={s.id === scenarioId}
            className={`demo-scenario-tab ${s.id === scenarioId ? "is-active" : ""}`}
            onClick={() => resetScenario(s.id)}
          >
            <span className="demo-scenario-num" aria-hidden="true">
              {i + 1}
            </span>
            <span className="demo-scenario-body">
              <strong>{s.label}</strong>
              <span>{s.tagline}</span>
            </span>
          </button>
        ))}
        <a
          className="demo-scenario-tab demo-scenario-more"
          href={localizeHref(lang, content.ctaPath)}
        >
          <span className="demo-scenario-num" aria-hidden="true">
            +
          </span>
          <span className="demo-scenario-body">
            <strong>{content.moreLabel}</strong>
            <span>{content.moreTagline}</span>
          </span>
        </a>
      </div>

      <div className="demo-chat-window">
        <div className="demo-chat-scroll" ref={scrollRef}>
          {turnCount === 0 && !stream ? (
            <div className="demo-empty">
              <img
                className="demo-empty-logo"
                src={AGENT_AVATAR_SRC}
                alt="HydroAgent"
              />
              <p className="demo-empty-title">{scenario.label}</p>
              <p>{content.emptyHint}</p>
            </div>
          ) : null}

          {scenario.turns.slice(0, turnCount).map((turn, i) => (
            <div key={i} className="demo-turn">
              <div className="demo-row demo-row-user">
                <div className="demo-msg demo-msg-user">{turn.user}</div>
                <UserAvatar />
              </div>
              <div className="demo-row demo-row-assistant">
                <AgentAvatar />
                <AssistantMessage
                  blocks={turn.assistant}
                  visibleBlocks={turn.assistant.length}
                  charBudget={Infinity}
                />
              </div>
            </div>
          ))}

          {stream ? (
            <div className="demo-turn">
              <div className="demo-row demo-row-user">
                <div className="demo-msg demo-msg-user">
                  {scenario.turns[stream.turn].user}
                </div>
                <UserAvatar />
              </div>
              <div className="demo-row demo-row-assistant">
                <AgentAvatar />
                <AssistantMessage
                  blocks={scenario.turns[stream.turn].assistant}
                  visibleBlocks={stream.block + 1}
                  charBudget={stream.chars}
                  thinking={stream.thinking > 0}
                  isStreaming
                />
              </div>
            </div>
          ) : null}

          {finished ? (
            <div className="demo-end">
              <p>{content.endNote}</p>
              <div className="demo-end-actions">
                <button
                  type="button"
                  className="demo-end-replay"
                  onClick={() => resetScenario(scenarioId)}
                >
                  {content.replay}
                </button>
                <a
                  className="demo-end-cta"
                  href={localizeHref(lang, content.ctaPath)}
                >
                  {content.ctaButton}
                </a>
              </div>
              <p className="demo-end-cta-text">{content.ctaText}</p>
            </div>
          ) : null}
        </div>

        <div className="demo-input-bar">
          {stream ? (
            <>
              <span className="demo-input-status">{content.streaming}</span>
              <button type="button" className="demo-skip-btn" onClick={skip}>
                {content.skip}
              </button>
            </>
          ) : nextUserMessage ? (
            <>
              <button
                type="button"
                className="demo-input-suggestion"
                onClick={sendNext}
                title={nextUserMessage}
              >
                <span className="demo-input-hint">{content.inputHint}</span>
                <span className="demo-input-text">{nextUserMessage}</span>
              </button>
              <button type="button" className="demo-send-btn" onClick={sendNext}>
                {content.send}
                <span aria-hidden="true"> ↑</span>
              </button>
            </>
          ) : (
            <span className="demo-input-status">{content.endNote}</span>
          )}
        </div>
      </div>
    </div>
  );
}
