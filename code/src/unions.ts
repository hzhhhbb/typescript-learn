export {};  // 使本文件成为独立模块（避免与其他示例文件全局冲突）
// unions.ts —— 第三课示例：联合类型与类型收窄
// 运行: npx tsc && node dist/unions.js

// ── 1. 联合类型：值可能是 string 或 number ──
type Id = string | number;

function lookup(id: Id): string {
  if (typeof id === "string") {
    // 这里 id 被收窄为 string（有 .toUpperCase 可用）
    return `search by name: ${id.toUpperCase()}`;
  } else {
    // 这里 id 被收窄为 number
    return `search by id: ${id}`;
  }
}

console.log(lookup("vincent")); // search by name: VINCENT
console.log(lookup(42));        // search by id: 42

// ── 2. 字面量联合：枚举的轻量替代 ──
type Status = "pending" | "active" | "done";

let s: Status = "pending"; // OK
// s = "cancelled";        // ✗ TS2322: '"cancelled"' is not assignable to type 'Status'
s = "done";
console.log("status:", s);

// ── 3. 可辨识联合（discriminated union）+ switch 收窄 ──
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number }
  |{ kind: "triangle"; base: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      // 这里 shape 被收窄为 circle 分支
      return Math.PI * shape.radius ** 2;
    case "square":
      // 这里 shape 被收窄为 square 分支
      return shape.size * shape.size;
      case "triangle":
        return (shape.base * shape.height) / 2;
  }
}

console.log("circle:", area({ kind: "circle", radius: 2 }).toFixed(2));
console.log("square:", area({ kind: "square", size: 3 }));

// ── 4. typeof 的坑：null ──
console.log("typeof null =", typeof null); // "object" —— 收窄 null 时别用 typeof 判断
