import { Link } from 'react-router-dom'
import { ArrowRight, Layers, Server, Globe, ArrowDown, FileCode2, Package, Gauge, Languages } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import CodeBlock from '../components/CodeBlock'
import Callout from '../components/Callout'
import StepCard from '../components/StepCard'

const techStack = [
  {
    name: 'React 19',
    icon: '⚛️',
    color: 'border-sky-500/30 bg-sky-950/20',
    badge: 'text-sky-400 bg-sky-500/10',
    role: 'UI Components',
    sfraAnalog: 'ISML Templates',
    detail: [
      'Every visible element (header, product card, button) is a React component — a function that returns HTML.',
      'React 19 adds Streaming SSR: the server sends HTML progressively as data loads, giving instant page paint before the API calls finish.',
      'Suspense boundaries let you show loading skeletons while data is fetching — great for product grids.',
    ],
    code: `// src/components/product-tile/index.tsx
export function ProductTile({ product }: { product: Product }) {
  return (
    <div className="rounded-xl border border-slate-700 p-4">
      <img src={product.imageUrl} alt={product.name} />
      <h2 className="font-semibold mt-2">{product.name}</h2>
      <p className="text-sky-400 font-bold">{product.price}</p>
    </div>
  )
}`,
  },
  {
    name: 'React Router 7',
    icon: '🔀',
    color: 'border-blue-500/30 bg-blue-950/20',
    badge: 'text-blue-400 bg-blue-500/10',
    role: 'Routing & Data',
    sfraAnalog: 'Controllers + pipelines',
    detail: [
      'File-based routing: the filename encodes the URL. Dots separate path segments, $ marks dynamic params, and underscore prefixes assign layout groups (_app, _checkout, _empty).',
      'Loaders run server-side before the page renders — like a controller fetching data before returning an ISML template.',
      'Actions handle form submissions and mutations (add to cart, update profile) — they run on the server and redirect.',
    ],
    code: `// src/routes/_app.product.$productId.tsx
// URL: /product/123 (rendered inside _app.tsx layout)

export async function loader({ params }: LoaderArgs) {
  // Runs server-side — fetch product from SCAPI
  const product = await getProduct(params.productId)
  return { product }
}

export default function ProductPage() {
  const { product } = useLoaderData<typeof loader>()
  return <ProductDetail product={product} />
}`,
  },
  {
    name: 'Tailwind + ShadCN',
    icon: '🎨',
    color: 'border-violet-500/30 bg-violet-950/20',
    badge: 'text-violet-400 bg-violet-500/10',
    role: 'Styling & Components',
    sfraAnalog: 'Bootstrap + custom CSS',
    detail: [
      'Tailwind is utility-first CSS: you style elements by adding class names like bg-sky-500 or rounded-xl — no separate CSS files.',
      'ShadCN gives you pre-built accessible components (buttons, dialogs, dropdowns) that you own and can modify.',
      'Design tokens (colors, spacing, fonts) are configured in tailwind.config.js — change a token, update the entire site.',
    ],
    code: `// Before: SFRA approach
// <div class="product-card">

// After: Tailwind utilities
<div className="rounded-xl border border-slate-700 p-4
                hover:border-sky-500/50 transition-colors
                bg-slate-900/60">
  <h2 className="text-lg font-semibold text-slate-100">
    Product Name
  </h2>
</div>`,
  },
  {
    name: 'Managed Runtime',
    icon: '☁️',
    color: 'border-emerald-500/30 bg-emerald-950/20',
    badge: 'text-emerald-400 bg-emerald-500/10',
    role: 'Infrastructure',
    sfraAnalog: 'B2C Commerce app server',
    detail: [
      'AWS Lambda functions handle server-side rendering — each request spins up a function, renders the page, and returns HTML.',
      'Automatic scaling: a flash sale with 100x traffic just works. No capacity planning required.',
      'Deploy with pnpm push (or sfnext push) — Managed Runtime handles CDN distribution, SSL, and global routing.',
    ],
    code: `# Deploy to Managed Runtime
pnpm build       # Build the production bundle
pnpm push        # Upload to MRT (via sfnext push)

# sfnext CLI can also do it directly:
sfnext push --environment production`,
  },
]

const fileStructure = `storefront-next-template/
├── src/
│   ├── routes/                              ← Pages (filename = URL)
│   │   ├── _app.tsx                         ← Main layout (header, footer, nav)
│   │   ├── _app._index.tsx                  ← Homepage (/)
│   │   ├── _app.product.$productId.tsx      ← PDP (/product/123)
│   │   ├── _app.category.$categoryId.tsx    ← PLP (/category/womens)
│   │   ├── _app.cart.tsx                    ← Cart (/cart)
│   │   ├── _app.search.tsx                  ← Search (/search)
│   │   ├── _app.account.orders.$orderNo.tsx ← Order detail
│   │   ├── _checkout.tsx                    ← Checkout layout (minimal chrome)
│   │   ├── _checkout.checkout.tsx           ← Checkout page (/checkout)
│   │   ├── _empty.tsx                       ← Empty layout (no header/footer)
│   │   ├── _empty.login.tsx                 ← Login (/login)
│   │   ├── action.cart-item-add.tsx         ← Cart add mutation (no UI)
│   │   └── resource.robots[.]txt.ts         ← API endpoint (no UI)
│   │
│   ├── components/          ← Reusable UI pieces
│   │   ├── Header.tsx
│   │   ├── product-tile/    ← Product display component
│   │   └── ui/              ← ShadCN components
│   │
│   ├── hooks/               ← Shared React logic
│   │   └── useCart.ts
│   │
│   ├── lib/                 ← Utilities & API clients
│   │   ├── scapi/           ← SCAPI wrappers
│   │   └── utils.ts
│   │
│   └── providers/           ← React Context (global state)
│       └── CartProvider.tsx
│
├── config.server.ts         ← App config (B2C credentials)
├── tailwind.config.js       ← Design tokens
└── .env                     ← Secrets (not in git!)`

const requestFlow = [
  { step: 'Browser requests /product/123', icon: Globe, color: 'text-sky-400' },
  { step: 'MRT Lambda function receives request', icon: Server, color: 'text-emerald-400' },
  { step: 'React Router matches route → _app.product.$productId.tsx', icon: FileCode2, color: 'text-blue-400' },
  { step: 'loader() runs server-side → calls SCAPI for product data', icon: ArrowDown, color: 'text-violet-400' },
  { step: 'React renders ProductPage with data → HTML streams to browser', icon: Layers, color: 'text-amber-400' },
  { step: 'Browser hydrates: React takes over for interactions', icon: '⚛️' as any, color: 'text-sky-400' },
]

export default function Module1() {
  return (
    <div className="space-y-12">
      <SectionHeader
        badge="Module 1 · 25 min"
        title="Architecture"
        subtitle="How React 19, React Router 7, Tailwind, and Managed Runtime fit together to render a storefront. If you're coming from SFRA, we'll map every concept to something familiar."
        gradient="sky"
      />

      <Callout type="info" title="SFRA Veterans: Mental Model">
        Think of it this way — <strong>Routes are your Controllers</strong>, <strong>Components are your ISML templates</strong>, <strong>Loaders are your pipeline nodes</strong>, and <strong>Tailwind classes are your CSS</strong>. Same separation of concerns, modern tooling.
      </Callout>

      {/* Tech stack deep dives */}
      <section>
        <h2 className="text-xl font-bold text-slate-100 mb-6">The Stack — Layer by Layer</h2>
        <div className="space-y-8">
          {techStack.map(({ name, icon, color, badge, role, sfraAnalog, detail, code }) => (
            <div key={name} className={`rounded-2xl border ${color} p-6`}>
              <div className="flex items-start gap-4 mb-4">
                <span className="text-3xl">{icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <h3 className="font-bold text-slate-100 text-xl">{name}</h3>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${badge}`}>{role}</span>
                    <span className="text-xs text-slate-500">SFRA analog: <span className="text-slate-400">{sfraAnalog}</span></span>
                  </div>
                </div>
              </div>
              <ul className="space-y-2 mb-5">
                {detail.map((d, i) => (
                  <li key={i} className="flex gap-2 text-slate-400 text-sm leading-relaxed">
                    <span className="text-slate-600 mt-1.5 flex-shrink-0">›</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <CodeBlock code={code} language="typescript" />
            </div>
          ))}
        </div>
      </section>

      {/* File structure */}
      <section>
        <h2 className="text-xl font-bold text-slate-100 mb-3">Project Structure</h2>
        <p className="text-slate-400 text-sm mb-4">
          Open your project in VS Code and follow along. Every folder has a single clear purpose.
        </p>
        <CodeBlock code={fileStructure} language="bash" filename="storefront-next-template/" />
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { folder: 'src/routes/', desc: 'Each file is a page. The filename encodes layout group, path segments, and dynamic params.' },
            { folder: 'src/components/', desc: 'Reusable UI. A component renders the same way wherever you use it.' },
            { folder: 'src/lib/scapi/', desc: 'API client wrappers for B2C Commerce Shopper APIs.' },
            { folder: 'tailwind.config.js', desc: 'Your brand tokens. Change colors, fonts, and spacing here.' },
          ].map(({ folder, desc }) => (
            <div key={folder} className="flex gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-700/50">
              <code className="text-sky-400 font-mono text-xs flex-shrink-0 mt-0.5">{folder}</code>
              <span className="text-slate-400 text-xs">{desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Route file naming conventions */}
      <section>
        <h2 className="text-xl font-bold text-slate-100 mb-3">Route File Naming Conventions</h2>
        <p className="text-slate-400 text-sm mb-4 leading-relaxed">
          In Storefront Next, the <strong className="text-slate-200">filename encodes the entire URL structure</strong>. Dots separate path segments, <code className="bg-slate-800 px-1 py-0.5 rounded text-sky-400 font-mono text-xs">$</code> marks dynamic parameters, and underscore prefixes define which layout wraps the page.
        </p>

        {/* Anatomy of a route file */}
        <div className="mb-6 p-4 rounded-xl bg-slate-900/60 border border-sky-500/30">
          <h3 className="text-sm font-bold text-sky-400 mb-3">Anatomy of a Route Filename</h3>
          <div className="font-mono text-sm mb-3">
            <span className="text-violet-400">_app</span>
            <span className="text-slate-500">.</span>
            <span className="text-sky-400">product</span>
            <span className="text-slate-500">.</span>
            <span className="text-emerald-400">$productId</span>
            <span className="text-slate-500">.tsx</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-2 rounded bg-violet-950/30 border border-violet-500/20">
              <span className="text-violet-400 font-bold">_app.</span>
              <span className="text-slate-400"> — Layout prefix. Renders inside the <code className="text-violet-300">_app.tsx</code> layout (header, footer, nav).</span>
            </div>
            <div className="p-2 rounded bg-sky-950/30 border border-sky-500/20">
              <span className="text-sky-400 font-bold">product.</span>
              <span className="text-slate-400"> — Path segment. Becomes <code className="text-sky-300">/product</code> in the URL.</span>
            </div>
            <div className="p-2 rounded bg-emerald-950/30 border border-emerald-500/20">
              <span className="text-emerald-400 font-bold">$productId</span>
              <span className="text-slate-400"> — Dynamic parameter. Matches any value (e.g., <code className="text-emerald-300">/product/123</code>).</span>
            </div>
          </div>
        </div>

        {/* Three layout groups */}
        <h3 className="text-sm font-bold text-slate-200 mb-3">Three Layout Groups</h3>
        <p className="text-slate-400 text-xs mb-3">
          The underscore prefix (<code className="bg-slate-800 px-1 py-0.5 rounded text-sky-400 font-mono text-xs">_</code>) creates a <strong className="text-slate-300">pathless layout route</strong> — it wraps child pages but doesn't add a segment to the URL. The template ships with three:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {[
            {
              layout: '_app.tsx',
              color: 'border-sky-500/30 bg-sky-950/20',
              titleColor: 'text-sky-400',
              desc: 'Full storefront chrome',
              detail: 'Header, footer, navigation, mini-cart. Used by homepage, PDP, PLP, cart, search, account pages.',
              examples: ['_app._index.tsx → /', '_app.product.$productId.tsx → /product/123', '_app.cart.tsx → /cart'],
            },
            {
              layout: '_checkout.tsx',
              color: 'border-amber-500/30 bg-amber-950/20',
              titleColor: 'text-amber-400',
              desc: 'Minimal checkout chrome',
              detail: 'Stripped-down header, no footer navigation. Keeps shoppers focused on completing their purchase.',
              examples: ['_checkout.checkout.tsx → /checkout'],
            },
            {
              layout: '_empty.tsx',
              color: 'border-violet-500/30 bg-violet-950/20',
              titleColor: 'text-violet-400',
              desc: 'Empty shell (no header/footer)',
              detail: 'Clean page with no storefront chrome. Used for authentication screens and maintenance.',
              examples: ['_empty.login.tsx → /login', '_empty.forgot-password.tsx → /forgot-password'],
            },
          ].map(({ layout, color, titleColor, desc, detail, examples }) => (
            <div key={layout} className={`p-3 rounded-xl border ${color}`}>
              <code className={`font-mono text-sm font-bold ${titleColor}`}>{layout}</code>
              <div className="text-slate-200 text-xs font-semibold mt-1">{desc}</div>
              <div className="text-slate-400 text-xs mt-1 mb-2">{detail}</div>
              <div className="space-y-1">
                {examples.map((ex) => (
                  <div key={ex} className="text-xs font-mono text-slate-500">{ex}</div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Route examples table */}
        <h3 className="text-sm font-bold text-slate-200 mb-3">Route Examples from the Template</h3>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-2 px-3 text-slate-400 font-semibold">File</th>
                <th className="text-left py-2 px-3 text-slate-400 font-semibold">URL</th>
                <th className="text-left py-2 px-3 text-slate-400 font-semibold">Layout</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {[
                { file: '_app._index.tsx', url: '/', layout: 'Main' },
                { file: '_app.product.$productId.tsx', url: '/product/:productId', layout: 'Main' },
                { file: '_app.category.$categoryId.tsx', url: '/category/:categoryId', layout: 'Main' },
                { file: '_app.cart.tsx', url: '/cart', layout: 'Main' },
                { file: '_app.search.tsx', url: '/search', layout: 'Main' },
                { file: '_app.account.orders.$orderNo.tsx', url: '/account/orders/:orderNo', layout: 'Main' },
                { file: '_checkout.checkout.tsx', url: '/checkout', layout: 'Checkout' },
                { file: '_empty.login.tsx', url: '/login', layout: 'Empty' },
                { file: '_empty.forgot-password.tsx', url: '/forgot-password', layout: 'Empty' },
              ].map(({ file, url, layout }) => (
                <tr key={file} className="border-b border-slate-800/50">
                  <td className="py-1.5 px-3 text-sky-400">{file}</td>
                  <td className="py-1.5 px-3 text-slate-300">{url}</td>
                  <td className="py-1.5 px-3 text-slate-500">{layout}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Special file types */}
        <h3 className="text-sm font-bold text-slate-200 mb-3">Special Route Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/20">
            <code className="text-amber-400 font-mono text-sm font-bold">action.*</code>
            <div className="text-slate-200 text-xs font-semibold mt-1">Form Mutation Handlers</div>
            <div className="text-slate-400 text-xs mt-1">
              Handle POST requests from forms — add to cart, wishlist, coupon apply. No page rendering, no UI. They process the mutation and redirect.
            </div>
            <div className="mt-2 space-y-0.5 font-mono text-xs text-slate-500">
              <div>action.cart-item-add.tsx</div>
              <div>action.wishlist-add.ts</div>
              <div>action.coupon-add.ts</div>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20">
            <code className="text-emerald-400 font-mono text-sm font-bold">resource.*</code>
            <div className="text-slate-200 text-xs font-semibold mt-1">API-Style Endpoints</div>
            <div className="text-slate-400 text-xs mt-1">
              Return data (JSON, XML, text) instead of HTML pages. Used for robots.txt, sitemap, health checks, and programmatic endpoints.
            </div>
            <div className="mt-2 space-y-0.5 font-mono text-xs text-slate-500">
              <div>resource.robots[.]txt.ts</div>
              <div>resource.sitemap[.]xml.ts</div>
            </div>
          </div>
        </div>

        <Callout type="info" title="SFRA analog">
          Think of layout prefixes like <strong>stacking cartridges</strong> — <code className="bg-slate-800 px-1 py-0.5 rounded text-sky-400 font-mono text-xs">_app.tsx</code> is your <code className="bg-slate-800 px-1 py-0.5 rounded text-sky-400 font-mono text-xs">app.isml</code> (main decorator), <code className="bg-slate-800 px-1 py-0.5 rounded text-sky-400 font-mono text-xs">_checkout.tsx</code> is your <code className="bg-slate-800 px-1 py-0.5 rounded text-sky-400 font-mono text-xs">checkout.isml</code> decorator. The <code className="bg-slate-800 px-1 py-0.5 rounded text-sky-400 font-mono text-xs">action.*</code> files are like SFRA <code className="bg-slate-800 px-1 py-0.5 rounded text-sky-400 font-mono text-xs">*-ajax</code> controllers — they process data without rendering a full page.
        </Callout>
      </section>

      {/* Request lifecycle */}
      <section>
        <h2 className="text-xl font-bold text-slate-100 mb-3">Request Lifecycle</h2>
        <p className="text-slate-400 text-sm mb-6">
          What happens when a shopper navigates to a product page? Trace the full path from browser to rendered HTML.
        </p>
        <div className="space-y-2">
          {requestFlow.map(({ step, color }, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-400 flex-shrink-0">
                {i + 1}
              </div>
              <div className="flex-1 p-3 rounded-lg bg-slate-900/60 border border-slate-700/50">
                <span className={`text-sm font-medium ${color}`}>{step}</span>
              </div>
              {i < requestFlow.length - 1 && (
                <ArrowDown size={14} className="text-slate-600 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Commerce Apps */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-sky-500/15 border border-sky-500/30 flex items-center justify-center">
            <Package size={15} className="text-sky-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Commerce Apps (CAPs)</h2>
          <span className="text-slate-500 text-sm">Awareness</span>
        </div>
        <p className="text-slate-400 text-sm mb-4 leading-relaxed">
          Commerce Apps bundle cartridges, IMPEX data, and Storefront Next UI extensions into installable packages. When a Commerce App includes Storefront Next components, the install command{' '}
          <strong className="text-slate-200">automatically creates a pull request</strong>{' '}
          with the UI changes — reflecting the modern, git-based development workflow.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { cmd: 'b2c cap validate', desc: 'Check package structure' },
            { cmd: 'b2c cap package', desc: 'Create distributable zip' },
            { cmd: 'b2c cap install', desc: 'Install app to sandbox' },
            { cmd: 'b2c cap uninstall', desc: 'Remove installed app' },
          ].map(({ cmd, desc }) => (
            <div key={cmd} className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/50 text-center">
              <code className="text-sky-400 text-xs font-mono">{cmd}</code>
              <div className="text-slate-500 text-xs mt-1">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Internationalization */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-sky-500/15 border border-sky-500/30 flex items-center justify-center">
            <Languages size={15} className="text-sky-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Internationalization (i18n)</h2>
          <span className="text-slate-500 text-sm">Awareness</span>
        </div>
        <p className="text-slate-400 text-sm mb-4 leading-relaxed">
          Most enterprise customers operate in multiple locales. Storefront Next supports multi-locale and multi-site storefronts out of the box using path-based locale routing — no additional infrastructure required.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { title: 'Path-based locales', detail: 'URLs follow /{locale}/{language}/ pattern (e.g., /us/en-US/, /uk/en-GB/). The locale segment routes to the correct site and language.' },
            { title: 'Translation management', detail: 'Translation strings live in locale-specific JSON files. Components use a translation hook to render the correct language.' },
            { title: 'Multi-site support', detail: 'One codebase can serve multiple brands/regions. Configuration in config.server.ts maps locales to B2C Commerce sites.' },
          ].map(({ title, detail }) => (
            <div key={title} className="p-3 rounded-lg bg-sky-950/20 border border-sky-500/20">
              <div className="text-sky-300 font-semibold text-sm mb-1">{title}</div>
              <div className="text-slate-400 text-xs">{detail}</div>
            </div>
          ))}
        </div>
        <Callout type="info" title="For customer conversations">
          When a customer asks "how do we handle multiple languages and regions?" — Storefront Next handles this with path-based locale routing, shared components, and locale-specific translation files. The Odyssey reference store demonstrates this with its <code className="bg-slate-800 px-1 py-0.5 rounded text-sky-400 font-mono text-xs">/global/en-GB/</code> URL pattern.
        </Callout>
      </section>

      {/* Performance & Core Web Vitals */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
            <Gauge size={15} className="text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Performance & Core Web Vitals</h2>
          <span className="text-slate-500 text-sm">Awareness</span>
        </div>
        <p className="text-slate-400 text-sm mb-4 leading-relaxed">
          Performance is a competitive differentiator. Storefront Next achieves best-in-class Core Web Vitals through Streaming SSR, optimized asset loading, and edge CDN distribution — all built into the architecture.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { metric: 'LCP', label: 'Largest Contentful Paint', target: '< 2.5s', detail: 'Streaming SSR ensures the hero image/text appears immediately without waiting for all data' },
            { metric: 'CLS', label: 'Cumulative Layout Shift', target: '< 0.1', detail: 'Server-rendered HTML means layout is stable before hydration — no content jumps' },
            { metric: 'INP', label: 'Interaction to Next Paint', target: '< 200ms', detail: 'React 19 concurrent features keep the main thread responsive during interactions' },
          ].map(({ metric, label, target, detail }) => (
            <div key={metric} className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-emerald-400 font-bold text-sm">{metric}</span>
                <span className="text-slate-500 text-xs">({label})</span>
              </div>
              <div className="text-emerald-300 font-semibold text-xs mb-1">Target: {target}</div>
              <div className="text-slate-400 text-xs">{detail}</div>
            </div>
          ))}
        </div>
        <Callout type="info" title="For competitive conversations">
          When a prospect is comparing Shopify, BigCommerce, or SFRA — Core Web Vitals scores are a concrete, measurable talking point. Storefront Next's Streaming SSR and server-side rendering give it a structural advantage that shows up clearly in Lighthouse audits.
        </Callout>
      </section>

      <Callout type="tip" title="SE Talking Points">
        <ul className="space-y-1 text-sm">
          <li>• "Storefront Next uses the same mental model as SFRA — routes, data loading, templates — but with modern tooling that developers already know."</li>
          <li>• "Every page is server-rendered for SEO and performance. Product data is in the HTML before the browser runs JavaScript."</li>
          <li>• "Managed Runtime scales elastically — flash sales just work, no capacity planning."</li>
          <li>• "Commerce Apps extend the storefront via git-based pull requests, not cartridge overlays."</li>
          <li>• "Multi-locale, multi-site — one codebase serves all regions with path-based routing."</li>
        </ul>
      </Callout>

      {/* Hands-on steps */}
      <section>
        <h2 className="text-xl font-bold text-slate-100 mb-6">Hands-On: Explore Your Project</h2>
        <div className="space-y-0">
          <StepCard stepKey="m1-react" number={1} title="Open the project in VS Code">
            <p className="text-sm">Run <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">code .</code> from your project directory. Expand the <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">src/</code> folder in the file tree.</p>
          </StepCard>
          <StepCard stepKey="m1-rr7" number={2} title="Trace a request through the code">
            <p className="text-sm">Open <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">src/routes/_app._index.tsx</code>. Find the <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">loader()</code> function. Ask Claude Code: <em>"Explain what this loader does and what SCAPI calls it makes."</em> Verify the answer against the request lifecycle diagram above.</p>
          </StepCard>
          <StepCard stepKey="m1-tailwind" number={3} title="Inspect Tailwind classes in the browser">
            <p className="text-sm">In your browser's DevTools, inspect the homepage hero banner. Notice the class names like <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">relative overflow-hidden rounded-2xl</code>. Find where they're defined in the source.</p>
          </StepCard>
          <StepCard stepKey="m1-ssr" number={4} title="Prove SSR is working">
            <p className="text-sm">In DevTools → Network tab, reload the page. Click the first HTML document. In the Response, search for a product name that's visible on the page. If you find it in the raw HTML (before JavaScript runs), SSR is working. <strong className="text-slate-100">Explain to your neighbor why this matters for SEO.</strong></p>
          </StepCard>
          <StepCard stepKey="m1-mrt" number={5} title="Explore the config">
            <p className="text-sm">Open <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">config.server.ts</code> and <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">tailwind.config.js</code>. These are your two key configuration files — one controls B2C connections, the other controls visual design tokens.</p>
          </StepCard>
          <StepCard stepKey="m1-cwv" number={6} title="Measure Core Web Vitals" isLast>
            <p className="text-sm">Open DevTools → <strong className="text-slate-200">Lighthouse</strong> tab. Run an audit on your local storefront (Navigation mode, Mobile device). Note the <strong className="text-slate-200">LCP</strong>, <strong className="text-slate-200">CLS</strong>, and <strong className="text-slate-200">INP</strong> scores. These are the numbers you'd cite in a customer conversation about performance.</p>
            <Callout type="tip" title="SE demo tip">
              In a live demo, run Lighthouse against the Odyssey reference store or the SE demo storefront. The scores are consistently strong — it's a concrete, visual proof point that complements the "Streaming SSR" talking point.
            </Callout>
          </StepCard>
        </div>
      </section>

      <div className="flex justify-end">
        <Link
          to="/module/2"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm transition-colors shadow-lg shadow-sky-500/20"
        >
          Module 2: Frontend Modifications <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  )
}
