// store.ts —— 数据层：内存存储 + CRUD
import { todo } from "node:test";
import type { Todo, CreateTodoInput } from "./types";

const todos: Todo[] = [];
let nextId = 1;

export function listTodos(): Todo[] {
  return todos;
}

export function createTodo(input: CreateTodoInput): Todo {
  const todo: Todo = { id: nextId++, title: input.title, done: false };
  todos.push(todo);
  return todo;
}

// 空值处理：找不到返回 undefined（第四课）
export function toggleTodo(id: number): Todo | undefined {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.done = !todo.done;
  }
  return todo;
}


export function deleteTodo(id: number): Todo | undefined{
  if (todos && todos.find((t)=>t.id===id)){
    let tod=todos.splice(todos.findIndex((t,index)=>t.id===id),1);
    return tod[0];
  }
  return undefined;
}