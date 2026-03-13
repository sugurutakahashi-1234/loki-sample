/**
 * Hono アプリケーション定義
 *
 * oRPC ルーターを Hono にマウントした共通アプリケーション。
 * エントリポイント（Bun dev / Cloudflare Workers）から import して使う。
 *
 * CORS は全オリジン許可（検証用リポジトリのため）。
 * 本番運用では環境ごとに許可オリジンを制限すること。
 */
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { Hono } from "hono";
import { cors } from "hono/cors";

import { router } from "./router.js";

const handler = new OpenAPIHandler(router, {
  interceptors: [],
});

export const app = new Hono();

app.use("*", cors());

app.all("/api/*", async (c) => {
  const { response } = await handler.handle(c.req.raw, {
    prefix: "/api",
  });
  return response ?? c.notFound();
});
