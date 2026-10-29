---
name: project-qa-approach
description: How QA gates are run in lamit-store (static site, no test/lint scripts) and recurring known risks not to re-flag as story defects
metadata:
  type: project
---

lamit-store is a static HTML/CSS/JS site with no test, lint or typecheck scripts. QA evidence comes from ad hoc Playwright-core (system Chrome) plus axe-core from CDN, run from the session scratchpad and never from the repo. Local server: `npx serve .` on :3000. It 301-redirects `/x.html` to `/x` (clean URLs), which is not a bug.

**Why:** the user wants browser-verified evidence, and nothing in the repo runs automatically.

**How to apply:**
- Gates go in `docs/qa/gates/{story}-{slug}.yml` (qaLocation: docs/qa).
- Stories may lack a Change Log section. Record the status transition inside QA Results instead of halting.
- Known out-of-scope risks to register for @devops, not as gate blockers: netlify.toml `publish = "."` exposes the whole repo; there is an unversioned nested `lamit-store/` folder.
- Intentional user decisions (since 2026-10-13): Montserrat, rounded corners, light theme, and "LAMIT ↗" pointing to the Linktree.
- The PDP sometimes renders after `networkidle`. Use waitForSelector before asserting.
- axe cannot check contrast over the Grainient `<canvas>`. Hide the text (color transparent), take a screenshot, and sample pixel luminance inside the text's Range rects. In story 3.2, white text over the gold (#C17402) peak measured about 2.6:1.
- Shared CSS (`.btn--on-dark`, `.kicker`) is also used by `js/product-detail.js`. Grep the JS before calling a class dead or a style change home-only.
- Headless Chrome on this machine adds about 20s of TTFB because of proxy auto-detection. Launch with `args: ['--no-proxy-server']` before measuring LCP or timing, otherwise the numbers are meaningless (curl gives about 18ms).
