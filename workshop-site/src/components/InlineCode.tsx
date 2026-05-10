import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface InlineCodeProps {
  code: string
  color?: 'sky' | 'emerald' | 'violet' | 'slate'
}

const colorMap = {
  sky: 'text-sky-400',
  emerald: 'text-emerald-400',
  violet: 'text-violet-400',
  slate: 'text-slate-300',
}

export default function InlineCode({ code, color = 'sky' }: InlineCodeProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <span className="inline-flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-lg pl-2 pr-1 py-0.5 font-mono text-xs group">
      <span className={colorMap[color]}>{code}</span>
      <button
        onClick={handleCopy}
        className="flex items-center justify-center w-4 h-4 rounded text-slate-600 hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0"
        title="Copy"
      >
        {copied ? <Check size={10} className="text-emerald-400" /> : <Copy size={10} />}
      </button>
    </span>
  )
}
