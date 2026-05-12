import { Link } from 'react-router-dom'
import { ArrowRight, ServerCog, Database, Zap, ArrowLeftRight, AlertTriangle, Rocket, Shield, ShoppingCart, Search, TestTube } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import CodeBlock from '../components/CodeBlock'
import Callout from '../components/Callout'
import StepCard from '../components/StepCard'

const loaderExample = `// src/routes/_app.product.$productId.tsx
// loader() runs SERVER-SIDE before the page renders
// It's like a Controller + pipeline node in SFRA

import type { LoaderFunctionArgs } from 'react-router'
import type { ShopperProducts } from '@salesforce/storefront-next-runtime/scapi'
import { createApiClients } from '@/lib/api-clients.server'

export type ProductPageData = {
  product: Promise<ShopperProducts.schemas['Product']>
}

export function loader({ params, context }: LoaderFunctionArgs): ProductPageData {
  const { productId = '' } = params
  const clients = createApiClients(context)

  // Returns a promise — React streams HTML as data resolves
  const product = clients.shopperProducts.getProduct({
    params: {
      path: { id: productId },
      query: { expand: ['images', 'prices', 'variations'] },
    },
  }).then(({ data }) => data)

  return { product }
}

export default function ProductPage() {
  // useLoaderData() receives what loader() returned
  const { product } = useLoaderData<typeof loader>()

  return (
    <Suspense fallback={<ProductSkeleton />}>
      <Await resolve={product}>
        {(data) => <ProductDetail product={data} />}
      </Await>
    </Suspense>
  )
}`

const actionExample = `// src/routes/action.cart-item-add.tsx
// Action routes handle mutations — they have no UI, just server logic.
// The template uses separate action.* route files for each mutation.

import type { ActionFunctionArgs } from 'react-router'
import { getBasket, updateBasketResource } from '@/middlewares/basket.server'
import { createApiClients } from '@/lib/api-clients.server'

export async function action({ request, context }: ActionFunctionArgs) {
  const formData = await request.formData()
  const productId = formData.get('productId') as string
  const quantity = Number(formData.get('quantity'))

  // Basket middleware provides the current basket from session
  const basketResource = await getBasket(context)
  const basket = basketResource.current

  try {
    const clients = createApiClients(context)
    const { data: updatedBasket } = await clients.shopperBasketsV2.addItemToBasket({
      params: { path: { basketId: basket.basketId } },
      body: [{ productId, quantity }],
    })

    // Update the shared basket state so other components see the change
    updateBasketResource(context, updatedBasket)
    return { success: true, basket: updatedBasket }
  } catch (error) {
    return { success: false, error: 'Could not add item.' }
  }
}

// In your component, trigger the action with useFetcher:
function AddToCartButton({ productId }: { productId: string }) {
  const fetcher = useFetcher()
  const isAdding = fetcher.state === 'submitting'

  return (
    <fetcher.Form method="post" action="/action/cart-item-add">
      <input type="hidden" name="productId" value={productId} />
      <input type="hidden" name="quantity" value="1" />
      <button type="submit" disabled={isAdding}
        className="w-full py-3 bg-slate-900 text-white rounded-xl
                   disabled:opacity-50 transition-opacity">
        {isAdding ? 'Adding...' : 'Add to Cart'}
      </button>
    </fetcher.Form>
  )
}`

const scapiExample = `// src/lib/api/products.server.ts
// Typed API wrappers using the Commerce SDK client

import type { LoaderFunctionArgs } from 'react-router'
import type { ShopperProducts } from '@salesforce/storefront-next-runtime/scapi'
import { createApiClients } from '@/lib/api-clients.server'

// Types come directly from the SCAPI SDK — fully typed
type Product = ShopperProducts.schemas['Product']

/**
 * Fetch a single product by ID.
 * Uses the typed SDK client — no manual URL construction or auth.
 */
export async function fetchProductById(
  context: LoaderFunctionArgs['context'],
  id: string,
): Promise<Product> {
  const clients = createApiClients(context)

  const { data } = await clients.shopperProducts.getProduct({
    params: {
      path: { id },
      query: {
        expand: ['images', 'prices', 'variations'],
        allImages: true,
      },
    },
  })

  return data
}

/**
 * Fetch multiple products by IDs (e.g. for recently viewed).
 */
export async function fetchProductsByIds(
  context: LoaderFunctionArgs['context'],
  ids: string[],
): Promise<Product[]> {
  const clients = createApiClients(context)

  const { data } = await clients.shopperProducts.getProducts({
    params: {
      query: { ids },
    },
  })

  return data?.data ?? []
}`

const customHook = `// src/hooks/useProductInventory.ts
// Custom hooks encapsulate shared logic — reusable across routes

import { useState, useEffect } from 'react'

interface InventoryStatus {
  available: boolean
  quantity: number
  lowStock: boolean
  loading: boolean
}

export function useProductInventory(productId: string, variantId?: string): InventoryStatus {
  const [status, setStatus] = useState<InventoryStatus>({
    available: true,
    quantity: 0,
    lowStock: false,
    loading: true,
  })

  useEffect(() => {
    if (!productId) return

    const fetchInventory = async () => {
      try {
        const res = await fetch(
          \`/api/inventory?productId=\${productId}&variantId=\${variantId ?? ''}\`
        )
        const data = await res.json()
        setStatus({
          available: data.stockLevel > 0,
          quantity: data.stockLevel,
          lowStock: data.stockLevel > 0 && data.stockLevel < 5,
          loading: false,
        })
      } catch {
        setStatus(prev => ({ ...prev, loading: false }))
      }
    }

    fetchInventory()
  }, [productId, variantId])

  return status
}

// Usage in any component:
function StockIndicator({ productId, variantId }: Props) {
  const { available, lowStock, loading } = useProductInventory(productId, variantId)

  if (loading) return <Skeleton />
  if (!available) return <span className="text-red-500">Out of Stock</span>
  if (lowStock) return <span className="text-amber-500">Only a few left!</span>
  return <span className="text-emerald-500">In Stock</span>
}`

const errorBoundary = `// src/routes/product.$productId.tsx
// React Router 7 ErrorBoundary — handles loader errors gracefully

export function ErrorBoundary() {
  const error = useRouteError()

  // 404 — product not found
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-slate-100">Product Not Found</h1>
        <p className="text-slate-400">
          This product may have been removed or the URL is incorrect.
        </p>
        <Link to="/search" className="text-sky-400 hover:underline">
          Search for similar products →
        </Link>
      </div>
    )
  }

  // Generic error
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold text-red-400">Something went wrong</h1>
      <p className="text-slate-400">We're working on it. Please try again.</p>
    </div>
  )
}`

const deploymentExample = `# Deploy your storefront to Managed Runtime
pnpm sfnext push --project-slug <PROJECT> --target <ENVIRONMENT>

# Push your local .env to the remote environment
b2c mrt env var push -p <PROJECT> -e <ENVIRONMENT>

# Tail logs to debug issues on the deployed storefront
b2c mrt tail-logs -p <PROJECT> -e <ENVIRONMENT>

# Filter to errors only
b2c mrt tail-logs -p <PROJECT> -e <ENVIRONMENT> --level ERROR

# Search for specific patterns
b2c mrt tail-logs -p <PROJECT> -e <ENVIRONMENT> --search "timeout|500"`

export default function Module3() {
  return (
    <div className="space-y-12">
      <SectionHeader
        badge="Module 3 · 40 min"
        title="Backend Logic & Data Flow"
        subtitle="How loaders, actions, and SCAPI calls work together. This is where SFRA veterans will feel the biggest shift — and appreciate the biggest gains in clarity and testability."
        gradient="amber"
      />

      <Callout type="info" title="The key insight for SFRA developers">
        In SFRA, controllers called pipelines which called scripts which called APIs. In Storefront Next, data flows in one direction: <strong>loader() fetches → component renders → action() mutates → redirect rerenders</strong>. No shared mutable state between requests.
      </Callout>

      {/* Loaders */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
            <Database size={15} className="text-amber-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Part 1 — Loaders: Server-Side Data</h2>
          <span className="text-slate-500 text-sm">10 min</span>
        </div>
        <p className="text-slate-400 text-sm mb-5 leading-relaxed">
          Every route can export a <code className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-400 font-mono text-xs">loader()</code> function. It runs on the server before the page renders — making API calls, checking authentication, and returning data to the component. Think of it as your controller + pipeline combined.
        </p>
        <CodeBlock code={loaderExample} language="typescript" filename="src/routes/product.$productId.tsx" />
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { title: 'Runs server-side', detail: 'API keys, tokens, and secrets never reach the browser. The .server.ts suffix enforces this.' },
            { title: 'Streaming with Suspense', detail: 'Return promises from the loader — React streams HTML as data resolves, with skeleton fallbacks.' },
            { title: 'Type-safe SDK client', detail: 'createApiClients(context) returns fully typed SCAPI clients — autocomplete for every API parameter.' },
          ].map(({ title, detail }) => (
            <div key={title} className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/20">
              <div className="text-amber-300 font-semibold text-sm mb-1">{title}</div>
              <div className="text-slate-400 text-xs">{detail}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Actions */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
            <Zap size={15} className="text-amber-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Part 2 — Actions: Mutations</h2>
          <span className="text-slate-500 text-sm">8 min</span>
        </div>
        <p className="text-slate-400 text-sm mb-5 leading-relaxed">
          Actions handle writes: add to cart, submit a form, update profile. The template uses dedicated <code className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-400 font-mono text-xs">action.*</code> route files — they have no UI, just server-side logic. Components trigger them with <code className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-400 font-mono text-xs">useFetcher</code> to run the mutation without a full page navigation.
        </p>
        <CodeBlock code={actionExample} language="typescript" filename="src/routes/action.cart-item-add.tsx" />
        <div className="mt-4">
          <Callout type="tip" title="Progressive enhancement">
            Because actions use standard HTML form elements, they work even without JavaScript. React Router then enhances them with client-side navigation when JS is available.
          </Callout>
        </div>
      </section>

      {/* Checkout Flow */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
            <ShoppingCart size={15} className="text-amber-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Checkout Architecture</h2>
          <span className="text-slate-500 text-sm">Awareness</span>
        </div>
        <p className="text-slate-400 text-sm mb-4 leading-relaxed">
          Checkout is the most revenue-critical page on any storefront. Storefront Next uses a <strong className="text-slate-200">single-page accordion checkout</strong> — all steps live in one route (<code className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-400 font-mono text-xs">_checkout.checkout.tsx</code>) with a single action that dispatches based on intent. This keeps the shopper on one URL while progressively completing each step.
        </p>

        {/* Checkout route structure */}
        <div className="rounded-xl border border-amber-500/20 bg-amber-950/10 p-4 mb-4">
          <h3 className="text-amber-300 font-semibold text-sm mb-3">Route Structure</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            {[
              { file: '_app.cart.tsx', layout: 'Main', detail: 'Cart page — full storefront chrome (header, footer, nav). Loader fetches basket, item actions are handled by separate action.cart-* routes.' },
              { file: '_checkout.checkout.tsx', layout: 'Checkout', detail: 'Single-page checkout — minimal chrome. All steps (contact, shipping, payment) render as an accordion on one page.' },
              { file: '_app.order-confirmation.$orderNo.tsx', layout: 'Main', detail: 'Order confirmation — returns to full storefront layout with order details and next-steps messaging.' },
            ].map(({ file, layout, detail }) => (
              <div key={file} className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/50">
                <code className="text-amber-400 font-mono text-xs font-bold">{file}</code>
                <div className="text-slate-500 text-xs mt-0.5">Layout: {layout}</div>
                <div className="text-slate-400 text-xs mt-1">{detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Checkout steps (accordion) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
          {[
            { step: '1. Contact Info', intent: 'CONTACT_INFO', detail: 'Email and phone — action validates and saves to basket via SCAPI' },
            { step: '2. Shipping Address', intent: 'SHIPPING_ADDRESS', detail: 'Address form — action validates and saves shipping address to basket' },
            { step: '3. Shipping Options', intent: 'SHIPPING_OPTIONS', detail: 'Shipping method selection — action updates basket with chosen method' },
            { step: '4. Payment', intent: 'PAYMENT', detail: 'Credit card or saved payment — action adds payment instrument to basket' },
          ].map(({ step, intent, detail }) => (
            <div key={step} className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/20">
              <div className="text-amber-300 font-semibold text-xs mb-1">{step}</div>
              <code className="text-amber-400/70 font-mono text-xs">intent: {intent}</code>
              <div className="text-slate-400 text-xs mt-1">{detail}</div>
            </div>
          ))}
        </div>

        <p className="text-slate-400 text-sm mb-4 leading-relaxed">
          The final "Place Order" step is handled by a dedicated <code className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-400 font-mono text-xs">action.place-order.ts</code> route — it creates the order via SCAPI, saves customer profile data for returning shoppers, and redirects to the order confirmation page.
        </p>

        <Callout type="info" title="For customer conversations">
          When a prospect asks about "1-click checkout" — the template supports accelerated checkout flows where returning customers with saved payment and shipping can complete an order with minimal steps. The entire checkout uses server-side actions, so payment tokens and customer data never reach the browser. The template also includes Buy Online Pick Up In-Store (BOPIS) as an extension.
        </Callout>
      </section>

      {/* SCAPI */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
            <ArrowLeftRight size={15} className="text-amber-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Part 3 — SCAPI Integration</h2>
          <span className="text-slate-500 text-sm">8 min</span>
        </div>
        <p className="text-slate-400 text-sm mb-5 leading-relaxed">
          Storefront Next communicates with B2C Commerce exclusively through SCAPI (Shopper Commerce APIs). The template provides a typed SDK client via <code className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-400 font-mono text-xs">createApiClients(context)</code> — no manual URL construction or auth token management. API wrappers live in <code className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-400 font-mono text-xs">src/lib/api/</code> with a <code className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-400 font-mono text-xs">.server.ts</code> suffix to ensure they only run server-side.
        </p>
        <CodeBlock code={scapiExample} language="typescript" filename="src/lib/api/products.server.ts" />
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { api: 'Shopper Products', path: 'lib/api/products.server.ts', detail: 'Product detail, variations, images, and pricing' },
            { api: 'Shopper Baskets', path: 'lib/api/basket.server.ts', detail: 'Cart management, line items, coupons, shipping' },
            { api: 'Shopper Search', path: 'lib/api/search.server.ts', detail: 'Keyword search, faceted filtering, sorting, suggestions' },
            { api: 'Shopper Customers', path: 'lib/api/customer.server.ts', detail: 'Account management, addresses, wishlists, orders' },
          ].map(({ api, path, detail }) => (
            <div key={api} className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/50">
              <div className="text-slate-200 text-xs font-semibold mb-1">{api}</div>
              <code className="text-slate-500 text-xs font-mono">{path}</code>
              <div className="text-slate-500 text-xs mt-1">{detail}</div>
            </div>
          ))}
        </div>

        {/* Search Deeper Dive */}
        <div className="mt-4 p-4 rounded-xl bg-slate-900/40 border border-slate-700/30">
          <div className="flex items-center gap-2 mb-2">
            <Search size={14} className="text-amber-400" />
            <h4 className="text-slate-200 font-semibold text-sm">Search & Discovery</h4>
          </div>
          <p className="text-slate-400 text-xs mb-3 leading-relaxed">
            Search is a major conversion driver. The Shopper Search API provides keyword search with refinements, spelling suggestions, faceted filtering, and sorting — all configurable through Business Manager's search settings.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {[
              { feature: 'Keyword + Refinements', detail: 'Full-text search with color, size, price range, and brand refinements' },
              { feature: 'Search Suggestions', detail: 'Typeahead suggestions for faster discovery — integrates with the search bar component' },
              { feature: 'Custom Sorting', detail: 'Sort by relevance, price, rating, or custom sort rules defined in BM' },
            ].map(({ feature, detail }) => (
              <div key={feature} className="p-2 rounded-lg bg-slate-800/40 border border-slate-700/30">
                <div className="text-slate-300 text-xs font-semibold mb-0.5">{feature}</div>
                <div className="text-slate-500 text-xs">{detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Auth Architecture */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
            <Shield size={15} className="text-amber-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Authentication Architecture</h2>
          <span className="text-slate-500 text-sm">Conceptual</span>
        </div>
        <p className="text-slate-400 text-sm mb-4 leading-relaxed">
          Storefront Next uses SLAS (Shopper Login and API Access Service) with a split-cookie architecture. You don't need to implement this — it's built into the template — but understanding the pattern helps when customers ask security questions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { title: 'Split cookies', detail: 'Access token and refresh token are stored in separate cookies — never both in one' },
            { title: 'Server-side tokens', detail: 'Token refresh happens in middleware — credentials never reach the browser' },
            { title: 'Guest → registered', detail: 'When a guest logs in, the server swaps cookie types atomically — no identity gap' },
          ].map(({ title, detail }) => (
            <div key={title} className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/20">
              <div className="text-amber-300 font-semibold text-sm mb-1">{title}</div>
              <div className="text-slate-400 text-xs">{detail}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Hooks */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
            <ServerCog size={15} className="text-amber-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Part 4 — Custom Hooks</h2>
          <span className="text-slate-500 text-sm">5 min</span>
        </div>
        <p className="text-slate-400 text-sm mb-5 leading-relaxed">
          Custom hooks are reusable logic containers — like shared scripts in SFRA, but they can also manage state and trigger re-renders. Extract any logic you want to reuse across components into a hook.
        </p>
        <CodeBlock code={customHook} language="typescript" filename="src/hooks/useProductInventory.ts" />
      </section>

      {/* Error Handling */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
            <AlertTriangle size={15} className="text-amber-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Part 5 — Error Handling</h2>
          <span className="text-slate-500 text-sm">4 min</span>
        </div>
        <p className="text-slate-400 text-sm mb-5 leading-relaxed">
          React Router 7 gives you co-located error boundaries. If a loader throws, the <code className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-400 font-mono text-xs">ErrorBoundary</code> component in the same file handles it — without crashing the rest of the page.
        </p>
        <CodeBlock code={errorBoundary} language="typescript" filename="src/routes/product.$productId.tsx" />
      </section>

      {/* Testing */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
            <TestTube size={15} className="text-amber-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Testing Patterns</h2>
          <span className="text-slate-500 text-sm">Awareness</span>
        </div>
        <p className="text-slate-400 text-sm mb-4 leading-relaxed">
          Enterprise customers and SI partners will ask about testing strategy. Storefront Next uses modern JavaScript testing frameworks that align with the React ecosystem.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { tool: 'Vitest', type: 'Unit & Integration', detail: 'Fast test runner for loaders, actions, and utility functions. Same test syntax as Jest but purpose-built for Vite projects.' },
            { tool: 'React Testing Library', type: 'Component Tests', detail: 'Test components by simulating user interactions — click, type, submit. Encourages testing behavior, not implementation.' },
            { tool: 'Playwright', type: 'End-to-End', detail: 'Full browser testing for critical user flows: search → PDP → add to cart → checkout. Runs against the local dev server or staging URL.' },
          ].map(({ tool, type, detail }) => (
            <div key={tool} className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/20">
              <div className="text-amber-300 font-semibold text-sm mb-0.5">{tool}</div>
              <div className="text-amber-400/60 text-xs font-medium mb-1">{type}</div>
              <div className="text-slate-400 text-xs">{detail}</div>
            </div>
          ))}
        </div>
        <Callout type="info" title="For customer conversations">
          When SI partners or enterprise customers ask about test coverage: the template ships with Vitest configured and ready to use. Loaders and actions are plain async functions — easy to unit test without React rendering. For critical flows, Playwright E2E tests run in CI/CD via GitHub Actions.
        </Callout>
      </section>

      {/* Deployment */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
            <Rocket size={15} className="text-amber-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Part 6 — Deploying to Managed Runtime</h2>
          <span className="text-slate-500 text-sm">5 min</span>
        </div>
        <p className="text-slate-400 text-sm mb-5 leading-relaxed">
          You've been developing locally. Now let's get your changes live. Storefront Next deploys to Managed Runtime with a single command — and the B2C CLI gives you tools to manage environment variables and tail logs in real time.
        </p>
        <CodeBlock code={deploymentExample} language="bash" filename="Terminal" />
        <div className="mt-4">
          <Callout type="tip" title="Environment variables">
            <code className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-400 font-mono text-xs">b2c mrt env var push</code>{' '}
            compares your local <code className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-400 font-mono text-xs">.env</code> file against the remote environment and only applies the differences — no risk of overwriting.
          </Callout>
        </div>
      </section>

      <Callout type="tip" title="SE Talking Points">
        <ul className="space-y-1 text-sm">
          <li>• "All data fetching happens server-side — API keys and tokens never reach the browser. Security is built into the architecture."</li>
          <li>• "Parallel data fetching with Promise.all() is a one-line change that cuts page load time in half compared to sequential pipeline calls."</li>
          <li>• "Deploying changes is one command: pnpm sfnext push. Managed Runtime handles CDN, SSL, and global routing automatically."</li>
          <li>• "Real-time log tailing with b2c mrt tail-logs makes debugging deployed storefronts as fast as local development."</li>
        </ul>
      </Callout>

      {/* Hands-on */}
      <section>
        <h2 className="text-xl font-bold text-slate-100 mb-6">Hands-On Exercises</h2>
        <div className="space-y-0">
          <StepCard stepKey="m3-loader" number={1} title="Add parallel data fetching to the PDP">
            <p className="text-sm">Open your product route (<code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">src/routes/_app.product.$productId.tsx</code>). Update the loader to fetch both the product AND product recommendations in parallel — return both as promises that Suspense will resolve.</p>
            <Callout type="ai" title="Ask Claude Code">
              "In my product route loader, add a parallel fetch for Einstein recommendations using the product ID. Show me how to wire the data into the component."
            </Callout>
          </StepCard>
          <StepCard stepKey="m3-action" number={2} title="Add an Add to Wishlist action">
            <p className="text-sm">Create an action in your product route that saves a product to the customer's wishlist. The action should read <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">productId</code> from formData and call a SCAPI customer lists endpoint.</p>
          </StepCard>
          <StepCard stepKey="m3-scapi" number={3} title="Extend an API helper">
            <p className="text-sm">In <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">src/lib/api/products.server.ts</code>, add a new function that fetches products for a category using <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">createApiClients(context)</code>. Define a clean return type.</p>
            <Callout type="ai" title="Ask Claude Code">
              "Add a getProductsByCategory function to src/lib/api/products.server.ts. It should use createApiClients to call the SCAPI product search endpoint filtered by category. Include TypeScript types for the response."
            </Callout>
          </StepCard>
          <StepCard stepKey="m3-custom-hook" number={4} title="Build a useRecentlyViewed hook">
            <p className="text-sm">Create <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">src/hooks/useRecentlyViewed.ts</code>. When a product page loads, it should store the product ID in localStorage. The hook should return the last 5 viewed product IDs.</p>
          </StepCard>
          <StepCard stepKey="m3-error" number={5} title="Add an ErrorBoundary to the cart route">
            <p className="text-sm">Add an <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">ErrorBoundary</code> export to your cart route. Handle the case where the basket API returns a 404 (basket expired) with a helpful message and a "Start a new cart" button.</p>
          </StepCard>
          <StepCard stepKey="m3-deploy" number={6} title="Deploy and verify your changes" isLast>
            <p className="text-sm">
              Build and deploy your storefront. Run{' '}
              <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">pnpm build</code>{' '}
              first, then{' '}
              <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">pnpm push</code>{' '}
              to upload to Managed Runtime.
              Open the live URL and verify your changes are visible.
              If something looks wrong, use{' '}
              <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">b2c mrt tail-logs</code>{' '}
              to diagnose.
            </p>
            <Callout type="ai" title="Ask Claude Code">
              "Deploy my storefront to Managed Runtime and tail the logs so I can see if there are any errors."
            </Callout>
          </StepCard>
        </div>
      </section>

      <div className="flex justify-end">
        <Link
          to="/module/4"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-colors shadow-lg shadow-amber-500/20"
        >
          Module 4: AI Development <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  )
}
