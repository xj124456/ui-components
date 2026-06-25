import type { Config } from 'tailwindcss';
import daxiongPreset from '@daxiong/ui/tailwind-preset';

export default {
  presets: [daxiongPreset],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    './node_modules/@daxiong/ui/dist/**/*.js',
  ],
} satisfies Config;

