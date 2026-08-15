// index.ts —— 0018 课示例：Prisma（类型安全 ORM）+ Zod（校验与类型合一）
// 运行: npm start
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// ── Zod：一个 schema 同时产出「运行时校验」+「编译期类型」 ──
const TodoInput = z.object({
  title: z.string().min(1, "标题不能为空").max(100, "标题太长"),
});
// 类型直接从 schema 推导（第 11 课 infer 的实战应用）
type TodoInput = z.infer<typeof TodoInput>;

async function main(): Promise<void> {
  // 1. Zod 校验（运行时：类型系统管不到网络输入，第 10 课）
  const parsed: TodoInput = TodoInput.parse({ title: "学习 Prisma" });
  console.log("✅ Zod 校验通过:", parsed);

  // 2. Prisma 创建（类型安全：字段拼错/类型错编译期就报）
  const todo = await prisma.todo.create({
    data: { title: parsed.title },
  });
  console.log("✅ Prisma 创建:", todo);

  // 3. Prisma 查询（链式 API 全程类型检查）
  const all = await prisma.todo.findMany({ where: { done: false } });
  console.log("✅ 未完成列表:", all.map((t) => t.title));

  // 4. 校验失败演示
  try {
    TodoInput.parse({ title: "" });
  } catch (e) {
    if (e instanceof z.ZodError) {
      console.log("❌ 校验拒绝（如预期）:", e.errors[0]?.message);
    }
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
