/**
 * MSW ハンドラー定義（orpc-msw 版）
 *
 * orpc-msw の createMSWUtilities() を使い、コントラクトから型安全な MSW ハンドラーを生成する。
 * createTodoHandlers() にモックデータを渡すことで、ストーリーごとに
 * 異なる API レスポンスを返すことができる（空リスト、全完了済み等）。
 *
 * orpc-msw を使うメリット（手動 MSW ハンドラーとの比較）:
 * - パスの手書きが不要: コントラクトの path 定義から MSW ルーティングを自動生成する
 *   （例: コントラクトの `/todos/{id}` → MSW の `/todos/:id` への変換も自動）
 * - input の型推論: ハンドラーの引数 ({ input }) がコントラクトの入力スキーマから推論される
 * - output の型チェック: 返り値がコントラクトの出力スキーマと一致しないと型エラーになる
 * - コントラクト変更への追従: パス変更・フィールド追加時にコンパイルエラーで検知できる
 *
 * デメリット・注意点:
 * - orpc-msw は v0.1.0（最終更新 2026-01-20）で更新頻度が低い
 * - peer dependency に @orpc/contract + @orpc/openapi-client が追加で必要
 * - 戻り値の型推論で HttpHandler の明示的アノテーションが必要（tsgo の型推論制約）
 * - エラーレスポンス等のカスタムステータスコードは Response オブジェクトを直接返す必要がある
 */
import { contract } from "@storybook-vrt-sample/api-contract";
import type { Todo } from "@storybook-vrt-sample/api-contract";
import type { HttpHandler } from "msw";
import { createMSWUtilities } from "orpc-msw";

/** API サーバーのベース URL（apps/api のデフォルトポート） */
const API_BASE = "http://localhost:3001/api";

/** コントラクトから MSW ユーティリティを生成 */
const msw = createMSWUtilities({
  router: contract,
  baseUrl: API_BASE,
});

export const defaultTodos: Todo[] = [
  { id: "1", title: "Buy groceries", completed: false },
  { id: "2", title: "Write tests", completed: true },
  { id: "3", title: "Review PR", completed: false },
];

export const createTodoHandlers = (
  todos: Todo[] = defaultTodos
): HttpHandler[] => [
  msw.todo.list.handler(() => todos),
  msw.todo.create.handler(({ input }) => ({
    id: crypto.randomUUID(),
    title: input.title,
    completed: false,
  })),
  msw.todo.toggle.handler(({ input }) => {
    const todo = todos.find((t) => t.id === input.id);
    if (!todo) {
      return Response.json({ message: "Not found" }, { status: 404 });
    }
    return { ...todo, completed: !todo.completed };
  }),
];
