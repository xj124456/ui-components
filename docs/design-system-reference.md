# Daxiong UI Reference

这份文档给人和 coding agent 一起看。目标是让 `D:\Projects` 上级目录里的各个项目使用同一套组件和视觉规则，而不是每个项目各写一套 UI。

## 一句话定位

Daxiong UI 是组织内部的 React + Tailwind + TypeScript 设计系统，适合 product dashboard、SaaS 后台、表单流程、资源页、定价页和开发者工具界面。

它不是发布到 npm 的公共包，也不是任何第三方品牌的复制。

## 包位置和安装事实

组件包目录：

```text
D:\Projects\ui-components\packages\ui
```

包名：

```text
@daxiong/ui
```

这个包没有发布到 npm registry，所以不能直接执行：

```bash
npm install @daxiong/ui
```

推荐用本地 `file:` 依赖。路径按写依赖的那个 `package.json` 所在目录计算。

业务包在 `apps/admin/package.json` 这类目录里时，通常写：

```json
{
  "dependencies": {
    "@daxiong/ui": "file:../../../ui-components/packages/ui"
  }
}
```

依赖写在项目根目录 `package.json` 时，通常写：

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

`workspace:*` 不是默认接入方式。只有 UI 包真的处在同一个 pnpm workspace 内部时，才可以使用 `workspace:*`。

## 使用方式

组件入口：

```tsx
import {
  Button,
  Card,
  Badge,
  Alert,
  Dialog,
  PricingCard,
} from '@daxiong/ui';
```

样式入口：

```ts
import '@daxiong/ui/styles.css';
```

Tailwind preset：

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

## 设计 token

### 主色

- `brand-green`: 核心 CTA、选中态、进度条。
- `brand-green-dark`: 链接、focus、check icon、强调文字。
- `brand-green-soft`: 成功状态、头像底、featured tint。
- `brand-teal-deep`: 深色 hero、footer、code mockup、tooltip 暗底。
- `brand-teal`: 辅助深绿。

### 中性色

- `canvas`: 页面和卡片白底。
- `surface`: 浅灰背景。
- `surface-soft`: 更浅的面。
- `hairline`: 边框线。
- `ink`: 主文字。
- `slate`, `steel`, `stone`, `muted`: 次级文字和弱化内容。

### Accent 色

- `accent-purple`
- `accent-orange`
- `accent-pink`
- `accent-blue`

这些只用于分类标签、资源卡片、少量语义区分。不要拿它们做大面积背景。

## 字体和排版

- 主字体：`Plus Jakarta Sans`
- 代码字体：`Source Code Pro`
- 标题用 `font-display`，正文用 `font-sans`，代码用 `font-mono`。
- 控制台和工具界面不要滥用 hero 字号。
- 除了设计系统已有 token，不要随手加负 `letter-spacing`。

## 圆角和阴影

- `rounded-tag`: 小标签。
- `rounded-chip`: badge、小菜单项。
- `rounded-input`: 输入框、select、alert。
- `rounded-card`: 普通卡片。
- `rounded-panel`: dialog / popover 大面板。
- `rounded-pill`: CTA、toggle、pagination active。
- 默认界面偏平，只有浮层、hover、featured 区块才使用明显阴影。

## 组件清单

### Forms

- `Button`: primary / secondary / ghost / link / destructive，size: sm / md / lg。
- `Label`: 表单 label，可显示 required 星号。
- `Input`: 44px 默认高度，focus 用深绿。
- `Textarea`: 多行输入，和 Input 同一套边框 focus。
- `Checkbox`: 亮绿选中态。
- `RadioGroup`: 亮绿选中圆点。
- `Switch`: pill toggle，开启时亮绿。
- `Select`: 自定义 dropdown。选项很多时默认会自动显示搜索框；可用 `searchable={true}` 强制开启，`searchable={false}` 关闭，`searchThreshold` 调整自动触发阈值；传 `multiple` 时支持多选，`value` / `onChange` 使用 `string[]`。
- `Slider`: 亮绿进度轨。

### Feedback

- `Badge`: 状态和分类标签。
- `Alert`: 页面内提示。
- `Toast`: 临时通知。
- `Progress`: 进度条。
- `Skeleton`: loading 占位。
- `Tooltip`: 小型说明浮层。

### Layout

- `Card`: base / feature / dark / soft。
- `Separator`: 分割线。
- `Tabs`: segmented / pill。
- `Accordion`: FAQ 或折叠面板。
- `Avatar`: 用户头像或 initials。

### Overlay

- `Dialog`: modal。
- `DropdownMenu`: 菜单。
- `Popover`: 小浮层。

### Navigation

- `Breadcrumb`: 路径导航。
- `Pagination`: 分页。

### Brand Utilities

- `InternalMark`: 中性内部标识，不包含第三方商标。
- `CodeMockup`: 深色代码展示卡。
- `PricingCard`: 定价卡。
- `CourseCard`: 资源/课程卡。
- `PromoBanner`: 顶部通知条。

## AI 生成 UI 时的工作流

1. 先确认目标项目是否已经通过 `file:` 引入 `@daxiong/ui`。
2. 检查 app root 是否导入 `@daxiong/ui/styles.css`。
3. 检查 Tailwind config 是否使用 `daxiongPreset`。
4. 写页面时先从组件库选组件。
5. 只有组件库没有覆盖时，才用 Tailwind token 组合新局部 UI。
6. 新增可复用模式时，优先回到组件库扩展组件。

## 不能做的事

- 不能把按钮写成随机 `bg-green-500 rounded-lg`。
- 不能自己实现和 `Dialog` / `Select` / `Card` / `Button` 重复的组件。
- 不能大面积使用渐变、玻璃拟态、霓虹色。
- 不能把 accent 色当品牌主色。
- 不能改 token 来满足单个页面的局部需求。
- 不能使用任何第三方商标、vendor logo 或品牌图形。

## 推荐给目标项目的提示词

```md
你正在这个项目里实现 UI。项目必须遵循 Daxiong UI。

先阅读：
- path/to/ui-components/AGENTS.md
- path/to/ui-components/docs/design-system-reference.md

实现时：
- 优先从 `@daxiong/ui` 导入组件。
- 使用 `@daxiong/ui/styles.css` 和 `@daxiong/ui/tailwind-preset`。
- 注意 `@daxiong/ui` 是本地内部包，不在 npm registry 上；请通过 `file:` 路径引入。
- 不要重写已有组件。
- 不要硬编码随机颜色、圆角、阴影。
- 保持内部 product / SaaS / admin 工具风格：清爽、专业、工程感强。
```
