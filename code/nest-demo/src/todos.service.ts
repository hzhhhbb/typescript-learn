// todos.service.ts —— 服务：业务逻辑（@Injectable() ≈ 注册进 DI 容器）
import { Injectable } from "@nestjs/common";
import type { Todo } from "./types";

@Injectable() // ≈ C# 的 AddScoped/AddTransient 注册，但用装饰器声明
export class TodosService {
  private todos: Todo[] = [];
  private nextId = 1;

  list(): Todo[] {
    return this.todos;
  }

  create(title: string): Todo {
    const todo: Todo = { id: this.nextId++, title, done: false };
    this.todos.push(todo);
    return todo;
  }

  toggle(id: number): Todo | undefined {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) todo.done = !todo.done;
    return todo;
  }
}
