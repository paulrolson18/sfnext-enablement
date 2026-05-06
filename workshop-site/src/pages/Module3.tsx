import { Link } from 'react-router-dom'
import { ArrowRight, ServerCog, Database, Zap, ArrowLeftRight, AlertTriangle } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import CodeBlock from '../components/CodeBlock'
import Callout from '../components/Callout'
import StepCard from '../components/StepCard'

const loaderExample = `// src/routes/product.$productId.tsx
// loader() runs SERVER-SIDE before the page renders
// It's like a Controller + pipeline node in SFRA

import type { LoaderFunctionArgs } from 'react-router'
import { getProduct } from '~/lib/scapi/products'
import { getRecommendations } from '~/lib/scapi/einstein'

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { productId } = params

  // Run API calls in parallel for performance
  const [product, recommendations] = await Promise.all([
    getProduct(productId!),
    getRecommendations(productId!),
  ])

  // Return value is serialized as JSON to the client
  return { product, recommendations }
}

export default function ProductPage() {
  // useLoaderData() receives what loader() returned
  const { product, recommendations } = useLoaderData<typeof loader>()

  return (
    <>
      <ProductDetail product={product} />
      <RecommendedProducts items={recommendations} />
    </>
  )
}`

const actionExample = `// src/routes/cart.tsx
// Actions handle mutations: add to cart, update quantities, etc.
// They always run server-side (secure)

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const productId = formData.get('productId') as string
  const quantity = Number(formData.get('quantity'))

  // Get the customer's basket token from the session
  const basketId = await getBasketId(request)

  try {
    await addItemToBasket(basketId, { productId, quantity })
    // Redirect back — triggers loader refresh
    return redirect('/cart')
  } catch (error) {
    // Return error data — displayed in the component
    return { error: 'Could not add item. Please try again.' }
  }
}

// In your component, trigger the action with a form:
function AddToCartButton({ productId }: { productId: string }) {
  const actionData = useActionData<typeof action>()
  const navigation = useNavigation()
  const isAdding = navigation.state === 'submitting'

  return (
    <Form method="post" action="/cart">
      <input type="hidden" name="productId" value={productId} />
      <input type="hidden" name="quantity" value="1" />
      <button type="submit" disabled={isAdding}
        className="w-full py-3 bg-slate-900 text-white rounded-xl
                   disabled:opacity-50 transition-opacity">
        {isAdding ? 'Adding...' : 'Add to Cart'}
      </button>
      {actionData?.error && (
        <p className="text-red-400 text-sm mt-2">{actionData.error}</p>
      )}
    </Form>
  )
}`

const scapiExample = `// src/lib/scapi/products.ts
// Wrapping SCAPI calls in typed helper functions

import { CommerceApiConfig } from '~/config.server'

export interface Product {
  id: string
  name: string
  price: number
  salePrice?: number
  images: Array<{ url: string; alt: string }>
  description: string
  variants: ProductVariant[]
}

export async function getProduct(
  productId: string,
  config?: Partial<CommerceApiConfig>
): Promise<Product> {
  const { shortCode, organizationId, siteId } = config ?? getDefaultConfig()

  const response = await fetch(
    \`https://\${shortCode}.api.commercecloud.salesforce.com/product/shopper-products/v1/organizations/\${organizationId}/products/\${productId}?siteId=\${siteId}&expand=images,prices,variations\`,
    {
      headers: {
        Authorization: \`Bearer \${await getSHOASToken()}\`,
        'Content-Type': 'application/json',
      },
    }
  )

  if (!response.ok) {
    throw new Response('Product not found', { status: 404 })
  }

  const data = await response.json()
  return mapProductResponse(data)
}

// Map SCAPI response shape to our clean interface
function mapProductResponse(raw: ScapiProduct): Product {
  return {
    id: raw.id,
    name: raw.name,
    price: raw.price,
    salePrice: raw.priceRanges?.[0]?.minPrice,
    images: raw.imageGroups?.[0]?.images?.map(img => ({
      url: img.disBaseLink,
      alt: img.alt,
    })) ?? [],
    description: raw.longDescription,
    variants: raw.variants ?? [],
  }
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

export default function Module3() {
  return (
    <div className="space-y-12">
      <SectionHeader
        badge="Module 3 · 35 min"
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
            { title: 'Runs server-side', detail: 'API keys, tokens, and secrets never reach the browser' },
            { title: 'Parallel fetching', detail: 'Promise.all() fetches product + recommendations simultaneously' },
            { title: 'Type-safe data', detail: 'useLoaderData<typeof loader>() gives full TypeScript types' },
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
          Actions handle writes: add to cart, submit a form, update profile. They run server-side via HTTP POST, so API credentials stay secure. React Router handles the redirect-after-POST pattern automatically.
        </p>
        <CodeBlock code={actionExample} language="typescript" filename="src/routes/cart.tsx" />
        <div className="mt-4">
          <Callout type="tip" title="Progressive enhancement">
            Because actions use standard HTML form elements, they work even without JavaScript. React Router then enhances them with client-side navigation when JS is available.
          </Callout>
        </div>
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
          Storefront Next communicates with B2C Commerce exclusively through SCAPI (Shopper Commerce APIs). The template wraps these calls in typed helper functions in <code className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-400 font-mono text-xs">src/lib/scapi/</code>.
        </p>
        <CodeBlock code={scapiExample} language="typescript" filename="src/lib/scapi/products.ts" />
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { api: 'Shopper Products', path: 'lib/scapi/products.ts' },
            { api: 'Shopper Baskets', path: 'lib/scapi/baskets.ts' },
            { api: 'Shopper Search', path: 'lib/scapi/search.ts' },
            { api: 'Shopper Customers', path: 'lib/scapi/customers.ts' },
          ].map(({ api, path }) => (
            <div key={api} className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/50">
              <div className="text-slate-200 text-xs font-semibold mb-1">{api}</div>
              <code className="text-slate-500 text-xs font-mono">{path}</code>
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

      {/* Hands-on */}
      <section>
        <h2 className="text-xl font-bold text-slate-100 mb-6">Hands-On Exercises</h2>
        <div className="space-y-0">
          <StepCard stepKey="m3-loader" number={1} title="Add parallel data fetching to the PDP">
            <p className="text-sm">Open your product route (<code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">src/routes/product.$productId.tsx</code>). Update the loader to fetch both the product AND product recommendations in parallel using <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">Promise.all()</code>.</p>
            <Callout type="ai" title="Ask Claude Code">
              "In my product route loader, add a parallel fetch for Einstein recommendations using the product ID. Show me how to wire the data into the component."
            </Callout>
          </StepCard>
          <StepCard stepKey="m3-action" number={2} title="Add an Add to Wishlist action">
            <p className="text-sm">Create an action in your product route that saves a product to the customer's wishlist. The action should read <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">productId</code> from formData and call a SCAPI customer lists endpoint.</p>
          </StepCard>
          <StepCard stepKey="m3-scapi" number={3} title="Extend a SCAPI helper">
            <p className="text-sm">In <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">src/lib/scapi/products.ts</code>, add a new function <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">getProductsByCategory(categoryId)</code> that fetches a list of products for a category. Define a clean return type.</p>
            <Callout type="ai" title="Ask Claude Code">
              "Add a getProductsByCategory function to src/lib/scapi/products.ts. It should call the SCAPI product search endpoint filtered by category. Include TypeScript types for the response."
            </Callout>
          </StepCard>
          <StepCard stepKey="m3-custom-hook" number={4} title="Build a useRecentlyViewed hook">
            <p className="text-sm">Create <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">src/hooks/useRecentlyViewed.ts</code>. When a product page loads, it should store the product ID in localStorage. The hook should return the last 5 viewed product IDs.</p>
          </StepCard>
          <StepCard stepKey="m3-error" number={5} title="Add an ErrorBoundary to the cart route" isLast>
            <p className="text-sm">Add an <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">ErrorBoundary</code> export to your cart route. Handle the case where the basket API returns a 404 (basket expired) with a helpful message and a "Start a new cart" button.</p>
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
