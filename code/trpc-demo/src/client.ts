// client.ts —— 前端调用：类型完全来自 server 的 router（端到端类型安全）
// 注意：这里没有任何手写的 API 接口定义/类型——全部自动推导
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "./router"; // 只 import 类型！

const trpc = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({ url: "http://localhost:3003" })],
});

async function main(): Promise<void> {
  // 1. 查询：返回类型自动推导（Todo[]）
  const list = await trpc.getTodos.query();
  console.log("📋 列表:", list);

  // 2. 变更：input 类型自动校验（必须 { title: string }）
  const added = await trpc.addTodo.mutate({ title: "端到端类型安全" });
  console.log("➕ 添加:", added);

  // 3. 输入错误：编译期就报错（试试传 { title: 42 }）
  // const bad = await trpc.addTodo.mutate({ title: 42 }); // ✗ 编译错误！

  const toggled = await trpc.toggleTodo.mutate(1);
  console.log("🔄 切换:", toggled);
}

main().catch(console.error);
