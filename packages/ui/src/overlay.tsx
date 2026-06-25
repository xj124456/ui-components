import * as React from 'react';
import { cn } from './utils/cn';

/* ============================================================================
 * Overlay â€?Dialog, DropdownMenu, Popover.
 * ========================================================================== */

export interface DialogProps {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  width?: number;
}

/** Modal with scrim. Controlled via `open`/`onClose`. */
export function Dialog({ open, onClose, title, description, footer, children, width = 480 }: DialogProps) {
  if (!open) return null;
  return (
    <div onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 font-sans"
      style={{ background: 'rgba(0,30,43,0.45)' }}>
      <div onClick={(e) => e.stopPropagation()}
        className="max-w-full box-border bg-canvas rounded-panel shadow-e4 p-12"
        style={{ width }}>
        <div className="flex justify-between items-start gap-4">
          <div>
            {title && <h2 className="m-0 font-display text-2xl font-semibold leading-tight text-ink">{title}</h2>}
            {description && <p className="mt-1.5 mb-0 text-sm leading-normal text-steel">{description}</p>}
          </div>
          <button onClick={onClose} aria-label="Close dialog" className="border-0 bg-transparent cursor-pointer text-stone p-1 leading-none -mt-1 -mr-1">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>
        {children && <div className="mt-5">{children}</div>}
        {footer && <div className="mt-7 flex justify-end gap-3">{footer}</div>}
      </div>
    </div>
  );
}

export interface MenuItem {
  label?: React.ReactNode;
  icon?: React.ReactNode;
  onSelect?: () => void;
  danger?: boolean;
  separator?: boolean;
}

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items?: MenuItem[];
  align?: 'left' | 'right';
}

/** Click-to-open menu anchored under a trigger. */
export function DropdownMenu({ trigger, items = [], align = 'left' }: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);
  return (
    <div ref={ref} className="relative inline-block">
      <span onClick={() => setOpen((o) => !o)}>{trigger}</span>
      {open && (
        <div className={cn('absolute top-full mt-1.5 z-[60] min-w-[200px] bg-canvas rounded-input border border-hairline shadow-e4 p-1.5 font-sans', align === 'right' ? 'right-0' : 'left-0')}>
          {items.map((it, i) => it.separator ? (
            <div key={i} className="h-px bg-hairline my-1.5" />
          ) : (
            <button key={i} onClick={() => { setOpen(false); it.onSelect && it.onSelect(); }}
              className={cn('w-full flex items-center gap-2.5 py-[9px] px-3 border-0 rounded-chip bg-transparent hover:bg-surface cursor-pointer text-left text-sm', it.danger ? 'text-danger' : 'text-ink')}>
              {it.icon && <span className="inline-flex text-steel">{it.icon}</span>}
              {it.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'right';
  width?: number;
}

/** Click-to-open floating panel. */
export function Popover({ trigger, children, align = 'left', width = 280 }: PopoverProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);
  return (
    <div ref={ref} className="relative inline-block">
      <span onClick={() => setOpen((o) => !o)}>{trigger}</span>
      {open && (
        <div className={cn('absolute top-full mt-2 z-[60] bg-canvas rounded-card border border-hairline shadow-e4 p-6 font-sans text-ink', align === 'right' ? 'right-0' : 'left-0')}
          style={{ width }}>
          {children}
        </div>
      )}
    </div>
  );
}
