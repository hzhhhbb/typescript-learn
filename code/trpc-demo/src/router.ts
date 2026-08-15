// router.ts —— 前后端共享的 API 定义（tRPC 的核心：类型即契约）
// server 用它实现，client 从它推导类型——改这里，两端同时感知
import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();

// 模拟数据库
interface Todo {
  id: number;
  title: string;
  done: boolean;
}
const todos: Todo[] = [{ id: 1, title: "学习 tRPC", done: false }];

// ── 定义 router：一组 procedure（≈ API 端点，但没有 URL/序列化边界） ──
export const appRouter = t.router({
  // query：读操作（输入可选）
  getTodos: t.procedure.query(() => todos),

  // mutation：写操作，输入用 Zod 校验（第 18 课）
  addTodo: t.procedure
    .input(z.object({ title: z.string().min(1) }))
    .mutation(({ input }) => {
      const todo: Todo = { id: todos.length + 1, title: input.title, done: false };
      todos.push(todo);
      return todo;
    }),

  toggleTodo: t.procedure
    .input(z.number()) // 输入：id
    .mutation(({ input }) => {
      const todo = todos.find((t) => t.id === input);
      if (todo) todo.done = !todo.done;
      return todo;
    }),
});

// 导出 router 类型——client 端 import 这个类型获得端到端类型安全
export type AppRouter = typeof appRouter;
