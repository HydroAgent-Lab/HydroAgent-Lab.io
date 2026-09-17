"""The hero screenshot is a frameless, notched rectangle -- not a monitor bezel.

History: this file used to assert a "standless monitor frame" (border,
border-radius, box-shadow and a clamp() bezel padding). The design has since
moved to a frameless treatment: the screenshot itself is clipped into a
notched rectangle (top-left and bottom-right corners cut at 45 degrees) and the
drop shadow is a `filter`, because `box-shadow` traces the element's box rather
than the chamfered outline. The old assertions were updated on 2026-09-17 --
two of them had been failing, and two more were passing only by accident
(they searched the whole 550-line stylesheet for "border:" / "border-radius:",
which still occur in unrelated rules, while asserting the opposite of the
frameless design).

Assertions here are scoped to the `.hero-monitor` rule body for that reason.
"""

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HERO_JS = ROOT / "components" / "hero.js"
HERO_CSS = ROOT / "styles" / "hero.css"


def read_css():
    """hero.css with comments stripped.

    Comments sit between declarations in this file, and a bare
    `(?:^|;)\\s*prop\\s*:` scan cannot step over them -- leaving them in makes
    `declaration()` silently return None and the assertions vacuously wrong.
    """
    return re.sub(r"/\*.*?\*/", "", HERO_CSS.read_text(encoding="utf-8"), flags=re.S)


def rule_body(css, selector):
    """Body of the first rule whose selector is exactly `selector`.

    Anchored on `\\s*{` so `.hero-monitor` does not also match
    `.hero-monitor-wrap` or `.hero-monitor::after`.
    """
    m = re.search(re.escape(selector) + r"\s*\{([^{}]*)\}", css)
    assert m is not None, f"no `{selector} {{ ... }}` rule in {HERO_CSS.name}"
    return m.group(1)


def declaration(body, prop):
    m = re.search(rf"(?:^|;)\s*{re.escape(prop)}\s*:([^;]+)", body)
    return m.group(1).strip() if m else None


def test_hero_markup_wires_up_the_notched_screenshot():
    hero = HERO_JS.read_text(encoding="utf-8")

    assert 'className="hero-monitor"' in hero
    assert 'className="hero-video-bg"' in hero

    # The frame used to be drawn as a monitor with a stand; both are gone.
    css = HERO_CSS.read_text(encoding="utf-8")
    assert "monitor-stand" not in hero + css
    assert "monitor-base" not in hero + css


def test_hero_monitor_is_frameless():
    """No bezel: the screenshot sits directly on the page, unframed.

    Scoped to the rule body -- a file-wide substring search would pass on
    unrelated rules and silently stop protecting this decision.
    """
    body = rule_body(read_css(), ".hero-monitor")

    for prop in ("border", "border-radius", "padding"):
        assert declaration(body, prop) is None, (
            f"`.hero-monitor` is meant to be frameless but declares "
            f"{prop}: {declaration(body, prop)}"
        )


def test_hero_monitor_shadow_is_a_filter_not_a_box_shadow():
    """`box-shadow` traces the element box, so it would cut across the
    chamfered corners instead of following them. The shadow must stay a
    `filter: drop-shadow(...)`."""
    body = rule_body(read_css(), ".hero-monitor")

    filter_value = declaration(body, "filter")
    assert filter_value is not None and "drop-shadow(" in filter_value, (
        "`.hero-monitor` must cast its shadow with filter: drop-shadow(...)"
    )
    assert declaration(body, "box-shadow") is None, (
        "box-shadow would square off the chamfered corners; use "
        "filter: drop-shadow(...) instead"
    )


def test_all_three_layers_share_the_same_notched_clip_path():
    """The screenshot, the colour wash and the edge beams are separate layers
    stacked on top of each other. They must be clipped to the *same* notched
    polygon, otherwise the overlays ride edges the screenshot does not have."""
    css = read_css()

    assert re.search(r"--cut:\s*[^;]+;", css), (
        "the chamfer size must stay a `--cut` custom property"
    )

    layers = [".hero-video-bg", ".hero-monitor::after", ".hero-monitor::before"]
    clips = {}
    for selector in layers:
        clip = declaration(rule_body(css, selector), "clip-path")
        assert clip is not None and clip.startswith("polygon("), (
            f"`{selector}` must be clipped to the notched polygon"
        )
        assert "var(--cut)" in clip, (
            f"`{selector}` must size its chamfer from var(--cut)"
        )
        clips[selector] = " ".join(clip.split())

    distinct = set(clips.values())
    assert len(distinct) == 1, (
        "the three stacked layers drifted apart and no longer share one "
        f"clip-path: {clips}"
    )


def test_edge_beam_animation_respects_reduced_motion():
    """The edge beams loop forever; they must be switchable off."""
    css = read_css()

    body = rule_body(css, ".hero-monitor::before")
    assert declaration(body, "animation") is not None, (
        "`.hero-monitor::before` is the animated edge beam"
    )

    m = re.search(
        r"@media[^{]*prefers-reduced-motion[^{]*\{(.*?)\n\}", css, re.S
    )
    assert m is not None, "no prefers-reduced-motion block in hero.css"
    assert declaration(rule_body(m.group(1), ".hero-monitor::before"),
                       "animation") == "none", (
        "the edge-beam animation must be disabled under "
        "prefers-reduced-motion: reduce"
    )
