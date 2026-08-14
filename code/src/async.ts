// async.ts —— 第八课示例：异步与 Promise
// 运行: npx tsc && node dist/async.js
export {};

// ── 1. Promise 基础（≈ C# Task<T>） ──
function delay(ms: number): Promise<void> {
  // resolve 在 setTimeout 触发时被调用 → Promise 完成
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ── 2. async/await（≈ C# 的 async/await） ──
async function fetchUser(id: number): Promise<{ id: number; name: string }> {
  // await delay(100); // 模拟网络延迟（类型: Promise<void>）
  return { id, name: `User ${id}` };
}

async function main(): Promise<void> {
  const user = await fetchUser(1); // await 取出值，类型自动推断
  console.log(user.name); // User 1
}

main();

// ── 3. 并行：Promise.all（≈ Task.WhenAll） ──
async function parallel(): Promise<void> {
  const [a, b] = await Promise.all([fetchUser(1), fetchUser(2)]);
  console.log(a.name, b.name); // User 1 User 2
}
parallel();

// ── 4. 真实异步：fetch + 错误处理 ──
async function getTitle(url: string): Promise<string> {
  const res = await fetch(url);
  // 坑：fetch 只在网络故障时抛异常，HTTP 404/500 不抛！
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${url}`);
  }
  return (await res.json()).title;
}

async function fetchExample(): Promise<void> {
  try {
    const title = await getTitle("https://ajsonplaceholder.typicode.com/todos/99999");
    console.log("todo title:", title);
  } catch (err) {
    console.log("请求失败:", err instanceof Error ? err.message : err);
  }
}
fetchExample();
