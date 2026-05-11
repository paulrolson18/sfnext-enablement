# Storefront Next SE Workshop — Self-Paced Assessment

**Instructions:** 15 multiple-choice questions covering the four workshop modules. Answer each question, then check your answers against the key at the bottom. Aim for 12/15 or higher.

---

## Module 1 — Architecture (Questions 1–4)

### Question 1
In Storefront Next, what is the SFRA equivalent of a `loader()` function in a route file?

- A) An ISML template
- B) A controller pipeline node that fetches data
- C) A `require()` call in a client-side script
- D) A cartridge overlay

### Question 2
Storefront Next runs on Managed Runtime (MRT). What infrastructure does MRT use under the hood?

- A) Heroku dynos with auto-scaling
- B) A shared B2C Commerce application server
- C) AWS Lambda functions with elastic scaling
- D) Docker containers on Kubernetes

### Question 3
Put the following steps of a Storefront Next request in the correct order:

1. React renders the component with data
2. Browser requests `/product/123`
3. `loader()` runs server-side and calls SCAPI
4. React Router matches the URL to `product.$id.tsx`
5. Browser hydrates — React takes over for interactions

- A) 2 → 4 → 3 → 1 → 5
- B) 2 → 3 → 4 → 1 → 5
- C) 4 → 2 → 3 → 1 → 5
- D) 2 → 4 → 1 → 3 → 5

### Question 4
When a Commerce App (CAP) includes Storefront Next UI components, what happens during `b2c cap install`?

- A) The components are injected into the running storefront automatically
- B) A cartridge overlay is applied to the Storefront Next template
- C) A pull request is automatically created with the UI changes
- D) The components are published to npm for manual installation

---

## Module 2 — Frontend (Questions 5–7)

### Question 5
Where do you change the primary brand color so it updates across the entire Storefront Next storefront?

- A) `src/styles/global.css`
- B) `tailwind.config.js`
- C) Each component's inline `style` attribute
- D) `src/providers/ThemeProvider.tsx`

### Question 6
What is the key advantage of React components over ISML templates for UI reuse?

- A) React components compile to native mobile apps
- B) React components are typed with props interfaces and can be used in multiple locations with different content — no copy-paste
- C) React components are cached at the CDN layer automatically
- D) React components don't require JavaScript

### Question 7
In the Page Designer integration, how do developers define page types for Business Manager?

- A) By creating XML configuration files in the `cartridges/` directory
- B) By adding TypeScript decorators to route files — the build process generates metadata for BM
- C) By manually configuring page types in Business Manager settings
- D) By writing ISML templates that BM reads

---

## Module 3 — Backend (Questions 8–11)

### Question 8
What is the difference between a `loader()` and an `action()` in React Router 7?

- A) Loaders run client-side, actions run server-side
- B) Loaders read data (GET), actions write data (POST) — both run server-side
- C) Loaders are for API calls, actions are for rendering
- D) There is no difference — they're interchangeable

### Question 9
A product detail page needs to load both product data and Einstein recommendations. What pattern gives the best performance?

- A) Call `getProduct()` first, then call `getRecommendations()` after it finishes
- B) Use `Promise.all()` to fetch both in parallel within the `loader()`
- C) Fetch recommendations client-side with `useEffect()` after the page renders
- D) Use a middleware function to pre-fetch all data before any route loads

### Question 10
Storefront Next uses SLAS with a "split-cookie" architecture. What does this mean?

- A) The SLAS token is split into chunks and stored across multiple localStorage keys
- B) Access token and refresh token are stored in separate cookies — never both in one cookie
- C) The cookie is split between the client and a third-party CDN
- D) Guest and registered shoppers use different cookie domains

### Question 11
Which commands would you use to deploy a Storefront Next storefront and then debug errors on the deployed instance?

- A) `npm run build && npm run deploy` then check server logs in AWS console
- B) `pnpm sfnext push` then `b2c mrt tail-logs`
- C) `git push origin main` then wait for GitHub Actions to report
- D) `sfcc deploy --target production` then `sfcc logs --follow`

---

## Module 4 — AI Development (Questions 12–15)

### Question 12
What is the purpose of a `CLAUDE.md` file in a Storefront Next project?

- A) It configures the Claude Code authentication credentials
- B) It provides project-level context (brand guidelines, coding conventions, file structure) that Claude Code reads automatically at the start of every session
- C) It enables the MCP server to deploy code
- D) It replaces the `package.json` for AI-specific dependencies

### Question 13
Which of the following is a STRONG prompt for Claude Code?

- A) "Make the product tile look better"
- B) "In `src/components/product-tile/index.tsx`, add a hover image swap and slide-up Quick Add button using Tailwind `group-hover` classes"
- C) "Update the styling"
- D) "Fix the bug in the cart"

### Question 14
The B2C MCP server provides Storefront Next-specific tools. Which tool would you use to quickly customize your storefront's brand colors and fonts?

- A) `sfnext_analyze_component`
- B) `sfnext_get_guidelines`
- C) `sfnext_configure_theme`
- D) `sfnext_add_page_designer_decorator`

### Question 15
A customer's development team uses Cursor (not Claude Code) as their AI coding assistant. Can they still use the B2C MCP server?

- A) No — the MCP server only works with Claude Code
- B) Yes — create a `.cursor/mcp.json` file with the MCP server configuration
- C) Yes — but they need to install a separate Cursor-specific plugin
- D) No — they need to switch to VS Code with Copilot for MCP support

---

## Answer Key

| # | Answer | Explanation |
|---|--------|-------------|
| 1 | **B** | The `loader()` function runs server-side before the page renders, fetching data from APIs — just like a controller pipeline node in SFRA that calls scripts and APIs before rendering an ISML template. |
| 2 | **C** | Managed Runtime uses AWS Lambda functions. Each page request triggers a Lambda function that renders HTML. This provides elastic scaling — flash sales with 100x traffic work without capacity planning. |
| 3 | **A** | The correct order: Browser requests URL → React Router matches the file → `loader()` runs server-side calling SCAPI → React renders with the data → Browser hydrates for client-side interactivity. |
| 4 | **C** | Commerce Apps with Storefront Next UI components automatically create a pull request with the UI changes during `b2c cap install` — reflecting the modern, git-based development workflow. |
| 5 | **B** | `tailwind.config.js` is the single source of truth for brand tokens (colors, fonts, spacing, border radius). Change a token there and every component using that token updates site-wide. |
| 6 | **B** | React components have typed props interfaces and can be reused across pages with different content. The same `HeroBanner` component works on homepage, category, and campaign pages — no copy-paste. |
| 7 | **B** | Developers add TypeScript decorators (`@PageType`, `@RegionDefinition`) to routes. The build process generates JSON metadata that Business Manager reads, enabling merchandisers to manage content through the familiar BM interface. |
| 8 | **B** | Loaders handle reads (GET requests, data fetching) and actions handle writes (POST requests, mutations like add-to-cart). Both run server-side — API credentials never reach the browser. |
| 9 | **B** | `Promise.all()` fires both API calls simultaneously. Two 200ms calls in sequence = 400ms. In parallel = 200ms. This is one of the biggest performance wins compared to sequential SFRA pipelines. |
| 10 | **B** | Split-cookie architecture stores the access token and refresh token in separate cookies. Token refresh happens server-side in middleware — credentials never reach the browser. Guest-to-registered login swaps cookie types atomically. |
| 11 | **B** | `pnpm sfnext push` deploys to Managed Runtime. `b2c mrt tail-logs` streams live logs from the deployed instance, with filters for error level and search patterns. |
| 12 | **B** | `CLAUDE.md` is committed to the project root. Claude Code reads it automatically at session start, gaining context about your brand, conventions, and goals — dramatically improving output quality and consistency. |
| 13 | **B** | Strong prompts name the file, describe the visual goal, reference specific patterns, and state constraints. "In `src/components/product-tile/index.tsx`, add a hover image swap and slide-up Quick Add button using Tailwind `group-hover` classes" gives Claude Code everything it needs. |
| 14 | **C** | `sfnext_configure_theme` configures your Tailwind theme via AI prompts — it's the fastest path to brand customization. `sfnext_get_guidelines` loads development rules, while `sfnext_analyze_component` inspects existing code. |
| 15 | **B** | The MCP server works with any AI coding assistant. For Cursor, create `.cursor/mcp.json` with the MCP server configuration. For VS Code + Copilot, use `.vscode/mcp.json`. No vendor lock-in. |

---

**Scoring:**
- **13–15 correct:** Excellent — you're ready to present Storefront Next to customers with confidence.
- **10–12 correct:** Good foundation — review the modules for any areas you missed.
- **Below 10:** Revisit the workshop site and spend extra time on the modules where you missed questions.
