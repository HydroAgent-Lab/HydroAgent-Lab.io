"""Platform hero copy must stop changing once the viewport is wide enough.

Regression (found 2026-09-17): `.platform-hero-copy` carried BOTH the gutter
padding `max(28px, calc(50vw - 540px))` -- which grows without bound as the
viewport widens -- and `max-width: 620px`. Because `styles/base.css` sets a
global `* { box-sizing: border-box; }`, that 620px caps the *border box*, so the
padding was subtracted from it:

    text width = 620 - max(28, 50vw - 540) - 28

Past a 1136px viewport the text column shrank 1px for every 2px of extra
viewport width, reaching 0px at 2264px. Combined with the global
`overflow-wrap: break-word` in styles/responsive.css, the <h1> broke mid-word
("Hyd / roA / gent / -FF") on wide screens.

The fix follows the pattern already used by `.cta-band`/`.cta-copy` and
`.careers-frame`/`.careers-hero-inner`: the padded element carries no cap, and
an inner element carries the max-width.
"""

import re
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parents[1]
PLATFORM_CSS = ROOT / "styles" / "pages" / "platform.css"

# Viewport widths to probe. All are above the 900px mobile breakpoint, so the
# base rule (not the media-query override) is what applies.
VIEWPORTS = [1136, 1280, 1440, 1600, 1920, 2133, 2560, 3440]

# Below this viewport the gutter is still at its 28px floor and the layout is
# genuinely responsive; at and above it the layout must be frozen.
FREEZE_FROM = 1136


# --------------------------------------------------------------------------
# A deliberately tiny CSS length evaluator. It understands only the three
# constructs this codebase actually uses; anything else raises so that a silent
# pass is impossible.
# --------------------------------------------------------------------------

def _split_top_level(text, sep):
    parts, buf, depth = [], "", 0
    for ch in text:
        if ch == "(":
            depth += 1
        elif ch == ")":
            depth -= 1
        if ch == sep and depth == 0:
            parts.append(buf)
            buf = ""
        else:
            buf += ch
    parts.append(buf)
    return [p.strip() for p in parts if p.strip()]


def px(expr, viewport):
    """Resolve a CSS length expression to pixels at a given viewport width."""
    expr = expr.strip()

    m = re.fullmatch(r"max\((.+)\)", expr, re.S)
    if m:
        return max(px(p, viewport) for p in _split_top_level(m.group(1), ","))

    m = re.fullmatch(r"min\((.+)\)", expr, re.S)
    if m:
        return min(px(p, viewport) for p in _split_top_level(m.group(1), ","))

    m = re.fullmatch(r"calc\((.+)\)", expr, re.S)
    if m:
        return _eval_calc(m.group(1), viewport)

    m = re.fullmatch(r"(-?[\d.]+)px", expr)
    if m:
        return float(m.group(1))

    m = re.fullmatch(r"(-?[\d.]+)vw", expr)
    if m:
        return float(m.group(1)) / 100 * viewport

    if expr == "0":
        return 0.0

    raise ValueError(f"unsupported CSS length: {expr!r}")


def _eval_calc(body, viewport):
    tokens = re.split(r"\s+([+-])\s+", body.strip())
    total = px(tokens[0], viewport)
    for op, operand in zip(tokens[1::2], tokens[2::2]):
        total += px(operand, viewport) if op == "+" else -px(operand, viewport)
    return total


# --------------------------------------------------------------------------
# CSS parsing helpers
# --------------------------------------------------------------------------

def _strip_comments(css):
    """Remove /* ... */ so `_declaration` can step between declarations.

    Its `(?:^|;)\\s*prop\\s*:` scan cannot skip a comment sitting between two
    declarations; leaving comments in would make the lookup return None and the
    computed width silently wrong (i.e. a vacuously passing test).
    """
    return re.sub(r"/\*.*?\*/", "", css, flags=re.S)


def _strip_media_blocks(css):
    """Drop @media blocks so we only read the base (desktop) rules."""
    out, i = [], 0
    while True:
        m = re.compile(r"@media[^{]*\{").search(css, i)
        if not m:
            out.append(css[i:])
            return "".join(out)
        out.append(css[i:m.start()])
        depth, j = 1, m.end()
        while j < len(css) and depth:
            depth += {"{": 1, "}": -1}.get(css[j], 0)
            j += 1
        i = j


def _rule_body(css, selector):
    m = re.search(re.escape(selector) + r"\s*\{([^{}]*)\}", css)
    return m.group(1) if m else None


def _declaration(body, prop):
    m = re.search(rf"(?:^|;)\s*{re.escape(prop)}\s*:([^;]+)", body)
    return m.group(1).strip() if m else None


def _padding_left_right(body):
    """Return (left, right) padding expressions from the shorthand or longhands."""
    shorthand = _declaration(body, "padding")
    if shorthand:
        vals = _split_top_level(shorthand, " ")
        if len(vals) == 4:      # top right bottom left
            return vals[3], vals[1]
        if len(vals) == 3:      # top | right+left | bottom
            return vals[1], vals[1]
        if len(vals) == 2:      # top+bottom | right+left
            return vals[1], vals[1]
        return vals[0], vals[0]
    left = _declaration(body, "padding-left") or "0"
    right = _declaration(body, "padding-right") or "0"
    return left, right


# --------------------------------------------------------------------------
# The measurement under test
# --------------------------------------------------------------------------

def text_width_at(viewport):
    """Rendered width of the hero text column, in px, at a given viewport.

    Models `box-sizing: border-box`: the element stretches to its container
    (the viewport) but is capped by its own max-width; padding then eats into
    that box. An optional inner wrapper applies a further cap.
    """
    css = _strip_media_blocks(_strip_comments(PLATFORM_CSS.read_text(encoding="utf-8")))

    outer = _rule_body(css, ".platform-hero-copy")
    assert outer is not None, "`.platform-hero-copy` rule not found"

    pad_left, pad_right = _padding_left_right(outer)
    box = float(viewport)
    outer_cap = _declaration(outer, "max-width")
    if outer_cap:
        box = min(box, px(outer_cap, viewport))

    width = box - px(pad_left, viewport) - px(pad_right, viewport)

    inner = _rule_body(css, ".platform-hero-copy-inner")
    if inner and _declaration(inner, "max-width"):
        width = min(width, px(_declaration(inner, "max-width"), viewport))

    return max(width, 0.0)


# --------------------------------------------------------------------------
# Tests
# --------------------------------------------------------------------------

def test_hero_text_never_shrinks_as_the_viewport_grows():
    widths = [(vw, text_width_at(vw)) for vw in VIEWPORTS]
    for (prev_vw, prev_w), (vw, w) in zip(widths, widths[1:]):
        assert w >= prev_w - 0.5, (
            f"hero text column shrank when the viewport widened: "
            f"{prev_w:.0f}px at {prev_vw}px viewport -> {w:.0f}px at {vw}px. "
            f"All measurements: {[(v, round(x)) for v, x in widths]}"
        )


def test_hero_layout_is_frozen_on_wide_viewports():
    """Past the freeze point the column must be pixel-identical everywhere."""
    frozen = [(vw, text_width_at(vw)) for vw in VIEWPORTS if vw >= FREEZE_FROM]
    reference = frozen[0][1]
    for vw, w in frozen:
        assert abs(w - reference) < 0.5, (
            f"hero text column changed width above {FREEZE_FROM}px: "
            f"{reference:.0f}px at {frozen[0][0]}px viewport -> {w:.0f}px at {vw}px"
        )


def test_hero_text_column_stays_readable():
    for vw in VIEWPORTS:
        w = text_width_at(vw)
        assert w >= 500, (
            f"hero text column is only {w:.0f}px wide at a {vw}px viewport; "
            f"long words wrap mid-word because styles/responsive.css sets "
            f"overflow-wrap: break-word"
        )


@pytest.mark.parametrize("css_path", sorted((ROOT / "styles").rglob("*.css")))
def test_no_rule_combines_a_growing_gutter_with_a_max_width(css_path):
    """Structural guard against reintroducing the same bug anywhere else.

    A rule may own the viewport-tracking gutter padding, or a max-width, but
    not both -- under border-box the padding is deducted from the cap, so the
    content collapses as the viewport grows. Put the cap on an inner element.
    """
    css = _strip_comments(css_path.read_text(encoding="utf-8"))
    for selector, body in re.findall(r"([^{}]+)\{([^{}]*)\}", css):
        selector = " ".join(selector.split())
        if selector.endswith(":root") or selector == ":root":
            continue  # custom-property declarations, not applied to one box
        if not re.search(r"calc\(\s*50vw\s*-\s*[\d.]+px\s*\)", body):
            continue
        if _declaration(body, "max-width"):
            pytest.fail(
                f"{css_path.relative_to(ROOT)}: rule `{selector}` combines the "
                f"viewport-tracking gutter padding with "
                f"max-width: {_declaration(body, 'max-width')}. Move the cap to "
                f"an inner element (see .cta-band/.cta-copy)."
            )
