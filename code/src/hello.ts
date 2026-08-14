export {};  // 使本文件成为独立模块（避免与其他示例文件全局冲突）
// hello.ts
let message: string = "World";
let year = 2025;                  // ← 推断为 number，等价于 var year = 2025

function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greet(message));
console.log("Year:", year);
