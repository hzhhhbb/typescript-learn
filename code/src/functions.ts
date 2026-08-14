// functions.ts —— 第六课示例：函数与对象类型
// 运行: npx tsc && node dist/functions.js
export {};

// ── 1. 函数类型（≈ C# Func/委托） ──
type MathOp = (a: number, b: number) => number;

const add: MathOp = (a, b) => a + b;
const multiply: MathOp = (a, b) => a * b;
console.log(add(2, 3), multiply(2, 3)); // 5 6

// ── 2. 回调参数 ──
function forEach(
  arr: number[],
  callback: (item: number, index: number) => void
): void {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i);
  }
}
forEach([10, 20, 30], (n, i) => console.log(`#${i}: ${n}`));

// ── 3. 可选参数 & 默认参数（≈ C# 可选参数） ──
function greet(name: string, greeting?: string): string {
  return `${greeting ?? "Hello"}, ${name}!`;
}
console.log(greet("Ada"));       // Hello, Ada!
console.log(greet("Ada", "Hi")); // Hi, Ada!

function greet2(name: string, greeting = "Hello"): string {
  return `${greeting}, ${name}!`;
}
console.log(greet2("Bob")); // Hello, Bob!

// ── 4. 剩余参数（≈ C# params） ──
function sum(...nums: number[]): number {
  return nums.reduce((acc, n) => acc + n, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// ── 5. 函数重载：多个签名 + 一个实现 ──
function pick(input: string): string; // 签名 1
function pick(input: number): number; // 签名 2
function pick(input: string | number): string | number {
  // 实现：必须兼容所有签名
  return typeof input === "string" ? input.toUpperCase() : input * 2;
}
console.log(pick("hi")); // HI
console.log(pick(21)); // 42

// ── 6. 对象类型：readonly 与索引签名 ──
interface Point {
  readonly x: number; // 不可重新赋值
  y: number;
}
const p: Point = { x: 1, y: 2 };
// p.x = 10;  // ✗ TS2540: Cannot assign to 'x' because it is a read-only property
console.log(p.x, p.y);

interface StringMap {
  [key: string]: string; // 索引签名：任何字符串键都是 string 值
}
const dict: StringMap = { hello: "你好", world: "世界" };
console.log(dict.hello); // 你好
