---
name: project-lamit-site
description: QA context for the sibling repo lamit-site (React/Vite SPA): how to audit it, intentional design decisions, and where audits are saved
metadata:
  type: project
---

`C:\Users\andre\OneDrive\Documentos\lamit-site` is the main LAMIT site (React 18 + Vite 5 SPA, dev on :5173), separate from lamit-store. No test/lint scripts. Audits go in `docs/audits/YYYY-MM-DD-*.md`, and other agents write their own audits there in parallel (technical, ui-ux), so check before duplicating.

**Why:** the user asked for full QA audits (a11y, perf, SEO, security) with no story or gate.

**How to apply:**
- Intentional since 2026-10-14 (see the top of its DESIGN.md): Montserrat, restricted uppercase, rounded corners, dark theme without shadows, `/shop` as "Coming Soon". Do not flag these.
- `public/media/gallery/about/` belongs to the user. Never touch it.
- Content scrolls inside `body`, so fullPage screenshots fail. axe cannot judge text over video/WebGL. Sample contrast with sharp (from lamit-site node_modules) on screenshots taken with the text made transparent.
- The local `.env` has `NODE_ENV=development`, which makes `npm run build` ship dev React (674 KB vs 440 KB). Check whether this is still true before re-flagging it.
- Related: [[project-qa-approach]]
