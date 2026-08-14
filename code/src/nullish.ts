export {};  // 使本文件成为独立模块（避免与其他示例文件全局冲突）
// nullish.ts —— 第四课示例：null、undefined 与严格空检查
// 运行: npx tsc && node dist/nullish.js

// ── 1. 严格空检查：null/undefined 不能赋给普通类型 ──
// const name: string = null;   // ✗ TS2322: Type 'null' is not assignable to type 'string'
const nick: string | null = null; // ✓ 显式声明可空
const maybe: string | undefined = undefined; // ✓
console.log("nick:", nick, "maybe:", maybe);

// ── 2. 可选链 ?. —— 和 C# 一模一样 ──
interface Address {
  city?: string;
}
interface User {
  name: string;
  address?: Address;
}

const user: User = { name: "Ada" }; // 没有 address
const city = user.address?.city; // undefined，不抛异常！
console.log("city:", city);

const ada: User = { name: "Ada", address: { city: "London" } };
console.log("city:", ada.address?.city); // London

// ── 3. 空值合并 ?? —— 和 C# 一模一样 ──
// 函数参数类型是 number | undefined（可选配置），用 ?? 给默认值
interface Config {
  retries: number;
  timeoutMs?: number;
}
function getTimeout(cfg: Config): number {
  return cfg.timeoutMs ?? 5000; // number | undefined ?? → number
}
console.log("timeout:", getTimeout({ retries: 3 }));              // 5000
console.log("timeout:", getTimeout({ retries: 3, timeoutMs: 1000 })); // 1000

// ── 4. ?? 与 || 的区别 ──
// 注意：TS 7 会拒绝"静态上永远不会为空的 ?? / ||"（TS2869 / TS2873），
// 所以演示用真实的联合类型参数。
function pickNullish(x: number | undefined, fb: number): number {
  return x ?? fb; // ?? 只认 null/undefined：0 ?? 100 = 0
}
function pickFalsy(x: number, fb: number): number {
  return x || fb; // || 把 0、""、false 也当假：0 || 100 = 100
}
console.log("0 ?? 100 =", pickNullish(0, 100));
console.log("0 || 100 =", pickFalsy(0, 100));

// ── 5. 非空断言 !（逃生舱，慎用） ──
// const bad = user.address!.city;  // 运行时 user.address 是 undefined → 崩溃
// 正确姿势：先收窄
if (user.address) {
  console.log("user city:", user.address.city);
} else {
  console.log("user has no address");
}
