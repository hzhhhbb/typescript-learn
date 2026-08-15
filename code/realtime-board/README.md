# 📋 实时活动看板（Realtime Board）

前后端一体的 TypeScript 实战项目——Monorepo 共享类型 + SSE 实时推送。

## 快速开始

```bash
npm install
npm run dev        # 一键启动前后端
```

- 前端：http://localhost:5174 （React + Vite）
- 后端：http://localhost:3001 （Node + tsx，SSE 广播）

浏览器打开页面，点"发送 / 文件事件 / 告警"——所有在线页面实时收到推送（开两个标签页试试）。

## 架构

```
┌─ web（React, :5174）─────────────────────────┐
│  EventSource 订阅 /events（SSE 单向推送）      │
│  fetch POST /events（发布事件）                │
└───────────────┬──────────────────────────────┘
                │
┌───────────────▼──────────────────────────────┐
│ shared/types.ts（@board/shared 共享类型）      │
│  BoardEvent 可辨识联合：message / file / alert │
└───────────────┬──────────────────────────────┘
                │
┌───────────────▼──────────────────────────────┐
│ server（Node + tsx, :3001）                   │
│  GET  /events → SSE 长连接集合广播             │
│  POST /events → 运行时校验 → 收窄处理 → 广播    │
└──────────────────────────────────────────────┘
```

## 覆盖的概念（对应课程）

| 概念 | 位置 |
|---|---|
| 可辨识联合 + 收窄 | `shared/types.ts`、`server/src/handle.ts`、`web/src/App.tsx` |
| 共享类型（Monorepo） | npm workspaces + `@board/shared` |
| 分布式 Omit（类型编程） | `NewEventInput`（注意：直接 `Omit<联合>` 会破坏分支，TS2353） |
| SSE 流式推送 | `text/event-stream` + `Set<ServerResponse>` |
| 运行时校验（类型管不到网络） | `isNewEventInput` 类型守卫 |
| 事件驱动异步 | `req.on("data"/"end")`、`fetch` |
| CORS | 跨端口访问控制 |
| React hooks | `useState` + `useEffect`（SSE 订阅/清理） |

## 命令

| 命令 | 作用 |
|---|---|
| `npm run dev` | 一键启动前后端（concurrently） |
| `npm run dev:server` | 只启动后端（tsx watch 热重载） |
| `npm run dev:web` | 只启动前端（vite dev server） |
| `npm run build` | 前端类型检查 + 打包 |

## 练习挑战

1. 新增一种事件类型（如 `{ kind: "task" }`）——穷尽性检查会强制你改完所有地方
2. 按 kind 过滤推送（房间概念）
3. SSE 心跳保活（`: ping` 注释行）
