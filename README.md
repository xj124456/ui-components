# Daxiong UI

Daxiong UI 是组织内部使用的 React + Tailwind + TypeScript 组件库和设计系统文档站。它不是公开 npm 包，也不会发布到 npm registry；上级目录里的项目需要通过本地 `file:` 路径引入。

组件包位置：

```text
D:\Projects\ui-components\packages\ui
```

文档站位置：

```text
D:\Projects\ui-components\site
```

线上文档：

- https://ui.daxiong.site
- Cloudflare 默认预览域名只作为部署备用，不在页面里展示。

## 给上级项目引入

推荐在需要使用 UI 的业务包 `package.json` 里直接写本地 `file:` 依赖。路径按这个 `package.json` 所在目录计算。

如果业务包在 `D:\Projects\your-app\apps\admin\package.json`，通常写：

```json
{
  "dependencies": {
    "@daxiong/ui": "file:../../../ui-components/packages/ui"
  }
}
```

如果依赖写在项目根目录 `D:\Projects\your-app\package.json`，通常写：

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

不要执行：

```bash
npm install @daxiong/ui
```

这个包没有发布到 npm registry，直接从 registry 安装会失败。

## workspace 说明

不要默认使用 `"@daxiong/ui": "workspace:*"`。pnpm workspace 通常只稳定解析当前 workspace 根目录内部的包；把 `D:\Projects\ui-components\packages\ui` 作为外部目录加入别的 monorepo，经验证不可靠。

只有在你把 UI 包复制、移动，或用明确的内部机制放进同一个 monorepo workspace 后，才考虑使用 `workspace:*`。

## 项目里使用

在应用入口加载样式：

```ts
import '@daxiong/ui/styles.css';
```

在 Tailwind config 加 preset：

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

使用组件：

```tsx
import { Button, Card, Badge, InternalMark } from '@daxiong/ui';
```

## 给 AI 使用

目标项目的 `AGENTS.md` / `CLAUDE.md` 可以写：

```md
本项目 UI 必须遵循 Daxiong UI。

先阅读并遵守：
- path/to/ui-components/AGENTS.md
- path/to/ui-components/docs/design-system-reference.md

实现界面时优先从 `@daxiong/ui` 导入组件，不要重写已有组件。
注意：`@daxiong/ui` 是本地内部包，不在 npm registry 上；目标项目应通过 `file:` 路径引入。
```

## 本地验证

```bash
cd packages/ui
npm install
npm run typecheck
npm run build

cd ../../site
npm install
npm run build
```

## 文档站开发和部署

```bash
cd site
npm run dev
npm run build
npm run deploy
```
