/* ============================================================================
 * Daxiong UI â€?Tailwind preset
 * ----------------------------------------------------------------------------
 * Maps Tailwind utility names onto the brand CSS variables (defined in
 * src/styles/*.css). Consumers add ONE line to their own tailwind config:
 *
 *   import daxiongPreset from '@daxiong/ui/tailwind-preset';
 *   export default { presets: [daxiongPreset], content: [...] };
 *
 * Editing a token in the CSS updates every utility - no value is duplicated
 * here except the type scale primitives Tailwind can't read from CSS.
 * ========================================================================== */

import type { Config } from 'tailwindcss';

export const daxiongPreset = {
  theme: {
    extend: {
      colors: {
        'brand-green':       'var(--brand-green)',
        'brand-green-dark':  'var(--brand-green-dark)',
        'brand-green-mid':   'var(--brand-green-mid)',
        'brand-green-soft':  'var(--brand-green-soft)',
        'brand-teal-deep':   'var(--brand-teal-deep)',
        'brand-teal':        'var(--brand-teal)',
        'brand-teal-mid':    'var(--brand-teal-mid)',
        'accent-purple':     'var(--accent-purple)',
        'accent-orange':     'var(--accent-orange)',
        'accent-pink':       'var(--accent-pink)',
        'accent-blue':       'var(--accent-blue)',
        canvas:              'var(--canvas)',
        'canvas-dark':       'var(--canvas-dark)',
        surface:             'var(--surface)',
        'surface-soft':      'var(--surface-soft)',
        'surface-feature':   'var(--surface-feature)',
        hairline:            'var(--hairline)',
        'hairline-soft':     'var(--hairline-soft)',
        'hairline-strong':   'var(--hairline-strong)',
        ink:                 'var(--ink)',
        charcoal:            'var(--charcoal)',
        slate:               'var(--slate)',
        steel:               'var(--steel)',
        stone:               'var(--stone)',
        muted:               'var(--muted)',
        'on-dark':           'var(--on-dark)',
        'on-primary':        'var(--on-primary)',
        'primary-pressed':   'var(--primary-pressed)',
        'warning-bg':        'var(--warning-bg)',
        'warning-text':      'var(--warning-text)',
        danger:              'var(--danger)',
        'danger-bg':         'var(--danger-bg)',
        info:                'var(--info)',
        'info-bg':           'var(--info-bg)',
        success:             'var(--success)',
        'success-bg':        'var(--success-bg)',
        // shadcn-compatible semantic aliases
        background:          'var(--background)',
        foreground:          'var(--foreground)',
        primary:             'var(--primary)',
        'primary-foreground':'var(--primary-foreground)',
        secondary:           'var(--secondary)',
        border:              'var(--border)',
        ring:                'var(--ring)',
      },
      fontFamily: {
        sans:    ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono:    ['"Source Code Pro"', '"SF Mono"', 'Menlo', 'Consolas', 'monospace'],
      },
      borderRadius: {
        tag: '4px', chip: '6px', input: '8px', card: '12px', panel: '16px', showcase: '24px', pill: '9999px',
      },
      boxShadow: {
        e1: '0px 1px 2px 0px rgba(0,30,43,0.04)',
        e2: '0px 4px 12px 0px rgba(0,30,43,0.08)',
        e3: '0px 12px 24px -4px rgba(0,30,43,0.12)',
        e4: '0px 16px 48px -8px rgba(0,30,43,0.16)',
        feature: '0px 8px 24px -6px rgba(0,104,74,0.18)',
      },
      transitionTimingFunction: { standard: 'cubic-bezier(0.4, 0, 0.2, 1)' },
      transitionDuration: { fast: '120ms', base: '170ms', slow: '240ms' },
      maxWidth: { container: '1280px' },
      letterSpacing: { display: '-1px', hero: '-1.5px', micro: '1px' },
    },
  },
} satisfies Partial<Config>;

export default daxiongPreset;
