/**
 * TodoList コンポーネント
 *
 * oRPC クライアント経由で API サーバーと通信する TODO 管理コンポーネント。
 * apiBaseUrl を props で受け取ることで、環境ごとに接続先を切り替えられる。
 *
 * - ローカル開発: デフォルトの localhost:3001
 * - Storybook: MSW がインターセプトするため URL は問わない
 * - ステージング/本番: apps/web から環境変数で注入
 */
import type { Todo } from "@storybook-vrt-sample/api-contract";
import { createTodoApiClient } from "@ui/api/client";
import type { TodoApiClient } from "@ui/api/client";
import { useCallback, useEffect, useMemo, useState } from "react";

/** TODO の CRUD 操作をまとめたカスタムフック */
const useTodos = (client: TodoApiClient) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    const data = await client.todo.list();
    setTodos(data);
    setLoading(false);
  }, [client]);

  useEffect(() => {
    const load = async () => {
      await fetchTodos();
    };
    // eslint-disable-next-line no-void -- useEffect does not support async return
    void load();
  }, [fetchTodos]);

  const toggle = useCallback(
    async (id: string) => {
      await client.todo.toggle({ id });
      await fetchTodos();
    },
    [client, fetchTodos]
  );

  const create = useCallback(
    async (title: string) => {
      await client.todo.create({ title });
      await fetchTodos();
    },
    [client, fetchTodos]
  );

  return { todos, loading, toggle, create };
};

const TodoItem = ({
  todo,
  onToggle,
}: {
  todo: Todo;
  onToggle: (id: string) => Promise<void>;
}) => {
  const handleChange = useCallback(() => {
    // eslint-disable-next-line no-void -- fire-and-forget toggle
    void onToggle(todo.id);
  }, [onToggle, todo.id]);

  return (
    <li>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleChange}
          className="accent-primary"
        />
        <span
          className={
            todo.completed
              ? "text-on-surface-muted line-through"
              : "text-on-surface"
          }
        >
          {todo.title}
        </span>
      </label>
    </li>
  );
};

export const TodoList = ({ apiBaseUrl }: { apiBaseUrl?: string }) => {
  const client = useMemo(() => createTodoApiClient(apiBaseUrl), [apiBaseUrl]);
  const { todos, loading, toggle, create } = useTodos(client);
  const [newTitle, setNewTitle] = useState("");

  const handleCreate = useCallback(async () => {
    if (!newTitle.trim()) {
      return;
    }
    await create(newTitle);
    setNewTitle("");
  }, [newTitle, create]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewTitle(e.target.value);
    },
    []
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        // eslint-disable-next-line no-void -- fire-and-forget create
        void handleCreate();
      }
    },
    [handleCreate]
  );

  const handleAddClick = useCallback(() => {
    // eslint-disable-next-line no-void -- fire-and-forget create
    void handleCreate();
  }, [handleCreate]);

  if (loading) {
    return <p className="text-on-surface-muted">Loading...</p>;
  }

  return (
    <div className="w-80 rounded-lg border border-border bg-surface p-4">
      <h2 className="mb-3 text-lg font-semibold text-on-background">
        Todo List
      </h2>
      <div className="mb-3 flex gap-2">
        <input
          type="text"
          value={newTitle}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="New todo..."
          aria-label="New todo title"
          className="flex-1 rounded border border-border-input bg-surface px-2 py-1 text-on-surface placeholder:text-on-surface-muted focus:border-primary focus:outline-none"
        />
        <button
          type="button"
          onClick={handleAddClick}
          className="rounded bg-primary px-3 py-1 text-on-primary hover:bg-primary-hover"
        >
          Add
        </button>
      </div>
      {todos.length === 0 ? (
        <p className="text-on-surface-muted">No todos yet</p>
      ) : (
        <ul className="space-y-1">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onToggle={toggle} />
          ))}
        </ul>
      )}
    </div>
  );
};
