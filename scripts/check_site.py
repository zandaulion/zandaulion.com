"""Check local links and the privacy URLs registered with Google Play.

Run: python scripts/check_site.py [--url http://127.0.0.1:8765]
"""
import argparse
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
from urllib.request import urlopen

ROOT = Path(__file__).resolve().parents[1]
# Public URL contract: never rename or move these notices.
PRIVACY_PATHS = (
    "bitey-privacy.html",
    "bpdigitizer-privacy.html",
    "gravitygarden-privacy.html",
    "gravitytdg-privacy.html",
    "gravitywarp-privacy.html",
    "orbitpuzzles-privacy.html",
    "palebluedot-privacy.html",
    "plate-privacy.html",
)


class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.targets = []
        self.ids = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids.append(attrs["id"])
        for attr in ("href", "src"):
            if attr in attrs:
                self.targets.append(attrs[attr])


def check(base_url=None):
    errors = []
    pages = sorted(ROOT.glob("*.html"))
    for route in PRIVACY_PATHS:
        if not (ROOT / route).is_file():
            errors.append(f"Missing established privacy URL: /{route}")
    for page in pages:
        parser = Links()
        parser.feed(page.read_text(encoding="utf-8"))
        # Published vendor-generated notice markup is intentionally preserved.
        if page.name not in PRIVACY_PATHS and len(parser.ids) != len(set(parser.ids)):
            errors.append(f"{page.name}: duplicate element IDs")
        for target in parser.targets:
            url = urlsplit(target)
            if url.scheme or url.netloc or not url.path:
                continue
            resolved = ROOT / unquote(url.path.lstrip("/"))
            if not resolved.exists():
                errors.append(f"{page.name}: missing target {target}")
        if base_url:
            try:
                with urlopen(base_url.rstrip("/") + "/" + page.name, timeout=10) as response:
                    content = response.read()
                    if response.status != 200:
                        errors.append(f"{page.name}: HTTP {response.status}")
                    if page.name in PRIVACY_PATHS and content != page.read_bytes():
                        errors.append(f"{page.name}: served notice differs from the local file")
            except Exception as exc:
                errors.append(f"{page.name}: {exc}")
    if errors:
        raise SystemExit("\n".join(errors))
    print(f"PASS: {len(pages)} pages, local links, and all {len(PRIVACY_PATHS)} established privacy paths.")
    if base_url:
        print("PASS: all pages return HTTP 200; served privacy notices match their source files.")


if __name__ == "__main__":
    args = argparse.ArgumentParser(description=__doc__)
    args.add_argument("--url", help="Optional running preview URL")
    check(args.parse_args().url)
