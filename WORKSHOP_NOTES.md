# Storefront Next SE Workshop — Build Notes & Future Enhancements

*Created: May 2026. Update this file after each workshop run.*

---

## What Was Built

A standalone React/Vite/Tailwind workshop site (`workshop-site/`) that serves as both the facilitator's presentation and the participant's step-by-step guided walkthrough for a 3-hour in-person Storefront Next enablement workshop.

**Stack:** React 18 (Vite template), React Router 6 (HashRouter), Tailwind CSS 3, TypeScript, `react-syntax-highlighter`, `lucide-react`

**Design system:** Dark theme (slate-950 base), sky-400 primary, violet-400 for AI content, emerald-400 for success states, amber-400 for backend content

---

## Site Structure

```
workshop-site/src/
├── App.tsx                    # HashRouter + route definitions
├── context/
│   └── ProgressContext.tsx    # localStorage-backed step completion tracking
├── components/
│   ├── Layout.tsx             # Sidebar nav, collapse toggle, progress bars
│   ├── CodeBlock.tsx          # Syntax-highlighted code with copy button
│   ├── StepCard.tsx           # Clickable step with checkmark + connector line
│   ├── SectionHeader.tsx      # Gradient title + badge + subtitle
│   └── Callout.tsx            # tip / warning / info / ai callout boxes
└── pages/
    ├── Overview.tsx           # Pitch page: pillars, stack, GA timeline, agenda
    ├── PreWork.tsx            # Pre-work checklist with install instructions
    ├── EnvCheck.tsx           # Interactive env validation with progress bar
    ├── Module1.tsx            # Architecture: stack deep-dives, file structure, request lifecycle
    ├── Module2.tsx            # Frontend: brand tokens, hero banner, product card, PLP
    ├── Module3.tsx            # Backend: loaders, actions, SCAPI, custom hooks, errors
    └── Module4.tsx            # AI: MCP setup, CLAUDE.md, 6 prompt templates
```

---

## Decisions Made & Why

### HashRouter (not BrowserRouter)
Using `HashRouter` so the built `dist/` can be served from any static host (GitHub Pages, local file system) without server-side routing config. All routes live after the `#` — no 404s on refresh.

### Participant Progress Tracking
`ProgressContext` stores step completion state in `localStorage`, keyed by step ID (e.g., `m2-product-card`). Each `StepCard` renders a numbered circle that turns into a green checkmark when clicked. The sidebar nav shows a progress bar per module. This persists across page refreshes so participants don't lose their place.

### SFRA Mental Model Mapping
A deliberate decision throughout Module 1: every React/RR7 concept is introduced with its SFRA/ISML analog. This matters because the target audience are SFRA practitioners, not React beginners. The mapping (Routes = Controllers, Components = ISML templates, Loaders = pipeline nodes) was the single most valuable framing to include.

### Odyssey as the Visual Reference
The [Odyssey storefront](https://sfcc-odyssey-production.mobify-storefront.com/global/en-GB/) was researched and used as the source for all customization examples in Module 2. Specific patterns drawn from it:
- Hover image swap on product cards
- Slide-up Quick Add button
- Promotional badge overlays (NEW, discount %)
- Multi-column responsive grid
- Hero banners with gradient overlay + strong CTA

### Prompt Templates (Module 4)
Six production-quality Claude Code prompts were written with real specificity — component file paths, TypeScript interface requirements, exact CSS specs, behavior descriptions. The pattern: category, title, description of when to use it, the prompt itself, and an optional follow-up prompt. Each has a copy button.

### CLAUDE.md Template
A project-level CLAUDE.md template was provided in Module 4. Participants are instructed to commit it to their repos — this is the highest-leverage AI setup step (it eliminates repetitive context-setting in every prompt).

### Code Splitting
The `react-syntax-highlighter` library (~636KB minified) is split into its own chunk so it loads separately from the app code. App code gzips to ~28KB.

---

## Known Gaps & Future Enhancements

### Content

- **No video/screenshot embeds** — Module 2 and 4 would benefit from short screen recordings showing the dev loop (save file → instant HMR update). Easy to add as `<video>` elements or YouTube embeds.

- **Page Designer integration is missing** — The slides referenced Figma-to-code for Page Designer components and the turnkey Page Designer setup. This is a natural Module 5 or an extension of Module 2.

- **SLAS authentication is thin** — The SLAS prompt in Module 4 is a prompt template, not a full walkthrough. Participants who get to Module 3 quickly will want more depth here. Consider a dedicated auth section in Module 3.

- **Deployment walkthrough is absent** — How to push to MRT (`pnpm push` / `sfnext push`) and set up GitHub Actions for CI/CD was mentioned but not walked through. Add a "Deploy Your Storefront" step after Module 3.

- **AI migration tool** — Slides referenced an AI-assisted SFRA → Storefront Next migration tool. This is a major selling point for existing customers and deserves a demo section or at minimum a callout in the Overview.

- **Shopper Agent / AEO content** — The slides mentioned the storefront is "AEO-ready" and "Shopper Agent connected OOTB." This is not covered at all in the workshop. Add to Module 4 or as a bonus section.

- **Storybook** — The template includes `pnpm storybook`. Calling this out would help participants understand component isolation and visual testing. One step in Module 2 could open Storybook.

### Site/UX

- **No presenter mode** — The Overview page is the closest thing to a presentation, but there's no way to go fullscreen or advance slide-by-slide. Consider a `/present` route that hides the sidebar and shows one section at a time with keyboard arrow navigation.

- **No print/export** — Some participants will want to take notes on paper or export the exercises. A print stylesheet or "Export as PDF" button on each module would help.

- **No time tracking** — Each module has timing labels, but there's no live countdown or elapsed timer. A floating "time remaining" indicator would help facilitators stay on schedule.

- **Mobile experience** — The site works on mobile (responsive layout, collapsible sidebar) but the code blocks are awkward on small screens. The workshop is in-person on laptops, so this is low priority.

- **No search** — Once the site has more content, a `/search` page to find any code example or topic would be valuable.

- **Dark/light toggle** — Currently dark-only. Some participants may prefer light mode for readability.

### Technical

- **No GitHub Actions workflow file** — Add a `.github/workflows/deploy.yml` to `workshop-site/` for automatic GitHub Pages deployment so participants can deploy their workshop site trivially.

- **No `.gitignore` customization** — The default Vite `.gitignore` is fine, but should confirm `dist/` is excluded and `CLAUDE.md` is included.

- **Syntax highlighter lazy loading** — Could lazy-import `react-syntax-highlighter` per-module to reduce initial parse time, though for a workshop context this is not a real problem.

---

## Audience Notes

**Participants:** Salesforce Solution Engineers — experienced with B2C Commerce (SFRA, Business Manager, OCAPI/SCAPI), but limited React/modern JS experience.

**What landed well (anticipated):**
- SFRA analogies in Module 1
- The SFRA vs. Storefront Next comparison table
- Copy-paste prompts in Module 4

**What may need more time:**
- The jump from Tailwind theory to actual file editing in Module 2 — have a few participants who need more hand-holding on "where do I put this class?"
- The `loader()` / `action()` pattern in Module 3 is conceptually unfamiliar. Budget extra time or add a simpler "Hello World loader" exercise before the full examples.

**Pre-work completion rate concern:** If participants skip pre-work, the 15-minute environment check will expand to 45+ minutes and compress the workshop significantly. Consider: send a Slack reminder 48 hours before with a direct link to the `/pre-work` page.

---

## Source Material Used

| Source | Used For |
|---|---|
| `Storefront Next_ SE Enablement Apr 15, 2026.pptx` | Slide content, GA timeline, pilot status, tech stack, target buyer, migration paths |
| `github.com/SalesforceCommerceCloud/storefront-next-template` README | Prerequisites, setup commands, directory structure, CLI commands |
| `salesforcecommercecloud.github.io/b2c-developer-tooling/` | B2C CLI install, MCP server setup, Claude Code skills installation |
| `npmjs.com/@salesforce/storefront-next-dev` | Package version, sfnext CLI commands, system requirements |
| `sfcc-odyssey-production.mobify-storefront.com` | Visual design reference: product card anatomy, hero patterns, PLP layout, UX patterns |

---

## Running & Deploying the Site

```bash
# Development
cd workshop-site
npm install
npm run dev          # http://localhost:5173

# Production build
npm run build        # outputs to dist/

# GitHub Pages (after pushing to a repo)
# Set vite.config.ts base to '/your-repo-name/'
# Then push dist/ or use the Actions workflow
```

---

## Files in This Repo

```
sfnext_enablement/
├── Storefront Next_ SE Enablement Apr 15, 2026.pptx   # Reference slides
├── WORKSHOP_NOTES.md                                    # This file
└── workshop-site/                                       # The workshop web app
    ├── package.json
    ├── vite.config.ts
    ├── tailwind.config.js
    ├── index.html
    └── src/
        └── (see structure above)
```
