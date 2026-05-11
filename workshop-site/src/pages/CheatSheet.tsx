import { Link } from 'react-router-dom'
import { ArrowLeft, Terminal, MessageSquare, ExternalLink, Zap, BookOpen, Globe } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'

export default function CheatSheet() {
  return (
    <div className="space-y-10">
      <SectionHeader
        badge="Reference"
        title="Quick Reference Card"
        subtitle="Everything you need at a glance — key commands, talking points, demo URLs, and architecture cheat sheet. Bookmark this page for your next customer conversation."
        gradient="emerald"
      />

      {/* Key Commands */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Terminal size={18} className="text-emerald-400" />
          <h2 className="text-lg font-bold text-slate-100">Key Commands</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[
            { cmd: 'pnpm dev', desc: 'Start local development server', category: 'Development' },
            { cmd: 'pnpm build', desc: 'Build production bundle', category: 'Development' },
            { cmd: 'pnpm sfnext push', desc: 'Deploy to Managed Runtime', category: 'Deployment' },
            { cmd: 'b2c mrt env var push', desc: 'Sync .env to remote (diffs only)', category: 'Deployment' },
            { cmd: 'b2c mrt tail-logs', desc: 'Live log stream from deployed site', category: 'Debugging' },
            { cmd: 'b2c mrt tail-logs --level ERROR', desc: 'Filter to errors only', category: 'Debugging' },
            { cmd: 'claude mcp add ... b2c-dx-mcp', desc: 'Add B2C MCP server to Claude Code', category: 'AI Tooling' },
            { cmd: 'claude plugin install storefront-next', desc: 'Install Storefront Next skills', category: 'AI Tooling' },
          ].map(({ cmd, desc, category }) => (
            <div key={cmd} className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-700/50">
              <span className="text-xs px-1.5 py-0.5 rounded bg-slate-800 text-slate-500 font-medium flex-shrink-0 w-20 text-center">{category}</span>
              <div className="flex-1 min-w-0">
                <code className="text-emerald-400 font-mono text-xs">{cmd}</code>
                <div className="text-slate-500 text-xs">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top SE Talking Points */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare size={18} className="text-sky-400" />
          <h2 className="text-lg font-bold text-slate-100">Top SE Talking Points</h2>
        </div>
        <div className="space-y-2">
          {[
            { point: 'Speed to launch', detail: '"A brand refresh takes hours, not weeks. Change one config file and the entire storefront updates."' },
            { point: 'Security by architecture', detail: '"All data fetching happens server-side — API keys, tokens, and payment data never reach the browser."' },
            { point: 'AI-first platform', detail: '"The only commerce platform with a first-party MCP server — the AI understands SCAPI, SLAS, and Page Designer natively."' },
            { point: 'Enterprise scale', detail: '"Managed Runtime on AWS Lambda — flash sales with 100x traffic just work, zero capacity planning."' },
            { point: 'Performance built-in', detail: '"Streaming SSR, optimized Core Web Vitals, sub-second first paint — structural advantages, not optimization tricks."' },
            { point: 'Merchandiser control', detail: '"Page Designer lets merchandisers configure pages, arrange components, and manage content — no developer needed for content updates."' },
            { point: 'Modern developer experience', detail: '"React, TypeScript, Tailwind — developers already know these tools. No learning curve for ISML templates."' },
            { point: 'Incremental migration', detail: '"Hybrid proxy pattern supports page-by-page migration from SFRA. No full rewrite required."' },
          ].map(({ point, detail }) => (
            <div key={point} className="flex gap-3 p-3 rounded-lg bg-sky-950/15 border border-sky-500/15">
              <Zap size={14} className="text-sky-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-sky-300 text-sm font-semibold">{point}: </span>
                <span className="text-slate-400 text-sm italic">{detail}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture Quick Reference */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen size={18} className="text-violet-400" />
          <h2 className="text-lg font-bold text-slate-100">Architecture Quick Reference</h2>
        </div>
        <div className="rounded-xl overflow-hidden border border-slate-700/50">
          <div className="grid grid-cols-3 bg-slate-800/60 text-xs font-semibold uppercase tracking-wider text-slate-400 px-4 py-3">
            <div>Concept</div>
            <div className="text-center">SFRA Equivalent</div>
            <div className="text-center text-sky-400">Storefront Next</div>
          </div>
          {[
            { concept: 'Page', sfra: 'Controller', sfnext: 'Route file (src/routes/)' },
            { concept: 'Template', sfra: 'ISML', sfnext: 'React component (JSX)' },
            { concept: 'Data fetch', sfra: 'Pipeline node', sfnext: 'loader() function' },
            { concept: 'Form handler', sfra: 'Controller POST', sfnext: 'action() function' },
            { concept: 'Styling', sfra: 'Bootstrap + custom CSS', sfnext: 'Tailwind utility classes' },
            { concept: 'Design tokens', sfra: 'SCSS variables', sfnext: 'tailwind.config.js' },
            { concept: 'Reusable logic', sfra: 'Script module', sfnext: 'Custom hook (useX)' },
            { concept: 'CMS control', sfra: 'Content slots', sfnext: 'Page Designer + decorators' },
            { concept: 'API layer', sfra: 'Pipeline → API', sfnext: 'SCAPI helper (lib/scapi/)' },
            { concept: 'Error page', sfra: 'error.isml', sfnext: 'ErrorBoundary export' },
            { concept: 'Auth', sfra: 'Session cookies', sfnext: 'SLAS split-cookie' },
            { concept: 'Deploy', sfra: 'Code version upload', sfnext: 'pnpm sfnext push' },
          ].map(({ concept, sfra, sfnext }, i) => (
            <div key={concept} className={`grid grid-cols-3 px-4 py-2.5 text-sm border-t border-slate-700/30 ${i % 2 === 0 ? 'bg-slate-900/30' : ''}`}>
              <div className="text-slate-300 font-medium text-xs">{concept}</div>
              <div className="text-slate-500 text-center text-xs">{sfra}</div>
              <div className="text-slate-200 text-center text-xs">{sfnext}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Files */}
      <section>
        <h2 className="text-lg font-bold text-slate-100 mb-3">Key Files to Know</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[
            { file: 'src/routes/_index.tsx', purpose: 'Homepage — loader fetches featured products, component renders hero + grid' },
            { file: 'src/routes/product.$id.tsx', purpose: 'Product detail page — loader fetches product via SCAPI' },
            { file: 'src/routes/category.$id.tsx', purpose: 'Category / PLP — product grid with filters' },
            { file: 'src/routes/cart.tsx', purpose: 'Cart page — actions handle add/remove/update' },
            { file: 'tailwind.config.js', purpose: 'Design tokens — colors, fonts, border radius' },
            { file: 'config.server.ts', purpose: 'B2C credentials and SCAPI configuration' },
            { file: 'src/lib/scapi/', purpose: 'SCAPI wrapper functions with TypeScript types' },
            { file: 'src/components/', purpose: 'Reusable UI components (Header, ProductCard, etc.)' },
          ].map(({ file, purpose }) => (
            <div key={file} className="flex gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-700/50">
              <code className="text-violet-400 font-mono text-xs flex-shrink-0 w-48">{file}</code>
              <span className="text-slate-400 text-xs">{purpose}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Demo URLs */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Globe size={18} className="text-amber-400" />
          <h2 className="text-lg font-bold text-slate-100">Demo URLs & Resources</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: 'Odyssey Reference Store', url: 'https://sfcc-odyssey-production.mobify-storefront.com/global/en-GB/', desc: 'High-quality live implementation' },
            { label: 'SE Demo Storefront', url: 'https://sedemo-sfnext-zzsa004.mobify-storefront.com/ntoNext/en-US/', desc: 'SE-specific demo environment' },
            { label: 'Template Repository', url: 'https://github.com/SalesforceCommerceCloud/storefront-next-template', desc: 'GitHub — starting point for builds' },
            { label: 'B2C Developer Tooling', url: 'https://salesforcecommercecloud.github.io/b2c-developer-tooling/', desc: 'CLI, MCP server, agent skills docs' },
          ].map(({ label, url, desc }) => (
            <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-700/50 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all group">
              <ExternalLink size={14} className="text-slate-500 group-hover:text-amber-400 mt-0.5 flex-shrink-0 transition-colors" />
              <div>
                <div className="text-slate-200 font-medium text-sm group-hover:text-amber-300 transition-colors">{label}</div>
                <div className="text-slate-500 text-xs">{desc}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Customer Context Quick Map */}
      <section>
        <h2 className="text-lg font-bold text-slate-100 mb-3">Customer Context → Demo to Run</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[
            { context: 'Comparing build timelines', demo: 'Speed to Launch', path: '/demo-playbook#speed' },
            { context: 'Developer-focused evaluation', demo: 'AI-Assisted Development', path: '/demo-playbook#dx' },
            { context: 'Competitive RFP (Shopify etc.)', demo: 'Performance', path: '/demo-playbook#performance' },
            { context: 'Business stakeholder buy-in', demo: 'Merchandiser Empowerment', path: '/demo-playbook#merchandiser' },
          ].map(({ context, demo, path }) => (
            <Link key={context} to={path} className="flex items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-700/50 hover:border-sky-500/20 transition-colors group">
              <span className="text-slate-300 text-sm">{context}</span>
              <span className="text-xs px-2 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 group-hover:bg-sky-500/20 transition-colors">{demo}</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="flex justify-between">
        <Link
          to="/demo-playbook"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm transition-colors border border-slate-700"
        >
          <ArrowLeft size={15} /> Demo Playbook
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-colors shadow-lg shadow-emerald-500/20"
        >
          Back to Overview
        </Link>
      </div>
    </div>
  )
}
