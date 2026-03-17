/**
 * Cloudflare Workers のエントリポイント
 *
 * Hono の app を default export するだけで CF Workers の fetch ハンドラーとして動作する。
 * wrangler.jsonc の main がこのファイルを指す。
 */
import { app } from "./app.js";

export default app;
