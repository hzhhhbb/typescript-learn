// todos.controller.ts —— 控制器：路由 + 装饰器（≈ C# [ApiController]）
import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { TodosService } from "./todos.service";
import type { Todo } from "./types";
import type { CreateTodoDto } from "./types";

@Controller("todos") // 路由前缀：所有端点都在 /todos 下
export class TodosController {
  // 构造注入（≈ C# constructor injection，NestJS 用类型自动解析）
  constructor(private readonly todosService: TodosService) {}

  @Get() // ≈ [HttpGet]
  list(): Todo[] {
    return this.todosService.list();
  }

  @Post() // ≈ [HttpPost]
  create(@Body() dto: CreateTodoDto): Todo {
    // @Body() 自动解析 JSON 请求体（≈ [FromBody]）
    return this.todosService.create(dto.title);
  }

  @Patch(":id") // 路径参数（≈ [HttpPatch("{id}")]）
  toggle(@Param("id") id: string): Todo | undefined {
    return this.todosService.toggle(Number(id));
  }
}
