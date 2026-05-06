import type { ReactNode } from 'react'

interface SectionHeaderProps {
  badge?: string
  title: string
  subtitle?: string
  gradient?: 'sky' | 'violet' | 'emerald' | 'amber'
  children?: ReactNode
}

const gradients = {
  sky: 'from-sky-400 to-blue-500',
  violet: 'from-violet-400 to-purple-500',
  emerald: 'from-emerald-400 to-teal-500',
  amber: 'from-amber-400 to-orange-500',
}

export default function SectionHeader({ badge, title, subtitle, gradient = 'sky', children }: SectionHeaderProps) {
  return (
    <div className="mb-10">
      {badge && (
        <div className="inline-flex items-center gap-2 mb-3">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${gradients[gradient]} text-slate-950`}>
            {badge}
          </span>
        </div>
      )}
      <h1 className={`text-4xl font-bold mb-3 bg-gradient-to-r ${gradients[gradient]} bg-clip-text text-transparent`}>
        {title}
      </h1>
      {subtitle && (
        <p className="text-slate-400 text-lg leading-relaxed max-w-3xl">{subtitle}</p>
      )}
      {children}
    </div>
  )
}
