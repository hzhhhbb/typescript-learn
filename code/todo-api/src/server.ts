// server.ts —— 入口：HTTP 服务（零依赖，Node 内置 http 模块）
import { createServer } from "node:http";
import type { ServerResponse } from "node:http"; // import type：类型导入零运行时成本
import { listTodos, createTodo, toggleTodo,deleteTodo } from "./store";

const PORT = 3000;

function sendJson(res: ServerResponse, status: number, body: unknown): void {
  // CORS：允许浏览器跨域访问（React dev server 在 5173 端口）
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(body));
}

const server = createServer((req, res) => {


  // 路由：方法 + 路径
  if (req.method === "GET" && req.url === "/todos") {
    sendJson(res, 200, listTodos());
    return;
  }

  if (req.method === "POST" && req.url === "/todos") {
    // 读取请求体（异步、事件驱动）
    let raw = "";
    req.on("data", (chunk) => (raw += chunk));
    req.on("end", () => {
      try {
        const input = JSON.parse(raw) as { title?: unknown };
        if (typeof input.title !== "string" || input.title.trim() === "") {
          // 运行时校验：类型系统管不到网络输入（第八课的教训）
          sendJson(res, 400, { error: "title must be a non-empty string" });
          return;
        }
        const todo = createTodo({ title: input.title.trim() });
        sendJson(res, 201, todo);
      } catch {
        sendJson(res, 400, { error: "invalid JSON body" });
      }
    });
    return;
  }

  // PATCH /todos/:id —— 用正则解析路径参数
  const match = /^\/todos\/(\d+)$/.exec(req.url ?? "");
  if (req.method === "PATCH" && match) {
    const id = Number(match[1]);
    const todo = toggleTodo(id);
    if (!todo) {
      sendJson(res, 404, { error: `todo ${id} not found` }); // 空值收窄（第三/四课）
      return;
    }
    sendJson(res, 200, todo);
    return;
  }

      // 路由：方法 + 路径
  if (req.method === "DELETE" && match) {
    sendJson(res, 200, deleteTodo(Number(match[1])));
    return;
  }

  sendJson(res, 404, { error: "not found" });
});

server.listen(PORT, () => {
  console.log(`Todo API 运行在 http://localhost:${PORT}`);
});
