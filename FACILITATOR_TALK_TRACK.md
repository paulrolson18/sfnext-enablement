# Storefront Next SE Workshop — Facilitator Talk Track

**Purpose:** Minute-by-minute pacing guide with scripted transitions, exercise time budgets, and facilitator cues.
**Companion to:** `INSTRUCTORS_GUIDE.md` (which covers logistics, setup, and troubleshooting)

---

## Master Timeline

| Clock | Duration | Section | Format |
|-------|----------|---------|--------|
| 0:00 | 10 min | Welcome & Overview | Instructor-led |
| 0:10 | 15 min | Environment Validation | Live walkthrough |
| 0:25 | 25 min | Module 1 — Architecture | 18 min instruction + 7 min exercises |
| 0:50 | 45 min | Module 2 — Frontend | 22 min instruction + 23 min exercises |
| 1:35 | 10 min | Break | — |
| 1:45 | 40 min | Module 3 — Backend + Deployment | 22 min instruction + 18 min exercises |
| 2:25 | 25 min | Module 4 — AI Development | 13 min instruction + 12 min exercises |
| 2:50 | 10 min | Q&A & Wrap-up | Open discussion |

**Total:** 3 hours

---

## Welcome & Overview (10 min)

### 0:00–0:02 — Open with the problem (2 min)

**Say:**
> "You've all been on B2C Commerce deals. What's the most common objection you hear about SFRA?"

Let 2–3 people answer. You'll hear "complex," "slow to build," "hard to find developers."

**Then say:**
> "Storefront Next is the answer to that objection. It doesn't replace the platform — it replaces the experience of building on it."

### 0:02–0:05 — Four pillars (3 min)

Scroll through the four value proposition cards. For each one, connect to a sales motion:

| Pillar | SE angle |
|--------|----------|
| Quick to Launch | Down-market opportunity — $25M+ GMV customers that previously couldn't justify SFRA implementation cost |
| High-Converting OOTB | Core Web Vitals and 1-click checkout are competitive talking points |
| AI-First | MCP server + Claude Code is the developer story; Shopper Agent is the business user story |
| Enterprise-Ready Scale | MRT on AWS Lambda — flash sales just work, no capacity planning |

### 0:05–0:06 — GA timeline (1 min)

**Say:**
> "Open source now, GA in June 2026. Pilot is at capacity — 8 customers, 16 SI partners, positive feedback."

### 0:06–0:08 — Tech stack (2 min)

Walk the stack table. Don't go deep — that's Module 1.

**Say:**
> "React, React Router, Tailwind, Managed Runtime. If these names are new, that's fine — Module 1 maps every one to something you already know from SFRA."

### 0:08–0:10 — Agenda + transition (2 min)

Click through the agenda items.

**Say:**
> "Each agenda item links directly to a section. Your workshop site is also your reference after today — use it when demoing to customers."

**Transition:** "Open the workshop site on your own laptop. Navigate to the Environment Check page."

---

## Environment Validation (15 min)

### 0:10–0:25 — Live checklist walkthrough

Run each check projected. Participants run simultaneously. The six checks:

| Check | Command | Expected | Common fix | Budget |
|-------|---------|----------|------------|--------|
| Node 24+ | `node --version` | v24.x.x | `nvm install 24` | 2 min |
| pnpm | `pnpm --version` | 9.x.x | `npm install -g pnpm` | 1 min |
| Git config | `git config --global user.email` | Their email | `git config --global ...` | 1 min |
| VS Code + Tailwind ext | `code --list-extensions \| grep tailwind` | `bradlc.vscode-tailwindcss` | Install extension | 1 min |
| Claude Code | `claude --version` | Version number | `npm install -g @anthropic-ai/claude-code` | 2 min |
| Storefront running | `pnpm dev` | localhost:5173 with products | Check `.env` values | 5 min |

**Buffer:** 3 min for stragglers.

**Say at 0:22 if some people are still stuck:**
> "If you're still troubleshooting, pair with your neighbor for Module 1. You'll have the break to catch up."

**Transition:** "Everyone with a running storefront, navigate to Module 1."

---

## Module 1 — Architecture (25 min)

### Pacing breakdown

| Time | Section | Minutes |
|------|---------|---------|
| 0:25–0:26 | Framing + SFRA mental model | 1 |
| 0:26–0:35 | Tech stack walkthrough (4 layers) | 9 |
| 0:35–0:38 | Project structure + interactive Q&A | 3 |
| 0:38–0:41 | Request lifecycle | 3 |
| 0:41–0:43 | Commerce Apps + i18n + CWV awareness + SE Talking Points | 2 |
| 0:43–0:50 | Hands-on exercises (6 exercises) | 7 |

### 0:25–0:26 — Framing (1 min)

**Say:**
> "The mental model for SFRA: a controller runs, calls a pipeline, pipelines call scripts and APIs, a script renders an ISML template. The result is HTML. Same thing here. The file in `src/routes/` is your controller. The `loader()` function is your pipeline. The component is your ISML template. Tailwind classes are your CSS. The output is HTML."

### 0:26–0:35 — Tech stack walkthrough (9 min)

Walk each layer. Spend more time on the two that differ most from SFRA (React Router, Managed Runtime) and less on the familiar (styling, components).

**React 19 — 2 min**
- "A component is just a function that returns JSX. It's a template function."
- Point out Streaming SSR: "The server sends HTML as it's ready, not all at once. The page shell appears immediately."
- Show the `ProductCard` code example. "Just a function. Accepts props. Returns markup."

**React Router 7 — 3 min** ← Spend the most time here
- "File-based routing: create a file, get a URL. No config."
- `loader()` is the key concept — "Everything server-side lives here. It runs before the page renders."
- `action()` handles writes — always server-side, always POST.
- Walk the `product.$productId.tsx` example: URL → file → loader → data → component.

**Tailwind + ShadCN — 2 min**
- "Utility-first: instead of `.product-card { border-radius: 12px }`, you write `className=\"rounded-xl\"`."
- "Design tokens live in `tailwind.config.js`. Change one value, entire site updates."
- "ShadCN: accessible components you copy into your project and own."

**Managed Runtime — 2 min**
- "AWS Lambda. Each request triggers a function. Elastic by nature — 100x traffic requires zero capacity planning."
- "Deploy: one command. `pnpm sfnext push`."

### 0:35–0:38 — Project structure (3 min)

Show the file tree. Then interactive Q&A with the room:

**Ask:** "Where do you change the homepage layout?" → `src/routes/_index.tsx`
**Ask:** "Where do you change the button color across the whole site?" → `tailwind.config.js`
**Ask:** "Where do you change how products are fetched from the API?" → `src/lib/scapi/products.ts`

### 0:38–0:41 — Request lifecycle (3 min)

Walk the six steps slowly. This is where it clicks for most people.

**Say each step deliberately:**
1. "Browser requests `/product/123`"
2. "MRT Lambda receives the request"
3. "React Router matches it to `product.$id.tsx`"
4. "The `loader()` function runs server-side — calls SCAPI for product data"
5. "React renders the page with data. HTML streams to the browser."
6. "Browser hydrates — React takes over for interactions."

### 0:41–0:43 — Commerce Apps + i18n + CWV + SE Talking Points (2 min)

**Commerce Apps (30 sec):**
> "Commerce Apps are how ISVs ship extensions. The key insight: when a Commerce App includes UI components, `b2c cap install` creates a pull request. Git-based, reviewable."

**i18n + CWV (30 sec — point to the cards, don't deep-dive):**
> "Two more awareness sections on the page: i18n — path-based locale routing, one codebase for all regions. And Core Web Vitals — Streaming SSR gives you structural performance advantages. You'll measure these in exercise 6."

**SE Talking Points (1 min):**
> "Read the five amber talking points. Which resonates most with your current deals?"

### 0:43–0:50 — Hands-on exercises (7 min)

| Exercise | What they do | Time |
|----------|-------------|------|
| 1. Open project in VS Code | `code .` from project dir | 0.5 min |
| 2. Trace a request through the code | Open `_index.tsx`, find `loader()`, ask Claude Code to explain it, verify against diagram | 2 min |
| 3. Inspect Tailwind classes in DevTools | Inspect hero banner, find class names in source | 1 min |
| 4. Prove SSR is working | Network tab → HTML response → search for product name → explain to neighbor why it matters for SEO | 1 min |
| 5. Explore config files | Open `config.server.ts` and `tailwind.config.js` | 0.5 min |
| 6. Measure Core Web Vitals | DevTools → Lighthouse → run Mobile audit → note LCP, CLS, INP | 2 min |

**Facilitator cue:** Walk the room during exercises. If someone finishes early, ask them to help their neighbor.

**Transition:** "Module 2 is where you start changing things. Open the Odyssey storefront in a separate tab — we'll use it as our reference."

---

## Module 2 — Frontend Modifications (45 min)

### Pacing breakdown

| Time | Section | Minutes |
|------|---------|---------|
| 0:50–0:53 | Intro + Odyssey reference | 3 |
| 0:53–1:03 | Part 1 — Brand Tokens (explain 3 + hands-on 7) | 10 |
| 1:03–1:11 | Part 2 — Hero Banner (explain 3 + hands-on 5) | 8 |
| 1:11–1:14 | Part 2b — Page Designer HeroBanner exercise | 3 |
| 1:14–1:24 | Part 3 — Product Card (explain 5 + hands-on 5) | 10 |
| 1:24–1:28 | Part 4 — PLP Layout + Page Designer + SE Points | 4 |
| 1:28–1:31 | Deploy & verify changes live | 3 |
| 1:31–1:35 | Challenge exercise (optional) + buffer | 4 |

### 0:50–0:53 — Intro (3 min)

Open Odyssey on projector.

**Say:**
> "This is a real Storefront Next implementation. Everything we do in this module is based on what you see here. Open Odyssey on your own machine — keep it in a tab."

### 0:53–1:03 — Part 1: Brand Tokens (10 min)

**Explain (3 min):**
Walk `tailwind.config.js` — the three key tokens:
- `colors.primary.500` → buttons, links, active states
- `colors.accent.DEFAULT` → sale badges, promotions
- `fontFamily.sans` → all body text

**Say:**
> "When a designer hands you a brand kit with hex codes and font names, this is where they go. Change a color here, every button, badge, link, and accent in the entire site updates."

**Exercise (7 min):**
> "Pick a brand direction — luxury fashion, outdoor gear, electronics, whatever. Update your `tailwind.config.js` with a matching color palette. Save and watch it update live."

If someone is stuck: "Ask Claude Code — 'Update my tailwind.config.js to reflect a [brand type] aesthetic.'"

### 1:03–1:11 — Part 2: Hero Banner (8 min)

**Explain (3 min):**
Show the ISML vs React comparison side-by-side on projector.

**Key point:**
> "Because the hero is a component with typed props, you can reuse it on the homepage, category pages, and campaign landing pages — same component, different content. In SFRA you'd copy-paste the ISML block."

**Exercise 2 (5 min):**
> "Find your hero banner in `src/routes/_index.tsx`. Update the gradient overlay color and CTA button style to match your new brand palette."

The Tailwind class to find: `bg-gradient-to-t from-black/70`. They change it to their brand color.

### 1:11–1:14 — Part 2b: Page Designer HeroBanner Exercise (3 min)

**Exercise 3 — Enhance HeroBanner for Page Designer (3 min):**
> "Now let's make the hero configurable by merchandisers. Open `src/components/HeroBanner.tsx`. Add two new props: `titleColor` (optional string) and `titleAlignment` ('left' | 'center' | 'right'). Apply color as an inline style on the h1, and map alignment to Tailwind classes."

**Say:**
> "This is the bridge between developer and merchandiser. You add props, Page Designer exposes them as config fields in Business Manager. Ask Claude Code to help — give it the exact prop names and types."

**Facilitator cue:** Walk the room. Most people should be able to add both props and the alignment class map in 3 min. If someone is stuck, point them to the Page Designer code example in the module.

### 1:14–1:24 — Part 3: Product Card Enhancement (10 min)

**Explain (5 min):**

Open the Odyssey PLP on projector. Demonstrate live:
- Hover image swap (mouse over product → image changes)
- Slide-up Quick Add button
- Badge in corner
- Wishlist icon on hover

**Say:**
> "Each of these is a small independent behavior. React state handles hovering. Tailwind's `group-hover` classes handle the CSS. The behavior and the style are in the same component."

Walk these patterns in the code:
- `className="group ..."` on parent + `group-hover:opacity-100` on child = CSS-only hover coordination
- `translate-y-full group-hover:translate-y-0` = slide-up animation, zero JS
- `isHovered` state for image swap = one `useState`

**Exercise 4 (5 min):**
> "Find `src/components/ProductCard.tsx`. Add a slide-up Quick Add button on hover. Use the pattern from the module or ask Claude Code."

Claude Code prompt: *"In my ProductCard component, add a Quick Add button that slides up from the bottom on hover. Use Tailwind group-hover and translate-y transitions."*

Walk the room. Redirect anyone adding `style={}` to Tailwind classes.

### 1:24–1:28 — Part 4: PLP Layout + Page Designer + SE Points (4 min)

**PLP Layout (2 min):**
> "The entire category page layout is in one file. Changing column count is one class name."

**Exercise 5:**
> "Change your grid from 3 columns to 4 on large screens. Add a product count above the grid."

**Page Designer (1 min — awareness only):**
> "When a merchandiser asks 'can I change pages without a developer?' — yes. Page Designer works with Storefront Next. Decorators in TypeScript, auto-generated metadata for BM."

**SE Talking Points (1 min):**
> "Read the amber callout. Which point resonates?"

### 1:28–1:31 — Deploy & Verify (3 min)

**Exercise 6 — Deploy changes to Managed Runtime:**
> "Let's see your work live before the break. Run `pnpm sfnext push` to deploy. Open your storefront URL and verify: brand colors, hero changes, product card enhancements."

**Say:**
> "This is the same workflow you'd demo to a customer. One command → live site. Watch `b2c mrt tail-logs` if anything looks off."

| Exercise detail | Time |
|-----------------|------|
| Run deploy command | 1 min |
| Open live URL, verify visuals | 1 min |
| Troubleshoot with `tail-logs` (if needed) | 1 min |

**Note:** If participants don't have MRT project access, demo this on projector.

### 1:31–1:35 — Challenge + Buffer (4 min)

**Exercise 7 (optional):**
> "If you finished early: add NEW and SALE badges to your product cards."

Use remaining time for stragglers to catch up on deploy or any earlier exercise.

### 1:35 — Break

**Say:** "We're right on schedule. Take 10. Be back at [exact time]."

---

## Module 3 — Backend + Deployment (40 min)

### Pacing breakdown

| Time | Section | Minutes |
|------|---------|---------|
| 1:45–1:46 | Framing | 1 |
| 1:46–1:56 | Part 1 — Loaders (explain 5 + exercise 5) | 10 |
| 1:56–2:04 | Part 2 — Actions (explain 4 + exercise 4) | 8 |
| 2:04–2:05 | Checkout Architecture awareness | 1 |
| 2:05–2:12 | Part 3 — SCAPI + Search & Discovery (explain 4 + exercise 4) | 7 |
| 2:12–2:14 | Auth Architecture awareness | 2 |
| 2:14–2:17 | Part 4 — Custom Hooks (explain 2 + exercise 1) | 3 |
| 2:17–2:19 | Part 5 — Error Handling (explain 1 + exercise 1) | 2 |
| 2:19–2:20 | Testing Patterns awareness | 1 |
| 2:20–2:24 | Part 6 — Deployment (explain 2 + exercise 2) | 4 |
| 2:24–2:25 | SE Talking Points | 1 |

### 1:45–1:46 — Framing (1 min)

**Say:**
> "If Module 2 was about what shoppers see, Module 3 is about how data gets there. Everything here runs on the server — it never reaches the browser. That's a security model, not just an architecture."

Write or say clearly:
> **loader() = read. action() = write. Both run server-side. Both are in the route file.**

### 1:46–1:56 — Part 1: Loaders (10 min)

**Explain (5 min):**
Walk the loader example. Three points:

1. **Runs on the server.** API credentials never reach the browser.
2. **`Promise.all()` for parallel fetches.** Two 200ms calls in sequence = 400ms. In parallel = 200ms. "This is one of the fastest wins in Storefront Next."
3. **Type safety.** `useLoaderData<typeof loader>()` — TypeScript knows the data shape.

**SFRA parallel:**
> "In SFRA, pipeline nodes called APIs sequentially. Here you call both in one line."

**Exercise (5 min):**
> "Open your product route. Add a parallel fetch for recommendations using `Promise.all()`. Even a mock function counts."

| Exercise detail | Time |
|-----------------|------|
| Open file, find loader | 1 min |
| Add `Promise.all()` wrapper | 2 min |
| Wire data to component | 2 min |

### 1:56–2:04 — Part 2: Actions (8 min)

**Explain (4 min):**
Walk the cart action example:
- Reads `formData` — standard HTML form POST
- Runs server-side — basket API token stays on server
- Success: `redirect()` — page refreshes with fresh loader data
- Failure: return error object — component reads via `useActionData()`

Show `AddToCartButton`: no `onSubmit` handler, React Router handles the POST.

**Exercise (4 min):**
> "Add an Add to Wishlist action to your product route. Read `productId` from formData. For now, just `console.log` it."

| Exercise detail | Time |
|-----------------|------|
| Add `action()` export to route | 2 min |
| Read formData, console.log | 1 min |
| Add form with hidden input | 1 min |

### 2:04–2:05 — Checkout Architecture (1 min — awareness only)

**Say:**
> "Before we get into SCAPI, look at the Checkout Architecture section on the page. Cart → Shipping → Payment → Confirmation — each is a route with its own loader/action. Same pattern you just learned. The key customer talking point: '1-click checkout from day one.'"

Point to the four checkout steps. No exercise — the pattern reinforces what they just learned about loaders and actions.

### 2:05–2:12 — Part 3: SCAPI Integration + Search & Discovery (7 min)

**Explain (4 min):**
Walk `src/lib/scapi/products.ts`:
- Plain async function with `fetch()` to SCAPI URL
- Authorization: SLAS token from session
- Returns a clean typed interface — not the raw SCAPI shape

**Say:**
> "This is the seam between Salesforce's API and your app. You own this code. If SCAPI adds a new field, you add it to your interface."

**Exercise (4 min):**
> "Add a `getProductsByCategory(categoryId: string)` function. Define the return type. You can use Claude Code to help scaffold it."

| Exercise detail | Time |
|-----------------|------|
| Create function signature | 1 min |
| Define return type interface | 1.5 min |
| Add fetch URL pattern (or ask Claude Code) | 1.5 min |

**Search & Discovery (30 sec — point to subsection):**
> "Below the SCAPI grid, you'll see Search & Discovery. Keyword search, faceted filtering, typeahead suggestions — all via Shopper Search API. This is frequently asked about in demos."

### 2:12–2:14 — Auth Architecture (2 min — awareness only)

**Say:**
> "SLAS with split cookies. Access and refresh tokens in separate cookies, server-side refresh. Guest-to-registered is an atomic swap. The template handles all of this — you don't implement it. But when a customer asks about security, you can explain the pattern."

Point to the three-card grid. No exercise.

### 2:14–2:17 — Part 4: Custom Hooks (3 min)

**Explain (2 min):**
Walk `useProductInventory`. The concept:
> "If you write the same `useEffect` + `useState` in two components, extract it to a hook. The component calls `useProductInventory(productId)` and gets clean data."

**Exercise (1 min):**
> "Create `src/hooks/useRecentlyViewed.ts`. Define the hook signature and return type. Don't implement the full logic — just the shape."

### 2:17–2:19 — Part 5: Error Handling (2 min)

**Explain (1 min):**
Two points:
1. Co-located — error handler is in the same file as the route
2. `isRouteErrorResponse(error)` lets you handle 404s differently from 500s

**Say:**
> "In SFRA, a pipeline error showed a generic page. Here you have surgical control — a 404 on the cart says 'basket expired, start a new one.'"

**Exercise (1 min):**
> "Add an `ErrorBoundary` to your cart route. Handle 404 with a helpful message."

### 2:19–2:20 — Testing Patterns (1 min — awareness only)

**Say:**
> "Look at the Testing section on the page. Vitest for unit tests, React Testing Library for components, Playwright for E2E. When a customer asks about test strategy, point to this three-layer approach — it mirrors what enterprise teams already use."

No exercise. This addresses a common customer objection about production readiness.

### 2:20–2:24 — Part 6: Deployment (4 min)

**Explain (2 min):**
Three commands:
- `pnpm sfnext push` — deploy to MRT
- `b2c mrt env var push` — sync `.env` to remote (only diffs — safe)
- `b2c mrt tail-logs` — live log stream with filtering

**Say:**
> "One command to deploy. One command for env vars. One command to debug in real time. No SSH, no server access, no DevOps pipeline."

**Exercise (2 min):**
> "Deploy with `pnpm sfnext push`. Open the live URL, verify your brand changes. If something's off, run `b2c mrt tail-logs`."

| Exercise detail | Time |
|-----------------|------|
| Run deploy command | 0.5 min (command itself, build takes background time) |
| Open live URL, verify visuals | 1 min |
| Try `tail-logs` with `--level ERROR` | 0.5 min |

**Note:** If participants don't have MRT project access, demo this on projector instead.

### 2:24–2:25 — SE Talking Points (1 min)

> "Read the amber callout. The deployment story is especially powerful for customers comparing build complexity."

**Transition:** "Last module — this is where the AI tooling comes together."

---

## Module 4 — AI Development (25 min)

### Pacing breakdown

| Time | Section | Minutes |
|------|---------|---------|
| 2:25–2:30 | Part 1 — Setup (MCP + CLAUDE.md + tools tour) | 5 |
| 2:30–2:35 | Part 2 — Prompt templates walkthrough | 5 |
| 2:35–2:37 | Anti-patterns + SE Talking Points | 2 |
| 2:37–2:38 | Live demo — one prompt on projector | 1 |
| 2:38–2:50 | Hands-on exercises (5 exercises) | 12 |

### 2:25–2:30 — Part 1: Setup (5 min)

**MCP server (2 min):**
Walk the install code.

**Say:**
> "One command: `claude mcp add ... npx -y @salesforce/b2c-dx-mcp@latest`. No global install. Auto-detects your project type and loads the right tools."

Point to multi-IDE callout: works with Cursor (`.cursor/mcp.json`) and VS Code + Copilot (`.vscode/mcp.json`).

**MCP tools tour (1 min):**
Walk the six-tool grid quickly:

| Tool | One-line pitch |
|------|---------------|
| `sfnext_get_guidelines` | "AI writes better code when it knows the rules" |
| `sfnext_configure_theme` | "Fastest path to brand customization" |
| `sfnext_analyze_component` | "Understand existing code structure" |
| `sfnext_match_tokens_to_theme` | "Map design spec tokens to your Tailwind theme" |
| `sfnext_start_figma_workflow` | "Figma → component conversion" |
| `sfnext_add_page_designer_decorator` | "Add Page Designer metadata to routes" |

**CLAUDE.md (2 min):**

**Say:**
> "Here's a major advantage most people don't know about: the Storefront Next template *already ships with a comprehensive CLAUDE.md*. Open it — it contains 22 performance rules, code conventions, testing strategy, and links to 20+ architecture docs. Every AI coding assistant reads this automatically. From your very first prompt, the AI knows where files go, how to fetch data, how to handle images, and what coding patterns to follow."

Scroll through the "What ships in the template" summary on the page.

> "This is a differentiator no other commerce platform has. The platform teaches the AI how to build on it. Your job in Exercise 1 is to add *your* brand context on top — colors, typography, tone. The AI combines both for code that's architecturally correct *and* on-brand."

### 2:30–2:35 — Part 2: Prompt templates (5 min)

Don't read every PromptCard. Instead, walk the **pattern** using 1–2 examples:

**Strong prompt anatomy (2 min):**
1. **Name the file** — `src/components/ProductCard.tsx`, not "my product card"
2. **Describe the goal** — "slide-up Quick Add button on hover", not "make it better"
3. **State constraints** — "Tailwind only, no inline styles, keep existing layout"
4. **Give a reference** — "similar to the Odyssey storefront pattern"

**Walk one Look & Feel prompt (1.5 min):**
Pick the Brand Theming PromptCard. Read the prompt aloud. Point out: it names specific hex codes, references brand direction, and asks for a visual result.

**Walk one Logic prompt (1.5 min):**
Pick the Data Flow PromptCard (Einstein recommendations). Point out: it names the file, describes current behavior, specifies the pattern (`Promise.all`), and lists exactly what to create.

**Say:**
> "The rest of the prompt templates are on the page — use them as starting points. Adapt them to your project."

### 2:35–2:37 — Anti-patterns + SE Talking Points (2 min)

Show the weak/strong comparison grid. Leave it on screen.

**Say:**
> "Left column: vague prompts, vague output. Right column: precise prompts, precise output. The quality of what you get is directly proportional to the specificity of what you ask."

SE Talking Points (30 sec):
> "The first-party MCP server point is your strongest differentiator in competitive conversations."

### 2:37–2:38 — Live demo (1 min)

If you haven't already done a live demo during Module 2, do a quick one now. Run one prompt in Claude Code on the projector:

> "In my Storefront Next project, update tailwind.config.js to use a warm neutral palette — off-white backgrounds, deep charcoal text, dusty rose accent."

Show it reading the file first, then making targeted edits.

### 2:38–2:50 — Hands-on exercises (12 min)

| Exercise | What they do | Time |
|----------|-------------|------|
| 1. Explore CLAUDE.md + add brand context | Open existing CLAUDE.md, skim rules, add brand guidelines + "What I'm Building" section, commit | 2 min |
| 2. Brand in one prompt | Run brand theming prompt adapted to their direction | 3 min |
| 3. Build a component | Use Figma-to-code prompt to describe ideal product card | 3 min |
| 4. Extend a loader | Ask Claude Code to read category route and add sorting | 3 min |
| 5. Challenge: Odyssey homepage | Describe one Odyssey feature to Claude Code, build matching component | 1 min (start only — finish post-workshop) |

**Facilitator notes:**
- Exercises 1–4 are the core. Everyone should get through them.
- Exercise 5 is aspirational — tell fast finishers to start it, but it's also a great post-workshop activity.
- Walk the room. Common issues: Claude Code not seeing the MCP tools (restart session), forgetting to add brand context to the existing CLAUDE.md.

### 2:48–2:50 — Wrap-up card + Migration callout (2 min)

Read the skills checklist in the wrap-up card.

**Say:**
> "You've covered the full stack — architecture, frontend, backend, and AI-accelerated development."

Point to the migration callout:
> "One more thing for your customer conversations: Storefront Next supports hybrid migration from SFRA. Page-by-page, route-by-route. Customers don't need a full rewrite — they can migrate incrementally."

---

## Q&A & Wrap-up (10 min)

### 2:50–2:52 — Quick review (2 min)

Click through each module page on projector:

**Say:**
> "Module 1: you mapped the stack to SFRA concepts. Module 2: you changed the visual experience. Module 3: you changed data flow and deployed. Module 4: you built a repeatable AI workflow."

### 2:52–2:54 — The SE pitch (2 min)

| Customer context | What to say |
|-----------------|-------------|
| "We're on SFRA, happy there" | "Storefront Next is the new default for net-new. SFRA is fully supported — no EOL." |
| "Headless is too complex" | "This is headless with guard rails. Template-first, AI-assisted, deploys to Managed Runtime." |
| "Evaluating Shopify/BigCommerce" | "Storefront Next matches modern DX and has better Core Web Vitals OOTB." |
| "We want AI in our stack" | "Only commerce platform with a first-party MCP server and Shopper Agent OOTB." |

### 2:54–2:59 — Open Q&A (5 min)

Let questions flow. Common ones and answers:

- **SFRA cartridges with SFNext?** — No. SCAPI only. Logic needs to be in B2C Commerce scripts/hooks accessible via SCAPI.
- **Page Designer?** — Yes, works with SFNext. TypeScript decorators → auto-generated BM metadata.
- **SLAS authentication?** — Split cookies, server-side refresh. Template handles it.
- **Deployment story?** — `pnpm sfnext push`. GitHub Actions CI/CD. MRT handles CDN, SSL, global distribution.
- **Migration?** — Hybrid proxy pattern. Route-by-route migration from SFRA.

### 2:59–3:00 — Close (1 min)

**Say:**
> "Bookmark the workshop site — it stays available and will be updated as Storefront Next evolves. Two pages to check out after today: the **Demo Playbook** has four scripted demo flows for different customer scenarios, and the **Quick Reference Card** is your cheat sheet — key commands, talking points, and architecture mappings all on one page."

Share:
- Workshop site: Demo Playbook & Quick Reference Card pages
- Slack: `#cc-sfnext-internal-se`
- Template repo
- B2C Developer Tooling docs
- Odyssey reference store

**Final ask:**
> "Before you leave — one thing that landed well, one thing that could be better."

---

## Exercise Time Budget Summary

### Module 1 — 7 min total (6 exercises)

| # | Exercise | Minutes |
|---|----------|---------|
| 1 | Open project in VS Code | 0.5 |
| 2 | Trace a request (find loader, ask Claude Code, verify diagram) | 2 |
| 3 | Inspect Tailwind classes in DevTools | 1 |
| 4 | Prove SSR (search HTML response, explain to neighbor) | 1 |
| 5 | Explore config files | 0.5 |
| 6 | Measure Core Web Vitals (Lighthouse audit) | 2 |

### Module 2 — 23 min total (7 exercises, integrated with instruction)

| # | Exercise | Minutes |
|---|----------|---------|
| 1 | Update brand colors in `tailwind.config.js` | 7 |
| 2 | Modify homepage hero gradient + CTA | 5 |
| 3 | Enhance HeroBanner for Page Designer (titleColor + titleAlignment) | 3 |
| 4 | Add Quick Add button to product cards | 5 |
| 5 | Change PLP grid to 4 columns + add count | — (folded into Part 4 instruction) |
| 6 | Deploy & verify changes on Managed Runtime | 2 |
| 7 | Challenge: Add badge system | 1 (or skip) |

*Note: Module 2 exercises are woven into each Part, not a separate block.*

### Module 3 — 17 min total (6 exercises, integrated)

| # | Exercise | Minutes |
|---|----------|---------|
| 1 | Add parallel data fetching to PDP loader | 5 |
| 2 | Add Wishlist action | 4 |
| 3 | Add `getProductsByCategory` SCAPI function | 4 |
| 4 | Create `useRecentlyViewed` hook signature | 1 |
| 5 | Add ErrorBoundary to cart route | 1 |
| 6 | Deploy and verify with `tail-logs` | 2 |

### Module 4 — 12 min total (5 exercises)

| # | Exercise | Minutes |
|---|----------|---------|
| 1 | Explore CLAUDE.md + add brand context | 2 |
| 2 | Brand storefront in one prompt | 3 |
| 3 | Build component from detailed prompt | 3 |
| 4 | Extend loader with context-aware prompting | 3 |
| 5 | Challenge: Describe Odyssey homepage | 1 (start only) |

---

## Timing Pressure Points

If you're running behind, these are safe cuts:

| Priority | What to cut | Saves |
|----------|-------------|-------|
| 1 | Module 2 Exercise 7 (badge system challenge) | 1 min |
| 2 | Module 4 Exercise 5 (Odyssey challenge) | 1 min |
| 3 | Module 3 Exercise 4 (useRecentlyViewed hook) | 1 min |
| 4 | Module 2 — fold deploy into Module 3 instead (skip Exercise 6) | 3 min |
| 5 | Module 4 Part 2 — walk only 1 PromptCard instead of 2 | 1.5 min |
| 6 | Module 1 — skip Managed Runtime walkthrough, just reference it | 2 min |

| 7 | Module 3 — skip Checkout/Search/Testing awareness sections | 3 min |

**Maximum recovery: ~12.5 min** — enough to absorb one module running long.
