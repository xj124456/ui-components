import * as React from 'react';
import { cn } from './utils/cn';

/* ============================================================================
 * Feedback â€?Badge, Alert, Toast, Progress, Skeleton, Tooltip.
 * ========================================================================== */

export type BadgeVariant =
  | 'green' | 'green-soft' | 'popular' | 'neutral' | 'warning' | 'danger'
  | 'purple' | 'orange' | 'pink' | 'blue';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

/** Pill/tag status indicator. Category accents are reserved for course tags. */
export function Badge({ variant = 'green', children, className, ...rest }: BadgeProps) {
  const map: Record<BadgeVariant, string> = {
    green:        'bg-brand-green text-on-primary rounded-chip text-[13px] py-0.5 px-2',
    'green-soft': 'bg-brand-green-soft text-brand-green-dark rounded-pill text-[13px] py-1 px-2.5',
    popular:      'bg-brand-teal-deep text-brand-green rounded-pill text-[13px] py-1 px-2.5',
    neutral:      'bg-surface-soft text-steel rounded-pill text-[13px] py-1 px-2.5',
    warning:      'bg-warning-bg text-warning-text rounded-pill text-[13px] py-1 px-2.5',
    danger:       'bg-danger-bg text-danger rounded-pill text-[13px] py-1 px-2.5',
    purple:       'bg-accent-purple text-on-dark rounded-tag text-[11px] tracking-micro uppercase py-0.5 px-2',
    orange:       'bg-accent-orange text-on-dark rounded-tag text-[11px] tracking-micro uppercase py-0.5 px-2',
    pink:         'bg-accent-pink text-on-dark rounded-tag text-[11px] tracking-micro uppercase py-0.5 px-2',
    blue:         'bg-accent-blue text-on-dark rounded-tag text-[11px] tracking-micro uppercase py-0.5 px-2',
  };
  return <span className={cn('inline-flex items-center font-sans font-semibold whitespace-nowrap', map[variant], className)} {...rest}>{children}</span>;
}

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps {
  variant?: AlertVariant;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

/** Inline callout banner. */
export function Alert({ variant = 'info', title, children, icon, className }: AlertProps) {
  const map: Record<AlertVariant, { wrap: string; icon: string; title?: string }> = {
    info:    { wrap: 'bg-info-bg border-l-info',                icon: 'text-info' },
    success: { wrap: 'bg-success-bg border-l-brand-green-dark', icon: 'text-brand-green-dark' },
    warning: { wrap: 'bg-warning-bg border-l-warning-text',     icon: 'text-warning-text', title: 'text-warning-text' },
    danger:  { wrap: 'bg-danger-bg border-l-danger',            icon: 'text-danger' },
  };
  const v = map[variant];
  return (
    <div className={cn('flex gap-3 items-start rounded-input py-3.5 px-4 font-sans border-l-[3px]', v.wrap, className)}>
      {icon && <span className={cn('flex-none inline-flex mt-px', v.icon)}>{icon}</span>}
      <div className="flex flex-col gap-[3px]">
        {title && <span className={cn('text-sm font-semibold', v.title || 'text-ink')}>{title}</span>}
        {children && <span className="text-sm leading-normal text-slate">{children}</span>}
      </div>
    </div>
  );
}

export type ToastVariant = 'default' | 'success' | 'danger' | 'info';

export interface ToastProps {
  variant?: ToastVariant;
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

/** Transient notification with an accent stripe. */
export function Toast({ variant = 'default', title, description, onClose, icon, className }: ToastProps) {
  const accent: Record<ToastVariant, string> = {
    default: 'border-l-brand-green text-brand-green',
    success: 'border-l-brand-green text-brand-green',
    danger:  'border-l-danger text-danger',
    info:    'border-l-info text-info',
  };
  return (
    <div className={cn('flex gap-3 items-start w-[360px] max-w-full box-border bg-canvas rounded-card border border-hairline shadow-e4 py-3.5 px-4 font-sans border-l-[3px]', accent[variant], className)}>
      {icon && <span className="flex-none mt-px">{icon}</span>}
      <div className="flex-1 flex flex-col gap-0.5">
        {title && <span className="text-sm font-semibold text-ink">{title}</span>}
        {description && <span className="text-[13px] leading-normal text-steel">{description}</span>}
      </div>
      {onClose && (
        <button onClick={onClose} aria-label="Close notification" className="border-0 bg-transparent cursor-pointer text-stone p-0.5 leading-none">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>
      )}
    </div>
  );
}

export interface ProgressProps {
  value?: number;
  max?: number;
  className?: string;
}

/** Brand-green determinate bar. */
export function Progress({ value = 0, max = 100, className }: ProgressProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={cn('w-full h-2 bg-hairline rounded-pill overflow-hidden', className)}>
      <div className="h-full bg-brand-green rounded-pill transition-[width] duration-slow ease-standard" style={{ width: `${pct}%` }} />
    </div>
  );
}

export interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  radius?: string;
  className?: string;
}

/** Shimmering placeholder block. */
export function Skeleton({ width = '100%', height = 16, radius, className }: SkeletonProps) {
  return (
    <div className={cn('rounded-chip', className)}
      style={{
        width, height, borderRadius: radius,
        background: 'linear-gradient(90deg, var(--surface-soft) 25%, var(--hairline) 37%, var(--surface-soft) 63%)',
        backgroundSize: '400% 100%',
        animation: 'mdb-shimmer 1.4s ease infinite',
      }}>
      <style>{'@keyframes mdb-shimmer{0%{background-position:100% 0}100%{background-position:0 0}}'}</style>
    </div>
  );
}

export type TooltipSide = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  label: React.ReactNode;
  side?: TooltipSide;
  children: React.ReactNode;
}

/** Small dark label on hover/focus. */
export function Tooltip({ label, side = 'top', children }: TooltipProps) {
  const [show, setShow] = React.useState(false);
  const pos: Record<TooltipSide, string> = {
    top:    'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left:   'right-full top-1/2 -translate-y-1/2 mr-2',
    right:  'left-full top-1/2 -translate-y-1/2 ml-2',
  };
  return (
    <span className="relative inline-flex"
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)} onBlur={() => setShow(false)}>
      {children}
      {show && (
        <span className={cn('absolute z-50 bg-brand-teal-deep text-on-dark font-sans text-xs font-medium py-1.5 px-2.5 rounded-chip whitespace-nowrap shadow-e3 pointer-events-none', pos[side])}>
          {label}
        </span>
      )}
    </span>
  );
}
