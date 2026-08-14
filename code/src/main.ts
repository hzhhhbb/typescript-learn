// main.ts —— 导入方（第九课示例）
// 运行: npx tsc && node dist/main.js

// 1. 命名导入 + 默认导入（默认导入可以任意起名：log）
import log, { add, PI } from "./math";

// 2. 通配符导入：把整个模块当作命名空间对象
import * as math from "./math";

// 3. import type：只导入类型，编译后不产生运行时导入
import type { User, ID } from "./types";

console.log(add(1, 2)); // 3
console.log(PI); // 3.14159
log("hello from main"); // [log] hello from main
console.log(math.add(3, 4)); // 7

// import type 导入的类型用法（编译后这行代码不存在）
function describe(u: User): string {
  return `#${u.id} ${u.name}`;
}
const id: ID = 42;
console.log(describe({ id: 1, name: "Ada" }), id);
