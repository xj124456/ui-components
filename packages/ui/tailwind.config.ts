/* This package's own Tailwind config is used to scan the library class strings.
 * Consumers do not import this file; they add daxiongPreset to their own config. */
import type { Config } from 'tailwindcss';
import daxiongPreset from './tailwind-preset';

export default {
  presets: [daxiongPreset],
  content: ['./src/**/*.{ts,tsx}'],
  plugins: [],
} satisfies Config;