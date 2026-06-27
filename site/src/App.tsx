import * as React from 'react';
import {
  Accordion,
  Alert,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  CodeMockup,
  CourseCard,
  Dialog,
  DropdownMenu,
  Input,
  Label,
  InternalMark,
  Pagination,
  Popover,
  PricingCard,
  Progress,
  PromoBanner,
  RadioGroup,
  Select,
  Separator,
  Skeleton,
  Slider,
  Switch,
  Tabs,
  Textarea,
  Toast,
  Tooltip,
  type CodeLine,
} from '@daxiong/ui';

const icon = {
  arrow: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  check: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  info: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  user: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};

const navItems = [
  { href: '#overview', label: 'Overview' },
  { href: '#style-guide', label: 'Style Guide' },
  { href: '#components', label: 'Components' },
  { href: '#ai-usage', label: 'AI Usage' },
];

const heroCode: CodeLine[] = [
  [{ t: 'kw', v: 'import' }, { t: 'text', v: ' { Button, Card } ' }, { t: 'kw', v: 'from' }, { t: 'str', v: ' "@daxiong/ui";' }],
  '',
  [{ t: 'kw', v: 'export function' }, { t: 'fn', v: ' ProductPanel' }, { t: 'text', v: '() {' }],
  [{ t: 'text', v: '  ' }, { t: 'kw', v: 'return' }, { t: 'text', v: ' <Card><Button>Start free</Button></Card>;' }],
  [{ t: 'text', v: '}' }],
];

const colorTokens = [
  ['brand-green', '#00ED64', 'Primary CTA and active states'],
  ['brand-green-dark', '#00684A', 'Links, focus, check marks'],
  ['brand-teal-deep', '#001E2B', 'Hero, footer, dark surfaces'],
  ['surface', '#F9FBFA', 'Page and dashboard background'],
  ['hairline', '#E8EDEB', 'Borders and separators'],
  ['ink', '#001E2B', 'Primary text'],
  ['accent-purple', '#9B5DE5', 'Category tags only'],
  ['accent-blue', '#016BF8', 'Info and category tags'],
];

const radiusTokens = [
  ['rounded-tag', '4px', 'Tiny labels'],
  ['rounded-chip', '6px', 'Badges and menu rows'],
  ['rounded-input', '8px', 'Inputs and alerts'],
  ['rounded-card', '12px', 'Cards'],
  ['rounded-panel', '16px', 'Dialogs and large panels'],
  ['rounded-pill', '9999px', 'CTA, toggles, pagination'],
];

const regionOptions = [
  { value: 'aws-us-east-1', label: 'AWS us-east-1' },
  { value: 'aws-us-west-2', label: 'AWS us-west-2' },
  { value: 'aws-eu-central-1', label: 'AWS eu-central-1' },
  { value: 'gcp-us-central1', label: 'GCP us-central1' },
  { value: 'gcp-europe-west1', label: 'GCP europe-west1' },
  { value: 'gcp-asia-east1', label: 'GCP asia-east1' },
  { value: 'azure-eastus2', label: 'Azure eastus2' },
  { value: 'azure-westeurope', label: 'Azure westeurope' },
  { value: 'azure-southeastasia', label: 'Azure southeastasia' },
  { value: 'edge-shanghai', label: 'Edge shanghai' },
  { value: 'edge-singapore', label: 'Edge singapore' },
  { value: 'edge-frankfurt', label: 'Edge frankfurt' },
];

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="doc-shell">
      <header className="sticky top-0 z-40 border-b border-hairline bg-canvas/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-container items-center gap-6 px-5 lg:px-8">
          <a href="#overview" className="flex items-center no-underline">
            <InternalMark height={25} />
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="rounded-pill px-4 py-2 text-sm font-medium text-steel no-underline hover:bg-surface hover:text-ink">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3">            <Button variant="primary" size="sm" trailingIcon={icon.arrow} onClick={() => document.getElementById('components')?.scrollIntoView()}>
              Browse
            </Button>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mb-10 max-w-[760px]">
      <div className="mb-3 text-[11px] font-semibold uppercase tracking-micro text-brand-green-dark">{eyebrow}</div>
      <h2 className="m-0 font-display text-[32px] font-medium leading-tight tracking-display text-ink sm:text-[40px]">{title}</h2>
      <p className="mt-4 text-base leading-relaxed text-slate">{description}</p>
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="m-0 overflow-x-auto rounded-input bg-brand-teal-deep p-4 text-[13px] leading-relaxed text-on-dark">
      <code>{children.trim()}</code>
    </pre>
  );
}

function PreviewCard({
  title,
  description,
  usage,
  children,
  code,
}: {
  title: string;
  description: string;
  usage: string;
  children: React.ReactNode;
  code: string;
}) {
  return (
    <Card variant="base" className="flex h-full flex-col !p-0">
      <div className="border-b border-hairline p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="m-0 font-display text-[22px] font-semibold text-ink">{title}</h3>
            <p className="mt-2 text-sm leading-normal text-slate">{description}</p>
          </div>
          <Badge variant="neutral">{usage}</Badge>
        </div>
      </div>
      <div className="preview-checker flex min-h-[180px] flex-1 items-center justify-center p-6">
        <div className="w-full max-w-[560px]">{children}</div>
      </div>
      <div className="border-t border-hairline bg-surface p-4">
        <CodeBlock>{code}</CodeBlock>
      </div>
    </Card>
  );
}

function Overview() {
  return (
    <section id="overview" className="bg-brand-teal-deep text-on-dark">
      <div className="mx-auto grid max-w-container gap-12 px-5 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
        <div>
          <Badge variant="popular" className="mb-6">Design System Docs</Badge>
          <h1 className="m-0 max-w-[760px] font-display text-[44px] font-medium leading-[1.08] tracking-hero sm:text-[64px]">
            Internal components for people and AI agents.
          </h1>
          <p className="mt-6 max-w-[620px] text-lg leading-relaxed text-white/72">
            A React, Tailwind, and TypeScript component library with clear usage rules, visual tokens, and copyable instructions for Codex and Claude Code.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button variant="primary" size="lg" trailingIcon={icon.arrow} onClick={() => document.getElementById('components')?.scrollIntoView()}>
              View components
            </Button>
            <Button variant="secondary" size="lg" onDark onClick={() => document.getElementById('ai-usage')?.scrollIntoView()}>
              AI instructions
            </Button>
          </div>
          <div className="mt-8 grid max-w-[720px] gap-3 sm:grid-cols-3">
            {['Internal product UI', 'Reusable package', 'Agent-ready rules'].map((item) => (
              <div key={item} className="rounded-input border border-white/15 bg-white/5 p-4 text-sm font-medium text-white/78">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center">
          <CodeMockup title="design-system.tsx" lines={heroCode} className="w-full" />
        </div>
      </div>
    </section>
  );
}

function StyleGuide() {
  return (
    <section id="style-guide" className="mx-auto max-w-container px-5 py-20 lg:px-8">
      <SectionHeader
        eyebrow="Style Guide"
        title="A controlled visual language, not a loose theme."
        description="Use these tokens and rules as the source of truth. The system should feel like a internal developer platform: calm, technical, readable, and action-oriented."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card variant="base">
          <h3 className="m-0 font-display text-[24px] font-semibold">Color tokens</h3>
          <p className="mb-6 mt-2 text-sm leading-normal text-slate">Use semantic Tailwind utilities from the preset. Avoid one-off hex values.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {colorTokens.map(([name, value, note]) => (
              <div key={name} className="flex gap-3 rounded-input border border-hairline bg-canvas p-3">
                <span className="h-12 w-12 flex-none rounded-chip border border-hairline" style={{ background: value }} />
                <span>
                  <span className="block font-mono text-[13px] text-ink">{name}</span>
                  <span className="block text-xs text-steel">{note}</span>
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card variant="base">
          <h3 className="m-0 font-display text-[24px] font-semibold">Radius and elevation</h3>
          <p className="mb-6 mt-2 text-sm leading-normal text-slate">Pill CTA buttons are a signature. Cards stay restrained and mostly flat.</p>
          <div className="grid gap-3">
            {radiusTokens.map(([name, value, note]) => (
              <div key={name} className="flex items-center justify-between gap-4 rounded-input bg-surface p-3">
                <div>
                  <div className="font-mono text-[13px] text-ink">{name}</div>
                  <div className="text-xs text-steel">{note}</div>
                </div>
                <div className="h-10 w-24 border border-brand-green-dark bg-brand-green-soft" style={{ borderRadius: value }} />
              </div>
            ))}
          </div>
        </Card>

        <Card variant="dark">
          <h3 className="m-0 font-display text-[24px] font-semibold">Do</h3>
          <ul className="mb-0 mt-5 space-y-3 p-0 pl-5 text-sm leading-relaxed text-white/76">
            <li>Use `Button`, `Card`, `Input`, `Dialog`, and other package components first.</li>
            <li>Load `@daxiong/ui/styles.css` once at the app root.</li>
            <li>Map Tailwind through `@daxiong/ui/tailwind-preset`.</li>
            <li>Reserve accent colors for tags and category signals.</li>
          </ul>
        </Card>

        <Card variant="soft">
          <h3 className="m-0 font-display text-[24px] font-semibold">Avoid</h3>
          <ul className="mb-0 mt-5 space-y-3 p-0 pl-5 text-sm leading-relaxed text-slate">
            <li>No random green utilities like `bg-green-500` for brand UI.</li>
            <li>No duplicate button, input, select, card, or modal systems.</li>
            <li>No large purple gradients, glass effects, or decorative bokeh backgrounds.</li>
            <li>No third-party trademark assets or vendor-specific marks.</li>
          </ul>
        </Card>
      </div>
    </section>
  );
}

function ComponentDocs() {
  const [checked, setChecked] = React.useState(true);
  const [radio, setRadio] = React.useState('Platform');
  const [switchOn, setSwitchOn] = React.useState(true);
  const [selectValue, setSelectValue] = React.useState('aws-us-east-1');
  const [multiSelectValue, setMultiSelectValue] = React.useState<string[]>(['aws-us-east-1', 'gcp-us-central1']);
  const [sliderValue, setSliderValue] = React.useState(64);
  const [tab, setTab] = React.useState('overview');
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [page, setPage] = React.useState(2);
  const [toastVisible, setToastVisible] = React.useState(true);
  const [promoVisible, setPromoVisible] = React.useState(true);

  return (
    <section id="components" className="bg-surface">
      <div className="mx-auto max-w-container px-5 py-20 lg:px-8">
        <SectionHeader
          eyebrow="Components"
          title="Every primitive with live preview and copyable usage."
          description="These examples import from the package root. When building product UI, start here before creating new local components."
        />

        <div className="grid gap-6 xl:grid-cols-2">
          <PreviewCard
            title="Button"
            description="Primary, secondary, ghost, link, and destructive actions."
            usage="Forms"
            code={`import { Button } from '@daxiong/ui';\n\n<Button variant="primary" size="lg">Start free</Button>`}
          >
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" trailingIcon={icon.arrow}>Start free</Button>
              <Button variant="secondary">Contact sales</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Read docs</Button>
              <Button variant="destructive">Delete</Button>
            </div>
          </PreviewCard>

          <PreviewCard
            title="Label, Input, Textarea"
            description="Default form field composition with required state."
            usage="Forms"
            code={`<Label htmlFor="email" required>Email</Label>\n<Input id="email" placeholder="you@company.com" />\n<Textarea placeholder="Deployment notes" />`}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="email-doc" required>Email</Label>
            <Input id="email-doc" aria-label="Email" placeholder="you@company.com" />
              </div>
              <div>
                <Label htmlFor="notes-doc">Notes</Label>
            <Textarea id="notes-doc" aria-label="Notes" rows={3} placeholder="Deployment notes" />
              </div>
            </div>
          </PreviewCard>

          <PreviewCard
            title="Checkbox, RadioGroup, Switch"
            description="Selection controls with brand-green active states."
            usage="Forms"
            code={`<Checkbox checked={checked} onChange={setChecked} label="Enable backups" />\n<RadioGroup value={value} options={['Platform', 'Enterprise']} />\n<Switch checked={enabled} onChange={setEnabled} />`}
          >
            <div className="grid gap-5">
              <Checkbox checked={checked} onChange={setChecked} label="Enable backups" />
              <RadioGroup value={radio} onChange={setRadio} options={['Platform', 'Enterprise', 'Community']} />
              <div className="flex items-center justify-between rounded-input bg-canvas p-3">
                <span className="text-sm font-medium text-ink">Product updates</span>
                <Switch checked={switchOn} onChange={setSwitchOn} ariaLabel="Send product updates" />
              </div>
            </div>
          </PreviewCard>

          <PreviewCard
            title="Select and Slider"
            description="Dropdown search appears automatically when the option list is long. Use multiple for multi-select fields."
            usage="Forms"
            code={`<Select value={region} onChange={setRegion} options={regions} searchable="auto" searchThreshold={8} />\n<Select multiple value={regions} onChange={setRegions} options={regionOptions} />\n<Slider value={value} onChange={setValue} />`}
          >
            <div className="grid gap-5">
              <Select
                value={selectValue}
                onChange={setSelectValue}
                options={regionOptions}
              />
              <Select
                multiple
                value={multiSelectValue}
                onChange={setMultiSelectValue}
                options={regionOptions}
                placeholder="Select regions..."
              />
              <div className="grid gap-2">
                <div className="flex justify-between text-sm text-steel">
                  <span>Capacity</span>
                  <span>{sliderValue}%</span>
                </div>
                <Slider value={sliderValue} onChange={setSliderValue} ariaLabel="Capacity" />
              </div>
            </div>
          </PreviewCard>

          <PreviewCard
            title="Badge"
            description="Status, plan, and category indicators."
            usage="Feedback"
            code={`<Badge variant="green">Stable</Badge>\n<Badge variant="popular">Dedicated</Badge>\n<Badge variant="purple">AI</Badge>`}
          >
            <div className="flex flex-wrap gap-2">
              <Badge variant="green">Stable</Badge>
              <Badge variant="green-soft">v8.0</Badge>
              <Badge variant="popular">Dedicated</Badge>
              <Badge variant="neutral">Preview</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="purple">AI</Badge>
              <Badge variant="orange">Data</Badge>
              <Badge variant="pink">RAG</Badge>
              <Badge variant="blue">Search</Badge>
            </div>
          </PreviewCard>

          <PreviewCard
            title="Alert and Toast"
            description="Inline messages and transient notifications."
            usage="Feedback"
            code={`<Alert variant="info" title="Free tier">512 MB free forever.</Alert>\n<Toast variant="success" title="Cluster deployed" />`}
          >
            <div className="grid gap-4">
              <Alert variant="info" icon={icon.info} title="Free tier available">512 MB storage and shared RAM, free forever.</Alert>
              {toastVisible ? (
                <Toast variant="success" icon={icon.check} title="Cluster deployed" description="us-east-1 is live." onClose={() => setToastVisible(false)} />
              ) : (
                <Button variant="secondary" onClick={() => setToastVisible(true)}>Show toast</Button>
              )}
            </div>
          </PreviewCard>

          <PreviewCard
            title="Progress, Skeleton, Tooltip"
            description="Loading and helper states."
            usage="Feedback"
            code={`<Progress value={64} />\n<Skeleton height={16} />\n<Tooltip label="Most popular"><Badge>Dedicated</Badge></Tooltip>`}
          >
            <div className="grid gap-5">
              <Progress value={sliderValue} />
              <div className="grid gap-2 rounded-input bg-canvas p-4">
                <Skeleton width="50%" height={14} />
                <Skeleton height={12} />
                <Skeleton width="74%" height={12} />
              </div>
              <Tooltip label="Most popular production tier">
                <span className="inline-flex"><Badge variant="popular">Dedicated</Badge></span>
              </Tooltip>
            </div>
          </PreviewCard>

          <PreviewCard
            title="Card and Separator"
            description="The base layout surface and hairline divider."
            usage="Layout"
            code={`<Card variant="base">\n  <h3>Cluster health</h3>\n  <Separator />\n</Card>`}
          >
            <Card variant="soft" className="!p-5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-ink">Cluster health</span>
                <Badge variant="green-soft">Healthy</Badge>
              </div>
              <Separator className="my-4" />
              <p className="m-0 text-sm leading-normal text-slate">All nodes are running normally across three availability zones.</p>
            </Card>
          </PreviewCard>

          <PreviewCard
            title="Tabs and Accordion"
            description="Compact navigation inside dense product surfaces."
            usage="Layout"
            code={`<Tabs value={tab} onChange={setTab} tabs={tabs} />\n<Accordion items={items} />`}
          >
            <div className="grid gap-5">
              <Tabs value={tab} onChange={setTab} tabs={[
                { value: 'overview', label: 'Overview' },
                { value: 'metrics', label: 'Metrics' },
                { value: 'logs', label: 'Logs' },
              ]} />
              <Accordion items={[
                { question: 'When should I use cards?', answer: 'Use cards for repeated items, tools, and clearly framed product surfaces.' },
                { question: 'When should I avoid cards?', answer: 'Do not wrap every page section in decorative nested cards.' },
              ]} />
            </div>
          </PreviewCard>

          <PreviewCard
            title="Avatar"
            description="User identity chip with image or initials fallback."
            usage="Layout"
            code={`<Avatar name="Ada Lovelace" />\n<Avatar name="Grace Hopper" size={48} />`}
          >
            <div className="flex items-center gap-3">
              <Avatar name="Ada Lovelace" />
              <Avatar name="Grace Hopper" size={48} />
              <Avatar name="Katherine Johnson" size={56} />
            </div>
          </PreviewCard>

          <PreviewCard
            title="Dialog"
            description="Controlled modal for focused decisions."
            usage="Overlay"
            code={`<Dialog open={open} onClose={close} title="Confirm deployment">\n  Review changes.\n</Dialog>`}
          >
            <Button variant="primary" onClick={() => setDialogOpen(true)}>Open dialog</Button>
            <Dialog
              open={dialogOpen}
              onClose={() => setDialogOpen(false)}
              title="Confirm deployment"
              description="Review the cluster settings before publishing."
              footer={(
                <>
                  <Button variant="secondary" onClick={() => setDialogOpen(false)}>Cancel</Button>
                  <Button variant="primary" onClick={() => setDialogOpen(false)}>Deploy</Button>
                </>
              )}
            >
              <Alert variant="success" icon={icon.check} title="Ready">All required settings are valid.</Alert>
            </Dialog>
          </PreviewCard>

          <PreviewCard
            title="DropdownMenu and Popover"
            description="Anchored menus and rich floating panels."
            usage="Overlay"
            code={`<DropdownMenu trigger={<Button>Menu</Button>} items={items} />\n<Popover trigger={<Button>Invite</Button>}>...</Popover>`}
          >
            <div className="flex flex-wrap gap-3">
              <DropdownMenu
                trigger={<Button variant="secondary">Menu</Button>}
                items={[
                  { label: 'View project' },
                  { label: 'Invite member', icon: icon.user },
                  { separator: true },
                  { label: 'Delete project', danger: true },
                ]}
              />
              <Popover trigger={<Button variant="primary">Invite</Button>}>
                <div className="grid gap-3">
                  <span className="text-sm font-semibold text-ink">Invite teammate</span>
                <Input aria-label="Teammate email" placeholder="email@company.com" />
                  <Button variant="primary" size="sm">Send invite</Button>
                </div>
              </Popover>
            </div>
          </PreviewCard>

          <PreviewCard
            title="Breadcrumb and Pagination"
            description="Path and page navigation."
            usage="Navigation"
            code={`<Breadcrumb items={[{ label: 'Home' }, { label: 'Docs' }]} />\n<Pagination page={page} total={6} />`}
          >
            <div className="grid gap-6">
              <Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Design System', href: '#' }, { label: 'Components' }]} />
              <Pagination page={page} total={6} onChange={setPage} />
            </div>
          </PreviewCard>

          <PreviewCard
            title="InternalMark and CodeMockup"
            description="Brand placeholder and terminal-style product example."
            usage="Brand"
            code={`<InternalMark />\n<CodeMockup title="terminal" lines={lines} />`}
          >
            <div className="grid gap-5">
              <InternalMark />
              <CodeMockup title="terminal" lines={[
                [{ t: 'fn', v: 'api' }, { t: 'text', v: '.' }, { t: 'fn', v: 'projects' }, { t: 'text', v: '.' }, { t: 'fn', v: 'list' }, { t: 'text', v: '({' }],
                [{ t: 'text', v: '  status: ' }, { t: 'str', v: '"active"' }],
                [{ t: 'text', v: '})' }],
              ]} />
            </div>
          </PreviewCard>

          <PreviewCard
            title="PricingCard"
            description="Pricing tiers with featured treatment."
            usage="Brand"
            code={`<PricingCard tier="Dedicated" price="$57" featured badge="Popular" features={features} />`}
          >
            <PricingCard
              tier="Dedicated"
              price="$57"
              featured
              badge="Popular"
              description="For production apps that need to scale."
              features={['Dedicated workspace', 'Auto-scaling', 'Semantic search']}
            />
          </PreviewCard>

          <PreviewCard
            title="CourseCard and PromoBanner"
            description="Learning content and top-of-page announcement."
            usage="Brand"
            code={`<PromoBanner cta="Register">Internal design review is ready.</PromoBanner>\n<CourseCard title="Search and AI Workflows" />`}
          >
            <div className="grid gap-4">
              {promoVisible && (
                <PromoBanner dismissible cta="Register" onDismiss={() => setPromoVisible(false)}>
                  Internal design review is ready for your team.
                </PromoBanner>
              )}
              <CourseCard
                category="AI"
                categoryColor="pink"
                title="Search and AI Workflows"
                description="Hands-on, self-paced, certificate on completion."
                meta="5h"
              />
            </div>
          </PreviewCard>
        </div>
      </div>
    </section>
  );
}

function AIUsage() {
  return (
    <section id="ai-usage" className="mx-auto max-w-container px-5 py-20 lg:px-8">
      <SectionHeader
        eyebrow="AI Usage"
        title="How another project should consume this system."
        description="Paste these instructions into a target project's AGENTS.md or CLAUDE.md so coding agents follow the same package and style rules."
      />
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card variant="base">
          <h3 className="m-0 font-display text-[24px] font-semibold">Install and configure</h3>
          <div className="mt-5 grid gap-4">
            <CodeBlock>{`# Recommended from a package folder:\npnpm add @daxiong/ui@file:../../../ui-components/packages/ui\n\n# If dependency is declared at the project root:\npnpm add @daxiong/ui@file:../ui-components/packages/ui\n\n# This package is local only and is not published to npm.`}</CodeBlock>
            <CodeBlock>{`import '@daxiong/ui/styles.css';`}</CodeBlock>
            <CodeBlock>{`import daxiongPreset from '@daxiong/ui/tailwind-preset';\n\nexport default {\n  presets: [daxiongPreset],\n  content: [\n    './src/**/*.{ts,tsx}',\n    './node_modules/@daxiong/ui/dist/**/*.js',\n  ],\n};`}</CodeBlock>
          </div>
        </Card>
        <Card variant="dark">
          <h3 className="m-0 font-display text-[24px] font-semibold">Agent instruction block</h3>
          <p className="mt-2 text-sm leading-normal text-white/65">Use this when asking Codex or Claude Code to build UI in another repo.</p>
          <div className="mt-5">
            <CodeBlock>{`This project must follow Daxiong UI.\n\nRead and obey:\n- path/to/ui-components/AGENTS.md\n- path/to/ui-components/docs/design-system-reference.md\n\nImplementation rules:\n- Import UI from @daxiong/ui first.\n- Load @daxiong/ui/styles.css once.\n- Use @daxiong/ui/tailwind-preset in Tailwind.\n- @daxiong/ui is a local internal package. Use a file: dependency; do not install it from npm.\n- Do not rewrite existing Button, Input, Select, Card, Dialog, or Badge components.\n- Do not hardcode random colors, shadows, font families, or radii.\n- Keep the UI calm, technical, readable, and internal-product oriented.`}</CodeBlock>
          </div>
        </Card>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-brand-teal-deep text-on-dark">
      <div className="mx-auto grid max-w-container gap-8 px-5 py-12 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div>
          <InternalMark onDark />
          <p className="mt-4 max-w-[420px] text-sm leading-relaxed text-white/58">
            A local design-system package and reference site for consistent internal product interfaces.
          </p>
        </div>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-micro text-white/42">Project</div>
          <div className="mt-4 grid gap-2 text-sm text-white/68">
            <a href="#style-guide" className="no-underline hover:text-on-dark">Style Guide</a>
            <a href="#components" className="no-underline hover:text-on-dark">Components</a>
            <a href="#ai-usage" className="no-underline hover:text-on-dark">AI Usage</a>
          </div>
        </div>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-micro text-white/42">Internal package</div>
          <div className="mt-4 grid gap-2 text-sm text-white/68">
            <span>Package: @daxiong/ui (local only)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function App() {
  return (
    <Shell>
      <Overview />
      <StyleGuide />
      <ComponentDocs />
      <AIUsage />
      <Footer />
    </Shell>
  );
}
