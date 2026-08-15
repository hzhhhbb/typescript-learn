// App.tsx —— 前端：订阅 SSE 流 + 发布三种事件
// 覆盖概念：useState/useEffect（第 15 课）、EventSource 流式（第 13/15 课）、
//           可辨识联合构造（第 3 课）、共享类型单一来源（第 9/11 课）
import { useEffect, useState } from "react";
import type { BoardEvent, NewEventInput } from "@board/shared";

const API = "http://localhost:3001";

function App() {
  const [events, setEvents] = useState<BoardEvent[]>([]); // 状态：事件列表（泛型）
  const [author, setAuthor] = useState("Vincent");
  const [text, setText] = useState("");
  const [connected, setConnected] = useState(false);

  // 副作用：挂载时建立 SSE 连接（EventSource 只支持 GET，单向推送）
  useEffect(() => {
    const es = new EventSource(`${API}/events`);
    es.onopen = () => setConnected(true);
    es.onmessage = (e) => {
      const event = JSON.parse(e.data) as BoardEvent; // 网络输入 as 断言 + 信任后端校验
      setEvents((prev) => [event, ...prev].slice(0, 50)); // 新事件置顶，最多 50 条
    };
    es.onerror = () => setConnected(false);
    return () => es.close(); // 卸载时关闭（避免泄漏）
  }, []);

  // 发布事件（异步 + 错误处理，第 8 课）
  async function publish(input: NewEventInput): Promise<void> {
    try {
      const res = await fetch(`${API}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`); // fetch 不抛 4xx（第 8 课）
    } catch (err) {
      console.error("发布失败:", err instanceof Error ? err.message : err);
    }
  }

  // 可辨识联合构造：三种事件用同一个 publish 入口，类型系统区分字段
  function sendMessage(): void {
    if (text.trim() === "") return; // 空值校验
    void publish({ kind: "message", author: author || "匿名", text: text.trim() });
    setText("");
  }
  function sendFile(): void {
    void publish({ kind: "file", filename: `report-${Date.now()}.pdf`, sizeBytes: 204800 });
  }
  function sendAlert(): void {
    void publish({ kind: "alert", level: "warning", text: "磁盘使用率超过 80%" });
  }

  return (
    <div className="app">
      <h1>📋 实时活动看板 {connected ? <span className="dot ok">●</span> : <span className="dot">●</span>}</h1>

      <div className="compose">
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="作者"
          className="author"
        />
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="发一条消息…"
          className="text"
        />
        <button onClick={sendMessage}>发送</button>
        <button onClick={sendFile}>📄 文件事件</button>
        <button onClick={sendAlert}>⚠️ 告警</button>
      </div>

      <ul className="feed">
        {events.map((e) => (
          <li key={e.id}>
            <span className="time">{e.at.slice(11, 19)}</span>
            <span className="body">{display(e)}</span>
          </li>
        ))}
      </ul>
      {events.length === 0 && <p className="empty">暂无事件——点上面的按钮发布第一条！</p>}
    </div>
  );
}

// 前端也用可辨识联合收窄渲染（共享类型让前后端 display 逻辑对称）
function display(e: BoardEvent): string {
  switch (e.kind) {
    case "message":
      return `💬 ${e.author}: ${e.text}`;
    case "file":
      return `📄 ${e.filename} (${(e.sizeBytes / 1024).toFixed(1)} KB)`;
    case "alert":
      return `⚠️ [${e.level}] ${e.text}`;
  }
}

export default App;
