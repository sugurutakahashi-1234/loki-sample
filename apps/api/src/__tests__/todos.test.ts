import { beforeEach, describe, expect, test } from "bun:test";

import { client, env } from "./helpers/api-test.js";

beforeEach(async () => {
  await env.DB.exec("DELETE FROM todos");
});

describe("Todos API", () => {
  describe("GET /api/todos", () => {
    test("初期状態で空配列を返す", async () => {
      const todos = await client.todo.list();
      expect(todos).toEqual([]);
    });
  });

  describe("POST /api/todos", () => {
    test("Todo を作成して返す", async () => {
      const todo = await client.todo.create({ title: "テストTodo" });
      expect(todo).toMatchObject({
        title: "テストTodo",
        completed: false,
      });
      expect(todo.id).toBeString();
    });

    test("作成した Todo が一覧に含まれる", async () => {
      await client.todo.create({ title: "永続化テスト" });

      const todos = await client.todo.list();
      expect(todos).toHaveLength(1);
      expect(todos[0]?.title).toBe("永続化テスト");
    });
  });

  describe("PATCH /api/todos/{id}", () => {
    test("Todo の完了状態をトグルする", async () => {
      const created = await client.todo.create({ title: "トグルテスト" });
      expect(created.completed).toBe(false);

      const toggled = await client.todo.toggle({ id: created.id });
      expect(toggled.completed).toBe(true);
      expect(toggled.id).toBe(created.id);
    });

    test("2回トグルで元に戻る", async () => {
      const created = await client.todo.create({ title: "ダブルトグル" });
      await client.todo.toggle({ id: created.id });
      const toggled = await client.todo.toggle({ id: created.id });
      expect(toggled.completed).toBe(false);
    });

    test("存在しない ID でエラーを返す", () => {
      expect(client.todo.toggle({ id: "non-existent-id" })).rejects.toThrow();
    });
  });
});
