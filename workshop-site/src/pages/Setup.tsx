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

      {/* Part 3: Connect Claude Code */}
      <section>
        <h2 className="text-xl font-bold text-slate-100 mb-6">Part 3 — Connect Claude Code to Your Repo</h2>
        <div className="space-y-0">
          <StepCard stepKey="setup-claude-repo" number={13} title="Tell Claude Code about your repo">
            <p className="text-sm">
              Open Claude Code in your terminal and paste the following:
            </p>
            <div className="mt-2">
              <CodeBlock
                language="text"
                code={`I would like to work on this repo: <paste your GitHub URL from Business Manager>`}
              />
            </div>
            <p className="text-sm mt-2">
              Copy the GitHub repo URL from Business Manager (from step 12) and paste it in place of the placeholder. Wait for Claude Code to acknowledge before continuing.
            </p>

            <div className="mt-4 p-4 rounded-xl bg-amber-950/15 border border-amber-500/20">
              <p className="text-amber-300 font-semibold text-sm mb-2">Alternate option</p>
              <p className="text-sm text-slate-400 mb-2">
                If you don't have a repo from Business Manager, you can create your own from the official template. Paste this to Claude Code:
              </p>
              <CodeBlock
                language="text"
                code={`I would like to create my own github repo based on this https://github.com/SalesforceCommerceCloud/storefront-next-template`}
              />
            </div>
          </StepCard>

          <StepCard stepKey="setup-claude-env" number={14} title="Set up your environment file" isLast>
            <p className="text-sm">
              Once Claude Code has cloned and acknowledged the repo, paste:
            </p>
            <div className="mt-2">
              <CodeBlock
                language="text"
                code={`I need to setup my .env file`}
              />
            </div>
            <p className="text-sm mt-2">
              Claude Code will guide you through configuring the <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">.env</code> file with your B2C sandbox credentials — connecting your local development environment to your Commerce Cloud sandbox.
            </p>
          </StepCard>
        </div>
      </section>

      {/* Part 4: Page Designer Setup */}
      <section>
        <h2 className="text-xl font-bold text-slate-100 mb-6">Part 4 — Page Designer Setup</h2>
        <p className="text-slate-400 text-sm mb-6">
          Page Designer lets merchandisers configure pages visually in Business Manager. To enable it with Storefront Next, you need to configure your MRT environment, deploy the Page Designer cartridge, and add it to your site path.
        </p>
        <div className="space-y-0">
          <StepCard stepKey="setup-pd-mrt" number={15} title="Configure MRT environment settings">
            <p className="text-sm">
              In your MRT Environment settings, scroll down to <strong className="text-slate-100">Advanced Settings</strong> (near the bottom):
            </p>
            <ul className="mt-2 space-y-1.5 text-sm">
              <li className="flex gap-2">
                <span className="text-slate-600 mt-0.5 flex-shrink-0">›</span>
                <span><strong className="text-slate-200">Enable server-side cookies</strong></span>
              </li>
              <li className="flex gap-2">
                <span className="text-slate-600 mt-0.5 flex-shrink-0">›</span>
                <span>Verify the <strong className="text-slate-200">proxy</strong> is configured:</span>
              </li>
            </ul>
            <div className="mt-3 p-3 rounded-lg bg-slate-900/60 border border-slate-700/50">
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-slate-500">Path:</span>
                  <div className="text-slate-200 font-mono mt-0.5">api</div>
                </div>
                <div>
                  <span className="text-slate-500">Host:</span>
                  <div className="text-slate-200 font-mono mt-0.5">kv7kzm78.api.commercecloud.salesforce.com</div>
                </div>
                <div>
                  <span className="text-slate-500">Protocol:</span>
                  <div className="text-slate-200 font-mono mt-0.5">https</div>
                </div>
              </div>
            </div>
          </StepCard>

          <StepCard stepKey="setup-pd-build" number={16} title="Build and deploy to MRT">
            <p className="text-sm">
              Run the following from your storefront project directory:
            </p>
            <div className="mt-2 flex flex-col gap-2">
              <InlineCode code="pnpm install" />
              <InlineCode code="pnpm build" />
              <InlineCode code="pnpm push" />
            </div>
          </StepCard>

          <StepCard stepKey="setup-pd-access-key" number={17} title="Generate an access key">
            <p className="text-sm">
              In Business Manager:
            </p>
            <ul className="mt-2 space-y-1.5 text-sm">
              <li className="flex gap-2">
                <span className="text-slate-600 mt-0.5 flex-shrink-0">1.</span>
                <span>Open <strong className="text-slate-200">My Profile</strong></span>
              </li>
              <li className="flex gap-2">
                <span className="text-slate-600 mt-0.5 flex-shrink-0">2.</span>
                <span>Click <strong className="text-slate-200">Manage Access Keys</strong></span>
              </li>
              <li className="flex gap-2">
                <span className="text-slate-600 mt-0.5 flex-shrink-0">3.</span>
                <span>Create a key for <strong className="text-sky-400">WebDAV File Access and UX Studio</strong></span>
              </li>
              <li className="flex gap-2">
                <span className="text-slate-600 mt-0.5 flex-shrink-0">4.</span>
                <span>Copy the key — you'll need it in the next step</span>
              </li>
            </ul>
            <p className="text-sm mt-3">
              Then from the <strong className="text-slate-200">Administration</strong> homepage, copy the <strong className="text-slate-200">Code Version Name</strong>.
            </p>
          </StepCard>

          <StepCard stepKey="setup-pd-dw-json" number={18} title="Edit dw.json">
            <p className="text-sm">
              Open <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">dw.json</code> in your project root and update these values:
            </p>
            <div className="mt-2">
              <CodeBlock
                language="json"
                filename="dw.json"
                code={`{
    "hostname": "devXX-realm27-qa223.demandware.net",
    "username": "{yourSalesforceEmail}",
    "password": "{yourAccessKey}",
    "code-version": "{Code Version Name}"
}`}
              />
            </div>
            <Callout type="warning" title="Don't commit credentials">
              Make sure <code className="bg-slate-800 px-1 py-0.5 rounded font-mono text-xs">dw.json</code> is in your <code className="bg-slate-800 px-1 py-0.5 rounded font-mono text-xs">.gitignore</code>. Never push access keys to GitHub.
            </Callout>
          </StepCard>

          <StepCard stepKey="setup-pd-cartridge" number={19} title="Generate and deploy the cartridge">
            <p className="text-sm">
              From your storefront-next repo, run:
            </p>
            <div className="mt-2 flex flex-col gap-2">
              <InlineCode code="pnpm sfnext generate-cartridge -d ." />
              <InlineCode code="pnpm sfnext deploy-cartridge" />
            </div>
            <p className="text-sm mt-2">
              This generates the Page Designer cartridge and deploys it to your sandbox.
            </p>
          </StepCard>

          <StepCard stepKey="setup-pd-sitepath" number={20} title="Add cartridge to site path" isLast>
            <p className="text-sm">
              In Business Manager:
            </p>
            <ul className="mt-2 space-y-1.5 text-sm">
              <li className="flex gap-2">
                <span className="text-slate-600 mt-0.5 flex-shrink-0">1.</span>
                <span><strong className="text-slate-200">Administration</strong> → <strong className="text-slate-200">Sites</strong> → <strong className="text-slate-200">Manage Sites</strong> → select <strong className="text-sky-400">your site</strong> → <strong className="text-slate-200">Settings</strong></span>
              </li>
              <li className="flex gap-2">
                <span className="text-slate-600 mt-0.5 flex-shrink-0">2.</span>
                <span>Add <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs">app_storefrontnext_base</code> to the cartridge path</span>
              </li>
            </ul>
            <Callout type="tip" title="Verify it works">
              After adding the cartridge, open Page Designer in Business Manager. You should see Storefront Next components available for use in your pages.
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
