// event-loop-lab.ts —— 回调顺序实验
// 玩法：先读每个场景的代码，在纸上写下预测的输出顺序，
// 然后运行: npx tsc && node dist/event-loop-lab.js 对照你的预测。
// 规则回顾（第十三课）：同步代码先跑完 → 清空微任务（Promise/await）→ 宏任务（setTimeout/I/O）
export {};

// sleep：让每个场景的回调全部执行完，再开始下一个场景（保证场景隔离）
function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function main(): Promise<void> {
  // ── 场景 1：基础三连（第十三课讲过） ──
  console.log("===== 场景 1：同步 + setTimeout + Promise =====");
  console.log("A 同步");
  setTimeout(() => console.log("B 宏任务"), 0);
  Promise.resolve().then(() => console.log("C 微任务"));
  console.log("D 同步");
  await sleep(50);

  // ── 场景 2：async/await 混入（await 之后是微任务） ──
  console.log("\n===== 场景 2：await 之后 =====");
  async function go(): Promise<void> {
    console.log("E 函数开头");
    await Promise.resolve();
    console.log("F await 之后");
  }
  go();
  console.log("G 同步");
  await sleep(50);

  // ── 场景 3：微任务里注册宏任务 ──
  console.log("\n===== 场景 3：微任务里 setTimeout =====");
  Promise.resolve().then(() => {
    console.log("H 微任务");
    setTimeout(() => console.log("I 微任务里的宏任务"), 0);
  });
  setTimeout(() => console.log("J 先注册的宏任务"), 0);
  await sleep(50);

  // ── 场景 4：宏任务里注册微任务 ──
  console.log("\n===== 场景 4：宏任务里 Promise =====");
  setTimeout(() => {
    console.log("K 宏任务");
    Promise.resolve().then(() => console.log("L 宏任务里的微任务"));
  }, 0);
  Promise.resolve().then(() => console.log("M 先注册的微任务"));
  await sleep(50);

  // ── 场景 5：for 循环里 await ──
  console.log("\n===== 场景 5：循环里 await =====");
  async function loop(): Promise<void> {
    for (let i = 1; i <= 3; i++) {
      await Promise.resolve();
      console.log(`N${i} 第 ${i} 次循环`);
    }
  }
  loop();
  console.log("O 同步");
  await sleep(50);
}

main();

/*
 * ── 参考答案（先预测，再对照！）────────────────────────
 * 场景 1: A → D → C → B          同步 → 微任务 → 宏任务
 * 场景 2: E → G → F              await 之后是微任务，同步代码先跑完
 * 场景 3: H → J → I              H 是微任务先执行；J 是已注册的宏任务；I 是 H 里新注册的宏任务，排 J 后面
 * 场景 4: M → K → L              M 微任务先执行；K 宏任务；L 是 K 里注册的微任务，紧跟 K
 * 场景 5: O → N1 → N2 → N3       同步 O 先；循环里每次 await 都是一个微任务
 * ─────────────────────────────────────────────────────
 */
