import * as React from 'react';
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { Select } from './forms';

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.restoreAllMocks();
});

function render(ui: React.ReactElement) {
  act(() => {
    root.render(ui);
  });
}

function keyDown(element: Element, key: string) {
  act(() => {
    element.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
  });
}

describe('Select', () => {
  test('selects the first matching option from the keyboard', () => {
    const onChange = vi.fn();
    render(
      <Select
        ariaLabel="Project"
        value=""
        onChange={onChange}
        options={['Alpha', 'Beta', 'Gamma']}
      />,
    );

    const trigger = document.querySelector('button[aria-haspopup="listbox"]');
    expect(trigger).not.toBeNull();

    keyDown(trigger!, 'g');

    expect(onChange).toHaveBeenCalledWith('Gamma');
  });

  test('shows all selected labels when a multi select has enough width', async () => {
    render(
      <Select
        ariaLabel="Teams"
        multiple
        value={['alpha', 'beta', 'gamma']}
        options={[
          { value: 'alpha', label: 'Alpha' },
          { value: 'beta', label: 'Beta' },
          { value: 'gamma', label: 'Gamma' },
        ]}
      />,
    );

    const trigger = document.querySelector('button[aria-haspopup="listbox"]') as HTMLButtonElement;
    Object.defineProperty(trigger, 'clientWidth', { configurable: true, value: 420 });

    act(() => window.dispatchEvent(new Event('resize')));
    await act(async () => {});

    expect(trigger.textContent).toContain('Alpha');
    expect(trigger.textContent).toContain('Beta');
    expect(trigger.textContent).toContain('Gamma');
    expect(trigger.textContent).not.toContain('+');
  });

  test('shows a count only for multi select labels that do not fit', async () => {
    render(
      <Select
        ariaLabel="Teams"
        multiple
        value={['alpha', 'beta', 'gamma']}
        options={[
          { value: 'alpha', label: 'Alpha' },
          { value: 'beta', label: 'Beta' },
          { value: 'gamma', label: 'Gamma' },
        ]}
      />,
    );

    const trigger = document.querySelector('button[aria-haspopup="listbox"]') as HTMLButtonElement;
    Object.defineProperty(trigger, 'clientWidth', { configurable: true, value: 140 });

    act(() => window.dispatchEvent(new Event('resize')));
    await act(async () => {});

    expect(trigger.textContent).toContain('Alpha');
    expect(trigger.textContent).toContain('+2');
    expect(trigger.textContent).not.toContain('Beta');
    expect(trigger.textContent).not.toContain('Gamma');
  });
});
