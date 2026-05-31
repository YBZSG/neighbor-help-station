---
name: project-gsap-ui
description: 本项目的 GSAP UI 动画约束，适用于邻里互助站课程设计 Demo。
---

# Project GSAP UI Skill

- React 动画统一优先使用 `@gsap/react` 的 `useGSAP`。
- 动画插件只在 `src/animations/gsapSetup.js` 注册一次。
- 组件内通过 `ref` 和 `scope` 限定选择器作用域。
- 仅动画 `x`、`y`、`scale`、`rotation`、`autoAlpha`、`opacity` 等合成层友好的属性。
- 避免动画 `width`、`height`、`top`、`left`。
- 页面切换、卡片入场、数字滚动、弹窗、进度条、ScrollTrigger reveal 都应克制、清爽、服务信息层级。
- 尊重 `prefers-reduced-motion`，减少或跳过非必要动画。
