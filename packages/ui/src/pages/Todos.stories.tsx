import { contract, TodoSchema } from "@storybook-vrt-sample/api-contract";
import {
  createContractErrorHandlers,
  createContractLoadingHandlers,
  createTodoHandlers,
} from "@storybook-vrt-sample/api-contract/mocks";

import preview from "#.storybook/preview";
import TodosPage from "@/todos/page";

import { pageStoryMeta } from "./page-story-config";

const BASE = "http://localhost:3001/api";

const sampleTodos = [
  TodoSchema.parse({ id: "1", title: "Buy groceries" }),
  TodoSchema.parse({ id: "2", title: "Write tests", completed: true }),
  TodoSchema.parse({ id: "3", title: "Review PR" }),
];

const meta = preview.meta({
  ...pageStoryMeta,
  title: "Pages/Todos",
  component: TodosPage,
});

/** デフォルト: 3件の TODO */
export const Default = meta.story({
  parameters: { msw: { handlers: createTodoHandlers(BASE, sampleTodos) } },
});

/** 空リスト */
export const Empty = meta.story({
  parameters: { msw: { handlers: createTodoHandlers(BASE, []) } },
});

/** API エラー */
export const FetchError = meta.story({
  parameters: {
    msw: {
      handlers: createContractErrorHandlers(BASE, contract.todo, ["list"]),
    },
  },
});

/** ローディング中 */
export const Loading = meta.story({
  parameters: {
    msw: {
      handlers: createContractLoadingHandlers(BASE, contract.todo, ["list"]),
    },
  },
});
