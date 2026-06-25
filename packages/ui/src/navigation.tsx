import * as React from 'react';
import { cn } from './utils/cn';

/* ============================================================================
 * Navigation - Breadcrumb, Pagination.
 * ========================================================================== */

export interface Crumb {
  label: React.ReactNode;
  href?: string;
}

export interface BreadcrumbProps {
  items?: Crumb[];
  className?: string;
}

/** Path navigation with chevron separators. */
export function Breadcrumb({ items = [], className }: BreadcrumbProps) {
  return (
    <nav className={cn('flex items-center flex-wrap gap-1.5 font-sans text-sm', className)}>
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <React.Fragment key={i}>
            <a href={it.href || '#'}
              className={cn('no-underline', last ? 'text-ink font-semibold pointer-events-none' : 'text-steel font-normal hover:text-ink')}>
              {it.label}
            </a>
            {!last && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

export interface PaginationProps {
  page?: number;
  total?: number;
  onChange?: (page: number) => void;
  className?: string;
}

/** Numbered page navigation; active page = ink pill. */
export function Pagination({ page = 1, total = 1, onChange, className }: PaginationProps) {
  const go = (p: number) => { if (p >= 1 && p <= total && onChange) onChange(p); };
  const pages: (number | string)[] = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(total - 1, page + 1);
  if (start > 2) pages.push('...');
  for (let p = start; p <= end; p++) pages.push(p);
  if (end < total - 1) pages.push('...');
  if (total > 1) pages.push(total);

  const cell = 'min-w-[36px] h-9 px-2 rounded-pill font-sans text-sm inline-flex items-center justify-center cursor-pointer';
  const inactive = 'border border-hairline bg-transparent text-steel font-medium';
  const activeCls = 'border-0 bg-ink text-on-dark font-semibold';

  return (
    <div className={cn('inline-flex items-center gap-1.5', className)}>
      <button className={cn(cell, inactive, page === 1 && 'text-muted cursor-not-allowed')} onClick={() => go(page - 1)} disabled={page === 1} aria-label="Previous page">{'<'}</button>
      {pages.map((p, i) => typeof p === 'string'
        ? <span key={i} className="text-muted px-1">{p}</span>
        : <button key={i} className={cn(cell, p === page ? activeCls : inactive)} onClick={() => go(p)} aria-label={`Page ${p}`}>{p}</button>)}
      <button className={cn(cell, inactive, page === total && 'text-muted cursor-not-allowed')} onClick={() => go(page + 1)} disabled={page === total} aria-label="Next page">{'>'}</button>
    </div>
  );
}