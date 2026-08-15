// worker-demo/main.ts —— 0016 课示例：worker_threads
// 演示：CPU 密集任务放进 worker，事件循环保持响应
// 运行: npx tsc && node dist/worker-demo/main.js
export {};

import { Worker } from "node:worker_threads";
import { join } from "node:path";

console.log("主线程：启动 CPU 密集任务到 worker（fib(35)）…");

// 启动 worker 算斐波那契（CPU 密集，会占满它自己的 V8 实例）
const worker = new Worker(join(__dirname, "fib-worker.js"), {
  workerData: 35,
});

worker.on("message", (result: number) => {
  console.log("主线程收到 worker 结果: fib(35) =", result);
});

worker.on("error", (err) => console.error("worker 错误:", err));

// 关键对比：主线程事件循环完全没被阻塞（定时器照常走）
let ticks = 0;
const timer = setInterval(() => {
  ticks++;
  console.log(`  主线程 tick ${ticks} —— 事件循环正常！`);
  if (ticks >= 10) {
    clearInterval(timer);
    worker.terminate();
    console.log("完成：worker 算它的，主线程跑它的。");
  }
}, 200);
