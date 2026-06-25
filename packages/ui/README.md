# @daxiong/ui

组织内部使用的 React + Tailwind + TypeScript 组件库，提供 typed primitives、design tokens 和 Tailwind preset。

这个包不发布到 npm registry，只通过本地 `file:` 路径引入。

## 结构

```text
src/
  index.ts
  utils/cn.ts
  forms.tsx
  feedback.tsx
  layout.tsx
  overlay.tsx
  navigation.tsx
  brand.tsx
  styles/
tailwind-preset.ts
tailwind.config.ts
```

## 构建

```bash
npm install
npm run typecheck
npm run build
```

`npm run build` 输出 `dist/index.js` 和 `dist/index.d.ts`。

## 在上级项目使用

不要执行：

```bash
npm install @daxiong/ui
```

这个包没有发布到 npm registry。

推荐在业务包 `package.json` 里写本地 `file:` 依赖。路径按这个 `package.json` 所在目录计算。

```json
{
  "dependencies": {
    "@daxiong/ui": "file:../../../ui-components/packages/ui"
  }
}
```

如果依赖写在项目根目录 `package.json`，通常是：

```json
{
  "dependencies": {
    "@daxiong/ui": "file:../ui-components/packages/ui"
  }
}
```

然后在目标项目根目录运行：

```bash
pnpm install
```

`workspace:*` 只适合 UI 包真的处在同一个 pnpm workspace 内部的情况，不是默认推荐方式。

## 使用

```ts
import '@daxiong/ui/styles.css';
```

```ts
import daxiongPreset from '@daxiong/ui/tailwind-preset';

export default {
  presets: [daxiongPreset],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@daxiong/ui/dist/**/*.js',
  ],
};
```

```tsx
import { Button, Card, InternalMark } from '@daxiong/ui';
```
