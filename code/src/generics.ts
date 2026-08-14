export {};  // 使本文件成为独立模块（避免与其他示例文件全局冲突）
// generics.ts —— 第五课示例：泛型
// 运行: npx tsc && node dist/generics.js

// ── 1. 泛型函数：调用时自动推断类型参数 ──
function identity<T>(value: T): T {
  return value;
}

const n = identity(42);   // T 推断为 number
const s = identity("hi"); // T 推断为 string
console.log(typeof n, typeof s); // number string

// ── 2. 泛型接口 ──
interface Box<T> {
  value: T;
}

const numBox: Box<number> = { value: 42 };
console.log(numBox.value + 1); // 43 —— 类型系统知道 value 是 number

// ── 3. 泛型类 ──
class Stack<T> {
  private items: T[] = [];
  push(item: T): void {
    this.items.push(item);
  }
  pop(): T | undefined {
    return this.items.pop(); // 数组可能为空 → undefined
  }
}

const stack = new Stack<number>();
stack.push(1);
stack.push(2);
console.log(stack.pop()); // 2
console.log(stack.pop()); // 1
console.log(stack.pop()); // undefined

// ── 4. 泛型约束 extends（≈ C# where T : ...） ──
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

console.log(longest("abc", "xy"));       // abc（string 有 length）
console.log(longest([1, 2, 3], [4, 5])); // [1, 2, 3]（数组有 length）
// longest(1, 2);  // ✗ TS2345: number 没有 length 属性

// ── 5. 运行时无泛型：类型擦除 ──
// Box<number> 和 Box<string> 编译后都是 { value: ... }，运行时无区分
const boxes: Box<number>[] = [{ value: 1 }, { value: 2 }];
console.log(boxes.length); // 2
