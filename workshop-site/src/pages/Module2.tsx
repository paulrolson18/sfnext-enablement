import { Link } from 'react-router-dom'
import { ArrowRight, Palette, Layout, Image, Star, Smartphone } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import CodeBlock from '../components/CodeBlock'
import Callout from '../components/Callout'
import StepCard from '../components/StepCard'

const beforeHero = `<!-- Old SFRA approach (ISML) -->
<div class="hero-banner">
  <img src="\${pdict.heroImage}" alt="Hero" />
  <div class="hero-text">
    <h1>\${pdict.heroTitle}</h1>
    <a href="\${pdict.heroLink}" class="btn btn-primary">Shop Now</a>
  </div>
</div>`

const afterHero = `// src/components/HeroBanner.tsx
interface HeroBannerProps {
  title: string
  subtitle: string
  ctaText: string
  ctaHref: string
  imageSrc: string
  theme?: 'light' | 'dark'
}

export function HeroBanner({
  title, subtitle, ctaText, ctaHref, imageSrc, theme = 'dark'
}: HeroBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl min-h-[500px] flex items-end">
      {/* Background image with overlay */}
      <img
        src={imageSrc}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 p-8 md:p-12">
        <h1 className={
          \`text-4xl md:text-5xl font-bold mb-3 leading-tight \${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }\`
        }>
          {title}
        </h1>
        <p className="text-slate-200 text-lg mb-6 max-w-md">{subtitle}</p>
        <a
          href={ctaHref}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                     bg-white text-slate-900 font-semibold hover:bg-slate-100
                     transition-colors shadow-lg"
        >
          {ctaText} →
        </a>
      </div>
    </div>
  )
}`

const pageDesignerHero = `// src/components/HeroBanner.tsx — Enhanced for Page Designer
interface HeroBannerProps {
  title: string
  subtitle: string
  ctaText: string
  ctaHref: string
  imageSrc: string
  theme?: 'light' | 'dark'
  // ↓ New props for Page Designer control
  titleColor?: string        // e.g. '#c9a84c', 'white', 'var(--brand-primary)'
  titleAlignment?: 'left' | 'center' | 'right'
}

export function HeroBanner({
  title, subtitle, ctaText, ctaHref, imageSrc, theme = 'dark',
  titleColor,
  titleAlignment = 'left',
}: HeroBannerProps) {
  // Map alignment to Tailwind classes
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }

  return (
    <div className="relative overflow-hidden rounded-2xl min-h-[500px] flex items-end">
      <img src={imageSrc} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <div className={\`relative z-10 p-8 md:p-12 flex flex-col w-full \${alignmentClasses[titleAlignment]}\`}>
        <h1
          className="text-4xl md:text-5xl font-bold mb-3 leading-tight"
          style={titleColor ? { color: titleColor } : undefined}
        >
          {title}
        </h1>
        <p className={\`text-slate-200 text-lg mb-6 \${titleAlignment === 'center' ? 'max-w-lg mx-auto' : 'max-w-md'}\`}>
          {subtitle}
        </p>
        <a href={ctaHref}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-900 font-semibold hover:bg-slate-100 transition-colors shadow-lg">
          {ctaText} →
        </a>
      </div>
    </div>
  )
}

// Page Designer metadata — this tells BM what the merchandiser can configure
// The MCP tool sfnext_add_page_designer_decorator generates this automatically
@PageType({ id: 'hero-banner', label: 'Hero Banner' })
@RegionDefinition({
  attributes: [
    { id: 'titleColor', type: 'color', label: 'Title Color', default: '#ffffff' },
    { id: 'titleAlignment', type: 'enum', label: 'Title Alignment',
      values: ['left', 'center', 'right'], default: 'left' },
  ]
})`

const themeTokens = `// tailwind.config.js — Brand Customization
/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        // Replace with your brand palette
        primary: {
          50:  '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',  // ← Main brand color
          600: '#0284c7',  // ← Hover state
          900: '#0c4a6e',
        },
        // Odyssey-inspired: warm neutrals + gold accent
        accent: {
          DEFAULT: '#c9a84c',  // ← Gold accent
          light: '#f0d78a',
          dark: '#8a6d1c',
        }
      },
      fontFamily: {
        // Use custom brand fonts
        sans: ['Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      borderRadius: {
        'product': '12px',  // ← Product card radius
        'btn': '9999px',    // ← Pill buttons
      }
    },
  },
}`

const productCardBefore = `// Default product card (simplified)
export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded p-4">
      <img src={product.image} alt={product.name} />
      <p>{product.name}</p>
      <p>{product.price}</p>
    </div>
  )
}`

const productCardAfter = `// Enhanced product card — Odyssey style
export function ProductCard({ product }: { product: Product }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group relative rounded-[var(--product-radius,12px)]
                 overflow-hidden bg-white border border-slate-100
                 hover:shadow-xl hover:shadow-slate-200/50
                 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image with hover swap */}
      <div className="relative aspect-[3/4] overflow-hidden bg-slate-50">
        <img
          src={isHovered ? product.hoverImage ?? product.image : product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform
                     duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        {product.isNew && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-slate-900
                           text-white text-xs font-semibold rounded">
            NEW
          </span>
        )}
        {product.discount && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-red-500
                           text-white text-xs font-semibold rounded">
            -{product.discount}%
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80
                     backdrop-blur-sm flex items-center justify-center
                     opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart
            size={16}
            className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-slate-600'}
          />
        </button>

        {/* Quick Add — slides up on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-3
                        translate-y-full group-hover:translate-y-0
                        transition-transform duration-300">
          <button className="w-full py-2.5 bg-slate-900 text-white
                             text-sm font-semibold rounded-lg
                             hover:bg-slate-700 transition-colors">
            Quick Add
          </button>
        </div>
      </div>

      {/* Product info */}
      <div className="p-4">
        <p className="text-xs text-slate-400 mb-0.5">{product.brand}</p>
        <h3 className="font-medium text-slate-900 text-sm leading-snug
                       line-clamp-2 mb-2">{product.name}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {product.salePrice ? (
              <>
                <span className="font-bold text-red-600">{product.salePrice}</span>
                <span className="text-slate-400 text-sm line-through">{product.price}</span>
              </>
            ) : (
              <span className="font-bold text-slate-900">{product.price}</span>
            )}
          </div>
          {product.rating && (
            <div className="flex items-center gap-1">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              <span className="text-xs text-slate-500">{product.rating}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}`

const plpLayout = `// src/routes/category.$categoryId.tsx
// Customizing the Product Listing Page layout

export default function CategoryPage() {
  const { products, category } = useLoaderData<typeof loader>()

  return (
    <div>
      {/* Hero banner at top of category */}
      <CategoryHero category={category} />

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* Sidebar filters */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <FilterPanel />
        </aside>

        {/* Product grid — change column count here */}
        <div className="flex-1">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <Pagination />
        </div>
      </div>
    </div>
  )
}`

export default function Module2() {
  return (
    <div className="space-y-12">
      <SectionHeader
        badge="Module 2 · 45 min"
        title="Frontend Modifications"
        subtitle="Learn how to customize the visual experience — from global brand tokens to individual component behavior. We'll use the Odyssey storefront as our reference for what great looks like."
        gradient="violet"
      />

      <Callout type="info" title="Reference Storefront">
        We'll model our customizations on the <a href="https://sfcc-odyssey-production.mobify-storefront.com/global/en-GB/" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">Odyssey storefront</a> — a high-quality Storefront Next implementation. Open it in a separate browser tab.
      </Callout>

      {/* Section 1: Tailwind Tokens */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-violet-500/15 border border-violet-500/30 flex items-center justify-center">
            <Palette size={15} className="text-violet-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Part 1 — Brand Tokens</h2>
          <span className="text-slate-500 text-sm">10 min</span>
        </div>
        <p className="text-slate-400 text-sm mb-5 leading-relaxed">
          The fastest way to make a storefront look like a specific brand is to update the design tokens in <code className="bg-slate-800 px-1.5 py-0.5 rounded text-violet-400 font-mono text-xs">tailwind.config.js</code>. Every color, font, and border radius across the entire site updates instantly.
        </p>
        <CodeBlock code={themeTokens} language="javascript" filename="tailwind.config.js" />
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { label: 'Primary Color', value: 'colors.primary.500', impact: 'Buttons, links, highlights' },
            { label: 'Accent Color', value: 'colors.accent.DEFAULT', impact: 'Badges, promotions, sale prices' },
            { label: 'Font Family', value: 'fontFamily.sans', impact: 'All body text site-wide' },
          ].map(({ label, value, impact }) => (
            <div key={label} className="p-3 rounded-lg bg-violet-950/20 border border-violet-500/20">
              <div className="text-violet-300 font-semibold text-sm mb-1">{label}</div>
              <code className="text-xs text-slate-400 font-mono">{value}</code>
              <div className="text-slate-500 text-xs mt-1">{impact}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Hero Banner */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-violet-500/15 border border-violet-500/30 flex items-center justify-center">
            <Image size={15} className="text-violet-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Part 2 — Hero Banner Component</h2>
          <span className="text-slate-500 text-sm">10 min</span>
        </div>
        <p className="text-slate-400 text-sm mb-4 leading-relaxed">
          The hero banner is the first thing shoppers see. Let's look at how ISML's approach maps to a React component, then build a richer version with gradient overlays and a strong CTA.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-slate-500 text-xs font-medium mb-2 uppercase tracking-wider">SFRA / ISML (before)</p>
            <CodeBlock code={beforeHero} language="html" />
          </div>
          <div>
            <p className="text-sky-400 text-xs font-medium mb-2 uppercase tracking-wider">Storefront Next (after)</p>
            <CodeBlock code={afterHero} language="typescript" filename="src/components/HeroBanner.tsx" />
          </div>
        </div>

        <Callout type="tip" title="Key difference">
          In React, the hero banner is a reusable component with typed props. The same <code>HeroBanner</code> component can be used on the homepage, category pages, and landing pages — each with different images and copy. No copy-paste of templates needed.
        </Callout>
      </section>

      {/* Section 3: Product Card */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-violet-500/15 border border-violet-500/30 flex items-center justify-center">
            <Star size={15} className="text-violet-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Part 3 — Product Card Enhancement</h2>
          <span className="text-slate-500 text-sm">15 min</span>
        </div>
        <p className="text-slate-400 text-sm mb-4 leading-relaxed">
          Product cards drive conversion. The Odyssey store uses hover image swaps, slide-up Quick Add, wishlist toggling, and sale price display. Let's add all of that.
        </p>

        <div className="mb-4">
          <p className="text-slate-500 text-xs font-medium mb-2 uppercase tracking-wider">Before — bare minimum</p>
          <CodeBlock code={productCardBefore} language="typescript" />
        </div>
        <div>
          <p className="text-sky-400 text-xs font-medium mb-2 uppercase tracking-wider">After — Odyssey-quality card</p>
          <CodeBlock code={productCardAfter} language="typescript" filename="src/components/ProductCard.tsx" />
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { feature: 'Hover image swap', how: 'onMouseEnter state toggle' },
            { feature: 'Scale on hover', how: 'group-hover:scale-105 + transition' },
            { feature: 'Quick Add button', how: 'translate-y + group-hover' },
            { feature: 'Sale price', how: 'Conditional rendering + line-through' },
          ].map(({ feature, how }) => (
            <div key={feature} className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/50 text-center">
              <div className="text-slate-200 text-xs font-semibold mb-1">{feature}</div>
              <div className="text-slate-500 text-xs">{how}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: PLP */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-violet-500/15 border border-violet-500/30 flex items-center justify-center">
            <Layout size={15} className="text-violet-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Part 4 — PLP Layout</h2>
          <span className="text-slate-500 text-sm">10 min</span>
        </div>
        <p className="text-slate-400 text-sm mb-4 leading-relaxed">
          The Product Listing Page (category page) layout is controlled in a single route file. Changing from 3 columns to 4, adding a sidebar, or moving filters all happens here.
        </p>
        <CodeBlock code={plpLayout} language="typescript" filename="src/routes/category.$categoryId.tsx" />
        <div className="mt-4 space-y-3">
          <Callout type="tip" title="Responsive grid in one line">
            <code className="bg-slate-800 px-1.5 py-0.5 rounded text-violet-300 font-mono text-xs">grid-cols-2 lg:grid-cols-3 xl:grid-cols-4</code> — this single Tailwind class gives you 2 columns on mobile, 3 on desktop, 4 on large screens. No media query files to manage.
          </Callout>
        </div>

        {/* Mobile-First Design */}
        <div className="mt-6 p-4 rounded-xl bg-violet-950/15 border border-violet-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Smartphone size={15} className="text-violet-400" />
            <h4 className="text-slate-200 font-semibold text-sm">Mobile-First by Default</h4>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed mb-3">
            Over 70% of commerce traffic is mobile. Tailwind is inherently mobile-first — all styles apply to mobile by default, and breakpoint prefixes (<code className="bg-slate-800 px-1 py-0.5 rounded text-violet-300 font-mono text-xs">md:</code>, <code className="bg-slate-800 px-1 py-0.5 rounded text-violet-300 font-mono text-xs">lg:</code>) add desktop enhancements. This means the mobile experience is always the baseline, never an afterthought.
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { bp: 'Default', width: '< 768px', desc: 'Mobile — base styles apply' },
              { bp: 'md:', width: '≥ 768px', desc: 'Tablet — add columns, padding' },
              { bp: 'lg:', width: '≥ 1024px', desc: 'Desktop — full layout, sidebar' },
            ].map(({ bp, width, desc }) => (
              <div key={bp} className="p-2 rounded-lg bg-slate-800/30 border border-slate-700/30 text-center">
                <code className="text-violet-400 font-mono text-xs font-bold">{bp}</code>
                <div className="text-slate-500 text-xs">{width}</div>
                <div className="text-slate-400 text-xs mt-0.5">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Page Designer */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-violet-500/15 border border-violet-500/30 flex items-center justify-center">
            <Layout size={15} className="text-violet-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Page Designer Integration</h2>
          <span className="text-slate-500 text-sm">Awareness</span>
        </div>
        <p className="text-slate-400 text-sm mb-4 leading-relaxed">
          The template includes a Page Designer integration that enables merchandisers to manage content through the familiar Business Manager interface. Developers define page types and regions using TypeScript decorators — the build process generates metadata that Business Manager reads.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { title: 'Decorator-based', detail: 'Routes are annotated with @PageType and @RegionDefinition metadata' },
            { title: 'Auto-generated config', detail: 'Build process creates JSON metadata for Business Manager' },
            { title: 'Live preview', detail: 'BM renders preview iframes using the storefront\'s actual routes' },
          ].map(({ title, detail }) => (
            <div key={title} className="p-3 rounded-lg bg-violet-950/20 border border-violet-500/20">
              <div className="text-violet-300 font-semibold text-sm mb-1">{title}</div>
              <div className="text-slate-400 text-xs">{detail}</div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <p className="text-slate-400 text-sm mb-4 leading-relaxed">
            In practice, this means adding props to your components that a merchandiser can control — like title color, text alignment, or layout variants. The component code stays clean; the metadata decorators tell Business Manager what's configurable.
          </p>
          <CodeBlock code={pageDesignerHero} language="typescript" filename="src/components/HeroBanner.tsx — Page Designer Enhanced" />
          <div className="mt-4">
            <Callout type="info" title="For customer conversations">
              If a merchandiser asks "can I change the page without a developer?" — the answer is yes. Page Designer lets them configure pages, arrange components, and manage content regions through Business Manager, while the storefront renders those components as React. The hero banner above is a concrete example — a merchandiser can change the title color and alignment without touching code.
            </Callout>
          </div>
        </div>
      </section>

      <Callout type="tip" title="SE Talking Points">
        <ul className="space-y-1 text-sm">
          <li>• "A brand refresh takes hours, not weeks. Change one config file and the entire storefront updates."</li>
          <li>• "Components are reusable — the same hero banner works on the homepage, category page, and campaign landing pages with different content."</li>
          <li>• "Every visual element can be inspected and changed without leaving the component file — no hunting through CSS files."</li>
          <li>• "The template ships with Storybook for component-driven development — designers and developers share a common vocabulary."</li>
        </ul>
      </Callout>

      {/* Hands-on steps */}
      <section>
        <h2 className="text-xl font-bold text-slate-100 mb-6">Hands-On Exercises</h2>
        <div className="space-y-0">
          <StepCard stepKey="m2-theme" number={1} title="Update brand colors">
            <p className="text-sm">In <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">tailwind.config.js</code>, add a custom primary color using your favorite brand's hex code. Save and watch the entire site update in real time.</p>
            <Callout type="ai" title="Ask Claude Code">
              "Look at my tailwind.config.js and update the color palette to match an upscale fashion brand — warm neutrals, gold accent, clean typography"
            </Callout>
          </StepCard>
          <StepCard stepKey="m2-hero" number={2} title="Modify the homepage hero">
            <p className="text-sm">Find the hero banner in your homepage route (<code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">src/routes/_index.tsx</code>). Update the gradient overlay color and CTA button style to match your new brand colors.</p>
          </StepCard>
          <StepCard stepKey="m2-page-designer-hero" number={3} title="Enhance HeroBanner for Page Designer">
            <p className="text-sm">
              Open <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">src/components/HeroBanner.tsx</code>.
              Add two new props to <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">HeroBannerProps</code>:{' '}
              <code className="bg-slate-800 px-1.5 py-0.5 rounded text-violet-400 font-mono text-xs">titleColor</code> (an optional string for any CSS color) and{' '}
              <code className="bg-slate-800 px-1.5 py-0.5 rounded text-violet-400 font-mono text-xs">titleAlignment</code> (left, center, or right).
              Update the component to apply these props — use an inline <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">style</code> for the color
              and map the alignment to Tailwind classes. Test by passing different values from the homepage route.
            </p>
            <Callout type="ai" title="Ask Claude Code">
              "In my HeroBanner component, add a titleColor prop (optional string) and a titleAlignment prop ('left' | 'center' | 'right'). Apply the color as an inline style on the h1 and map alignment to Tailwind text-left/center/right classes. Update the content wrapper to align child elements accordingly."
            </Callout>
            <Callout type="tip" title="Why this matters for Page Designer">
              These are exactly the kind of props a merchandiser controls through Business Manager. When you add the Page Designer decorators later, each prop becomes a configurable field in the BM editing interface — no code changes needed for content updates.
            </Callout>
          </StepCard>
          <StepCard stepKey="m2-product-card" number={4} title="Add Quick Add to product cards">
            <p className="text-sm">Find <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">src/components/ProductCard.tsx</code>. Add a slide-up Quick Add button that appears on hover using the pattern shown above.</p>
            <Callout type="ai" title="Ask Claude Code">
              "In my ProductCard component, add a Quick Add button that slides up from the bottom on hover. Use Tailwind group-hover and translate-y transitions."
            </Callout>
          </StepCard>
          <StepCard stepKey="m2-plp" number={5} title="Change the PLP grid layout">
            <p className="text-sm">Find the product grid in your category route. Change it from 3 columns to 4 columns on large screens. Add a visible count ("553 products") above the grid.</p>
          </StepCard>
          <StepCard stepKey="m2-deploy" number={6} title="Deploy & verify your changes">
            <p className="text-sm">
              Let's push your frontend changes to Managed Runtime so you can see them live before the break.
              Run the deployment command from your project root, then open the storefront URL to verify your brand colors, hero updates, and Page Designer enhancements are live.
            </p>
            <div className="mt-3 space-y-2">
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/50">
                <code className="text-emerald-400 font-mono text-xs">pnpm sfnext push</code>
                <span className="text-slate-500 text-xs ml-2">— deploys to your Managed Runtime environment</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/50">
                <code className="text-emerald-400 font-mono text-xs">b2c mrt tail-logs</code>
                <span className="text-slate-500 text-xs ml-2">— watch deployment progress and catch errors</span>
              </div>
            </div>
            <Callout type="tip" title="What to verify">
              Open your storefront URL and check: (1) brand colors updated globally, (2) hero banner reflects your changes, (3) product cards have the hover interactions you added. This is the same deploy workflow you'd demo to a customer.
            </Callout>
          </StepCard>
          <StepCard stepKey="m2-pdp" number={7} title="Challenge: Add a badge system" isLast>
            <p className="text-sm">Add "NEW" and "SALE" badges to product cards. A product should show "NEW" if <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">product.isNew</code> is true, and show a discount percentage badge if the sale price differs from list price.</p>
            <Callout type="ai" title="Ask Claude Code">
              "Add badge overlays to my ProductCard component — a 'NEW' badge for new arrivals and a discount percentage badge when salePrice exists. Position them in the top-left corner of the image."
            </Callout>
          </StepCard>
        </div>
      </section>

      <div className="flex justify-end">
        <Link
          to="/module/3"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-500 hover:bg-violet-400 text-slate-950 font-bold text-sm transition-colors shadow-lg shadow-violet-500/20"
        >
          Module 3: Backend Logic <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  )
}
