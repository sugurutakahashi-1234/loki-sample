import { TodoSchema } from "@storybook-vrt-sample/api-contract";
import { fn } from "storybook/test";

import preview from "#.storybook/preview";

import { TodoList } from "./TodoList";

const sampleTodos = [
  TodoSchema.parse({ id: "1", title: "Buy groceries" }),
  TodoSchema.parse({ id: "2", title: "Write tests", completed: true }),
  TodoSchema.parse({ id: "3", title: "Review PR" }),
];

const meta = preview.meta({
  title: "Components/TodoList",
  component: TodoList,
  args: {
    todos: sampleTodos,
    loading: false,
    error: null,
    onToggle: fn(),
    onCreate: fn(),
  },
});

/** デフォルト: 3件の TODO */
export const Default = meta.story();

/** 空リスト */
export const Empty = meta.story({
  args: {
    todos: [],
  },
});

/** 全て完了済み */
export const AllCompleted = meta.story({
  args: {
    todos: [
      TodoSchema.parse({ id: "1", title: "Buy groceries", completed: true }),
      TodoSchema.parse({ id: "2", title: "Write tests", completed: true }),
      TodoSchema.parse({ id: "3", title: "Review PR", completed: true }),
    ],
  },
});

/** タイトルが空文字の TODO を含む */
export const EmptyTitle = meta.story({
  args: {
    todos: [
      TodoSchema.parse({ id: "1", title: "" }),
      TodoSchema.parse({ id: "2", title: "Normal todo" }),
    ],
  },
});

/** ローディング中 */
export const Loading = meta.story({
  args: {
    todos: [],
    loading: true,
  },
});

/** 一覧取得エラー: エラー画面 + Retry ボタン */
export const FetchError = meta.story({
  args: {
    todos: [],
    error: "Failed to load todos.",
    onRetry: fn(),
  },
});

/** 作成エラー: 操作エラーバナー表示 */
export const CreateError = meta.story({
  args: {
    error: "Failed to create todo.",
  },
});

/** トグルエラー: 操作エラーバナー表示 */
export const ToggleError = meta.story({
  args: {
    error: "Failed to toggle todo.",
  },
});
