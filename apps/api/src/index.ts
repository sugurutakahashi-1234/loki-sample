/**
 * Bun 開発サーバーのエントリポイント
 *
 * `bun run --hot src/index.ts` でホットリロード付きのローカル開発サーバーが起動する。
 * Bun.serve の規約に従い default export で { port, fetch } を返す。
 *
 * Cloudflare Workers へのデプロイ時は src/worker.ts が使用される。
 */
import { app } from "./app.js";

export default {
  port: 3001,
  fetch: app.fetch,
};
