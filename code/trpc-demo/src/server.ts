// server.ts —— 启动 tRPC 服务器（内置 http adapter，零框架依赖）
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./router";

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3003, () => {
  console.log("🪄 tRPC server: http://localhost:3003");
});
