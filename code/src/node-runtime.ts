// node-runtime.ts —— 第十三课示例：Node 内置模块
// 运行: npx tsc && node dist/node-runtime.js
export {};

// ── 1. fs：文件读写（同步版，演示用） ──
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const filePath = join(process.cwd(), "data.txt"); // path 拼接路径（跨平台）
writeFileSync(filePath, "Hello from Node!");
const content = readFileSync(filePath, "utf-8");
console.log("文件内容:", content);

// ── 2. process：进程信息 ──
console.log("环境变量 NODE_ENV:", process.env.NODE_ENV ?? "未设置");
console.log("命令行参数:", process.argv.slice(2));
console.log("当前目录:", process.cwd());

// ── 3. path：跨平台路径处理 ──
console.log("扩展名:", join("/tmp", "config.json").split(".").pop());
