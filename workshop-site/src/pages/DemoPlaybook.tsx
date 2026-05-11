import { Link } from 'react-router-dom'
import { ArrowRight, Play, Palette, Gauge, Cpu, ShoppingCart, ExternalLink } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import Callout from '../components/Callout'

const demos = [
  {
    id: 'speed',
    icon: Play,
    color: 'sky',
    title: 'Demo 1: Speed to Launch',
    subtitle: '5 minutes · Best for: prospects comparing build timelines',
    audience: 'CTO, VP Engineering, SI Partner',
    setup: 'Storefront template cloned and running locally. Odyssey storefront open in a tab.',
    steps: [
      { action: 'Show the running storefront', say: '"This is a fully functional storefront — product listing, product detail, cart, checkout — running locally. It took one command to set up."' },
      { action: 'Open tailwind.config.js', say: '"Let\'s rebrand this storefront in real time. I\'ll change the primary color to match your brand."' },
      { action: 'Change primary color to customer\'s brand hex', say: '"Save — and watch. Every button, link, and accent across the entire site just updated. One file, one change."' },
      { action: 'Show the hero banner, PLP, and PDP', say: '"This is the template out of the box. From here, a developer customizes components — not builds infrastructure."' },
      { action: 'Run pnpm sfnext push', say: '"One command to deploy. It\'s now live on Managed Runtime with CDN, SSL, and global routing — all automatic."' },
    ],
    closeWith: '"With SFRA, this would be weeks of scaffolding. With Storefront Next, a developer goes from template to live site in hours."',
  },
  {
    id: 'dx',
    icon: Cpu,
    color: 'violet',
    title: 'Demo 2: AI-Assisted Development',
    subtitle: '5 minutes · Best for: developer-focused conversations',
    audience: 'Lead Developer, Technical Architect, SI Partner',
    setup: 'Claude Code open with MCP server configured. CLAUDE.md in project root.',
    steps: [
      { action: 'Show CLAUDE.md file', say: '"This file gives the AI full context about our project — brand guidelines, conventions, and architecture. Every developer on the team gets consistent AI output."' },
      { action: 'Run a brand theming prompt in Claude Code', say: '"Watch — I\'ll ask Claude Code to update our brand palette. It reads the actual tailwind.config.js, understands the structure, and makes targeted edits."' },
      { action: 'Show Claude Code reading the file first', say: '"Notice it reads the file before editing. It\'s not generating from a template — it understands the existing code."' },
      { action: 'Run a component build prompt', say: '"Now let\'s ask it to build a promo banner with a countdown timer. One prompt, production-quality component."' },
      { action: 'Show the MCP tools list', say: '"This is the only commerce platform with a first-party MCP server. The AI assistant understands SCAPI, SLAS, Page Designer, and Managed Runtime natively."' },
    ],
    closeWith: '"A detailed prompt generates a production-quality component in under a minute. That\'s 10x faster than copy-pasting from documentation."',
  },
  {
    id: 'performance',
    icon: Gauge,
    color: 'emerald',
    title: 'Demo 3: Performance',
    subtitle: '3 minutes · Best for: competitive evaluations',
    audience: 'VP Digital, Marketing Lead, anyone comparing Shopify/BigCommerce',
    setup: 'Chrome DevTools ready. SE demo storefront URL or Odyssey store open.',
    steps: [
      { action: 'Open the demo storefront in Chrome', say: '"Let\'s look at real performance on a real Storefront Next implementation."' },
      { action: 'Open DevTools → Lighthouse → Run audit (Mobile)', say: '"I\'m running a standard Lighthouse audit — same tool Google uses for Core Web Vitals."' },
      { action: 'Show the LCP, CLS, and INP scores', say: '"LCP under 2.5 seconds, CLS near zero, INP well under 200ms. These scores are structural — they come from Streaming SSR and server-side rendering, not optimization tricks."' },
      { action: 'View source → search for product data', say: '"Product data is in the HTML before JavaScript runs. That\'s why SEO and performance are both strong — search engines see full content, users see fast pages."' },
    ],
    closeWith: '"These aren\'t demo-optimized numbers. This is what you get out of the box with the template architecture."',
  },
  {
    id: 'merchandiser',
    icon: ShoppingCart,
    color: 'amber',
    title: 'Demo 4: Merchandiser Empowerment',
    subtitle: '3 minutes · Best for: business stakeholders',
    audience: 'VP Merchandising, Director of eCommerce, Business Analyst',
    setup: 'Page Designer example code visible. Business Manager access (optional).',
    steps: [
      { action: 'Show the HeroBanner component with Page Designer props', say: '"A developer adds configurable props — like title color and alignment. These become fields in Business Manager."' },
      { action: 'Point to the @PageType and @RegionDefinition decorators', say: '"TypeScript decorators tell BM what\'s configurable. The build process auto-generates the metadata — no manual XML."' },
      { action: 'Show Business Manager Page Designer (if available)', say: '"The merchandiser opens BM, sees the hero banner component, changes the title color to gold, previews it live, and publishes. No developer needed."' },
      { action: 'Show the checkout and search as route-based patterns', say: '"Even complex flows like checkout are just routes with loaders and actions. Same pattern, whether it\'s a hero banner or a checkout step."' },
    ],
    closeWith: '"The developer builds components, the merchandiser configures content. Both stay in their lane. No deploy cycles for content changes."',
  },
]

const colorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  sky: { bg: 'bg-sky-500/10', border: 'border-sky-500/20', text: 'text-sky-400', badge: 'bg-sky-500/15 text-sky-400' },
  violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/20', text: 'text-violet-400', badge: 'bg-violet-500/15 text-violet-400' },
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', badge: 'bg-emerald-500/15 text-emerald-400' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400', badge: 'bg-amber-500/15 text-amber-400' },
}

export default function DemoPlaybook() {
  return (
    <div className="space-y-12">
      <SectionHeader
        badge="Reference"
        title="Demo Playbook"
        subtitle="Four scripted demo flows for different audiences and selling scenarios. Each demo is self-contained — pick the one that matches your prospect's priorities."
        gradient="sky"
      />

      <Callout type="info" title="Before any demo">
        Have these ready: (1) local storefront running on localhost, (2) Odyssey or SE demo store URL in a browser tab, (3) Claude Code open with MCP server configured, (4) tailwind.config.js visible in VS Code. The first 30 seconds of any demo should show a working storefront — it immediately establishes credibility.
      </Callout>

      {/* Demo selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {demos.map(({ id, icon: Icon, color, title, subtitle, audience }) => {
          const c = colorMap[color]
          return (
            <a key={id} href={`#${id}`} className={`p-4 rounded-xl border ${c.bg} ${c.border} hover:scale-[1.01] transition-transform`}>
              <div className="flex items-start gap-3">
                <Icon size={20} className={`${c.text} mt-0.5 flex-shrink-0`} />
                <div>
                  <h3 className="text-slate-100 font-semibold text-sm">{title}</h3>
                  <p className="text-slate-500 text-xs mt-0.5">{subtitle}</p>
                  <p className="text-slate-600 text-xs mt-1">Audience: {audience}</p>
                </div>
              </div>
            </a>
          )
        })}
      </div>

      {/* Demo details */}
      {demos.map(({ id, icon: Icon, color, title, subtitle, audience, setup, steps, closeWith }) => {
        const c = colorMap[color]
        return (
          <section key={id} id={id}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-8 h-8 rounded-full ${c.bg} ${c.border} border flex items-center justify-center`}>
                <Icon size={15} className={c.text} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-100">{title}</h2>
                <p className="text-slate-500 text-xs">{subtitle}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/50">
                <div className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Audience</div>
                <div className="text-slate-200 text-sm">{audience}</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/50">
                <div className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Setup Required</div>
                <div className="text-slate-200 text-sm">{setup}</div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {steps.map(({ action, say }, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-700/30">
                  <div className={`w-6 h-6 rounded-full ${c.bg} ${c.border} border flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <span className={`text-xs font-bold ${c.text}`}>{i + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-slate-200 text-sm font-medium mb-1">{action}</div>
                    <div className="text-slate-400 text-xs italic leading-relaxed">{say}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className={`p-3 rounded-lg ${c.bg} ${c.border} border`}>
              <div className={`text-xs font-medium uppercase tracking-wider mb-1 ${c.text}`}>Close with</div>
              <div className="text-slate-300 text-sm italic">{closeWith}</div>
            </div>
          </section>
        )
      })}

      {/* Customer context responses */}
      <section>
        <h2 className="text-xl font-bold text-slate-100 mb-4">Customer Context → What to Say</h2>
        <div className="space-y-2">
          {[
            { context: '"We\'re on SFRA, happy there"', response: '"Storefront Next is the new default for net-new. SFRA is fully supported — no EOL. But for net-new storefronts, the modern stack is a better starting point."', demo: 'Speed to Launch' },
            { context: '"Headless is too complex"', response: '"Storefront Next is headless with guard rails. Template-first, AI-assisted, deploys to Managed Runtime. The complexity is managed for you."', demo: 'Speed to Launch + AI Dev' },
            { context: '"Evaluating Shopify / BigCommerce"', response: '"Run a Lighthouse audit on both. Storefront Next matches modern DX and has better Core Web Vitals out of the box."', demo: 'Performance' },
            { context: '"We want AI in our stack"', response: '"Only commerce platform with a first-party MCP server and Shopper Agent OOTB."', demo: 'AI-Assisted Development' },
            { context: '"Our merchandisers need more control"', response: '"Page Designer works with Storefront Next. Merchandisers configure components in BM — no deploy cycles."', demo: 'Merchandiser Empowerment' },
            { context: '"We need multi-locale / multi-site"', response: '"One codebase, path-based locale routing, locale-specific translations. The Odyssey store demonstrates the pattern."', demo: 'Speed to Launch' },
          ].map(({ context, response, demo }) => (
            <div key={context} className="flex gap-4 p-3 rounded-xl bg-slate-900/40 border border-slate-700/30">
              <div className="flex-1">
                <div className="text-slate-300 text-sm font-medium mb-1">{context}</div>
                <div className="text-slate-400 text-xs italic">{response}</div>
              </div>
              <div className="flex-shrink-0 self-center">
                <span className="text-xs px-2 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 whitespace-nowrap">{demo}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Resources */}
      <section>
        <h2 className="text-xl font-bold text-slate-100 mb-4">Demo Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: 'Odyssey Reference Store', url: 'https://sfcc-odyssey-production.mobify-storefront.com/global/en-GB/', desc: 'High-quality live implementation' },
            { label: 'SE Demo Storefront', url: 'https://sedemo-sfnext-zzsa004.mobify-storefront.com/ntoNext/en-US/', desc: 'SE-specific Storefront Next demo' },
            { label: 'Template Repository', url: 'https://github.com/SalesforceCommerceCloud/storefront-next-template', desc: 'Starting point for any new build' },
            { label: 'B2C Developer Tooling', url: 'https://salesforcecommercecloud.github.io/b2c-developer-tooling/', desc: 'CLI, MCP server, agent skills' },
          ].map(({ label, url, desc }) => (
            <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-700/50 hover:border-sky-500/30 hover:bg-sky-500/5 transition-all group">
              <ExternalLink size={14} className="text-slate-500 group-hover:text-sky-400 mt-0.5 flex-shrink-0 transition-colors" />
              <div>
                <div className="text-slate-200 font-medium text-sm group-hover:text-sky-300 transition-colors">{label}</div>
                <div className="text-slate-500 text-xs">{desc}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <div className="flex justify-end">
        <Link
          to="/cheat-sheet"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm transition-colors shadow-lg shadow-sky-500/20"
        >
          Quick Reference Card <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  )
}
