// math.ts —— 被导入的模块（第九课示例）
// 运行: npx tsc && node dist/main.js
export {};

// 命名导出：按名字导入
export function add(a: number, b: number): number {
  return a + b;
}
export const PI = 3.14159;

// 默认导出：一个模块只能有一个，导入时任意起名
export default function log(msg: string): void {
  console.log("[log]", msg);
}
