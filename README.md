# 邻里互助站 —— 校园物资共享与生活帮扶平台

## 项目背景

校园中常见闲置物品浪费、临时生活物资短缺、学习资料分散、日常求助响应慢等问题。邻里互助站面向校园师生，提供闲置物品共享、学习资料共享、生活物资互助、临时求助发布和公益帮扶招募能力，通过实名诚信、隐私脱敏和记录留痕，搭建更温暖、更高效的校园互助桥梁。

## 功能模块

- 首页 Dashboard：展示平台宣传语、核心数据、最近动态、积分排行榜和安全可信提示。
- 闲置物品共享：支持物品列表、发布、搜索、分类/类型筛选、申请联系、状态展示。
- 学习资料共享：支持资料发布、搜索、分类筛选、收藏、申请获取和模拟上传文件。
- 生活物资互助：支持发布物资求助、响应求助、完成互助和状态流转。
- 临时求助：支持搬东西、快递代取、失物寻找、临时打印、校园咨询等求助发布。
- 公益帮扶招募：支持活动列表、报名人数增加、进度条动画和志愿时长展示。
- 用户中心：展示实名信息、学号/手机号脱敏、诚信分、互助积分、我的申请和发布记录。
- 安全与诚信规则：展示实名认证、诚信积分、违规举报、安全交易、联系方式脱敏等规则。

## 技术栈

- React + Vite
- Tailwind CSS
- GSAP
- @gsap/react
- ScrollTrigger
- localStorage 持久化
- lucide-react 图标

## 项目结构

```text
neighbor-help-station/
├─ package.json
├─ index.html
├─ vite.config.js
├─ postcss.config.js
├─ tailwind.config.js
├─ README.md
├─ .gitignore
├─ .agents/skills/project-gsap-ui/SKILL.md
├─ public/
│  ├─ favicon.svg
│  └─ mock-images/
└─ src/
   ├─ data/
   ├─ constants/
   ├─ hooks/
   ├─ utils/
   ├─ animations/
   ├─ layout/
   ├─ components/
   └─ pages/
```

## 运行方式

```bash
npm install
npm run dev
```

## 项目亮点

- 校园真实场景：覆盖宿舍、图书馆、食堂、教学楼等高频互助场景。
- 闲置物品共享：支持交换、租借、赠送和诚信分门槛。
- 学习资料共享：支持课程资料发布、收藏和申请记录。
- 临时求助响应：支持紧急程度、地点、状态管理。
- 公益帮扶招募：报名人数和进度条即时变化。
- 实名诚信机制：用户中心展示诚信分、积分和互助记录。
- 隐私脱敏：手机号、学号、联系方式默认脱敏显示。
- localStorage 持久化：刷新页面后发布、收藏、报名、申请记录不丢失。
- GSAP 动画增强体验：页面切换、数字滚动、卡片 stagger reveal、ScrollTrigger、Modal 弹出、进度条、按钮微交互和 Sidebar active indicator。
