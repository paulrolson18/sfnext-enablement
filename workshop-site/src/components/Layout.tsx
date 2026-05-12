import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import {
  LayoutDashboard,
  ClipboardCheck,
  ShieldCheck,
  Layers,
  Paintbrush,
  ServerCog,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Menu,
  Play,
  FileText,
  Settings,
} from 'lucide-react'
import { useProgress } from '../context/ProgressContext'

const navItems = [
  { path: '/', label: 'Overview', icon: LayoutDashboard, exact: true },
  { path: '/pre-work', label: 'Pre-Work', icon: ClipboardCheck },
  { path: '/env-check', label: 'Env Check', icon: ShieldCheck },
  { path: '/setup', label: 'Setup', icon: Settings },
  { label: '— Workshop —', divider: true },
  { path: '/module/1', label: 'Module 1: Architecture', icon: Layers, number: '1' },
  { path: '/module/2', label: 'Module 2: Frontend', icon: Paintbrush, number: '2' },
  { path: '/module/3', label: 'Module 3: Backend', icon: ServerCog, number: '3' },
  { path: '/module/4', label: 'Module 4: AI Dev', icon: Sparkles, number: '4' },
  { label: '— Resources —', divider: true },
  { path: '/demo-playbook', label: 'Demo Playbook', icon: Play },
  { path: '/cheat-sheet', label: 'Quick Reference', icon: FileText },
]

const moduleStepCounts: Record<string, string[]> = {
  '/env-check': ['env-node', 'env-pnpm', 'env-git', 'env-vscode', 'env-claude'],
  '/setup': ['setup-bm-login', 'setup-admin', 'setup-import-export', 'setup-upload', 'setup-import', 'setup-import-done', 'setup-storefronts', 'setup-add-new', 'setup-configure', 'setup-complete', 'setup-gh-auth', 'setup-wait-deploy', 'setup-claude-repo', 'setup-claude-env'],
  '/module/1': ['m1-react', 'm1-rr7', 'm1-tailwind', 'm1-ssr', 'm1-mrt', 'm1-cwv'],
  '/module/2': ['m2-theme', 'm2-hero', 'm2-page-designer-hero', 'm2-product-tile', 'm2-plp', 'm2-deploy', 'm2-pdp'],
  '/module/3': ['m3-loader', 'm3-action', 'm3-scapi', 'm3-custom-hook', 'm3-error', 'm3-deploy'],
  '/module/4': ['m4-setup', 'm4-prompt1', 'm4-prompt2', 'm4-prompt3', 'm4-figma'],
}

function NavProgress({ path }: { path: string }) {
  const { isComplete } = useProgress()
  const steps = moduleStepCounts[path]
  if (!steps) return null
  const done = steps.filter(s => isComplete(s)).length
  const pct = Math.round((done / steps.length) * 100)
  return (
    <div className="mt-1.5 w-full">
      <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-sky-500 to-sky-400 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[10px] text-slate-500 mt-0.5 block">{done}/{steps.length} complete</span>
    </div>
  )
}

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const sidebar = (
    <nav className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-slate-800">
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-sky-500/20">
            <span className="text-white font-bold text-sm">SN</span>
          </div>
          {!collapsed && (
            <div>
              <div className="text-slate-100 font-semibold text-sm leading-tight">Storefront Next</div>
              <div className="text-slate-500 text-xs">SE Workshop</div>
            </div>
          )}
        </div>
      </div>

      {/* Nav links */}
      <div className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {navItems.map((item, i) => {
          if ('divider' in item && item.divider) {
            return collapsed ? (
              <div key={i} className="my-2 border-t border-slate-800" />
            ) : (
              <div key={i} className="px-2 py-2 text-xs text-slate-600 font-medium uppercase tracking-wider">
                {item.label}
              </div>
            )
          }

          const Icon = item.icon!
          const isActive = item.exact
            ? location.pathname === item.path
            : location.pathname === item.path || location.pathname.startsWith(item.path + '/')

          return (
            <NavLink
              key={item.path}
              to={item.path!}
              onClick={() => setMobileOpen(false)}
              className={`nav-item flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full ${
                isActive
                  ? 'bg-sky-500/15 text-sky-400 border border-sky-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              } ${collapsed ? 'justify-center' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={16} className="flex-shrink-0" />
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <div className="truncate">{item.label}</div>
                  {isActive && <NavProgress path={item.path!} />}
                </div>
              )}
            </NavLink>
          )
        })}
      </div>

      {/* Collapse toggle */}
      <div className="p-3 border-t border-slate-800">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`w-full flex items-center gap-2 px-3 py-2 text-slate-500 hover:text-slate-300 text-sm rounded-lg hover:bg-slate-800 transition-colors ${collapsed ? 'justify-center' : ''}`}
        >
          {collapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} /><span>Collapse</span></>}
        </button>
      </div>
    </nav>
  )

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      {/* Desktop sidebar */}
      <aside className={`hidden md:flex flex-col flex-shrink-0 border-r border-slate-800 bg-slate-950/90 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
        {sidebar}
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-64 bg-slate-950 border-r border-slate-800 h-full">
            {sidebar}
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile topbar */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-slate-800 bg-slate-950">
          <button
            onClick={() => setMobileOpen(true)}
            className="text-slate-400 hover:text-slate-200"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">SN</span>
            </div>
            <span className="text-slate-300 font-medium text-sm">Storefront Next Workshop</span>
          </div>
        </div>

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-6 py-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
