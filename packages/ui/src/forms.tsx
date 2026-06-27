import * as React from 'react';
import { cn } from './utils/cn';

/* ============================================================================
 * Forms - Button, Label, Input, Textarea, Checkbox, RadioGroup, Switch,
 *         Select, Slider. Tailwind-class ports of the design primitives.
 * ========================================================================== */

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link' | 'destructive';
export type ControlSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ControlSize;
  onDark?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

/** Brand-green pill is the dominant CTA. Keep the pill shape consistent. */
export function Button({
  variant = 'primary', size = 'md', onDark = false, disabled = false,
  leadingIcon, trailingIcon, className, children, ...rest
}: ButtonProps) {
  const sizes: Record<ControlSize, string> = {
    sm: 'text-[13px] px-4 py-2 min-h-[36px]',
    md: 'text-sm px-[22px] py-2.5 min-h-[44px]',
    lg: 'text-base px-7 py-[13px] min-h-[52px]',
  };
  const base = 'inline-flex items-center justify-center gap-2 font-sans font-semibold leading-tight whitespace-nowrap no-underline transition-[background,color,transform] duration-base ease-standard';
  const shape = variant === 'ghost' ? 'rounded-input px-3 py-2' : variant === 'link' ? 'rounded-none' : 'rounded-pill';
  const variants: Record<ButtonVariant, string> = {
    primary: disabled
      ? 'bg-hairline text-muted cursor-not-allowed'
      : 'bg-brand-green text-on-primary active:bg-primary-pressed cursor-pointer',
    secondary: cn('bg-transparent border cursor-pointer', onDark ? 'text-on-dark border-white/20' : 'text-ink border-hairline-strong'),
    ghost: cn('bg-transparent cursor-pointer', onDark ? 'text-on-dark' : 'text-ink'),
    link: 'bg-transparent text-brand-green-dark font-medium p-0 min-h-0 cursor-pointer',
    destructive: 'bg-danger text-white cursor-pointer',
  };
  const dim = disabled && variant !== 'primary' ? 'opacity-55 cursor-not-allowed' : '';
  const useSize = variant !== 'link' && variant !== 'ghost';
  return (
    <button type="button" disabled={disabled}
      className={cn(base, useSize && sizes[size], shape, variants[variant], dim, className)}
      {...rest}>
      {leadingIcon}{children}{trailingIcon}
    </button>
  );
}

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

/** Form field label. */
export function Label({ required = false, className, children, ...rest }: LabelProps) {
  return (
    <label className={cn('inline-block font-sans text-sm font-medium text-ink mb-1.5', className)} {...rest}>
      {children}{required && <span className="text-danger ml-[3px]">*</span>}
    </label>
  );
}

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  invalid?: boolean;
  size?: 'md' | 'lg';
}

/** 44px text field; focus deepens border to forest green. */
export function Input({ size = 'md', invalid = false, className, ...rest }: InputProps) {
  const h = size === 'lg' ? 'h-14' : 'h-11';
  const border = invalid
    ? 'border border-danger'
    : 'border border-hairline-strong focus:border-2 focus:border-brand-green-dark focus:px-[15px]';
  return (
    <input
      className={cn('box-border w-full px-4 font-sans text-base text-ink bg-canvas rounded-input outline-none transition-[border] duration-base ease-standard placeholder:text-stone', h, border, className)}
      {...rest}
    />
  );
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

/** Multiline field matching Input styling. */
export function Textarea({ invalid = false, rows = 4, className, ...rest }: TextareaProps) {
  const border = invalid
    ? 'border border-danger'
    : 'border border-hairline-strong focus:border-2 focus:border-brand-green-dark focus:px-[15px] focus:py-[11px]';
  return (
    <textarea rows={rows}
      className={cn('box-border w-full px-4 py-3 font-sans text-base leading-relaxed text-ink bg-canvas rounded-input outline-none resize-y transition-[border] duration-base ease-standard placeholder:text-stone', border, className)}
      {...rest}
    />
  );
}

export interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  label?: React.ReactNode;
  onChange?: (checked: boolean) => void;
  className?: string;
}

/** Square check; brand-green fill when selected. */
export function Checkbox({ checked = false, disabled = false, label, onChange, className }: CheckboxProps) {
  return (
    <label className={cn('inline-flex items-center gap-2.5', disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer', className)}>
      <span onClick={() => !disabled && onChange && onChange(!checked)}
        className={cn('w-5 h-5 flex-none rounded-tag inline-flex items-center justify-center transition-[background] duration-base ease-standard',
          checked ? 'bg-brand-green' : 'bg-canvas border border-hairline-strong')}>
        {checked && (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--on-primary)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
      {label && <span className="font-sans text-sm text-ink">{label}</span>}
    </label>
  );
}

export type Option = string | { value: string; label: string };

export interface RadioGroupProps {
  value?: string;
  options?: Option[];
  onChange?: (value: string) => void;
  name?: string;
  className?: string;
}

/** Single-select rows; brand-green dot when selected. */
export function RadioGroup({ value, options = [], onChange, className }: RadioGroupProps) {
  return (
    <div role="radiogroup" className={cn('flex flex-col gap-3', className)}>
      {options.map((opt) => {
        const val = typeof opt === 'string' ? opt : opt.value;
        const lbl = typeof opt === 'string' ? opt : opt.label;
        const selected = val === value;
        return (
          <label key={val} className="inline-flex items-center gap-2.5 cursor-pointer">
            <span onClick={() => onChange && onChange(val)}
              className={cn('w-5 h-5 flex-none rounded-full box-border bg-canvas transition-[border] duration-base ease-standard',
                selected ? 'border-[6px] border-brand-green' : 'border border-hairline-strong')} />
            <span className="font-sans text-sm text-ink">{lbl}</span>
          </label>
        );
      })}
    </div>
  );
}

export interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  ariaLabel?: string;
  className?: string;
}

/** Pill toggle; brand-green track when on. */
export function Switch({ checked = false, disabled = false, onChange, ariaLabel = 'Toggle setting', className }: SwitchProps) {
  return (
    <button type="button" role="switch" aria-checked={checked} disabled={disabled}
      aria-label={ariaLabel}
      onClick={() => !disabled && onChange && onChange(!checked)}
      className={cn('w-11 h-[26px] flex-none p-[3px] rounded-pill inline-flex items-center transition-[background] duration-base ease-standard',
        checked ? 'bg-brand-green' : 'bg-hairline-strong', disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer', className)}>
      <span className={cn('w-5 h-5 rounded-full bg-white shadow-e1 transition-transform duration-base ease-standard', checked ? 'translate-x-[18px]' : 'translate-x-0')} />
    </button>
  );
}

interface SelectBaseProps {
  options?: Option[];
  placeholder?: string;
  ariaLabel?: string;
  disabled?: boolean;
  size?: 'md' | 'lg';
  searchable?: boolean | 'auto';
  searchThreshold?: number;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
}

export interface SelectSingleProps extends SelectBaseProps {
  multiple?: false;
  value?: string;
  onChange?: (value: string) => void;
}

export interface SelectMultiProps extends SelectBaseProps {
  multiple: true;
  value?: string[];
  onChange?: (value: string[]) => void;
}

export type SelectProps = SelectSingleProps | SelectMultiProps;

/** Custom dropdown with popover and listbox. */
export function Select(props: SelectSingleProps): React.JSX.Element;
export function Select(props: SelectMultiProps): React.JSX.Element;
export function Select({
  options = [],
  value,
  onChange,
  multiple = false,
  placeholder = 'Select...',
  ariaLabel,
  disabled = false,
  size = 'md',
  searchable = 'auto',
  searchThreshold = 8,
  searchPlaceholder = 'Search options...',
  emptyText = 'No options found',
  className,
}: SelectProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const ref = React.useRef<HTMLDivElement>(null);
  const searchRef = React.useRef<HTMLInputElement>(null);
  const norm = React.useMemo(() => options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o)), [options]);
  const selectedValues = React.useMemo(() => {
    if (multiple) return Array.isArray(value) ? value : [];
    return typeof value === 'string' ? [value] : [];
  }, [multiple, value]);
  const selectedSet = React.useMemo(() => new Set(selectedValues), [selectedValues]);
  const current = norm.find((o) => o.value === selectedValues[0]);
  const selectedOptions = React.useMemo(() => norm.filter((o) => selectedSet.has(o.value)), [norm, selectedSet]);
  const displayLabel = multiple
    ? selectedOptions.length > 0
      ? selectedOptions.map((o) => o.label).join(', ')
      : placeholder
    : current?.label ?? placeholder;
  const shouldSearch = searchable === true || (searchable === 'auto' && norm.length > searchThreshold);
  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!shouldSearch || !q) return norm;
    return norm.filter((o) => `${o.label} ${o.value}`.toLowerCase().includes(q));
  }, [norm, query, shouldSearch]);
  const h = size === 'lg' ? 'h-14' : 'h-11';

  React.useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  React.useEffect(() => {
    if (!open) {
      setQuery('');
      return;
    }
    if (shouldSearch) window.requestAnimationFrame(() => searchRef.current?.focus());
  }, [open, shouldSearch]);

  const pick = (v: string) => {
    if (multiple) {
      const next = selectedSet.has(v) ? selectedValues.filter((item) => item !== v) : [...selectedValues, v];
      (onChange as ((value: string[]) => void) | undefined)?.(next);
      return;
    }
    (onChange as ((value: string) => void) | undefined)?.(v);
    setOpen(false);
    setQuery('');
  };

  return (
    <div ref={ref} className={cn('relative w-full', className)}>
      <button type="button" disabled={disabled} aria-haspopup="listbox" aria-expanded={open}
        aria-label={ariaLabel ?? displayLabel}
        onClick={() => !disabled && setOpen((o) => !o)}
        className={cn('w-full box-border flex items-center justify-between gap-2.5 pl-4 pr-3.5 text-left font-sans text-base bg-canvas rounded-input outline-none transition-[border] duration-base ease-standard',
          h, selectedOptions.length > 0 || current ? 'text-ink' : 'text-steel',
          open ? 'border-2 border-brand-green-dark' : 'border border-hairline-strong',
          disabled ? 'opacity-55 cursor-not-allowed' : 'cursor-pointer')}>
        <span className="overflow-hidden text-ellipsis whitespace-nowrap">{displayLabel}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--steel)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className={cn('flex-none transition-transform duration-base ease-standard', open && 'rotate-180')}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-[calc(100%+6px)] left-0 right-0 z-[60] bg-canvas rounded-input border border-hairline shadow-e4 p-1.5 font-sans">
          {shouldSearch && (
            <div className="p-1">
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                className="box-border h-10 w-full rounded-chip border border-hairline-strong bg-canvas px-3 font-sans text-sm text-ink outline-none transition-[border] duration-base ease-standard placeholder:text-stone focus:border-2 focus:border-brand-green-dark focus:px-[11px]"
              />
            </div>
          )}
          <div role="listbox" aria-multiselectable={multiple || undefined} className="max-h-[280px] overflow-y-auto">
            {filtered.map((o) => {
              const active = selectedSet.has(o.value);
              return (
                <button key={o.value} type="button" role="option" aria-selected={active} onClick={() => pick(o.value)}
                  className={cn('w-full flex items-center justify-between gap-2.5 py-[9px] px-3 rounded-chip text-ink text-sm text-left cursor-pointer',
                    active ? 'bg-surface-feature' : 'bg-transparent hover:bg-surface')}>
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap">{o.label}</span>
                  {active && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--brand-green-dark)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="flex-none">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              );
            })}
            {filtered.length === 0 && (
              <div role="status" className="px-3 py-4 text-sm text-steel">{emptyText}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export interface SliderProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}

/** Range control; the inline gradient reflects the current live value. */
export function Slider({ value = 50, min = 0, max = 100, step = 1, onChange, disabled = false, ariaLabel = 'Range value', className }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <input type="range" value={value} min={min} max={max} step={step} disabled={disabled}
      aria-label={ariaLabel}
      onChange={(e) => onChange && onChange(Number(e.target.value))}
      className={cn('w-full h-1.5 rounded-pill appearance-none outline-none', disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer', className)}
      style={{ background: `linear-gradient(to right, var(--brand-green) 0%, var(--brand-green) ${pct}%, var(--hairline) ${pct}%, var(--hairline) 100%)` }}
    />
  );
}
