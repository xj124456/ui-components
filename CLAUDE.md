# Claude Code Instructions

本项目使用 Daxiong UI。Claude Code 处理任何 UI 相关任务前，必须先阅读并遵守：

- `AGENTS.md`
- `docs/design-system-reference.md`

核心原则：

- 优先从 `@daxiong/ui` 导入组件。
- 必须加载 `@daxiong/ui/styles.css` 和 `@daxiong/ui/tailwind-preset`。
- `@daxiong/ui` 是本地内部包，没有发布到 npm registry；目标项目应通过 `file:` 路径引入。
- 不要推荐 `npm install @daxiong/ui`。
- 不要默认推荐 `workspace:*`，除非 UI 包真的在同一个 pnpm workspace 内部。
- 不要重写已有组件，不要绕过 token 手写随机颜色、圆角、阴影。
- UI 气质保持内部 product / SaaS / admin 工具风格：清爽、专业、工程感强，信息层级清晰。
