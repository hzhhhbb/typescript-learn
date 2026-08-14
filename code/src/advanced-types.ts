// advanced-types.ts —— 第十一课示例：类型编程
// 运行: npx tsc && node dist/advanced-types.js
// 注意：这课的代码几乎全部在编译期运行——产物很小，类型在编译后消失
export {};

// ── 1. keyof：提取对象的键为联合类型 ──
interface Todo {
  id: number;
  title: string;
  done: boolean;
}
type TodoKeys = keyof Todo; // "id" | "title" | "done"

const key1: TodoKeys = "title"; // ✓
// const key2: TodoKeys = "other"; // ✗ TS2322: '"other"' is not assignable to type 'TodoKeys'

// ── 2. 索引访问类型：T[K] 取属性类型 ──
type TitleType = Todo["title"]; // string
type IdType = Todo["id"]; // number

// ── 3. 映射类型：遍历键创建新类型 ──
type OptionalTodo = { [K in keyof Todo]?: Todo[K] }; // 全部变可选
type ReadonlyTodo = { readonly [K in keyof Todo]: Todo[K] }; // 全部只读

// ── 4. 内置工具类型（全栈代码高频出现） ──
type PartialTodo = Partial<Todo>; // 全部可选
type PickDone = Pick<Todo, "id" | "done">; // 只挑两个键
type RecordById = Record<number, Todo>; // { [id: number]: Todo }

// ── 5. 条件类型：类型层面的 if/else ──
type IsString<T> = T extends string ? true : false;
const check1: IsString<"hi"> = true; // ✓ 编译期判定
const check2: IsString<42> = false; // ✓
console.log(check1, check2);

// ── 6. infer：从类型中提取（C# 完全没有） ──
type ElementType<T> = T extends (infer U)[] ? U : never;
const e1: ElementType<string[]> = "hello"; // string
const e2: ElementType<number[]> = 42; // number
console.log(e1, e2);

// ── 7. 实战：ReturnType 从函数类型推导返回类型 ──
function fetchUser(id: number): Promise<{ id: number; name: string }> {
  return Promise.resolve({ id, name: `User ${id}` });
}
type FetchResult = ReturnType<typeof fetchUser>; // Promise<{ id: number; name: string }>
// 配合 Awaited 取 Promise 内部类型：
type User = Awaited<FetchResult>; // { id: number; name: string }

async function demo(): Promise<void> {
  const u: User = await fetchUser(1);
  console.log(u.name); // User 1
}
demo();
