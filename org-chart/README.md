# org-chart

| What | Where |
|---|---|
| Rules (source of truth) | `ORG-CHART.md` |
| The page | `org-chart.html`, published to https://claude.ai/code/artifact/8fb6755f-443d-4ddd-98c9-5070d8ddf3a0 (anyone with the link) |
| Made from | `Desktop\ltp-daily\org-chart\ORG-CHART.md` v1.0 |
| Agreement texts | `agreements/data.py` (English, international) |
| Formal copies | `docs/partner.pdf`, `docs/share.pdf`, `docs/residency.pdf`, published with the page |
| Builder | `agreements/build.py`: writes the PDFs and puts the texts into the page |

When a rule changes: edit `ORG-CHART.md`, then the same words in `org-chart.html`, then republish the page to the same URL with the three PDFs as `files`. When an agreement changes: edit `agreements/data.py`, run `python "<Seonso PoV>/scripts/heavy.py" run --owner yv -- python org-chart/agreements/build.py`, then republish.
