import { CheckCircle2 } from 'lucide-react'
import { useProgress } from '../context/ProgressContext'
import SectionHeader from '../components/SectionHeader'
import InlineCode from '../components/InlineCode'
import Callout from '../components/Callout'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const checks = [
  {
    key: 'env-node',
    title: 'Node.js 24+ installed',
    command: 'node --version',
    expected: 'v24.x.x or higher',
    failHelp: 'Install via nvm: nvm install 24 && nvm use 24, or download from nodejs.org',
  },
  {
    key: 'env-pnpm',
    title: 'pnpm installed',
    command: 'pnpm --version',
    expected: '9.x.x or higher',
    failHelp: 'Run: npm install -g pnpm',
  },
  {
    key: 'env-git',
    title: 'Git configured',
    command: 'git config --global user.email',
    expected: 'Your email address',
    failHelp: 'Run: git config --global user.email "you@example.com" and git config --global user.name "Your Name"',
  },
  {
    key: 'env-vscode',
    title: 'VS Code with Tailwind extension',
    command: 'code --list-extensions | grep tailwind',
    expected: 'bradlc.vscode-tailwindcss',
    failHelp: 'Run: code --install-extension bradlc.vscode-tailwindcss',
  },
  {
    key: 'env-claude',
    title: 'Claude Code installed',
    command: 'claude --version',
    expected: 'claude x.x.x',
    failHelp: 'Run: npm install -g @anthropic-ai/claude-code, then run: claude to authenticate',
  },
]

type CheckStatus = 'pass' | 'fail' | 'pending'

export default function EnvCheck() {
  const { isComplete, toggleStep } = useProgress()

  const statuses: Record<string, CheckStatus> = Object.fromEntries(
    checks.map(c => [c.key, isComplete(c.key) ? 'pass' : 'pending'])
  )

  const passCount = checks.filter(c => isComplete(c.key)).length
  const allPass = passCount === checks.length

  return (
    <div className="space-y-10">
      <SectionHeader
        badge="Workshop Start — 15 min"
        title="Environment Validation"
        subtitle="Run through each check as a group. Everyone marks their own checklist. We don't move to Module 1 until the whole room is green."
        gradient="emerald"
      />

      {/* Progress summary */}
      <div className={`rounded-2xl border p-6 transition-all ${allPass ? 'bg-emerald-950/30 border-emerald-700/40' : 'bg-slate-900/60 border-slate-700/50'}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className={`text-2xl font-bold ${allPass ? 'text-emerald-400' : 'text-slate-100'}`}>
              {passCount} / {checks.length}
            </div>
            <div className="text-slate-400 text-sm">checks passing</div>
          </div>
          {allPass && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold text-sm">
              <CheckCircle2 size={16} />
              All systems go!
            </div>
          )}
        </div>
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${(passCount / checks.length) * 100}%` }}
          />
        </div>
      </div>

      <Callout type="info" title="Facilitator note">
        Run each command live in your terminal as you go through the list. If anyone gets a failure, pause and help them before continuing — a broken environment will block them for the rest of the workshop.
      </Callout>

      {/* Checks */}
      <div className="space-y-4">
        {checks.map((check, i) => {
          const status = statuses[check.key]
          const done = status === 'pass'
          return (
            <div
              key={check.key}
              className={`rounded-xl border p-5 transition-all ${
                done
                  ? 'bg-emerald-950/20 border-emerald-700/30'
                  : 'bg-slate-900/60 border-slate-700/50'
              }`}
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggleStep(check.key)}
                  className="flex-shrink-0 mt-0.5"
                  title={done ? 'Mark as failing' : 'Mark as passing'}
                >
                  {done ? (
                    <CheckCircle2 size={28} className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]" />
                  ) : (
                    <div className="w-7 h-7 rounded-full border-2 border-slate-600 bg-slate-900 flex items-center justify-center text-slate-400 text-xs font-bold hover:border-emerald-400 hover:text-emerald-400 transition-colors">
                      {i + 1}
                    </div>
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className={`font-semibold ${done ? 'text-emerald-300' : 'text-slate-100'}`}>
                      {check.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 text-xs">Run:</span>
                      <InlineCode code={check.command} color="sky" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 text-xs">Expect:</span>
                      <InlineCode code={check.expected} color="emerald" />
                    </div>
                  </div>

                  {!done && (
                    <p className="text-slate-500 text-xs">
                      <span className="text-slate-400 font-medium">If it fails: </span>
                      {check.failHelp}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {allPass && (
        <div className="rounded-2xl bg-gradient-to-r from-emerald-950/40 to-sky-950/40 border border-emerald-700/40 p-6 text-center">
          <CheckCircle2 size={40} className="text-emerald-400 mx-auto mb-3" />
          <h3 className="font-bold text-emerald-300 text-xl mb-2">You're all set!</h3>
          <p className="text-slate-400 text-sm mb-4">Environment validated. Let's get into the architecture.</p>
          <Link
            to="/module/1"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm transition-colors"
          >
            Module 1: Architecture <ArrowRight size={15} />
          </Link>
        </div>
      )}
    </div>
  )
}
