import * as React from 'react';
import { cn } from './utils/cn';

/* ============================================================================
 * Layout â€?Card, Separator, Tabs, Accordion, Avatar.
 * ========================================================================== */

export type CardVariant = 'base' | 'feature' | 'dark' | 'soft';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

/** Standard content card. 12px radius, hairline border, flat by default. */
export function Card({ variant = 'base', className, children, ...rest }: CardProps) {
  const variants: Record<CardVariant, string> = {
    base:    'bg-canvas border border-hairline p-8 text-ink',
    feature: 'bg-canvas border border-hairline p-12 text-ink shadow-e2',
    dark:    'bg-brand-teal-deep p-12 text-on-dark',
    soft:    'bg-surface p-8 text-ink',
  };
  return <div className={cn('rounded-card', variants[variant], className)} {...rest}>{children}</div>;
}

export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

/** Hairline divider. */
export function Separator({ orientation = 'horizontal', className }: SeparatorProps) {
  return (
    <div role="separator"
      className={cn(orientation === 'vertical' ? 'w-px self-stretch' : 'h-px w-full', 'bg-hairline', className)} />
  );
}

export type Tab = string | { value: string; label: string };

export interface TabsProps {
  tabs?: Tab[];
  value?: string;
  onChange?: (value: string) => void;
  variant?: 'segmented' | 'pill';
  className?: string;
}

/** 'segmented' underline tabs Â· 'pill' pill tabs. */
export function Tabs({ tabs = [], value, onChange, variant = 'segmented', className }: TabsProps) {
  const active = value != null ? value : (tabs[0] && (typeof tabs[0] === 'string' ? tabs[0] : tabs[0].value));
  const read = (t: Tab) => typeof t === 'string' ? { val: t, lbl: t } : { val: t.value, lbl: t.label };
  if (variant === 'pill') {
    return (
      <div className={cn('inline-flex gap-2 flex-wrap', className)}>
        {tabs.map((t) => {
          const { val, lbl } = read(t); const on = val === active;
          return (
            <button key={val} onClick={() => onChange && onChange(val)}
              className={cn('font-sans text-sm font-medium py-2 px-4 rounded-pill border whitespace-nowrap cursor-pointer transition-colors duration-base ease-standard',
                on ? 'bg-ink text-on-dark border-ink' : 'bg-transparent text-steel border-hairline')}>{lbl}</button>
          );
        })}
      </div>
    );
  }
  return (
    <div className={cn('flex gap-7 border-b border-hairline', className)}>
      {tabs.map((t) => {
        const { val, lbl } = read(t); const on = val === active;
        return (
          <button key={val} onClick={() => onChange && onChange(val)}
            className={cn('font-sans text-sm py-3 bg-transparent whitespace-nowrap cursor-pointer -mb-px border-b-2 transition-colors duration-base ease-standard',
              on ? 'text-brand-green-dark font-semibold border-brand-green-dark' : 'text-steel font-medium border-transparent')}>{lbl}</button>
        );
      })}
    </div>
  );
}

export interface AccordionItem {
  question: React.ReactNode;
  answer: React.ReactNode;
}

export interface AccordionProps {
  items?: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

/** Collapsible FAQ panels; only-one-open by default. */
export function Accordion({ items = [], allowMultiple = false, className }: AccordionProps) {
  const [open, setOpen] = React.useState<Set<number>>(() => new Set());
  const toggle = (i: number) => setOpen((prev) => {
    const next = new Set<number>(allowMultiple ? prev : []);
    if (prev.has(i)) next.delete(i); else next.add(i);
    return next;
  });
  return (
    <div className={cn('border-t border-hairline', className)}>
      {items.map((it, i) => {
        const isOpen = open.has(i);
        return (
          <div key={i} className="border-b border-hairline">
            <button onClick={() => toggle(i)}
              className="w-full flex items-center justify-between gap-4 py-5 px-1 border-0 bg-transparent cursor-pointer font-display text-lg font-semibold text-ink text-left">
              <span>{it.question}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--steel)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className={cn('flex-none transition-transform duration-base ease-standard', isOpen && 'rotate-180')}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {isOpen && <div className="px-1 pb-5 font-sans text-base leading-relaxed text-slate">{it.answer}</div>}
          </div>
        );
      })}
    </div>
  );
}

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: number;
  className?: string;
}

/** Circular user/initial chip. */
export function Avatar({ src, name = '', size = 40, className }: AvatarProps) {
  const initials = name.split(' ').map((w) => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
  return (
    <span className={cn('inline-flex items-center justify-center flex-none rounded-full overflow-hidden bg-brand-green-soft text-brand-green-dark font-sans font-semibold', className)}
      style={{ width: size, height: size, fontSize: size * 0.4 }}>
      {src ? <img src={src} alt={name} className="w-full h-full object-cover" /> : initials}
    </span>
  );
}
