import { Link } from 'react-router-dom'
import { ArrowRight, Terminal, GitBranch, Package, Code2, Cpu, Globe, Download, Wrench } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import CodeBlock from '../components/CodeBlock'
import InlineCode from '../components/InlineCode'
import Callout from '../components/Callout'

const toolPrereqs = [
  {
    icon: Cpu,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20',
    title: 'Claude Code',
    desc: 'AI coding assistant — the primary tool for accelerating your workflow in this workshop.',
    verify: 'claude --version',
    action: 'Follow the Salesforce installation guide:',
    actionLink: { label: 'sfdc.co/ClaudeCodeforSolutions', url: 'https://www.sfdc.co/ClaudeCodeforSolutions' },
  },
  {
    icon: Code2,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
    title: 'VS Code',
    desc: 'Recommended IDE. Install the Tailwind IntelliSense and ESLint extensions.',
    verify: 'code --version',
    action: 'Download from',
    actionLink: { label: 'code.visualstudio.com', url: 'https://code.visualstudio.com' },
  },
  {
    icon: Globe,
    color: 'text-sky-400',
    bg: 'bg-sky-500/10 border-sky-500/20',
    title: 'B2C Sandbox Access',
    desc: 'It is recommended that you start with a newly created, empty sandbox.',
    verify: null,
    action: '',
    actionLink: { label: 'Create One', url: 'https://www.solutionswork.space/demos/requestdemo/910c0406-8172-647c-a8ef-272adbb37a02' },
  },
  {
    icon: Download,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    title: 'Market Street Storefront Export',
    desc: 'Download the Market Street storefront site export zip — you\'ll import this into your sandbox during the workshop.',
    verify: null,
    action: 'Download the zip file from',
    actionLink: { label: 'Google Drive', url: 'https://drive.google.com/file/d/136YSJ9ylbphcsGT6B_29-Z530c_wjL2b/view?usp=sharing' },
  },
]

const devPrereqs = [
  {
    icon: Terminal,
    color: 'text-sky-400',
    bg: 'bg-sky-500/10 border-sky-500/20',
    title: 'Node.js 24+',
    desc: 'Storefront Next requires Node.js 24 or higher.',
    verify: 'node --version',
    installCmd: null,
    installText: 'First install nvm: run the command below, then reload your shell (source ~/.zshrc on Mac, source ~/.bashrc on Linux), then run:',
    installCmds: ['curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash', 'nvm install 24 && nvm use 24'],
  },
  {
    icon: Package,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20',
    title: 'pnpm',
    desc: 'The preferred package manager for Storefront Next.',
    verify: 'pnpm --version',
    installCmd: 'npm install -g pnpm',
    installText: null,
    installCmds: null,
  },
  {
    icon: GitBranch,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    title: 'Git + GitHub Account',
    desc: 'For cloning the template and deploying via GitHub Actions.',
    verify: 'git --version',
    installCmd: null,
    installText: 'Download from git-scm.com and create a GitHub account at github.com',
    installCmds: null,
  },
]

const setupCode = `# 1. Use GitHub template (creates your own repo)
# Go to: github.com/SalesforceCommerceCloud/storefront-next-template
# Click "Use this template" → "Create a new repository"

# 2. Clone your new repo
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME

# 3. Install dependencies
pnpm install

# 4. Configure environment
cp .env.default .env
# Edit .env with your B2C credentials (see below)

# 5. Start the dev server
pnpm dev
# → Opens at http://localhost:5173`

const envConfig = `# .env — B2C Commerce Credentials
PUBLIC__app__commerce__api__clientId=YOUR_CLIENT_ID
PUBLIC__app__commerce__api__organizationId=YOUR_ORG_ID
PUBLIC__app__commerce__api__shortCode=YOUR_SHORT_CODE
PUBLIC__app__commerce__api__siteId=YOUR_SITE_ID
PUBLIC__app__commerce__api__instanceType=sandbox`

const b2cToolingCode = `# Install B2C Developer Tooling CLI
npm install -g @salesforce/b2c-cli

# Or with Homebrew (Mac)
brew install SalesforceCommerceCloud/tools/b2c-cli

# Verify
b2c --help

# Add Claude Code skills (do this after Claude Code is installed)
claude plugin marketplace add SalesforceCommerceCloud/b2c-developer-tooling
claude plugin install b2c-cli
claude plugin install b2c
claude plugin install storefront-next`

const vsCodeExtensions = [
  { name: 'Tailwind CSS IntelliSense', id: 'bradlc.vscode-tailwindcss' },
  { name: 'ESLint', id: 'dbaeumer.vscode-eslint' },
  { name: 'Prettier', id: 'esbenp.prettier-vscode' },
  { name: 'TypeScript Error Lens', id: 'usernamehw.errorlens' },
  { name: 'GitLens', id: 'eamodio.gitlens' },
]

export default function PreWork() {
  return (
    <div className="space-y-12">
      <SectionHeader
        badge="Before the Workshop"
        title="Pre-Work"
        subtitle="Complete these setup steps before arriving at the workshop. Budget about 30–45 minutes. If you hit any issues, reach out in #cc-sfnext-internal-se."
        gradient="emerald"
      />

      <Callout type="info" title="Finish this before workshop day">
        The first 15 minutes of the workshop are reserved for environment validation, not setup. If you haven't completed this pre-work, you'll fall behind during the hands-on exercises.
      </Callout>

      {/* Tools — get these first */}
      <section>
        <h2 className="text-xl font-bold text-slate-100 mb-2 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-bold">1</span>
          Get Your Tools Ready
        </h2>
        <p className="text-slate-400 text-sm mb-4">
          These require manual setup — get them installed and downloaded first.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {toolPrereqs.map(({ icon: Icon, color, bg, title, desc, verify, action, actionLink }) => (
            <div key={title} className={`rounded-xl border p-4 ${bg}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${bg}`}>
                  <Icon size={20} className={color} />
                </div>
                <h3 className="font-semibold text-slate-100 text-sm">{title}</h3>
              </div>
              <p className="text-slate-400 text-xs mb-3">{desc}</p>
              <div className="space-y-2 text-xs">
                {verify && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-slate-500">Verify:</span>
                    <InlineCode code={verify} />
                  </div>
                )}
                <div>
                  <span className="text-slate-400">{action} </span>
                  {actionLink && (
                    <a
                      href={actionLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-400 hover:underline"
                    >
                      {actionLink.label}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dev environment prereqs */}
      <section>
        <h2 className="text-xl font-bold text-slate-100 mb-2 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-bold">2</span>
          Install Dev Environment
        </h2>
        <p className="text-slate-400 text-sm mb-4">
          Node.js, pnpm, and Git are needed to build and run the storefront locally.
        </p>

        <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-5 mb-6">
          <p className="text-emerald-300 font-semibold text-sm mb-1">Fast path — run this script</p>
          <p className="text-slate-400 text-xs mb-3">This installs Node.js, pnpm, and Git automatically. Run it first, then use the manual steps below for anything it misses.</p>
          <CodeBlock
            language="bash"
            code={`bash <(curl -fsSL https://raw.githubusercontent.com/lukejohnson-sf/fast-setup/main/setup.sh)`}
          />
        </div>

        <div className="rounded-xl border p-4 bg-amber-500/10 border-amber-500/20 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-amber-500/10 border-amber-500/20">
              <Wrench size={20} className="text-amber-400" />
            </div>
            <h3 className="font-semibold text-slate-100 text-sm">B2C Developer Toolkit CLI</h3>
          </div>
          <p className="text-slate-400 text-xs mb-3">
            The B2C CLI powers sandbox management, code deployment, and MRT operations. Install it globally with npm.
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-slate-500">Install:</span>
              <InlineCode code="npm install -g @salesforce/b2c-cli" />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-slate-500">Verify:</span>
              <InlineCode code="b2c --version" />
            </div>
          </div>
        </div>

        <p className="text-slate-500 text-xs mb-4">Or install each tool manually:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {devPrereqs.map(({ icon: Icon, color, bg, title, desc, verify, installCmd, installText, installCmds }: any) => (
            <div key={title} className={`rounded-xl border p-4 ${bg}`}>
              <div className="flex items-start gap-3 mb-3">
                <Icon size={18} className={`${color} mt-0.5 flex-shrink-0`} />
                <div>
                  <h3 className="font-semibold text-slate-100 text-sm">{title}</h3>
                  <p className="text-slate-400 text-xs mt-0.5">{desc}</p>
                </div>
              </div>
              <div className="space-y-2 text-xs">
                {verify && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-slate-500">Verify:</span>
                    <InlineCode code={verify} />
                  </div>
                )}
                <div>
                  <span className="text-slate-500">Install: </span>
                  {installCmd && <InlineCode code={installCmd} />}
                  {installText && <span className="text-slate-400">{installText} </span>}
                  {installCmds && (
                    <div className="flex flex-col gap-1.5 mt-1.5">
                      {installCmds.map((cmd: string) => (
                        <InlineCode key={cmd} code={cmd} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Template Setup */}
      <section>
        <h2 className="text-xl font-bold text-slate-100 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-bold">3</span>
          Set Up Your Storefront Next Project
        </h2>
        <p className="text-slate-400 text-sm mb-4">
          Use the official GitHub template to create your own repository. This gives you a clean git history to push to and full ownership of the code.
        </p>
        <CodeBlock code={setupCode} language="bash" filename="Terminal" />
      </section>

      {/* Env Config */}
      <section>
        <h2 className="text-xl font-bold text-slate-100 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-bold">4</span>
          Configure Your Environment
        </h2>
        <p className="text-slate-400 text-sm mb-4">
          Your <InlineCode code=".env" color="sky" /> file connects the storefront to your B2C Commerce sandbox. You'll get the values from your sandbox's Account Manager.
        </p>
        <CodeBlock code={envConfig} language="bash" filename=".env" />
        <div className="mt-4">
          <Callout type="warning" title="Never commit .env">
            The <code className="bg-slate-800 px-1 py-0.5 rounded font-mono text-xs">.env</code> file contains API credentials. It's in <code className="bg-slate-800 px-1 py-0.5 rounded font-mono text-xs">.gitignore</code> by default — keep it that way. Never push credentials to GitHub.
          </Callout>
        </div>
      </section>

      {/* B2C Tooling */}
      <section>
        <h2 className="text-xl font-bold text-slate-100 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-bold">5</span>
          Install B2C Developer Tooling
        </h2>
        <p className="text-slate-400 text-sm mb-4">
          The B2C CLI and Claude Code skills are what supercharge your workflow. The skills teach Claude Code how to deploy, manage sandboxes, and work with SCAPI — no documentation lookup needed.
        </p>
        <CodeBlock code={b2cToolingCode} language="bash" filename="Terminal" />
        <div className="mt-4">
          <Callout type="ai" title="Claude Code Skills">
            Once installed, Claude Code gains deep B2C Commerce knowledge: cartridge deployment, sandbox management, SCAPI operations, and Storefront Next-specific patterns including routing, data fetching, auth, i18n, and MRT deployment. You can ask it things like "deploy my code to my ODS" or "show me how to add a custom SCAPI endpoint."
          </Callout>
        </div>
      </section>

      {/* VS Code Extensions */}
      <section>
        <h2 className="text-xl font-bold text-slate-100 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-bold">6</span>
          Install VS Code Extensions
        </h2>
        <p className="text-slate-400 text-sm mb-4">
          These extensions make the Storefront Next development experience significantly better — especially Tailwind IntelliSense which gives you autocomplete for every CSS utility.
        </p>
        <p className="text-slate-500 text-xs mb-3">Install via the Extensions panel in VS Code, or run each command below:</p>
        <div className="space-y-2">
          {vsCodeExtensions.map(({ name, id }) => (
            <div key={id} className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-700/50">
              <Code2 size={14} className="text-slate-500 flex-shrink-0" />
              <span className="text-slate-300 text-xs font-medium flex-shrink-0">{name}</span>
              <span className="text-slate-600 text-xs hidden md:inline">—</span>
              <div className="flex-1 min-w-0">
                <InlineCode code={`code --install-extension ${id}`} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Readiness check */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-950/40 to-sky-950/40 border border-emerald-800/30 p-6">
        <h3 className="font-bold text-emerald-300 text-lg mb-2">Ready? Run This Final Check</h3>
        <p className="text-slate-400 text-sm mb-4">Before the workshop, confirm everything works end-to-end:</p>
        <CodeBlock
          language="bash"
          filename="Terminal"
          code={`# All of these should print version numbers
node --version    # v24.x.x
pnpm --version    # 9.x.x or higher
git --version     # git version 2.x.x
claude --version  # x.x.x
b2c --version     # x.x.x

# Your storefront should load
cd YOUR_REPO_NAME && pnpm dev
# → Visit http://localhost:5173 and see the storefront`}
        />
        <div className="mt-4">
          <Link
            to="/env-check"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-colors"
          >
            Validate Environment at Workshop <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}
