import type { ReactNode } from 'react'
import { Lightbulb, AlertTriangle, Info, Zap } from 'lucide-react'

type CalloutType = 'tip' | 'warning' | 'info' | 'ai'

interface CalloutProps {
  type: CalloutType
  title?: string
  children: ReactNode
}

const configs = {
  tip: {
    icon: Lightbulb,
    border: 'border-amber-500/30',
    bg: 'bg-amber-950/20',
    iconColor: 'text-amber-400',
    titleColor: 'text-amber-300',
    defaultTitle: 'Pro Tip',
  },
  warning: {
    icon: AlertTriangle,
    border: 'border-orange-500/30',
    bg: 'bg-orange-950/20',
    iconColor: 'text-orange-400',
    titleColor: 'text-orange-300',
    defaultTitle: 'Watch Out',
  },
  info: {
    icon: Info,
    border: 'border-sky-500/30',
    bg: 'bg-sky-950/20',
    iconColor: 'text-sky-400',
    titleColor: 'text-sky-300',
    defaultTitle: 'Note',
  },
  ai: {
    icon: Zap,
    border: 'border-violet-500/30',
    bg: 'bg-violet-950/20',
    iconColor: 'text-violet-400',
    titleColor: 'text-violet-300',
    defaultTitle: 'Claude Code',
  },
}

export default function Callout({ type, title, children }: CalloutProps) {
  const cfg = configs[type]
  const Icon = cfg.icon

  return (
    <div className={`rounded-xl border ${cfg.border} ${cfg.bg} p-4 flex gap-3`}>
      <Icon size={18} className={`${cfg.iconColor} flex-shrink-0 mt-0.5`} />
      <div>
        <p className={`font-semibold text-sm ${cfg.titleColor} mb-1`}>
          {title || cfg.defaultTitle}
        </p>
        <div className="text-slate-300 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  )
}
