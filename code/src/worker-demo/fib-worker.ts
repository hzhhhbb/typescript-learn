// worker-demo/fib-worker.ts —— worker 线程里的 CPU 密集计算
// 每个 worker 有自己独立的 V8 实例和事件循环（不是 C# 的共享内存线程）
import { parentPort, workerData } from "node:worker_threads";

function fib(n: number): number {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

console.log(`[worker] 开始计算 fib(${workerData})…`);
const result = fib(workerData as number);
parentPort?.postMessage(result); // 消息传递：把结果发回主线程
