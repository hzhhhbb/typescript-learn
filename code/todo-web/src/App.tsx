// App.tsx —— Todo API 前端（第十五课示例）
// 需要 Todo API 在 localhost:3000 运行
import { useEffect, useState } from "react";
import "./App.css";

interface Todo {
  id: number;
  title: string;
  done: boolean;
}

const API = "http://localhost:3000/todos";

function App() {
  // state：组件内部可变状态（状态变了 → 组件重新渲染）
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  // 副作用：挂载时从后端拉数据（≈ Blazor 的 OnInitializedAsync）
  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data: Todo[]) => setTodos(data));
  }, []);

  // 添加待办：POST 到后端，成功后更新列表
  async function addTodo() {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const todo = (await res.json()) as Todo;
    setTodos([...todos, todo]); // 追加（不直接改原数组）
    setTitle("");
  }

  // JSX：在 JS 里写 HTML，{} 嵌入表达式
  return (
    <div className="app">
      <h1>Todo 清单</h1>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            {t.done ? "✅" : "⬜"} {t.title}
          </li>
        ))}
      </ul>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="输入新待办…"
      />
      <button onClick={addTodo}>添加</button>
    </div>
  );
}

export default App;
