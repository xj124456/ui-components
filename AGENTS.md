# Daxiong UI Agent Rules

这些规则给 Codex、Claude Code 和其他 coding agent 使用。只要目标项目声明使用 Daxiong UI，UI 开发必须先遵守这里，再看具体业务需求。

## 定位

Daxiong UI 是组织内部的 product / SaaS / admin / developer tool 设计系统。整体气质应该是：

- 专业、清爽、工程感强。
- 信息密度适中，适合控制台、定价页、资源页、表单和弹窗。
- 以白色、浅灰、深墨绿和亮绿为主，不做花哨营销视觉。
- 交互控件要干净、明确、可扫描。

## 安装事实

- 包名是 `@daxiong/ui`。
- 这是本地内部包，没有发布到 npm registry。
- 不要让用户执行 `npm install @daxiong/ui`。
- 推荐在业务包 `package.json` 里使用 `file:` 依赖，路径按这个 `package.json` 所在目录计算。

常见写法：

```json
{
  "dependencies": {
    "@daxiong/ui": "file:../../../ui-components/packages/ui"
  }
}
```

如果依赖写在 `D:\Projects\your-app\package.json` 这种项目根目录里，通常是：

```json
{
  "dependencies": {
    "@daxiong/ui": "file:../ui-components/packages/ui"
  }
}
```

不要默认推荐 `workspace:*`。只有 UI 包真的处在同一个 pnpm workspace 内部时，才可以考虑 `workspace:*`。

## 强制使用

- React UI 优先从 `@daxiong/ui` 导入组件。
- Tailwind 必须加载 `@daxiong/ui/tailwind-preset`。
- 应用入口必须加载 `@daxiong/ui/styles.css`。
- 颜色、圆角、阴影、字体优先使用库里的 token 和 utility，不要手写临时 `hex`、`box-shadow`、`font-family`。
- 已有组件能覆盖需求时，不要重新实现一套视觉相似的组件。

## 组件优先级

- Forms: `Button`, `Label`, `Input`, `Textarea`, `Checkbox`, `RadioGroup`, `Switch`, `Select`, `Slider`
- Feedback: `Badge`, `Alert`, `Toast`, `Progress`, `Skeleton`, `Tooltip`
- Layout: `Card`, `Separator`, `Tabs`, `Accordion`, `Avatar`
- Overlay: `Dialog`, `DropdownMenu`, `Popover`
- Navigation: `Breadcrumb`, `Pagination`
- Brand utilities: `InternalMark`, `CodeMockup`, `PricingCard`, `CourseCard`, `PromoBanner`

## 风格规则

- 主 CTA 用 `Button variant="primary"`，亮绿 pill 是核心识别点。
- 次级操作用 `secondary` 或 `ghost`，不要滥用亮绿。
- 正文背景默认 `bg-canvas text-ink font-sans`。
- 暗色区块用 `bg-brand-teal-deep text-on-dark`。
- 卡片默认用 `Card`，不要在卡片里再套一层装饰性卡片。
- 表单高度、圆角、focus 样式沿用 `Input` / `Select` / `Textarea`。
- 状态提示用 `Alert` / `Toast` / `Badge`，不要临时拼色块。
- 分类标签才使用 purple / orange / pink / blue 这些 accent 色。
- 不要使用任何第三方商标、vendor logo 或品牌图形。

## 修改组件库时

- 组件包源码在 `packages/ui`。
- 样式 token 的单一来源是 `packages/ui/src/styles/*.css`。
- Tailwind utility 名称由 `packages/ui/tailwind-preset.ts` 映射。
- 新组件要从 `packages/ui/src/index.ts` 导出。
- 修改后运行：

```bash
cd packages/ui
npm run typecheck
npm run build
```

## 浏览器验证

需要做浏览器端验证、页面操作、截图、网络检查或性能分析时，优先用 Chrome DevTools MCP。不要用 `browser-harness`。
