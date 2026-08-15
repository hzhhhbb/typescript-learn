// stream-demo.ts —— 0016 课示例：Streams（流式处理）
// 演示：大文件"边读边处理"，内存恒定，不把整个文件装进内存
// 运行: npx tsc && node dist/stream-demo.js
export {};

import { createReadStream, createWriteStream, mkdirSync } from "node:fs";
import { Transform } from "node:stream";
import { join } from "node:path";

// 生成一个测试大文件（约 50MB 重复文本）
const dir = join(process.cwd(), "stream-test");
mkdirSync(dir, { recursive: true });
const bigFile = join(dir, "input.txt");
const outFile = join(dir, "output.txt");

const gen = createWriteStream(bigFile);
for (let i = 0; i < 100_000; i++) {
  gen.write("行 " + i + ": hello world, node streams are cool!\n");
}
gen.end();
gen.on("finish", () => {
  console.log("已生成测试文件，大小:", (require("node:fs").statSync(bigFile).size / 1024 / 1024).toFixed(2) + " MB");

  // 流式处理：读 → Transform（大写）→ 写
  // 内存恒定：任何时候只有一小块 chunk 在内存里，不管文件多大
  const upper = new Transform({
    transform(chunk: any, _enc: string, cb: (err: Error | null, data?: any) => void) {
      cb(null, chunk.toString().toUpperCase());
    },
  });

  const start = Date.now();
  createReadStream(bigFile, { highWaterMark: 64 * 1024 }) // 每次 64KB 一块
    .pipe(upper)
    .pipe(createWriteStream(outFile))
    .on("finish", () => {
      console.log(`流式处理完成，耗时 ${Date.now() - start}ms（内存恒定，只占 64KB/块）`);
      console.log("验证首行:", require("node:fs").readFileSync(outFile, "utf-8").split("\n")[0]);
    });
});
