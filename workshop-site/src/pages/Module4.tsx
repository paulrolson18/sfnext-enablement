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

const mcpSetupCode = `# 1. Install the B2C MCP Server
npm install -g @salesforce/b2c-dx-mcp

# 2. In Claude Code, add the MCP server
# Open Claude Code settings or run:
claude mcp add b2c-dx -- npx @salesforce/b2c-dx-mcp

# 3. Install B2C-specific agent skills
claude plugin marketplace add SalesforceCommerceCloud/b2c-developer-tooling
claude plugin install b2c-cli
claude plugin install b2c

# 4. Configure your instance connection
b2c config set --instance YOUR_SANDBOX.demandware.net
b2c config set --client-id YOUR_CLIENT_ID

# 5. Verify Claude Code sees the skills
# In Claude Code, ask: "What B2C skills do you have available?"`

const claudeMdExample = `# Storefront Next Project
# CLAUDE.md — project context for Claude Code

## Project
This is a Storefront Next storefront for [Brand Name].
We're customizing the Odyssey reference implementation.

## Tech Stack
- React 19 + React Router 7
- Tailwind CSS 4 (utility-first, NO custom CSS files)
- TypeScript strict mode
- SCAPI for all B2C Commerce API calls

## Brand Guidelines
- Primary color: #1a1a2e (deep navy)
- Accent color: #c9a84c (gold)
- Typography: Helvetica Neue for body, Playfair Display for headings
- Border radius: 12px for cards, pill (9999px) for buttons
- Tone: upscale, editorial, minimal

## Coding Conventions
- Components go in src/components/
- Use Tailwind classes only — no inline styles, no CSS modules
- Every SCAPI call must have a typed return interface
- Use async/await, not .then() chains
- Error boundaries required on all route files

## What I'm Building
[Describe what you're working on today]`

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
          The B2C MCP (Model Context Protocol) server gives Claude Code direct access to your B2C instance — it can read logs, deploy code, manage sandboxes, and browse SCAPI documentation without you copying anything.
        </p>
        <CodeBlock code={mcpSetupCode} language="bash" filename="Terminal" />

        <div className="mt-6">
          <h3 className="font-semibold text-slate-200 mb-3 flex items-center gap-2">
            <MessageSquare size={15} className="text-violet-400" />
            Create a CLAUDE.md in your project root
          </h3>
          <p className="text-slate-400 text-sm mb-3">
            CLAUDE.md is a project-level context file that Claude Code reads automatically. Use it to describe your brand, conventions, and what you're building. This dramatically improves output quality.
          </p>
          <CodeBlock code={claudeMdExample} language="markdown" filename="CLAUDE.md" />
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
            description="Be specific about the aesthetic — mention reference brands or describe the visual direction. Claude Code will update tailwind.config.js and suggest typography."
            prompt={`I'm building a Storefront Next storefront for an upscale women's fashion brand similar to Reformation or Aritzia.

Update my tailwind.config.js to reflect this aesthetic:
- Neutral palette: warm off-white backgrounds (#faf9f7), deep charcoal text (#1a1a1a)
- Accent: dusty rose (#c9a9a6) for CTAs and highlights
- Typography: font-display for headings (serif feel), keep sans for body
- Card corners: slightly rounded (8px), not pill-shaped
- Remove any bright/saturated colors

After updating the config, show me what the ProductCard would look like with the new tokens applied.`}
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
            prompt={`I have a Figma design for a product card. Here's the spec:

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

Build this as src/components/ProductCard.tsx with a ProductCardProps interface.`}
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
1. A getRecommendations(productId, recommenderName) function in src/lib/scapi/recommendations.ts
2. Update the loader to fetch recommendations in parallel
3. Add a RecommendedProducts component that shows 4 product cards in a horizontal scroll on mobile, grid on desktop
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
                '"Make the product card look better"',
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
                '"In ProductCard.tsx, add a hover image swap and slide-up Quick Add button using group-hover Tailwind classes"',
                '"Add an Add to Wishlist action to product.$productId.tsx using the SCAPI customer lists endpoint"',
                '"The product images return 404 — check how imageUrl is mapped in lib/scapi/products.ts"',
                '"Update tailwind.config.js: change all primary-500 references to this hex: #1a1a2e"',
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

      {/* Hands-on */}
      <section>
        <h2 className="text-xl font-bold text-slate-100 mb-6">Hands-On Exercises</h2>
        <div className="space-y-0">
          <StepCard stepKey="m4-setup" number={1} title="Set up CLAUDE.md in your project">
            <p className="text-sm">Create a <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">CLAUDE.md</code> file in your project root using the template above. Fill in your actual brand preferences and what you're building today. This is permanent — commit it to git.</p>
          </StepCard>
          <StepCard stepKey="m4-prompt1" number={2} title="Brand your storefront in one prompt">
            <p className="text-sm">Open Claude Code in your project directory. Use the brand theming prompt above (adapted for your own brand direction) to update <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">tailwind.config.js</code> and see your entire storefront change.</p>
            <Callout type="ai" title="Watch what Claude Code does">
              Notice how Claude Code reads your actual file first, then makes targeted edits. It's not replacing your entire config — it's inserting the right tokens in the right places.
            </Callout>
          </StepCard>
          <StepCard stepKey="m4-prompt2" number={3} title="Build a component with a detailed prompt">
            <p className="text-sm">Use the Figma-to-code prompt template to describe your ideal product card to Claude Code. Include specific measurements, colors, and hover behavior. Accept or refine the output.</p>
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
    </div>
  )
}
