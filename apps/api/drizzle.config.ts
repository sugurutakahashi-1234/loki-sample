/**
 * Drizzle Kit 設定
 *
 * D1（SQLite）向けのマイグレーション生成に使用する。
 *
 * ## マイグレーション運用
 *
 * このプロジェクトでは以下の2段階ワークフローで運用する:
 *   1. `bunx drizzle-kit generate` → SQL ファイル生成（drizzle/ ディレクトリに出力）
 *   2. `bunx wrangler d1 migrations apply` → 各環境の D1 に適用
 *
 * 適用順序: ローカル → staging → production
 * 詳細な手順は wrangler.jsonc のヘッダーコメントを参照。
 *
 * ## driver: "d1-http" を省略している理由
 *
 * 公式ドキュメントでは `driver: "d1-http"` + `dbCredentials`（accountId, databaseId, token）
 * が記載されているが、これは `drizzle-kit push` でリモート D1 に直接マイグレーションを
 * 適用する場合に必要な設定。
 * このプロジェクトでは `drizzle-kit generate`（SQL 生成のみ）+
 * `wrangler d1 migrations apply`（適用）で運用するため不要。
 * wrangler 経由の方が環境（staging/production）の切り替えが容易で、
 * Cloudflare の認証も wrangler が管理するため安全。
 */
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
});
