/**
 * oRPC API クライアント
 *
 * コントラクトから型安全な API クライアントを生成する。
 * OpenAPILink を使用するため、サーバー側が OpenAPI 形式（@orpc/openapi）で
 * ルーティングしていることが前提。
 */
import { createORPCClient } from "@orpc/client";
import type { ContractRouterClient } from "@orpc/contract";
import { OpenAPILink } from "@orpc/openapi-client/fetch";
import { contract } from "@storybook-vrt-sample/api-contract";

/** API ベース URL のデフォルト値（ローカル開発用） */
export const DEFAULT_API_BASE_URL = "http://localhost:3001/api";

/** コントラクトから推論された型安全なクライアント型 */
export type TodoApiClient = ContractRouterClient<typeof contract>;

/** 指定した baseUrl で oRPC クライアントを生成する */
export const createTodoApiClient = (
  baseUrl: string = DEFAULT_API_BASE_URL
): TodoApiClient => {
  const link = new OpenAPILink(contract, { url: baseUrl });
  return createORPCClient<TodoApiClient>(link);
};
