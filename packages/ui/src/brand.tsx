import * as React from 'react';
import { cn } from './utils/cn';

/* ============================================================================
 * Brand utilities - InternalMark, CodeMockup, PricingCard, CourseCard,
 * PromoBanner.
 * ========================================================================== */

export interface InternalMarkProps {
  variant?: 'full' | 'mark';
  onDark?: boolean;
  height?: number;
  label?: string;
  className?: string;
}

export function InternalMark({
  variant = 'full',
  onDark = false,
  height = 26,
  label = 'Daxiong UI',
  className,
}: InternalMarkProps) {
  const mark = (
    <svg width={height} height={height} viewBox="0 0 24 24" fill="none" className="flex-none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="var(--brand-teal-deep)" />
      <path d="M7 12c0-3 2-5 5-5s5 2 5 5-2 5-5 5-5-2-5-5Z" fill="var(--brand-green)" />
      <path d="M12 7v10M7 12h10" stroke="var(--brand-teal-deep)" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
  if (variant === 'mark') return <span className={cn('inline-flex', className)}>{mark}</span>;
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      {mark}
      <span className={cn('font-display font-semibold tracking-[0]', onDark ? 'text-on-dark' : 'text-ink')} style={{ fontSize: height * 0.72 }}>
        {label}
      </span>
    </span>
  );
}

export type CodeTokenType = 'kw' | 'fn' | 'str' | 'num' | 'comment' | 'prompt' | 'text';
export interface CodeToken { t: CodeTokenType; v: string }
export type CodeLine = string | CodeToken[];

export interface CodeMockupProps {
  title?: string;
  lines?: CodeLine[];
  className?: string;
}

const tokenColor = (t: CodeTokenType): string => ({
  kw: 'var(--accent-purple)',
  fn: 'var(--brand-green)',
  str: '#FFB86C',
  num: '#8BE9FD',
  comment: 'var(--steel)',
  prompt: 'var(--brand-green)',
  text: 'var(--on-dark)',
}[t] || 'var(--on-dark)');

/** Terminal-style code card for product and implementation examples. */
export function CodeMockup({ title = 'terminal', lines = [], className }: CodeMockupProps) {
  return (
    <div className={cn('bg-canvas-dark rounded-card shadow-e3 overflow-hidden font-mono', className)}>
      <div className="flex items-center gap-2 py-3 px-4 border-b border-white/10">
        <span className="w-[11px] h-[11px] rounded-full bg-[#FF5F57]" />
        <span className="w-[11px] h-[11px] rounded-full bg-[#FEBC2E]" />
        <span className="w-[11px] h-[11px] rounded-full bg-[#28C840]" />
        <span className="ml-2 font-sans text-xs text-on-dark/60">{title}</span>
      </div>
      <pre className="m-0 p-6 text-[13.5px] leading-[1.7] text-on-dark overflow-x-auto">
        {lines.map((ln, i) => (
          <div key={i}>
            {typeof ln === 'string' ? <span>{ln || ' '}</span> : ln.map((tok, j) => (
              <span key={j} style={{ color: tokenColor(tok.t) }}>{tok.v}</span>
            ))}
          </div>
        ))}
      </pre>
    </div>
  );
}

export interface PricingCardProps {
  tier: React.ReactNode;
  price: React.ReactNode;
  period?: string;
  description?: React.ReactNode;
  features?: React.ReactNode[];
  cta?: React.ReactNode;
  featured?: boolean;
  badge?: React.ReactNode;
  onSelect?: () => void;
  className?: string;
}

/** Pricing tier. `featured` uses mint bg + green border + product glow. */
export function PricingCard({ tier, price, period = '/mo', description, features = [], cta = 'Get started', featured = false, badge, onSelect, className }: PricingCardProps) {
  return (
    <div className={cn('flex flex-col rounded-card p-12 font-sans',
      featured ? 'bg-surface-feature border-2 border-brand-green shadow-feature' : 'bg-canvas border border-hairline', className)}>
      <div className="flex items-center justify-between gap-3 min-h-[26px]">
        <span className="font-display text-[22px] font-semibold text-ink">{tier}</span>
        {badge && <span className="bg-brand-teal-deep text-brand-green text-[13px] font-semibold py-1 px-2.5 rounded-pill">{badge}</span>}
      </div>
      <div className="flex items-baseline gap-1 mt-4 mb-1">
        <span className="font-display text-[40px] font-medium tracking-display text-ink">{price}</span>
        {period && <span className="text-[15px] text-steel">{period}</span>}
      </div>
      {description && <p className="mt-0 mb-5 text-sm leading-normal text-slate">{description}</p>}
      <button onClick={onSelect}
        className={cn('w-full py-[11px] px-[22px] rounded-pill font-sans text-sm font-semibold cursor-pointer mb-6',
          featured ? 'bg-brand-green text-on-primary border-0' : 'bg-transparent text-ink border border-hairline-strong')}>{cta}</button>
      <div className="flex flex-col gap-3">
        {features.map((f, i) => (
          <div key={i} className="flex items-start gap-2.5 text-sm text-slate leading-snug">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--brand-green-dark)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="flex-none mt-px" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
            <span>{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export type CategoryColor = 'purple' | 'orange' | 'pink' | 'blue' | 'green';

export interface CourseCardProps {
  category?: string;
  categoryColor?: CategoryColor;
  title: React.ReactNode;
  description?: React.ReactNode;
  meta?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

/** Learning/resource tile with colored category tag. */
export function CourseCard({ category = 'Guide', categoryColor = 'purple', title, description, meta, onClick, className }: CourseCardProps) {
  const tag: Record<CategoryColor, string> = {
    purple: 'bg-accent-purple', orange: 'bg-accent-orange', pink: 'bg-accent-pink', blue: 'bg-accent-blue', green: 'bg-brand-green-mid',
  };
  return (
    <div onClick={onClick}
      className={cn('flex flex-col bg-canvas border border-hairline rounded-card p-6 font-sans transition-shadow duration-base ease-standard', onClick ? 'cursor-pointer hover:shadow-e2' : '', className)}>
      <span className={cn('self-start text-on-dark text-[11px] font-semibold tracking-micro uppercase py-[3px] px-2 rounded-tag mb-4', tag[categoryColor])}>{category}</span>
      <h4 className="m-0 mb-2 font-display text-lg font-semibold text-ink leading-snug">{title}</h4>
      {description && <p className="m-0 mb-4 text-sm leading-normal text-slate">{description}</p>}
      <div className="mt-auto flex items-center justify-between">
        <span className="text-brand-green-dark text-sm font-medium">Get started -&gt;</span>
        {meta && <span className="text-[13px] text-steel">{meta}</span>}
      </div>
    </div>
  );
}

export interface PromoBannerProps {
  children: React.ReactNode;
  cta?: React.ReactNode;
  onCta?: () => void;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

/** Dark teal notification strip above the top nav. */
export function PromoBanner({ children, cta, onCta, dismissible = false, onDismiss, className }: PromoBannerProps) {
  return (
    <div className={cn('flex items-center justify-center gap-3 bg-brand-teal-deep text-on-dark font-sans text-sm font-medium py-2.5 px-4 relative', className)}>
      <span>{children}</span>
      {cta && <button onClick={onCta} className="bg-transparent border-0 cursor-pointer text-brand-green text-sm font-semibold underline">{cta}</button>}
      {dismissible && (
        <button onClick={onDismiss} aria-label="Dismiss banner" className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-transparent border-0 cursor-pointer text-on-dark/70 leading-none">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>
      )}
    </div>
  );
}
