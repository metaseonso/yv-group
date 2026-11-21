"""Builds the YV agreement templates: an A4 PDF each in org-chart/docs/, and their text injected into
org-chart.html (<script type="application/json" id="docsdata">). Made from LTP's build/build.py, in English only.
Run: python "<Seonso PoV>/scripts/heavy.py" run --owner yv -- python org-chart/agreements/build.py"""
import html
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(__file__))
from data import DOCS  # noqa: E402
from playwright.sync_api import sync_playwright  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
CHART_DIR = os.path.dirname(HERE)
OUT = os.path.join(CHART_DIR, "docs")
PAGE = os.path.join(CHART_DIR, "org-chart.html")
VERSION = "0.2"


def e(s):
    return html.escape(s, quote=False)


CSS = """
@page { size: A4; margin: 20mm 18mm 22mm 18mm; }
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; font-family: 'EB Garamond', Garamond, 'Times New Roman', serif; font-size: 10.6pt; line-height: 1.45; color: #111; }
.cover { text-align: center; padding-top: 8mm; }
.wordmark { font-family: 'Geist', Arial, sans-serif; font-weight: 600; letter-spacing: .04em; font-size: 22pt; margin-bottom: 9mm; }
.wordmark span { font-weight: 400; letter-spacing: .5em; font-size: 7pt; color: #555; margin-left: 2mm; vertical-align: 2.4mm; }
.eyebrow { font-family: 'Geist', Arial, sans-serif; font-size: 7pt; letter-spacing: .24em; text-transform: uppercase; color: #6b6b6b; }
h1 { font-weight: 400; font-size: 27pt; letter-spacing: -.01em; margin: 3mm 0 0; line-height: 1.1; }
.subline { margin-top: 4mm; font-style: italic; font-size: 12pt; color: #555; }
.rule { border: 0; border-top: .6pt solid #111; margin: 8mm 0 0; }
.fields { display: grid; grid-template-columns: 1fr 1fr; column-gap: 10mm; margin-top: 2mm; text-align: left; }
.field { padding: 3.2mm 0 2.6mm; border-bottom: .4pt solid #cfcfcf; }
.field .lab { font-family: 'Geist', Arial, sans-serif; font-size: 6.6pt; letter-spacing: .14em; text-transform: uppercase; color: #6b6b6b; }
.field .line { height: 6mm; }
.field .val { font-size: 10pt; padding-top: 1.2mm; }
.lead { margin-top: 7mm; text-align: left; font-size: 10pt; color: #333; }
.cols { display: grid; grid-template-columns: 9mm 1fr; column-gap: 5mm; }
.ah { margin-top: 7mm; padding: 2mm 0; border-bottom: .4pt solid #9a9a9a; break-after: avoid; }
.ah .n { font-family: 'Geist', Arial, sans-serif; font-size: 7pt; font-weight: 600; padding-top: .6mm; }
.ah .t { font-family: 'Geist', Arial, sans-serif; font-size: 7.6pt; letter-spacing: .08em; text-transform: uppercase; font-weight: 600; }
.cl { padding: 2.4mm 0; border-bottom: .3pt solid #e2e2e2; break-inside: avoid; }
.cl .n { font-family: 'Geist', Arial, sans-serif; font-size: 7pt; color: #6b6b6b; padding-top: .9mm; font-variant-numeric: tabular-nums; }
.sign { break-before: page; }
.sign h2 { font-weight: 400; font-size: 18pt; margin: 2mm 0 0; }
.signgrid { display: grid; grid-template-columns: repeat(var(--n), 1fr); column-gap: 8mm; margin-top: 10mm; }
.sb { border-top: .6pt solid #111; padding-top: 3mm; }
.sb .role { min-height: 12mm; font-family: 'Geist', Arial, sans-serif; font-size: 7.2pt; letter-spacing: .08em; text-transform: uppercase; font-weight: 600; }
.sb .role i { font-family: 'EB Garamond', serif; text-transform: none; letter-spacing: 0; font-weight: 400; color: #6b6b6b; font-size: 9pt; }
.sb .sig { height: 22mm; border-bottom: .4pt solid #9a9a9a; }
.sb .ln { border-bottom: .4pt solid #9a9a9a; height: 8mm; }
.sb .lb { font-family: 'Geist', Arial, sans-serif; font-size: 6.4pt; letter-spacing: .12em; text-transform: uppercase; color: #6b6b6b; margin-top: 1mm; }
.note { margin-top: 8mm; font-size: 9.4pt; color: #333; }
"""

FONTS = ('<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400'
         '&family=Geist:wght@400;600&display=swap">')


def field_html(d, name):
    val = '<div class="line"></div>'
    if name == "Agreement No.":
        val = f'<div class="val">{d["code"]} / ______ / ______</div>'
    if name == "Chart version":
        val = f'<div class="val">{VERSION}</div>'
    return f'<div class="field"><div class="lab">{e(name)}</div>{val}</div>'


def signer_html(role, line):
    party = role.startswith("For ")
    contact = ("Official email", "Office address") if role == "For YV" else ("Registered email", "Address")
    rows = ["Name"] + (["Title"] if party else []) + ["Date", contact[0], contact[1]]
    lines = "".join(f'<div class="ln"></div><div class="lb">{e(r)}</div>' for r in rows)
    return f'<div class="sb"><div class="role">{e(role)} <i>/ {e(line)}</i></div><div class="sig"></div><div class="lb">Signature</div>{lines}</div>'


def render_html(d):
    fields = [field_html(d, f) for f in d["fields"]]
    if len(fields) % 2:
        fields.append('<div class="field" style="border-color:transparent"></div>')
    parts = [f'''<section class="cover"><div class="wordmark">YV<span>GROUP</span></div>
<div class="eyebrow">Template agreement &middot; {e(d["code"])}</div>
<h1>{e(d["title"])}</h1><div class="subline">{e(d["sub"])}</div>
<hr class="rule"><div class="fields">{"".join(fields)}</div>
<div class="lead">{e(d["summary"])}</div></section>''']
    for k, (title, rows) in enumerate(d["articles"], 1):
        clauses = "".join(f'<div class="cols cl"><div class="n">{k}.{i}</div><div>{e(c)}</div></div>' for i, c in enumerate(rows, 1))
        parts.append(f'<div class="cols ah"><div class="n">{k}</div><div class="t">Article {k} &mdash; {e(title)}</div></div>{clauses}')
    signers = d["signers"]
    att = f'<div class="note">{e(d["attachment"])}</div>' if d.get("attachment") else ""
    parts.append(f'''<section class="sign"><div class="eyebrow">Signing</div><h2>{e(d["title"])}</h2>
<div class="note">{e(d["articles"][-1][1][-1])}</div>
<div class="signgrid" style="--n:{len(signers)}">{"".join(signer_html(r, ln) for r, ln in signers)}</div>{att}</section>''')
    return f'<!doctype html><html><head><meta charset="utf-8">{FONTS}<style>{CSS}</style></head><body>{"".join(parts)}</body></html>'


def footer(d):
    return f'''<div style="width:100%;font-family:Arial,sans-serif;font-size:6.5pt;letter-spacing:.12em;color:#7a7a7a;padding:0 18mm;display:flex;justify-content:space-between;text-transform:uppercase">
<span>YV Group &middot; {d["code"]} &middot; {e(d["title"])}</span>
<span>Chart v{VERSION} &nbsp;&middot;&nbsp; <span class="pageNumber"></span> / <span class="totalPages"></span></span></div>'''


def page_entry(d):
    return {"id": d["id"], "code": d["code"], "title": d["title"], "sub": d["sub"], "summary": d["summary"],
            "articles": [{"t": t, "c": rows} for t, rows in d["articles"]],
            "pdf": f'{d["id"]}.pdf', "download": f'YV {d["title"]}.pdf'}


def inject(entries):
    text = open(PAGE, encoding="utf-8").read()
    data = json.dumps(entries, ensure_ascii=False).replace("</", "<\\/")
    new, n = re.subn(r'(<script type="application/json" id="docsdata">).*?(</script>)',
                     lambda m: m.group(1) + data + m.group(2), text, flags=re.S)
    if n != 1:
        raise SystemExit(f"org-chart.html: expected one docsdata script, found {n}")
    open(PAGE, "w", encoding="utf-8").write(new)


def main():
    os.makedirs(OUT, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch()
        pg = browser.new_page()
        for d in DOCS:
            pg.set_content(render_html(d), wait_until="networkidle")
            pg.evaluate("document.fonts.ready")
            pg.pdf(path=os.path.join(OUT, f'{d["id"]}.pdf'), format="A4", print_background=True,
                   display_header_footer=True, header_template="<span></span>", footer_template=footer(d),
                   prefer_css_page_size=True)
        browser.close()
    inject([page_entry(d) for d in DOCS])
    print("ok", [f'{d["id"]}.pdf' for d in DOCS])


if __name__ == "__main__":
    main()
