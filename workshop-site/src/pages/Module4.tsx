import { Link } from 'react-router-dom'
import { Home, Sparkles, Zap, Cpu, MessageSquare, CheckCircle2, Copy, Check } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import CodeBlock from '../components/CodeBlock'
import Callout from '../components/Callout'
import StepCard from '../components/StepCard'
import { useState } from 'react'

function PromptCard({
  category,
  categoryColor,
  title,
  description,
  prompt,
  followUp,
}: {
  category: string
  categoryColor: string
  title: string
  description: string
  prompt: string
  followUp?: string
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-xl border border-violet-500/20 bg-violet-950/10 overflow-hidden">
      <div className="px-4 py-3 border-b border-violet-500/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold bg-violet-500/15 ${categoryColor}`}>
            {category}
          </span>
          <span className="text-slate-300 font-medium text-sm">{title}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 text-xs transition-colors"
        >
          {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
          {copied ? 'Copied' : 'Copy prompt'}
        </button>
      </div>
      <div className="p-4">
        <p className="text-slate-400 text-xs mb-3">{description}</p>
        <div className="rounded-lg bg-slate-900/80 border border-slate-700/50 p-3 font-mono text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
          {prompt}
        </div>
        {followUp && (
          <div className="mt-3">
            <p className="text-slate-500 text-xs mb-2">Good follow-up prompt:</p>
            <div className="rounded-lg bg-slate-900/50 border border-slate-700/30 p-3 font-mono text-xs text-slate-400 leading-relaxed">
              {followUp}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const mcpSetupCode = `# 1. Add the B2C MCP Server to Claude Code (no global install needed)
claude mcp add --transport stdio --scope project b2c-dx-mcp -- npx -y @salesforce/b2c-dx-mcp@latest --allow-non-ga-tools

# 2. Install B2C-specific agent skills
claude plugin marketplace add SalesforceCommerceCloud/b2c-developer-tooling
claude plugin install b2c-cli
claude plugin install b2c
claude plugin install storefront-next

# 3. Configure your instance connection
b2c config set --instance YOUR_SANDBOX.demandware.net
b2c config set --client-id YOUR_CLIENT_ID

# 4. Verify Claude Code sees the MCP tools
# In Claude Code, ask: "What Storefront Next tools do you have?"`

const claudeMdShipped = `# What ships in the template's CLAUDE.md:

## Project Structure
├── src/routes/       — File-based routes (React Router 7)
├── src/components/   — React components (ui/ for Radix + Tailwind)
├── src/lib/          — Shared utils, hooks, adapters
├── config.server.ts  — Configuration defaults
└── docs/             — 20+ detailed architecture docs

## Performance & Data Rules (22 rules!)
✓ Server-load everything — no useEffect for initial data
✓ Classify data: critical (await) vs non-critical (Promise)
✓ One <Suspense> boundary per async operation
✓ Skeleton screens for known layouts
✓ URL-worthy state in useSearchParams, not useState
✓ <DynamicImage> with widths for all product images

## Code Conventions
✓ Apache 2.0 copyright header (ESLint-enforced)
✓ Site-context-aware Link/NavLink (not React Router originals)
✓ Tailwind utility classes + design tokens (not hard-coded colors)
✓ cn() from @/lib/utils to merge class names

## Testing Strategy
✓ Unit tests (Vitest + React Testing Library)
✓ Storybook snapshot + interaction tests
✓ A11y tests via axe-core

## 20+ Linked Architecture Docs
Data fetching, Suspense patterns, state management,
adapter pattern, auth, i18n, multi-site, Page Designer,
images, SEO, performance, testing, and more.`

const claudeMdCustomize = `# Storefront Next Project
# Add YOUR customizations to CLAUDE.md

## Brand Guidelines (add these!)
- Primary color: #1a1a2e (deep navy)
- Accent color: #c9a84c (gold)
- Typography: Helvetica Neue for body, Playfair Display for headings
- Border radius: 12px for cards, pill (9999px) for buttons
- Tone: upscale, editorial, minimal

## What I'm Building (add this!)
Building a luxury fashion storefront targeting
high-end women's apparel. Focus on editorial
product photography and minimal UI.`

export default function Module4() {
  return (
    <div className="space-y-12">
      <SectionHeader
        badge="Module 4 · 25 min"
        title="AI-Accelerated Development"
        subtitle="Claude Code with the B2C MCP server is the fastest way to build and modify Storefront Next. The right prompts can generate a component, refactor data flow, or implement a full feature in under a minute."
        gradient="violet"
      />

      <Callout type="ai" title="What makes Claude Code different for Storefront Next">
        Claude Code with the B2C MCP server has deep knowledge of B2C Commerce: SCAPI endpoints, sandbox management, cartridge deployment, and Storefront Next patterns. It's not just code generation — it understands the platform.
      </Callout>

      {/* MCP Setup */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-violet-500/15 border border-violet-500/30 flex items-center justify-center">
            <Cpu size={15} className="text-violet-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Part 1 — Setup: Claude Code + B2C MCP</h2>
          <span className="text-slate-500 text-sm">5 min</span>
        </div>
        <p className="text-slate-400 text-sm mb-5 leading-relaxed">
          The B2C MCP server gives Claude Code direct access to your B2C instance. It auto-detects your project type (Storefront Next, SFRA, or PWA Kit) and loads the right tools automatically — no manual configuration needed.
        </p>
        <CodeBlock code={mcpSetupCode} language="bash" filename="Terminal" />
        <div className="mt-4">
          <Callout type="tip" title="Using Cursor or VS Code instead?">
            The MCP server works with any AI coding assistant. For Cursor, create{' '}
            <code className="bg-slate-800 px-1.5 py-0.5 rounded text-violet-400 font-mono text-xs">.cursor/mcp.json</code>{' '}
            with: <code className="bg-slate-800 px-1 py-0.5 rounded text-violet-400 font-mono text-xs">
            {`{"mcpServers":{"b2c-dx-mcp":{"command":"npx","args":["-y","@salesforce/b2c-dx-mcp@latest","--allow-non-ga-tools"]}}}`}
            </code>.
            For VS Code + Copilot, create{' '}
            <code className="bg-slate-800 px-1.5 py-0.5 rounded text-violet-400 font-mono text-xs">.vscode/mcp.json</code>{' '}
            with the same content under <code className="bg-slate-800 px-1 py-0.5 rounded text-violet-400 font-mono text-xs">"servers"</code> (not <code className="bg-slate-800 px-1 py-0.5 rounded text-violet-400 font-mono text-xs">"mcpServers"</code>).
          </Callout>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-slate-200 mb-3 flex items-center gap-2">
            <MessageSquare size={15} className="text-violet-400" />
            CLAUDE.md — Already Included in the Template
          </h3>
          <p className="text-slate-400 text-sm mb-3 leading-relaxed">
            Unlike most projects where you'd create CLAUDE.md from scratch, <strong className="text-slate-200">the Storefront Next template ships with a comprehensive CLAUDE.md already in the project root</strong>. It contains 22 performance &amp; data rules, code conventions, testing strategy, project structure, all common commands, and links to 20+ architecture docs. This means Claude Code (or any AI coding assistant) has deep platform context from the first prompt — no setup required.
          </p>

          <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-4 mb-4">
            <h4 className="text-emerald-400 font-semibold text-sm mb-3">Why this matters — what you get out of the box</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { label: 'Platform-aware AI from prompt #1', desc: 'The AI knows the file structure, routing conventions, and where every piece of code belongs — no explaining the project.' },
                { label: '22 performance rules enforced', desc: 'Server-load everything, Suspense boundaries, DynamicImage, URL state — the AI follows these automatically.' },
                { label: 'Code conventions built in', desc: 'Copyright headers, site-context-aware Link/NavLink, Tailwind design tokens, cn() usage — consistent code on every generation.' },
                { label: 'Architecture docs linked', desc: '20+ detailed docs for data fetching, state management, auth, i18n, Page Designer — the AI can read these for deeper context.' },
              ].map(({ label, desc }) => (
                <div key={label} className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-emerald-300 text-xs font-semibold">{label}</span>
                    <p className="text-slate-400 text-xs mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-slate-400 text-sm mb-3">
            Here's a summary of what's already in the template's CLAUDE.md:
          </p>
          <CodeBlock code={claudeMdShipped} language="markdown" filename="CLAUDE.md (ships with template)" />

          <div className="mt-4">
            <Callout type="tip" title="Customize it for your brand">
              The template CLAUDE.md covers platform rules and conventions. To get even better AI output, <strong className="text-slate-200">add your brand-specific context</strong> — brand colors, typography, tone, and what you're building. The AI combines both for production-quality, on-brand code.
            </Callout>
          </div>
          <div className="mt-3">
            <CodeBlock code={claudeMdCustomize} language="markdown" filename="Add to your CLAUDE.md" />
          </div>

          <div className="mt-4">
            <Callout type="info" title="AGENTS.md — works with every AI tool, not just one">
              The template actually ships with <code className="bg-slate-800 px-1.5 py-0.5 rounded text-violet-400 font-mono text-xs">AGENTS.md</code> as the source file, and <code className="bg-slate-800 px-1.5 py-0.5 rounded text-violet-400 font-mono text-xs">CLAUDE.md</code> is a symlink to it. <strong className="text-slate-200">AGENTS.md is the emerging industry standard</strong> that AI coding tools are converging on — Codex, Cursor, Copilot, and others all read it. This means the same 22 rules, conventions, and architecture docs work across every AI coding assistant automatically. No vendor lock-in, no duplicate config files, one source of truth for all agents.
            </Callout>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-slate-200 mb-3 flex items-center gap-2">
            <Cpu size={15} className="text-violet-400" />
            What the MCP Server gives you
          </h3>
          <p className="text-slate-400 text-sm mb-3">
            The MCP server isn't just "installed" — it provides Storefront Next-specific tools that your AI assistant can call. Try asking: <strong className="text-slate-200">"What Storefront Next tools do you have?"</strong>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { tool: 'sfnext_get_guidelines', desc: 'Returns Storefront Next development rules — the AI writes better code with these loaded' },
              { tool: 'sfnext_configure_theme', desc: 'Configures your Tailwind theme via AI prompts — fastest path to brand customization' },
              { tool: 'sfnext_analyze_component', desc: 'Analyzes a component\'s structure — useful for understanding existing code' },
              { tool: 'sfnext_match_tokens_to_theme', desc: 'Maps design tokens from a spec to your Tailwind theme' },
              { tool: 'sfnext_start_figma_workflow', desc: 'Initiates a Figma-to-component conversion workflow' },
              { tool: 'sfnext_add_page_designer_decorator', desc: 'Adds Page Designer metadata decorators to a route' },
            ].map(({ tool, desc }) => (
              <div key={tool} className="p-3 rounded-lg bg-violet-950/20 border border-violet-500/20">
                <code className="text-violet-300 font-mono text-xs">{tool}</code>
                <p className="text-slate-400 text-xs mt-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Prompts: Look & Feel */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-violet-500/15 border border-violet-500/30 flex items-center justify-center">
            <Sparkles size={15} className="text-violet-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Part 2 — Prompts: Look & Feel</h2>
          <span className="text-slate-500 text-sm">8 min</span>
        </div>
        <p className="text-slate-400 text-sm mb-5 leading-relaxed">
          The most effective design prompts are specific: name the component, describe the visual goal, reference a real example, and specify the tech constraints. Vague prompts produce generic output.
        </p>
        <div className="space-y-4">
          <PromptCard
            category="Brand Theming"
            categoryColor="text-violet-300"
            title="Update color palette to match a luxury brand"
            description="Be specific about the aesthetic — mention reference brands or describe the visual direction. Claude Code will update the brand token CSS files and suggest typography."
            prompt={`I'm building a Storefront Next storefront for an upscale women's fashion brand similar to Reformation or Aritzia.

Update my brand tokens in src/theme/tokens/brand.css to reflect this aesthetic:
- Neutral palette: warm off-white backgrounds (#faf9f7), deep charcoal text (#1a1a1a)
- Accent: dusty rose (#c9a9a6) for CTAs and highlights
- Typography: update --font-sans in src/theme/tailwind.css for headings (serif feel), keep sans for body
- Card corners: slightly rounded (8px), not pill-shaped
- Remove any bright/saturated colors

After updating the tokens, show me what the ProductTile would look like with the new tokens applied.`}
            followUp={`The colors look right. Now update the button component to use the rose accent with a thin border style (outlined) rather than filled. Buttons should be very minimal.`}
          />

          <PromptCard
            category="Component Build"
            categoryColor="text-violet-300"
            title="Build a promotional banner with countdown timer"
            description="Describe the exact behavior and visual requirements. The more precise you are, the less iteration you need."
            prompt={`Build a PromoBanner component for src/components/PromoBanner.tsx with these specs:

Visual:
- Full-width strip, 48px tall, black background, white text
- Centered text with a countdown timer on the right side
- Dismissible with an X button on the far right
- Appears at the top of every page (add it to the Layout)

Behavior:
- Countdown timer to a hardcoded date prop (e.g., "Sale ends in 2d 14h 32m")
- Dismissed state saved to sessionStorage so it doesn't reappear on navigation
- Accepts a message prop and a ctaText + ctaHref prop

Types: Define a PromoBannerProps interface with full TypeScript types.`}
            followUp={`The component looks good. Add an animation — the banner should slide down from the top when it first appears, using a CSS transition (not a JS animation library).`}
          />

          <PromptCard
            category="Figma-to-Code"
            categoryColor="text-violet-300"
            title="Implement a design from Figma description"
            description="Describe exactly what you see in Figma. Include layout, spacing, colors, hover states, and any animations. Claude Code translates this to Tailwind + React."
            prompt={`I have a Figma design for a product tile. Here's the spec:

Layout: 280px wide card, white background, 12px border radius, 1px #e5e7eb border
Image section: full width, aspect-ratio 4:5, object-fit cover, gray-50 background
Info section: 16px padding all sides

Typography:
- Brand: 10px, #9ca3af, uppercase, 1px letter-spacing
- Product name: 14px, #111827, medium weight, 2-line clamp
- Price: 16px, #111827, semibold; sale price in #dc2626 with strikethrough original

Hover state: shadow-md, border color #d1d5db, image scales to 103%

Add to cart: Not visible by default. On hover, a pill button "Add to Cart" slides up
from bottom with 200ms ease transition. 40px tall, full width minus 24px horizontal
padding, #111827 background, white text.

Build this as src/components/product-tile/index.tsx with a ProductTileProps interface.`}
          />
        </div>
      </section>

      {/* Best Prompts: Logic */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-violet-500/15 border border-violet-500/30 flex items-center justify-center">
            <Zap size={15} className="text-violet-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Part 3 — Prompts: Custom Logic</h2>
          <span className="text-slate-500 text-sm">7 min</span>
        </div>
        <p className="text-slate-400 text-sm mb-5 leading-relaxed">
          For backend/data flow changes, give Claude Code the full context: which file, what the current behavior is, what you want instead, and any constraints (like "don't change the API contract").
        </p>
        <div className="space-y-4">
          <PromptCard
            category="Data Flow"
            categoryColor="text-amber-300"
            title="Add product recommendations to the PDP"
            description="Give Claude Code the file path and context. It reads the actual code and extends it correctly."
            prompt={`In src/routes/product.$productId.tsx, extend the loader to also fetch Einstein product recommendations.

Context:
- Current loader fetches the product with getProduct(productId)
- I want to add a "You Might Also Like" section below the product detail
- Recommendations should be fetched in parallel (Promise.all) with the main product call
- Use the SCAPI Einstein Recommendations endpoint: /einstein/recommenders/{recommenderName}/products

Add:
1. A getRecommendations(productId, recommenderName) function in src/lib/api/recommendations.server.ts
2. Update the loader to fetch recommendations in parallel
3. Add a RecommendedProducts component that shows 4 product tiles in a horizontal scroll on mobile, grid on desktop
4. Wire it into the page below the product detail section`}
            followUp={`The recommendations are loading. Now add a loading skeleton — show 4 gray placeholder cards while the recommendations are fetching, using React Suspense.`}
          />

          <PromptCard
            category="B2C Integration"
            categoryColor="text-amber-300"
            title="Implement SLAS authentication"
            description="Use the B2C skills that give Claude Code platform-specific knowledge — it knows the correct SLAS endpoints and flow."
            prompt={`Help me implement SLAS guest and registered shopper authentication in my Storefront Next project.

My setup:
- Sandbox: [my-sandbox].demandware.net
- Site ID: RefArch
- SLAS client ID is in my .env as PUBLIC__app__commerce__api__clientId

I need:
1. Guest auth that runs before any SCAPI call (using SLAS public client flow)
2. Token stored in a cookie (not localStorage — SSR compatibility)
3. Auto-refresh when token is within 5 minutes of expiry
4. Registered login flow: email + password → SLAS token exchange
5. Logout that clears the cookie and redirects to homepage

Please use the split-cookie pattern (separate access and refresh token cookies) for security.`}
          />

          <PromptCard
            category="Custom Feature"
            categoryColor="text-amber-300"
            title="Build a size guide modal"
            description="Describe the full user flow and component requirements. Ask Claude Code to generate the types, component, and any supporting logic."
            prompt={`Build a SizeGuide feature for the product detail page with these requirements:

Trigger: A "Size Guide" text link below the size selector on the PDP
Display: Modal overlay, centered, 600px wide on desktop, full-screen on mobile

Content:
- Tabs: Women's / Men's
- Table with: Size (XS/S/M/L/XL), Chest, Waist, Hips in both inches and cm
- Unit toggle: "in" / "cm" in the top-right of the table
- Close button (X) top-right and clicking backdrop closes

Implementation:
- Use ShadCN Dialog component (already installed)
- Store unit preference in localStorage
- Size data passed as a prop (don't hardcode it in the component)
- Accessible: focus trapped in modal, Escape key closes it

Create:
1. src/components/SizeGuide.tsx
2. SizeGuideProps TypeScript interface
3. Show me how to add the trigger link to the PDP`}
          />
        </div>
      </section>

      {/* Anti-patterns */}
      <section>
        <h2 className="text-xl font-bold text-slate-100 mb-4">What NOT to Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-red-500/20 bg-red-950/10 p-4">
            <h3 className="text-red-400 font-semibold text-sm mb-3">Weak prompts (vague output)</h3>
            <div className="space-y-2">
              {[
                '"Make the product tile look better"',
                '"Add a feature to the cart"',
                '"Fix the bug"',
                '"Update the styling"',
              ].map(p => (
                <div key={p} className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✗</span>
                  <code className="text-red-300/70 text-xs font-mono">{p}</code>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-4">
            <h3 className="text-emerald-400 font-semibold text-sm mb-3">Strong prompts (precise output)</h3>
            <div className="space-y-2">
              {[
                '"In src/components/product-tile/index.tsx, add a hover image swap and slide-up Quick Add button using group-hover Tailwind classes"',
                '"Add an Add to Wishlist action to product.$productId.tsx using the SCAPI customer lists endpoint"',
                '"The product images return 404 — check how imageUrl is mapped in lib/api/products.server.ts"',
                '"Update src/theme/tokens/brand.css: change --brand-primary to this hex: #1a1a2e"',
              ].map(p => (
                <div key={p} className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
                  <code className="text-emerald-300/70 text-xs font-mono leading-relaxed">{p}</code>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Callout type="tip" title="SE Talking Points">
        <ul className="space-y-1 text-sm">
          <li>• "Storefront Next is the only commerce platform with a first-party MCP server — the AI assistant understands SCAPI, SLAS, Managed Runtime, and Page Designer natively."</li>
          <li>• "A detailed prompt generates production-quality components in under a minute — faster than copying from documentation."</li>
          <li>• "The MCP server works across AI assistants — Claude Code, Cursor, VS Code + Copilot. No vendor lock-in."</li>
          <li>• "The template ships with a CLAUDE.md containing 22 performance rules, code conventions, and links to 20+ architecture docs — every AI coding assistant has deep platform context from the first prompt, no setup required."</li>
        </ul>
      </Callout>

      {/* Hands-on */}
      <section>
        <h2 className="text-xl font-bold text-slate-100 mb-6">Hands-On Exercises</h2>
        <div className="space-y-0">
          <StepCard stepKey="m4-setup" number={1} title="Explore CLAUDE.md and add your brand context">
            <p className="text-sm">Open <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">CLAUDE.md</code> in your project root — it's already there. Skim the performance rules and code conventions. Then add your brand guidelines (colors, typography, tone) and a "What I'm Building" section. Commit the changes to git.</p>
            <Callout type="tip" title="Why this matters">
              The template's CLAUDE.md gives the AI platform knowledge. Your additions give it brand knowledge. Together, every prompt produces code that's both architecturally correct <em>and</em> on-brand.
            </Callout>
          </StepCard>
          <StepCard stepKey="m4-prompt1" number={2} title="Brand your storefront in one prompt">
            <p className="text-sm">Open Claude Code in your project directory. Use the brand theming prompt above (adapted for your own brand direction) to update <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">src/theme/tokens/brand.css</code> and see your entire storefront change.</p>
            <Callout type="ai" title="Watch what Claude Code does">
              Notice how Claude Code reads your actual file first, then makes targeted edits. It's not replacing your entire config — it's inserting the right tokens in the right places.
            </Callout>
          </StepCard>
          <StepCard stepKey="m4-prompt2" number={3} title="Build a component with a detailed prompt">
            <p className="text-sm">Use the Figma-to-code prompt template to describe your ideal product tile to Claude Code. Include specific measurements, colors, and hover behavior. Accept or refine the output.</p>
          </StepCard>
          <StepCard stepKey="m4-prompt3" number={4} title="Extend a loader with context-aware prompting">
            <p className="text-sm">Start a Claude Code session in your project. Ask it to read your category route (<code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">src/routes/category.$categoryId.tsx</code>) and add sorting capability to the loader. See how it uses your existing code as context.</p>
            <Callout type="ai" title="Iterative prompting">
              After Claude Code makes the change, ask: "Now add a sort dropdown to the UI that uses this loader data." Building features incrementally is faster than writing one giant prompt.
            </Callout>
          </StepCard>
          <StepCard stepKey="m4-figma" number={5} title="Challenge: Describe the Odyssey homepage to Claude Code" isLast>
            <p className="text-sm">Open the <a href="https://sfcc-odyssey-production.mobify-storefront.com/global/en-GB/" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">Odyssey storefront</a>. Describe one feature you see to Claude Code (be specific), and have it build a matching component for your project. Then compare them.</p>
          </StepCard>
        </div>
      </section>

      {/* Final wrap-up */}
      <div className="rounded-2xl bg-gradient-to-r from-violet-950/40 to-sky-950/40 border border-violet-700/40 p-8">
        <div className="flex items-start gap-4">
          <CheckCircle2 size={36} className="text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-slate-100 text-xl mb-2">Workshop Complete</h3>
            <p className="text-slate-400 mb-4">You've covered the full stack — architecture, frontend, backend, and AI-accelerated development. The key skills you've built today:</p>
            <ul className="space-y-2 text-sm text-slate-300">
              {[
                'Understanding how React, React Router, Tailwind, and MRT work together',
                'Customizing brand tokens and component styling with Tailwind utilities',
                'Modifying loaders and actions for server-side data and mutations',
                'Writing precise Claude Code prompts that generate production-quality Storefront Next code',
                'Using the B2C MCP server to work with your live sandbox from within Claude Code',
                'Understanding the migration path from SFRA via the hybrid proxy pattern',
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm transition-colors border border-slate-700">
                <Home size={14} /> Back to Overview
              </Link>
              <a
                href="https://github.com/SalesforceCommerceCloud/storefront-next-template"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-500/15 hover:bg-violet-500/25 text-violet-300 text-sm transition-colors border border-violet-500/30"
              >
                <Sparkles size={14} /> Template Repo
              </a>
            </div>
          </div>
        </div>
      </div>

      <Callout type="info" title="For SFRA migration conversations">
        Storefront Next supports a hybrid proxy pattern that lets customers migrate page-by-page from SFRA without a full rewrite. Specific routes can be served by Storefront Next while the rest continue through SFRA — enabling incremental migration on the customer's timeline.
      </Callout>
    </div>
  )
}
