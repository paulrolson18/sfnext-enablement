import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
}

export default function CodeBlock({ code, language = 'typescript', filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-xl overflow-hidden border border-slate-700/50 shadow-xl">
      {filename && (
        <div className="flex items-center justify-between bg-slate-800 px-4 py-2 border-b border-slate-700/50">
          <span className="text-slate-400 text-xs font-mono">{filename}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 text-xs transition-colors"
          >
            {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
      {!filename && (
        <div className="flex justify-end bg-slate-900 px-4 pt-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 text-xs transition-colors"
          >
            {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
      <div className="code-block">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: '#0d1117',
            fontSize: '0.82rem',
            lineHeight: '1.65',
          }}
          showLineNumbers={code.split('\n').length > 5}
        >
          {code.trim()}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
