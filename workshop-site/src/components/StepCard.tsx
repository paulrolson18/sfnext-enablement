import type { ReactNode } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { useProgress } from '../context/ProgressContext'

interface StepCardProps {
  stepKey: string
  number: number | string
  title: string
  children: ReactNode
  isLast?: boolean
}

export default function StepCard({ stepKey, number, title, children, isLast }: StepCardProps) {
  const { isComplete, toggleStep } = useProgress()
  const done = isComplete(stepKey)

  return (
    <div className={`relative flex gap-4 ${!isLast ? 'pb-8' : ''}`}>
      {/* Connector line */}
      {!isLast && (
        <div className="absolute left-[1.125rem] top-10 bottom-0 w-0.5 bg-gradient-to-b from-slate-600 to-transparent" />
      )}

      {/* Step number / check */}
      <button
        onClick={() => toggleStep(stepKey)}
        className="flex-shrink-0 mt-0.5 z-10"
        title={done ? 'Mark incomplete' : 'Mark complete'}
      >
        {done ? (
          <CheckCircle2 size={36} className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]" />
        ) : (
          <div className="w-9 h-9 rounded-full border-2 border-slate-600 bg-slate-900 flex items-center justify-center text-slate-400 text-sm font-bold hover:border-sky-400 hover:text-sky-400 transition-colors">
            {number}
          </div>
        )}
      </button>

      {/* Content */}
      <div className={`flex-1 min-w-0 rounded-xl border p-5 transition-all ${
        done
          ? 'bg-emerald-950/20 border-emerald-800/30'
          : 'bg-slate-900/60 border-slate-700/50 hover:border-slate-600/50'
      }`}>
        <h3 className={`font-semibold text-lg mb-3 ${done ? 'text-emerald-300' : 'text-slate-100'}`}>
          {title}
        </h3>
        <div className="text-slate-300 space-y-2">
          {children}
        </div>
      </div>
    </div>
  )
}
