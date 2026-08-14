# TypeScript 全栈课程（C#/Java 迁移）

> 为精通 C# / Java 的后端开发者设计的 15 课完整学习路线：从类型系统到全栈生态，每课 15-20 分钟，概念对照 C#/Java，含可运行练习与测验。

📖 **在线阅读**：https://www.huangziheng.com/typescript-learn/ （GitHub Pages 托管，随时看）

---

## 课程概览

### 阶段一：语言核心（0001-0011）

| 课 | 主题 | 核心收获 |
|---|---|---|
| 0001 | 让 TypeScript 跑起来 | 环境搭建、类型擦除心智模型、编译管线 |
| 0002 | 结构类型 | TS 与 C#/Java 最根本的类型系统差异 |
| 0003 | 联合类型与类型收窄 | 字面量联合、可辨识联合、穷尽性检查 |
| 0004 | null、undefined 与严格空检查 | 两个"空"、可选链、空值合并 |
| 0005 | 泛型 | 运行时擦除、extends 约束 |
| 0006 | 函数与对象类型 | 函数类型、重载、readonly、索引签名 |
| 0007 | 类与继承的 TS 细节 | 参数属性、两种 private、装饰器 |
| 0008 | 异步与 Promise | async/await、fetch 错误模型 |
| 0009 | 模块系统与工程配置 | import/export、CJS vs ESM、tsconfig |
| 0010 | 类型安全实战项目 | 从零搭 Todo API（里程碑） |
| 0011 | 进阶类型（类型编程） | keyof、映射类型、条件类型、infer |

### 阶段二：生态四层（0012-0015）

| 课 | 主题 | 生态层 |
|---|---|---|
| 0012 | npm 与 npx | 工具层（装包） |
| 0013 | Node.js 运行时 | 运行时层（跑 JS） |
| 0014 | Vite 构建工具 | 构建层（打包） |
| 0015 | React 全景 | 框架层（界面） |

## 目录结构

```
.
├── index.html              # 课程首页（导航）
├── lessons/                # 15 课（HTML，可打印）
│   ├── 0001-hello-typescript.html
│   └── ... 0015-react.html
├── reference/              # 参考文档
│   ├── glossary.html       # 术语表（C#/Java 对照）
│   └── ecosystem-map.html  # 生态地图（四层全景）
├── assets/                 # 共享组件
│   ├── lesson.css          # 共享样式表
│   └── quiz.js             # 测验组件
├── code/                   # 可运行示例（各课配套）
│   ├── src/                # 语言核心示例
│   ├── todo-api/           # 第 10 课：Todo API 后端
│   ├── todo-web/           # 第 15 课：React 前端（全栈闭环）
│   └── demo-vite/          # 第 14 课：Vite 示例
├── learning-records/       # 学习记录（0001-0015）
├── MISSION.md              # 教学使命
├── RESOURCES.md            # 学习资源清单
└── NOTES.md                # 教学笔记
```

## 快速开始

### 在线阅读课程

打开 https://www.huangziheng.com/typescript-learn/ 或本地打开 `index.html`。

### 运行示例代码

```bash
cd code
npm install          # 安装依赖
npx tsc && node dist/hello.js   # 跑第 1 课示例
```

### 跑全栈项目（第 10 + 15 课）

```bash
# 终端 1：后端
cd code/todo-api && npm install && npm start        # localhost:3000

# 终端 2：前端
cd code/todo-web && npm install && npm run dev      # localhost:5173
```

浏览器打开 localhost:5173，即可看到 React 前端调用 Todo API 的全栈闭环。

### 回调顺序实验（事件循环）

```bash
cd code && npx tsc && node dist/event-loop-lab.js
```

先读 `src/event-loop-lab.ts` 预测输出顺序，再运行对照（答案在文件末尾注释）。

## 学习方式

- **概念对照**：每个概念都映射到 C#/Java 的已知概念，聚焦差异
- **短课制**：每课 15-20 分钟，一次一个主题
- **动手验证**：每课配 code/ 可运行示例 + 挑战练习
- **测验反馈**：内嵌交互式测验，即时反馈

## 贡献与使用

本仓库是个人学习档案，欢迎 fork 自用。新增课程时：

1. 在 `lessons/` 创建 `0016-xxx.html`（复用 `assets/lesson.css` 与 `assets/quiz.js`）
2. 更新 `index.html` 课程列表
3. push 到 main，GitHub Pages 自动重新部署

## License

MIT
