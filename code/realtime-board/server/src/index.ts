// index.ts —— 后端入口：HTTP + SSE 广播
// 覆盖概念：事件驱动异步（第 8 课）、空值处理（第 4 课）、运行时校验（第 10 课）、
//           CORS（第 15 课）、事件循环长连接（第 13 课）
import { createServer } from "node:http";
import type { ServerResponse } from "node:http";
import type { BoardEvent, NewEventInput } from "@board/shared";
import { processEvent, toDisplayText } from "./handle";

const PORT = 3001;

// ── SSE 客户端连接集合（Set 泛型，第 5 课） ──
const clients = new Set<ServerResponse>();

// ── 广播：把事件推给所有在线的 SSE 客户端 ──
function broadcast(event: BoardEvent): void {
  const payload = `data: ${JSON.stringify(event)}\n\n`;
  for (const client of clients) {
    client.write(payload);
  }
}

// ── 校验输入（运行时校验：类型系统管不到网络输入，第 10 课） ──
function isNewEventInput(value: unknown): value is NewEventInput {
  if (typeof value !== "object" || value === null) return false; // null 检查（第 4 课）
  const v = value as Record<string, unknown>;
  if (v.kind === "message") return typeof v.author === "string" && typeof v.text === "string";
  if (v.kind === "file") return typeof v.filename === "string" && typeof v.sizeBytes === "number";
  if (v.kind === "alert") {
    return (
      (v.level === "info" || v.level === "warning" || v.level === "critical") &&
      typeof v.text === "string"
    );
  }
  return false;
}

let nextId = 1;

const server = createServer((req, res) => {
  // CORS（第 15 课）：React dev server 在 5174
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // ── SSE 端点：建立长连接，保持打开，事件循环不阻塞（第 13 课） ──
  if (req.method === "GET" && req.url === "/events") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });
    res.write(`: connected (${clients.size + 1} 在线)\n\n`);
    clients.add(res);
    res.on("close", () => clients.delete(res)); // 客户端断开时清理（避免内存泄漏）
    return;
  }

  // ── 发布事件：读 body → 校验 → 补 id/at → 处理 → 广播 ──
  if (req.method === "POST" && req.url === "/events") {
    let raw = "";
    req.on("data", (chunk) => (raw += chunk)); // 事件驱动（第 8/13 课）
    req.on("end", () => {
      try {
        const parsed = JSON.parse(raw) as unknown;
        if (!isNewEventInput(parsed)) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "invalid event" }));
          return;
        }
        const event: BoardEvent = { ...parsed, id: nextId++, at: new Date().toISOString() };
        processEvent(event); // 可辨识联合收窄处理（第 3 课）
        broadcast(event); // SSE 推送
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true, display: toDisplayText(event) }));
      } catch {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "invalid JSON" }));
      }
    });
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "not found" }));
});

server.listen(PORT, () => {
  console.log(`📋 活动看板后端: http://localhost:${PORT}`);
  console.log(`  SSE:  GET  /events`);
  console.log(`  发布: POST /events`);
});
