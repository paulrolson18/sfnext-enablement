import { Link } from 'react-router-dom'
import {
  Zap, Shield, ArrowRight, Cpu,
  TrendingUp, CheckCircle, ExternalLink
} from 'lucide-react'

const agenda = [
  { time: '0:00', duration: '10 min', label: 'Welcome & Overview', color: 'sky', path: '/' },
  { time: '0:10', duration: '15 min', label: 'Environment Validation', color: 'emerald', path: '/env-check' },
  { time: '0:25', duration: '25 min', label: 'Module 1 — Architecture', color: 'sky', path: '/module/1' },
  { time: '0:50', duration: '45 min', label: 'Module 2 — Frontend', color: 'violet', path: '/module/2' },
  { time: '1:35', duration: '10 min', label: 'Break', color: 'slate', path: null },
  { time: '1:45', duration: '40 min', label: 'Module 3 — Backend + Deployment', color: 'amber', path: '/module/3' },
  { time: '2:25', duration: '25 min', label: 'Module 4 — AI with Claude Code', color: 'violet', path: '/module/4' },
  { time: '2:50', duration: '10 min', label: 'Q&A & Wrap-up', color: 'slate', path: null },
]

const colorMap: Record<string, string> = {
  sky: 'bg-sky-500/15 border-sky-500/30 text-sky-400',
  emerald: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
  violet: 'bg-violet-500/15 border-violet-500/30 text-violet-400',
  amber: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
  slate: 'bg-slate-700/30 border-slate-700/50 text-slate-400',
}

const pillars = [
  {
    icon: Zap,
    color: 'text-sky-400',
    bg: 'bg-sky-500/10 border-sky-500/20',
    title: 'Quick to Launch',
    desc: 'Template-first approach means a working storefront in hours, not weeks. Figma-to-code tooling removes the blank-page problem.',
  },
  {
    icon: TrendingUp,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    title: 'High-Converting OOTB',
    desc: 'Modern PLP/PDP, 1-click checkout, streaming SSR for sub-second first paint, and best-in-class Core Web Vitals from day one.',
  },
  {
    icon: Cpu,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20',
    title: 'Built to be AI-First',
    desc: 'Local MCP server, Figma-to-code pipeline, Shopper Agent integration OOTB. Developers and business teams both get AI leverage.',
  },
  {
    icon: Shield,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
    title: 'Enterprise-Ready Scale',
    desc: 'Runs on Managed Runtime (AWS Lambda) with elastic scalability. Full ISV marketplace extensibility. Fully headless architecture.',
  },
]

const stack = [
  { name: 'React 19', role: 'UI Rendering', detail: 'Streaming SSR, Suspense, concurrent features', color: 'text-sky-400' },
  { name: 'React Router 7', role: 'Routing & Data', detail: 'File-based routing, loaders, actions (Remix patterns)', color: 'text-blue-400' },
  { name: 'Tailwind + ShadCN', role: 'Design System', detail: 'Utility-first CSS + accessible component primitives', color: 'text-violet-400' },
  { name: 'Managed Runtime', role: 'Infrastructure', detail: 'AWS Lambda, elastic scaling, global CDN', color: 'text-emerald-400' },
  { name: 'SCAPI', role: 'Commerce APIs', detail: 'Shopper APIs for catalog, cart, checkout, account', color: 'text-amber-400' },
]

const vsComparison = [
  { category: 'Time to Launch', sfra: 'Weeks of scaffolding', sfnext: 'Hours from template' },
  { category: 'Developer Stack', sfra: 'ISML, JS (classic)', sfnext: 'React, TypeScript, modern tooling' },
  { category: 'AI Tooling', sfra: 'Limited', sfnext: 'MCP server, Figma-to-code, Shopper Agent' },
  { category: 'Performance', sfra: 'Good', sfnext: 'Streaming SSR, optimized Core Web Vitals' },
  { category: 'Target Segment', sfra: 'Established enterprise', sfnext: '$25M+ GMV, expanding down-market' },
]

export default function Overview() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <div className="relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sky-500/5 via-transparent to-transparent rounded-3xl" />
        <div className="pt-4 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            SE Enablement Workshop — 3 Hours
          </div>
          <h1 className="text-5xl font-bold text-slate-100 leading-tight mb-4">
            Storefront Next<br />
            <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              SE Workshop
            </span>
          </h1>
          <p className="text-slate-400 text-xl leading-relaxed max-w-2xl mb-8">
            Everything you need to understand, demonstrate, and extend Salesforce's next-generation commerce storefront — built on React 19, React Router 7, and Tailwind CSS.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/pre-work"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-sm transition-colors shadow-lg shadow-sky-500/20"
            >
              Start Pre-Work <ArrowRight size={15} />
            </Link>
            <Link
              to="/env-check"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm transition-colors border border-slate-700"
            >
              <CheckCircle size={15} /> Validate Environment
            </Link>
          </div>
        </div>
      </div>

      {/* Why Storefront Next */}
      <section>
        <h2 className="text-2xl font-bold text-slate-100 mb-2">Why Storefront Next?</h2>
        <p className="text-slate-400 mb-8">
          Commerce Cloud customers have always faced a tradeoff: easy-to-manage stacks that lack scale, or enterprise-grade platforms that are complex to build and operate. Storefront Next ends that tradeoff.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pillars.map(({ icon: Icon, color, bg, title, desc }) => (
            <div key={title} className={`rounded-xl border p-5 ${bg}`}>
              <div className="flex items-start gap-3">
                <Icon size={22} className={`${color} mt-0.5 flex-shrink-0`} />
                <div>
                  <h3 className="font-semibold text-slate-100 mb-1">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GA Timeline */}
      <section className="rounded-2xl bg-gradient-to-r from-slate-900 to-slate-900/50 border border-slate-700/50 p-6">
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <div className="text-slate-400 text-sm mb-1">Pilot</div>
            <div className="text-slate-100 font-bold text-lg">Jan 2026</div>
          </div>
          <div className="flex-1 h-0.5 bg-gradient-to-r from-sky-500 to-emerald-500 rounded min-w-[60px]" />
          <div>
            <div className="text-slate-400 text-sm mb-1">Open Source</div>
            <div className="text-slate-100 font-bold text-lg">May 2026</div>
          </div>
          <div className="flex-1 h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded min-w-[60px]" />
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm font-semibold mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              GA Target
            </div>
            <div className="text-slate-100 font-bold text-lg">June 2026</div>
          </div>
        </div>
        <p className="text-slate-500 text-sm mt-4">
          8 pilot customers · 16 SI partners · Pilot at capacity · Positive early feedback on AI-assisted development
        </p>
      </section>

      {/* Tech Stack */}
      <section>
        <h2 className="text-2xl font-bold text-slate-100 mb-2">The Tech Stack</h2>
        <p className="text-slate-400 mb-6 text-sm">
          If you're coming from SFRA or PWA Kit, this stack is a shift — but it's the same mental model: routing, templates, data fetching, and a design system. The tools are just more modern.
        </p>
        <div className="space-y-2">
          {stack.map(({ name, role, detail, color }) => (
            <div key={name} className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-700/50 hover:border-slate-600/50 transition-colors">
              <div className={`font-bold text-sm font-mono ${color} w-36 flex-shrink-0`}>{name}</div>
              <div className="text-slate-300 text-sm font-medium w-32 flex-shrink-0">{role}</div>
              <div className="text-slate-500 text-sm">{detail}</div>
            </div>
          ))}
        </div>
      </section>

      {/* vs SFRA comparison */}
      <section>
        <h2 className="text-2xl font-bold text-slate-100 mb-6">Storefront Next vs. SFRA</h2>
        <div className="rounded-xl overflow-hidden border border-slate-700/50">
          <div className="grid grid-cols-3 bg-slate-800/60 text-xs font-semibold uppercase tracking-wider text-slate-400 px-4 py-3">
            <div></div>
            <div className="text-center">SFRA / PWA Kit</div>
            <div className="text-center text-sky-400">Storefront Next</div>
          </div>
          {vsComparison.map(({ category, sfra, sfnext }, i) => (
            <div key={category} className={`grid grid-cols-3 px-4 py-3 text-sm border-t border-slate-700/30 ${i % 2 === 0 ? 'bg-slate-900/30' : ''}`}>
              <div className="text-slate-400 font-medium">{category}</div>
              <div className="text-slate-500 text-center">{sfra}</div>
              <div className="text-slate-200 text-center">{sfnext}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Today's Agenda */}
      <section>
        <h2 className="text-2xl font-bold text-slate-100 mb-6">Today's Agenda</h2>
        <div className="space-y-2">
          {agenda.map(({ time, duration, label, color, path }) => {
            const classes = colorMap[color]
            const inner = (
              <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${classes} ${path ? 'hover:scale-[1.01] cursor-pointer' : 'opacity-60'}`}>
                <div className="font-mono text-xs w-10 flex-shrink-0 opacity-70">{time}</div>
                <div className={`text-xs px-2 py-0.5 rounded-full bg-black/20 font-medium flex-shrink-0`}>{duration}</div>
                <div className="font-medium">{label}</div>
                {path && <ArrowRight size={14} className="ml-auto opacity-50" />}
              </div>
            )
            return path ? (
              <Link key={label} to={path}>{inner}</Link>
            ) : (
              <div key={label}>{inner}</div>
            )
          })}
        </div>
      </section>

      {/* Resources */}
      <section>
        <h2 className="text-2xl font-bold text-slate-100 mb-6">Key Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Template Repository', url: 'https://github.com/SalesforceCommerceCloud/storefront-next-template', desc: 'Open source starting point' },
            { label: 'B2C Developer Tooling', url: 'https://salesforcecommercecloud.github.io/b2c-developer-tooling/', desc: 'CLI, MCP server, agent skills' },
            { label: 'Odyssey Reference Store', url: 'https://sfcc-odyssey-production.mobify-storefront.com/global/en-GB/', desc: 'Live implementation example' },
            { label: 'SE Demo Storefront', url: 'https://sedemo-sfnext-zzsa004.mobify-storefront.com/ntoNext/en-US/', desc: 'Storefront Next live demo' },
          ].map(({ label, url, desc }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-700/50 hover:border-sky-500/30 hover:bg-sky-500/5 transition-all group"
            >
              <ExternalLink size={16} className="text-slate-500 group-hover:text-sky-400 mt-0.5 flex-shrink-0 transition-colors" />
              <div>
                <div className="text-slate-200 font-medium text-sm group-hover:text-sky-300 transition-colors">{label}</div>
                <div className="text-slate-500 text-xs mt-0.5">{desc}</div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
