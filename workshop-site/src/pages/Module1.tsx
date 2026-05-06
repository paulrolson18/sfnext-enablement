import { Link } from 'react-router-dom'
import { ArrowRight, Layers, Server, Globe, ArrowDown, FileCode2 } from 'lucide-react'
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
    code: `// src/components/ProductCard.tsx
export function ProductCard({ product }: { product: Product }) {
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
      'File-based routing: create a file in src/routes/ and it becomes a URL. No configuration needed.',
      'Loaders run server-side before the page renders — like a controller fetching data before returning an ISML template.',
      'Actions handle form submissions and mutations (add to cart, update profile) — they run on the server and redirect.',
    ],
    code: `// src/routes/product.$productId.tsx
// URL: /product/123

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
│   ├── routes/              ← Pages (file = URL)
│   │   ├── _index.tsx       ← Homepage (/)
│   │   ├── search.tsx       ← Search page (/search)
│   │   ├── category.$id.tsx ← Category (/category/womens)
│   │   └── product.$id.tsx  ← PDP (/product/123)
│   │
│   ├── components/          ← Reusable UI pieces
│   │   ├── Header.tsx
│   │   ├── ProductCard.tsx
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
  { step: 'React Router matches route → product.$id.tsx', icon: FileCode2, color: 'text-blue-400' },
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
            { folder: 'src/routes/', desc: 'Each file is a page. The filename defines the URL pattern.' },
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

      {/* Hands-on steps */}
      <section>
        <h2 className="text-xl font-bold text-slate-100 mb-6">Hands-On: Explore Your Project</h2>
        <div className="space-y-0">
          <StepCard stepKey="m1-react" number={1} title="Open the project in VS Code">
            <p className="text-sm">Run <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">code .</code> from your project directory. Expand the <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">src/</code> folder in the file tree.</p>
          </StepCard>
          <StepCard stepKey="m1-rr7" number={2} title="Find the homepage route">
            <p className="text-sm">Open <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">src/routes/_index.tsx</code>. Find the <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">loader()</code> function and the default export component. Which SCAPI calls does it make?</p>
          </StepCard>
          <StepCard stepKey="m1-tailwind" number={3} title="Inspect Tailwind classes in the browser">
            <p className="text-sm">In your browser's DevTools, inspect the homepage hero banner. Notice the class names like <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">relative overflow-hidden rounded-2xl</code>. Find where they're defined in the source.</p>
          </StepCard>
          <StepCard stepKey="m1-ssr" number={4} title="See SSR in action">
            <p className="text-sm">In DevTools → Network tab, reload the page. Click on the first HTML document request and look at the Response. You'll see the full HTML already rendered — that's server-side rendering from MRT Lambda.</p>
          </StepCard>
          <StepCard stepKey="m1-mrt" number={5} title="Explore the config" isLast>
            <p className="text-sm">Open <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">config.server.ts</code> and <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">tailwind.config.js</code>. These are your two key configuration files — one controls B2C connections, the other controls visual design tokens.</p>
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
