import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import CodeBlock from '../components/CodeBlock'
import InlineCode from '../components/InlineCode'
import Callout from '../components/Callout'
import StepCard from '../components/StepCard'

export default function Setup() {
  return (
    <div className="space-y-12">
      <SectionHeader
        badge="Setup · 15 min"
        title="Setup"
        subtitle="Import the Market Street storefront data into your sandbox, then create your Storefront Next project. Follow each step in order."
        gradient="emerald"
      />

      <Callout type="info" title="Before you begin">
        Make sure you've completed the <Link to="/pre-work" className="text-sky-400 hover:underline">Pre-Work</Link> — you'll need your B2C sandbox credentials and the Market Street site export zip file downloaded.
      </Callout>

      {/* Part 1: Site Import */}
      <section>
        <h2 className="text-xl font-bold text-slate-100 mb-6">Part 1 — Import Site Data</h2>
        <div className="space-y-0">
          <StepCard stepKey="setup-bm-login" number={1} title="Log in to Business Manager">
            <p className="text-sm">
              Open your sandbox's Business Manager URL in your browser and log in with your admin credentials.
            </p>
          </StepCard>

          <StepCard stepKey="setup-admin" number={2} title="Navigate to Administration">
            <p className="text-sm">
              Click the <strong className="text-slate-100">waffle menu</strong> (☰) in the top-left corner and choose <strong className="text-slate-100">Administration</strong>.
            </p>
          </StepCard>

          <StepCard stepKey="setup-import-export" number={3} title="Open Site Import & Export">
            <p className="text-sm">
              In the left sidebar, expand <strong className="text-slate-100">Site Development</strong> and click <strong className="text-slate-100">Site Import & Export</strong>.
            </p>
          </StepCard>

          <StepCard stepKey="setup-upload" number={4} title="Upload the Market Street zip file">
            <p className="text-sm">
              Click <strong className="text-slate-100">Choose File</strong>, locate the <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">marketstreet.zip</code> file you downloaded in the Pre-Work, then click <strong className="text-slate-100">Upload</strong>.
            </p>
          </StepCard>

          <StepCard stepKey="setup-import" number={5} title="Import the site data">
            <p className="text-sm">
              Once the upload completes, select <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">marketstreet.zip</code> from the list of available files and click <strong className="text-slate-100">Import</strong>.
            </p>
            <div className="mt-2 p-3 rounded-lg bg-sky-950/30 border border-sky-500/20 text-xs text-slate-400">
              ⏱ This process takes about <strong className="text-slate-200">90 seconds</strong>. Wait for the import to finish before moving on.
            </div>
          </StepCard>

          <StepCard stepKey="setup-import-done" number={6} title="Confirm the import completed" isLast>
            <p className="text-sm">
              The import status should show <strong className="text-emerald-400">Success</strong>. If you see any errors, check the import log for details.
            </p>
            <Callout type="warning" title="Fallback option">
              If you have any issues with the Market Street import, you can use <strong>RefArchGlobal</strong> as an alternative — but note that its product data is out of date.
            </Callout>
          </StepCard>
        </div>
      </section>

      {/* Part 2: Create Storefront */}
      <section>
        <h2 className="text-xl font-bold text-slate-100 mb-6">Part 2 — Create Your Storefront</h2>
        <div className="space-y-0">
          <StepCard stepKey="setup-storefronts" number={7} title="Navigate to Storefronts">
            <p className="text-sm">
              In Business Manager, go to <strong className="text-slate-100">Sites</strong> → <strong className="text-slate-100">Storefronts</strong>.
            </p>
          </StepCard>

          <StepCard stepKey="setup-add-new" number={8} title="Add a new storefront">
            <p className="text-sm">
              Click <strong className="text-slate-100">Add New</strong> to create a new Storefront Next project.
            </p>
          </StepCard>

          <StepCard stepKey="setup-configure" number={9} title="Configure and connect GitHub">
            <p className="text-sm">
              Fill in the following:
            </p>
            <ul className="mt-2 space-y-1.5 text-sm">
              <li className="flex gap-2">
                <span className="text-slate-600 mt-0.5 flex-shrink-0">›</span>
                <span><strong className="text-slate-200">Storefront Name</strong> — give it a descriptive name for your project</span>
              </li>
              <li className="flex gap-2">
                <span className="text-slate-600 mt-0.5 flex-shrink-0">›</span>
                <span><strong className="text-slate-200">Storefront</strong> — choose <strong className="text-sky-400">Market Street</strong> from the dropdown</span>
              </li>
              <li className="flex gap-2">
                <span className="text-slate-600 mt-0.5 flex-shrink-0">›</span>
                <span><strong className="text-slate-200">GitHub</strong> — authenticate your GitHub account when prompted</span>
              </li>
            </ul>
            <Callout type="tip" title="Repo name must be unique">
              Make sure the repository name is unique and not something that already exists in your GitHub account. If the name is taken, the creation will fail.
            </Callout>
          </StepCard>

          <StepCard stepKey="setup-complete" number={10} title="Verify your storefront was created">
            <p className="text-sm">
              Once complete, you should see your new storefront listed. Check your GitHub account to confirm the repository was created — this is the codebase you'll be working with throughout the workshop.
            </p>
          </StepCard>

          <StepCard stepKey="setup-gh-auth" number={11} title="Authenticate GitHub CLI">
            <p className="text-sm">
              Open your terminal and run:
            </p>
            <div className="mt-2">
              <InlineCode code="gh auth login" />
            </div>
            <p className="text-sm mt-3">
              Answer the CLI prompts as follows:
            </p>
            <CodeBlock
              language="bash"
              code={`? Where do you use GitHub? GitHub.com
? What is your preferred protocol for Git operations on this host? HTTPS
? Authenticate Git with your GitHub credentials? Yes
? How would you like to authenticate GitHub CLI? Login with a web browser`}
            />
            <p className="text-sm mt-2">
              A browser window will open — complete the authentication there, then return to your terminal.
            </p>
          </StepCard>

          <StepCard stepKey="setup-wait-deploy" number={12} title="Wait for storefront deployment" isLast>
            <p className="text-sm">
              The storefront setup process typically takes <strong className="text-slate-200">15–25 minutes</strong> to complete. Once it's finished, you'll see links to your storefront in Business Manager:
            </p>
            <ul className="mt-2 space-y-1.5 text-sm">
              <li className="flex gap-2">
                <span className="text-slate-600 mt-0.5 flex-shrink-0">›</span>
                <span>The <strong className="text-slate-200">eye icon</strong> (👁) will launch your live storefront in a new tab</span>
              </li>
              <li className="flex gap-2">
                <span className="text-slate-600 mt-0.5 flex-shrink-0">›</span>
                <span>A <strong className="text-slate-200">GitHub repo link</strong> will appear — this is the codebase you'll clone and work with</span>
              </li>
            </ul>
            <Callout type="tip" title="While you wait">
              This is a great time to review <Link to="/module/1" className="text-sky-400 hover:underline">Module 1: Architecture</Link> to get familiar with the tech stack before diving into code.
            </Callout>
          </StepCard>
        </div>
      </section>

      <div className="flex justify-end">
        <Link
          to="/module/1"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm transition-colors shadow-lg shadow-sky-500/20"
        >
          Module 1: Architecture <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  )
}
