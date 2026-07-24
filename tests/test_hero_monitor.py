from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def test_hero_webui_is_presented_in_a_standless_monitor_frame():
    hero = (ROOT / "components" / "hero.js").read_text(encoding="utf-8")
    styles = (ROOT / "styles" / "hero.css").read_text(encoding="utf-8")

    assert 'className="hero-monitor"' in hero
    assert 'className="hero-video-bg"' in hero
    assert ".hero-monitor {" in styles
    assert "border:" in styles
    assert "border-radius:" in styles
    assert "box-shadow:" in styles
    assert (
        "padding: clamp(1px, 0.12vw, 2px) clamp(1px, 0.12vw, 2px) "
        "clamp(2px, 0.2vw, 3px);"
    ) in styles
    assert "monitor-stand" not in hero + styles
    assert "monitor-base" not in hero + styles
