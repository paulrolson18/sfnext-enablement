# Storefront Next SE Workshop — Instructor's Guide

**Format:** In-person · 12 participants · 3 hours  
**Audience:** Salesforce Solution Engineers with B2C Commerce background (SFRA/PWA Kit), limited React experience  
**Workshop site:** Run `cd workshop-site && npm run dev` — open on the projector at `http://localhost:5173`  
**Slack channel for issues:** `#cc-sfnext-internal-se`

---

## Before You Arrive

### Day before the workshop
- [ ] Send a reminder to participants in Slack: direct link to the Pre-Work page (`/#/pre-work`) and a clear message that they will fall behind if setup isn't done
- [ ] Confirm all 12 participants have access to a B2C sandbox with SCAPI credentials
- [ ] Run through the env-check yourself on a fresh machine to verify the commands still work
- [ ] Have the Odyssey storefront open in a tab: `https://sfcc-odyssey-production.mobify-storefront.com/global/en-GB/`
- [ ] Have the SE demo storefront open in a tab: `https://sedemo-sfnext-zzsa004.mobify-storefront.com/ntoNext/en-US/`
- [ ] Print or have this guide open on a second screen — do not project it

### Room setup
- [ ] Project the workshop site Overview page at the start (`/#/`)
- [ ] Ensure everyone has a laptop with their own display — this is hands-on, not a lecture
- [ ] Have the room WiFi credentials written somewhere visible
- [ ] Identify which participants are most likely to need extra help (check pre-work completion ahead of time if possible)

---

## Schedule at a Glance

| Clock | Elapsed | Section |
|---|---|---|
| 0:00 | 10 min | Welcome & Overview |
| 0:10 | 15 min | Environment Validation |
| 0:25 | 25 min | Module 1 — Architecture |
| 0:50 | 45 min | Module 2 — Frontend Modifications |
| 1:35 | 10 min | Break |
| 1:45 | 40 min | Module 3 — Backend + Deployment |
| 2:25 | 25 min | Module 4 — AI Development |
| 2:50 | 10 min | Q&A & Wrap-up |

**Hard rule:** Keep the break at 1:35 regardless of where you are. Energy drops fast in hour two.

---

## Welcome & Overview
**Page:** `/#/` · **Time:** 10 minutes

### Goal
Set the stage. Participants should leave this section understanding the "why" behind Storefront Next and what today will accomplish. This is a pitch, not a lecture.

### Talking points

**Open with the problem (2 min)**
> "You've all been on B2C Commerce deals. What's the most common objection you hear about SFRA?"

Let two or three people answer — you'll hear things like "it's complex," "slow to build," "hard to find developers." Validate all of it. Then:

> "Storefront Next is the answer to that objection. It doesn't replace the platform — it replaces the experience of building on it."

**Walk the four pillars (3 min)**  
Scroll through the four value cards on the Overview page. For each one, connect it to a sales motion:

- **Quick to Launch** → down-market opportunity ($25M+ GMV customers that previously couldn't justify implementation cost)
- **High-Converting OOTB** → Core Web Vitals and 1-click checkout are talking points in competitive situations
- **Built to be AI-First** → MCP server + Claude Code is the developer story; Shopper Agent is the business user story
- **Enterprise-Ready Scale** → MRT on AWS Lambda, not a shared app server; flash sales just work

**GA timeline (1 min)**  
Point to the timeline bar. Emphasize: code is open source now (May 2026), GA is June 2026. Pilot is at capacity with 8 customers and 16 SI partners and feedback is positive.

**Tech stack (2 min)**  
Walk the stack table. Don't go deep — that's Module 1. The goal is recognition:

> "React, React Router, Tailwind, Managed Runtime. If these names are new to you, that's fine — Module 1 will map every one of these to something you already know from SFRA. Nothing here is as foreign as it looks."

**Agenda (2 min)**  
Click through the agenda items. Tell participants:

> "Each agenda item links to a section. Your workshop site is also your reference — everything you need is in here, and it'll be here after today. Use it when you're demoing to customers."

### Transitions
- Direct everyone to open the workshop site on their own laptop
- Navigate to `/#/env-check` for the next section

---

## Environment Validation
**Page:** `/#/env-check` · **Time:** 15 minutes

### Goal
Every participant gets to a working, running Storefront Next instance with a green checklist before Module 1 starts. Do not skip anyone. A broken environment blocks the entire hands-on portion.

### How to run it

Run each check live in your own terminal, projected. Participants run the same command simultaneously.

**Check 1 — Node.js 24+**
```
node --version
```
Expected: `v24.x.x`  
Most common failure: Node 18 or 20 installed. Fix: `nvm install 24 && nvm use 24`. If they don't have nvm, download from nodejs.org — this takes 3 minutes.

**Check 2 — pnpm**
```
pnpm --version
```
Expected: `9.x.x`  
Fix: `npm install -g pnpm`

**Check 3 — Git configured**
```
git config --global user.email
```
Expected: their email address  
Fix: `git config --global user.email "you@example.com"` and `git config --global user.name "Your Name"`

**Check 4 — VS Code with Tailwind extension**
```
code --list-extensions | grep tailwind
```
Expected: `bradlc.vscode-tailwindcss`  
Fix: `code --install-extension bradlc.vscode-tailwindcss`

**Check 5 — Claude Code**
```
claude --version
```
Expected: version number  
Fix: `npm install -g @anthropic-ai/claude-code` — after install they need to run `claude` once to authenticate.

**Check 6 — Storefront running**
```
cd YOUR_REPO && pnpm dev
```
Expected: storefront loads at `http://localhost:5173` with product data  
Most common failure: `.env` not configured. Check that all five `PUBLIC__app__commerce__api__*` values are filled in with no extra spaces or quotes.

### Handling failures

- **1–2 people stuck:** Have a helper (or a neighbor) work with them while you keep the group moving. They can catch up on the first hands-on exercise.
- **3+ people stuck on the same thing:** Pause the group, fix it together. Announce what the fix is loudly so everyone hears.
- **Someone's sandbox is down:** They can pair with a neighbor for Module 1 and follow up with their team for a new sandbox. Do not let one broken sandbox hold up the group.
- **If it runs more than 15 minutes:** Stop regardless. Participants with issues will work alongside someone for the conceptual sections and continue debugging during the break.

### Facilitator note on the checklist
Instruct everyone to click each step in the workshop site to mark it green. This gives you a quick visual scan — ask everyone to raise their hand when they hit 6/6. Don't move on until you see most hands up.

---

## Module 1 — Architecture
**Page:** `/#/module/1` · **Time:** 25 minutes

### Goal
Participants understand how the four pieces of the stack (React, React Router 7, Tailwind, Managed Runtime) fit together and can map each to a concept they know from SFRA. This is conceptual, not hands-on — save the exercises for the end.

### Key framing to establish immediately

Before going into any technology, say this:

> "The mental model for SFRA: a controller runs, calls a pipeline, pipelines call scripts and APIs, a script renders an ISML template. The result is HTML. Same thing here. The file in `src/routes/` is your controller. The `loader()` function is your pipeline. The component is your ISML template. Tailwind classes are your CSS. The output is HTML."

Keep coming back to this map throughout the module.

### Walking the stack (15 min)

**React 19 — "ISML Templates"**  
- A component is just a function that returns JSX (HTML-like syntax). No new mental model needed — it's a template function.
- The new part: Streaming SSR. The server doesn't wait for all API calls to finish before sending HTML. It sends what it has and streams the rest. This is why Storefront Next loads fast — the shell of the page appears immediately while product data is still fetching.
- Suspense boundaries: show a skeleton card while a product is loading, swap in real content when it arrives.
- Show the `ProductTile` code example. Point out: it's just a function, it accepts props, it returns HTML-looking stuff.

**React Router 7 — "Controllers + Pipelines"**  
- File-based routing: create `src/routes/my-page.tsx` and `/my-page` is a live URL. No routing config file to maintain.
- `loader()` is the key concept. Everything that runs server-side lives here — API calls, auth checks, redirects. It runs before the page renders. The component receives the data from `useLoaderData()`.
- `action()` handles mutations — add to cart, form submissions. Always server-side. Always POST.
- Show the `product.$productId.tsx` example. Walk through: URL → file match → `loader()` runs → data returned → component renders.

**Tailwind + ShadCN — "Bootstrap + CSS"**  
- Utility-first: instead of writing `.product-card { border-radius: 12px; }` in a CSS file, you write `className="rounded-xl"` directly on the element.
- Show the before/after. The SFRA version has a class name pointing to a CSS file somewhere else. The Tailwind version has the style right on the element — you can read the design without leaving the component file.
- Design tokens: `tailwind.config.js` is where you set brand colors, fonts, and spacing. Change one value, the entire site updates. This is the fastest path from "I need this in our brand colors" to working code.
- ShadCN: pre-built accessible components (dialogs, dropdowns, buttons) that you copy into your project and own. No npm dependency to upgrade — the code is yours.

**Managed Runtime — "App Server"**  
- AWS Lambda. Each page request triggers a Lambda function that renders HTML and returns it.
- Elastic by nature: a flash sale with 100x normal traffic doesn't require capacity planning.
- Deploy: `pnpm build` → `pnpm push` (or `sfnext push`). One command, Managed Runtime handles everything else.

### Project structure (5 min)

Navigate to the file structure section. Project it and have everyone open VS Code on their own machine simultaneously.

```
src/routes/     ← pages
src/components/ ← UI pieces
src/lib/scapi/  ← API calls
tailwind.config.js ← brand tokens
.env            ← credentials (never commit)
```

Ask the room: "Where would you go to change the homepage layout?" (`src/routes/_index.tsx`)  
Ask: "Where would you go to change the button color across the whole site?" (`tailwind.config.js`)  
Ask: "Where would you go to change how a product is fetched from the API?" (`src/lib/scapi/products.ts`)

### Request lifecycle (3 min)

Walk the six steps. Do it slowly — this is the moment where it clicks for most people.

1. Browser requests `/product/123`
2. MRT Lambda receives the request
3. React Router matches it to `product.$id.tsx`
4. `loader()` runs server-side, calls SCAPI
5. React renders the page with data, HTML streams to browser
6. Browser hydrates — React takes over for click handlers, state, etc.

### Commerce Apps (2 min awareness)

After the request lifecycle, briefly mention the Commerce Apps section. Don't spend much time — it's awareness-only.

> "Commerce Apps are how ISVs and partners ship extensions for Storefront Next. The key insight: when a Commerce App includes UI components, `b2c cap install` creates a pull request with those changes. Git-based, reviewable, no cartridge overlay surprises."

### SE Talking Points

Draw attention to the amber callout. Give participants 30 seconds to read the four talking points silently, then ask: "Which of these resonates most with your current deals?"

### Hands-on exercises (7 min)

Direct everyone to the five step cards. Walk around and make sure people are actually doing them, not just reading them.

- **Step 1:** Open project in VS Code — just getting oriented
- **Step 2 (updated):** Trace a request through the code — participants open `_index.tsx`, find the `loader()`, and ask Claude Code to explain what it does. They verify the answer against the request lifecycle diagram. This is more active than just "find the file."
- **Step 3:** Inspect Tailwind classes in browser DevTools — the "aha" moment is usually seeing `rounded-2xl` and finding it in the source file immediately
- **Step 4 (updated):** Prove SSR is working — participants search the raw HTML response for a product name. If they find it, SSR is confirmed. They then explain to their neighbor why this matters for SEO. The peer-teaching element reinforces understanding.
- **Step 5:** Open `config.server.ts` and `tailwind.config.js` — understand these are the two master controls

### Common questions

**"Why not just use CSS files like normal?"**  
Tailwind eliminates context switching — you never leave the component file to style it. For a team of mixed experience levels, being able to read `bg-sky-500 rounded-xl p-4` and understand the design without opening a separate file is a real productivity gain.

**"Is this the same as Remix?"**  
React Router 7 is built by the same team as Remix and incorporates most of its patterns. If they've heard of Remix, yes — it's essentially that.

**"What about OCAPI — do we still use that?"**  
No. Storefront Next uses SCAPI exclusively. OCAPI is the older API for cartridge-based storefronts. SCAPI is the modern Shopper API that Storefront Next was designed around.

---

## Module 2 — Frontend Modifications
**Page:** `/#/module/2` · **Time:** 45 minutes

### Goal
Participants make real, visible changes to their storefront. By the end, everyone has a storefront that looks noticeably different from the default template. The emphasis is on speed — how fast you can change things — not on perfect code.

### Before starting

Open the Odyssey storefront on the projector: `https://sfcc-odyssey-production.mobify-storefront.com/global/en-GB/`

> "This is a real Storefront Next implementation. Everything we're doing in this module is based on what you see here. We're not inventing — we're building toward something that's already live."

Have participants open the Odyssey storefront on their own machines too. Tell them to keep it open in a tab throughout this module.

### Part 1 — Brand Tokens (10 min)

**Explain first (3 min):**  
`tailwind.config.js` is the single source of truth for the visual brand. When a designer hands you a brand kit with hex codes and font names, this is where they go. Change a color here, every button, badge, link, and accent in the entire site updates.

Show the example config and walk through what each token controls:
- `colors.primary.500` → buttons, links, active states
- `colors.accent.DEFAULT` → sale badges, promotions, highlights
- `fontFamily.sans` → all body text

**Hands-on (7 min):**  
> "Pick a brand direction — doesn't have to be real. Luxury fashion, outdoor gear, electronics, whatever. Update your `tailwind.config.js` with a color palette that fits. Save it and watch your storefront update live."

While they work, walk around. If someone is stuck: have them ask Claude Code — "Update my tailwind.config.js to reflect a [type of brand] aesthetic with these requirements: [describe it]."

### Part 2 — Hero Banner Component (10 min)

**Explain first (4 min):**  
Show the before/after comparison side by side on the projector. The ISML version has a template string with `${pdict.heroImage}`. The React version is a typed component with explicit props — every piece of content is documented in the interface.

The key point: because the hero is a component, you can use it in multiple places with different content. On the homepage, on a campaign landing page, on a category page — same component, different props. In SFRA you'd copy-paste the ISML block and maintain each copy separately.

**Hands-on (6 min):**  
> "Find your hero banner in `src/routes/_index.tsx`. Update the gradient overlay color to match your new brand palette from Part 1. Change the CTA button to match."

The Tailwind class to find is likely something like `bg-gradient-to-t from-black/70`. If their primary color is, say, deep navy, they'd change it to `from-[#0a0a2e]/80` or map it to their custom token.

### Part 3 — Product Tile Enhancement (15 min)

This is the longest and most impactful part of Module 2. Spend extra time here if the group is engaged.

**Explain first (5 min):**  
Open the Odyssey product listing page. Show participants:
- The hover image swap (move mouse over a product — image changes)
- The slide-up Quick Add button
- The badge in the corner (NEW, sale %)
- The wishlist icon that appears on hover

> "Each of these is a small independent behavior. React state handles whether the user is hovering. Tailwind's `group-hover` classes handle the CSS. There's no JavaScript file to maintain separately — the behavior and the style are in the same component."

Walk through the enhanced `ProductTile` code in the module. Point out these specific patterns:
- `className="group ..."` on the parent + `className="group-hover:opacity-100 ..."` on the child = CSS-only hover coordination
- `translate-y-full group-hover:translate-y-0 transition-transform` = slide-up animation, no JS needed
- `isHovered` state for the image swap = one `useState`, two `onMouseEnter`/`onMouseLeave` handlers

**Hands-on (10 min):**  
> "Find `src/components/product-tile/index.tsx`. Add a slide-up Quick Add button that appears on hover. Use the pattern from the module as a guide — or ask Claude Code."

For participants who want to use Claude Code:
> "In my ProductTile component, add a Quick Add button that slides up from the bottom on hover. Use Tailwind group-hover and translate-y transitions. Don't break the existing layout."

Walk around. Watch for people adding inline `style=` attributes — redirect them to Tailwind classes.

### Part 4 — PLP Layout (10 min)

**Explain (3 min):**  
Show the category route structure. The entire layout — sidebar, grid, product tiles — is in one file. Changing column count is one class name. Swapping filter position from left to right is moving a `div`.

> "In SFRA, layout was spread across pipeline parameters, ISML templates, Bootstrap grid classes, and JavaScript. Here it's one file. One place to look, one place to change."

**Hands-on (7 min):**  
> "In your category route, change the grid from 3 columns to 4 on large screens. Add a product count above the grid — something like '553 Products'. Check Odyssey for reference on how it looks."

### Page Designer Integration (awareness only)

After Part 4 (PLP Layout), there's a new Page Designer awareness section. Don't go deep — it's there for customer conversation prep.

> "When a merchandiser asks 'can I change the page without a developer?' — yes. Page Designer works with Storefront Next. Developers add TypeScript decorators to routes, the build process generates metadata for Business Manager, and merchandisers manage content through the familiar BM interface."

If anyone asks for more detail, point them to the MCP server tool `sfnext_add_page_designer_decorator` covered in Module 4.

### SE Talking Points

Same pattern as Module 1: draw attention to the amber callout, give participants 30 seconds to read, ask which resonates.

### Challenge exercise (if time allows)

For participants who finish early:
> "Add a badge system to your product tiles. Show 'NEW' if `product.isNew === true`, and show a discount percentage badge if the product has a sale price. Reference the Odyssey storefront for how the badges are positioned."

---

## Break
**Time:** 10 minutes — hold firm to this

Announce: "We're right on schedule. Take 10, be back at [exact time]."

While participants are on break:
- Navigate to `/#/module/3` on the projector
- Open `src/routes/product.$productId.tsx` in VS Code on the projector machine
- Have a glass of water

---

## Module 3 — Backend Logic, Data Flow & Deployment
**Page:** `/#/module/3` · **Time:** 40 minutes

### Goal
Participants understand how data gets into the page (loaders), how mutations happen (actions), and how SCAPI calls are structured. They write or modify at least one loader and understand where to put a new API call.

### Key framing

Before starting:

> "If Module 2 was about what shoppers see, Module 3 is about how data gets there. Everything you do here runs on the server — it never reaches the browser. That's a security model, not just an architecture."

Then write this on a whiteboard or say it clearly:

> **loader() = read. action() = write. Both run server-side. Both are in the route file.**

This is the entire mental model for Module 3.

### Part 1 — Loaders (10 min)

**Explain (5 min):**  
Walk the loader example in the module. Emphasize three things:

1. **It runs on the server.** API credentials in here never reach the browser. There's no equivalent of a client-side `fetch` that exposes your token.
2. **`Promise.all()` for parallel fetches.** If you need product data and recommendations, fire both at the same time. Don't chain them. Show the time savings: two 200ms calls in sequence = 400ms. In parallel = 200ms.
3. **Type safety flows through.** `useLoaderData<typeof loader>()` means TypeScript knows exactly what shape the data is. No guessing. No runtime surprises.

**Common SFRA parallel:**  
> "In SFRA, a pipeline node called one API, then the next node called another, sequentially. Here you call both in one line with `Promise.all`. This is one of the fastest wins in Storefront Next."

**Hands-on (5 min):**  
> "Open your product route. The loader currently fetches one thing. Add a parallel fetch for product recommendations — even if you just mock the function for now. Use `Promise.all()`."

### Part 2 — Actions (8 min)

**Explain (4 min):**  
Walk the cart action example. Key points:

- It reads `formData` — this is a standard HTML form POST. No custom API needed.
- It runs server-side. The basket API token never leaves the server.
- On success: `redirect()` — the page reloads with fresh loader data.
- On failure: return an error object — the component reads it with `useActionData()`.

Show the `AddToCartButton` component. Point out:
- The form has no `onSubmit` handler — React Router handles the POST
- `navigation.state === 'submitting'` is how you know a form is in-flight — use it to show loading state
- Progressive enhancement: if JavaScript is disabled, the form still submits and redirects. It just won't show the "Adding..." state.

**Hands-on (4 min):**  
> "Add an Add to Wishlist action to your product route. It should read `productId` from formData. For now, just `console.log` the value — we're testing that the action fires and receives the data correctly."

### Part 3 — SCAPI Integration (8 min)

**Explain (4 min):**  
Open `src/lib/scapi/products.ts` (or wherever it lives in the template). Walk the structure:

- It's a plain async function that makes a `fetch()` call to a SCAPI URL
- The URL pattern: `https://{shortCode}.api.commercecloud.salesforce.com/product/shopper-products/v1/...`
- Authorization header: SLAS token from the session
- Return: a clean typed interface — not the raw SCAPI shape

> "This is the seam between Salesforce's API and your app. You own this code. If SCAPI adds a new field you want, you add it to the interface and the mapping function. Nobody else's upgrade breaks your site."

**Hands-on (4 min):**  
> "Add a `getProductsByCategory(categoryId: string)` function to the products SCAPI file. Define the return type. You don't need to implement the full fetch — define the function signature and the return interface."

### Part 4 — Custom Hooks (5 min)

**Explain (3 min):**  
Custom hooks are reusable logic with state. Walk the `useProductInventory` example. The concept to reinforce:

> "If you find yourself writing the same `useEffect` + `useState` pattern in two components, extract it to a hook. The component just calls `const { available, lowStock } = useProductInventory(productId)` and gets clean data. It doesn't care how the fetch works."

**Hands-on (2 min):**  
> "Create `src/hooks/useRecentlyViewed.ts`. When called, it should return up to 5 product IDs from localStorage. Don't implement the full storage logic yet — just define the hook signature and the return type."

### Part 5 — Error Boundaries (4 min)

**Explain (2 min):**  
Walk the error boundary example. Two points:

1. It's co-located — the error handler is in the same file as the route that can fail
2. `isRouteErrorResponse(error)` lets you handle 404s differently from generic errors

> "In SFRA, a pipeline error usually showed a generic error page or crashed ungracefully. Here you have surgical control — a 404 on the cart shows 'basket expired, start a new one.' A 500 shows a generic error. Same file."

**Hands-on (2 min):**
> "Add an `ErrorBoundary` export to your cart route. Handle a 404 with a helpful message. The 404 case is: the basket expired."

### Part 6 — Deployment to Managed Runtime (5 min)

**Explain (2 min):**
Walk the deployment commands. Three commands to know:

- `pnpm sfnext push` — deploy the storefront to MRT
- `b2c mrt env var push` — sync your local `.env` to the remote environment (only applies differences — safe to run)
- `b2c mrt tail-logs` — live log stream from the deployed storefront, with filtering by level and search patterns

> "This is the deployment story for customers. One command to deploy. One command to push env vars. One command to debug in real time. No SSH, no server access, no DevOps pipeline to build."

**Hands-on (3 min):**
> "Deploy your storefront with `pnpm sfnext push`. Once it's live, open the URL and check that your brand changes are visible. If something looks off, run `b2c mrt tail-logs` and filter by errors."

If participants don't have MRT project access, this exercise becomes a demo-only walkthrough. Show the commands and output on the projector.

### Authentication Architecture (awareness only)

Don't spend time on this section — it's conceptual and included for customer conversation prep. If anyone asks during the module, point to the three-card grid on the page:

> "SLAS with split cookies. Access and refresh tokens in separate cookies, server-side refresh. Guest-to-registered is an atomic swap. The template handles all of this — you don't implement it."

### SE Talking Points

Draw attention to the amber "SE Talking Points" callout before the exercises. Ask participants to read through it and identify which point is most relevant to their current deals.

---

## Module 4 — AI Development with Claude Code
**Page:** `/#/module/4` · **Time:** 25 minutes

### Goal
Participants leave knowing how to use Claude Code effectively for Storefront Next work — not just "AI can help" but specifically what to type and what to expect. The outcome is a set of repeatable habits they can use on their next customer engagement.

### Setup context (5 min)

**MCP server:**
Walk the setup code. The install pattern has changed — it's now a single `npx` command, no global install needed:

> "One command: `claude mcp add ... npx -y @salesforce/b2c-dx-mcp@latest`. No global npm install. It auto-detects your project type — Storefront Next, SFRA, or PWA Kit — and loads the right tools automatically."

Point out the multi-IDE callout: the MCP server works with Cursor and VS Code + Copilot too. For non-Claude-Code users, show the `.cursor/mcp.json` and `.vscode/mcp.json` patterns.

**MCP tools tour:**
After the setup, walk the six MCP tools in the grid. Ask participants to try this prompt in Claude Code:

> "What Storefront Next tools do you have?"

The tools they should see: `sfnext_get_guidelines`, `sfnext_configure_theme`, `sfnext_analyze_component`, `sfnext_match_tokens_to_theme`, `sfnext_start_figma_workflow`, `sfnext_add_page_designer_decorator`. Walk through what each does — the most relevant for demos are `sfnext_configure_theme` (instant brand customization) and `sfnext_get_guidelines` (ensures the AI follows Storefront Next conventions).

**CLAUDE.md:**  
This is the highest-leverage thing participants can do. Show the template.

> "CLAUDE.md is a file you commit to your project root. Claude Code reads it automatically at the start of every session. Your brand guidelines, your coding conventions, your file structure preferences — put it all here. Every prompt you write after that starts with full context. You don't repeat yourself."

Have everyone create their `CLAUDE.md` right now, before the prompt exercises. They can fill in placeholder values — the structure matters more than the content at this point.

### Prompt templates walkthrough (12 min)

Walk each of the three brand/look-and-feel prompts and three logic prompts. For each one, emphasize the pattern:

**What makes a strong prompt:**
1. **Name the file.** Don't say "my product tile" — say `src/components/product-tile/index.tsx`
2. **Describe the goal, not the steps.** Don't say "add a div with class X" — say "add a Quick Add button that slides up on hover"
3. **State the constraints.** "Use Tailwind only, no inline styles." "Don't change the prop interface." "Keep the existing layout."
4. **Give a reference if you have one.** "Similar to the Odyssey storefront pattern."

**What makes a weak prompt:**
- "Make it look better"
- "Add a feature"
- "Fix the styling"
- "Update the cart"

Show the weak/strong comparison table in the module explicitly. Leave it on screen while they work.

**Demonstrate one prompt live (5 min of the 12):**  
Open Claude Code in your terminal projected to the room. Navigate to the workshop template project. Run:

```
I'm building a Storefront Next storefront for a fashion brand.
In tailwind.config.js, update the color palette to an upscale, 
editorial aesthetic — warm off-white background, deep charcoal 
text, dusty rose accent. Show me what the primary button would 
look like with the new tokens.
```

Let it run live. Show participants how Claude Code reads the actual file, then makes targeted edits. Point out that it reads `tailwind.config.js` first before touching anything.

### Hands-on exercises (8 min)

The five exercises are progressive — each one builds a new muscle.

**Exercise 1 — Create CLAUDE.md**  
Everyone should do this. 2 minutes. Commit it.

**Exercise 2 — Brand in one prompt**  
Give participants the brand theming prompt template from the module. Tell them to adapt it to their own direction and run it. 2 minutes.

**Exercise 3 — Build a component with a detailed prompt**  
Use the Figma-to-code prompt template. Have each participant describe their ideal product tile with specifics: dimensions, colors, hover behavior. 2 minutes.

**Exercise 4 — Extend a loader with context-aware prompting**  
Have participants ask Claude Code to read their category route and add sorting to the loader. Emphasize: Claude Code will read the actual file and extend it — not generate something generic. 2 minutes.

**Exercise 5 (Challenge) — Describe the Odyssey homepage**  
For fast finishers: pick one element from the Odyssey storefront, describe it in detail to Claude Code, have it build a matching component.

### SE Talking Points & Migration

Draw attention to the SE Talking Points callout before the exercises. The MCP server cross-IDE point is especially powerful in competitive conversations.

After the wrap-up card, there's a migration callout:

> "Storefront Next supports a hybrid proxy pattern — customers can migrate page-by-page from SFRA. Specific routes go through Storefront Next while the rest stay on SFRA. This is a critical talking point for existing SFRA customers who are nervous about a full rewrite."

### The iterative pattern (closing thought)

End Module 4 with this:

> "The biggest mistake people make with Claude Code is trying to describe an entire feature in one prompt. Start small. Ask Claude Code to read the relevant file. Then ask for the first piece. Review it. Ask for the next piece. You'll get better output and you'll understand what's being built — which matters when you're presenting it to a customer."

---

## Q&A & Wrap-up
**Time:** 10 minutes

### Review what was covered

Quickly navigate through each module page on the projector. As you click through:

> "In Module 1 you mapped the stack to what you already know. In Module 2 you changed the visual experience — brand tokens, hero banner, product tiles. In Module 3 you changed how data flows — loaders, actions, SCAPI. In Module 4 you built a repeatable AI-accelerated workflow."

### The SE pitch for this in a customer conversation

Before opening for questions, give participants the one-line story for each of the four common customer contexts:

| Context | What to say |
|---|---|
| "We're on SFRA, happy there" | "Storefront Next is the new default for net-new. You stay on SFRA — fully supported, no EOL. Next new project starts here." |
| "We've looked at headless, it's too complex" | "This is headless with guard rails. Template-first, AI-assisted, and it deploys to Managed Runtime — you don't manage infrastructure." |
| "We're evaluating Shopify/BigCommerce" | "Storefront Next matches modern developer experience and has better Core Web Vitals OOTB. Plus you keep B2C Commerce's enterprise capabilities." |
| "We want to use AI in our commerce stack" | "Storefront Next is the only commerce platform with a first-party MCP server and Shopper Agent integration out of the box." |

### Open Q&A

Common questions that come up and how to answer them:

**"Can we still use SFRA cartridges with Storefront Next?"**  
No — Storefront Next is a fully headless storefront. It communicates with B2C Commerce via SCAPI only. If a customer has SFRA cartridges with critical business logic, that logic needs to either live in B2C Commerce (as scripts/hooks/services) accessible via SCAPI, or be rebuilt in the storefront. The AI migration tool helps with this.

**"What about Page Designer?"**  
Page Designer works with Storefront Next. The template includes a Page Designer integration that lets merchandisers manage content using the familiar BM interface while the frontend renders via React components. This is not yet covered in this workshop (it's on the roadmap for Session 2).

**"How does SLAS authentication work?"**  
Storefront Next uses SLAS (Shopper Login and API Access Service) exclusively. Guest shoppers get a SLAS public client token automatically. Registered shoppers do a SLAS login exchange. Tokens are stored in split cookies (access token + refresh token, separate cookies for security). Module 3 touches on this — Module 4 has a prompt template for the full implementation.

**"What's the deployment story for customers?"**  
`pnpm push` / `sfnext push` deploys to Managed Runtime. GitHub Actions CI/CD is the standard approach — commit to main, workflow builds and deploys. MRT handles CDN, SSL, global distribution. There's no server to manage.

**"Is this only for new implementations or can existing customers migrate?"**  
Both. New customers start here. Existing customers can use the AI-assisted migration tool — it generates a detailed migration plan from your existing SFRA codebase and executes it step by step with a verification loop. This is the "Option 2: Storefront Next Leap" path from the slides.

### Closing

> "The workshop site stays available to you — bookmark it, share it with customers, use it as a reference. Everything in it will stay up to date as Storefront Next evolves."

Share the Slack channel: `#cc-sfnext-internal-se`

Share the key links:
- Template repo: `github.com/SalesforceCommerceCloud/storefront-next-template`
- B2C Developer Tooling: `salesforcecommercecloud.github.io/b2c-developer-tooling/`
- Odyssey reference store: `sfcc-odyssey-production.mobify-storefront.com/global/en-GB/`

Ask for feedback before anyone leaves — one thing that landed well, one thing that could be better.

---

## Troubleshooting Reference

### During environment validation

| Symptom | Fix |
|---|---|
| `node: command not found` | nvm not initialized — add nvm to shell profile, restart terminal |
| `node --version` shows v18 or v20 | `nvm install 24 && nvm use 24 && nvm alias default 24` |
| `pnpm: command not found` | `npm install -g pnpm` |
| `claude: command not found` | `npm install -g @anthropic-ai/claude-code` |
| `b2c: command not found` | `npm install -g @salesforce/b2c-cli` |
| Storefront loads but no products | `.env` credentials wrong or sandbox inactive — check values, run `b2c sandbox list` |
| `pnpm dev` fails with module error | `rm -rf node_modules && pnpm install && pnpm dev` |
| `pnpm dev` fails with TypeScript error | `pnpm typecheck` to see the full error; usually a missing type import |

### During hands-on exercises

| Symptom | Fix |
|---|---|
| Tailwind classes not applying | Check that the file is inside `src/` — Tailwind only scans paths in `tailwind.config.js` content array |
| HMR not updating on save | Check terminal for compile error — usually a TypeScript type error |
| Component renders wrong | Check that the component is exported correctly — `export function X` or `export default X` |
| `useLoaderData` returns undefined | Loader function must be named exactly `loader` and exported |
| Claude Code ignores CLAUDE.md | CLAUDE.md must be in the project root, not a subdirectory |

---

## After the Workshop

- [ ] Update this guide with anything that didn't go as planned — common questions, timing that was off, exercises that needed more or less time
- [ ] Update `WORKSHOP_NOTES.md` with friction points observed
- [ ] Note any content gaps participants asked about that aren't covered (advanced migration tooling, advanced SLAS implementation, Commerce Apps deep dive)
- [ ] Send a follow-up Slack message with the workshop site URL and the key resource links
- [ ] Ask one or two participants for a 15-minute debrief call the following week — their feedback after trying things on their own is the most useful signal for improving the next run
